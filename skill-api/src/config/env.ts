export const env = {
  PORT: parseInt(process.env.PORT || "3001", 10),
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:skill@localhost:5432/skill",
  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  HELIUS_API_KEY: process.env.HELIUS_API_KEY || "",
  BIRDEYE_API_KEY: process.env.BIRDEYE_API_KEY || "",
  SKILL_TOKEN_ADDRESS: process.env.SKILL_TOKEN_ADDRESS || "",
} as const;

export function validateEnv(): void {
  if (!process.env.DATABASE_URL && env.NODE_ENV === "production") {
    throw new Error("DATABASE_URL is required in production");
  }
  if (!process.env.REDIS_URL && env.NODE_ENV === "production") {
    throw new Error("REDIS_URL is required in production");
  }
}
