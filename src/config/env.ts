import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default("AI Ready Next Template"),
  NEXT_PUBLIC_API_BASE_URL: z
    .union([z.string().url(), z.literal("")])
    .default(""),
});

const runtimeEnv = {
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
};

export const env = publicEnvSchema.parse(runtimeEnv);

export type PublicEnv = z.infer<typeof publicEnvSchema>;
