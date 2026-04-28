import { Router, type IRouter } from "express";
import healthRouter from "./health";
import regenerateMemoRouter from "./regenerate-memo";

const router: IRouter = Router();

router.use(healthRouter);
router.use(regenerateMemoRouter);

export default router;
