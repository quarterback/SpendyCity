# PDX Spend

*A single-issue civic-data instrument. Editorial reporting, interactive charts, and a fund-by-fund ledger of what Portland-area voter money could pay for — and the named rules that hold it still.*

---

## The thing itself

PDX Spend documents seven Portland and Multnomah County voter-approved funds. For each one it answers three questions in plain language: **what the fund could pay for at its current balance, what's blocking that, and who controls the lever.** A second beat — *Investigations* — drops the dashboard register and reads one quasi-governmental relationship at a time in long form (the first traces the contractor layer behind Supportive Housing Services spending).

Every figure on the site is a **modeled reconstruction** — built to show the *shape* of the problem (fast accumulation, slow disbursement, scope-expansion votes) with realistic ranges, and explicitly badged `MODELED` until audited records replace it. The honesty is part of the design.

It is built as a fully **prerendered static site** — no runtime server, no live database in production. It deploys as flat files.

---

## What it demonstrates

This isn't a single app. It's a **monorepo** that holds a shipped public site alongside the scaffolding of a more ambitious system — an AI memo-writing agent, a typed API contract, a database layer, a component sandbox — most of which was deliberately retired down to a static build. That arc (build the ambitious version, then cut it to what actually serves the reader) is itself part of the story.

- **Editorial engineering** — longform writing, chart-led storytelling, scrollytelling, restraint
- **Data visualization** — hand-built D3 charts, not a charting library
- **Systems thinking** — a monorepo with clean package boundaries, typed end to end
- **Knowing when to cut** — a live AI agent and API backend, intentionally collapsed to a static deploy

---

## Tech stack

### The website — `pdx-spend`
The public artifact. A chart-led editorial site.

| Layer | Choice |
|---|---|
| Framework | **SvelteKit 2** + **Svelte 5** (runes) |
| Render mode | `@sveltejs/adapter-static` — **fully prerendered**, no runtime server |
| Charts | **D3 v7**, hand-built components (line, stacked bar, diverging bar, streamgraph, sparklines) |
| Scrollytelling | IntersectionObserver-driven scroll transitions |
| Content | Markdown fund memos + investigations, compiled at build time (`marked`, sanitized with `isomorphic-dompurify`) |
| Type system | **Fraunces** (serif) + **JetBrains Mono**; burnt-sienna accent reserved for *movable* funds |
| Social images | Open Graph cards rendered at build with `@resvg/resvg-js` |
| Deploy | **Netlify** (static files) |

### The monorepo
| Layer | Choice |
|---|---|
| Workspace | **pnpm workspaces** |
| Language | **TypeScript 5.9**, typed across every package |
| Runtime | **Node.js 24** |
| Build | **esbuild** (server bundles), **Vite** (front-end) |

### Shared packages (`lib/*`)
The typed plumbing that the system was designed around:

- **`db`** — **PostgreSQL** via **Drizzle ORM**, schema-first
- **`api-spec`** — an **OpenAPI** contract as the source of truth
- **`api-zod`** — **Zod** validation schemas generated from the spec (via **Orval**)
- **`api-client-react`** — typed **TanStack Query** hooks, also generated
- **`integrations-anthropic-ai`** — **Anthropic Claude** SDK wrapper
- **`prompts`** — versioned prompt definitions

### The dormant backend — `api-server`
Retired in production, but the wiring is real: **Express 5** with an SSE-streaming endpoint that drove **Claude Sonnet** to regenerate fund memos from a per-fund document corpus. Supporting pieces: a `node-cron` scheduler, a Bluesky publisher, PDF parsing (`pdf-lib`), Google Cloud Storage, and structured logging (`pino`). The static migration cut the live `/agent` and `/api/regenerate-memo` routes; the memo *content* it produced still ships, prerendered, on each fund page.

### The sandbox — `mockup-sandbox`
A **Vite + React 19** preview environment for canvas mockups, wired with the full **Radix UI** primitive set, **Tailwind CSS v4**, **Recharts**, and **Framer Motion** — the design-exploration bench, kept separate from the shipped site.

---

## Provenance

Reporting and design by **Ron Bronson**, under **Public Capacity Lab** / **State Capacity AI**.
Charts and prose under **CC BY 4.0**. Code under **MIT**.

Editorial reference points: *The Pudding*, the *Financial Times* visual desk, *Reveal* / *ProPublica*, and plainlanguage.gov.
