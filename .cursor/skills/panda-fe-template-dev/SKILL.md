---
name: panda-fe-template-dev
description: >-
  Fleet Panda / Panda FE template conventions: schema-first modules, action registry,
  config-driven screens, apiClient + Zod, TanStack Query, and tests. Use when adding
  features, new API surfaces, forms, list screens, or refactoring within src/modules
  or src/engine in this Next.js App Router codebase.
---

# Panda FE template — agent development guide

Use this skill together with **[Superpowers](https://github.com/obra/superpowers)** (install upstream; see **obra-superpowers** project skill) for planning, TDD, and reviews.

## Principles

- **UI is presentational.** No business rules in `page.tsx` composites beyond wiring; put logic in `actions.ts`, `hooks.ts`, or Route Handlers.
- **Contracts before calls.** Paths and action keys live in `contract.ts`; Zod shapes in `schema.ts`.
- **One registry for callable behavior.** Every server/client “action” the UI can trigger must be registered in [`src/engine/actions.ts`](src/engine/actions.ts).
- **HTTP I/O is validated.** Use [`src/lib/api-client.ts`](src/lib/api-client.ts) with `inputSchema` / `responseSchema` where applicable.

## Adding a feature (checklist)

Work in this order unless the feature is UI-only (still prefer a module for anything touching data).

1. **`src/modules/<name>/schema.ts`** — Zod: entities, list query/response, create/update payloads, etc.
2. **`src/modules/<name>/contract.ts`** — `endpoints`, `actions` keys, `schemas` keys (string keys for form registry).
3. **`src/app/api/.../route.ts`** (if needed) — Parse with the same schemas; return JSON that matches response schemas.
4. **`src/modules/<name>/api.ts`** — Thin wrappers: `apiClient.get|post|put|patch|delete` + schemas.
5. **`src/modules/<name>/actions.ts`** — Normalize input, orchestrate `api` calls, export `*ActionDefinitions` objects compatible with `RegisteredAction` in `src/engine/types.ts`.
6. **`src/engine/actions.ts`** — Spread `...<name>ActionDefinitions` into `actionRegistry`.
7. **`src/engine/schema-registry.ts`** — Register any Zod object used by config-driven forms (`schemaKey`).
8. **`src/modules/<name>/hooks.ts`** — `useQuery` / `useMutation` with stable `queryKey`s; align invalidate keys with `["action", actionKey]` prefix where list screens invalidate.
9. **`src/modules/<name>/config.ts`** (optional) — `screenGroupConfigSchema.parse({...})` for `ScreenRenderer`.
10. **Components** under `src/modules/<name>/components/` — Props in, events/callbacks out; use `src/components/ui/*`.
11. **Tests** — `src/tests/unit/<name>.*.test.ts` (mock `api.ts` for action tests); e2e in `src/tests/e2e/` when a full flow matters.

## Query keys and invalidation

- List screens use `queryKey: ["action", action.key, config.queryInput]` in [`src/engine/hooks.ts`](src/engine/hooks.ts).
- Mutations should list `invalidateActions` in form screen config so `queryClient.invalidateQueries({ queryKey: ["action", actionKey] })` refreshes lists.

## AI generators

- [`src/ai/generators/form-config-generator.ts`](src/ai/generators/form-config-generator.ts) builds field metadata from **ZodObject** roots only.
- Prompts under [`src/ai/prompts/`](src/ai/prompts/) are starting points for codegen; keep generated output consistent with existing modules.

## Verification

Run from repo root: `pnpm lint`, `pnpm typecheck`, `pnpm test`. For full UI flows: `pnpm test:e2e` (Playwright; see README).
