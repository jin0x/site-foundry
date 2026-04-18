# Site Foundry

Site Foundry is RSH Studio's internal design-to-code-to-CMS platform.

This repository is the implementation counterpart to the planning pack in the Obsidian vault:

- `Projects/RSH Studio/Site Foundry/MASTER-PLAN.md`
- `Projects/RSH Studio/Site Foundry/ARCHITECTURE.md`
- `Projects/RSH Studio/Site Foundry/IMPLEMENTATION-PLAN.md`

## Initial Scope

The first implementation focuses on:

1. monorepo skeleton
2. core contracts
3. connector boundaries
4. generator boundaries
5. CLI-first operator workflow
6. a `next-sanity-starter` template shaped after the Decisions workspace

The implementation is intentionally lean right now: one target stack, one starter shape, one CLI-first operator path.

## Workspace

```text
apps/
  cli/
  operator-api/
  dashboard/
  lab/
  registry/
  studio-control/
packages/
  blocks/
  components/
  connector-core/
  evaluation-kit/
  generator-core/
  generator-next-sanity/
  primitives/
  registry-contracts/
  sanity-kit/
  tokens/
templates/
  next-sanity-starter/
```

## Current Happy Path

1. Install with the repo-managed package manager:

```bash
corepack pnpm install
```

2. Verify the workspace:

```bash
corepack pnpm typecheck
```

3. Run the first CLI smoke tests:

```bash
corepack pnpm smoke:registry
corepack pnpm smoke:generate
```

4. Start the operator API when you want the orchestration boundary running:

```bash
corepack pnpm dev:api
```

## Commands

```bash
corepack pnpm install
corepack pnpm typecheck
corepack pnpm dev:api
corepack pnpm run sf -- registry list
corepack pnpm run sf -- generate figma demo://landing-page
```
