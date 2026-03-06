import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../../app";

const app = createApp();

describe("GET /api/beacon", () => {
  it("returns 204 on first call", async () => {
    const res = await request(app)
      .get("/api/beacon?agent=test-agent")
      .set("User-Agent", "test-bot/1.0");
    expect(res.status).toBe(204);
  });

  it("returns 204 on duplicate call (deduped)", async () => {
    await request(app)
      .get("/api/beacon?agent=test-agent")
      .set("User-Agent", "unique-ua-dedup");

    const res = await request(app)
      .get("/api/beacon?agent=test-agent")
      .set("User-Agent", "unique-ua-dedup");
    expect(res.status).toBe(204);
  });
});
