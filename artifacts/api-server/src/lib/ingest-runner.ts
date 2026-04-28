import { createHash, randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { db, corpusDocumentsTable, DOC_TYPES, type DocType } from "@workspace/db";
import { logger } from "./logger";

interface IngestEntry {
  docType: string;
  title?: string;
  sourceUrl: string;
}

function isDocType(t: string): t is DocType {
  return (DOC_TYPES as readonly string[]).includes(t);
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
  entry: IngestEntry,
): Promise<"inserted" | "skipped" | "failed"> {
  if (!isDocType(entry.docType)) {
    logger.warn({ docType: entry.docType, url: entry.sourceUrl }, "ingest.unknown-type");
    return "failed";
  }
  try {
    const res = await fetch(entry.sourceUrl, {
      headers: {
        "user-agent":
          "PDXSpendCorpusBot/0.1 (+https://pdx-spend.example) State Capacity AI",
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      redirect: "follow",
    });
    if (!res.ok) {
      logger.warn({ status: res.status, url: entry.sourceUrl }, "ingest.http-error");
      return "failed";
    }
    const contentType = res.headers.get("content-type") ?? "application/octet-stream";
    const buf = Buffer.from(await res.arrayBuffer());
    const isText = /text|html|json|xml/i.test(contentType);
    const text = isText ? buf.toString("utf8") : `[binary content-type=${contentType} bytes=${buf.length}]`;
    const extracted = (isText && /html/i.test(contentType) ? stripHtml(text) : text).slice(0, 200_000);
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
      extractedText: extracted,
      contentType,
    });
    return "inserted";
  } catch (err) {
    logger.error({ err: (err as Error).message, url: entry.sourceUrl }, "ingest.exception");
    return "failed";
  }
}
