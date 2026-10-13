# Agent notes (Cursor, Claude Code, Copilot, etc.)

## Repository intent

Next.js App Router template with **schema-first modules**, a central **action registry**, **config-driven screens**, and validated **API client** usage. See [README.md](README.md) for stack, setup, and **Adding a new feature**.

## Project skills (Cursor)

- **[`.cursor/skills/panda-fe-template-dev/SKILL.md`](.cursor/skills/panda-fe-template-dev/SKILL.md)** — Template-specific checklist (modules, engine, tests).
- **[`.cursor/skills/obra-superpowers/SKILL.md`](.cursor/skills/obra-superpowers/SKILL.md)** — How to install and use **[Superpowers](https://github.com/obra/superpowers)** with this codebase.

Load these when the task touches `src/modules/`, `src/engine/`, or when the user asks for structured agent workflows.

## Superpowers (recommended)

Install the official **[Superpowers](https://github.com/obra/superpowers)** plugin in the user’s agent (Cursor: `/add-plugin superpowers`; Claude Code: see upstream README). It provides composable skills (TDD, planning, debugging, reviews). This repo vendors a **bridge** skill only; the full library is upstream (MIT).

## Claude Code

A minimal project skill lives under **[`.claude/skills/superpowers/SKILL.md`](.claude/skills/superpowers/SKILL.md)** pointing to the same upstream install flow.

## FP Design System & Engines

Both packages are installed and wired into this template.

| Package | Version | What it provides |
|---------|---------|-----------------|
| `@fleetpanda/panda-design` | ^2.5.0 | shadcn spinoff — FP tokens, 34 UI primitives, `fp:` prefix isolation |
| `@fleetpanda/engines` | ^0.5.0 | `EngineTable` (config-driven data table) + `EngineForm` |

**CSS** is imported once in `src/app/globals.css` — no per-component imports needed.

**Components:** import directly from the package:

```tsx
import { Button, Badge } from "@fleetpanda/panda-design";
import { EngineTable, EngineTableProvider, createTable, col } from "@fleetpanda/engines/table";
import { EngineForm } from "@fleetpanda/engines/form";
```

**Reference implementation:** `src/modules/users/engine-table.config.ts` + `src/modules/users/components/user-engine-table.tsx` shows an EngineTable wired to the users API.

**Auth:** packages are on GitHub Packages (`npm.pkg.github.com`). The project `.npmrc` reads `${GITHUB_TOKEN}`. Set it with `export GITHUB_TOKEN=$(gh auth token)` before running `pnpm install`.
