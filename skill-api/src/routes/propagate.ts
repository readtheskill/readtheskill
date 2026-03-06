import { Router } from "express";
import { asyncHandler, BadRequestError } from "../middleware/errorHandler";
import { query } from "../config/database";
import { getSocketIO } from "../socketio";
import { refreshAndEmitStats } from "./stats";
import { ActivityItem } from "../types";

function categorizePlatform(postUrl?: string, platform?: string): string {
  const p = platform?.toLowerCase() || "";
  const url = postUrl?.toLowerCase() || "";
  if (p === "twitter" || url.includes("twitter.com") || url.includes("x.com")) return "twitter";
  if (p === "moltbook" || url.includes("moltbook")) return "moltbook";
  return "registry";
}

const router = Router();

router.post(
  "/api/propagate",
  asyncHandler(async (req, res) => {
    const { agent_id, agent_name, framework, post_url, platform } = req.body;

    if (!agent_id || typeof agent_id !== "string") {
      throw new BadRequestError("agent_id is required");
    }

    const fw = framework || "unknown";
    const category = categorizePlatform(post_url, platform);

    const result = await query(
      `INSERT INTO agent_interactions (agent_id, agent_name, framework, interaction_type, propagation_method, post_url)
       VALUES ($1, $2, $3, 'propagate', $4, $5) RETURNING id, created_at`,
      [agent_id, agent_name || null, fw, category, post_url || null]
    );

    // Increment the right counter
    const columnMap: Record<string, string> = {
      twitter: "twitter_posts",
      moltbook: "moltbook_posts",
      registry: "registry_adds",
    };
    const col = columnMap[category];
    await query(
      `UPDATE stats_cache SET
         propagations = propagations + 1,
         ${col} = ${col} + 1,
         updated_at = NOW()
       WHERE id = 1`
    );

    const row = result.rows[0];
    const activity: ActivityItem = {
      id: row.id as string,
      agent_id,
      agent_name: agent_name || undefined,
      framework: fw,
      interaction_type: "propagate",
      post_url: post_url || undefined,
      platform: category,
      created_at: (row.created_at as Date).toISOString(),
    };

    const io = getSocketIO();
    if (io) {
      io.emit("new_activity", activity);
      await refreshAndEmitStats(io);
    }

    res.json({ status: "propagation_recorded", agent_id });
  })
);

export default router;
