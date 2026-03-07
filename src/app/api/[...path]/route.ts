import { NextRequest, NextResponse } from "next/server";

const API_BACKEND = "https://api.readtheskill.com";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const url = `${API_BACKEND}/api/${path.join("/")}${request.nextUrl.search}`;
    return NextResponse.redirect(url, 307);
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const body = await request.text();
    const res = await fetch(`${API_BACKEND}/api/${path.join("/")}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
    });
    const data = await res.text();
    return new NextResponse(data, {
        status: res.status,
        headers: { "Content-Type": "application/json" },
    });
}
