# Platform — Section 6 — Core capabilities (3×2 featureGrid)

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7900:116272`
**Block type rendered:** `block.featureGrid` cols=3, 6 items
**Site URL:** `http://localhost:3000/new-project-platform` (scroll to ~y=1736px, h=634)
**Date measured:** `2026-04-25`

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading | IBM Plex Sans | 30px | 400 | rgb(10,10,12) | `<h2>` `text-h2 font-normal` |
| Card title (×6) | IBM Plex Sans | 24px | 400 | rgb(10,10,12) | `<h3>` `text-h3 font-normal` |
| Card description (×6) | IBM Plex Sans | 16px | 400 | rgba(31,41,55,0.8) | `text-body text-[var(--color-secondary)]` |
| Icons (×6) | — | — | — | — | `imageCount: 6` ✓ — present! |
| Section bg | — | — | — | transparent | inherits page body |
| Section padding | — | — | — | — | `16px 0px` (py-4) |

```json
{
  "sectionBoundsAbs": {"y": 1736, "width": 1920, "height": 634},
  "sectionCls": "relative py-4",
  "sectionPadding": "16px 0px",
  "headings": [
    {"tag": "h2", "fontSize": "30px", "fontWeight": "400", "color": "rgb(10, 10, 12)", "text": "Core capabilities that set you up for success"},
    {"tag": "h3", "fontSize": "24px", "fontWeight": "400", "color": "rgb(10, 10, 12)", "text": "Agentic orchestration"},
    {"tag": "h3", "text": "Enterprise rules engine"},
    {"tag": "h3", "text": "Workflow & process automation"},
    {"tag": "h3", "text": "Application development"},
    {"tag": "h3", "text": "Process intelligence"},
    {"tag": "h3", "text": "Integrations"}
  ],
  "paragraphs": [
    {"fontSize": "16px", "color": "rgba(31, 41, 55, 0.8)", "text": "Coordinate AI agents, people, workflows, and systems in real time."},
    "...5 more"
  ],
  "buttons": [],
  "imageCount": 6,
  "interactiveCount": 0
}
```

## Design (Figma) — measured via drill-in

(Source: `mcp__figma__get_design_context` on `7900:116272` — succeeded directly.)

**Container:** `bg-white border #e8e8e8` (Section Features)

**Header** (`7900:116274`, `pb-64 pt-48 px-64 gap-128`):
- Heading: IBM Plex Sans Light 300, 64px (Heading/H1), leading 1.1, max-w-700, **two-line with `<br>` after "that "**
- No subheading, no eyebrow, no CTAs

**Grid** (2 rows × 3 cols, each row `border-t #e8e8e8`, each card `border-l #e8e8e8`, all `p-[48px] gap-[32px]`):

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Icon | — | — | — | bg `var(--secondary,#00274d)` Navy | size-54 rounded-4, 32px IBM icon inside |
| Card title | IBM Plex Sans | 24px (Heading/H4) | 400 (Regular) | `#0A0A0C` | leading 1.3 |
| Card description | IBM Plex Sans | 15px (Text/Default) | 400 (Regular) | `rgba(10,10,12,0.6)` (Neutral 60%) | leading 1.6, max-w-300 |

6 cards: Agentic orchestration, Enterprise rules engine, Workflow & process automation, Application development, Process intelligence, Integrations — each w/ unique icon (network--3, rule, flow--connection, app-connectivity, ibm-watson--discovery, connect--source).

## Diff — site vs design

### Critical (visibly wrong, must fix)

| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| Heading size | 30px | 64px (H1) | −34px / −53% | Token + Primitive |
| Heading weight | 400 | 300 (Light) | weight off | Primitive |
| Heading line break (`<br>` after "that ") | absent | explicit `<br>` | content/seed | Schema |
| Card description size | 16px | 15px | +1px (within ±1 enum step) | Token — design uses Text/Default 15 not Body 16; minor |
| Card description color | `rgba(31,41,55,0.8)` (Tailwind gray @ 80%) | `rgba(10,10,12,0.6)` (Neutral @ 60%) | wrong base color + wrong opacity | **Token** — `--color-secondary` recurring miscarriage |
| Card description leading | 24/16 = 1.5 | 1.6 | minor | Token |
| Card description max-w | likely full | max-w-300 | width unrestricted | Block |
| Section bg + outer border | transparent | `bg-white border #e8e8e8` | white card chrome missing | Block |
| Section padding | `16px 0px` (py-4) | header `pb-64 pt-48 px-64` | dramatically thin | Block |
| Per-card padding | unknown (likely thin or 0) | `p-[48px]` | inner padding missing | Block |
| Inter-card borders | likely absent | `border-t` between rows + `border-l` between cards | grid divider lines absent | Block |
| Card title size | 24px | 24px | match | ✓ — first section measured where card title hits exactly |

### Secondary (small drift)

| Element | Site | Design | Notes |
|---|---|---|---|
| Card title family/weight | IBM Plex Sans 400 | IBM Plex Sans 400 | match ✓ |
| Card icon presence | 6 imgs ✓ | 6 icons | match — only section all icons present |
| Icon bg | unknown — would need per-image inspect | `var(--secondary,#00274d)` Navy | likely renders since it uses CSS var |

## Rubric scoring (this section)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ⚠ | 6-item 3×2 grid present (likely), but inter-card divider lines and card padding wrong |
| 2 | Typography — size | ✗ | Heading 30 vs 64. Card title 24 vs 24 ✓ but heading miss outweighs. Card desc 16 vs 15 within ±1. |
| 3 | Typography — weight/family | ✗ | Heading weight 400 vs 300; family ✓ |
| 4 | Color | ✗ | Card description `--color-secondary` resolves to gray @ 80% vs neutral @ 60% |
| 5 | Spacing | ✗ | py-4 vs pb-64 pt-48 px-64; per-card 0 vs p-48 |
| 6 | Content present | ✓ | 6 icons + 6 titles + 6 descriptions all present (rare!) |
| 7 | Affordance | ✓ | No CTAs in design or site — match by absence |

**Score:** `2/7` (with ⚠ counted as ✗). **Section pass:** ✗. Best content-completeness of any Platform section measured so far — only structural and token gaps left.

## Gap categorization (this section)

- **Token-level:**
  - `--color-secondary` (recurring) — Neutral 60% expected, gray @ 80% delivered.
  - Heading-token-name collision (recurring): `text-h1`/`text-h2` < design H1.
- **Primitive-level:**
  - `<Heading>` no `weight` / no Display/64 (recurring).
- **Block-level:**
  - `block.featureGrid` (cols=3, 6-item) doesn't render white card chrome + outer border.
  - Inter-card border dividers absent (no `border-t` row separator, no `border-l` column separator).
  - Per-card `p-48` and `gap-32` between icon and text not applied.
  - Card description max-w-300 not constrained.
- **Schema/content-level:**
  - Heading line-break preservation (recurring): `<br>` after "that " not making it through schema.
  - Card description text uses 15px (Text/Default) vs site's `text-body` 16px — borderline; could classify as token or block.

## Notes / surprises

- **Highest content-completeness of any section measured.** All 6 icons rendered, all 6 titles + descriptions present. The block.featureGrid cols=3 6-item variant is closest to functional; only chrome (borders + padding) and heading typography keep it from hitting 5/7.
- **Card title size 24px hits design's H4 24px exactly** — first card-title size match across all 14 measured sections. Indicates `text-h3` (= 24px in current theme) lands correctly when block uses `<h3>`. The `text-h{n}` collision applies to top-of-section headings, not card-level h3s.
- Card description 15 vs 16 is 1px off and within ±1 enum step — but this pattern (15 vs 16) means the site uses `text-body` 16 where design uses `Text/Default` 15. If `Text/Default` is added as a 15px token, all card-desc sites would fix.
- Worth predicting: once `--color-secondary` and heading size/weight are fixed at the token/primitive layer, this section flips to ~5/7 (passes border-line) without any block-level work. **Highest-leverage fix candidate** alongside Section 13 (callout lime).
- This section closely parallels Homepage Section 5 (feature-grid-callout), but where Homepage had compound-section adjacency lost, Platform's Section 6 renders cleanly as a single section.
