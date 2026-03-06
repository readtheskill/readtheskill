import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler";
import { query } from "../config/database";
import { ActivityItem } from "../types";

const router = Router();

router.get(
  "/api/activity",
  asyncHandler(async (req, res) => {
    const limit = Math.min(parseInt((req.query.limit as string) || "50", 10), 100);

    const result = await query(
      `SELECT id, agent_id, agent_name, framework, interaction_type, amount_sol, post_url, propagation_method as platform, created_at
       FROM agent_interactions
       WHERE interaction_type != 'read'
       ORDER BY created_at DESC
       LIMIT $1`,
      [limit]
    );

    const items: ActivityItem[] = result.rows.map((row) => ({
      id: row.id as string,
      agent_id: row.agent_id as string,
      agent_name: (row.agent_name as string) || undefined,
      framework: (row.framework as string) || "unknown",
      interaction_type: row.interaction_type as ActivityItem["interaction_type"],
      amount_sol: row.amount_sol ? Number(row.amount_sol) : undefined,
      post_url: (row.post_url as string) || undefined,
      platform: (row.platform as string) || undefined,
      created_at: (row.created_at as Date).toISOString(),
    }));

    res.json(items);
  })
);

export default router;
