# Site Foundry

Site Foundry is RSH Studio's internal design-to-code-to-CMS platform.

## Initial Scope

The first implementation focuses on:

1. monorepo skeleton
2. core contracts
3. connector boundaries
4. generator boundaries
5. CLI-first operator workflow
6. a `next-sanity-starter` template shaped after the Decisions workspace

The implementation is intentionally lean right now: one target stack, one starter shape, one CLI-first operator path.

If you are new to the repo, start here:

1. [ARCHITECTURE.md](./ARCHITECTURE.md)
2. [docs/getting-started.md](./docs/getting-started.md)
3. [docs/testing.md](./docs/testing.md)
4. [docs/status.md](./docs/status.md)

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

## API Notes

The operator API currently exposes:

- `GET /health`
- `POST /runs`

A request to `http://localhost:4010/` returning `404` is expected at this stage.
