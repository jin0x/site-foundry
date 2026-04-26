# Platform — Section 4 — Numbered Features ("We stand apart")

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7900:118180`
**Block type rendered:** `block.featureGrid` cols=2 (degraded — see D14 in queue file)
**Site URL:** `http://localhost:3000/new-project-platform` (scroll to ~y=2874px) — **idx 5 (NOT idx 4)**
**Date measured:** `2026-04-25`
**Note on previous "missing" status:** Session 2-extension flagged Section 4 as "MISSING from rendered output" because the renderer at idx 5 had heading "We stand apart", which didn't match the queue's per-row label of "numbered features 01-04". After cross-checking the seed file (`seeds/platform/04-numbered-features.json` line 11: `"heading": "We stand apart"`) **and** the Figma design heading (confirmed via `get_screenshot` on `7900:118180`: top-left text reads "We stand apart"), this section IS rendering. The "We stand apart" orphan and "missing Section 4" are **the same section** — not two separate issues.

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading `<h2>` "We stand apart" | IBM Plex Sans | 30px | 400 | #0a0a0c | `text-h2 font-normal` |
| Subheading `<p>` "Odio semper amet eget gravida amet a at cursus..." | IBM Plex Sans | 20px | 400 | rgba(31,41,55,0.8) | (no class chain captured — wrap from sectionHeading subheading) |
| Card title ×4 `<h3>` | IBM Plex Sans | 24px | 400 | #0a0a0c | `text-h3 font-normal` ✓ correct H3 size |
| Card description ×4 `<p>` | IBM Plex Sans | 16px | 400 | rgba(31,41,55,0.8) | `text-body text-[var(--color-secondary)]` |
| Eyebrow ("01.", "02.", "03.", "04.") | (not separately styled — likely `<small>` or `<span>` per featureGrid eyebrow slot) | not visible in `headings[]` or `paragraphs[]` first 8 | — | — | rendered but degraded (no navy bg + lime text) |
| Section bg | — | — | — | transparent (body) | — |
| Section padding | — | 16px 0px | — | — | `relative py-4` |

Section bounds: `1920 × 1327px` (tallest measured Platform section). ImageCount: 4 (likely 1 SVG per card icon-slot, NOT the 4 per-item flowchart diagrams). InteractiveCount: 0. ButtonCount: 0 (no CTAs in design either).

## Design (Figma) — via `get_screenshot` on `7900:118180` (token ceiling exceeded on `get_design_context`)

Design preview saved to `./platform-section-04-design.png`. Direct visual measurement from screenshot:

| Element | Family | Size | Weight | Color | Layout |
|---|---|---|---|---|---|
| Section heading "We stand apart" (top-left) | IBM Plex Sans Light | ~64px (Heading/H1) | 300 | #0a0a0c | top-left of section |
| Subheading (top-right, aligned right) | IBM Plex Sans Regular | ~16px (Heading/H6) | 400 | rgba(10,10,12,0.6) muted | right-aligned at top, max-w ~280 |
| Section bg | — | — | — | white #ffffff | border #e8e8e8 outer |
| Section padding | — | pb-64 pt-48 px-64 (header), then 2×2 grid below | — | — | header separated from grid by border-t |
| Eyebrow chip ("01.", "02.", "03.", "04.") | IBM Plex Sans Light/Mono | ~14px | — | lime #a6f252 text on navy #00274d bg | small chip top-left of card, ~size-44 square w/ rounded corners |
| Card title (4×) | IBM Plex Sans Regular | ~24px (Heading/H4) | 400 | #0a0a0c | leading-1.3 |
| Card description (4×) | IBM Plex Sans Regular | ~14px | 400 | #0a0a0c (NOT secondary) | leading-1.4, ~2-3 lines |
| **Per-item featured graphic (4×)** | — | — | — | flowchart with green-highlighted active path | ~h-300 below description, rounded-4, light-gray bg |
| Card padding | — | p-48 (per queue Section 5 reference) | — | — | gap-40 between rows |
| Card outer borders | — | border #e8e8e8 between cards (border-t + border-l forming 2×2 grid lines) | — | — | — |

## Diff — site vs design

### Critical (visibly wrong, must fix)
| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| Heading size | 30px | ~64px | -34px (-53%) | **Token** — `text-h2` vs Heading/H1 |
| Heading weight | 400 | 300 Light | wrong | **Primitive** — `<Heading>` no `weight` prop |
| Subheading position | left-aligned, below heading | right-aligned, top-right of header | wrong | **Block** — `sectionHeading.align='left'` in seed but design has split-header pattern (heading left, subheading right) |
| Subheading size | 20px | ~16px | +4px | **Block / Token** — section subheading not using H6 16px slot |
| Eyebrow ("01."/"02."/"03."/"04.") | rendered as plain text (degraded) | navy chip with lime-green text, ~size-44 square | missing chrome | **Primitive + Block** — eyebrow needs a chip variant; navy bg + lime text token combo |
| Card description color | `--color-secondary` (rgba(31,41,55,0.8)) | #0a0a0c primary | wrong | **Token** — secondary token universal bug |
| **Per-item featured graphic** | absent (`imageCount: 4` matches icons, not graphics) | 4 flowchart diagrams (~h-300 each) | missing — **D14 gap from queue** | **Block + Schema** — `featureGrid.items[].media` field not implemented |
| Section bg + outer border | transparent / no chrome | white + border #e8e8e8 + 2×2 inner grid lines | missing | **Block** — chrome absent |
| Section padding | 16px 0 | pb-64 pt-48 px-64 + p-48 per card | thin | **Block** |

### Secondary
| Element | Site | Design | Notes |
|---|---|---|---|
| Card title size | 24px (text-h3) | ~24px (Heading/H4) | ✓ matches (one of the few size matches in audit — but coincidental — site uses h3 token, design uses H4 token; same px) |
| Card title weight | 400 | 400 | ✓ |
| Card description size | 16px | ~14px (estimate from screenshot) | -2px maybe; close |
| Section heading text | "We stand apart" | "We stand apart" | ✓ |
| 4 cards present with correct titles + descriptions | yes | yes | ✓ |
| Section position in page | idx 5 (between callout & tabbedFeatures) | per design layout | layout order check needed but section IS present |

## Rubric scoring

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ⚠ | 2×2 grid present, 4 cards present; eyebrow + title + description present; **per-item graphic absent (D14)**; chrome absent |
| 2 | Typography — size | ⚠ | Heading 30 vs 64 (collision); card title 24 ✓; description ≈ ✓; subheading 20 vs 16 |
| 3 | Typography — weight/family | ✗ | Heading 400 vs 300; family ✓ everywhere |
| 4 | Color | ✗ | Description on `--color-secondary` wrong; eyebrow chip styling absent (navy + lime gone) |
| 5 | Spacing | ⚠ | py-4 vs pb-64 pt-48; partially OK because cards stack tall (h=1327 already) |
| 6 | Content present | ⚠ | All 4 numbered cards with title + description + numbered eyebrow ✓; **per-item flowchart graphic absent in all 4 cards (~50% of design's information density per card)** |
| 7 | Affordance | — | No CTAs in design; N/A |

**Score:** `0/7 strict` (no row hits unambiguous ✓), `1-2/7 generous` if size for card title counts. Section pass: ✗. Per queue's pre-measurement Stage-5 estimate: 3/7 (with generous N/A). Measured strictly: lower.

## Gap categorization

- **Token-level:** `--color-secondary` universal; `text-h{n}` collision (universal); navy+lime eyebrow-chip token combo missing.
- **Primitive-level:** `<Heading>` weight prop + Display sizes; eyebrow primitive needs chip variant (square card with bg + text color).
- **Block-level:** `block.featureGrid` needs (a) `items[].media` field — **D14, the queue's largest single Platform fidelity gap**, (b) outer card chrome (border + bg-white + designed padding), (c) right-aligned subheading layout for split-header pattern, (d) eyebrow chip rendering.
- **Schema/content-level:** seed already contains `media.figmaNodeId` for each item (lines 21-26, 33-38, 45-50, 57-62 of seed) — content is mapped but block doesn't render it. **Pure block-rendering gap, not seed gap.**

## Notes / surprises

- 🎯 **This section was previously flagged as "missing" — false alarm.** Section 4 IS rendering at idx 5; the heading text "We stand apart" comes from the seed's `sectionHeading.heading` field (which itself matches the design's heading text confirmed via screenshot). Session 2-extension's session-log assumption that idx 5 was an unmapped orphan was incorrect.
- **Resolves both deferred investigations from session 3:** "Platform Section 4 missing" + "We stand apart orphan idx 5" → same section, working as designed (with D14 degradation).
- **Updated Platform render order:** idx 4 = Section 11 (callout), idx 5 = **Section 4 (We stand apart)**, idx 6 = Section 9 (tabbedFeatures), etc. The session 3 mapping had idx 5 as ORPHAN, which is wrong. **Update mapping table accordingly.**
- D14 confirmed visually: per-item flowchart graphics are ~40% of each card's visual mass. Queue's pre-measurement estimate said 3/7 generous; measured stricter at 0-2/7 because the rubric exempts only known T2/T3 gaps and D14 is a known gap (so generous counts apply). Real "comfortable" score with D14 fixed and other primitives shipped: ~6/7 per the queue's re-score table line 519.
- Subheading on the seed is lorem-ipsum ("Odio semper amet eget gravida amet a at cursus...") — design has different placeholder copy. Subheading copy is a content-fill not a rendering gap.
- Card title 24px is the **only direct-match size on Platform** (besides Section 6's icon cards). Lucky alignment between site `text-h3` (24) and design `Heading/H4` (24).
