import { randomUUID } from "node:crypto";
import cron, { type ScheduledTask } from "node-cron";
import { eq } from "drizzle-orm";
import { db, scheduledRunsTable } from "@workspace/db";
import { logger } from "./logger";
import { ALL_FUND_SLUGS, runPipeline } from "./agent/pipeline";
import { ingestOne } from "./ingest-runner";

const TZ = "America/Los_Angeles";

function eqId(id: string) {
  return eq(scheduledRunsTable.id, id);
}

async function recordRun(jobName: string, work: () => Promise<{ ok: number; fail: number }>): Promise<void> {
  const id = randomUUID();
  const startedAt = new Date();
  await db.insert(scheduledRunsTable).values({
    id,
    jobName,
    status: "running",
    startedAt,
  });
  let ok = 0;
  let fail = 0;
  let status: "succeeded" | "failed" | "partial" = "succeeded";
  let notes: string | undefined;
  try {
    const r = await work();
    ok = r.ok;
    fail = r.fail;
    if (fail > 0 && ok === 0) status = "failed";
    else if (fail > 0) status = "partial";
  } catch (err) {
    status = "failed";
    notes = (err as Error).message;
    logger.error({ jobName, err: notes }, "scheduler.job.error");
  }
  const finishedAt = new Date();
  await db
    .update(scheduledRunsTable)
    .set({
      status,
      finishedAt,
      fundsProcessed: ok + fail,
      fundsSucceeded: ok,
      fundsFailed: fail,
      notes: notes ?? null,
    })
    .where(eqId(id));
  logger.info({ jobName, status, ok, fail, durationMs: finishedAt.getTime() - startedAt.getTime() }, "scheduler.job.done");
}

async function runForAllFunds(work: (fund: string) => Promise<boolean>): Promise<{ ok: number; fail: number }> {
  let ok = 0;
  let fail = 0;
  for (const slug of ALL_FUND_SLUGS) {
    try {
      const success = await work(slug);
      if (success) ok += 1; else fail += 1;
    } catch (err) {
      fail += 1;
      logger.error({ slug, err: (err as Error).message }, "scheduler.fund.error");
    }
  }
  return { ok, fail };
}

export async function runWeeklyMemoJob(): Promise<void> {
  await recordRun("weekly-memo", () =>
    runForAllFunds(async (slug) => {
      const r = await runPipeline({ fundSlug: slug, workProductType: "weekly-memo" });
      return r.status === "succeeded" || r.status === "skipped";
    }),
  );
}

export async function runMonthlyCashFlowJob(): Promise<void> {
  await recordRun("monthly-cash-flow", () =>
    runForAllFunds(async (slug) => {
      const r = await runPipeline({ fundSlug: slug, workProductType: "monthly-cash-flow" });
      return r.status === "succeeded" || r.status === "skipped";
    }),
  );
}

export async function runDailyNewsIngestionJob(): Promise<void> {
  await recordRun("daily-news-ingest", () =>
    runForAllFunds(async (slug) => {
      const r = await ingestOne(slug, {
        docType: "news",
        sourceUrl: `https://www.portland.gov/news?topic=${encodeURIComponent(slug)}`,
      });
      return r === "inserted" || r === "skipped";
    }),
  );
}

let weekly: ScheduledTask | null = null;
let monthly: ScheduledTask | null = null;
let daily: ScheduledTask | null = null;

export function startSchedulers(): void {
  if (process.env.PDX_SPEND_DISABLE_CRON === "1") {
    logger.warn("scheduler.disabled");
    return;
  }
  // Weekly memo: Mondays at 9am Pacific
  weekly = cron.schedule("0 9 * * 1", () => {
    void runWeeklyMemoJob();
  }, { timezone: TZ });

  // Monthly cash flow: first Monday of the month, 9am Pacific.
  // node-cron treats day-of-month + day-of-week as OR, so we run every
  // Monday and gate to the first one inside the callback.
  monthly = cron.schedule("0 9 * * 1", () => {
    const dom = new Date().getDate();
    if (dom > 7) return;
    void runMonthlyCashFlowJob();
  }, { timezone: TZ });

  // Daily news ingestion: 6am Pacific
  daily = cron.schedule("0 6 * * *", () => {
    void runDailyNewsIngestionJob();
  }, { timezone: TZ });

  logger.info("scheduler.started");
}

export function stopSchedulers(): void {
  weekly?.stop();
  monthly?.stop();
  daily?.stop();
  logger.info("scheduler.stopped");
}
