# AI Ready Next Template

Production-grade Next.js starter focused on explicit boundaries, schema-first contracts, and AI-friendly extension points.

## Stack

- Next.js App Router
- TypeScript in strict mode
- Tailwind CSS v4
- shadcn/ui source components wrapped under `src/components/ui`
- Zustand for global client state
- TanStack Query for server state
- Zod for schemas and validation
- React Hook Form for forms
- Vitest for unit tests
- Playwright for end-to-end tests

## Architecture

The template is organized around explicit module boundaries:

```text
src/
  app/
  modules/
    users/
      api.ts
      hooks.ts
      actions.ts
      schema.ts
      contract.ts
      config.ts
      server-store.ts
      components/
  components/
    composites/
    renderers/
    ui/
  engine/
    actions.ts
    component-registry.tsx
    hooks.ts
    schema-registry.ts
    screen-config.ts
    screen-renderer.tsx
    types.ts
  lib/
    api-client.ts
    query-client.ts
    utils.ts
  store/
  providers/
  config/
  tests/
    unit/
    e2e/
  ai/
    prompts/
    generators/
```

## Conventions

- UI stays presentational. Business logic lives in `actions.ts`, `hooks.ts`, or shared services.
- All actions are registered centrally in `src/engine/actions.ts`.
- Screen definitions are config objects validated by Zod in `src/engine/screen-config.ts`.
- Form fields can be generated from schemas through `src/ai/generators/form-config-generator.ts`.
- API requests go through `src/lib/api-client.ts`, which validates both input and output.

## Example Module

The `users` module demonstrates the full pattern:

- `schema.ts` defines request, response, and entity schemas.
- `contract.ts` declares endpoint paths and action keys.
- `api.ts` performs the raw HTTP work.
- `actions.ts` normalizes and validates business inputs.
- `hooks.ts` exposes React Query powered client hooks.
- `config.ts` defines a list screen and form screen for the renderer.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Run unit tests:

   ```bash
   npm test
   ```

5. Run end-to-end tests:

   ```bash
   npx playwright install
   npm run test:e2e
   ```

## Extending the Template

1. Add a new module under `src/modules/<module-name>`.
2. Create schemas first, then contracts, API calls, actions, hooks, and config.
3. Register every new action in `src/engine/actions.ts`.
4. Register any form schema in `src/engine/schema-registry.ts`.
5. Add config-driven screens that point to action keys instead of importing business logic into UI components.
