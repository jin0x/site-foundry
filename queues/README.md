# Queues

Batch-build queue files for multi-block sessions. One queue file per session tracks: which Figma frames are targeted, which blocks are authored, predictions vs. outcomes, and cross-session handoffs.

## Conventions

**Filename:** `<YYYY-MM-DD>-<project-or-page-slug>-queue.md`

Examples:
- `2026-05-01-projectx-homepage-queue.md`
- `2026-05-02-projectx-pricing-queue-v2.md` (re-run suffix)

## When to use a queue

Use a queue when:
- 2+ distinct Figma frames need to become blocks in the same session
- A single frame spans multiple block types that must ship together
- The build will cross a context-compaction boundary
- The work involves a mix of "reuse existing" + "propose new block" decisions that need to be auditable

Skip for single one-off blocks — follow `docs/figma-mcp-template.md` inline.

## Template

See `docs/component-queue-template.md` for the queue-file structure + prediction-discipline rules + handoff format.

## Related

- `docs/component-queue-template.md` — queue structure + rules
- `docs/figma-mcp-template.md` — per-block build flow
- `audits/` — per-project ingestion audits (feed into queue planning)
