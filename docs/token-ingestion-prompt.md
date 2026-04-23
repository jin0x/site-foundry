# Token Ingestion Prompt — Figma → `theme.css` audit

**Purpose:** Extract a project's design tokens from Figma and produce (1) a proposed `theme.css` delta and (2) a gap report — which of our semantic token slots have direct Figma sources vs. need interpretation vs. are missing entirely.

This is the sibling to `page-ingestion-prompt.md`. Run once per project after the page-ingestion audit surfaces token signals; output feeds into a `theme.css` edit PR.

Companion docs:
- `packages/tokens/src/theme.css` — the authoritative token structure (CSS variables grouped by role). The audit maps Figma tokens *into* this structure.
- `docs/figma-mcp-template.md §Color token mapping` — which primitives map to which semantic tokens. The audit preserves these mappings.
- `<project>-page-ingestion-*.md` — if a page-ingestion audit exists, read its Phase 2 token signals first.

---

## When to run

- Start of a new project, after the page-ingestion audit has surfaced token signals.
- When a design-system overhaul lands for an existing project.
- **Skip for:** single-color tweaks (edit `theme.css` directly); adding a new semantic role (edit `theme.css` + docs in one PR, no audit needed).

---

## Prerequisites

1. Figma MCP tools (`get_variable_defs`, `get_metadata`) + `FIGMA_API_TOKEN`.
2. A **representative Figma node per token category**. Ideally a dedicated design-system page with color swatches, type scale, spacing rulers, radius examples. If no such page exists, use the most token-rich page section (a hero or feature card is usually enough).
3. Current `theme.css` in hand — read it before starting. Don't re-discover our token structure frame by frame.

---

## Input format

Either:

a. **Design-system page URL** — preferred when the project has one.
b. **Representative-frame URLs**, one per category: `colors`, `typography`, `spacing` (optional, usually inferred from hero frames), `radius` (optional, usually inferred from card frames), `shadow` (optional).

Example:

```
Token ingestion source — ProjectX:
- Design system page: https://figma.com/design/XXXX/ProjectX?node-id=100-0
OR
- Colors: https://figma.com/design/XXXX/ProjectX?node-id=100-200 (color swatches)
- Typography: https://figma.com/design/XXXX/ProjectX?node-id=100-300 (type scale)
- Hero frame: https://figma.com/design/XXXX/ProjectX?node-id=20-100 (for ambient tokens)
```

Output path: `alpha_v3/audits/<project-slug>-token-ingestion-<YYYY-MM-DD>.md`.

---

## Output shape

```markdown
# <Project> token ingestion audit — <YYYY-MM-DD>

## Input
- Source: Figma file `<fileKey>`, nodes [...]
- Current theme.css revision: <git SHA or date>

## Phase 1 — Figma token capture

Unique `--var-name: value` pairs observed in `get_variable_defs` across sampled nodes.

### Colors
| Figma variable name | Value | Observed usage (frames) | Our slot candidate |
|---|---|---|---|
| `brand/primary` | `#E85D04` | hero CTAs, emphasis borders | `--color-brand-turquoise` (our "primary accent" slot) |
| `surface/elevated` | `#1A1B29` | card backgrounds | `--color-surface-elevated` (exact match) |
| ... |

### Typography
| Figma style | Family | Size | Weight | Line height | Our slot candidate |
|---|---|---|---|---|---|
| `Display/XL` | "Neue Haas Grotesk Display" | 72 | 700 | 76 | New — no slot for display-sized heading above H1 |
| `Heading/H1` | "Neue Haas Grotesk Display" | 56 | 700 | 60 | Maps to our `HeadingSize.H1` (--text-h1 + --leading-h1) |
| ... |

### Spacing
Sampled from auto-layout gap values. List distinct values; note whether they fit our 4px scale.

### Radius
Sampled from corner radius values. Our `--radius-sm/md/lg/xl` correspond to 4/8/12/16 — flag any Figma values that don't map.

### Shadow
Sampled from drop-shadow definitions. Our theme.css has minimal shadow tokens today; most shadows live inline in blocks. Flag the common patterns.

## Phase 2 — Mapping into `theme.css`

### Direct matches (can ship as hex swap)
Our slot → Figma source → proposed hex.

| Our CSS variable | Figma source | Proposed value |
|---|---|---|
| `--color-brand-turquoise` | `brand/primary` | `#E85D04` |
| `--color-surface-page` | `surface/page` | `#0C0D14` |
| ... |

### Interpretive matches (one Figma source → one of several possible slots)
Our slot choice needs a judgment call — document the reasoning.

| Our CSS variable | Figma source | Judgment |
|---|---|---|
| `--color-secondary` | `text/default` | ProjectX has one body-text color; our muted slot stays the same hex. |
| ... |

### Missing — our slot has no Figma source
Keep placeholder or drop the semantic role.

| Our CSS variable | Status | Recommendation |
|---|---|---|
| `--color-brand-gold` | No ProjectX equivalent | Remove from theme.css if no blocks use it; otherwise leave as neutral placeholder. |
| ... |

### Missing — Figma has a token with no slot
Propose new slots.

| Figma source | Recommended new slot | Reason |
|---|---|---|
| `status/warning` | `--color-status-warning` | ProjectX pricing pages use a warning-toned callout; our registry doesn't have a `warning` tone on `block.callout` today. Pairs with a variant addition on CalloutBlock. |
| ... |

### Typography additions
| Proposed slot | Figma source | Reason |
|---|---|---|
| `--text-display` / `HeadingSize.DISPLAY` | `Display/XL` | Used on home hero in ProjectX; larger than our H1. |

## Phase 3 — Proposed theme.css diff

```css
/* Before (SignalWire placeholder) */
--color-brand-turquoise: #76e4c3;

/* After (ProjectX) */
--color-brand-turquoise: #E85D04;
```

Show as a patch-style block for the audit reader to eyeball before committing.

## Phase 4 — Follow-up actions

- Blocks needing a variant addition to exercise a new token (e.g. `block.callout tone='warning'`).
- Primitives needing an enum addition (e.g. `HeadingSize.DISPLAY`).
- Dependency order: token PR → block-variant PR → seed-authoring.
```

---

## Per-category capture procedure

### Colors

1. Find the color-swatch page or a token-rich content frame.
2. Run `get_variable_defs` on the node. Record every `color/*` variable.
3. For each, note 1–2 frames that use it (if available — color-swatch pages make this easy).
4. Map each Figma variable to our theme.css slot. If no slot matches:
   - **New brand color?** → propose a new `--color-brand-*` slot.
   - **New semantic role** (warning, success, info)? → propose a new `--color-status-*` slot + call out that a block variant is needed to exercise it.
   - **Neutral grayscale variant?** → propose a new `--color-surface-*` or `--color-text-*` slot with a clear role name.
5. Never map two distinct Figma tokens to the same slot. If that happens, your slot semantics are wrong — rename ours or split.

### Typography

1. Run `get_design_context` on a representative heading-heavy frame. Note the font families + sizes per heading level seen.
2. Match against our `HeadingSize` / `TextSize` enum mappings in `figma-mcp-template.md §Typography token mapping`.
3. Flag any Figma size that doesn't fit (within 2px tolerance) — candidates to either extend the enum OR round to the nearest existing slot.
4. Record font-family mappings — today we assume Instrument Sans + Lexend + JetBrains Mono; ProjectX will likely differ.

### Spacing

Our scale is Tailwind's 4px grid. From sampled auto-layout gaps, note:
- Values that fit (4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128).
- Values that don't (e.g. 10, 14, 22, 52). These are candidates to round or flag.

### Radius

Small set — our slots are NONE / SM (4) / MD (8) / LG (12) / XL (16) / FULL (9999). Sample card + button + input corners.

### Shadow

Collect distinct drop-shadow definitions. Today theme.css has minimal shadow tokens — most shadows are inline (e.g. `shadow-[0_0_120px_0_color-mix(...)]`). If ProjectX uses 2–3 recurring shadow patterns, propose `--shadow-*` slots.

---

## Anti-patterns

- **Don't rename Figma variables to match ours.** Preserve the Figma name in the audit so downstream readers can verify the mapping.
- **Don't propose a theme.css rewrite.** The structure we have is stable — we're filling values, not rewriting semantics. A rewrite belongs in a design-system-architecture session, not a token ingestion.
- **Don't capture every token.** If ProjectX's Figma has 200 color variables and 40 font styles, audit only the ones that appear on the sampled pages' visible surfaces. Unused tokens are noise.
- **Don't commit theme.css during the audit.** The audit is a proposal. The human reviews, approves, then a separate edit PR lands the diff.

---

## Runbook

1. Confirm `FIGMA_API_TOKEN` + MCP tools available.
2. Read current `packages/tokens/src/theme.css` end to end.
3. Read the most recent `<project>-page-ingestion-*.md` Phase 2 token signals section (if exists).
4. Set up audit file: `alpha_v3/audits/<project-slug>-token-ingestion-<YYYY-MM-DD>.md`.
5. Phase 1: walk input nodes, capture Figma variables per category. Checkpoint file after colors, after typography, etc.
6. Phase 2: fill mapping tables (direct / interpretive / missing-ours / missing-theirs).
7. Phase 3: write the proposed diff as a unified patch block.
8. Phase 4: list follow-up actions (block variants, enum additions, dependency order).
9. Hand off. The next session edits `theme.css` to the proposed values, re-verifies visually, ships.

---

## Ready-to-run prompt

```
I'm running a token ingestion for <project>. Please follow `alpha_v3/docs/token-ingestion-prompt.md`.

Source:
- Design-system page: <Figma URL>
(or per-category URLs if no DS page exists)

Read first:
- `packages/tokens/src/theme.css` (current token structure)
- Most recent `alpha_v3/audits/<project>-page-ingestion-*.md` if present (Phase 2 Token signals section)

Write to `alpha_v3/audits/<project-slug>-token-ingestion-<today>.md`. Checkpoint after each Phase. Don't edit theme.css during the audit — produce a proposed diff only.

Go.
```
