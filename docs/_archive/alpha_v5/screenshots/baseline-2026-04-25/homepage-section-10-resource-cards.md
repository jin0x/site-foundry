# Homepage — Section 10 — ResourceCards

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7876:58254`
**Block type rendered:** `block.featureGrid` (or close cousin) — queue earmarked NEW `block.resourceCards` or featureGrid extend with featured-image variant
**Site URL:** `http://localhost:3000/new-project-homepage` (scroll to ~y=2278px; renderedIdx=5)
**Date measured:** `2026-04-25`

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading "Recognized as a category leader" | IBM Plex Sans | **30px** | 400 | `rgb(10,10,12)` | `<h2 class="text-h2 font-normal">` |
| Subheading paragraph | IBM Plex Sans | **20px** | 400 | `rgba(31,41,55,0.8)` (Gray/80) | `<p>` no class — uses default `prose-body` resolution |
| Card title "AI orchestration in the enterprise" | IBM Plex Sans | **24px** | 400 | `rgb(10,10,12)` | `<h3 class="text-h3 font-normal">` ✓ matches design 24px |
| Card title "Why business rules still matter" | IBM Plex Sans | 24px | 400 | `rgb(10,10,12)` | h3 |
| Card title "From workflows to decision intelligence" | IBM Plex Sans | 24px | 400 | `rgb(10,10,12)` | h3 |
| Card description (3×) | IBM Plex Sans | **16px** | 400 | `rgba(31,41,55,0.8)` (Gray/80) | `text-body text-[var(--color-secondary)]` |
| "Download Report" link (3×) | IBM Plex Sans | 16px | 500 | text `rgb(10,10,12)`, transparent bg | **rounded-full pill** `<a>`; text-only no underline |
| Section bg | transparent | — | — | — | no white bg, no `#e8e8e8` border |
| Section bounds | — | — | — | — | h=435.9px |
| Section padding | — | — | — | — | `py-4` (16px) |
| **`imageCount: 0`** | | | | | **No images render at all** — design's diamond-pattern + featured-image frames absent |

## Design (Figma) — measured via drill-in

(Source: `mcp__figma__get_design_context` on nodeId `7876:58254`)

| Element | Family | Size | Weight | Color | Layout |
|---|---|---|---|---|---|
| Section wrapper | — | — | — | bg white, border `#e8e8e8` | `flex flex-col items-start` |
| Header | — | — | — | — | `pb-64 pt-48 px-64 gap-48` |
| Heading "Recognized as a category leader" | IBM Plex Sans | **64px** | **300 (Light)** | `#0a0a0c` | line-height 1.1, max-w-[800px] **LEFT** |
| Subheading paragraph | IBM Plex Sans | **24px** | 400 (Regular) | `#0a0a0c` | line-height 1.3, max-w-[500px] **RIGHT** (split-row pattern) |
| Subheading citation line | IBM Plex Sans | 24px | 400 | `#0a0a0c` | "Gartner® Critical Capabilities for Decision Intelligence Platforms report 2026" |
| **3 Posts row** | — | — | — | `border-t #e8e8e8` | `flex` row, each child `flex-1 p-48` |
| · Post border | — | — | — | `border-l #e8e8e8` (cards 2 & 3) | per-card vertical divider |
| · Image wrapper | — | — | — | bg `#f1ffe9` (Primary/Mint) | h-220, w-402, overflow-clip |
| · Decorative diamond pattern overlay (15× 187.25px Logo Option 3) | — | — | — | — | grid of brand diamond glyphs filling image area |
| · Center clip (Rectangle 133/134 photo) | — | — | — | — | 261×261 photo masked into central diamond |
| · Card 2 only: Decisions logomark watermark + IBM-style 32px icon | — | — | — | — | (per-card variation) |
| · Card title | IBM Plex Sans | **24px** | 400 (Regular) | `#0a0a0c` | line-height 1.3 |
| · Card description | IBM Plex Sans | **18px** | 400 | **`rgba(10,10,12,0.6)`** (Neutral 60%) | line-height 1.4 |
| · "Download Report" link | IBM Plex Sans | **16px** | 400 | `#0a0a0c` text, **`#0a0a0c` 1px underline** below text | **NO bg, NO pill, NO border** — text + underline |
| Section padding | — | — | — | — | `pb-64 pt-48 px-64` header; `p-48` per card |

## Diff — site vs design

### Critical (visibly broken, must fix)

| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| Heading size | 30px | **64px** | -34px (-53%) | recurring primitive cap |
| Heading weight | 400 | **300 (Light)** | -1 step | recurring primitive `weight` gap |
| Heading layout | full-width / left-stacked | **left half (heading) + right half (subheading + citation)** | layout shape | T6.2 split-heading-row gap recurring (sections 3, 5, 9, 10) |
| Subheading size | 20px | **24px** | -4px (-17%) | block doesn't expose a 24px subheading variant |
| Subheading color | Gray/80 (secondary fallback) | `#0a0a0c` (Neutral primary) | wrong color family | recurring `--color-secondary` miscarriage; subheading should use primary text color, not muted |
| Subheading citation line | absent | "Gartner® Critical Capabilities…" rendered below paragraph | content gap | block.subheading doesn't accept multi-line / citation field |
| Card image / decorative diamond pattern | **absent** (`imageCount: 0`) | mint-green panel + 15-tile diamond logo grid + central photo clip + per-card icon variations | content + structural gap | block has no media slot for cards, OR seed lacks card.image, OR component doesn't render the decorative system |
| Card description size | 16px | **18px** | -2px | recurring (sections 7, 9, 10) |
| Card description color | Gray/80 (secondary) | rgba(10,10,12,0.6) (Neutral 60%) | wrong color family | recurring `--color-secondary` miscarriage |
| "Download Report" affordance shape | rounded-full pill | **text + `#0a0a0c` underline** (no pill, no bg, no border) | wrong button variant | recurring `<Button>` variant gap; specifically a "text-link" or "underline" variant |
| Card outer border-l | absent | `border-l #e8e8e8` between cards | structural | block doesn't render per-card border |
| Card inner padding | block default | `p-48` (48px) | recurring spacing gap |  |
| Section bg + border | transparent / none | white bg + `#e8e8e8` border | recurring (5+ sections) | |
| Section bounds height | 435.9px | ~750px+ (header h=~250 + posts h=~500) | -42% | `imageCount: 0` collapses card heights significantly |

### Secondary

| Element | Site | Design | Notes |
|---|---|---|---|
| Card title size **matches** | 24px | 24px | ✓ — only block-level metric matching design directly. h3 token resolves to 24px which **does** align with Heading/H4 token-name in design. (Reverse of Section 9's mismatch — h3=24px works for card titles even though h4=20px misses caption-title.) |
| Section padding | `py-4` | `pb-64 pt-48 px-64` heading + `p-48` cards | recurring |

## Rubric scoring (this section)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ⚠ | 3-card row exists; split-heading-row absent; per-card image+decoration absent; per-card border absent |
| 2 | Typography — size | ⚠ | heading ✗ (-53%); subheading ✗ (-17%); description ✗ (-11%); **card title ✓** |
| 3 | Typography — weight/family | ⚠ | family ✓; main-heading weight ✗ |
| 4 | Color | ✗ | subheading color wrong family; card description color wrong family; `--color-secondary` miscarriage on multiple elements |
| 5 | Spacing | ✗ | section padding wrong; card inner padding wrong; gap-48 missing in heading area |
| 6 | Content present | ✗ | citation line absent; ALL card images absent; decorative diamond pattern absent; per-card icon variations absent |
| 7 | Affordance | ⚠ | 3 download links present and clickable; visual treatment wrong (pill vs underline-text) |

**Score:** `1/7` — only card-title size passes cleanly. Section pass: ✗.

## Gap categorization (this section)

- **Token-level:**
  - `Primary/Mint = #f1ffe9` confirmed in design (already in token set per PROJECT_DESIGN_NODES.md baseline). Used as `bg` on card image-frame.
  - Subheading citation should be primary-text color (`#0a0a0c`), not `--color-secondary` Gray/80. This is the same `--color-secondary` miscarriage now affecting 6+ sections — single fix in theme.css remains the highest-leverage token gap.
- **Primitive-level:**
  - `<Heading>` Light 300 + Display 64px (recurring).
  - `<Button>` `variant="text-link"` or `variant="underline"`: text-only link with bottom 1px underline, no pill / no border / no padding-x. (3rd button variant gap after rectangular + navy-fill.)
- **Block-level (`block.resourceCards` — likely NEW or featureGrid extend):**
  - Per-card image with mint-green frame + tiled diamond-pattern decoration + central photo clip. This is a non-trivial visual: 15-cell grid of brand glyphs + a 261px masked photo at center. Likely needs a `<DiamondPatternFrame>` primitive.
  - Subheading-with-citation: support a `subheading.citation` field (or just allow multi-paragraph subheadings in the existing schema).
  - Split-heading-row layout (T6.2 recurring): heading left, subheading + citation right.
  - Per-card right border (`border-l #e8e8e8` on cards 2..N).
  - Per-card `p-48` padding.
  - "Download Report" as text-link with underline; pass href + label per card.
- **Schema/content-level:**
  - Per-card `image` (CMS image upload OR a generated decorative diamond frame — lower-effort: render decorative frame from a fixed pattern asset, only photo varies per card).
  - Subheading citation field: "Gartner® Critical Capabilities for Decision Intelligence Platforms report 2026"
  - Per-card "Download Report" `href` (PDF URLs).

## Notes / surprises

- **First "matching" measurement!** Card title `<h3>` resolves to 24px, which equals the design's Heading/H4 token at 24px. (Design uses H4 token-name for "card title" rank.) That's coincidence — the site's `text-h3=24` happens to match the design's H4=24 not because they're aligned but because h3 numerical value happens to land on H4's value. **This makes the heading-token-collision pattern more nuanced than "all sizes are too small": it's specifically `h1`, `h2`, and `h4` site tokens that miss; `h3` works because of how the numbering shifts.**
- **`imageCount: 0` is the dominant gap of this section.** Three card image frames, each with mint bg + 15 diamond glyphs + central photo + per-card decoration variations, are all absent. Even if the card text is right, the section reads as "3 columns of bare links" without the image mass. This is the highest-impact visual gap measured so far in any section — 50%+ of section's intended visual mass is missing.
- **Design's per-card image is a composed graphic** (15 tiled diamond logo glyphs + center photo + per-card variations like Card 2's logomark watermark + IBM-style icons). Per `figma-mcp-template.md` core principle 3, treat as static graphic — but here we'd need 3 unique composed graphics. Realistically: design supplies them as 3 PNG assets (one per resource), block renders as `<img>` with mint-green panel bg. The diamond grid is decorative scaffolding around a single photo per card.
- **"Download Report" being a rounded-full pill is the third Button variant gap** measured (sections 1, 5, 7 want rectangular; this wants underline text-link). The Button primitive needs at least 3 variants beyond the current rounded-full default. Cumulative across sections, button shape is the primitive most consistently wrong.
- **Subheading paragraph using `--color-secondary` is wrong** — design has a black `#0a0a0c` subheading. The miscarriage isn't just on inverse-toned sections (Section 8) or muted body text (Section 7); even primary subheadings are getting Gray/80'd. Strong evidence the token's resolution is the problem, not its application.
