# Repository Architecture

Use [../ARCHITECTURE.md](../ARCHITECTURE.md) as the main handoff document.

This shorter page is the quick version:

## Core Rules

1. `apps/cli` is the first operator surface.
2. `apps/operator-api` is the future stable orchestration boundary.
3. `templates/next-sanity-starter` is the canonical output shape for the first supported stack.
4. Keep one narrow end-to-end path working before adding options.

## Core Layers

- `packages/registry-contracts` owns shared typed contracts.
- `packages/connector-core` reserves the integration boundary.
- `packages/generator-core` owns target-agnostic planning.
- `packages/generator-next-sanity` maps plans to starter artifact surfaces.

## Important Constraint

The repo currently understands `figma` as an input type, but it does not yet contain the real `figma-to-code` implementation. That boundary is still separate and needs an explicit porting step.
