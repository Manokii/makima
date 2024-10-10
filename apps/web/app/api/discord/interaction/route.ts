import { NextResponse } from "next/server";
import { z } from "zod";

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

const userSchema = z.object({
  avatar: z.string(),
  // avatar_decoration_data: z.unknown().nullish(),
  bot: z.boolean(),
  // clan: z.string().nullish(),
  discriminator: z.string(),
  global_name: z.string(),
  id: z.string(),
  // public_flags: z.number(),
  system: z.boolean(),
  username: z.string(),
});

const reqSchema = z.object({
  app_permissions: z.string(),
  application_id: z.string(),
  authorizing_integration_owners: z.object({}),
  entitlements: z.array(z.string()),
  id: z.string(),
  token: z.string(),
  type: z.nativeEnum(InteractionType),
  user: userSchema,
  version: z.number(),
});

export async function POST(request: Request) {
  const rawBody = await request.json();
  console.log("Request", request, "\n\nBODY", rawBody);
  const body = reqSchema.parse(rawBody);

  if (body.type === InteractionType.PING) {
    return NextResponse.json({ type: 1 }, { status: 200 });
  }
  return NextResponse.json({ message: "Hello, World!" });
}
