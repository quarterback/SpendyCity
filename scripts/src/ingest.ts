import { createHash, randomUUID } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { eq } from "drizzle-orm";
import { db, corpusDocumentsTable, DOC_TYPES, type DocType } from "@workspace/db";

import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FUNDS_DIR = path.resolve(
  __dirname,
  "../../artifacts/api-server/src/content/funds",
);

interface ManifestEntry {
  docType: string;
  title?: string;
  sourceUrl: string;
}

interface Manifest {
  fundSlug: string;
  fundName: string;
  documents: ManifestEntry[];
}

interface IngestResult {
  inserted: number;
  skipped: number;
  failed: number;
}

function isDocType(t: string): t is DocType {
  return (DOC_TYPES as readonly string[]).includes(t);
}

async function fetchAsText(url: string): Promise<{ text: string; contentType: string }> {
  const res = await fetch(url, {
    headers: {
      "user-agent":
        "PDXSpendCorpusBot/0.1 (+https://pdx-spend.example) State Capacity AI",
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
    redirect: "follow",
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  const contentType = res.headers.get("content-type") ?? "application/octet-stream";
  const buf = Buffer.from(await res.arrayBuffer());
  if (contentType.includes("text") || contentType.includes("html") || contentType.includes("json") || contentType.includes("xml")) {
    return { text: buf.toString("utf8"), contentType };
  }
  return {
    text: `[binary document, sha256=${createHash("sha256").update(buf).digest("hex")}, length=${buf.length} bytes, content-type=${contentType}]`,
    contentType,
  };
}

function stripHtml(s: string): string {
  return s
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export async function ingestOne(
  fundSlug: string,
  entry: ManifestEntry,
): Promise<"inserted" | "skipped" | "failed"> {
  if (!isDocType(entry.docType)) {
    console.warn(`[ingest] skipping unknown docType=${entry.docType} for ${entry.sourceUrl}`);
    return "failed";
  }
  try {
    const { text, contentType } = await fetchAsText(entry.sourceUrl);
    const extracted = contentType.includes("html") ? stripHtml(text) : text;
    const contentHash = createHash("sha256").update(extracted).digest("hex");

    const existing = await db
      .select({ id: corpusDocumentsTable.id })
      .from(corpusDocumentsTable)
      .where(eq(corpusDocumentsTable.contentHash, contentHash))
      .limit(1);
    if (existing.length > 0) {
      return "skipped";
    }

    await db.insert(corpusDocumentsTable).values({
      id: randomUUID(),
      fundSlug,
      docType: entry.docType,
      sourceUrl: entry.sourceUrl,
      contentHash,
      title: entry.title ?? null,
      extractedText: extracted.slice(0, 200_000),
      contentType,
    });
    return "inserted";
  } catch (err) {
    console.error(`[ingest] failed ${entry.sourceUrl}:`, (err as Error).message);
    return "failed";
  }
}

export async function ingestManifest(manifest: Manifest): Promise<IngestResult> {
  const result: IngestResult = { inserted: 0, skipped: 0, failed: 0 };
  for (const entry of manifest.documents) {
    const r = await ingestOne(manifest.fundSlug, entry);
    result[r] += 1;
  }
  return result;
}

async function readManifestForFund(fundSlug: string): Promise<Manifest> {
  const file = path.join(FUNDS_DIR, fundSlug, "corpus.json");
  return JSON.parse(await readFile(file, "utf8")) as Manifest;
}

async function listFundsWithManifests(): Promise<string[]> {
  const dirs = await readdir(FUNDS_DIR, { withFileTypes: true });
  return dirs.filter((d) => d.isDirectory()).map((d) => d.name);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2).filter((a) => a !== "--");
  if (args[0] === "--all") {
    const slugs = await listFundsWithManifests();
    let total: IngestResult = { inserted: 0, skipped: 0, failed: 0 };
    for (const slug of slugs) {
      const manifest = await readManifestForFund(slug);
      const r = await ingestManifest(manifest);
      console.log(`[ingest] ${slug}: inserted=${r.inserted} skipped=${r.skipped} failed=${r.failed}`);
      total = {
        inserted: total.inserted + r.inserted,
        skipped: total.skipped + r.skipped,
        failed: total.failed + r.failed,
      };
    }
    console.log(`[ingest] TOTAL: inserted=${total.inserted} skipped=${total.skipped} failed=${total.failed}`);
  } else if (args[0] === "--fund" && args[1]) {
    const manifest = await readManifestForFund(args[1]);
    const r = await ingestManifest(manifest);
    console.log(`[ingest] ${args[1]}: inserted=${r.inserted} skipped=${r.skipped} failed=${r.failed}`);
  } else if (args[0] === "--one" && args[1] && args[2] && args[3]) {
    const r = await ingestOne(args[1], {
      docType: args[2],
      sourceUrl: args[3],
    });
    console.log(`[ingest] ${args[1]} <- ${args[3]}: ${r}`);
  } else {
    console.log(
      `Usage:
  pnpm --filter @workspace/scripts run ingest -- --all
  pnpm --filter @workspace/scripts run ingest -- --fund <slug>
  pnpm --filter @workspace/scripts run ingest -- --one <fundSlug> <docType> <url>`,
    );
    process.exit(1);
  }
  process.exit(0);
}

const isCli = import.meta.url === `file://${process.argv[1]}`;
if (isCli) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
