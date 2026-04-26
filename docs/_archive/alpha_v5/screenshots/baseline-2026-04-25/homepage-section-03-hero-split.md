# Homepage — Section 3 — HeroSplit

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7876:39024`
**Block type rendered:** `block.heroSplit` (`mediaPlacement='left'`)
**Site URL:** `http://localhost:3000/new-project-homepage` (y≈846px)
**Date measured:** `2026-04-25`

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading "Design, deploy, and govern AI agents with confidence." | IBM Plex Sans | 30px | 400 | `rgb(10, 10, 12)` | `<Heading size="h2">` |
| Description paragraph | IBM Plex Sans | 16px | 400 | `rgba(31, 41, 55, 0.8)` | `text-body text-[var(--color-secondary)]` — Gray/80 token |
| Section bg | transparent | — | — | — | `<section class="relative py-4">` |
| Section padding | — | — | — | — | `16px 0px` (very thin py-4) |
| imageCount | — | — | — | — | 1 (left-column graphic) |
| buttons | — | — | — | — | 0 |
| Section size | — | — | — | — | 1920 × 586px |

## Design (Figma) — measured via drill-in (`get_design_context` exceeded ceiling on parent + Grid)

**Drill path:** parent `7876:39024` → ❌ exceeds → `get_metadata` → 2 columns at indent +2:
- LEFT column `7876:39026` (x=0, w=748, h=600) — composed App-UI mockup graphic with sidebar/nav/dashboard layout (treated as composed graphic per principle 3 — image upload)
- RIGHT column `7876:42184` (x=748, w=748, h=600) — text panel; drilled into successfully

(Parent screenshot saved to `homepage-section-03-design.png` — left column is a navy bg with neon-green/lime constellation pattern, NOT the App UI mockup the metadata suggested. The metadata's "App" frame is `hidden="true"` so it's not rendered; the visible left column is a different composed graphic.)

Tokens cited by right column:
- `Heading/H2: IBM Plex Sans Light 48px / line-height 1.1 / letterSpacing 0`
- `Text/Default: IBM Plex Sans Regular 15px / line-height 1.6 / letterSpacing 0`
- `Light/Text/Default: #0A0A0C`
- `Light/Text/Muted: #0A0A0C` (applied at 60% opacity → `rgba(10,10,12,0.6)`)

| Element | Family | Size | Weight | Color | Layout |
|---|---|---|---|---|---|
| Heading "Design, deploy, and govern AI agents with confidence." | IBM Plex Sans | **48px** | **300 (Light)** | `#0A0A0C` | line-height 1.1, w-full |
| Description | IBM Plex Sans | **15px** | 400 (Regular) | `rgba(10,10,12,0.6)` | line-height 1.6, max-width 400px |
| Right column | — | — | — | white bg | padding `p-64` (64px), flex-col, items-start, justify-between |
| Left column | — | — | — | dark navy bg with neon-green/lime constellation pattern | composed graphic (per principle 3) |
| Layout (section) | — | — | — | — | 50/50 split, two 748×600 columns butted; total 1496×600 |

## Diff — site vs design

### Critical (visibly wrong, must fix)

| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| Heading size | 30px (h2) | 48px (Heading/H2) | +18px (+60%) | Primitive — `<Heading size="h2">` is 30px in theme.css; design's `Heading/H2` is 48px Light. **Token-name collision: `Heading/H2` in design ≠ `--text-h2` in theme** |
| Heading weight | 400 | 300 (Light) | -1 weight step | Primitive — `<Heading>` has no `weight` prop (recurring) |
| Description color | `rgba(31, 41, 55, 0.8)` (Gray/80, `#1f2937cc`) | `rgba(10, 10, 12, 0.6)` (`Light/Text/Muted` 60%) | wrong base color | Token — `--color-secondary` uses Gray base `#1f2937`; design uses `Light/Text/Muted: #0A0A0C` (Neutral/Black 100% base). **Different muted-text base entirely** |
| Description size | 16px | 15px | +1px (within tolerance) | Cosmetic only — would pass on its own |
| Section padding | `py-4` (16px) | column `p-64` (64px all sides) | layout drift | Block — `heroSplit` doesn't apply per-column padding rules; sections are essentially flush |
| Right column inner padding | unknown | 64px all sides | block detail | Block — heroSplit text column doesn't apply 64px padding; text touches column edges |

### Secondary (smaller drift)

| Element | Site | Design | Notes |
|---|---|---|---|
| Heading line-height | 38.1px (~1.27) | 52.8px (1.1) | Display-scale headings should be tight (1.1), not text-scale (1.27) |
| Description line-height | 24px (1.5) | 24px (1.6) | Close enough |

## Rubric scoring (this section)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ✓ | 2-column split with media on left, text on right ✓ |
| 2 | Typography — size | ✗ | Heading 30→48 (+60%); primitive cap. Description 16 vs 15 within tolerance ✓ |
| 3 | Typography — weight/family | ⚠ | Family ✓; heading weight 400 vs 300 (Light) ✗ |
| 4 | Color | ✗ | Description color uses Gray base; design uses Neutral/Black base — wrong token family |
| 5 | Spacing | ✗ | Section `py-4` vs design column `p-64`; text touches column edges in site |
| 6 | Content present | ✓ | Heading + description + left graphic ✓ |
| 7 | Affordance | ✓ | No CTAs designed; none rendered — n/a |

**Score:** `3/7`. Section pass: ✗ (≥5/7 required).

## Gap categorization (this section)

- **Token-level:**
  - **`--color-secondary` is wrong base color.** Theme uses Gray ramp base `#1f2937`; design uses `Light/Text/Muted: #0A0A0C` at 60%. Token map needs to swap `--color-secondary` to `rgba(10,10,12,0.6)` (or `rgba(10,10,12,0.6)` consolidated semantic). **Single-line fix in `packages/tokens/src/theme.css` — affects every `text-[var(--color-secondary)]` instance across both pages.**
  - **`--text-h2` is wrong size.** Theme `--text-h2: 30px`; design `Heading/H2: 48px Light`. The token-name collision suggests the theme.css ingest used a different scale than the design system. Compare `Heading/H1=80, /H2=48, /H3=40, /H4=24, /H5=20, /H6=16` design heading scale vs theme.css `--text-h1` etc.
- **Primitive-level:**
  - `<Heading>` `weight` prop (Light 300) — recurring
  - `<Heading>` size scale needs to align with design's `Heading/H1..H6` not generic h1..h6 → review whether to rename or remap
- **Block-level (`block.heroSplit`):**
  - Apply `p-64` (or design-system equivalent) to text column when `mediaPlacement='left'` or `'right'` — currently text touches column edges
  - Section outer padding currently `py-4` is too thin; should follow per-block design padding (likely `py-16` or no outer; column owns its own padding)
- **Schema/content-level:**
  - Left composed graphic (navy + neon-green constellation) needs to be a CMS image upload — verify `heroSplit.media` is seeded for this section; appears to be, based on imageCount=1
  - The design's left column sits flush to the column edge (no inner padding) — confirm `<Image>` primitive renders edge-to-edge in this block

## Notes / surprises

- **`Heading/H2` token collision:** the design's `Heading/H2` is 48px Light 300 with line-height 1.1. The theme.css's `--text-h2` is 30px Regular 400. These names refer to *different things*. This is the single most likely root cause of "every heading on every page is wrong size + wrong weight." If `--text-h2` were remapped to 48/300/1.1, every section heading currently scoring ✗ on Row 2 would jump to ✓ in one PR.
- **Design's heading scale runs hotter than theme.css:** sampling so far — `Heading/Small: 80/Light` (Section 1 hero), `Heading/H2: 48/Light` (Section 3, also expected pattern). Design intent is "all section-level headings are Light-weight, large, tight line-height." This is a design-language signature; theme.css doesn't reflect it.
- **Description color uses Neutral/Black base, not Gray base.** This means `--color-secondary` should resolve to `rgba(10, 10, 12, 0.6)` not Gray/80 (`rgba(31, 41, 55, 0.8)`). Two-PR fix: theme.css token redefine + audit any `<Text muted>` consumers.
- The metadata's "App" frame inside the left column is `hidden="true"` — the actual visible graphic is the navy + neon-green constellation pattern shown in the screenshot. Aggregation should not over-count the metadata depth as evidence of complexity; it's a hidden alternate.
