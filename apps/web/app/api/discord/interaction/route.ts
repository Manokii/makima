import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: Request) {
  console.log(request);
  return NextResponse.json({ message: "Hello, World!", request });
}
