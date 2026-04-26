# Homepage — Section 4 — StatGrid

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7926:30002`
**Block type rendered:** `block.statGrid` (new — shipped on `feat/decisions-dogfood-run`)
**Site URL:** `http://localhost:3000/new-project-homepage` (y≈1432px)
**Date measured:** `2026-04-25`

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading "How will AI reshape your enterprise?" | IBM Plex Sans | 30px | 400 | `rgb(10,10,12)` | `<Heading size="h2">` |
| Subheading "Read Forrester's report:..." | IBM Plex Sans | 20px | 400 | `rgba(31,41,55,0.8)` (Gray/80) | recurring `--color-secondary` miscarriage |
| Stat number "50%" | IBM Plex Sans | **48px** | **500 (Medium)** | **`rgb(177, 252, 95)` = `#b1fc5f` (LIME GREEN)** | `<p class="text-h1 font-medium text-[var(--color-brand-fuchsia)] font-light">` — see token bug below |
| Stat number "5x" | IBM Plex Sans | 48px | 500 | LIME GREEN | same |
| Stat number "XX" | IBM Plex Sans | 48px | 500 | LIME GREEN | same |
| "More trusted" inline label | IBM Plex Sans | 20px | 400 | Gray/80 | uses `text-prose-body` |
| Stat descriptions | IBM Plex Sans | 14px | 400 | Gray/80 | `text-small text-[var(--color-secondary)] max-w-md` |
| "Read Forrester's report" link `<a>` | IBM Plex Sans | 20px | 400 | Gray/80 | no visible underline; same color as surrounding text |
| Section bg | transparent | — | — | — | `<section class="relative py-4">` (16px 0) |
| imageCount | — | — | — | — | 0 |

## Design (Figma) — measured via `get_design_context` on `7926:30002`

Tokens cited:
- `Heading/H1: IBM Plex Sans Light 64px / line-height 1.1`
- `Heading/H4: IBM Plex Sans Regular 24px / line-height 1.3`
- `Heading/H5: IBM Plex Sans Regular 18px / line-height 1.4`
- `Text/Default: IBM Plex Sans Regular 15px / line-height 1.6`
- `Primary/Raspberry: #E03B71`
- `Light/Text/Default: #0A0A0C`
- `Light/Text/Muted: #0A0A0C` (applied at 60% opacity)
- `Light/Background/Default: #FFFFFF`
- `Light/Border/Default: #E8E8E8`

| Element | Family | Size | Weight | Color | Layout |
|---|---|---|---|---|---|
| Heading | IBM Plex Sans | **64px** | **300 (Light)** | `#0A0A0C` | line-height 1.1, max-width 800px / w-[700] |
| Right paragraph | IBM Plex Sans | **24px** | 400 (Regular) | `#0A0A0C` | line-height 1.3, max-width 500px; "Read Forrester's report" portion has `underline decoration-solid` |
| Stat numbers (50% / 5x / XX) | IBM Plex Sans | **64px** | **300 (Light)** | **`#E03B71` (Primary/Raspberry — pink/magenta)** | line-height 1.1, whitespace-nowrap |
| "More trusted" inline label | IBM Plex Sans | **18px** | 400 | `rgba(10,10,12,0.6)` | line-height 1.4 (Heading/H5) |
| Stat descriptions | IBM Plex Sans | **15px** | 400 | `rgba(10,10,12,0.6)` | line-height 1.6, max-width 400px |
| Header layout | — | — | — | — | flex row, items-end justify-between; padding `pb-64 pt-48 px-64` |
| Outer wrapper (Section Pricing) | — | — | — | white bg | `border-l border-r border-t border-[#e8e8e8]` (3-sided open-bottom) |
| Cards row | — | — | — | white bg | `border` all sides; flex; height 284px; total width 1496px |
| Each card | — | — | — | — | flex-col, gap-32, p-48; cards 2 & 3 have `border-l #e8e8e8` |

## Diff — site vs design

### Critical (visibly wrong, must fix)

| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| **Stat number color** | **LIME GREEN `#b1fc5f`** | **RASPBERRY `#e03b71`** | wrong color family entirely | Token — **`--color-brand-fuchsia` in theme.css resolves to `#b1fc5f` (Brand Lime Green base, not Brand Raspberry)**. Single-line theme.css fix |
| Stat number weight | 500 (Medium) | 300 (Light) | -2 weight steps | Block — `<p class="font-medium ... font-light">` has both classes; Tailwind ordering picks `font-medium` last. Block uses wrong primitive class. Should resolve to Light 300 |
| Stat number size | 48px (h1) | 64px (Heading/H1) | -16px (-25%) | Token collision — design `Heading/H1` is 64px, theme `--text-h1` is 48px. Same `Heading/H_n` token-collision pattern as Section 3 |
| Heading size | 30px (h2) | 64px (Heading/H1) | +34px (-53%) | Token collision; design uses H1 for the section title, theme.css's h2 doesn't reach 64px |
| Heading weight | 400 | 300 (Light) | -1 step | Primitive — `<Heading>` no `weight` prop |
| Subheading color | Gray/80 (`#1f2937cc`) | `rgba(10,10,12,0.6)` (Neutral 60%) | wrong base | Token — `--color-secondary` uses Gray base; design uses Neutral/Black at 60% |
| "More trusted" inline label class | `text-prose-body` (20px) | Heading/H5 (18px Regular) | wrong primitive variant | Block — inline label should be `<Text size="lg">` or equivalent at 18px, not prose-body 20px |
| Section padding | `py-4` (16px) | header `pb-64 pt-48 px-64` (much larger) | layout drift | Block — statGrid header doesn't match design padding scale |
| Card border treatment | unknown (likely none) | 3-sided open-bottom outer + 4-sided card row + per-card `border-l` dividers | structural | Block — statGrid doesn't render the bordered card pattern (recurring with logoMarquee in Section 2) |
| "Read Forrester's report" link affordance | `<a>` plain text, no underline visible, same color as body | underlined, intermixed with non-link text | wrong rendering | Block / primitive — link styling missing or wrong; should have `underline decoration-solid` from design |

### Secondary (smaller drift)

| Element | Site | Design | Notes |
|---|---|---|---|
| Subheading size | 20px | 24px | within 1 enum step |
| Stat description size | 14px | 15px | within tolerance |
| Stat number line-height | 60px (1.25) | 70.4px (1.1) | display-scale should be tight |

## Rubric scoring (this section)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ⚠ | 3 stat cards + heading row present ✓; missing 3-sided open-bottom border + per-card dividers + outer card row |
| 2 | Typography — size | ✗ | Heading 30→64 (-53%); stat 48→64 (-25%); both primitive caps |
| 3 | Typography — weight/family | ⚠ | Family ✓; heading 400 vs 300, stat 500 vs 300 — both wrong |
| 4 | Color | ✗ | **Stat numbers LIME GREEN vs RASPBERRY — wrong token entirely**; descriptions Gray vs Neutral muted |
| 5 | Spacing | ✗ | Section `py-4` vs design `pb-64 pt-48 px-64` header + `p-48` cards |
| 6 | Content present | ✓ | All 3 stats + heading + Forrester link + 3 descriptions all rendered |
| 7 | Affordance | ⚠ | Link `<a>` exists but no visible underline; not visually distinguished from body text |

**Score:** `1/7`. Section pass: ✗ (≥5/7 required).

## Gap categorization (this section)

- **Token-level:**
  - **🔥 `--color-brand-fuchsia` is mapped to lime green (`#b1fc5f`).** Should be raspberry `#e03b71`. **One-line fix in `packages/tokens/src/theme.css` — fixes every stat number across this and any other section using this token.** Highest single-fix leverage of any gap found so far.
  - `--color-secondary` recurring (Gray base vs Neutral base) — Section 1, 3, 4 all show this
  - `--text-h1` is 48px; design `Heading/H1` is 64px — same scale-misalignment pattern as Section 3's `--text-h2`
- **Primitive-level:**
  - `<Heading>` `weight` prop (Light 300) — recurring (Section 1, 3, 4)
  - The site's stat-number markup has BOTH `font-medium` and `font-light` classes — block-level tailwind class ordering ambiguity. Blocks emit conflicting classes; needs cleanup or a `<StatNumber>` primitive that consistently sets weight
- **Block-level (`block.statGrid`):**
  - Render 3-sided open-bottom outer border (`border-l border-r border-t #e8e8e8`)
  - Render bordered card row with per-card `border-l` dividers between cards
  - Apply `pb-64 pt-48 px-64` to header; `p-48` per card
  - Inline label "More trusted" sits next to "5x" — needs a `statGrid.items[].label` field (Heading/H5 style)
  - Right column of header is a paragraph with intermixed link — currently rendered as plain text. Block needs richText (or markdown) support in the header subheading slot, with link rendering correctly
- **Schema/content-level:**
  - Confirm `statGrid.items[].label` exists in schema (for "More trusted" inline labels alongside the number) — visible in design only on stat 2
  - Header subheading needs richText capability (for inline link)

## Notes / surprises

- **The `--color-brand-fuchsia` → lime green mapping is a smoking gun.** The token name and value disagree by 180° — fuchsia is a magenta-pink, lime is a yellow-green. Almost certainly a copy-paste error from the lime-green token line. Worth confirming the value at `packages/tokens/src/theme.css`. If it's just `--color-brand-fuchsia: #b1fc5f;`, swap to `#e03b71` and the stat numbers are correct in one line.
- **The block emits both `font-medium` and `font-light`** in the same class string. Tailwind doesn't auto-resolve conflicting class shortcuts; whichever appears later wins by CSS source order (or computed value). Either way it's a sign that the `<Heading>` primitive composes through both a default size (which carries weight) and a forced weight class — and the composition is unprincipled. Cleanup needed.
- **Design treats stats as Heading/H1** (the section's biggest text), demoting the actual section heading's role. The site reverses that — section heading is biggest. Worth a separate note: in this design, stat numbers carry the visual weight, not the section heading. Block should follow.
- "Read Forrester's report" link is rendered but invisible — same size, same color as surrounding text, no underline. Token-level link-style missing.
