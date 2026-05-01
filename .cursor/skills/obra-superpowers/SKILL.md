---
name: obra-superpowers
description: >-
  Connects this repository to the Superpowers agentic methodology (TDD, systematic
  debugging, planning, code review, git worktrees). Use when the user asks for
  Superpowers, disciplined agent workflows, or how to install skills for Claude Code,
  Cursor, Codex, or other supported clients. Upstream is MIT-licensed at obra/superpowers.
---

# Superpowers (obra/superpowers)

This project recommends **[Superpowers](https://github.com/obra/superpowers)**—an agentic skills framework and software development methodology (MIT license). The full skill library lives in the upstream repo; this file is a **project bridge** so agents know to use it.

## Install the official distribution

Do **not** expect every workflow file to be vendored in this template. Install Superpowers in the user’s coding agent so skills load automatically.

| Client                 | How to install                                                                                                                                                                                              |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cursor**             | In Agent chat: `/add-plugin superpowers` or install **Superpowers** from the Cursor plugin marketplace. See [obra/superpowers — Cursor](https://github.com/obra/superpowers#cursor-via-plugin-marketplace). |
| **Claude Code**        | Official marketplace: `/plugin install superpowers@claude-plugins-official` or Superpowers marketplace per [README](https://github.com/obra/superpowers#installation).                                      |
| **OpenAI Codex**       | Plugins UI → search `superpowers` → Install.                                                                                                                                                                |
| **GitHub Copilot CLI** | `copilot plugin marketplace add obra/superpowers-marketplace` then `copilot plugin install superpowers@superpowers-marketplace`.                                                                            |

After installation, the agent should **check for relevant Superpowers skills before major tasks** (design, implementation, tests, review).

## What you get (summary)

From the [Superpowers README](https://github.com/obra/superpowers#the-basic-workflow), the core flow includes:

1. **brainstorming** — Refine intent and design before coding; validate in readable chunks.
2. **using-git-worktrees** — Isolated branch/worktree after design approval.
3. **writing-plans** — Small tasks with file paths, verification steps.
4. **subagent-driven-development** / **executing-plans** — Execute with review gates.
5. **test-driven-development** — RED → GREEN → REFACTOR.
6. **requesting-code-review** — Review vs plan before continuing.
7. **finishing-a-development-branch** — Merge/PR/cleanup options.

For philosophy and contribution rules, use the upstream repo only: [obra/superpowers](https://github.com/obra/superpowers).

## This template + Superpowers

When implementing features here, combine Superpowers with the **panda-fe-template-dev** project skill (or the README “Adding a new feature” section): schema-first modules, action registry, and validated API boundaries.
