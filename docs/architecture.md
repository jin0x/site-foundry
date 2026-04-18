# Repository Architecture

This repository implements the first executable version of Site Foundry.

The architecture follows three rules:

1. `apps/cli` is the first operator surface.
2. `apps/operator-api` is the future-stable orchestration boundary.
3. `templates/next-sanity-starter` mirrors the best consumer-template patterns from `decisions-website`.

## Layers

- `packages/registry-contracts` owns typed contracts.
- `packages/connector-core` owns integration interfaces.
- `packages/generator-core` owns generation planning.
- `packages/generator-next-sanity` owns the first target-specific materialization path.

The UI and schema libraries are represented as package boundaries now, but the main implementation focus in this first pass is contracts and orchestration.
