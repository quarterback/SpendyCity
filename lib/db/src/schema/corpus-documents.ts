import { pgTable, text, timestamp, uniqueIndex, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const corpusDocumentsTable = pgTable(
  "corpus_documents",
  {
    id: text("id").primaryKey(),
    fundSlug: text("fund_slug").notNull(),
    docType: text("doc_type").notNull(),
    sourceUrl: text("source_url").notNull(),
    contentHash: text("content_hash").notNull(),
    title: text("title"),
    extractedText: text("extracted_text").notNull(),
    contentType: text("content_type"),
    fetchedAt: timestamp("fetched_at", { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    // Dedupe per fund so two funds may legitimately reference the same
    // source document without losing the per-fund linkage.
    fundHashUnique: uniqueIndex("corpus_documents_fund_hash_idx").on(
      t.fundSlug,
      t.contentHash,
    ),
    fundIdx: index("corpus_documents_fund_idx").on(t.fundSlug),
    fundTypeIdx: index("corpus_documents_fund_type_idx").on(t.fundSlug, t.docType),
  }),
);

export const insertCorpusDocumentSchema = createInsertSchema(corpusDocumentsTable).omit({
  createdAt: true,
});
export type InsertCorpusDocument = z.infer<typeof insertCorpusDocumentSchema>;
export type CorpusDocument = typeof corpusDocumentsTable.$inferSelect;

export const DOC_TYPES = [
  "ordinance",
  "audit",
  "financial-report",
  "council-minute",
  "news",
] as const;
export type DocType = (typeof DOC_TYPES)[number];
