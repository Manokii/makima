import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  return NextResponse.json({ message: "Hello, World!" });
}
