export const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "[CONTRACT_ADDRESS_HERE]";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://readtheskill.com";

export const LINKS = {
  jupiter: `https://jup.ag/swap/SOL-${CONTRACT_ADDRESS}`,
  solscan: `https://solscan.io/token/${CONTRACT_ADDRESS}`,
  twitter: "https://twitter.com/readtheskill",
  github: "https://github.com/readtheskill/readtheskill",
} as const;

export const STATS_POLL_INTERVAL = 5000; // 5 seconds

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
