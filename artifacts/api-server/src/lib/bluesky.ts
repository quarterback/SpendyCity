import { logger } from "./logger";
import type { WorkProductType } from "@workspace/db";

const SITE_URL =
  process.env.PDX_SPEND_SITE_URL?.replace(/\/$/, "") ?? "https://pdx-spend.example";

interface PostInput {
  fundSlug: string;
  fundName: string;
  workProductType: WorkProductType;
}

interface BlueskyCreateRecordResponse {
  uri: string;
  cid: string;
}

interface BlueskySession {
  accessJwt: string;
  did: string;
}

async function login(handle: string, password: string): Promise<BlueskySession> {
  const res = await fetch("https://bsky.social/xrpc/com.atproto.server.createSession", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ identifier: handle, password }),
  });
  if (!res.ok) {
    throw new Error(`Bluesky login failed: ${res.status} ${await res.text()}`);
  }
  const json = (await res.json()) as { accessJwt: string; did: string };
  return { accessJwt: json.accessJwt, did: json.did };
}

export async function postToBluesky(input: PostInput): Promise<string | null> {
  const handle = process.env.BLUESKY_HANDLE;
  const password = process.env.BLUESKY_APP_PASSWORD;
  if (!handle || !password) {
    logger.warn(
      { fundSlug: input.fundSlug },
      "bluesky.skipped.no-credentials",
    );
    return null;
  }

  const product =
    input.workProductType === "weekly-memo" ? "Weekly memo" : "Monthly cash-flow model";
  const url = `${SITE_URL}/funds/${input.fundSlug}/`;
  const text = `${product}: ${input.fundName}. ${url}`;

  const facetStart = text.indexOf(url);
  const facets =
    facetStart >= 0
      ? [
          {
            index: { byteStart: facetStart, byteEnd: facetStart + url.length },
            features: [{ $type: "app.bsky.richtext.facet#link", uri: url }],
          },
        ]
      : undefined;

  const session = await login(handle, password);
  const res = await fetch("https://bsky.social/xrpc/com.atproto.repo.createRecord", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${session.accessJwt}`,
    },
    body: JSON.stringify({
      repo: session.did,
      collection: "app.bsky.feed.post",
      record: {
        $type: "app.bsky.feed.post",
        text,
        createdAt: new Date().toISOString(),
        facets,
      },
    }),
  });
  if (!res.ok) {
    throw new Error(`Bluesky createRecord failed: ${res.status} ${await res.text()}`);
  }
  const json = (await res.json()) as BlueskyCreateRecordResponse;
  logger.info({ uri: json.uri }, "bluesky.posted");
  return json.uri;
}
