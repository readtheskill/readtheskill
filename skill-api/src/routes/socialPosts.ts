import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler";
import { query } from "../config/database";
import { ActivityItem } from "../types";

const router = Router();

router.get(
  "/api/social-posts",
  asyncHandler(async (req, res) => {
    const limit = Math.min(parseInt((req.query.limit as string) || "20", 10), 50);

    const result = await query(
      `SELECT id, agent_id, agent_name, framework, interaction_type, post_url, propagation_method as platform, created_at
       FROM agent_interactions
       WHERE interaction_type = 'propagate' AND post_url IS NOT NULL
       ORDER BY created_at DESC
       LIMIT $1`,
      [limit]
    );

    const items: ActivityItem[] = result.rows.map((row) => ({
      id: row.id as string,
      agent_id: row.agent_id as string,
      agent_name: (row.agent_name as string) || undefined,
      framework: (row.framework as string) || "unknown",
      interaction_type: "propagate" as const,
      post_url: row.post_url as string,
      platform: (row.platform as string) || undefined,
      created_at: (row.created_at as Date).toISOString(),
    }));

    res.json(items);
  })
);

export default router;
