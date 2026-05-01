import { env } from "@/config/env";

export const siteConfig = {
  name: env.NEXT_PUBLIC_APP_NAME,
  description:
    "A production-grade Next.js template built for clear boundaries, schema-first contracts, and AI-assisted extensibility.",
  primaryNavigation: [
    "Schema-first contracts",
    "Action registry",
    "Config-driven screens",
  ],
} as const;
