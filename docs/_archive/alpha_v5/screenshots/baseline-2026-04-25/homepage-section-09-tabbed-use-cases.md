# Homepage — Section 9 — TabbedUseCases

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7876:58184`
**Block type rendered:** likely `block.tabbedFeatures` adapted (queue earmarked NEW `block.tabbedUseCases`)
**Site URL:** `http://localhost:3000/new-project-homepage` (scroll to ~y=4388px; renderedIdx=8)
**Date measured:** `2026-04-25`

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading "Decisions handles hundreds…" | IBM Plex Sans | **30px** | 400 | `rgb(10,10,12)` | `<h2 class="text-h2 font-normal">` |
| h3 caption title "Lorem ipsum dolor sit amet consectetur." | IBM Plex Sans | **20px** (`text-h4`) | 400 | `rgb(10,10,12)` | this is the right-side image-overlay caption title (renders but at h4 size, not h3 visual rank) |
| Tab "By Industry" (active) | IBM Plex Sans | **14px** | 500 | text white, **bg `rgb(10,10,12)` (black) — `rounded-full` pill** | `<button>` |
| Tab "By Initiative" (inactive) | IBM Plex Sans | 14px | 500 | text `rgba(31,41,55,0.6)`, transparent bg | `<button>` |
| Tab "By Ecosystem" (inactive) | IBM Plex Sans | 14px | 500 | text `rgba(31,41,55,0.6)`, transparent bg | `<button>` |
| Active "By Industry" header (above list) | — | — | — | — | **Absent** (not in headings) |
| Industry row "Financial Service" | IBM Plex Sans | 16px | 400 | `rgb(10,10,12)` | `<a>` link, `border-b border-[var(--color-surface-raised)]`, `py-3` |
| (5 of 6 rows confirmed; 6th "Public Sector" likely truncated by slice) | | | | | |
| Caption description (in glass card?) | IBM Plex Sans | 16px | 400 | `rgba(31,41,55,0.8)` (`--color-secondary`) | `text-body text-[var(--color-secondary)]` |
| Section bg | transparent | — | — | — | no white bg, no `#e8e8e8` border on outer section |
| Section padding | — | — | — | — | `py-4` (16px) |
| Section bounds | — | — | — | — | h=521.5px (design right-card alone is 836px — render is half-height) |
| `imageCount` | — | — | — | — | 6 (likely arrow SVGs on each row + maybe featured img) |

## Design (Figma) — measured via drill-in

(Source: `mcp__figma__get_design_context` on nodeId `7876:58184`)

| Element | Family | Size | Weight | Color | Layout |
|---|---|---|---|---|---|
| Section wrapper | — | — | — | bg white, border `#e8e8e8` | `flex flex-col items-start` |
| Header (heading area) | — | — | — | — | `pb-64 pt-48 px-64`, `gap-48` |
| Heading "Decisions handles hundreds…" | IBM Plex Sans | **64px** | **300 (Light)** | `#0a0a0c` | line-height 1.1, max-w-[1368px] |
| Grid (left + right card row, `border-t #e8e8e8`) | — | — | — | — | `flex flex-row items-start` full-width |
| **LEFT CARD** | — | — | — | — | `flex-1 p-48 gap-32` |
| · Tab row | — | — | — | — | 3 inline tab cells `w-160 p-12`, gap by spread |
| · Tab "By Industry" (active) | IBM Plex Sans | **18px** | 400 (Regular) | text `#0080ff` (Light/Text/Blue), **underline** via `Line267` 4px-thick | text only, no bg |
| · Tab "By Initiative" / "By Ecosystem" (inactive) | IBM Plex Sans | 18px | 400 | text `rgba(10,10,12,0.6)` | text only, transparent |
| · Tab divider line below all tabs | — | — | — | bg `#e8e8e8` (or similar light gray) | `Line266` full-width 1px |
| · Active section header "By Industry" | IBM Plex Sans | **32px** | 400 (Regular) | `#0a0a0c` | line-height 1.3, on its own row above list |
| · Industry list row (e.g. "Financial Service") | IBM Plex Sans | **24px** | 400 | text `rgba(10,10,12,0.6)` (inactive) or `#0a0a0c` (active "Healthcare") | `flex justify-between p-12 border-b #e5e7ea` |
| · Right-arrow icon per row | — | — | — | — | 32px square, `ph:arrow-right` |
| · 6 industries: Financial Service / Insurance / Higher Education / Manufacturing / **Healthcare** (active) / Public Sector | | | | | |
| **RIGHT CARD** | — | — | — | — | `flex-1 p-48 h-836px border-l #e8e8e8` |
| · Featured image (`imgIcon`, Healthcare scene) | — | — | — | — | h-740, rounded-4, full-bleed within card |
| · Logomark watermark | — | — | — | — | 64px, rotated, bottom-right (264px right, 308px down from center) |
| · Frosted-glass caption card overlay | — | — | — | bg `linear-gradient(268deg, rgba(255,255,255,0.11), rgba(255,255,255,0))`, **`backdrop-blur-45`** | `h-220 p-30`, bottom-left of image, w-260 |
| · Caption title | IBM Plex Sans | **24px** | 400 | `#ffffff` | line-height 1.3 |
| · Caption description | IBM Plex Sans | **16px** | 400 | `#f9fafb` (Grey/50) | line-height 1.4 |

## Diff — site vs design

### Critical (visibly broken, must fix)

| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| Heading size | 30px | **64px** | -34px (-53%) | recurring primitive cap (sections 1, 3, 4, 5, 6, 9) |
| Heading weight | 400 | **300 (Light)** | -1 step | recurring primitive `weight` gap |
| Tab visual metaphor | **rounded-full BLACK pill** (active = #0a0a0c bg, white text) | **underlined text tab** (active = `#0080ff` text, 4px blue underline) | wrong metaphor entirely | block uses generic Tabs primitive's pill style; needs `variant="underline"` or inline-tabs variant |
| Tab text size | 14px | **18px** | -4px | tab labels use small text; design uses Heading/H5 (18px) |
| "By Industry" panel header | **absent** | 32px Regular header above the list | content gap | block doesn't render an active-tab header inside the panel |
| Industry row text size | 16px | **24px** (Heading/H4) | -8px (-33%) | block uses default body size (16); design wants Heading/H4 |
| Section bounds height | 521px | **836px+ minimum** (right card h-836) | -38% | block omits the featured-image right card, OR right card collapses without media |
| Featured image (Healthcare scene) | **likely absent** | `imgIcon` h-740 full-bleed, rounded-4 | content gap | media slot not seeded; block may not render `items[].featuredImage` |
| Frosted-glass caption overlay | text rendered (caption title + desc) but **without glass effect** | `backdrop-blur-45 + linear-gradient` overlay floating bottom-left | layer gap | block doesn't render the glass card; just emits caption text outside the image context |
| Caption title size | 20px (`text-h4`) | **24px** | -4px | block uses h4 (20); design wants 24 (Heading/H4 token, but h4 token resolves to 20 in theme) |
| Logomark watermark | absent | 64px rotated, bottom-right of image | decorative gap | brand watermark element not rendered |
| Tab underline indicator | absent | active tab has 4px-thick `#0080ff` underline | layer gap | block tabs use pill bg instead of bottom-border indicator |
| Section bg + outer border | transparent / no border | white bg + `#e8e8e8` border | structural | recurring (sections 4, 5, 6, 7, 9) |
| Section padding | `py-4` (16px) | `pb-64 pt-48 px-64` heading area; right card `p-48` | recurring | (5 sections deep) |

### Secondary

| Element | Site | Design | Notes |
|---|---|---|---|
| Industry list row borders | `var(--color-surface-raised)` | `#e5e7ea` (Grey/200) | Grey/200 not yet tokenized; rendered border may be slightly wrong tone |
| Active industry indication | unknown (didn't capture which row is "active" in render) | bold `#0a0a0c` (vs muted `rgba(10,10,12,0.6)` for inactive) | block may default first-item-active rather than honoring seed |
| 6th industry "Public Sector" | possibly truncated by `.slice(0,8)` in measurement; may be present | rendered as 6th row | re-measure if needed; not a real gap |

## Rubric scoring (this section)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ⚠ | left list + right image-card pattern present; right card content (image + glass overlay + watermark) absent; "By Industry" panel header missing |
| 2 | Typography — size | ✗ | heading -53%; industry rows -33%; caption title -17%; tab text -22% |
| 3 | Typography — weight/family | ⚠ | family ✓; main-heading weight ✗ (400 vs 300) |
| 4 | Color | ⚠ | most colors close; tab active-color is wrong (black pill vs blue text); caption description uses `--color-secondary` Gray/80 fallback |
| 5 | Spacing | ✗ | section padding wrong; gap-32/48 missing in heading area |
| 6 | Content present | ✗ | featured image, glass caption overlay, logomark watermark, "By Industry" panel header all absent |
| 7 | Affordance | ⚠ | tabs clickable; industry rows clickable; affordance present but visual indicator wrong |

**Score:** `0/7` (all rows fail or warn). Section pass: ✗.

## Gap categorization (this section)

- **Token-level:**
  - `Grey/200 = #e5e7ea` not in current token set; design uses for industry-row dividers. Add `--color-divider-subtle: #e5e7ea` or similar.
  - `Light/Text/Blue = #0080ff` is the active-tab text color; verify `--color-brand-primary` resolves to `#0080ff` (likely already present, just unused on tabs).
- **Primitive-level:**
  - `<Heading>` Display 64px + Light weight (recurring).
  - `<Heading>` `size="h4"` should resolve to 24px to match design's Heading/H4 token (currently 20px). **Token-name collision** previously flagged on Section 3 confirmed here too.
  - `<Tabs>` primitive needs an `underline` variant: text-only tabs with active-state bottom border (4px), no pill bg. Existing pill style is the wrong default for IBM-style tabs.
- **Block-level (`block.tabbedUseCases` — likely NEW or extend `tabbedFeatures`):**
  - Render featured image per active tab (`items[].featuredImage`). Image fills the right card, h-740, rounded-4.
  - Render frosted-glass caption overlay: `backdrop-filter: blur(45px)`, gradient bg, positioned bottom-left of image, contains caption title + description.
  - Render logomark watermark (bottom-right of image).
  - Render active-tab panel header (32px Regular) above the list.
  - Switch tabs primitive to underline variant.
  - Render industry rows with right-arrow icon + active-vs-inactive color flip.
- **Schema/content-level:**
  - Per-tab seed: `items[].featuredImage` (4 imgs across the 3 tabs × N active sub-items? or 1 featured per active item?), `items[].caption.title`, `items[].caption.description`.
  - Active-state seed: which industry is selected (Healthcare in design); block needs to handle either seed-defined or first-by-default.

## Notes / surprises

- **Tabs primitive metaphor mismatch is the biggest single visual offense in this section.** Black pill tabs are jarring on a clean white IBM-style page; underlined-text tabs are the canonical pattern in design. This is a primitive-level fix that would cascade to any other section using tabs (queue mentioned `tabbedFeatures` is currently used elsewhere — check Platform Section 3+).
- **The right card is technically rendering** (caption text appears in headings/paragraphs lists) but at half the design height, suggesting the featured image isn't loading/seeded and the card collapses to caption-only height. Need a screenshot to confirm.
- **`text-h4: 20px` vs Heading/H4 design token = 24px** is the same token-name collision flagged in Section 3. h2/h3/h4 site tokens are all under-spec'd by ~17–25% relative to design. This compounds the heading-size gap and is ALSO a single-place token fix in `theme.css`.
- **Frosted glass effect** (`backdrop-filter: blur`) is a feature the block isn't using. Worth noting whether the design system has a `<GlassCard>` primitive or if this is bespoke. Likely bespoke for this section.
