# Platform — Section 9 — Tabbed Features (UseCases)

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7924:6144`
**Block type rendered:** `block.tabbedFeatures` (single virtual tab)
**Site URL:** `http://localhost:3000/new-project-platform` (scroll to ~y=4201px)
**Date measured:** `2026-04-25`
**Mirrors:** Homepage Section 9 (`block.tabbedUseCases` simplified)

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading (h2) | IBM Plex Sans | 30px | 400 | #0a0a0c | `text-h2 font-normal` |
| Card-title `<h3>` "Affiliate Lending" | IBM Plex Sans | 20px | 400 | #0a0a0c | `text-h4 font-normal` |
| Description `<p>` | IBM Plex Sans | 16px | 400 | rgba(31,41,55,0.8) | `text-body text-[var(--color-secondary)]` — **secondary token bug** |
| "By Industry" `<button>` | IBM Plex Sans | 14px | 500 | white on #0a0a0c | rounded-full pill — **rendered as a tab pill, not a panel-header** |
| Industry list items `<a>` (Financial Service, Insurance, Higher Education, Supply Chain Management) | IBM Plex Sans | 16px | 400 | #0a0a0c | `border-b border-[var(--color-surface-raised)]` |
| Section bg | — | — | — | transparent (body) | — |
| Section padding | — | 16px 0px | — | — | `relative py-4` |

Section bounds: `1920 × 408px`. ImageCount: 4 (SVG arrows + ph icons; **no featured photo, no logomark watermark**).

## Design (Figma) — measured via `get_design_context` on `7924:6144`

| Element | Family | Size | Weight | Color | Layout |
|---|---|---|---|---|---|
| Heading | IBM Plex Sans Light | 64px (Heading/H1) | 300 | #0a0a0c | leading-1.1, w-1368 |
| Section bg | — | — | — | white #ffffff | border #e8e8e8 outer (1496px wide) |
| Section padding | — | pb-64 pt-48 px-64 | — | — | Header pattern |
| Inner grid | — | — | — | — | border-t #e8e8e8 between header + grid; border-l #e8e8e8 between left+right cards |
| Left card padding | — | p-48 | — | — | gap-40 |
| "By Industry" panel-header | IBM Plex Sans Regular | 32px (Heading/H3) | 400 | #000000 | leading-1.3 |
| Industry items (4 rows) | IBM Plex Sans Regular | 24px (Heading/H4) | 400 | rgba(10,10,12,0.5) | border-b #e5e7ea, p-12, with size-32 arrow-right icon |
| Right-card image | — | — | — | photo (loan/medical) | h-369 with rounded-4, **size-64 logomark overlay bottom-right** (-translated +264x +309y) |
| Right-card title "Affiliate Lending" | IBM Plex Sans Regular | 24px (Heading/H4) | 400 | #0a0a0c | leading-1.3 |
| Right-card description | IBM Plex Sans Regular | 16px (Heading/H6) | 400 | #0a0a0c | leading-1.4, NOT secondary |
| Right card height | — | h-837 | — | — | image + title + body |

## Diff — site vs design

### Critical (visibly wrong, must fix)
| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| Heading size | 30px | 64px | -34px (≈54% short) | **Token** — `--text-h2` mapped to 30, design wants H1=64 |
| Heading weight | 400 Regular | 300 Light | wrong | **Primitive** — `<Heading>` no `weight` prop |
| "By Industry" panel-header | black-pill `<button>` 14px white | 32px Regular black panel-header | wrong primitive | **Block** — tabbedFeatures renders virtual-tab as Tab pill metaphor when design wants panel-header |
| Industry list items | 16px, no arrow icon, generic border | 24px, arrow-right size-32, border-b #e5e7ea, color rgba(10,10,12,0.5) | size + decorative + color all wrong | **Block** — list-item template needs new variant |
| Right-card featured image | absent | h-369 photo | missing | **Block + Schema** — featured-media slot not rendered |
| Logomark watermark (bottom-right of image) | absent | size-64 logomark image | missing | **Block** — decorative overlay not modeled |
| Card-title size | 20px (text-h4) | 24px (Heading/H4) | -4px | **Token** — text-h4 = 20 not 24; collision |
| Description color | rgba(31,41,55,0.8) `--color-secondary` | #0a0a0c primary | wrong | **Token** — secondary resolves to wrong base |
| Section bg + outer border | transparent / no border | white + border #e8e8e8 | missing | **Block** — chrome absent |
| Section padding | 16px 0 | pb-64 pt-48 px-64 + outer 1496px width | -48 / -32 | **Block** — `py-4` instead of designed padding |

### Secondary
| Element | Site | Design | Notes |
|---|---|---|---|
| Section bounds height | 408px | ~837px (right card alone) | rendered sec is roughly half-height because right-side photo absent |
| Industry items rendered as `<a>` | yes | yes (with arrow affordance) | semantic OK; affordance gap |

## Rubric scoring

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ⚠ | Header/grid/left+right pattern present; right-card photo block + logomark overlay missing; outer chrome absent |
| 2 | Typography — size | ✗ | Heading 30 vs 64; "By Industry" 14 vs 32; list 16 vs 24; card-title 20 vs 24 — every typography slot smaller than design |
| 3 | Typography — weight/family | ✗ | Heading 400 vs 300 Light; family ✓ |
| 4 | Color | ✗ | Description on `--color-secondary` resolves wrong; "By Industry" tab pill is black rather than transparent; industry-item text not muted |
| 5 | Spacing | ✗ | py-4 vs pb-64 pt-48 px-64; card padding likely thin too |
| 6 | Content present | ✗ | Featured image absent; logomark watermark absent; arrow-right icons on list items missing; 4/5 expected pieces missing |
| 7 | Affordance | ⚠ | Industry list rendered as `<a>` ✓; but no arrow chevrons → looks non-interactive; "tab pill" sets wrong expectation for a single-virtual-tab |

**Score:** `0/7` strict (`1/7` generous if "list items present at any size" counts for content). Section pass: ✗.

## Gap categorization

- **Token-level:** `--color-secondary` → wrong base (universal); `text-h{n}` collision (universal); no `--text-display-*` for 64px H1.
- **Primitive-level:** `<Heading>` needs `weight` prop + Display sizes; `<Tabs>` needs metaphor-correct variant (panel-header for single-virtual-tab vs pill for multi-tab); `<Heading>` needs `align="left"` reliably; list-item `<a>` template needs an arrow-right + muted-color variant.
- **Block-level:** `block.tabbedFeatures` needs (a) right-card featured-image slot, (b) logomark overlay decoration, (c) outer card chrome (border + bg-white + designed padding), (d) header-vs-card border-t separator, (e) panel-header alternative when single-tab.
- **Schema/content-level:** featured-image content not seeded; logomark image not seeded.

## Notes / surprises

- This section is the **simplest rendering of "tabs"** in the audit — single virtual tab, but the renderer still produces a `<button>` tab-pill labeled "By Industry" because the block treats it as a tab. Real design has it as a panel-header (32px Regular). **Tab-vs-panel decision is implicit on `tabs.length===1`.**
- Description color is `var(--color-secondary)` — but Figma spec uses `Light/Text/Muted: #0A0A0C` (full primary, not muted). Token is being used wrongly *and* base resolves wrongly; double miss.
- Industry-list color in design is `rgba(10,10,12,0.5)` (50% black), distinct from Homepage 9's tab-list which used full primary. Design token seems to be `Light/Text/Muted` at 50%, not present in current scale.
- `imageCount: 4` matches list-item arrow icons + plus icon; **zero featured photos**. Mirror of Homepage 9's image gap.
- Mirror of Homepage 9 confirmed: same recurring gaps (heading size + weight, secondary color, tabs metaphor, missing featured image, chrome). No new gap categories.
