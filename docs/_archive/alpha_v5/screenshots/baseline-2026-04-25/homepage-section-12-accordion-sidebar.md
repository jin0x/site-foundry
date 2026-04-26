# Homepage — Section 12 — Accordion + sidebar

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7876:58478`
**Block type rendered:** likely `block.accordion` with sidebar slot OR two pageBuilder blocks (callout + accordion) — queue flagged ambiguity
**Site URL:** `http://localhost:3000/new-project-homepage` (scroll to ~y=6568px; renderedIdx=11)
**Date measured:** `2026-04-25`

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading "Questions? We've got answers." | IBM Plex Sans | **30px** | 400 | `rgb(10,10,12)` | `<h3 class="text-h2 font-normal">` — tag/class mismatch (h3 tag with text-h2 cls); single-tone, no split-color |
| Support card "Need help?" | IBM Plex Sans | 16px | 400 | `rgb(10,10,12)` | `text-body text-[var(--color-primary)]` ✓ matches design |
| Support card description | IBM Plex Sans | **14px** | 400 | Gray/80 (`--color-secondary`) | `text-small text-[var(--color-secondary)]` |
| "Chat with support" CTA | IBM Plex Sans | 16px | 500 | text `rgb(10,10,12)`, **bg `rgb(0,128,255)` (Bright Blue), rounded-full pill** | `<a>` link |
| 5 accordion item headers | IBM Plex Sans | 16px | **500 (Medium)** | `rgb(10,10,12)` | `<button class="flex w-full ... px-5 py-5 text-left">` |
| Section bg | transparent | — | — | — | no white bg, no `#e8e8e8` border |
| Section bounds | — | — | — | — | h=510px (close match to design's ~530px) |
| Section padding | — | — | — | — | `py-4` (16px) |
| `imageCount: 5` | | | | | likely 1 avatar + 4 plus icons (1 accordion open) |

## Design (Figma) — measured via drill-in

(Source: `mcp__figma__get_design_context` on nodeId `7876:58478`)

| Element | Family | Size | Weight | Color | Layout |
|---|---|---|---|---|---|
| Section wrapper | — | — | — | bg white, border `#e8e8e8` | `flex row items-start full-width` |
| **LEFT (sidebar)** | — | — | — | — | `flex-col max-w-600 p-64 w-600 self-stretch justify-between` |
| Heading L1 "Questions?" | IBM Plex Sans | **48px** | **300 (Light)** | `#0a0a0c` | line-height 1.1 |
| Heading L2 "We've got answers." | IBM Plex Sans | **48px** | **300 (Light)** | `rgba(10,10,12,0.6)` (Neutral 60%) | line-height 1.1, **split-color** (second line muted) |
| Support card | — | — | — | bg `#fafafa`, border `#e8e8e8` | `flex-col gap-16 p-20 w-220` |
| · Avatar (40px circle) | — | — | — | photo | rounded-454px (full circle) |
| · Green status dot indicator | — | — | — | — | 10px, top-right of avatar at offset (29px,0) |
| · "Need help?" | IBM Plex Sans | 16px | 400 | `#0a0a0c` | line-height 1.4 |
| · Support description | **Degular Demo** | **12px** | 400 | `rgba(10,10,12,0.6)` | line-height 1.6 — **different font family** |
| · "Chat with support" CTA | IBM Plex Sans | 14px | 400 | text white, **bg `#00274d` (Navy)** | **rectangular** `px-20 py-14`, full-width of card |
| 1px divider line | — | — | — | bg `#e8e8e8` | full-height between left and right |
| **RIGHT (accordion)** | — | — | — | — | `flex-1 flex-col items-start min-w-px` |
| Accordion item 1 (open) | — | — | — | header bg `#fafafa` | `border-t #e8e8e8`, `flex justify-between p-32` |
| · Header text | IBM Plex Sans | **18px** | 400 | `#0a0a0c` | line-height 1.4 |
| · ph:plus icon (open state) | — | — | — | — | 16px |
| · Content body | IBM Plex Sans | **16px** | 400 | `rgba(10,10,12,0.6)` | bg white, `border-t #e8e8e8`, `p-32` |
| Accordion items 2–5 (collapsed) | — | — | — | header bg white | `border-t #e8e8e8`, header `p-32`; `ph:plus` icon |

## Diff — site vs design

### Critical (visibly broken, must fix)

| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| Heading size | 30px | **48px** | -18px (-37%) | recurring token-name collision (site `--text-h2=30` vs design Heading/H2=48) |
| Heading weight | 400 | **300 (Light)** | -1 step | recurring primitive `weight` gap |
| Heading split-color treatment | single tone (all `#0a0a0c`) | **first phrase `#0a0a0c`, second phrase 60% muted** | content / styling | block accepts plain text; can't split tone within single heading |
| Heading tag | `<h3>` (with `text-h2` class) | rendered as `<p>` styled as h2-rank | semantic | minor (a11y) |
| Support card avatar | possibly absent or no status dot | 40px photo circle + 10px green status dot at top-right | content gap | block doesn't render dot indicator; avatar unclear |
| Support card description font family | IBM Plex Sans | **Degular Demo** | wrong family | site doesn't have Degular Demo loaded; design uses `Text/XSmall` token (12px Degular Demo Regular) |
| Support card description size | 14px | **12px** | +2px | block uses `text-small=14`; design uses Text/XSmall=12 |
| Support card description color | Gray/80 (`--color-secondary`) | rgba(10,10,12,0.6) (Neutral 60%) | wrong family | recurring `--color-secondary` miscarriage |
| "Chat with support" button shape | rounded-full pill | **rectangular** `px-20 py-14` | shape | recurring rectangular variant gap |
| "Chat with support" button color | bg Bright Blue `rgb(0,128,255)` | bg `#00274d` (Navy) | wrong color | recurring Navy-fill variant gap |
| "Chat with support" button text size | 16px | **14px** | +2px | recurring (button text 14px design vs 16px site) |
| Accordion header text size | 16px (Medium) | **18px** (Regular) | -2px (-11%) | block uses `text-body=16` Medium; design uses Heading/H5=18 Regular |
| Accordion header text weight | 500 (Medium) | **400 (Regular)** | +1 step | block bolds the header; design keeps it Regular |
| Accordion open-state header bg | unknown / likely transparent | **`#fafafa`** (Light/Background/Muted) | active-state visual | block doesn't apply "active" bg to open accordion header |
| Section bg + border | transparent / none | white bg + `#e8e8e8` border | recurring (7+ sections) | |
| Section padding | `py-4` (16px) | `p-64` left col, `p-32` accordion headers | recurring (8+ sections) | |

### Secondary

| Element | Site | Design | Notes |
|---|---|---|---|
| Sidebar split-row layout | present (sidebar exists left, accordion right) ✓ | same | block does support 2-column layout already |
| Support card chrome (bg #fafafa + border) | likely present (block renders it) | same | matches design (best-matching support-card render so far) |
| Support card width | unknown | 220px | check via screenshot |
| Section bounds height | 510px | ~530px | nearest-match size of any section so far |
| Accordion content body styling | unknown (only first item open; content below it not in paragraph slice) | 16px Regular `rgba(10,10,12,0.6)`, p-32, bg white, border-t | likely mostly matches; verify via screenshot |

## Rubric scoring (this section)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ✓ | sidebar-left + accordion-right split-row pattern present; 5 accordion items present; first item open by default ✓ |
| 2 | Typography — size | ✗ | heading -37%; accordion header -11%; support description +2px |
| 3 | Typography — weight/family | ⚠ | heading weight ✗; accordion-header weight ✗ (Medium vs Regular); support-description **font family wrong** (IBM Plex Sans vs Degular Demo) |
| 4 | Color | ⚠ | most colors close; support description `--color-secondary` miscarriage; accordion open-state bg likely missing; CTA color wrong |
| 5 | Spacing | ✗ | section padding wrong; left col p-64 missing; accordion headers p-32 likely missing |
| 6 | Content present | ⚠ | heading split-tone absent; avatar status dot likely absent; otherwise all questions, answers, support card present |
| 7 | Affordance | ⚠ | accordion buttons clickable; CTA clickable; visual treatment wrong (button shape/color); active-state on open accordion missing |

**Score:** `1/7` (only layout structure passes cleanly). Section pass: ✗.

## Gap categorization (this section)

- **Token-level:**
  - **`Text/XSmall: 12px Degular Demo Regular line-height 1.6`** is a NEW typography token that's not yet in `theme.css`. The site doesn't have Degular Demo as a loaded font — this is a font-loading gap as well. Design uses Degular Demo for "Text/XSmall" elements (e.g. support card descriptions, fine-print labels).
  - `Light/Background/Muted: #fafafa` is in tokens; just needs application to accordion open-state header.
- **Primitive-level:**
  - `<Heading>` Light 300 (recurring).
  - `<Heading size="h2">` should resolve to 48px (recurring token-name collision).
  - `<Heading>` two-tone span support: ability to split tone within a single heading. (E.g. `<Heading>Questions? <span tone="muted">We've got answers.</span></Heading>` or accept structured content.)
  - `<Button>` rectangular variant + Navy variant (recurring).
  - `<Accordion>` primitive: open-state header gets bg `#fafafa`; header text 18px Regular (not 16px Medium).
  - **Need to load Degular Demo font** in the site OR pick a fallback (the description on support-card is the only known use of Degular Demo; if we accept IBM Plex Sans there, that's a design-team call).
- **Block-level (`block.accordion` + sidebar slot, OR keep as 2 pageBuilder blocks):**
  - Sidebar slot in accordion block (current structure). Sidebar contains heading + support card. Layout: 600px left col with p-64.
  - Accordion item open-state styling: bg `#fafafa` on header.
  - Avatar status-dot rendering: 10px green dot positioned at top-right of avatar circle.
  - Support card width 220px, p-20, gap-16; CTA full-width within card.
- **Schema/content-level:**
  - Heading split-tone may need a structured-content schema (or block-level prop like `headingSecondaryText` styled muted).
  - Avatar status dot color is green — could be tokenized as `--color-status-online: #b1fc5f`-something or hardcoded `#22c55e`. Verify via design.

## Notes / surprises

- **Best layout match yet.** Section 12 has the closest layout to design of any section measured. Sidebar-left + accordion-right split-row pattern is rendered correctly; 5 accordion items present, first one open by default. Section bounds (510px) closely match design (~530px). The block has the right *shape*; gaps are typography sizes, button styling, and a few decorative elements.
- **Support card structure is mostly correct.** "Need help?" + description + CTA stack matches design at the data level. Visual offenses are: avatar status dot missing, description font family wrong (Degular Demo not loaded), CTA wrong color/shape.
- **Degular Demo font is a new gap.** Five sections in, this is the first time a non-IBM-Plex-Sans font has been measured. Design uses Degular Demo for Text/XSmall (12px). Either:
  - (a) Load Degular Demo as a webfont and use it for `text-xsmall`,
  - (b) Accept IBM Plex Sans as a fallback and accept a small fidelity loss on Text/XSmall,
  - (c) Discover that another design system already has a Text/XSmall in IBM Plex Sans 12px and the Degular Demo usage is unintended drift in this single component.
  - Worth a designer check before loading a new webfont.
- **Heading two-tone treatment is recurring** — Section 1's hero, Section 5's compound section heading, and Section 12's "Questions? We've got answers." all use a tone-split within a single heading. Design system pattern; primitive doesn't yet support it.
- **Accordion header weight is heavier than design.** Site renders Medium 500 vs design Regular 400. Subtle but visually overweight.
- **The `<h3>` tag with `text-h2` class** is curious — semantic mismatch. The block's `<Heading>` primitive may be passing the wrong heading level when text-h2 sizing is requested. Worth checking the primitive's implementation.
