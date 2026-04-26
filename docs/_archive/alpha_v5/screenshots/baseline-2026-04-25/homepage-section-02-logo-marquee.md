# Homepage — Section 2 — LogoMarquee

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7876:38958`
**Block type rendered:** `block.logoMarquee` (always animates — gap: no `static` mode)
**Site URL:** `http://localhost:3000/new-project-homepage` (y≈600px)
**Date measured:** `2026-04-25`

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading "Trusted by organizations running complex, high-stakes operations." | IBM Plex Sans | 30px | 400 | `rgb(10, 10, 12)` (full black) | `<Heading size="h2">` — promoted to true heading role |
| Logos | — | — | — | — | imageCount = 14 (7 logos × 2 = duplicated for infinite-scroll marquee) |
| Section bg | transparent | — | — | — | `<section class="relative py-16">` — no card bg, no border |
| Section padding | — | — | — | — | `64px 0px` (py-16, px-0) |

## Design (Figma) — measured via `get_design_context` on `7876:38958`

Tokens cited:
- `Heading/H6: IBM Plex Sans Regular 16px / line-height 1.4 / letterSpacing 0`
- `Light/Text/Muted: #0A0A0C` (used at 60% opacity per inline `text-[rgba(10,10,12,0.6)]`)
- `Light/Background/Default: #FFFFFF`
- `Light/Border/Default: #E8E8E8`

| Element | Family | Size | Weight | Color | Layout |
|---|---|---|---|---|---|
| Intro text "Trusted by organizations running complex, high-stakes operations." | IBM Plex Sans | **16px** | 400 (Regular) | `rgba(10, 10, 12, 0.6)` | TEXT/CAPTION role (not heading); `whitespace-pre`, line-height 1.4, two `<p>` lines |
| Logos | — | — | — | — | **7 logos, STATIC, flex-row, gap-40px** between logos; each in `p-8` wrapper |
| Card container | — | — | — | `#FFFFFF` bg | `border-b border-l border-r border-[#e8e8e8] border-solid` (3-sided open-top border) |
| Card padding | — | — | — | — | `p-48` (48px all sides) |
| Layout — text vs logos | — | — | — | — | flex row, gap 128px between text and logos column; text on LEFT, logos on RIGHT |
| Logo images | — | — | — | — | Coca-Cola (57×21), Genentech (87×32), Bridgestone (99×21), Sony Music (107×34), UVA (55×36), Corning (95×14), Lockheed Martin (85×36) |

## Diff — site vs design

### Critical (visibly wrong, must fix)

| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| Intro text role | `<h2>` 30px heading | `<p>` 16px caption | wrong primitive | Block — `logoMarquee.title` field maps to a Heading; should map to `<Text size="md" muted>` (intro-caption role) |
| Intro text size | 30px | 16px | -14px (-47%) | downstream of role miss |
| Intro text color | `rgb(10,10,12)` (full black) | `rgba(10,10,12,0.6)` (60%) | wrong opacity | downstream — Text muted variant would naturally produce 60% opacity |
| Layout — animation | scrolling marquee (14 imgs, duplicated for infinite scroll) | **static flex-row, 7 logos** | wrong mode | Block — `logoMarquee.speed='none'` / `static=true` mode missing (gap recurring per Sections 2 & R2) |
| Container bg + border | transparent, no border | `#fff` bg + `border-b/l/r #e8e8e8` (3-sided open-top) | missing card chrome | Block — `logoMarquee` doesn't expose a card-container wrapper variant |
| Layout — text+logos relation | likely full-width centered, text-above-row | flex row, text-left + logos-right, gap 128px | wrong shape | Block — `logoMarquee` arranges text above scroll; needs side-by-side layout option |

### Secondary (smaller drift)

| Element | Site | Design | Notes |
|---|---|---|---|
| Section padding | `64px 0` | container `p-48` | Different containment model — design wraps in card, site uses page padding |
| Logos | 14 (duplicated) | 7 (static set) | Same source images; 14 vs 7 is the marquee duplication artifact |

## Rubric scoring (this section)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ✗ | Animated marquee vs static flex-row; missing card container; missing 3-sided border |
| 2 | Typography — size | ✗ | h2 30px vs caption 16px — wrong primitive used (heading vs text) |
| 3 | Typography — weight/family | ✓ | IBM Plex Sans 400 both |
| 4 | Color | ⚠ | Both `#0a0a0c` family; site uses 100% opacity vs design 60% — token applied; opacity step missing |
| 5 | Spacing | ⚠ | Site `py-16` flat; design `p-48` card + `gap-128` between cols — apples-vs-oranges due to layout shape difference |
| 6 | Content present | ✓ | Intro text + 7 logos all rendered (extra 7 are marquee duplicates) |
| 7 | Affordance | ✓ | Non-interactive section by design; no affordance regression |

**Score:** `3/7`. Section pass: ✗ (≥5/7 required).

## Gap categorization (this section)

- **Token-level:**
  - No new token gaps — both `Light/Text/Muted` and `Light/Border/Default` are in canonical scale
  - Need: a `Text muted` variant (or equivalent) that consistently produces 60%-black on white surface
- **Primitive-level:**
  - `<Text>` needs a `muted` boolean prop (or `tone="muted"` enum) producing `rgba(10,10,12,0.6)` — recurring across many caption/intro contexts
- **Block-level (`block.logoMarquee`):**
  - `mode='static'` (or `speed='none'`) variant — recurring gap (also Platform Section 2)
  - `layout='inline'` (text-left + logos-right side-by-side) variant
  - Container card option: white bg + 3-sided open-top border, `p-48`
  - Map intro text to `<Text>` not `<Heading>` — the intro is a caption, not a section title
- **Schema/content-level:**
  - 7 logos seeded ✓ (already in pageBuilder)
  - No additional schema fields needed if the block surfaces the layout/mode toggles described above

## Notes / surprises

- **Big role mismatch:** the site treats the "Trusted by..." copy as an h2 section heading; the design treats it as a small caption/intro adjacent to the logo row. This is the same primitive that the block schema named `title` — but the design uses it as `description`-style copy. **A frequent pattern to watch:** the field name in the schema (`title`) drives the block to use `<Heading>` even when the design's role is captionic.
- The 14 vs 7 image count is the cleanest signal that the marquee duplicates source images for infinite-scroll. Useful as a screenshot-free detector that "this block is in marquee mode when it shouldn't be."
- Card container with 3-sided border (open-top) is a specific design pattern that recurs — worth flagging if it appears on Platform too.
