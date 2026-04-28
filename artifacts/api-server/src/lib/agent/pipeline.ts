import { randomUUID } from "node:crypto";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { eq, and, desc } from "drizzle-orm";
import {
  db,
  agentOutputsTable,
  type AgentOutput,
  type WorkProductType,
} from "@workspace/db";
import { anthropic } from "@workspace/integrations-anthropic-ai";
import {
  WEEKLY_MEMO_PROMPT,
  MONTHLY_CASH_FLOW_PROMPT,
  CITATION_CHECK_PROMPT,
  renderTemplate,
} from "@workspace/prompts";
import { logger } from "../logger";
import { buildSnapshot, renderNewsBlock, renderSnapshotForPrompt } from "./corpus";
import { postToBluesky } from "../bluesky";
import { renderMemoToPdf } from "../pdf";

const MODEL_VERSION = "claude-sonnet-4-6";
const MAX_ATTEMPTS = 3;

const FUND_NAMES: Record<string, string> = {
  "arts-tax": "Arts Education and Access Income Tax",
  pcef: "Portland Clean Energy Community Benefits Fund",
  "housing-investment": "Portland Housing Investment Fund",
  "rental-services": "Residential Rental Registration / Rental Services Office",
  "affordable-housing-dev": "Metro Affordable Housing Bond / Portland Housing Bond",
  "preschool-for-all": "Preschool for All (Multnomah County)",
  "supportive-housing": "Metro Supportive Housing Services Tax",
};

export const ALL_FUND_SLUGS = Object.keys(FUND_NAMES);

const PDX_SPEND_CONTENT_DIR = path.resolve(
  process.cwd(),
  "../pdx-spend/src/content/funds",
);

interface PipelineRequest {
  fundSlug: string;
  workProductType: WorkProductType;
}

interface PipelineResult {
  outputId: string;
  status: "succeeded" | "failed" | "skipped";
  attemptCount: number;
  reason?: string;
}

interface CitationVerdict {
  verdict: "pass" | "fail";
  unsupported_claims?: Array<{ claim: string; reason: string }>;
  notes?: string;
}

function pickPrompt(workProductType: WorkProductType) {
  return workProductType === "weekly-memo"
    ? WEEKLY_MEMO_PROMPT
    : MONTHLY_CASH_FLOW_PROMPT;
}

async function callAnthropicText(prompt: string): Promise<string> {
  const message = await anthropic.messages.create(
    {
      model: MODEL_VERSION,
      max_tokens: 8192,
      messages: [{ role: "user", content: prompt }],
    },
    { timeout: 120_000 },
  );
  const block = message.content[0];
  if (!block || block.type !== "text") {
    throw new Error("Anthropic returned a non-text content block");
  }
  return block.text;
}

function parseCitationVerdict(raw: string): CitationVerdict {
  // Strip common markdown code fences before locating the JSON object.
  const stripped = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();
  const start = stripped.indexOf("{");
  const end = stripped.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("Citation check did not return JSON");
  }
  const json = stripped.slice(start, end + 1);
  const parsed = JSON.parse(json) as CitationVerdict;
  if (parsed.verdict !== "pass" && parsed.verdict !== "fail") {
    throw new Error(`Citation check returned invalid verdict: ${String(parsed.verdict)}`);
  }
  return parsed;
}

async function findExistingForSnapshot(
  fundSlug: string,
  workProductType: WorkProductType,
  snapshotHash: string,
): Promise<AgentOutput | null> {
  const rows = await db
    .select()
    .from(agentOutputsTable)
    .where(
      and(
        eq(agentOutputsTable.fundSlug, fundSlug),
        eq(agentOutputsTable.workProductType, workProductType),
        eq(agentOutputsTable.corpusSnapshotHash, snapshotHash),
        eq(agentOutputsTable.status, "succeeded"),
      ),
    )
    .orderBy(desc(agentOutputsTable.createdAt))
    .limit(1);
  return rows[0] ?? null;
}

async function writeMemoToSvelteContent(
  fundSlug: string,
  workProductType: WorkProductType,
  markdown: string,
): Promise<string> {
  await mkdir(PDX_SPEND_CONTENT_DIR, { recursive: true });
  const fileName =
    workProductType === "weekly-memo" ? "latest-memo.md" : "latest-cash-flow.md";
  const target = path.join(PDX_SPEND_CONTENT_DIR, fundSlug, fileName);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, markdown, "utf8");
  return target;
}

export async function runPipeline(req: PipelineRequest): Promise<PipelineResult> {
  const { fundSlug, workProductType } = req;
  const fundName = FUND_NAMES[fundSlug];
  if (!fundName) {
    return {
      outputId: "",
      status: "failed",
      attemptCount: 0,
      reason: `Unknown fundSlug: ${fundSlug}`,
    };
  }

  const snapshot = await buildSnapshot(fundSlug);
  logger.info(
    { fundSlug, workProductType, docCount: snapshot.documents.length, snapshotHash: snapshot.snapshotHash },
    "pipeline.snapshot.built",
  );

  const existing = await findExistingForSnapshot(fundSlug, workProductType, snapshot.snapshotHash);
  if (existing) {
    logger.info({ fundSlug, workProductType, outputId: existing.id }, "pipeline.idempotent.skip");
    return { outputId: existing.id, status: "skipped", attemptCount: 0, reason: "Corpus unchanged" };
  }

  const { template, version: promptVersion } = pickPrompt(workProductType);
  const corpusBlock = renderSnapshotForPrompt(snapshot.documents);
  const newsBlock = renderNewsBlock(snapshot.newsDocuments);
  const generationPrompt = renderTemplate(template, {
    FUND_NAME: fundName,
    FUND_SLUG: fundSlug,
    CORPUS_SNAPSHOT: corpusBlock,
    NEWS_BLOCK: newsBlock,
  });

  const outputId = randomUUID();
  let lastError: string | undefined;
  let attempt = 0;

  for (attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      logger.info({ fundSlug, workProductType, attempt }, "pipeline.generation.start");
      const draft = await callAnthropicText(generationPrompt);

      logger.info({ fundSlug, workProductType, attempt }, "pipeline.citation.start");
      const checkPrompt = renderTemplate(CITATION_CHECK_PROMPT.template, {
        DRAFT: draft,
        CORPUS_SNAPSHOT: corpusBlock,
      });
      const checkRaw = await callAnthropicText(checkPrompt);
      const verdict = parseCitationVerdict(checkRaw);

      if (verdict.verdict !== "pass") {
        lastError = `citation-check failed: ${verdict.notes ?? ""} (unsupported=${verdict.unsupported_claims?.length ?? 0})`;
        logger.warn({ fundSlug, workProductType, attempt, lastError }, "pipeline.citation.fail");
        continue;
      }

      const targetPath = await writeMemoToSvelteContent(fundSlug, workProductType, draft);
      logger.info({ fundSlug, workProductType, targetPath }, "pipeline.publish.markdown");

      let pdfObjectPath: string | null = null;
      try {
        pdfObjectPath = await renderMemoToPdf({
          fundSlug,
          workProductType,
          markdown: draft,
          outputId,
        });
      } catch (err) {
        logger.error({ err: (err as Error).message }, "pipeline.pdf.failed");
      }

      let blueskyPostUri: string | null = null;
      try {
        blueskyPostUri = await postToBluesky({
          fundSlug,
          fundName,
          workProductType,
        });
      } catch (err) {
        logger.error({ err: (err as Error).message }, "pipeline.bluesky.failed");
      }

      await db.insert(agentOutputsTable).values({
        id: outputId,
        fundSlug,
        workProductType,
        modelVersion: MODEL_VERSION,
        promptVersion,
        corpusSnapshotHash: snapshot.snapshotHash,
        renderedMarkdown: draft,
        citationReport: JSON.stringify(verdict),
        pdfObjectPath,
        blueskyPostUri,
        status: "succeeded",
        attemptCount: attempt,
        publishedAt: new Date(),
      });

      logger.info({ fundSlug, workProductType, outputId, attempt }, "pipeline.publish.complete");
      return { outputId, status: "succeeded", attemptCount: attempt };
    } catch (err) {
      lastError = (err as Error).message;
      logger.error({ fundSlug, workProductType, attempt, err: lastError }, "pipeline.attempt.error");
    }
  }

  await db.insert(agentOutputsTable).values({
    id: outputId,
    fundSlug,
    workProductType,
    modelVersion: MODEL_VERSION,
    promptVersion,
    corpusSnapshotHash: snapshot.snapshotHash,
    renderedMarkdown: "",
    status: "failed",
    attemptCount: attempt - 1,
    errorMessage: lastError ?? "Unknown error",
  });

  return { outputId, status: "failed", attemptCount: attempt - 1, reason: lastError };
}
