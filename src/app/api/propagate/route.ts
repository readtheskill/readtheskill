import { NextRequest, NextResponse } from "next/server";
import { recordPropagate } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { agent_id } = body;

    if (!agent_id || typeof agent_id !== "string") {
      return NextResponse.json(
        { error: "agent_id is required" },
        { status: 400 }
      );
    }

    recordPropagate(
      agent_id,
      body.framework || "unknown",
      body.post_url,
      body.platform
    );

    return NextResponse.json({ status: "propagation_recorded", agent_id });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
