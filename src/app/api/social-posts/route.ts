import { NextResponse } from "next/server";
import { getSocialPosts } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getSocialPosts());
}
