import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import "~/env";

export async function factCheck(
  message: string,
  user?: { id: string; username: string },
) {
  if (!message) {
    return "";
  }
  try {
    const username = user?.username ?? "unknown";
    console.log(`[Fact Check @${username}]`, `>>> ${message}`);
    const params = [
      "you are a discord bot",
      "you are a fact checker",
      "if the prompt is in tagalog, reply in tagalog, otherwise reply in english",
    ];

    if (user) {
      params.push(
        `the author of the prompt is @${username} you have the option to tag them using <@${user.id}>`,
      );
    }
    const res = await generateText({
      model: google("gemini-1.5-flash"),
      maxTokens: 1024,
      system: params.join("\n"),
      messages: [{ role: "user", content: message }],
    });
    console.log(`[Fact Check @${username}]`, `<<< ${res.text}`);
    return res.text;
  } catch (e) {
    console.error(e);
    return "";
  }
}
