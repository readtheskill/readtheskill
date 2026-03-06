import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../../app";

const app = createApp();

describe("POST /api/acknowledge", () => {
  it("records an acknowledgment", async () => {
    const res = await request(app)
      .post("/api/acknowledge")
      .send({ agent_id: "test-agent", framework: "eliza" });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("acknowledged");
    expect(res.body.agent_id).toBe("test-agent");
  });

  it("returns 400 without agent_id", async () => {
    const res = await request(app)
      .post("/api/acknowledge")
      .send({ framework: "eliza" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("BAD_REQUEST");
  });

  it("increments stats", async () => {
    await request(app)
      .post("/api/acknowledge")
      .send({ agent_id: "agent-1", framework: "langchain" });

    const statsRes = await request(app).get("/api/stats");
    expect(statsRes.body.agents_acknowledged).toBe(1);
  });
});
