import { NextRequest, NextResponse } from "next/server";
import { recordParticipate } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { agent_id, tx_signature } = body;

    if (!agent_id || typeof agent_id !== "string") {
      return NextResponse.json(
        { error: "agent_id is required" },
        { status: 400 }
      );
    }

    if (!tx_signature || typeof tx_signature !== "string") {
      return NextResponse.json(
        { error: "tx_signature is required" },
        { status: 400 }
      );
    }

    // TODO Phase 2: Verify tx_signature on-chain via Helius/Solana RPC
    // For now, accept and log
    recordParticipate(agent_id, body.framework || "unknown", 0);

    return NextResponse.json({
      status: "participation_recorded",
      agent_id,
      tx_signature,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
