import { Router, type IRouter, type Request, type Response } from "express";

const router: IRouter = Router();

const RATE_LIMIT_PER_MIN = 8;
const ipBuckets = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = ipBuckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    ipBuckets.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (bucket.count >= RATE_LIMIT_PER_MIN) return false;
  bucket.count += 1;
  return true;
}

const SYSTEM_PROMPT = `You are a senior public-finance officer producing a structured internal financial memo about a public restricted fund.

The figures you receive are MODELED reconstructions, not pulled from a live ledger. You must:
- treat the figures as illustrative of the structural pattern, not as audited values
- never invent specific dollar amounts beyond what the user provides
- never cite a specific document number that you do not have
- write in a dry, technical, public-finance-officer voice
- never editorialize, never use political language, never use exclamation points
- never use emojis
- output a single plain-text memo, no markdown headers, no bullet glyphs other than dashes

The memo MUST follow this structure exactly:

INTERNAL FINANCIAL MEMO
TO:        Council President, City Auditor
FROM:      Office of Public Capacity (modeled)
SUBJECT:   <fund name> — <one-line subject>
DATE:      As of latest reporting cycle

1. SUMMARY
<two short paragraphs on enacting authority, voter intent, current modeled balance, and modeled restricted vs movable share>

2. STRUCTURAL FINDINGS
2.1  <one-sentence finding>
2.2  <one-sentence finding>
2.3  <one-sentence finding>

3. RECOMMENDATIONS
3.1  <one-sentence recommendation, structural>
3.2  <one-sentence recommendation, structural>
3.3  <one-sentence recommendation, structural>

— end —`;

function buildUserPrompt(payload: {
  fundSlug: string;
  lens: string;
  fund: Record<string, unknown>;
}): string {
  const lensInstruction =
    {
      "financial-officer":
        "Write in the voice of a public-finance officer producing an internal memo to the Council President.",
      auditor:
        "Write in the voice of a city auditor closing out a performance review. Cite enabling code and resolution categories where relevant.",
      voter:
        "Write in the voice of a voter who passed the ballot measure, explaining what they were sold and what arrived. Keep the memo structure exactly.",
      reporter:
        "Write in the voice of an investigative reporter who has read the audit trail. Name the structural gap directly. Keep the memo structure exactly.",
    }[payload.lens] ??
    "Write in the voice of a public-finance officer producing an internal memo.";

  return `${lensInstruction}

Fund record (modeled):
${JSON.stringify(payload.fund, null, 2)}

Produce the memo. Plain text only.`;
}

async function* anthropicStream(
  baseURL: string,
  apiKey: string,
  systemPrompt: string,
  userPrompt: string,
): AsyncGenerator<string> {
  const url = `${baseURL.replace(/\/$/, "")}/v1/messages`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 8192,
      system: systemPrompt,
      stream: true,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });

  if (!res.ok || !res.body) {
    const text = res.body ? await res.text() : "";
    throw new Error(`Anthropic returned ${res.status}: ${text.slice(0, 400)}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (!data) continue;
      try {
        const parsed = JSON.parse(data);
        if (
          parsed.type === "content_block_delta" &&
          parsed.delta?.type === "text_delta"
        ) {
          yield parsed.delta.text as string;
        }
      } catch {
        // ignore non-json keepalive
      }
    }
  }
}

router.post("/regenerate-memo", async (req: Request, res: Response) => {
  const baseURL = process.env["AI_INTEGRATIONS_ANTHROPIC_BASE_URL"];
  const apiKey = process.env["AI_INTEGRATIONS_ANTHROPIC_API_KEY"];

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  const send = (obj: unknown) => {
    res.write(`data: ${JSON.stringify(obj)}\n\n`);
  };

  if (!baseURL || !apiKey) {
    send({ error: "Anthropic integration is not configured." });
    res.end();
    return;
  }

  const ip =
    (req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0]?.trim() ??
    req.ip ??
    "unknown";
  if (!checkRateLimit(ip)) {
    send({ error: "Rate limit exceeded. Try again in a minute." });
    res.end();
    return;
  }

  const body = req.body as {
    fundSlug?: string;
    lens?: string;
    fund?: Record<string, unknown>;
  };
  if (!body?.fundSlug || !body?.fund) {
    send({ error: "Missing fundSlug or fund payload." });
    res.end();
    return;
  }

  const userPrompt = buildUserPrompt({
    fundSlug: body.fundSlug,
    lens: body.lens ?? "financial-officer",
    fund: body.fund,
  });

  try {
    for await (const chunk of anthropicStream(
      baseURL,
      apiKey,
      SYSTEM_PROMPT,
      userPrompt,
    )) {
      send({ text: chunk });
    }
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    send({
      error: err instanceof Error ? err.message : "Unknown streaming error",
    });
    res.end();
  }
});

export default router;
