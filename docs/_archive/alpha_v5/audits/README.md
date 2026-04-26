# Audits

Per-project reconnaissance output. One audit per project × audit-type × date.

## Conventions

**Filename:** `<project-slug>-<audit-type>-<YYYY-MM-DD>.md`

Examples:
- `projectx-page-ingestion-2026-04-24.md` — page-by-page block registry audit (per `docs/page-ingestion-prompt.md`)
- `projectx-token-ingestion-2026-04-24.md` — color/type/spacing/radius capture (per `docs/token-ingestion-prompt.md`)
- `projectx-page-ingestion-2026-05-15.md` — re-audit after new page batch added

## What goes here vs. what goes in `docs/`

| Lives in `docs/` | Lives in `audits/` |
|---|---|
| Methodology — the prompt / template itself | Evidence — a specific project's filled-in output |
| Block registry truth (`figma-mcp-template.md`) | Which blocks a specific project uses |
| Seed shape reference | A specific seed's generated audit trail |
| Anti-patterns + decision trees | Which anti-patterns a specific project hit |

Audits are **read once, then reference frequently.** They're the source of truth for "which blocks does ProjectX need?" during build sessions that follow ingestion.

## When to re-audit vs. update in place

- **Update in place** — new pages added to the same project, variant values discovered during build that should be captured retroactively, designer feedback on open questions.
- **Re-audit** (new dated file) — design system overhaul, significant pattern shift, ≥ 6 months since last audit.

Never delete old audits — they're the provenance trail for "why does the registry look this way?"

## Related

- `docs/page-ingestion-prompt.md` — how to produce the page-ingestion audit
- `docs/token-ingestion-prompt.md` — how to produce the token-ingestion audit
- `docs/figma-mcp-template.md` — block registry truth (cross-project)
- `gap-triage-*.md` (at repo root) — cross-project gap history
