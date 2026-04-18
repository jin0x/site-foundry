# Status

This file tracks what is real in the repository today versus what is still planned.

## Implemented

- root monorepo scaffold
- typed registry and run contracts
- CLI entrypoint with basic command groups
- operator API boot surface
- `next-sanity-starter` template with:
  - `apps/web`
  - `apps/studio`
  - `packages/ui`
  - `packages/sanity-schema`
  - `packages/sanity-types`
- shared schema helpers influenced by `decisions-website` and `bedrock`

## Deliberately skeletal

- connector implementations
- Figma ingestion
- screenshot ingestion
- URL ingestion
- generated file writes into target repos
- Sanity type generation
- dashboard app
- registry persistence

## Explicitly not yet integrated

The separate `figma-to-code` pipeline has **not** been copied into this repository.

That means this repo does not yet contain:

- the page seeder
- image upload helpers
- markdown-to-portable-text conversion
- Figma MCP prompt/templates
- Sanity write/apply execution

The current repo only plans for those surfaces.

## Current definition of done

Phase 2 is done when:

- the workspace installs
- `corepack pnpm typecheck` passes
- the CLI returns a generation plan
- the operator API boots
- the starter shape is present and readable

That definition is satisfied.

## Next

The next useful milestone is one real end-to-end implementation path:

1. CLI input
2. generation plan
3. materialized files into the `next-sanity-starter` shape
4. one review/apply flow
