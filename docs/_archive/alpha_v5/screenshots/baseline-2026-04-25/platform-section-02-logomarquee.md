# Platform — Section 2 — Logo Marquee (Trusted by Innovators)

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7900:117587`
**Block type rendered:** `block.logoMarquee`
**Site URL:** `http://localhost:3000/new-project-platform` (scroll to ~y=600px, h=246)
**Date measured:** `2026-04-25`

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Caption ("Trusted by Innovators") | IBM Plex Sans | 30px | 400 | rgb(10,10,12) | rendered as `<h2>` with `text-h2 font-normal` |
| Logos | — | varies | — | — | 14 `<img>` elements (7 logos × 2 — marquee duplication) |
| Section bg | — | — | — | transparent | inherits page body (no white card chrome) |
| Section padding | — | — | — | — | `64px 0px` (py-16) |

```json
{
  "sectionBoundsAbs": {"x": 0, "y": 600, "width": 1920, "height": 246},
  "sectionCls": "relative py-16",
  "sectionBgChain": {"el": "body", "bg": "rgba(0, 0, 0, 0)"},
  "sectionPadding": "64px 0px",
  "headings": [{"tag": "h2", "cls": "font-heading m-0 text-h2 font-normal", "fontSize": "30px", "fontWeight": "400", "color": "rgb(10, 10, 12)", "text": "Trusted by Innovators"}],
  "paragraphs": [],
  "buttons": [],
  "imageCount": 14,
  "interactiveCount": 0
}
```

## Design (Figma) — measured via drill-in

(Source: `mcp__figma__get_design_context` on `7900:117587` — succeeded directly, no drill-in needed.)

| Element | Family | Size | Weight | Color | Layout |
|---|---|---|---|---|---|
| Caption ("Trusted by Innovators") | IBM Plex Sans | 16px (Heading/H6) | 400 (Regular) | `#0A0A0C` @ 60% opacity (`rgba(10,10,12,0.6)`) | `<p>`, leading 1.4, `whitespace-nowrap` |
| Container | — | — | — | `#FFFFFF` (Light/Background/Default) | `flex gap-[128px] items-center p-[48px]` |
| Logos | — | various (h 14–36px, w 55–107px) | — | — | 7 logos in single horizontal row, `gap-[40px]`, each in `p-[8px]` frame |

Logo set: Coca-Cola, Genentech, Bridgestone, Sony Music, University of Virginia, Corning, Lockheed Martin (matches Homepage Section 2's same 7 logos).

## Diff — site vs design

### Critical (visibly wrong, must fix)

| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| Caption tag | `<h2>` | `<p>` | semantic + visual mismatch | Block — caption emitted as heading element instead of paragraph |
| Caption size | 30px (`text-h2`) | 16px (Heading/H6) | +14px / +88% | Block emits heading-class on a non-heading element |
| Caption color | `rgb(10,10,12)` (full) | `rgba(10,10,12,0.6)` (60%) | opacity missing | Token — `--color-text-muted` or H6-with-60% pattern absent |
| Section bg | transparent | `#FFFFFF` (Light/Default) | white card chrome missing | Block — logoMarquee has no `bg-white` framing |
| Section padding | `64px 0px` (py-16, no x) | `p-[48px]` (48px all 4 sides) | x-padding missing | Block |
| Logo count rendering | 14 images (marquee × 2) | 7 logos (static row) | Animation behavior wrong | Block — logoMarquee always animates; design wants static |
| Logo arrangement | Likely scrolling marquee | Static horizontal row with caption gap-128 | Layout pattern mismatch | Block |

### Secondary (small drift)

| Element | Site | Design | Notes |
|---|---|---|---|
| Logo per-frame `p-[8px]` | unknown without per-image inspection | `p-[8px]` per logo frame | Likely matches; not measured |
| `gap-[40px]` between logos | unknown | `gap-[40px]` | Likely matches in marquee but only when not animating |

## Rubric scoring (this section)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ✗ | Marquee animation + transparent bg vs static horizontal row in white card with caption-left |
| 2 | Typography — size | ✗ | Caption 30px vs 16px (4 enum steps off) |
| 3 | Typography — weight/family | ✓ | IBM Plex Sans / 400 both match |
| 4 | Color | ✗ | Caption full opacity vs 60% — fails `--color-secondary` / muted-text test (recurring) |
| 5 | Spacing | ✗ | py-16 + 0px horizontal vs p-48 all-sides |
| 6 | Content present | ✓ | 7 logos present (× 2 due to marquee dup, but content is there) |
| 7 | Affordance | ✓ | No CTAs in this block; nothing missing |

**Score:** `3/7`. Section pass: ✗ (≥5/7 = pass). Same score as Homepage Section 2 — exact-parallel block.

## Gap categorization (this section)

- **Token-level:** caption text-color needs to resolve to muted/60%-opacity neutral, not full primary. Same `--color-secondary` issue as elsewhere — but here on an explicit caption role, not just body text.
- **Primitive-level:** none new (heading-tag mismatch is block-level).
- **Block-level:**
  - `block.logoMarquee` always animates; needs `static: true` mode (per queue mapping intent).
  - Caption rendered as `<h2>` heading instead of `<p>` paragraph — semantic + style class wrong.
  - Section needs `bg-white p-12` framing (white card chrome).
- **Schema/content-level:** none new.

## Notes / surprises

- **Direct parallel of Homepage Section 2.** Same nodeId pattern (logoMarquee on Platform = Homepage's marquee with same 7 logos), same block, same gaps. Score lands same: 3/7. As predicted in session 2-extension handoff, Platform sections that REUSE Homepage blocks repeat the same gap pattern.
- Cross-reference: Homepage Section 2 already flagged "Marquee always animates" + "intro text role mismatch (`<h2>` vs caption)" + "card-chrome missing" — every gap here is a known one from Homepage.
- This section's diff is short by design — every gap is recurring. The aggregator only needs to see "Section P2 = mirror of H2" to count gap frequency.
