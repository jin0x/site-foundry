# Next Sanity Starter

`templates/next-sanity-starter` is the first canonical consumer-project shape for Site Foundry.

It is designed to stay simple:

- one frontend stack: `Next.js`
- one CMS stack: `Sanity`
- one styling stack: `Tailwind CSS`
- one workspace split: `apps/web`, `apps/studio`, `packages/ui`, `packages/sanity-schema`, `packages/sanity-types`

## What it already includes

- `apps/web`
  - App Router shell
  - draft mode routes
  - revalidation route
  - `next-sanity` client and live helpers
- `apps/studio`
  - Studio config
  - Presentation tool wiring
  - desk structure
- `packages/sanity-schema`
  - shared block schema factory
  - `bedrock`-style enum and toggle patterns
  - starter `page`, `settings`, and object schemas
- `packages/ui`
  - primitives, components, and blocks split
  - `_type -> React component` block registry
- `packages/sanity-types`
  - temporary typed surface until real typegen is wired

## Why it matters

This is the main thing Site Foundry knows how to target today. Every early generator action should materialize toward this shape instead of inventing new output structures.
