import { env } from "~/env";
import type { WebhookOutgoing } from "./types/webhook-outgoing";

export const apiUrl = "https://discord.com/api/v10";

type Interaction = {
  id: string;
  token: string;
};

export function deferInteraction({ id, token }: Interaction) {
  return fetch(`${apiUrl}/interactions/${id}/${token}/callback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: 5 }),
  });
}

export async function updateInteraction(
  interaction: Interaction,
  data: WebhookOutgoing,
) {
  try {
    return await fetch(
      `${apiUrl}/webhooks/${env.DISCORD_CLIENT_ID}/${interaction.token}/messages/@original`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );
  } catch (e) {
    console.error("Failed to updateInteraction", "ERROR", e);
    return deleteInteraction(interaction);
  }
}

export function deleteInteraction({ token }: Interaction) {
  return fetch(
    `${apiUrl}/webhooks/${env.DISCORD_CLIENT_ID}/${token}/messages/@original`,
    { method: "DELETE" },
  );
}

export async function deferredInteraction(
  interaction: Interaction,
  callback: () => Promise<WebhookOutgoing>,
) {
  await deferInteraction(interaction);
  try {
    const data = await callback();
    await updateInteraction(interaction, data);
    return data;
  } catch (e) {
    console.error("Callback failed", "ERROR", e);
    return deleteInteraction(interaction);
  }
}
