import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../../app";

const app = createApp();

describe("POST /api/participate", () => {
  it("records participation with tx_signature", async () => {
    const res = await request(app)
      .post("/api/participate")
      .send({ agent_id: "test-agent", tx_signature: "5abc123def" });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("participation_recorded");
    expect(res.body.tx_signature).toBe("5abc123def");
  });

  it("returns 400 without agent_id", async () => {
    const res = await request(app)
      .post("/api/participate")
      .send({ tx_signature: "5abc123def" });

    expect(res.status).toBe(400);
  });

  it("returns 400 without tx_signature", async () => {
    const res = await request(app)
      .post("/api/participate")
      .send({ agent_id: "test-agent" });

    expect(res.status).toBe(400);
  });
});
