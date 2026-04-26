# Platform — Section 7 — Audience split (For growing teams / For enterprise complexity)

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7908:136823`
**Block type rendered:** `block.featureGrid` cols=2 (audience split, parallels Homepage Section 7)
**Site URL:** `http://localhost:3000/new-project-platform` (scroll to ~y=6666px, h=294)
**Date measured:** `2026-04-25`

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Left heading "For growing teams" | IBM Plex Sans | 24px | 400 | rgb(255,255,255) (white) | `<h3>` `text-h3 font-normal text-white` — on inverse Navy bg |
| Right heading "For enterprise complexity" | IBM Plex Sans | 24px | 400 | rgb(10,10,12) | `<h3>` `text-h3 font-normal` — on white bg |
| Left description | IBM Plex Sans | 16px | 400 | rgb(255,255,255) (white) | `text-body text-white` |
| Right description | IBM Plex Sans | 16px | 400 | rgba(31,41,55,0.8) | `text-body text-[var(--color-secondary)]` — recurring miscarriage |
| Left CTA "Explore mid-market" | IBM Plex Sans | 16px | 500 | white | bg `rgb(250,250,250)` (FAFAFA) — **white text on white bg = invisible** |
| Right CTA "Explore enterprise" | IBM Plex Sans | 16px | 500 | rgb(10,10,12) | bg `rgb(0,128,255)` Bright Blue — **dark text on Bright Blue, wrong bg** |
| Section bg | — | — | — | transparent (per `findBg`) | left tile bg likely Navy (inferred from text white) but on wrapper div |
| Section padding | — | — | — | — | `16px 0px` (py-4) |
| Section height | — | — | — | — | 294px (vs design 500) — collapsed |

```json
{
  "sectionBoundsAbs": {"y": 6666, "width": 1920, "height": 294},
  "sectionPadding": "16px 0px",
  "headings": [
    {"tag": "h3", "fontSize": "24px", "fontWeight": "400", "color": "rgb(255, 255, 255)", "text": "For growing teams"},
    {"tag": "h3", "fontSize": "24px", "fontWeight": "400", "color": "rgb(10, 10, 12)", "text": "For enterprise complexity"}
  ],
  "paragraphs": [
    {"fontSize": "16px", "color": "rgb(255, 255, 255)", "text": "Automate workflows quickly with the flexibility to scale."},
    {"fontSize": "16px", "color": "rgba(31, 41, 55, 0.8)", "cls": "text-body text-[var(--color-secondary)]", "text": "Orchestrate AI, people, processes, and systems across your entire organization."}
  ],
  "buttons": [
    {"backgroundColor": "rgb(250, 250, 250)", "color": "rgb(255, 255, 255)", "text": "Explore mid-market offering"},
    {"backgroundColor": "rgb(0, 128, 255)", "color": "rgb(10, 10, 12)", "text": "Explore enterprise offering"}
  ],
  "imageCount": 0,
  "interactiveCount": 0
}
```

## Design (Figma) — measured via drill-in

(Source: `mcp__figma__get_design_context` on `7908:136823` — succeeded directly.)

**Two-column grid**, equal width, both `h-[500px] p-[64px] border #e8e8e8`.

**Left column** (`7908:136824`, `bg-[#00274d]` Navy):
| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Label chip "Mid-Market" | IBM Plex Sans | 16px (H6) | 400 | `#0A0A0C` | bg `#FAFAFA` border `#e8e8e8`, `px-8 py-6` |
| Heading | IBM Plex Sans | 48px (H2) | 300 (Light) | `#FAFAFA` (white inverse) | leading 1.1 |
| Description | IBM Plex Sans | 18px (H5) | 400 | `#FAFAFA` (white inverse) | leading 1.4, max-w-400 |
| Button | IBM Plex Sans | 14px (Component/Button) | 400 (Regular) | `#0A0A0C` (dark text) | bg `white`, border `#e8e8e8`, `px-20 py-14` rectangular |

**Right column** (`7908:136845`, `bg-white`):
| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Label chip "Enterprise" | IBM Plex Sans | 16px (H6) | 400 | `#0A0A0C` | bg `#FAFAFA` |
| Heading | IBM Plex Sans | 48px (H2) | 300 (Light) | `#0A0A0C` | leading 1.1 |
| Description | IBM Plex Sans | 18px (H5) | 400 | `rgba(10,10,12,0.6)` (Neutral 60%) | leading 1.4, max-w-400 |
| Button | IBM Plex Sans | 14px (Component/Button) | 400 (Regular) | `white` text | bg `#00274d` Navy, `px-20 py-14` rectangular |

## Diff — site vs design

### Critical (visibly wrong, must fix)

| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| Heading size (both) | 24px (H3) | 48px (H2) | −24px / −50% | **Token + Primitive** — block uses `<h3>` `text-h3` instead of larger size |
| Heading weight (both) | 400 | 300 (Light) | weight off | Primitive — `<Heading>` no `weight` prop |
| Description size | 16px | 18px (H5) | −2px | Token — H5 not mapped |
| Right description color | `rgba(31,41,55,0.8)` | `rgba(10,10,12,0.6)` | wrong base + opacity | Token — `--color-secondary` recurring |
| Left description color (on inverse) | `rgb(255,255,255)` | `#FAFAFA` | close (effectively white) | ✓ minor diff |
| Label chips ("Mid-Market"/"Enterprise") | absent | present, white-bg chips | structural | Block + Schema |
| **Left CTA color** | white text on white bg (`rgb(250,250,250)`) | **dark** text on white bg | **invisible — broken** | **Primitive — Button white-tone variant has wrong text color OR tone-flip did not apply** |
| **Right CTA color** | dark text on Bright Blue (`rgb(0,128,255)`) | **white** text on Navy `#00274d` bg | wrong colors entirely | **Primitive — Button Navy variant doesn't exist; Bright Blue default rendered with wrong text color** |
| Button shape | rounded-full | rectangular `px-20 py-14` | shape wrong | Primitive — `<Button shape="rectangular">` missing |
| Button text size | 16px | 14px | +2px | Component spec — Components/Button = 14px |
| Button text weight | 500 (Medium) | 400 (Regular) | +1 step | Component spec |
| Section/column height | 294px | 500px (each col) | −206px / −41% | Block — height not enforced |
| Per-column padding | likely 0 | `p-[64px]` | inner padding missing | Block |
| Border `#e8e8e8` on each column | likely absent | present | structural | Block |

### Secondary (small drift)

| Element | Site | Design | Notes |
|---|---|---|---|
| Left col bg Navy | likely correct (text white inferred) | `#00274d` Navy | Confirmed via inverse text color, but `findBg` blind spot |
| 2-col split layout | present | present | ✓ |

## Rubric scoring (this section)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ⚠ | 2-col split present + tone-flip works (white text vs dark) but column heights collapsed and label chips absent |
| 2 | Typography — size | ✗ | Heading 24 vs 48; description 16 vs 18; button 16 vs 14 |
| 3 | Typography — weight/family | ✗ | Heading weight 400 vs 300 (Light); button weight 500 vs 400 |
| 4 | Color | ✗ | **Both CTAs rendered with broken colors** — left white-on-white invisible, right Bright Blue with dark text. Right description `--color-secondary` miscarriage. |
| 5 | Spacing | ✗ | py-4 vs h-500 + p-64 per column |
| 6 | Content present | ✗ | Label chips ("Mid-Market"/"Enterprise") absent — both columns missing the chip seed |
| 7 | Affordance | ⚠ | 2 CTAs present but **left invisible (white text on white) — functionally broken** |

**Score:** `0/7` strict (with ⚠ as ✗) or `2/7` generous. **Section pass:** ✗.

## Gap categorization (this section)

- **Token-level:**
  - `--color-secondary` (recurring).
  - Heading-token-name collision (recurring) — design's H2 48 vs site's `text-h3` 24 used here.
- **Primitive-level:**
  - `<Heading>` no `weight` (recurring) / no Display sizes.
  - **`<Button>` rectangular variant missing** (recurring — sections 1, 5, 7, 12, 13, P1, now P7).
  - **`<Button>` Navy variant missing** (recurring — sections 7, 12, 13, now P7).
  - **`<Button>` white-on-light-bg variant rendering wrong text color** — left CTA text is white instead of dark, indicating a button color computation bug or wrong default text color when bg-tone is light. **NEW gap manifestation; warrants tracking as primitive defect.**
  - Button text spec (14px Regular vs site's 16px Medium 500) — primitive size+weight defaults wrong.
- **Block-level:**
  - `block.featureGrid` cols=2 audience-split variant doesn't enforce per-column `h-500` height.
  - Per-column `p-64` not applied.
  - Per-column `border #e8e8e8` absent.
- **Schema/content-level:**
  - Label chips "Mid-Market" / "Enterprise" not seeded — schema for audience-split block likely needs `label` field per item.

## Notes / surprises

- **Both CTAs are broken in different ways.** Left is invisible (white text on white bg), right has wrong tone (Bright Blue with dark text vs Navy with white). This is the first section measured where CTA color is so wrong it's functionally unusable. Fix priority is high even if visual fidelity is "only" 0/7 — affordance is **broken**, not just "off-spec."
- **Heading uses `text-h3` 24px** for what design expects to be H2 48px. Why is a tile heading using h3? Likely because the block emits `<h3>` for tile titles regardless of context. This is the same pattern as Section 5 (auto-switching) where tab titles used `text-h4`. Block-level template choice → wrong semantic level; downstream affects size mapping.
- **Section h=294 (less than half of design 500).** Heaviest height collapse measured so far on Platform — design wants `h-[500px]`, site delivers 294px. Per-column padding likely 0; without `p-64` and without explicit height the section just collapses to content size.
- **Direct parallel of Homepage Section 7.** Same audience-split block, same gaps:
  - Homepage 7: 2-tile tone-flip works partially, heading 24 vs 48, buttons rounded-full pill vs rectangular, right-tile CTA Bright Blue vs Navy, label chips missing, tile heights collapsed (262 vs 500).
  - Platform 7: same exactly except left CTA is now white-on-white (different button broken-ness flavor).
- **Right CTA Bright Blue + dark text** suggests the Button primitive's "default" variant was used (Bright Blue rounded-full) but with a tone-override that flipped text color. The Navy variant doesn't exist, so the seed asks for a non-existent variant and the primitive falls back to default Bright Blue with whatever text color the active tone provides.
