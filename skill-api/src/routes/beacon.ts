import { Router } from "express";
import { createHash } from "crypto";
import { asyncHandler } from "../middleware/errorHandler";
import { isDuplicate } from "../config/redis";
import { query } from "../config/database";
import { getSocketIO } from "../socketio";
import { refreshAndEmitStats } from "./stats";

const router = Router();

router.get(
  "/api/beacon",
  asyncHandler(async (req, res) => {
    const agentId = (req.query.agent as string) || "anonymous";
    const ip = req.headers["x-forwarded-for"]?.toString() || req.ip || "unknown";
    const userAgent = req.headers["user-agent"] || "unknown";

    const ipHash = createHash("sha256").update(ip).digest("hex").slice(0, 16);
    const dedupKey = `beacon:${ipHash}:${createHash("sha256").update(userAgent).digest("hex").slice(0, 8)}`;

    const dupe = await isDuplicate(dedupKey, 86400); // 24h dedup
    if (!dupe) {
      // New unique read
      await query(
        `INSERT INTO agent_interactions (agent_id, interaction_type, ip_hash, user_agent)
         VALUES ($1, 'read', $2, $3)`,
        [agentId, ipHash, userAgent]
      );
      await query(
        "UPDATE stats_cache SET agents_read = agents_read + 1, updated_at = NOW() WHERE id = 1"
      );

      const io = getSocketIO();
      if (io) await refreshAndEmitStats(io);
    }

    res.status(204).end();
  })
);

export default router;
