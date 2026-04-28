import { pgTable, text, timestamp, integer, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const scheduledRunsTable = pgTable(
  "scheduled_runs",
  {
    id: text("id").primaryKey(),
    jobName: text("job_name").notNull(),
    fundSlug: text("fund_slug"),
    workProductType: text("work_product_type"),
    status: text("status").notNull().default("running"),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
    finishedAt: timestamp("finished_at", { withTimezone: true }),
    fundsProcessed: integer("funds_processed").notNull().default(0),
    fundsSucceeded: integer("funds_succeeded").notNull().default(0),
    fundsFailed: integer("funds_failed").notNull().default(0),
    notes: text("notes"),
  },
  (t) => ({
    jobIdx: index("scheduled_runs_job_idx").on(t.jobName),
    startedIdx: index("scheduled_runs_started_idx").on(t.startedAt),
  }),
);

export const insertScheduledRunSchema = createInsertSchema(scheduledRunsTable);
export type InsertScheduledRun = z.infer<typeof insertScheduledRunSchema>;
export type ScheduledRun = typeof scheduledRunsTable.$inferSelect;

export const RUN_STATUSES = ["running", "succeeded", "failed", "partial"] as const;
export type RunStatus = (typeof RUN_STATUSES)[number];
