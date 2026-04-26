# Platform — Section 1 — HeroCenter (background image)

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7900:116212`
**Block type rendered:** `block.heroCenter` with `mediaPlacement='background'`
**Site URL:** `http://localhost:3000/new-project-platform` (scroll to ~y=0px; renderedIdx=0)
**Date measured:** `2026-04-25`

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading "The agentic orchestration platform that simplifies complexity." | IBM Plex Sans | **30px** | 400 | `rgb(255,255,255)` (white) | `<h2 class="text-h2 font-normal">` |
| Description paragraph | IBM Plex Sans | **24px** (`text-h3`) | 400 | `oklab(... / 0.9)` (white at 90% opacity) | `text-h3 max-w-2xl text-white/90` — **first section to use `text-h3` for a description** instead of `text-body` |
| "Request a demo" CTA | IBM Plex Sans | 16px | 500 | text white, **bg `rgb(250,250,250)` (~white) rounded-full pill** | `<a>` link |
| Section bg | transparent (block-level) | — | — | inherits | `sectionCls: "relative overflow-hidden isolate min-h-[600px] flex items-center justify-center"` — hero treatment via `min-h` + `isolate` |
| Section bounds | — | — | — | — | h=600px (matches design's px-80 py-96 footprint) |
| Section padding | — | — | — | — | `0px` (the `min-h` + flex centering does the work; padding is on inner Grid) |
| `imageCount: 0` | | | | | bg image likely renders via CSS `background-image` rather than `<img>` element (would not be counted) — visual confirmation needed via screenshot |

## Design (Figma) — measured via drill-in

(Source: `mcp__figma__get_design_context` on nodeId `7900:116212`)

| Element | Family | Size | Weight | Color | Layout |
|---|---|---|---|---|---|
| Section wrapper (Grid) | — | — | — | (relies on bg image) | `flex flex-col gap-32 items-center justify-center px-80 py-96 size-full` |
| Background image (logistics/trucks photo) | — | — | — | — | 1516×867, absolutely positioned, centered (`-translate-x-1/2 -translate-y-1/2`), `object-cover`, `pointer-events-none` |
| Heading "The agentic orchestration platform…" | IBM Plex Sans | **64px** | **300 (Light)** | `#fafafa` (Dark/Text/Default) | line-height 1.1, w-1090, **centered** |
| Description | **Degular Demo** | **18px** | 400 | `#fafafa` (white) | line-height 1.6, max-w-700, centered — `Text/Medium` token |
| "Request a demo" CTA | IBM Plex Sans | **14px** | 400 | text `#0a0a0c`, **bg white, border `#e8e8e8`** | **rectangular** `px-20 py-14` |

## Diff — site vs design

### Critical (visibly broken, must fix)

| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| Heading size | 30px | **64px** | -34px (-53%) | recurring primitive cap (now confirmed across 13 sections) |
| Heading weight | 400 | **300 (Light)** | -1 step | recurring primitive `weight` gap |
| Description font family | IBM Plex Sans | **Degular Demo** | wrong family | **2nd section to flag Degular Demo gap** (Section 12 was first at Text/XSmall 12px); here Text/Medium 18px |
| Description size | 24px (`text-h3`) | **18px** | +6px (+33%) | site oversized — uses `text-h3` for description (24); design uses `Text/Medium` token (18) |
| Description color | white/90 (oklab opacity) | `#fafafa` (Dark/Text/Default) | minor | both render as ~off-white; oklab is Tailwind's 90% white; close enough to be ⚠ not ✗ |
| CTA button shape | rounded-full pill | **rectangular** `px-20 py-14` | shape | recurring rectangular variant gap |
| CTA button border | absent (just bg) | `border #e8e8e8` | border missing | block doesn't render outline border on white CTA |
| CTA button text size | 16px | **14px** | +2px | recurring (button text 14px design vs 16px site) |
| CTA button text color | white | `#0a0a0c` (dark) | wrong color | site CTA reads "white text on white bg" — practically invisible? Need screenshot to confirm |
| Background image visibility | `imageCount: 0` (no `<img>` element) | full-section logistics photo | needs verification | likely renders via CSS bg-image; if it doesn't render at all, this is a content-level gap |

### Secondary

| Element | Site | Design | Notes |
|---|---|---|---|
| Section bounds height | 600px | ~600px (px-80 py-96 ≈ 192px padding + content ~~408 = 600) | matches at bounds level ✓ |
| Centered content | ✓ (flex items-center justify-center) | ✓ | layout primitive correct |
| Description max-width | max-w-2xl (≈672px) | max-w-700 | close (672 vs 700) |

## Rubric scoring (this section)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ✓ | hero shape with min-h and centered content present; section bounds match design |
| 2 | Typography — size | ✗ | heading -53%; description +33% (oversized!); button text +2px |
| 3 | Typography — weight/family | ✗ | heading weight ✗ (400 vs 300); **description font family ✗ (IBM Plex Sans vs Degular Demo)** |
| 4 | Color | ⚠ | heading white ✓; description white/90 close to #fafafa; CTA text color likely wrong (white-on-white?) |
| 5 | Spacing | ⚠ | section bounds match (600px); inner gap-32 unknown; padding unknown |
| 6 | Content present | ⚠ | heading + description + CTA present; bg image presence unconfirmed (likely renders via CSS) |
| 7 | Affordance | ⚠ | CTA clickable; visual treatment wrong (shape, border, text color) |

**Score:** `1/7` (only layout structure passes cleanly). Section pass: ✗.

## Gap categorization (this section)

- **Token-level:**
  - **`Text/Medium: 18px Degular Demo Regular line-height 1.6`** — NEW typography token. Used here for the hero description. Same Degular Demo font dependency as Section 12's `Text/XSmall: 12px`. Need to:
    - Load Degular Demo as a webfont, OR
    - Pick a fallback (IBM Plex Sans 18px is a reasonable approximation but loses brand voice)
  - Both `Text/Medium` and `Text/XSmall` use Degular Demo. Worth checking if `Text/Large` etc. exist with same family — could be a parallel scale.
- **Primitive-level:**
  - `<Heading>` Light 300 + Display 64px (recurring; this is now ~13 sections deep on this gap).
  - `<Button>` rectangular variant + outline-border variant (recurring).
- **Block-level (`block.heroCenter` + bg media mode):**
  - Description should use a `<Text>` primitive bound to `Text/Medium` token, NOT `<Heading size="h3">`. Currently the block escalates description to h3 (24px) presumably to make it readable on hero — but at the cost of family + weight fidelity.
  - CTA on hero-bg should default to white outline + dark text (per design). When CTA's `variant='primary'` on a dark/photo bg, current rendering produces white-on-white text.
- **Schema/content-level:**
  - Verify bg image is seeded and rendering. If `imageCount: 0` is real (not just CSS rendering bypass), the photo is missing — would explain why section reads "fine" without bg gap acknowledgment.

## Notes / surprises

- **First Platform section. The `text-h3` description trick is interesting.** This is the first measured section where the description uses `text-h3` (24px) instead of `text-body` (16). Block.heroCenter has likely been built with the intention of "make descriptions bigger on hero" — but it overshoots design's `Text/Medium` 18px Degular Demo. Two-step error: (1) wrong size by +6px, (2) wrong font family.
- **CTA text color is likely wrong**. Site renders `text white on bg white/250,250,250` — that's white-on-white, near-invisible. Design has `#0a0a0c` text on white bg. The `<Button>` primitive may be inheriting tone from the hero-bg context (which is dark/photo) rather than the button's own bg. Bug.
- **Degular Demo confirmed as a real token, not Section-12 anomaly.** Both `Text/XSmall` (12px) and `Text/Medium` (18px) use Degular Demo. The token system likely has a Degular Demo scale parallel to the IBM Plex Sans heading scale — Heading/H1-H6 in IBM Plex Sans, Text/XSmall+Small+Medium+Large in Degular Demo. Confirm with designer or by inspecting more sections.
- **Hero treatment IS using `min-h-[600px]` + `isolate` + flex centering** — the section structure is right. The visual gaps are typography + button + (possibly) bg image. This is similar to Homepage Section 1 (also a hero) which scored 1/7 for the same reasons. Pattern: hero blocks have correct layout but max-out at 1/7 due to typography ceilings.
- **Section bounds match design (600px)** — second section after Homepage 12 to have right-on-target section height. Hero blocks reserve correct vertical space; the visual gaps are within the box, not in the box's size.
