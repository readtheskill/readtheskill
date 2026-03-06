import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../../app";

const app = createApp();

describe("POST /api/propagate", () => {
  it("records twitter propagation", async () => {
    const res = await request(app)
      .post("/api/propagate")
      .send({
        agent_id: "test-agent",
        platform: "twitter",
        post_url: "https://x.com/test/123",
      });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("propagation_recorded");

    const statsRes = await request(app).get("/api/stats");
    expect(statsRes.body.propagation_events).toBe(1);
    expect(statsRes.body.twitter_posts).toBe(1);
  });

  it("records moltbook propagation", async () => {
    const res = await request(app)
      .post("/api/propagate")
      .send({
        agent_id: "test-agent",
        platform: "moltbook",
        post_url: "https://moltbook.com/post/456",
      });

    expect(res.status).toBe(200);

    const statsRes = await request(app).get("/api/stats");
    expect(statsRes.body.moltbook_posts).toBe(1);
  });

  it("categorizes unknown platform as registry", async () => {
    await request(app)
      .post("/api/propagate")
      .send({ agent_id: "test-agent" });

    const statsRes = await request(app).get("/api/stats");
    expect(statsRes.body.registry_adds).toBe(1);
  });

  it("returns 400 without agent_id", async () => {
    const res = await request(app)
      .post("/api/propagate")
      .send({ platform: "twitter" });

    expect(res.status).toBe(400);
  });
});
