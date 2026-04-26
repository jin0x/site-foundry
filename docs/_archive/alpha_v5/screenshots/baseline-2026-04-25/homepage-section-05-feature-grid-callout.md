# Homepage — Section 5 — FeatureGrid + Callout (compound)

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7876:38976`
**Block types rendered:** `block.featureGrid` (3-icon cards) + `block.callout` (Compare Decisions row) — **rendered as TWO separate, non-adjacent pageBuilder blocks**
**Site URL:** `http://localhost:3000/new-project-homepage`
- featureGrid at y≈1838px
- callout at y≈7078px (5,240px lower — at the very bottom of the page near the closing CTA)
**Date measured:** `2026-04-25`

## Site (rendered) — measured

### Top half — featureGrid (3 cards)

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Section heading "Your systems run the business..." | IBM Plex Sans | 30px | 400 | `rgb(10,10,12)` | `<Heading size="h2">` |
| Section subheading "Core systems weren't built..." | IBM Plex Sans | 20px | 400 | Gray/80 | recurring miscarriage |
| Card title × 3 (`<h3>`) | IBM Plex Sans | 24px | 400 | `rgb(10,10,12)` | `<Heading size="h3">` |
| Card description × 3 | IBM Plex Sans | 16px | 400 | Gray/80 | `text-body text-[var(--color-secondary)]` |
| Section padding | — | — | — | — | `py-4` (16px 0) |
| imageCount | — | — | — | — | 3 (one icon per card) |
| buttons | — | — | — | — | 0 |
| Section size | — | — | — | — | 1920 × 440px |

### Bottom half — callout (rendered ~5240px below featureGrid)

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading "Compare Decisions with competitors." | IBM Plex Sans | 30px | 400 | `rgb(10,10,12)` | `<Heading size="h2">` (centered as full-section heading, not horizontal) |
| Description | IBM Plex Sans | 16px | 400 | Gray/80 | `max-w-2xl` |
| CTA "Download the eBook" | IBM Plex Sans | 16px | 500 | `rgb(10,10,12)` on Bright Blue (`rgb(0,128,255)`) | rounded-full pill, padding `0 24px` |
| Section padding | — | — | — | — | `py-16` (64px 0) |
| Section size | — | — | — | — | 1920 × 292px |

## Design (Figma) — measured via `get_design_context` on `7876:38976`

Tokens cited:
- `Heading/H1: 64/Light/1.1` `Heading/H2: 48/Light/1.1` `Heading/H3: 32/Regular/1.3` `Heading/H4: 24/Regular/1.3` `Heading/H5: 18/Regular/1.4`
- `Light/Text/Default: #0A0A0C`, `Light/Text/Muted: #0A0A0C` (60%), `Light/Text/Inverse: #FFFFFF`
- `Light/Background/Default: #FFFFFF`, `Light/Border/Default: #E8E8E8`
- `Primary/Azure Blue: #0080FF`
- CSS var `--secondary` resolves to `#00274d` (Brand Dark Blue 100)

| Element | Family | Size | Weight | Color | Layout |
|---|---|---|---|---|---|
| Section heading "Your systems run the business. Decisions runs what they can't." | IBM Plex Sans | **64px** | **300 (Light)** | `#0A0A0C` | line-height 1.1, max-w-800, w-800 |
| Right-aligned subheading "Core systems weren't built..." | IBM Plex Sans | **24px** | 400 | `#0A0A0C` | line-height 1.3, max-w-500, flex-row align with heading |
| Header padding | — | — | — | — | `pb-64 pt-48 px-64` |
| Card title × 3 | IBM Plex Sans | **48px** | **300 (Light)** | `#0A0A0C` | line-height 1.1, w-full (Heading/H2 token) |
| Card description × 3 | IBM Plex Sans | **18px** | 400 | `rgba(10,10,12,0.6)` | line-height 1.4, max-w-300 (Heading/H5 token used as body) |
| Card icons | — | — | — | white SVG on `#00274d` (`var(--secondary)`) bg | 54×54 container, 32×32 icon, rounded-4 |
| Card row outer | — | — | — | — | `border-t border-[#e8e8e8]`; per-card `border-l` on cards 2 & 3; `p-48` per card |
| Section outer wrapper | — | — | — | white bg | `border #e8e8e8` (4-sided) |
| Compare row heading | IBM Plex Sans | **32px** | 400 (Regular) | `#0A0A0C` | line-height 1.3, w-800 (Heading/H3) |
| Compare row description | IBM Plex Sans | 18px | 400 | `rgba(10,10,12,0.6)` | line-height 1.4, w-450 |
| Compare row CTA | IBM Plex Sans | **14px** | 400 | white on `#00274d` (Navy) | rectangular padding `14px 20px`, no rounded-full |
| Compare row layout | — | — | — | — | flex row, items-end, justify-between, `border-b #e8e8e8`, `px-48 py-54` |
| **Critical:** Compare row sits **inside the same `Section Features` outer wrapper** | — | — | — | — | adjacent to feature cards via `imgLine265` divider |

## Diff — site vs design

### Critical (visibly wrong, must fix)

| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| **Structural — Compare row position** | rendered as separate block 5,240px lower on page | adjacent to feature cards, inside same wrapper | major structural drift | Schema — design is one compound section, but seed splits into two pageBuilder entries that lose adjacency. Either (a) one block (`featureGrid` with embedded `compareRow`), (b) a new `featureGridWithCompare` block, or (c) ensure seed places callout immediately after featureGrid. **Choice (c) is content-fix only** |
| Section heading size | 30px | 64px | +113% | Token — `--text-h2` 30 vs design `Heading/H1` 64. Same scale-misalignment as Sections 3+4 |
| Section heading weight | 400 | 300 (Light) | -1 step | Primitive — recurring |
| Card title size | 24px (h3) | 48px (Heading/H2) | +100% | Token — `--text-h3` 24 vs design `Heading/H2` 48 |
| Card title weight | 400 | 300 (Light) | -1 step | Primitive — recurring |
| Card description size | 16px | 18px | within tolerance ✓ | minor |
| Card description color | Gray/80 (`#1f2937cc`) | Neutral 60% (`rgba(10,10,12,0.6)`) | wrong base | Token — `--color-secondary` recurring |
| Card title role used | h3 | "h2-equivalent" (Heading/H2 = 48 Light) | wrong heading rank | Block — `featureGrid.items[].title` maps to h3; design uses larger weight |
| Compare row heading | 30px h2, full-section centered | 32px h3, horizontal flex-row, `border-b` | wrong layout shape entirely | Block — `callout.tone='accent'` would render centered; needs a `layout='horizontal'` variant. **Recurring callout-horizontal gap (D7 in queue)** |
| Compare row CTA | rounded-full pill, Bright Blue, padding `0 24` | rectangular, Navy `#00274d`, padding `14 20` | wrong button variant | Block / primitive — same `<Button>` rectangular variant gap as Section 1 |
| Compare row CTA text color | `rgb(10,10,12)` on Bright Blue | white on Navy | wrong color | Block — primary button on light surface currently dark text + Bright Blue bg; design uses Navy bg + white text |
| Section padding | `py-4` (featureGrid), `py-16` (callout) | header `pb-64 pt-48 px-64`, cards `p-48`, compare row `px-48 py-54` | layout drift | Block — both featureGrid + callout don't apply design padding |
| Outer wrapper border | absent | 4-sided `border #e8e8e8` enclosing entire compound | structural | Block — recurring (Section 4 also lacks the outer 3-or-4-sided border) |
| Card icon container | unknown rendering (3 icons, but bg/size not measured here — script captures only headings/paragraphs/buttons) | white SVG on `#00274d` Navy bg, 54×54 rounded-4 | structural detail | Block — `featureGrid.items[].icon` rendering needs verification; if rendered as inline SVG without bg container, design intent is lost |

### Secondary (smaller drift)

| Element | Site | Design | Notes |
|---|---|---|---|
| Card description size | 16px | 18px | within 1 step |
| Section subheading size | 20px | 24px | within 1 step |
| Compare row description size | 16px | 18px | within tolerance |

## Rubric scoring (this section — compound)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ✗ | Compound section split into two non-adjacent pageBuilder blocks; outer wrapper border absent; horizontal callout rendered as centered |
| 2 | Typography — size | ✗ | Heading 30→64; card title 24→48; both primitive caps |
| 3 | Typography — weight/family | ⚠ | Family ✓; heading + card titles 400 vs 300 ✗ |
| 4 | Color | ✗ | All description text Gray/80 vs Neutral 60%; CTA Bright Blue vs Navy + dark text vs white |
| 5 | Spacing | ✗ | Paddings entirely wrong scale across both halves |
| 6 | Content present | ✓ | Heading, sub, 3 cards (title + desc + icon), Compare row heading + desc + CTA all rendered (just misplaced) |
| 7 | Affordance | ⚠ | CTA exists and clickable; visual treatment wrong (color, shape) |

**Score:** `1/7`. Section pass: ✗ (≥5/7 required).

## Gap categorization (this section)

- **Token-level:**
  - `--color-secondary` recurring (Gray vs Neutral muted) — already counted in Sections 1, 3, 4
  - `--text-h1` 48 vs design 64 — recurring (counted in Section 4)
  - `--text-h2` 30 vs design 48 — recurring (counted in Section 3)
  - `--text-h3` 24 vs design 32 — **new this section** (callout heading should be 32px, site uses 24px)
  - Need: rectangular Navy primary button color tokens (recurring with Section 1)
- **Primitive-level:**
  - `<Heading>` `weight` prop (Light 300) — recurring
  - `<Button>` rectangular Navy variant — recurring
  - `<Card>` or featureGrid card needs an icon-container variant (white SVG on Navy bg, 54×54, rounded-4)
- **Block-level:**
  - **`block.featureGrid`:** outer wrapper border (4-sided), per-card `border-l` dividers between cards, `p-48` per card, `pb-64 pt-48 px-64` header. Card title primitive role: should use Heading/H2 (Light 48) not h3 (Regular 24)
  - **`block.callout` `layout='horizontal'`:** flex-row, items-end, justify-between, `border-b`, `px-48 py-54`, with title (Heading/H3 32px Regular) + description on left, CTA on right. Recurring D7 gap
- **Schema/content-level:**
  - **Adjacency: callout currently placed at end of pageBuilder; design wants it immediately after featureGrid.** Re-order seed OR introduce a compound block. Choice depends on whether the same pattern recurs (it does — Platform Section 11 has the same Compare-row pattern adjacent to features)
  - Verify icon container rendering on featureGrid (icons are present per imageCount=3; bg + size unverified)

## Notes / surprises

- **The 5,240px gap between featureGrid and Compare row** is the highest-leverage *structural* finding so far. The design treats them as one compound section; the implementation seeds them as two separate pageBuilder entries placed at opposite ends of the page. This is a Stage-2 (Frame → seed mapping) issue, not a block issue. **Adjacency information from the Figma frame structure isn't being preserved through to seed JSON.**
- **Card titles in design are 48px Light — same scale as the section's biggest text in Section 3 (also 48px Light).** Design language: feature card titles are visually equal-rank to section section headings on adjacent sections. Implementing this requires either Heading/H2 in `featureGrid.items[].title`, or a new size enum.
- **The `--secondary` CSS var in design code resolves to `#00274d` Navy** (Brand Dark Blue 100) — this is the icon container background, the Compare row CTA background, and likely many other "secondary surface" usages across all pages. Already on the canonical token list, but worth flagging that `--secondary` ≠ `--color-secondary` and ≠ `--secondary-text`. Three different "secondary" semantics in play.
