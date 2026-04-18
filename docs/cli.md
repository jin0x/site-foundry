# CLI

The CLI is the first operational surface for Site Foundry.

Use it through the root script so you do not need to remember the workspace internals:

```bash
corepack pnpm run sf -- <group> <command> [...args]
```

Current command groups:

- `sf registry list`
- `sf registry inspect <id>`
- `sf project create <slug>`
- `sf project link <slug>`
- `sf generate figma <source>`
- `sf generate screenshot <source>`
- `sf generate url <source>`
- `sf review run <id>`
- `sf apply run <id>`

In this first implementation, commands produce typed plans and placeholder run records. The generator and connector packages are wired so the CLI can evolve into a real execution surface without changing command semantics.

## Minimal examples

```bash
corepack pnpm run sf -- registry list
corepack pnpm run sf -- project create decisions-website
corepack pnpm run sf -- generate figma demo://landing-page
```
