import { describe, it, expect } from "vitest";
import { getHolderCount } from "../../services/birdeye";

describe("birdeye.getHolderCount", () => {
  it("returns 0 when no API key", async () => {
    const count = await getHolderCount();
    expect(count).toBe(0);
  });
});
