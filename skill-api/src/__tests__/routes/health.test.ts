import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../../app";

const app = createApp();

describe("GET /health", () => {
  it("returns ok when db and redis are up", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.db).toBe("ok");
    expect(res.body.redis).toBe("ok");
    expect(res.body.timestamp).toBeDefined();
  });
});
