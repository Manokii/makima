import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

const InteractionType = {
  PING: 1,
  APPLICATION_COMMAND: 2,
  MESSAGE_COMPONENT: 3,
  APPLICATION_COMMAND_AUTOCOMPLETE: 4,
  MODAL_SUBMIT: 5,
} as const;
type IntearctionType = (typeof InteractionType)[keyof typeof InteractionType];

const InteractionContextType = {
  GUILD: 0,
  BOT_DM: 1,
  PRIVATE_CHANNEL: 2,
} as const;
type InteractionContextType =
  (typeof InteractionContextType)[keyof typeof InteractionContextType];

export async function POST(request: Request) {
  const body = await request.json();
  console.log("Request XXXX", request);
  console.log("Body XXXX", body);
  return NextResponse.json({ message: "Hello, World!", request });
}
