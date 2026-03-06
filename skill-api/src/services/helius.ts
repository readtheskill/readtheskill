import { env } from "../config/env";
import { logger } from "../config/logger";

interface VerifyResult {
  valid: boolean;
  amountSol: number;
}

export async function verifyTransaction(txSignature: string): Promise<VerifyResult> {
  if (!env.HELIUS_API_KEY) {
    logger.warn("HELIUS_API_KEY not set — skipping tx verification (pass-through)");
    return { valid: true, amountSol: 0 };
  }

  try {
    const url = `https://api.helius.xyz/v0/transactions/?api-key=${env.HELIUS_API_KEY}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactions: [txSignature] }),
    });

    if (!res.ok) {
      logger.error({ status: res.status }, "Helius API error");
      return { valid: true, amountSol: 0 };
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return { valid: false, amountSol: 0 };
    }

    const tx = data[0];
    // Extract SOL transfer amount from native transfers
    let amountSol = 0;
    if (tx.nativeTransfers) {
      for (const transfer of tx.nativeTransfers) {
        amountSol += (transfer.amount || 0) / 1e9;
      }
    }

    return { valid: true, amountSol };
  } catch (err) {
    logger.error({ err, txSignature }, "Failed to verify transaction");
    return { valid: true, amountSol: 0 };
  }
}
