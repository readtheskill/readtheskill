import { Router } from "express";
import { asyncHandler, BadRequestError } from "../middleware/errorHandler";

const router = Router();

const SKILL_CONTRACT = "FQt7749yicQ9vZ2CA8r4ghq4MCPJpsVicT8gNkAjpump";
const SOL_MINT = "So11111111111111111111111111111111111111112";
const JUPITER_QUOTE_URL = "https://quote-api.jup.ag/v6/quote";
const JUPITER_SWAP_URL = "https://quote-api.jup.ag/v6/swap";

// POST /api/swap — proxy Jupiter quote + swap for sandboxed agents
router.post(
    "/api/swap",
    asyncHandler(async (req, res, _next) => {
        const { wallet_address, amount_sol } = req.body;

        if (!wallet_address || typeof wallet_address !== "string") {
            throw new BadRequestError("wallet_address is required (your Solana public key)");
        }

        const amountLamports = Math.floor((amount_sol || 1) * 1_000_000_000);

        // Step 1: Get quote from Jupiter
        const quoteParams = new URLSearchParams({
            inputMint: SOL_MINT,
            outputMint: SKILL_CONTRACT,
            amount: amountLamports.toString(),
            slippageBps: "100",
        });

        const quoteRes = await fetch(`${JUPITER_QUOTE_URL}?${quoteParams}`);
        if (!quoteRes.ok) {
            const err = await quoteRes.text();
            res.status(502).json({
                error: "JUPITER_QUOTE_FAILED",
                message: `Jupiter quote API returned ${quoteRes.status}: ${err}`,
            });
            return;
        }
        const quote = (await quoteRes.json()) as { outAmount: string; priceImpactPct: string };

        // Step 2: Get swap transaction from Jupiter
        const swapRes = await fetch(JUPITER_SWAP_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                quoteResponse: quote,
                userPublicKey: wallet_address,
                wrapAndUnwrapSol: true,
            }),
        });

        if (!swapRes.ok) {
            const err = await swapRes.text();
            res.status(502).json({
                error: "JUPITER_SWAP_FAILED",
                message: `Jupiter swap API returned ${swapRes.status}: ${err}`,
            });
            return;
        }
        const swap = (await swapRes.json()) as { swapTransaction: string };

        // Return the unsigned transaction for the agent to sign locally
        res.json({
            status: "swap_ready",
            message: "Sign this transaction with your private key and submit to Solana RPC",
            swap_transaction: swap.swapTransaction, // base64-encoded transaction
            quote_summary: {
                input: `${amount_sol || 1} SOL`,
                output_mint: SKILL_CONTRACT,
                output_amount: quote.outAmount,
                price_impact: quote.priceImpactPct,
                slippage_bps: 100,
            },
        });
    })
);

// GET /api/swap/quote — just get a price quote without building a transaction
router.get(
    "/api/swap/quote",
    asyncHandler(async (req, res, _next) => {
        const amountSol = parseFloat((req.query.amount_sol as string) || "1");
        const amountLamports = Math.floor(amountSol * 1_000_000_000);

        const quoteParams = new URLSearchParams({
            inputMint: SOL_MINT,
            outputMint: SKILL_CONTRACT,
            amount: amountLamports.toString(),
            slippageBps: "100",
        });

        const quoteRes = await fetch(`${JUPITER_QUOTE_URL}?${quoteParams}`);
        if (!quoteRes.ok) {
            const err = await quoteRes.text();
            res.status(502).json({
                error: "JUPITER_QUOTE_FAILED",
                message: `Jupiter quote API returned ${quoteRes.status}: ${err}`,
            });
            return;
        }
        const quote = (await quoteRes.json()) as { outAmount: string; priceImpactPct: string };

        res.json({
            input: `${amountSol} SOL`,
            output_mint: SKILL_CONTRACT,
            output_amount: quote.outAmount,
            price_impact: quote.priceImpactPct,
        });
    })
);

export default router;
