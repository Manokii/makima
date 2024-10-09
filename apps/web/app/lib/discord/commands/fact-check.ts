import { factCheck } from "../../ai/fact-check";
import {
  ApplicationCommandType,
  type DiscordInteractionRequest,
} from "../types/interaction";
import {
  deferInteraction,
  deleteInteraction,
  updateInteraction,
} from "../utils";

export const names = ["fact-check", "Fact check with gemini"];

export async function execute(interaction: DiscordInteractionRequest) {
  await deferInteraction(interaction);
  const data = interaction.data;

  let author: { id: string; username: string } | undefined;
  let msg: string | undefined;
  if (data.type === ApplicationCommandType.MESSAGE) {
    const msgData = Object.values(data.resolved.messages).at(0);
    msg = msgData?.content;
    author = msgData?.author;
  }

  if (data.type === ApplicationCommandType.CHAT_INPUT) {
    const message = data.options.find((o) => o.name === "message")?.value;
    msg = message;
    author = interaction.member.user;
  }

  if (!msg) {
    await deleteInteraction(interaction);
    return new Response(null, { status: 202 });
  }

  const res = await factCheck(msg, author);
  await updateInteraction(interaction, { content: res });
  return new Response(null, { status: 202 });
}
