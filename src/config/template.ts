export const templatePrinciples = [
  {
    title: "Strict Boundaries",
    description:
      "Modules expose schemas, contracts, actions, hooks, and config explicitly so AI agents never need to infer hidden conventions.",
  },
  {
    title: "Schema-First Inputs",
    description:
      "Zod validates environment variables, API payloads, form state, and screen definitions before state ever reaches the UI.",
  },
  {
    title: "Config-Driven Rendering",
    description:
      "Screens are JSON-friendly objects that point to schema and action keys, making future automation and code generation predictable.",
  },
] as const;

export const templateCapabilities = [
  "Next.js App Router with strict TypeScript",
  "Wrapped shadcn/ui primitives in a single UI boundary",
  "Zustand for global client state and TanStack Query for server state",
  "Vitest and Playwright already wired for confidence",
] as const;
