import { Router, type IRouter } from "express";
import { desc, eq } from "drizzle-orm";
import { db, agentOutputsTable, scheduledRunsTable } from "@workspace/db";
import { runPipeline, ALL_FUND_SLUGS } from "../lib/agent/pipeline";
import { runWeeklyMemoJob, runMonthlyCashFlowJob, runDailyNewsIngestionJob } from "../lib/scheduler";

const router: IRouter = Router();

const VALID_PRODUCTS = ["weekly-memo", "monthly-cash-flow"] as const;

router.post("/agent/run", async (req, res): Promise<void> => {
  const adminToken = process.env.PDX_SPEND_ADMIN_TOKEN;
  if (adminToken && req.headers.authorization !== `Bearer ${adminToken}`) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const fundSlug = typeof req.body?.fundSlug === "string" ? req.body.fundSlug : null;
  const workProductType = typeof req.body?.workProductType === "string" ? req.body.workProductType : null;
  if (!fundSlug || !ALL_FUND_SLUGS.includes(fundSlug)) {
    res.status(400).json({ error: "Invalid or missing fundSlug" });
    return;
  }
  if (!workProductType || !(VALID_PRODUCTS as readonly string[]).includes(workProductType)) {
    res.status(400).json({ error: "Invalid or missing workProductType" });
    return;
  }
  req.log.info({ fundSlug, workProductType }, "agent.run.requested");
  const result = await runPipeline({
    fundSlug,
    workProductType: workProductType as (typeof VALID_PRODUCTS)[number],
  });
  res.status(result.status === "failed" ? 500 : 200).json(result);
});

router.post("/agent/jobs/:jobName", async (req, res): Promise<void> => {
  const adminToken = process.env.PDX_SPEND_ADMIN_TOKEN;
  if (adminToken && req.headers.authorization !== `Bearer ${adminToken}`) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const raw = req.params.jobName;
  const jobName = Array.isArray(raw) ? raw[0] : raw;
  req.log.info({ jobName }, "agent.job.requested");
  if (jobName === "weekly-memo") {
    await runWeeklyMemoJob();
  } else if (jobName === "monthly-cash-flow") {
    await runMonthlyCashFlowJob();
  } else if (jobName === "daily-news") {
    await runDailyNewsIngestionJob();
  } else {
    res.status(400).json({ error: "Unknown jobName" });
    return;
  }
  res.json({ ok: true, jobName });
});

router.get("/agent/outputs/:fundSlug", async (req, res): Promise<void> => {
  const raw = req.params.fundSlug;
  const fundSlug = Array.isArray(raw) ? raw[0] : raw;
  if (!ALL_FUND_SLUGS.includes(fundSlug)) {
    res.status(404).json({ error: "Unknown fundSlug" });
    return;
  }
  const rows = await db
    .select()
    .from(agentOutputsTable)
    .where(eq(agentOutputsTable.fundSlug, fundSlug))
    .orderBy(desc(agentOutputsTable.createdAt))
    .limit(20);
  res.json({ fundSlug, outputs: rows });
});

router.get("/agent/runs", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(scheduledRunsTable)
    .orderBy(desc(scheduledRunsTable.startedAt))
    .limit(50);
  res.json({ runs: rows });
});

export default router;
