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

## Commands

```bash
pnpm install
pnpm typecheck
pnpm dev:api
pnpm --filter @site-foundry/cli sf registry list
```
