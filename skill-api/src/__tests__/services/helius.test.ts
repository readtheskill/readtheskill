import { describe, it, expect, vi } from "vitest";
import { verifyTransaction } from "../../services/helius";

describe("helius.verifyTransaction", () => {
  it("returns pass-through when no API key", async () => {
    const result = await verifyTransaction("fake-signature");
    // Without HELIUS_API_KEY set, should pass through
    expect(result.valid).toBe(true);
    expect(result.amountSol).toBe(0);
  });
});
