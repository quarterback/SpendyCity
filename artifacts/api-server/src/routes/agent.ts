import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { desc, eq } from "drizzle-orm";
import { db, agentOutputsTable, scheduledRunsTable } from "@workspace/db";
import { runPipeline, ALL_FUND_SLUGS } from "../lib/agent/pipeline";
import {
  runWeeklyMemoJob,
  runMonthlyCashFlowJob,
  runDailyNewsIngestionJob,
} from "../lib/scheduler";
import { downloadPrivateObject, ObjectNotFoundError } from "../lib/objectStorage";

const router: IRouter = Router();

const VALID_PRODUCTS = ["weekly-memo", "monthly-cash-flow"] as const;

/**
 * Default-deny admin guard. Endpoints behind this guard require a bearer
 * token equal to PDX_SPEND_ADMIN_TOKEN. If the token is unset, requests
 * are rejected unless PDX_SPEND_ADMIN_OPEN=1 is explicitly enabled (for
 * local development only).
 */
function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const token = process.env.PDX_SPEND_ADMIN_TOKEN;
  if (!token) {
    if (process.env.PDX_SPEND_ADMIN_OPEN === "1") {
      next();
      return;
    }
    res
      .status(503)
      .json({ error: "Admin endpoints disabled: PDX_SPEND_ADMIN_TOKEN is not set" });
    return;
  }
  if (req.headers.authorization !== `Bearer ${token}`) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

router.post("/agent/run", requireAdmin, async (req, res): Promise<void> => {
  const fundSlug = typeof req.body?.fundSlug === "string" ? req.body.fundSlug : null;
  const workProductType =
    typeof req.body?.workProductType === "string" ? req.body.workProductType : null;
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

router.post("/agent/jobs/:jobName", requireAdmin, async (req, res): Promise<void> => {
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

router.get("/agent/pdfs/:fileName", async (req, res): Promise<void> => {
  const raw = req.params.fileName;
  const fileName = Array.isArray(raw) ? raw[0] : raw;
  // Filenames are agent-generated and look like
  // <slug>-<work>-<uuid>.pdf. Reject anything with path separators or
  // other suspicious characters.
  if (!/^[A-Za-z0-9._-]+\.pdf$/.test(fileName)) {
    res.status(400).json({ error: "Invalid filename" });
    return;
  }
  try {
    const { bytes, contentType } = await downloadPrivateObject(
      `agent-pdfs/${fileName}`,
    );
    res.setHeader("Content-Type", contentType || "application/pdf");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(bytes);
  } catch (err) {
    if (err instanceof ObjectNotFoundError) {
      res.status(404).json({ error: "PDF not found" });
      return;
    }
    req.log.error({ err: (err as Error).message, fileName }, "agent.pdf.serve.error");
    res.status(500).json({ error: "Failed to load PDF" });
  }
});

export default router;
