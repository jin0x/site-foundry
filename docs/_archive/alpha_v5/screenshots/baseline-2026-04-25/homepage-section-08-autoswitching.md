# Homepage — Section 8 — AutoSwitchingCards

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7876:51954`
**Block type rendered:** `block.autoSwitchingCards` (new block, shipped on `feat/decisions-dogfood-run`)
**Site URL:** `http://localhost:3000/new-project-homepage`
**Date measured:** `2026-04-25` (PoC — backfilled into section template for aggregation)
**Source:** condensed from `alpha_v5/screenshots/baseline-2026-04-25/POC-FINDINGS.md`

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading "You've got 'next.'" | IBM Plex Sans | 30px | 400 | `rgb(255, 255, 255)` | `<Heading size="h2">` |
| Subheading paragraph | IBM Plex Sans | 20px | 400 | `rgba(31, 41, 55, 0.8)` | Gray/80 — token miscarriage on inverse surface |
| Card title (e.g. "Agentic Orchestration") | IBM Plex Sans | 20px | 400 | `rgb(255, 255, 255)` | `<Heading size="h4">` |
| Card description | IBM Plex Sans | 14px | 400 | `rgba(31, 41, 55, 0.8)` | Same Gray/80 token miscarriage |
| CTA "Schedule a demo" | IBM Plex Sans | (button default) | — | white | present |
| Section bg | (transparent) | — | — | inherits `--color-surface-inverse` (navy) | walked to body to find opaque ancestor |

Layout: heading + subheading **stacked vertically**, full-width.

## Design (Figma) — measured via drill-in

Sources: `mcp__figma__get_design_context` on `7876:51955` (Section Pricing heading area), `7876:51962` (card list panel); `mcp__figma__get_screenshot` on `7876:51991` (right diagram — composed graphic).

| Element | Family | Size | Weight | Color | Layout |
|---|---|---|---|---|---|
| Heading "You've got 'next.'" | IBM Plex Sans | **64px** | **300 (Light)** | `#FAFAFA` | LEFT col, max-width 800px |
| Subheading paragraph | IBM Plex Sans | **24px** | 400 | `#FAFAFA` | RIGHT col, max-width 500px |
| Card title | IBM Plex Sans | **32px** | 400 | `#FAFAFA` | line-height 1.3 |
| Card description (inactive) | IBM Plex Sans | **18px** | 400 | `#3d6c9a` | muted blue |
| Card description (active) | IBM Plex Sans | **18px** | 400 | `#9ac4ec` | brighter blue |
| Active card bg | — | — | — | `#001c36` | darker than page navy `#00274d` |
| Active card indicator | — | — | — | `#e03b71` (Primary/Raspberry) | bottom border, NOT progress bar |
| Card divider | — | — | — | `#2b4b6b` | navy-tinted bottom border |
| Icon container | — | — | — | `#001c36` bg, 4px radius, 46×46 | per-card 32×32 IBM-style SVG |
| Section padding | — | — | — | — | pt-48 pb-64 px-64 |
| Card padding | — | — | — | — | px-24 py-32 |
| Layout (heading row) | — | — | — | — | **flex row, space-between** |
| Right panel | — | — | — | — | per-card flow diagram (composed graphic) |

## Diff — site vs design

### Critical (visibly wrong, must fix)

| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| Heading size | 30px | 64px | +34px (+113%) | Primitive — `<Heading size="h2">` caps at `--text-h2: 30px`; design wants Display lg/hero scale |
| Heading weight | 400 | 300 (Light) | -1 weight step | Primitive — `<Heading>` has no `weight` prop; theme.css exposes `--font-weight-light` but unused |
| Heading layout | stacked vertical | flex row split (heading L, sub R) | layout shape | Composite — split-heading-row gap (T6.2 recurring) |
| Card title size | 20px | 32px | +12px (+60%) | Block — should use `<Heading size="h3">` not `h4` |
| Card description color | Gray/80 (`#1f2937cc`) | `#3d6c9a` / `#9ac4ec` | wrong color family | Token — `--color-secondary` miscarried on inverse surface |
| Active state visual | white card bg + lime progress bar | dark `#001c36` bg + fuchsia `#e03b71` underline | wrong metaphor | Block — built for inverse-as-active treatment; design uses subtle-darker + brand underline |
| Right panel content | placeholder white card | per-card flow diagram | content + treatment | Schema — `items[].media` not seeded; needs upload |
| Card icons | none rendered | per-card 32×32 IBM SVG in 46×46 navy container | structural | Block — schema has `items[].icon`; React doesn't consume it |

### Secondary (smaller drift)

| Element | Site | Design | Notes |
|---|---|---|---|
| Section padding | block default | px-64 pt-48 pb-64 | content shifts; layout still works |
| Card padding | block default | px-24 py-32 | minor |
| Card border color | `--color-surface-raised` | `#2b4b6b` (navy-tinted) | rgb close, tint different |

## Rubric scoring (this section)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ✗ | Heading row stacked vs split row; right-panel content absent (placeholder card) |
| 2 | Typography — size | ✗ | Heading 30px vs 64px (+113%); card title 20px vs 32px (+60%) — primitive can't reach Display sizes |
| 3 | Typography — weight/family | ⚠ | Family ✓ (IBM Plex Sans both); weight ✗ (400 vs 300 on heading) |
| 4 | Color | ✗ | Description colors wrong family — `--color-secondary` miscarried; active-card metaphor uses wrong tokens |
| 5 | Spacing | ⚠ | Card/section padding drifts vs design; not measured pixel-precise but visibly tighter |
| 6 | Content present | ⚠ | Text + CTA ✓; icons absent; right-panel diagrams absent (placeholder) |
| 7 | Affordance | ✓ | CTA present; cards interactive; auto-advance + click-swap + hover-pause behaviors live |

**Score:** `1/7`. Section pass: ✗ (≥5/7 required).

## Gap categorization (this section)

- **Token-level:**
  - `--color-secondary` is light-mode body-text token; mis-applied on inverse surface — needs `--color-on-inverse-secondary` semantic token, or block-level inverse-tone awareness
  - New tokens needed: `--color-active-indicator: #e03b71`, `--color-card-active-bg: #001c36`, `--color-card-divider: #2b4b6b`
- **Primitive-level:**
  - `<Heading>` needs `weight` prop (Light 300 reachable)
  - `<Heading>` needs Display-scale sizes (Display lg/xl/2xl beyond h1=48px)
- **Block-level (`block.autoSwitchingCards`):**
  - Render `items[].icon` (schema → JSX)
  - Replace progress-bar active indicator with bottom-border underline
  - Active card bg: dark-than-page navy, not white
  - Bind text colors to surface-tone-aware tokens (not raw `--color-secondary`)
  - Render right panel as per-card image when `items[].media` populated
  - Use split-heading-row layout (depends on composite gap)
- **Schema/content-level:**
  - Seed `items[].icon` × 4 (Agentic / Rules / Automation / Intelligence — IBM-style 32×32 SVG)
  - Seed `items[].media` × 4 (per-card flow diagrams as CMS image uploads)

## Notes / surprises

- Heading size delta (+113%) is much larger than the rubric's "within 1 enum step" tolerance contemplates — Display scales need to exist before this row can be scored cleanly anywhere on the page.
- Active state metaphor mismatch is the kind of gap that survives a token swap intact — it's a block-level behavior choice, not a token miscarriage.
- The composed-graphic right panel (per principle 3) is correctly handled as a CMS-uploaded image; gap is purely "content not yet seeded," not "block can't render it."
