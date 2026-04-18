# Site Foundry Architecture

This file is the repo-native handoff document for engineers working in `site-foundry`.

The project is intentionally lean at this stage. It does not yet implement a full design-to-code pipeline. It implements the minimum platform shape required to evolve into one without reworking the package boundaries later.

## What Site Foundry Is

Site Foundry is an internal platform for turning design inputs into:

- frontend code
- CMS schema and query changes
- seed data for content population
- repeatable project templates

Today, the repository proves the platform shape, not the complete feature set.

## Current Architectural Rule

Prefer one narrow end-to-end path over many options.

The current path is:

1. CLI receives a source input type such as `figma`
2. generator core creates a typed plan
3. target generator maps that plan to `next-sanity` artifact surfaces
4. starter template defines where those artifacts are supposed to land

No real Figma ingestion or file materialization happens yet.

## Top-Level Structure

```text
apps/
  cli/             operator entrypoint
  operator-api/    orchestration boundary
  dashboard/       reserved
  lab/             reserved
  registry/        reserved
  studio-control/  reserved
packages/
  registry-contracts/
  connector-core/
  generator-core/
  generator-next-sanity/
  tokens/
  primitives/
  components/
  blocks/
  sanity-kit/
  evaluation-kit/
templates/
  next-sanity-starter/
```

## Package Responsibilities

### `apps/cli`

Owns the first operator surface.

Current responsibility:

- parse command groups
- create a local demo project profile
- create a run record
- ask generator packages for a plan and artifact map

Key file:

- `apps/cli/src/index.ts`

### `apps/operator-api`

Owns the future stable machine-facing orchestration boundary.

Current responsibility:

- `GET /health`
- `POST /runs`

It is intentionally minimal. A `404` at `/` is expected.

Key file:

- `apps/operator-api/src/server.ts`

### `packages/registry-contracts`

Owns the typed contracts shared across operator surfaces.

Current responsibility:

- source types
- project profile shape
- run record shape
- registry item shape

Key file:

- `packages/registry-contracts/src/index.ts`

### `packages/connector-core`

Reserved boundary for upstream and downstream system integrations.

Examples of future connectors:

- Figma
- Sanity
- Contentful
- Vercel

No real connector implementation exists yet.

### `packages/generator-core`

Owns generation planning independent of any one frontend or CMS target.

Current responsibility:

- create a typed plan from a source input and project profile

Current actions are placeholders but structurally important:

- `reuse-block`
- `generate-schema`
- `generate-query`
- `generate-seed`

### `packages/generator-next-sanity`

Owns the first target-specific materialization boundary.

Current responsibility:

- map a generation plan to the artifact surfaces of the `next-sanity-starter`

This package currently returns artifact metadata, not actual file writes.

### `templates/next-sanity-starter`

Owns the canonical output shape for the first supported stack:

- Next.js
- Sanity
- Tailwind CSS

This template is shaped after the strongest current consumer architecture and uses:

- `apps/web`
- `apps/studio`
- `packages/ui`
- `packages/sanity-schema`
- `packages/sanity-types`

This template matters more than the reserved apps right now. It is the real target surface the rest of the platform should write into.

## Documentation Model

The repo should be understandable without any private planning context.

Use the repo docs for:

- setup
- testing
- current status
- operator commands
- architecture and handoff

Do not require an engineer to read external planning material to understand the implementation.

## Figma-to-Code Boundary

Site Foundry does **not** currently include the proven `figma-to-code` pipeline implementation.

What exists in this repo:

- `figma` as a supported input type in contracts and CLI semantics
- generation planning for a `figma` source
- placeholder target artifacts including a future seed artifact

What does **not** exist in this repo:

- Figma MCP ingestion
- extraction prompts
- page seeder scripts
- image upload helpers
- markdown-to-portable-text conversion utilities
- Sanity write/apply flow

That separate pipeline should be ported into Site Foundry deliberately and minimally, not copied in partially.

## Current State

The repo is coherent enough for another engineer to:

- install dependencies
- typecheck the workspace
- run the CLI smoke path
- boot the operator API
- inspect the target starter architecture

The repo is not yet coherent enough for another engineer to:

- ingest a real Figma file
- generate files into a target repo
- write content to Sanity
- run integration tests across real connectors

## Immediate Next Milestone

The next implementation step should remain narrow:

1. accept one real Figma-derived input artifact
2. produce one real seed artifact
3. materialize one real block into `templates/next-sanity-starter`
4. expose one apply path for Sanity draft content

Anything broader than that increases complexity before the first real end-to-end path exists.
