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
