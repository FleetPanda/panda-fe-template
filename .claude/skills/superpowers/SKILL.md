---
name: superpowers
description: >-
  Claude / Claude Code bridge to the Superpowers methodology at https://github.com/obra/superpowers
  (TDD, planning, debugging, code review). Use when the user wants Superpowers workflows
  or install steps for Claude Code. Full skills ship from the upstream plugin, not this file.
---

# Superpowers (upstream)

This repository recommends installing the official **Superpowers** plugin from **[obra/superpowers](https://github.com/obra/superpowers)** so the full skills library (TDD, brainstorming, plans, code review, git worktrees, etc.) is available.

## Claude Code

From the [Superpowers installation docs](https://github.com/obra/superpowers#installation):

```text
/plugin install superpowers@claude-plugins-official
```

Or add the Superpowers marketplace and install from there, as documented upstream.

## Combined with this template

After Superpowers is installed, follow its workflows for design and implementation, and apply **this repo’s** module conventions (see root `README.md` section **Adding a new feature** and the Cursor skill **panda-fe-template-dev** under `.cursor/skills/`).

Do not duplicate upstream skill content here; link to [github.com/obra/superpowers](https://github.com/obra/superpowers) for details.
