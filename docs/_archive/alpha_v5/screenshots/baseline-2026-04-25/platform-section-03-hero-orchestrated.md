# Platform — Section 3 — One platform. Fully orchestrated. (heroCenter w/ media)

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7900:117922`
**Block type rendered:** `block.heroCenter` (with media slot intended)
**Site URL:** `http://localhost:3000/new-project-platform` (scroll to ~y=846px, h=890)
**Date measured:** `2026-04-25`

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading | IBM Plex Sans | 30px | 400 | rgb(10,10,12) | `<h2>` `text-h2 font-normal` |
| Subheading | IBM Plex Sans | 20px | 400 | rgba(31,41,55,0.8) | Tailwind gray-700 @ 80% — wrong color base |
| CTA | — | — | — | — | none rendered (none in design either) |
| Section bg | — | — | — | transparent | inherits page body |
| Section padding | — | — | — | — | `16px 0px` (py-4) |

```json
{
  "sectionBoundsAbs": {"x": 0, "y": 846, "width": 1920, "height": 890},
  "sectionCls": "relative py-4",
  "sectionBgChain": {"el": "body", "bg": "rgba(0, 0, 0, 0)"},
  "sectionPadding": "16px 0px",
  "headings": [{"tag": "h2", "fontSize": "30px", "fontWeight": "400", "color": "rgb(10, 10, 12)", "text": "One platform. Fully orchestrated."}],
  "paragraphs": [{"fontSize": "20px", "fontWeight": "400", "color": "rgba(31, 41, 55, 0.8)", "text": "We bring together everything that drives your business into a single, coordinated state."}],
  "buttons": [],
  "imageCount": 1,
  "interactiveCount": 0
}
```

## Design (Figma) — measured via drill-in

(Source: `mcp__figma__get_design_context` on `7900:117922` — succeeded directly.)

Two-part composition:

**Part 1 — Header card** (`Section Pricing` 7900:117915, `bg-white border #e8e8e8`, `pb-[64px] pt-[48px] px-[64px]`):
| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading | IBM Plex Sans | 64px (Heading/H1) | 300 (Light) | `#0A0A0C` | leading 1.1, two-line w/ `<br>` after "One platform." |
| Subheading | IBM Plex Sans | 24px (Heading/H4) | 400 (Regular) | `#0A0A0C` | leading 1.3, max-w-500, right-aligned in split row |

**Part 2 — Orchestration diagram** (`Grid` 7900:117608, `bg-white border-b/l/r #e8e8e8 h-[550px] w-[1496px]`):
- 2 fan-out source/outcome line illustrations (left/right)
- 4 left-column cards (AI Agents, Business rules, Workflows, Systems): `bg-[#fafafa] border-[0.75px] #e8e8e8 p-[18px] gap-[18px]` each w/ Navy `#00274d` icon box (size 34.5, rounded-3) + 18px label + 14px description @ `rgba(10,10,12,0.6)`
- 3 right-column cards (Predictable outcomes, Faster execution, Continuous adaptation): same chrome, label-only (no description)
- Center: Decisions diamond logo (Navy `#00274d`, rotated -45°, size 287px) + Decisions logomark+wordmark overlay

Per principle 3, the entire diagram (Part 2) is a composed graphic and should be a single image asset, not per-card React. Queue notes: "treat as image per principle 3."

![Design preview](./platform-section-03-hero-orchestrated-design-ref.png) *(see Figma screenshot)*

## Diff — site vs design

### Critical (visibly wrong, must fix)

| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| Heading size | 30px | 64px (H1) | −34px / −53% | **Token + Primitive** — `text-h1`/`text-h2` smaller than design H1; `<Heading>` has no Display/64 size |
| Heading weight | 400 (Regular) | 300 (Light) | weight off by one step | **Primitive** — `<Heading>` no `weight` prop |
| Subheading size | 20px | 24px (H4) | −4px | Token — H4 mapping |
| Subheading color | `rgba(31,41,55,0.8)` (Tailwind gray-700 @ 80%) | `#0A0A0C` (Light/Text/Default) | wrong base color + wrong opacity | **Token** — site rendering `--color-secondary` resolves to gray base instead of neutral primary |
| Section bg + chrome | transparent, no border | `bg-white border #e8e8e8` (header card) + connected diagram card | white card chrome missing | Block |
| Header padding | `16px 0px` (py-4) | `pb-64 pt-48 px-64` | dramatically thinner | Block |
| Heading layout | single column | split row (heading left flex-1, subheading right max-w-500) | layout wrong | Block |
| Orchestration diagram | absent (1 image in section) | Composed graphic with diamond logo + 7 feature cards + fan-out lines | **DOMINANT visual mass missing** | Block + Schema/content |
| Section bounds | h=890px | (header ~250 + diagram 550 = ~800px combined) | Section collapses without diagram content | Block |

### Secondary (small drift)

| Element | Site | Design | Notes |
|---|---|---|---|
| `<br>` line break after "One platform." | unknown — single h2 text | explicit `<br aria-hidden="true">` | Likely a content/schema gap; heading text contains no break marker |

## Rubric scoring (this section)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ✗ | Single-column without media; design has split-row heading + connected media card below |
| 2 | Typography — size | ✗ | Heading 30 vs 64 (>1 enum step + Display range needed); subheading 20 vs 24 |
| 3 | Typography — weight/family | ✗ | Family ✓ (IBM Plex Sans) but heading weight 400 vs 300 fails |
| 4 | Color | ✗ | Subheading `rgba(31,41,55,0.8)` Tailwind gray vs design `#0A0A0C` |
| 5 | Spacing | ✗ | py-4 (16px) vs pb-64 pt-48 px-64 |
| 6 | Content present | ✗ | Orchestration diagram (heart of section) absent — `imageCount: 1` vs ~12+ |
| 7 | Affordance | ✓ | No CTAs in design, none rendered — match by absence |

**Score:** `1/7`. Section pass: ✗ (≥5/7 = pass).

## Gap categorization (this section)

- **Token-level:**
  - `--color-secondary` (or whatever subheading uses) resolves to `rgba(31,41,55,0.8)` Tailwind gray-700 instead of `#0A0A0C` Neutral. Recurring; same root cause as Sections 1, 3, 4, 5, etc. on Homepage.
  - `--text-h1` = 48 (or 30 here as h2) << design H1 64. Recurring heading-token-name collision.
- **Primitive-level:**
  - `<Heading>` no `weight` prop — needs Light 300 option.
  - `<Heading>` no Display/64+ size for hero contexts.
- **Block-level:**
  - `block.heroCenter` w/ media slot doesn't render the media slot (or schema doesn't carry image).
  - Header lacks split-row two-column layout (heading left + subheading right).
  - White card chrome missing.
  - Padding too thin.
- **Schema/content-level:**
  - Orchestration diagram image not seeded into block. Per queue: "treat as image per principle 3" — should be a single composed PNG in `mediaSlot`.
  - Heading line-break (`\n` or `<br>`) for "One platform.\nFully orchestrated." not preserved through schema.

## Notes / surprises

- This is the section where principle-3 (composed graphic) intent matters most so far. The diagram has 7 cards + diamond logo + fan-out lines + icons — implementing per-card React would be a huge build but the queue explicitly said to treat as image.
- Site renders `imageCount: 1` (not 0). Worth investigating what that 1 image is — likely the diamond logo seed slipping through, or a placeholder. Doesn't change the score but suggests the schema has a partial mediaSlot field that's not delivering the composed graphic asset.
- Subheading color `rgba(31, 41, 55, 0.8)` = Tailwind `text-gray-800/80`. Different from the typical `--color-secondary` resolution we've seen elsewhere — first encounter of that exact value across all 14 measured sections. May indicate this block uses a different text-color class than the other heroes.
- This section has the largest "what should be there but isn't" mass of any Platform section measured so far. Aggregator should flag as one of the 2-3 highest-leverage block-level fixes (alongside Section 13 callout lime-bg and Section 6 video stub).
