import { createHash } from "node:crypto";
import { and, desc, eq, gte } from "drizzle-orm";
import { db, corpusDocumentsTable, type CorpusDocument } from "@workspace/db";

export interface CorpusSnapshot {
  documents: CorpusDocument[];
  newsDocuments: CorpusDocument[];
  snapshotHash: string;
}

const CORPUS_CHAR_BUDGET = 60_000;
const PER_DOC_CHAR_BUDGET = 8_000;

export async function buildSnapshot(fundSlug: string): Promise<CorpusSnapshot> {
  const all = await db
    .select()
    .from(corpusDocumentsTable)
    .where(eq(corpusDocumentsTable.fundSlug, fundSlug))
    .orderBy(desc(corpusDocumentsTable.fetchedAt));

  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
  const recentNews = await db
    .select()
    .from(corpusDocumentsTable)
    .where(
      and(
        eq(corpusDocumentsTable.fundSlug, fundSlug),
        eq(corpusDocumentsTable.docType, "news"),
        gte(corpusDocumentsTable.fetchedAt, ninetyDaysAgo),
      ),
    )
    .orderBy(desc(corpusDocumentsTable.fetchedAt));

  const ordered = [...all].sort((a, b) => {
    const rank: Record<string, number> = {
      ordinance: 0,
      audit: 1,
      "financial-report": 2,
      "council-minute": 3,
      news: 4,
    };
    return (rank[a.docType] ?? 9) - (rank[b.docType] ?? 9);
  });

  const trimmed: CorpusDocument[] = [];
  let total = 0;
  for (const d of ordered) {
    const text = d.extractedText.slice(0, PER_DOC_CHAR_BUDGET);
    if (total + text.length > CORPUS_CHAR_BUDGET) break;
    trimmed.push({ ...d, extractedText: text });
    total += text.length;
  }

  const hashInput = trimmed
    .map((d) => `${d.id}:${d.contentHash}`)
    .sort()
    .join("|");
  const snapshotHash = createHash("sha256").update(hashInput).digest("hex");

  return { documents: trimmed, newsDocuments: recentNews, snapshotHash };
}

export function renderSnapshotForPrompt(docs: CorpusDocument[]): string {
  if (docs.length === 0) {
    return "(No corpus documents are available for this fund yet.)";
  }
  return docs
    .map((d, i) => {
      const header = `[Doc ${i + 1}] type=${d.docType} title=${d.title ?? "(untitled)"} url=${d.sourceUrl}`;
      return `${header}\n${d.extractedText}`;
    })
    .join("\n\n---\n\n");
}

export function renderNewsBlock(docs: CorpusDocument[]): string {
  if (docs.length === 0) {
    return "(No news documents in the last 90 days.)";
  }
  return docs
    .slice(0, 10)
    .map((d) => `- ${d.fetchedAt.toISOString().slice(0, 10)} — ${d.title ?? d.sourceUrl} (${d.sourceUrl})`)
    .join("\n");
}
