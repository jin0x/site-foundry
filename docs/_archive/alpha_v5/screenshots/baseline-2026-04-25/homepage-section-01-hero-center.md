# Homepage — Section 1 — HeroCenter

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7876:38920`
**Block type rendered:** `block.heroCenter` (no bg-image extension yet — gap)
**Site URL:** `http://localhost:3000/new-project-homepage` (top of page, y≈0)
**Date measured:** `2026-04-25`

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading "Orchestrate instantly. Innovate endlessly." | IBM Plex Sans | 30px | 400 | `rgb(255, 255, 255)` | `<Heading size="h2">` `text-h2 font-normal` |
| Subheading paragraph | IBM Plex Sans | 20px | 400 | `rgba(31, 41, 55, 0.8)` | Gray/80 — `--color-secondary` miscarriage on inverse surface |
| CTA primary "Download eBook" | IBM Plex Sans | 16px | 500 | white on `rgb(0, 128, 255)` | Bright Blue 100 (`#0080ff`); rounded-full; padding `0 24px` |
| CTA secondary "Request a demo" | IBM Plex Sans | 16px | 500 | white on transparent | Ghost button; rounded-full; padding `0 24px` |
| Section bg | transparent | — | — | inherits from ancestor (body also transparent) | `<section class="relative overflow-hidden isolate min-h-[600px] flex items-center justify-center">` — no padding, no bg image |
| Section size | — | — | — | — | 1920 × 600px; padding `0px`; imageCount `0` (no bg) |

## Design (Figma) — measured via `get_design_context` on `7876:38920`

Tokens cited by the design context:
- `Heading/Small: IBM Plex Sans Light 80px / line-height 1 / letterSpacing 0`
- `Heading/H4: IBM Plex Sans Regular 24px / line-height 1.3 / letterSpacing 0`
- `Light/Text/Inverse: #FFFFFF`
- `Light/Background/Secondary: #00274D`
- `Light/Text/Default: #0A0A0C`
- `Light/Background/Default: #FFFFFF`
- `Light/Border/Default: #E8E8E8`

| Element | Family | Size | Weight | Color | Layout |
|---|---|---|---|---|---|
| Heading "Orchestrate instantly. Innovate endlessly." | IBM Plex Sans | **80px** | **300 (Light)** | `#FFFFFF` | width 1200px, line-height 1, centered, two lines via `<br>` |
| Subheading paragraph | IBM Plex Sans | **24px** | 400 (Regular) | `#FFFFFF` | max-width 700px, line-height 1.3, centered |
| CTA primary "Download eBook" | IBM Plex Sans | **14px** | **500 (Medium)** | white on **`#00274d` (navy)** | padding `14px 20px`, rectangular (no rounded-full) |
| CTA secondary "Request a demo" | IBM Plex Sans | **14px** | 400 (Regular) | **`#0a0a0c`** on **`#ffffff`** | border `1px solid #e8e8e8`, padding `14px 20px`, rectangular |
| Heading wrapper | — | — | — | — | drop-shadow `0 4px 30px black` (lifts text off photo) |
| Section padding | — | — | — | — | `px-[80px] py-[96px]` |
| Background layer | — | — | — | — | composed graphic: 1494×818 dark photo + diamond rotated 45° + 4×4 logo-pattern overlay (`Logo Option 3` × 16) + 20% opacity black tint over the entire image |

## Diff — site vs design

### Critical (visibly wrong, must fix)

| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| Heading size | 30px | 80px | +50px (+167%) | Primitive — `<Heading size="h2">` caps at 30px; design is `Heading/Small` (80px Light) — primitive cannot reach this |
| Heading weight | 400 | 300 (Light) | -1 weight step | Primitive — `<Heading>` has no `weight` prop (`--font-weight-light` exists in theme.css but not consumed) |
| Subheading color | Gray/80 (`#1f2937cc`) | `#FFFFFF` | wrong color family | Token — `--color-secondary` miscarried on inverse-tone hero. Same gap as Section 8. |
| Primary CTA bg | Bright Blue 100 (`#0080ff`) | Navy `#00274d` | wrong brand tier | Block / token — primary button defaults to Bright Blue; design uses Navy as primary on dark hero |
| Secondary CTA bg | transparent (ghost) | white `#ffffff` w/ border `#e8e8e8` | wrong treatment | Block — secondary button variant is "ghost" not "white-on-dark" |
| Background layer | absent (transparent) | dark photo + diamond mask + 4×4 logo-pattern overlay + 20% black tint | bg-image extension not built | Schema/block — `heroCenter` has `mediaPlacement` but no `mediaPlacement='background'`. Composed graphic should be one CMS-uploaded image (per principle 3) + tint overlay handled in block |
| Heading wrapper drop-shadow | none | `0 4px 30px black` | missing effect | Block — heroCenter doesn't apply drop-shadow on bg-image variants |
| Section padding | `0px` (flex centering only) | `px-80 py-96` | layout drift | Block — heroCenter centers but doesn't apply outer padding rules from design |

### Secondary (smaller drift)

| Element | Site | Design | Notes |
|---|---|---|---|
| Heading line-height | 38.1px (~1.27) | 80px (1.0) | Display headings shouldn't be 1.27 line-height |
| Subheading size | 20px | 24px | Within 1 enum step (Text xl → Display xs) — minor |
| Button padding | `0 24px` (rounded-full pill) | `14px 20px` (rectangular) | Different button system entirely; not just spacing |
| Button radius | rounded-full | rectangular (likely 0px) | Decision design uses rectangular CTAs, not pill |
| Button font size | 16px | 14px | Within tolerance, minor |

## Rubric scoring (this section)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ⚠ | Centered single-column ✓; full-bleed bg layer absent ✗; section padding missing |
| 2 | Typography — size | ✗ | Heading 30→80px is +167% — primitive cap; subheading 20→24 within 1 step (✓ on its own) |
| 3 | Typography — weight/family | ⚠ | Family ✓ (IBM Plex Sans both); heading weight 400 vs 300 ✗ |
| 4 | Color | ✗ | Sub Gray/80 vs white = `--color-secondary` miscarriage; primary CTA Bright Blue vs design Navy — wrong brand tier |
| 5 | Spacing | ✗ | Section pad `0` vs `px-80 py-96`; button pad `0 24` vs `14 20` |
| 6 | Content present | ⚠ | Headline + subhead + 2 CTAs ✓; background composed graphic not seeded (no `media` field on heroCenter for bg) |
| 7 | Affordance | ✓ | Both CTAs present, distinct ranks (primary + secondary), navigable |

**Score:** `1/7`. Section pass: ✗ (≥5/7 required).

## Gap categorization (this section)

- **Token-level:**
  - `--color-secondary` miscarried on inverse hero (recurring from Section 8) — needs `--color-on-inverse-secondary` semantic, OR block-level inverse-tone awareness
  - Button primary on inverse-tone hero should resolve to Navy (`Light/Background/Secondary: #00274D`), not Bright Blue — needs token semantic for "primary-on-photo-hero" or different button variant
- **Primitive-level:**
  - `<Heading>` needs Display sizes that reach 80px (`Heading/Small` token in design = 80px Light) — beyond Display 2xl=72px in canonical scale; either extend theme typography scale or treat 80 as a one-off composed-graphic heading size
  - `<Heading>` needs `weight` prop (Light 300) — same as Section 8
  - `<Button>` needs a "rectangular" variant (no rounded-full) — design uses rectangular CTAs throughout
  - `<Button>` needs a "white-on-dark" secondary variant (white bg, light border, dark text) distinct from current "ghost"
- **Block-level (`block.heroCenter`):**
  - `mediaPlacement='background'` variant: full-bleed bg image + 20% black tint overlay + drop-shadow on heading wrapper
  - When `mediaPlacement='background'`, the heading + subhead + CTAs become a centered overlay with `drop-shadow: 0 4px 30px black`
  - Apply `px-80 py-96` outer padding when bg-image variant active
- **Schema/content-level:**
  - `heroCenter.media` should be allowed at `mediaPlacement='background'` (currently below/inline only)
  - Seed the composed background image (photo + diamond + logo pattern + tint pre-flattened) as one CMS upload — per principle 3

## Notes / surprises

- The `Heading/Small` token in the design (80px IBM Plex Sans Light) is **NOT** in the canonical scale at `PROJECT_DESIGN_NODES.md` — that scale tops at Display 2xl = 72px. So either the design uses a hero-specific token that wasn't extracted, or the canonical extraction missed it. **Worth noting in aggregation: design system has a `Heading/Small` 80px token outside the Display scale.**
- Both CTAs on this hero are rectangular, not pill. The current Decisions design language across these two pages may be entirely rectangular CTAs — needs cross-section confirmation before declaring `<Button>` variant work.
- Design CTA primary uses Navy `#00274d` (Brand Dark Blue 100) on a dark photo background; the dark-on-dark works because the heading wrapper has a drop-shadow lifting it, and the photo has a 20% black tint reducing its dynamic range. Useful pattern.
