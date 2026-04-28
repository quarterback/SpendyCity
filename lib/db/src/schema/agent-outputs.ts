import { pgTable, text, timestamp, integer, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const agentOutputsTable = pgTable(
  "agent_outputs",
  {
    id: text("id").primaryKey(),
    fundSlug: text("fund_slug").notNull(),
    workProductType: text("work_product_type").notNull(),
    modelVersion: text("model_version").notNull(),
    promptVersion: text("prompt_version").notNull(),
    corpusSnapshotHash: text("corpus_snapshot_hash").notNull(),
    renderedMarkdown: text("rendered_markdown").notNull(),
    citationReport: text("citation_report"),
    pdfObjectPath: text("pdf_object_path"),
    blueskyPostUri: text("bluesky_post_uri"),
    status: text("status").notNull().default("pending"),
    attemptCount: integer("attempt_count").notNull().default(1),
    errorMessage: text("error_message"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    fundIdx: index("agent_outputs_fund_idx").on(t.fundSlug),
    fundProductIdx: index("agent_outputs_fund_product_idx").on(t.fundSlug, t.workProductType),
  }),
);

export const insertAgentOutputSchema = createInsertSchema(agentOutputsTable).omit({
  createdAt: true,
});
export type InsertAgentOutput = z.infer<typeof insertAgentOutputSchema>;
export type AgentOutput = typeof agentOutputsTable.$inferSelect;

export const WORK_PRODUCT_TYPES = ["weekly-memo", "monthly-cash-flow"] as const;
export type WorkProductType = (typeof WORK_PRODUCT_TYPES)[number];

export const OUTPUT_STATUSES = ["pending", "succeeded", "failed", "skipped"] as const;
export type OutputStatus = (typeof OUTPUT_STATUSES)[number];
