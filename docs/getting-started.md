# Getting Started

This repository currently has one intended path: validate the workspace, run the CLI, and inspect the `next-sanity-starter` target.

## Prerequisites

- Node.js `>= 22.14.0`
- `corepack` available in your shell

The repo expects `pnpm 9.15.0`. Use `corepack pnpm ...` so you do not accidentally hit an older global install.

## Setup

```bash
cd ~/Dev/Webapps/rsh/site-foundry
corepack pnpm install
```

## Verify

```bash
corepack pnpm typecheck
```

## First commands

```bash
corepack pnpm smoke:registry
corepack pnpm smoke:generate
```

## Main folders to inspect

- `apps/cli` for the operator entrypoint
- `apps/operator-api` for the orchestration boundary
- `packages/generator-next-sanity` for the first target materialization boundary
- `templates/next-sanity-starter` for the consumer-project shape
