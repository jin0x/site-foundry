# Seeds

Content seeds for this project's Sanity dataset. Each seed is a JSON file describing one `block.*` instance (plus any images / rich text / CTA data) that the seeder applies to a target page.

## Conventions

**Filename:** `<descriptive-name>.json` (kebab-case). Name the seed after the content, not the block type — `held-hostage-callout.json` reads better than `callout-1.json`.

**Organization:**
- `seeds/<project-or-page>/<file>.json` — grouped per project, page, or section. Loose grouping is fine.
- `seeds/_examples/` — reference seeds that ship with the template. Safe to delete if not useful.

**Seed shape:** documented in `docs/content-extraction-prompt.md`. Envelope is `figmaNodeId + figmaFileKey? + targetPage + blockType + fields + images? + richText?`.

## Running seeds

From the template root:

```bash
# Source env (requires .env — see .env.example)
set -a && source .env && set +a

# Dry-run
pnpm apply seeds/<path-to-file>.json --dry-run

# Apply
pnpm apply seeds/<path-to-file>.json

# Override target page
pnpm apply seeds/<path-to-file>.json --target <page-slug>

# Verify the page's current block list
pnpm verify --target <page-slug>
```

The CLI lives in the platform package `@site-foundry/connector-sanity` and is wrapped by `tsx` at the template root. See `package.json` scripts.

## Related

- `docs/content-extraction-prompt.md` — seed JSON shape reference
- `docs/figma-mcp-template.md` — block registry + primitive reference
- `docs/page-ingestion-prompt.md` — how to decide which block types a page needs before authoring seeds
