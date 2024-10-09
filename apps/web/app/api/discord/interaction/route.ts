import { NextResponse } from "next/server";
import nacl from "tweetnacl";
import { commands } from "~/app/lib/discord/commands";
import {
  type DiscordInteractionRequest,
  InteractionType,
} from "~/app/lib/discord/types/interaction";
import { env } from "~/env";

export const dynamic = "force-dynamic"; // defaults to auto
export const runtime = "edge";

export async function POST(request: Request) {
  const rawBody = await request.text();
  console.log("receiving request");

  // Verifying discord request
  const signature = request.headers.get("X-Signature-Ed25519") ?? "";
  const timestamp = request.headers.get("X-Signature-Timestamp") ?? "";

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + rawBody),
    Buffer.from(signature, "hex"),
    Buffer.from(env.DISCORD_PUBLIC_KEY, "hex"),
  );

  if (!isVerified) {
    return NextResponse.json({ message: "Invalid request" }, { status: 401 });
  }

  const body = JSON.parse(rawBody) as DiscordInteractionRequest;
  if (body.type === InteractionType.PING) {
    return NextResponse.json({ type: 1 }, { status: 200 });
  }

  const data = body.data;
  const cmdList = Object.values(commands);
  const command = cmdList.find((cmd) => cmd.names.includes(data.name));
  await command?.execute(body);

  return new Response(null, { status: 202 });
}
