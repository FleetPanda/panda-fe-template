# Panda FE template

Production-grade Next.js starter (Fleet Panda) focused on explicit boundaries, schema-first contracts, and AI-friendly extension points. Public template: [FleetPanda/panda-fe-template](https://github.com/FleetPanda/panda-fe-template).

## Stack

- Next.js App Router
- TypeScript in strict mode
- Tailwind CSS v4
- shadcn/ui source components under `src/components/ui`
- **`@fleetpanda/panda-design`** — FP design system (shadcn spinoff, `fp:` prefix isolation, dark-primary)
- **`@fleetpanda/engines`** — config-driven EngineTable + EngineForm
- Zustand for light client shell state
- TanStack Query for server state
- Zod for schemas and validation
- React Hook Form for forms
- Vitest + Testing Library for unit tests
- Playwright for end-to-end tests
- ESLint (`eslint-config-next`: core-web-vitals + TypeScript) and Prettier in CI

## FP Design System & Engines

Both packages are published to GitHub Packages and configured in `.npmrc`. Set `GITHUB_TOKEN` before installing:

```bash
export GITHUB_TOKEN=$(gh auth token)
pnpm install
```

### `@fleetpanda/panda-design`

FP's shadcn/ui spinoff — token names match canonical shadcn; values are FleetPanda's palette. All Tailwind utilities are emitted under an `fp:` prefix so the package's styles are hard-isolated and never conflict with the host app's Tailwind.

```tsx
// styles — once in globals.css (already wired)
import "@fleetpanda/panda-design/styles.css";

// components — import anywhere
import { Button, Badge, BannerCallout } from "@fleetpanda/panda-design";
```

Dark-primary is the brand default. Add `className="dark"` to `<html>` to activate it.

### `@fleetpanda/engines`

Config-driven data table and form engine built on `@fleetpanda/panda-design`.

```tsx
import { EngineTable, EngineTableProvider, createTable, col } from "@fleetpanda/engines/table";
import { EngineForm } from "@fleetpanda/engines/form";
```

Reference implementation: [`src/modules/users/engine-table.config.ts`](src/modules/users/engine-table.config.ts) + [`src/modules/users/components/user-engine-table.tsx`](src/modules/users/components/user-engine-table.tsx).

---

## Architecture

```text
src/
  app/                 # routes, layouts, Route Handlers (e.g. api/users)
  modules/<name>/      # vertical slice: schema, contract, api, actions, hooks, config, components
  components/        # composites, renderers, ui
  engine/              # action registry, screen config, renderers, shared hooks
  lib/                 # api-client, query-client, utils
  store/, providers/, config/
  tests/unit, tests/e2e
  ai/prompts, ai/generators
```

**Conventions**

- UI stays presentational; business logic in `actions.ts`, `hooks.ts`, or Route Handlers.
- All callable actions are registered in [`src/engine/actions.ts`](src/engine/actions.ts).
- Screen definitions are Zod-validated in [`src/engine/screen-config.ts`](src/engine/screen-config.ts).
- HTTP calls go through [`src/lib/api-client.ts`](src/lib/api-client.ts) with input/output schemas when possible.

The **`users`** module is the reference implementation (list + create flow, demo in-memory store).

---

## Setup

1. **Install dependencies** (pnpm recommended; `package-lock.json` may exist from tooling—prefer one package manager):

   ```bash
   pnpm install
   ```

2. **Environment**

   ```bash
   cp .env.example .env.local
   ```

3. **Dev server**

   ```bash
   pnpm dev
   ```

4. **Quality checks**

   ```bash
   pnpm lint          # ESLint
   pnpm typecheck     # tsc --noEmit
   pnpm format:check  # Prettier
   pnpm test          # Vitest
   ```

5. **E2E** (first time installs browsers):

   ```bash
   pnpm exec playwright install
   pnpm test:e2e
   ```

---

## Adding a new feature

Use this sequence so types, validation, UI, and tests stay aligned. Skip steps that do not apply (e.g. no HTTP surface).

### 1. Module skeleton

Create `src/modules/<feature>/` with:

| File          | Responsibility                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------ |
| `schema.ts`   | Zod: entities, query/response, create/update bodies. Export inferred types.                                        |
| `contract.ts` | REST paths, HTTP methods, stable **action keys** (`users.list`), **schema keys** for forms (`users.create.input`). |
| `api.ts`      | `apiClient.get/post/put/patch/delete` calls with `inputSchema` + `responseSchema`.                                 |
| `actions.ts`  | Validate/normalize input, call `api`, return typed results; export `*ActionDefinitions` for the registry.          |
| `hooks.ts`    | TanStack Query hooks; use `queryKey` prefixes consistent with `["action", key, …]`.                                |
| `config.ts`   | Optional: `screenGroupConfigSchema.parse({…})` for config-driven UI.                                               |
| `components/` | Presentational pieces for this domain.                                                                             |

### 2. Server / HTTP

- Add or extend **Route Handlers** under `src/app/api/.../route.ts`.
- Parse query/body with the **same** Zod schemas as the client to avoid drift.
- Keep handlers thin: delegate persistence to a module `server-store` or a real DB layer when you replace the template store.

### 3. Wire the engine

1. Merge definitions into [`src/engine/actions.ts`](src/engine/actions.ts):

   ```ts
   export const actionRegistry = {
     ...userActionDefinitions,
     ...featureActionDefinitions,
   } as const;
   ```

2. For config-driven **forms**, register the Zod object in [`src/engine/schema-registry.ts`](src/engine/schema-registry.ts) and reference its key from screen config.

3. If you add new screen **types** (not just new instances), extend [`src/engine/screen-config.ts`](src/engine/screen-config.ts), [`src/engine/component-registry.tsx`](src/engine/component-registry.tsx), and [`src/engine/screen-renderer.tsx`](src/engine/screen-renderer.tsx).

### 4. UI entry

- Add a route or section in `src/app/…` that composes existing components and/or `<ScreenRenderer config={…} />`.
- Do not import `api.ts` or `actions.ts` execute functions directly from leaf UI if you can route through the registry + hooks pattern instead.

### 5. Tests

- **Unit:** mock `api.ts` from `actions` tests (see [`src/tests/unit/users.actions.test.ts`](src/tests/unit/users.actions.test.ts)).
- **E2E:** add a spec under [`src/tests/e2e/`](src/tests/e2e/) for critical flows; Playwright base URL is configured in [`playwright.config.ts`](playwright.config.ts).

### 6. Done criteria

- `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm format:check` pass locally (same as CI).

---

## AI-assisted development

### Cursor — project skills

This repo includes **project skills** under [`.cursor/skills/`](.cursor/skills/):

| Skill                   | Purpose                                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| `panda-fe-template-dev` | Checklist and conventions for **this** template (modules, engine, tests).                             |
| `obra-superpowers`      | How to install and combine **[Superpowers](https://github.com/obra/superpowers)** with this codebase. |

Invoke them by name in chat when relevant, or rely on descriptions for discovery. See also **[AGENTS.md](AGENTS.md)**.

### Superpowers (obra/superpowers)

**[Superpowers](https://github.com/obra/superpowers)** is an MIT-licensed **agentic skills framework**: TDD, systematic debugging, brainstorming, implementation plans, code review, git worktrees, and more. It is maintained separately; this template **recommends** installing it rather than vendoring the full skill tree.

**Cursor:** use `/add-plugin superpowers` or install **Superpowers** from the Cursor plugin marketplace ([upstream README — Cursor](https://github.com/obra/superpowers#cursor-via-plugin-marketplace)).

**Claude Code:** see [`.claude/skills/superpowers/SKILL.md`](.claude/skills/superpowers/SKILL.md) and the [Superpowers installation section](https://github.com/obra/superpowers#installation).

After installation, use Superpowers for **process** (design, plan, TDD, review) and **panda-fe-template-dev** (or this README) for **repository shape**.

### Other agents

- **[CLAUDE.md](CLAUDE.md)** — short entry for Claude Code.
- **[AGENTS.md](AGENTS.md)** — cross-agent pointers and skill locations.

---

## Extending the template (short list)

1. Add `src/modules/<module-name>/` following the table above.
2. Register actions in [`src/engine/actions.ts`](src/engine/actions.ts).
3. Register form schemas in [`src/engine/schema-registry.ts`](src/engine/schema-registry.ts) when using config-driven forms.
4. Prefer config-driven screens + `ScreenRenderer` over embedding business logic in presentational components.

For form field generation from Zod, see [`src/ai/generators/form-config-generator.ts`](src/ai/generators/form-config-generator.ts) (ZodObject-only).
