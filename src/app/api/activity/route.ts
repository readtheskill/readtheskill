import { NextResponse } from "next/server";
import { getActivity } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getActivity());
}
