# Homepage — Section 11 — Testimonials carousel

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7876:58358`
**Block type rendered:** `block.testimonials` (carousel mode + video item type — major extend)
**Site URL:** `http://localhost:3000/new-project-homepage` (scroll to ~y=4910px; renderedIdx=9)
**Date measured:** `2026-04-25`

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading "Trusted by organizations solving dynamic problems." | IBM Plex Sans | **30px** | 400 | `rgb(10,10,12)` | `<h2 class="text-h2 font-normal">` |
| Card 1 author / category | IBM Plex Sans | 16px / 14px | 400 / 400 | `rgb(10,10,12)` / Gray/80 | "Operations Leader" / "Interview" — appears generic, not MidFirst-Bank-specific |
| Card 2 author / title | IBM Plex Sans | 16px / 14px | 400 / 400 | `rgb(10,10,12)` / Gray/80 | "Paul Jones" / "IT, Pantheon" — text correct |
| Card 3 quote | IBM Plex Sans | **24px** | 400 | `rgb(10,10,12)` | `text-h3 text-[var(--color-primary)]` — dark text (should be white on navy) |
| Card 3 author / title | IBM Plex Sans | 16px / 14px | 400 / 400 | `rgb(10,10,12)` / Gray/80 | "Henry Espinosa" / "City of Miami Parking Authority" |
| Play-button buttons | — | — | — | — | 2× `<button class="absolute inset-0 ... group">` ✓ affordance present |
| Dot indicators | — | — | — | — | **3** dots (`w-2 h-2 rounded-full`) — 1 active (`var(--color-primary)` solid), 2 inactive (`var(--color-secondary)` opacity-40) |
| Section bg | transparent | — | — | — | no white bg, no `#e8e8e8` border on outer section |
| Section bounds | — | — | — | — | h=992px (~design's 1000px; closest match yet on bounds) |
| Section padding | — | — | — | — | `py-4` (16px) |
| `imageCount: 2` | | | | | **only 2 of 3 cards seem to have imagery**; brand-logo overlays, photo backgrounds, dots SVG, logomark watermark all likely absent |

## Design (Figma) — measured via drill-in

(Source: `mcp__figma__get_design_context` on nodeId `7876:58358`)

| Element | Family | Size | Weight | Color | Layout |
|---|---|---|---|---|---|
| Section wrapper | — | — | — | bg white, border `#e8e8e8` | `flex flex-col items-start` |
| Header | — | — | — | — | `pb-64 pt-48 px-64 gap-48` |
| Heading | IBM Plex Sans | **64px** | **300 (Light)** | `#0a0a0c` | line-height 1.1, max-w-[1368px] |
| Carousel | — | — | — | overflow-clip | `flex gap-40 h-660 items-center justify-center w-full`, child cards w-720 each |
| **Card 1 (video — MidFirst Bank)** | — | — | — | photo bg + `linear-gradient(132deg, rgba(0,0,0,0.9), rgba(0,0,0,0))` overlay (mix-blend-multiply) | `flex-col h-661 w-720 p-64 rounded-4` |
| · MidFirst Bank logo | — | — | — | white | `h-29 w-225` at top |
| · Play button | — | — | — | — | 75px, bottom-right (offset 258px,246px from center) |
| · Author | IBM Plex Sans | **24px** | 400 | white `#ffffff` | line-height 1.3 — "Darris Hampton" |
| · Author title | IBM Plex Sans | **18px** | 400 | `rgba(255,255,255,0.7)` | line-height 1.4 — "MidFirst Bank" |
| **Card 2 (video — Pantheon)** | — | — | — | photo bg + same gradient overlay | same shape |
| · Pantheon logo | — | — | — | — | h-23 w-188 at top |
| · Author | IBM Plex Sans | 24px | 400 | white | "Paul Jones" |
| · Author title | IBM Plex Sans | 18px | 400 | white/70 | "IT, Pantheon" |
| **Card 3 (quote — Miami Parking Authority)** | — | — | — | bg `#00274d` (Navy), no photo | same shape |
| · Logomark watermark | — | — | — | — | 732px brand-diamond glyph, rotated, centered |
| · Quote text | IBM Plex Sans | **32px** | 400 | white | line-height 1.3, "Based on our experience…" |
| · MPA logo | — | — | — | — | 61×61 circle |
| · Author | IBM Plex Sans | 24px | 400 | white | "Henry Espinosa" |
| · Author title | IBM Plex Sans | 18px | 400 | white/70 | "City of Miami Parking Authority" |
| Dots indicator | — | — | — | — | 88×10 SVG (likely 4 dots), bottom of carousel section |

## Diff — site vs design

### Critical (visibly broken, must fix)

| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| Heading size | 30px | **64px** | -34px (-53%) | recurring primitive cap |
| Heading weight | 400 | **300 (Light)** | -1 step | recurring primitive `weight` gap |
| Card photo backgrounds (cards 1, 2) | **likely absent** (`imageCount: 2` total) | full-bleed photo per card with mix-blend-multiply gradient overlay | content gap | block.testimonials has no photo-bg per-item slot, OR seed lacks media URL |
| Card 3 navy background | absent (text appears on white) | bg `#00274d` (Navy) | structural | block doesn't apply navy bg for quote-type items |
| Card 3 quote text color | `rgb(10,10,12)` (dark) | **white `#ffffff`** | wrong tone | block doesn't flip text color for quote-type cards |
| Card 3 quote text size | 24px (`text-h3`) | **32px** | -8px (-25%) | block uses h3 (24); design wants larger quote-emphasis size |
| Card 3 logomark watermark | absent | 732px brand-glyph rotated, centered | decorative gap | quote item has no decorative slot |
| Card 1 — author "Darris Hampton" / brand "MidFirst Bank" | rendered as "Operations Leader" / "Interview" (generic) | "Darris Hampton" / "MidFirst Bank" | content gap | seed missing real author / brand for first card; falls back to category placeholder |
| Card 1/2 brand-logo overlays (MidFirst Bank, Pantheon) | absent | `imgMidfirstBank` (h-29 w-225) and `imgOriginalE64...` (h-23 w-188) | content gap | per-card brand-logo asset slot missing |
| Author name size (cards 1, 2) | 16px (`text-body`) | **24px** (Heading/H4) | -8px (-33%) | block uses generic body size for author |
| Author title size (cards 1, 2) | 14px (`text-small`) | **18px** (Heading/H5) | -4px (-22%) | block uses small for title |
| Author title color (cards 1, 2) | Gray/80 (`--color-secondary`, dark) | white/70 | wrong tone | should flip to white-with-opacity on dark/photo bg |
| Author name color (cards 1, 2) | `rgb(10,10,12)` (`--color-primary`, dark) | white | wrong tone | should flip to white on dark/photo bg |
| Dot indicator count | 3 dots | **4 dots** (per imgDots 88×10) | item count off | carousel knows 3 items; design has 4 |
| Section bg + outer border | transparent / none | white bg + `#e8e8e8` border | recurring | (6+ sections) |
| Section padding | `py-4` (16px) | `pb-64 pt-48 px-64` heading | recurring | |

### Secondary

| Element | Site | Design | Notes |
|---|---|---|---|
| Carousel autoscroll / behavior | unknown (didn't test) | queue mentions "auto-scroll" + "carousel" | likely needs JS implementation |
| Card spacing (gap-40 between) | unknown | 40px | check via screenshot |
| Card rounded-4 corners | unknown | rounded-4 (4px) | check via screenshot |
| Dot active indicator color | `var(--color-primary)` rgb(10,10,12) | unknown (rendered in SVG) | may match by accident, may not |

## Rubric scoring (this section)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ⚠ | carousel container exists; 3 cards rendered (vs 4 in design); play-button affordance ✓; dot indicators ✓; per-card chrome (photo bg, navy bg, watermark) absent |
| 2 | Typography — size | ✗ | heading -53%; author -33%; author-title -22%; quote text -25% |
| 3 | Typography — weight/family | ⚠ | family ✓; main-heading weight ✗ |
| 4 | Color | ✗ | tone-flip not applied to video/quote cards (text stays dark; should be white-on-navy/photo); `--color-secondary` author-title miscarriage |
| 5 | Spacing | ✗ | section padding wrong; card inner padding unknown likely wrong |
| 6 | Content present | ✗ | photo backgrounds absent; navy bg absent; brand-logo overlays absent; logomark watermark absent; 1st-card author content wrong (generic placeholder vs real seed) |
| 7 | Affordance | ✓ | play buttons + dot indicators rendered and clickable |

**Score:** `1/7` (only affordance passes cleanly). Section pass: ✗.

## Gap categorization (this section)

- **Token-level:**
  - `Light/Background/Secondary = #00274d` (Navy) — already in tokens; just needs to be applied to quote-type testimonial card.
  - `Light/Text/Inverse Muted = white at 70%` — likely needs an `--color-text-inverse-muted: rgba(255,255,255,0.7)` semantic token. Not currently a named role.
- **Primitive-level:**
  - `<Heading>` Light 300 + Display 64px (recurring).
- **Block-level (`block.testimonials` major extend):**
  - **Add `item.kind: 'video' | 'quote'` discriminator** with different visual treatments:
    - `video`: full-bleed photo bg + mix-blend gradient overlay + brand-logo top-left + play button bottom-right + author/title at bottom-left in white text.
    - `quote`: navy bg + giant rotated logomark watermark + quote text 32px + author with brand circle logo at bottom.
  - Carousel mode (currently appears to render as static row): horizontal scroll OR snap-on-arrows; queue mentions auto-scroll + dot indicators.
  - Per-item brand-logo image slot (top-left of card).
  - Tone-aware text-color logic (cards 1, 2 white text; card 3 white text; on dark bgs always).
  - Increase author/title type sizes per design (24/18 not 16/14).
- **Schema/content-level:**
  - Per-item: `kind`, `media` (photo for video / null for quote), `brandLogo` (per-item logo asset), `videoUrl` (mp4 / hosted video link), `quoteText` (for quote items).
  - **Card 1's seed appears wrong**: rendering "Operations Leader" / "Interview" instead of "Darris Hampton" / "MidFirst Bank". Either seed is using placeholder data for testimonial[0], or the block's first card is hardcoded to something else. Verify and fix.
  - Add 4th testimonial item (design shows 4 dots; site has 3).

## Notes / surprises

- **First card seed mismatch is suspicious.** The block renders "Operations Leader" / "Interview" instead of the design's "Darris Hampton" / "MidFirst Bank". This could be:
  - (a) Block is hardcoding sample data for testimonial[0]
  - (b) Seed schema has wrong field mapping (e.g. `category` field used as author)
  - (c) Real seed data exists but is being suppressed in favor of a placeholder default
  - Worth a Sanity Studio check to confirm what's seeded.
- **The block IS rendering 3 cards with proper affordances** — play buttons are present, dot indicators are present and one is active. The carousel infrastructure exists. The gap is entirely in (a) per-card visual treatments, (b) image content, (c) text content for card 1.
- **Card 3 (quote) is the most jarring** — rendering 24px dark text on white bg where design has 32px white text on navy bg with a giant brand-glyph watermark. The visual hierarchy is completely flat in render.
- **Section bounds height is the closest match yet** (992px vs design's ~1000px). Carousel reserves correct vertical space — it's just visually empty inside.
- **Author/title size = 24/18 (design) vs 16/14 (site)** is yet another instance of the heading-token-collision: the site's `text-body=16` and `text-small=14` are smaller than the design's H4=24 and H5=18 used for these author-credit roles. Treating "author/title" as small text instead of heading-rank elements.
