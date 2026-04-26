# PoC findings — AutoSwitchingCards diff (2026-04-25)

Proof-of-concept for the **measure-first, fix-second** workflow proposed in the retrospective. One section (AutoSwitchingCards on `/new-project-homepage`, Figma node `Kd4MoDaQreiazP75Ujy8kt:7876:51954`).

## Tool workflow — validated

Both halves of the proposed measurement infrastructure work end-to-end:

| Tool | What it gave us | Status |
|---|---|---|
| Playwright bundled chromium (via plugin or `playwright-core`) | Full-page screenshot, focused-section screenshot, computed-styles JSON for any element | ✅ Works once `--executable-path` points at bundled Chromium (sudo-free install) |
| Figma MCP `get_metadata` + drill-in `get_design_context` | Per-frame design intent with exact hex / sizes / weights / spacing | ✅ Works when drilling into ≤748×748 leaf-ish frames; section-level frames hit token ceiling and need drill-in |

Files produced:
- `homepage-full.png` (3.3 MB, full page rendering of `/new-project-homepage`)
- `autoswitching-section.png` (80 KB, focused on the section)
- `autoswitching-design-right-panel.png` (68 KB, design reference for the right-side diagram)

## Site (rendered) — measured via Playwright

Computed styles extracted via `page.evaluate(() => getComputedStyle(...))`:

| Element | Family | Size | Weight | Color |
|---|---|---|---|---|
| Heading "You've got 'next.'" | IBM Plex Sans | **30px** | **400** | `rgb(255, 255, 255)` (white) |
| Subheading paragraph | IBM Plex Sans | **20px** | 400 | `rgba(31, 41, 55, 0.8)` (Gray/80) |
| Card title (e.g. "Agentic Orchestration") | IBM Plex Sans | **20px** | 400 | `rgb(255, 255, 255)` |
| Card description | IBM Plex Sans | **14px** | 400 | `rgba(31, 41, 55, 0.8)` (Gray/80) |
| Section background | (transparent) | — | — | inherits `--color-surface-inverse` = navy |
| Body fontFamily | IBM Plex Sans | — | — | — |

Section layout: heading + subheading **stacked vertically**, full-width.

## Design (Figma) — measured via drill-in MCP

Pulled from three nested frames:

**Heading area** (`7876:51955` Section Pricing):
| Element | Family | Size | Weight | Color | Layout |
|---|---|---|---|---|---|
| "You've got 'next.'" | IBM Plex Sans | **64px** | **300 (Light)** | `#FAFAFA` | LEFT, max-width 800px |
| Subheading paragraph | IBM Plex Sans | **24px** | 400 (Regular) | `#FAFAFA` | RIGHT, max-width 500px |
| Section padding | — | — | — | — | pt-48 pb-64 px-64 |
| Layout | — | — | — | — | **flex row, space-between** |

**Card list panel** (`7876:51962`):
| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Card title | IBM Plex Sans | **32px** | 400 | `#FAFAFA` | line-height 1.3 |
| Card description (inactive) | IBM Plex Sans | **18px** | 400 | `#3d6c9a` (muted blue) | line-height 1.4 |
| Card description (**active**) | IBM Plex Sans | **18px** | 400 | `#9ac4ec` (lighter brighter blue) | line-height 1.4 |
| Card padding | — | — | — | — | px-24 py-32 |
| Card divider | — | — | — | `#2b4b6b` (navy-tinted) | bottom border |
| Active card bg | — | — | — | `#001c36` (slightly darker than `#00274d` page) | + fuchsia bottom border `#e03b71` |
| Active card indicator | — | — | — | `#e03b71` (Primary/Raspberry) | bottom border, NOT a progress bar |
| Icon container | — | — | — | `#001c36` bg, 4px radius, **46×46** | per-card different IBM-style 32×32 icon |

**Right panel** (`7876:51991`): a per-card diagram (AI decision agent flow chart) — composed of many SVG fragments, hits MCP ceiling. Treated as a static graphic per `figma-mcp-template.md` core principle 3.

## Diff — site vs design

Concrete deltas with magnitude:

### Critical (visibly broken, must fix)

| Element | Site | Design | Delta | Root cause |
|---|---|---|---|---|
| Heading size | 30px | **64px** | +34px (+113%) | `<Heading size="h2">` defaults to `--text-h2: 30px`; design needs Display lg / hero scale |
| Heading weight | 400 | **300 (Light)** | -1 weight step | `<Heading>` primitive has no `weight` prop; theme.css now exposes `--font-weight-light` but primitive doesn't consume it |
| Heading layout | stacked vertical | **flex row split** (heading L, sub R) | layout shape | known T6.2 split-heading gap — recurring across pages |
| Card title size | 20px | **32px** | +12px (+60%) | block uses `<Heading size="h4">`; should be `size="h3"` |
| Card description color | `#1f2937cc` (Gray/80, ~80% opacity dark) | `#3d6c9a` / `#9ac4ec` (muted blue / brighter blue) | **wrong color family entirely** | block uses `--color-secondary` token (light-mode body text) on inverse-toned section. Token miscarriage. |
| Active state visual | white card bg + lime green progress bar at bottom | **slightly DARKER bg `#001c36` + fuchsia `#e03b71` bottom border** | wrong metaphor | block was built for "active = inverse" treatment; design uses "active = subtle dark + brand underline" |
| Right panel content | placeholder white card with active card title | **per-card diagram (composed graphic)** | content + treatment | media slot exists in schema but no content seeded; diagram needs to be uploaded as image |
| Icons on cards | none | **per-card 32×32 IBM-style SVG in 46×46 navy container** | structural | block doesn't render `items[].icon` (schema has it; React doesn't consume it) |

### Secondary (smaller drift, fixable cosmetic)

| Element | Site | Design | Notes |
|---|---|---|---|
| Section padding | block default | px-64 pt-48 pb-64 | content shifts but layout still works |
| Card padding | block default | px-24 py-32 | minor |
| Card border color | `--color-surface-raised` border | `#2b4b6b` (navy-tinted) | rgb similar but tint different |

## Gap categorization (for prioritization)

**Token-level (theme.css already covers most; one gap):**
- `--color-secondary` is meant for light-mode body text. On `inverse` surface tone it's miscarried. Solutions:
  - (a) Add `--color-on-inverse-secondary` etc semantic tokens for inverse-surface text colors
  - (b) Make the AutoSwitchingCards block detect inverse tone and switch to inverse-text tokens
  - (c) Add a `color="muted-on-dark"` variant to `<Text>` that maps to brighter blue
- New tokens needed: `--color-active-indicator: #e03b71` (Primary/Raspberry — already in PROJECT_DESIGN_NODES.md baseline), `--color-card-active-bg: #001c36` (darker-than-page navy), `--color-card-divider: #2b4b6b`.

**Primitive-level (highest leverage — single fix touches many sections):**
- `<Heading>` needs a `weight` prop (already flagged Light 300 weight gap).
- `<Heading>` needs Display-scale sizes (Display lg/xl/2xl) — current cap is h1=48px; design uses 64px+ on heroes routinely.
- Or alternative: add a `display` or `large` prop variant.

**Block-level (per-block work):**
- `block.autoSwitchingCards` React component:
  - Render `items[].icon` (currently in schema, not in JSX)
  - Replace progress-bar active indicator with bottom-border active indicator
  - Use darker-than-page bg for active card, not white
  - Bind text color to surface-tone-aware token, not raw `--color-secondary`
  - Render right panel as per-card image (when `items[].media` is populated)
- `<BaseBlock>` / sectionHeading: split-heading-row layout (T6.2 — recurring).

**Schema/content-level:**
- Seed `items[].icon` with the 4 IBM-style SVG icons for Agentic / Rules / Automation / Intelligence.
- Seed `items[].media` with the 4 per-card diagram images (CMS image uploads).

## Workflow learnings — codify into docs

1. **Both `get_metadata` AND `get_design_context` can hit MCP token ceiling on section-level frames.** AutoSwitchingCards' metadata alone was 488K chars / 3,176 lines. The drill-in rule (S2 in scratchpad) needs to extend: don't just drill on multi-region frames, drill on ANY frame likely to exceed the ceiling. Heuristic: any frame >800px tall AND content-dense.
2. **`get_screenshot` is a viable fallback** for frames that exceed the design-context ceiling. Lossy on structure but you keep visual reference. Use when drill-in's leaf frames also exceed ceiling.
3. **Playwright + plugin requires `--executable-path` config** when system Chrome isn't installed. Documented the bundled-Chromium path; should add to pre-run-sanity-check.md as Check 6.
4. **`page.evaluate(() => getComputedStyle(el))` makes Track 1 of the rubric mechanical.** No more estimating. Each rubric row reads from real values.
5. **Design intent per nested frame is concrete and quotable.** "Heading is 64px Light" is now a measured fact, not a guess. The diff document above is the kind of evidence Stage 5 should produce per section across both pages.

## What this PoC proves about the rescore

The earlier "honest today ~65% / post-swap ~91%" estimate is approximately right for the AutoSwitchingCards section but **for slightly different reasons than I claimed**:

- The rescore correctly predicted that Color (Row 4) would fail without exemption — confirmed: Gray/80 on navy is wrong color family entirely.
- The rescore predicted Typography weight/family (Row 3) would partially fail — confirmed: family is right (IBM Plex Sans flowed), weight is wrong (400 vs 300).
- **The rescore UNDER-predicted size drift (Row 2).** Heading is 30px vs 64px, card title is 20px vs 32px. That's a 50–60% miss on size, not a 1-step enum miss. The rubric's "within 1 enum step" tolerance is too generous when the design uses sizes the primitive can't reach (e.g. 64px heading > h1=48px max).
- **The rescore did not address Layout (Row 1) miss.** Site stacks heading + subheading; design splits them. Layout drift wasn't in my "honest today" projection.

So the actual honest score for AutoSwitchingCards is probably **~50% pre-fixes** — worse than the page average estimate. Other sections might be similarly under-estimated. **The full rescore using this workflow on every section will produce different (likely lower) numbers than my projection.** That's the right outcome — measurement replaces estimate.

## Next-step proposal (not actioned yet — PoC only)

If this workflow is approved as the standard for visual-fidelity work going forward:

1. Apply the same Playwright + drill-in MCP pass to the remaining 12 Homepage sections + 11 Platform sections. Estimated time: ~3–4 hours total (each section ~10 min for screenshots + computed-style extract + drill-in MCP for design intent).
2. Produce a per-section diff doc following this template.
3. Aggregate findings into a corrected, **measured** rubric score per page.
4. Categorize all gaps across all sections into token / primitive / block / schema buckets.
5. THEN start fixing — primitives first (highest leverage), then blocks, then content.

Estimated total to true ~95% visual fidelity on both pages: token tweaks (~1h) + primitive `weight` prop + Display-scale sizes (~2h) + per-block fixes (~4-6 blocks × ~30min) + content seeding (~1-2h) = roughly a day of work, distributed across the right layer of the stack.
