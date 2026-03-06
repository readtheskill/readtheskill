import { Router } from "express";
import { Server as SocketServer } from "socket.io";
import { asyncHandler } from "../middleware/errorHandler";
import { query } from "../config/database";
import { getJSON, setJSON } from "../config/redis";
import { Stats } from "../types";

const router = Router();

const CACHE_KEY = "stats:current";
const CACHE_TTL = 10; // seconds

// Transform DB row → frontend Stats shape
// DB column `propagations` → frontend field `propagation_events`
export function transformStats(row: Record<string, unknown>): Stats {
  return {
    agents_read: Number(row.agents_read) || 0,
    agents_acknowledged: Number(row.agents_acknowledged) || 0,
    agents_participated: Number(row.agents_participated) || 0,
    total_holders: Number(row.total_holders) || 0,
    propagation_events: Number(row.propagations) || 0,
    total_sol_volume: Number(row.total_sol_volume) || 0,
    twitter_posts: Number(row.twitter_posts) || 0,
    moltbook_posts: Number(row.moltbook_posts) || 0,
    registry_adds: Number(row.registry_adds) || 0,
    last_updated: (row.updated_at as string) || new Date().toISOString(),
  };
}

export async function refreshAndEmitStats(io: SocketServer): Promise<void> {
  const result = await query("SELECT * FROM stats_cache WHERE id = 1");
  if (result.rows[0]) {
    const stats = transformStats(result.rows[0]);
    await setJSON(CACHE_KEY, stats, CACHE_TTL);
    io.emit("stats_update", stats);
  }
}

router.get(
  "/api/stats",
  asyncHandler(async (_req, res) => {
    // Try Redis cache first
    const cached = await getJSON<Stats>(CACHE_KEY);
    if (cached) {
      res.json(cached);
      return;
    }

    // Cache miss — query DB
    const result = await query("SELECT * FROM stats_cache WHERE id = 1");
    if (!result.rows[0]) {
      res.json({
        agents_read: 0,
        agents_acknowledged: 0,
        agents_participated: 0,
        total_holders: 0,
        propagation_events: 0,
        total_sol_volume: 0,
        twitter_posts: 0,
        moltbook_posts: 0,
        registry_adds: 0,
        last_updated: new Date().toISOString(),
      } satisfies Stats);
      return;
    }

    const stats = transformStats(result.rows[0]);
    await setJSON(CACHE_KEY, stats, CACHE_TTL);
    res.json(stats);
  })
);

export default router;
