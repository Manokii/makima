import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DISCORD_CLIENT_ID: z.string().min(1),
    DISCORD_PUBLIC_KEY: z.string().min(1),
    DISCORD_API_KEY: z.string().min(1),
    GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
  },
  client: {},
  experimental__runtimeEnv: process.env,
});
