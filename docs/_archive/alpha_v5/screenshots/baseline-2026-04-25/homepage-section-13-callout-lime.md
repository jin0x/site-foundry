# Homepage — Section 13 — Callout (lime accent)

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7876:58620`
**Block type rendered:** `block.callout` (queue earmarked `tone='accent'` lime variant)
**Site URL:** `http://localhost:3000/new-project-homepage` (scroll to ~y=2714px; renderedIdx=6)
**Date measured:** `2026-04-25`

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading "Ready to explore the platform?" | IBM Plex Sans | **30px** | 400 | `rgb(10,10,12)` (default dark) | `<h2 class="text-h2 font-normal">` |
| Description paragraph | IBM Plex Sans | 16px | 400 | `rgba(31,41,55,0.8)` (Gray/80, `--color-secondary`) | `text-body text-[var(--color-secondary)] max-w-2xl` |
| "Schedule a demo" CTA | IBM Plex Sans | 16px | 500 | text `rgb(10,10,12)`, **bg `rgb(0,128,255)` (Bright Blue), rounded-full pill** | `<a>` link |
| Logomark decoration (44px brand glyph above heading) | — | — | — | — | **Absent** (`imageCount: 0`) |
| Section bg | **transparent** | — | — | — | **No lime green bg!** Section reads as plain white callout |
| Section bounds | — | — | — | — | h=504px (close to design ~504px ✓ on size, but visually empty without bg) |
| Section padding | — | — | — | — | `py-32` (128px top/bottom) — first section in audit with substantial vertical padding |

## Design (Figma) — measured via drill-in

(Source: `mcp__figma__get_design_context` on nodeId `7876:58620`)

| Element | Family | Size | Weight | Color | Layout |
|---|---|---|---|---|---|
| Section wrapper | — | — | — | **bg `#a6f252` (Light/Text/Primary — lime green)** | `flex flex-col items-center isolate` full-width |
| Inner Grid | — | — | — | — | `flex-col gap-32 items-center pb-64 pt-80 px-64`, z-2 |
| Decorative logomark (Decisions glyph) | — | — | — | (Navy on lime) | 44px centered above heading, rounded-488px container |
| Heading "Ready to explore the platform?" | IBM Plex Sans | **64px** | **300 (Light)** | `#00274d` (Navy / Light/Background/Secondary) | line-height 1.1, w-1200, **centered** |
| Description | IBM Plex Sans | **18px** | 400 | `#00274d` (Navy) | line-height 1.4, max-w-500, centered |
| "Schedule a demo" CTA | IBM Plex Sans | **14px** | 400 | text white, **bg `#00274d` (Navy)** | **rectangular** `px-20 py-14` |

## Diff — site vs design

### Critical (visibly broken, must fix)

| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| **Section background color** | transparent | **`#a6f252`** (lime green) | **dominant visual gap** | block.callout's `tone='accent'` either not seeded OR not implemented; lime bg is the section's defining feature |
| Heading size | 30px | **64px** | -34px (-53%) | recurring primitive cap |
| Heading weight | 400 | **300 (Light)** | -1 step | recurring primitive `weight` gap |
| Heading color | `#0a0a0c` (dark default) | `#00274d` (Navy) | wrong color | site renders against transparent bg → uses default dark text; design wants Navy text on lime bg. If section bg fix lands, text color also needs to swap to Navy. |
| Description size | 16px | **18px** | -2px (-11%) | recurring `text-body=16` vs `Heading/H5=18` |
| Description color | Gray/80 (`--color-secondary`) | `#00274d` (Navy) | wrong color family | recurring `--color-secondary` miscarriage; should be Navy on lime |
| CTA button shape | rounded-full pill | **rectangular** `px-20 py-14` | shape | recurring rectangular variant gap |
| CTA button color | bg Bright Blue `rgb(0,128,255)` | bg `#00274d` (Navy) | wrong color | recurring Navy-fill variant gap |
| CTA button text size | 16px | **14px** | +2px | recurring (button text 14px design vs 16px site) |
| Decorative logomark above heading | absent | 44px Decisions glyph centered | content gap | block.callout has no logo/icon slot, OR seed lacks it |

### Secondary

| Element | Site | Design | Notes |
|---|---|---|---|
| Section padding | `py-32` (128px) | `pt-80 pb-64 px-64` | site padding is symmetric 128/128; design is asymmetric 80/64 + 64 horizontal. Closer than other sections but still off. |
| Centered layout | likely present | centered ✓ | block.callout typically centers; assume it does |
| Section bounds height | 504px | ~504px | matches at the bounds level — block reserves the right vertical space, just paints the wrong background and content |

## Rubric scoring (this section)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ✓ | centered callout layout present; section bounds match design height |
| 2 | Typography — size | ✗ | heading -53%; description -11%; button text +2px |
| 3 | Typography — weight/family | ⚠ | family ✓; main-heading weight ✗ |
| 4 | Color | ✗ | **section bg lime missing** (dominant); heading default dark vs Navy; description Gray/80 vs Navy; button Bright Blue vs Navy |
| 5 | Spacing | ⚠ | py-32 close to design's 80/64 asymmetric padding; section reserves correct height |
| 6 | Content present | ⚠ | heading + description + CTA present; **decorative logomark absent** |
| 7 | Affordance | ⚠ | CTA clickable; visual treatment wrong (shape + color) |

**Score:** `1/7` (only layout structure passes cleanly). Section pass: ✗.

## Gap categorization (this section)

- **Token-level:**
  - `Light/Text/Primary: #a6f252` is the **lime green accent** color. It's named "Text/Primary" in the design — a misleading token name (it's actually used as section bg here, not text). Either rename to `--color-accent-lime` semantically or apply as-is. **The token IS in the design system; the gap is the block doesn't apply it as bg.**
  - All text on lime-bg sections needs to flip to `#00274d` (Navy). Implies a tone-aware text-color binding similar to the inverse-on-navy pattern — but for `accent` tone instead.
- **Primitive-level:**
  - `<Heading>` Light 300 + Display 64px (recurring; this is now the 12th section depending on it).
  - `<Button>` rectangular + Navy variant (recurring; lots of design CTAs are this style).
- **Block-level (`block.callout` extend):**
  - Add `tone='accent'` variant: section bg = lime green `#a6f252`, text colors = Navy `#00274d`.
  - Add decorative logo/glyph slot (centered 44px) above heading.
  - When `tone='accent'`, button defaults to Navy fill (matches design's most common CTA-on-accent pattern).
- **Schema/content-level:**
  - Set `tone: 'accent'` on this callout block in the seed.
  - Add `logo` field for the decorative brand glyph (or hardcode if always-on for accent variant).

## Notes / surprises

- **The simplest section measured so far, but the dominant gap is unmistakable.** The entire lime green background is missing. Remove the lime bg from the design and you have a generic centered CTA — which is exactly what's rendered. The section's whole identity comes from the bg color.
- **Section bounds height matches** (504px on both site and design) — the block reserves correct vertical space. With just the bg color + decorative logomark + Navy CTA + Light 300 heading, this section would jump from 1/7 to ~6/7 with concentrated effort. **Highest leverage-per-fix of any Homepage section measured.**
- **The token name `Light/Text/Primary: #a6f252` is misleading.** It's the lime accent color, used as bg here. Worth renaming to `--color-accent-lime` (or add a semantic alias) when ingesting tokens — otherwise future devs will assume it's a text color.
- **First section with substantial vertical padding** (`py-32` = 128px). Other sections used `py-4`/16px. The block.callout has a different default padding profile; might be where to look for how to make padding configurable per block tone.
- **`--color-secondary` miscarriage extends to accent-toned sections too.** This token is wrong on inverse, light, and now accent surfaces. Confirms it's broken at the resolution level, not just specific to surface tones.
