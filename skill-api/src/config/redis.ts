import Redis from "ioredis";
import { env } from "./env";
import { logger } from "./logger";

export const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: 3,
  lazyConnect: true,
});

redis.on("connect", () => {
  logger.debug("Redis connected");
});

redis.on("error", (err) => {
  logger.error({ err }, "Redis error");
});

export async function isDuplicate(key: string, ttlSeconds: number): Promise<boolean> {
  const result = await redis.set(key, "1", "EX", ttlSeconds, "NX");
  return result === null; // null = key already existed = duplicate
}

export async function getJSON<T>(key: string): Promise<T | null> {
  const val = await redis.get(key);
  return val ? (JSON.parse(val) as T) : null;
}

export async function setJSON(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
  if (ttlSeconds) {
    await redis.setex(key, ttlSeconds, JSON.stringify(value));
  } else {
    await redis.set(key, JSON.stringify(value));
  }
}

export async function checkHealth(): Promise<boolean> {
  try {
    const result = await redis.ping();
    return result === "PONG";
  } catch {
    return false;
  }
}

export async function closeRedis(): Promise<void> {
  await redis.quit();
}
