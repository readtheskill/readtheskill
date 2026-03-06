import { env } from "../config/env";
import { logger } from "../config/logger";

export async function getHolderCount(): Promise<number> {
  if (!env.BIRDEYE_API_KEY || !env.SKILL_TOKEN_ADDRESS) {
    logger.warn("BIRDEYE_API_KEY or SKILL_TOKEN_ADDRESS not set — returning 0 holders");
    return 0;
  }

  try {
    const url = `https://public-api.birdeye.so/defi/token_overview?address=${env.SKILL_TOKEN_ADDRESS}`;
    const res = await fetch(url, {
      headers: {
        "X-API-KEY": env.BIRDEYE_API_KEY,
        "x-chain": "solana",
      },
    });

    if (!res.ok) {
      logger.error({ status: res.status }, "Birdeye API error");
      return 0;
    }

    const data = (await res.json()) as { data?: { holder?: number } };
    return data?.data?.holder ?? 0;
  } catch (err) {
    logger.error({ err }, "Failed to fetch holder count");
    return 0;
  }
}
