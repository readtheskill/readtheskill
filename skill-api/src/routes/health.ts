import { Router } from "express";
import { checkHealth as checkDb } from "../config/database";
import { checkHealth as checkRedis } from "../config/redis";

const router = Router();

router.get("/health", async (_req, res) => {
  const [db, redis] = await Promise.all([checkDb(), checkRedis()]);

  const status = db && redis ? 200 : 503;
  res.status(status).json({
    status: db && redis ? "ok" : "degraded",
    db: db ? "ok" : "down",
    redis: redis ? "ok" : "down",
    timestamp: new Date().toISOString(),
  });
});

export default router;
