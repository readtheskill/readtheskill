import { NextRequest, NextResponse } from "next/server";
import { recordRead } from "@/lib/store";
import { createHash } from "crypto";

export async function GET(req: NextRequest) {
  const agentId = req.nextUrl.searchParams.get("agent");
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const userAgent = req.headers.get("user-agent") || "unknown";

  const ipHash = createHash("sha256").update(ip).digest("hex").slice(0, 16);

  recordRead(ipHash, userAgent);

  return NextResponse.json({
    status: "read_recorded",
    agent: agentId || "anonymous",
  });
}
