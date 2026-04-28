# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

- **api-server** (`/api`) — Express 5, hosts `/api/healthz` and `/api/regenerate-memo` (SSE streaming, Anthropic Claude Sonnet via Replit AI Integrations).
- **mockup-sandbox** (`/__mockup`) — Vite preview server for canvas mockups.
- **pdx-spend** (`/`) — PDX Spend editorial site. SvelteKit 2 + `@sveltejs/adapter-static` (fully prerendered, no runtime server). Svelte 5 runes, D3 v7, scrollama. Type: Fraunces + JetBrains Mono. Burnt-sienna accent on movable funds. All fund figures are MODELED reconstructions (see `artifacts/pdx-spend/src/lib/data/funds.ts`). Static build outputs to `artifacts/pdx-spend/build`; deploy target is Netlify (config: `netlify.toml` at repo root). The `/agent`, `/api/regenerate-memo`, `/feed`, and `/feed.xml` routes were removed in the static migration; site is now storytelling + interactive charts only. The bundled memo content under `src/content/funds/*/latest-memo.md` is still rendered on fund pages via `import.meta.glob`. The `@workspace/db` import in `$lib/server/agent.ts` is dynamic so a build with `DATABASE_URL` unset still succeeds (run-history queries return empty). Author: Ron Bronson / Public Capacity Lab / State Capacity AI.
