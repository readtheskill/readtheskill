import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../../app";

const app = createApp();

describe("GET /api/stats", () => {
  it("returns stats with correct shape", async () => {
    const res = await request(app).get("/api/stats");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("agents_read");
    expect(res.body).toHaveProperty("agents_acknowledged");
    expect(res.body).toHaveProperty("agents_participated");
    expect(res.body).toHaveProperty("total_holders");
    expect(res.body).toHaveProperty("propagation_events");
    expect(res.body).toHaveProperty("total_sol_volume");
    expect(res.body).toHaveProperty("twitter_posts");
    expect(res.body).toHaveProperty("moltbook_posts");
    expect(res.body).toHaveProperty("registry_adds");
    expect(res.body).toHaveProperty("last_updated");
  });

  it("starts with zero values", async () => {
    const res = await request(app).get("/api/stats");

    expect(res.body.agents_read).toBe(0);
    expect(res.body.agents_acknowledged).toBe(0);
    expect(res.body.propagation_events).toBe(0);
  });
});
