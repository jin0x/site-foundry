# Homepage — Section 6 — VideoContent

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7876:42408`
**Block type rendered:** `block.videoContent` (or stub thereof — see Notes)
**Site URL:** `http://localhost:3000/new-project-homepage` (scroll to ~y=3218px; renderedIdx=7)
**Date measured:** `2026-04-25`

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading "Lorem ipsum dor sit amet." | IBM Plex Sans | **30px** | **400** | `rgb(10, 10, 12)` | `<h2 class="font-heading text-h2 font-normal">`; left-aligned (no `text-center`) |
| Caption "Placeholder video testimonial…" | IBM Plex Sans | 14px | 400 | `rgba(31, 41, 55, 0.8)` (Gray/80) | `text-small text-[var(--color-secondary)] max-w-2xl text-center` — uses secondary token |
| CTA / play button | — | — | — | — | **Absent** (`buttons:[]`, `interactiveCount:0`) |
| Section bg | transparent | — | — | inherits body | No white bg, no `#e8e8e8` border |
| Section padding | — | — | — | — | `16px 0px` (`py-4`) — block has no inner padding |

`imageCount: 2` — likely 2 SVGs in section but none functional (no play overlay, no thumbnail image). Section height **1170px** (significant — but mostly empty space because block stub doesn't render image/play/overlay).

## Design (Figma) — measured via drill-in

(Source: `mcp__figma__get_design_context` on nodeId `7876:42408`)

| Element | Family | Size | Weight | Color | Layout |
|---|---|---|---|---|---|
| Heading "Lorem ipsum dor sit amet." | IBM Plex Sans | **64px** | **300 (Light)** | `#0a0a0c` | Centered, `max-w-[800px]`, line-height 1.1 |
| Section "Pricing" wrapper | — | — | — | bg `#FFFFFF`, border `#e8e8e8` | `pb-64 pt-48 px-64`, `flex flex-col items-start justify-center` |
| Header inner | — | — | — | — | `gap-48 items-center justify-center` |
| Section "Testimonials" wrapper (image+overlay) | — | — | — | bg `#FFFFFF` | `h-[841.5px]`, contains: |
| · Background photo (library/books) | — | — | — | — | `imgHeader` covers, full-section bg, scale-up |
| · Play button | — | — | — | — | `132px × 132px` centered |
| · Diamond logomark overlay | — | — | — | — | `1506px × 1506px` centered, `-scale-y-100 rotate-180`, decorative pointer-events-none |

Total design height: ~48 + heading-line + 64 + 48-gap + 841 + 64 = ~1100px (close to rendered 1170px height — rendered is just empty space).

## Diff — site vs design

### Critical (visibly broken, must fix)

| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| Heading size | 30px | **64px** | +34px (+113%) | `<Heading size="h2">` resolves to `--text-h2: 30px`. Design uses 64px (Heading/H1 token). Primitive Display-scale gap (cross-section pattern). |
| Heading weight | 400 | **300 (Light)** | -1 step | `<Heading>` has no `weight` prop. (Recurring across sections 1, 3, 4, 5, 8.) |
| Heading alignment | left (default) | **centered** | layout shape | block.videoContent doesn't apply `text-center` / center-align to heading. Schema may lack alignment. |
| Video thumbnail image | **absent** | full-bleed library photo (`imgHeader`) | content gap | `videoContent.media` schema probably populated as placeholder; React doesn't render media (or seed missing). |
| Play button overlay | **absent** | 132×132 centered SVG | content gap | Block doesn't render play overlay element. |
| Diamond logomark overlay | **absent** | 1506×1506 brand diamond pattern (rotated) | content gap | Decorative overlay not rendered. |
| Section bg + border | transparent / no border | white bg + `#e8e8e8` 1px border | structural | Block doesn't apply outer card chrome. (Recurring with section 4, 5.) |
| Section padding | `py-4` (16px) | `pb-64 pt-48 px-64` | -48–64px | (Recurring across sections 1, 3, 4, 5.) |

### Secondary (small drift, fixable cosmetic)

| Element | Site | Design | Notes |
|---|---|---|---|
| Caption paragraph | rendered (placeholder text) | not in design | block emits a description below the heading; design has heading-only above the media. Either drop in seed or remove from block. |

## Rubric scoring (this section)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ✗ | left-aligned heading vs centered; missing image+overlay+play; missing card chrome |
| 2 | Typography — size | ✗ | 30px vs 64px (113% miss) — primitive size cap |
| 3 | Typography — weight/family | ⚠ | family ✓ (IBM Plex Sans), weight ✗ (400 vs 300) |
| 4 | Color | ✓ | heading color matches (`#0a0a0c`); body bg ok |
| 5 | Spacing | ✗ | `py-4` block padding vs `pt-48 pb-64 px-64`; gap-48 missing between heading and media |
| 6 | Content present | ✗ | video thumbnail, play button, diamond overlay all absent (3 of 4 visual elements missing) |
| 7 | Affordance | ✗ | no clickable play button, no video element. Inline-player behavior described in queue not implementable without media |

**Score:** `1/7`. Section pass: ✗ (≥5/7 = pass).

## Gap categorization (this section)

- **Token-level:** none new for this section (heading size/weight gaps use cross-section pattern; secondary-color caption uses already-flagged `--color-secondary` Gray/80 fallback).
- **Primitive-level:**
  - `<Heading>` Display-scale sizes (Display lg, 64px) — recurring across sections 1, 3, 4, 5, 6.
  - `<Heading>` `weight` prop — recurring (5 sections so far).
- **Block-level (`block.videoContent` — NEW block):**
  - Render `media` slot (image thumbnail, full-bleed within inner Section).
  - Render play button overlay (centered, 132px), with `onClick` to trigger inline player.
  - Render diamond/logomark decorative overlay (large rotated SVG, full-bleed, pointer-events-none).
  - Apply outer card chrome: `bg-white border border-[#e8e8e8]`.
  - Center-align heading and apply `pt-48 pb-64 px-64` outer padding.
  - Remove (or hide when empty) the auto-emitted caption paragraph below heading — design has no caption.
- **Schema/content-level:**
  - Seed `videoContent.media` with library/books-style thumbnail (or designer-supplied photo) + final MP4 video URL.
  - Seed (or schema-add) the diamond/logomark overlay asset (likely a brand-system decorative).
  - Remove or repurpose the placeholder description "Placeholder video testimonial — designer will supply the MP4 source and final thumbnail." — currently leaks into UI.

## Notes / surprises

- **Block is essentially stubbed.** `videoContent` block renders heading + a placeholder caption only. None of the visual mass (thumbnail, play button, brand-pattern overlay) is implemented in JSX. The 1170px section height is empty space — block reserves space without filling it.
- **Heading-only above-the-fold rendering invariably uses `text-h2` 30px regardless of design intent.** Five sections in a row have wanted 48–80px hero/display headings and gotten the 30px h2 default. This is almost certainly the single-highest-leverage fix in the audit. Display-scale sizes on `<Heading>` would benefit ≥6 of 13 Homepage sections measured so far.
- **Placeholder copy leaking into UI.** The "Placeholder video testimonial — designer will supply…" caption is dev-facing copy that has shipped into the rendered page as user-facing text. Distinct from a content gap — this is a content **leak** that needs a guard in the block (don't render description if it begins with "Placeholder"; or remove from seed).
- **`text-center` on caption + left heading is an internal contradiction** — the block attempts centering on the description but not the heading. Either both should center (matching design) or the caption shouldn't exist.
