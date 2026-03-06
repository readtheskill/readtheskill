import { beforeAll, afterAll, beforeEach } from "vitest";
import { Pool } from "pg";
import { readFileSync } from "fs";
import { join } from "path";
import { redis } from "../config/redis";

const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:skill@localhost:5432/skill";

let pool: Pool;

beforeAll(async () => {
  pool = new Pool({ connectionString: DATABASE_URL });
  await redis.connect();

  // Run schema
  const schema = readFileSync(join(__dirname, "..", "db", "schema.sql"), "utf-8");
  await pool.query(schema);
});

beforeEach(async () => {
  // Clear data between tests
  await pool.query("DELETE FROM agent_interactions");
  await pool.query(
    `UPDATE stats_cache SET
      agents_read = 0, agents_acknowledged = 0, agents_participated = 0,
      total_holders = 0, propagations = 0, twitter_posts = 0,
      moltbook_posts = 0, registry_adds = 0, total_sol_volume = 0,
      updated_at = NOW()
    WHERE id = 1`
  );
  // Clear Redis cache
  await redis.flushdb();
});

afterAll(async () => {
  await redis.quit();
  await pool.end();
});
