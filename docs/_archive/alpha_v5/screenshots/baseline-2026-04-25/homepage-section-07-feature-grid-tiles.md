# Homepage — Section 7 — FeatureGrid 2-tile audience split

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7876:42445`
**Block type rendered:** `block.featureGrid` columns=2 (with per-item `backgroundTone`)
**Site URL:** `http://localhost:3000/new-project-homepage` (scroll to ~y=7370px; renderedIdx=13 — last section on page)
**Date measured:** `2026-04-25`

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading L "Simplify and scale" | IBM Plex Sans | **24px** | 400 | `rgb(255,255,255)` (white) | `<h3 class="text-h3 font-normal text-white">` |
| Heading R "Operate at full scale" | IBM Plex Sans | **24px** | 400 | `rgb(10,10,12)` | `<h3>` (correct tone) |
| Description L | IBM Plex Sans | 16px | 400 | `rgb(255,255,255)` | `text-body text-white` (correct tone) |
| Description R | IBM Plex Sans | 16px | 400 | `rgba(31,41,55,0.8)` (Gray/80) | `text-body text-[var(--color-secondary)]` |
| Button L "Explore mid-market offering" | IBM Plex Sans | 16px | 500 | text white, bg `rgb(250,250,250)` | **rounded-full pill**, `<a>` link |
| Button R "Explore enterprise offering" | IBM Plex Sans | 16px | 500 | text `rgb(10,10,12)`, bg `rgb(0,128,255)` (Bright Blue) | **rounded-full pill**, `<a>` link |
| Label chips ("Mid-Market" / "Enterprise") | — | — | — | — | **Absent** (not in `headings[]` or `paragraphs[]` lists) |
| Section bg | transparent | — | — | — | block doesn't render outer Section bg |
| Section height | — | — | — | — | **293.9px** (rendered) |
| Section padding | — | — | — | — | `py-4` (16px); inside-tile padding unclear |

## Design (Figma) — measured via drill-in

(Source: `mcp__figma__get_design_context` on nodeId `7876:42445`)

| Element | Family | Size | Weight | Color | Layout |
|---|---|---|---|---|---|
| Section wrapper | — | — | — | bg white | flex col, full-width, **h-500px Grid row** |
| Column L (Mid-Market) | — | — | — | bg `#00274d` (Navy/secondary), border `#e8e8e8` | `flex-1 h-500px p-64`, `flex-col items-start justify-between` |
| · Label chip "Mid-Market" | IBM Plex Sans | **16px** | 400 (Regular) | text `#0a0a0c` | bg `#fafafa`, border `#e8e8e8`, `px-8 py-6` |
| · Heading "Simplify and scale" | IBM Plex Sans | **48px** | **300 (Light)** | `#fafafa` | line-height 1.1, full-width |
| · Description | IBM Plex Sans | **18px** | 400 | `#fafafa` | line-height 1.4, max-w-[400px] |
| · Button "Explore mid-market offering" | IBM Plex Sans | 14px | 400 | text `#0a0a0c`, bg white, border `#e8e8e8` | **rectangular**, `px-20 py-14` |
| Column R (Enterprise) | — | — | — | bg white, border `#e8e8e8` | same shape |
| · Label chip "Enterprise" | IBM Plex Sans | 16px | 400 | text `#0a0a0c` | bg `#fafafa`, border `#e8e8e8`, `px-8 py-6` |
| · Heading "Operate at full scale" | IBM Plex Sans | **48px** | **300 (Light)** | `#0a0a0c` | line-height 1.1 |
| · Description | IBM Plex Sans | **18px** | 400 | **`rgba(10,10,12,0.6)`** (60% black) | line-height 1.4, max-w-[400px] |
| · Button "Explore enterprise offering" | IBM Plex Sans | 14px | 400 | text white, **bg `#00274d` (Navy)** | **rectangular**, `px-20 py-14` |

## Diff — site vs design

### Critical (visibly broken, must fix)

| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| Tile height | row collapses to ~262px (heading+desc+button only) | **h-500px fixed** | -47% | block doesn't apply per-tile fixed height; missing `min-h-[500px]` or similar |
| Heading size | 24px (h3) | **48px** (Heading/H2 token) | -24px (-50%) | block emits `<Heading size="h3">`; design wants `size="h2"` AND primitive needs to expose Light weight |
| Heading weight | 400 | **300 (Light)** | -1 step | recurring `<Heading>` `weight` gap (5+ sections) |
| Description size | 16px (`text-body`) | **18px** (Heading/H5 token) | -2px | block uses default body size; should expose `size="h5"` or 18px variant |
| Right-tile description color | Gray/80 (`--color-secondary` fallback) | rgba(10,10,12,0.6) (60% black/Neutral) | wrong tone family | recurring `--color-secondary` token miscarriage on light tiles too — confirms it's not just an inverse-tone problem |
| Button shape | `rounded-full` pill | **rectangular** (no radius) | shape | recurring `<Button>` rectangular variant gap (sections 1, 5) |
| Right button bg color | `rgb(0,128,255)` (Bright Blue) | `#00274d` (Navy) | wrong color | block emits default Bright Blue CTA; design wants Navy fill on light tiles |
| Left button bg color | `rgb(250,250,250)` (~white, no border) | white + `#e8e8e8` border | border missing | block button doesn't render border |
| Button size | 16px text, py-something | 14px text, `px-20 py-14` | text +2px | minor; recurring 14px-text button gap |
| Label chips ("Mid-Market"/"Enterprise") | **absent** | rendered, `#fafafa` bg + border, 16px Regular | content gap | block.featureGrid item likely has no `label` field or seed lacks it |

### Secondary (small drift, fixable cosmetic)

| Element | Site | Design | Notes |
|---|---|---|---|
| Tile inner padding | unknown (block default) | `p-64` (64px) | tile content packs to top instead of `justify-between` (button at bottom of tile) |
| Outer border on each tile | absent | `border #e8e8e8` | recurring border-pattern gap (sections 2, 4, 5) |
| Section bg color (gutter between tiles) | transparent | white | edge case if tiles don't perfectly meet |

## Rubric scoring (this section)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ⚠ | 2-column split exists; tile heights wrong (262 vs 500); button-at-bottom positioning lost; labels missing |
| 2 | Typography — size | ✗ | heading 24 vs 48 (-50%); description 16 vs 18 (-11%) |
| 3 | Typography — weight/family | ⚠ | family ✓; weight ✗ (400 vs 300) |
| 4 | Color | ⚠ | tone flip works (white text on left-navy, dark text on right-light) ✓; right-description Gray/80 vs Neutral 60% drifted; right-button Bright Blue instead of Navy |
| 5 | Spacing | ✗ | tile fixed-height absent; `p-64` inner padding likely missing; section `py-4` |
| 6 | Content present | ⚠ | headings/descriptions/buttons present; labels absent |
| 7 | Affordance | ⚠ | CTAs present and clickable; wrong color/shape but functional |

**Score:** `0/7` strict (`0✗ + 4⚠ + 2⚠ + 1⚠`); under generous scoring `2/7` (treating ⚠ as partial pass for tone-flip + content). Section pass: ✗.

## Gap categorization (this section)

- **Token-level:**
  - `--color-secondary` Gray/80 fallback again surfacing on a light-tone tile — confirms the bug is not specific to inverse surfaces; the token resolves wrong globally. (Already flagged in cross-section pattern.)
  - Right-tile description color is Neutral at 60% opacity — could be a `--color-text-muted` semantic, currently absent.
- **Primitive-level:**
  - `<Heading>` `weight="light"` prop — recurring (6 sections).
  - `<Heading size="h2">` should resolve to 48px, but if h2 is 30px the size 48 needs to live somewhere accessible. (Either fix h2 token OR add Display lg etc.)
  - `<Button>` `shape="rectangular"` (or `radius="none"`) variant — recurring (3 sections).
  - `<Button variant="navy">` for solid-navy CTAs on light backgrounds — recurring (1 confirmed; check sections 1, 4, 5).
- **Block-level (`block.featureGrid` extend):**
  - Per-item `label` field (chip rendered above heading): bg `#fafafa`, border `#e8e8e8`, `px-8 py-6`, 16px text.
  - Per-item `backgroundTone` (already on roadmap per queue): set Navy bg → white text. Currently text-color flips correctly so PROP exists; check if Navy bg actually fills (column class shows tone-flip but section bg transparent — may be working at column level, just need to verify visually).
  - Per-item fixed-height (`min-h-[500px]`) — feature-tile shape.
  - Per-item `flex-col justify-between` so button anchors to bottom.
  - Outer per-tile border `border #e8e8e8`.
  - Per-item CTA already supported (T2.4 done) — but rectangular variant not exposed.
- **Schema/content-level:**
  - Seed each item with `label`, `cta.variant=navy` (right tile), `backgroundTone=inverse` (left tile). Labels: "Mid-Market" / "Enterprise".

## Notes / surprises

- **Tone-flip is working but tile chrome isn't.** Left-tile's white text indicates `backgroundTone: 'inverse'` is being honored at the text-color level, but the navy `bg-[var(--secondary,#00274d)]` fill isn't visible on the section element — sectionBgChain=body. That suggests the navy fill is on the inner Column, not the section. Could be correct internally (each `<Tile>` paints its own bg) but warrants a screenshot to confirm.
- **Right-button Bright Blue is jarring.** When the Mid-Market tile has a white outline button and the Enterprise tile has a saturated electric-blue pill, the visual hierarchy reads as "Enterprise = primary action" — but design clearly inverts: Mid-Market button is the de-emphasized white-on-navy, Enterprise is the affirmative navy-on-white. Both should be rectangular; both colors should match design.
- **Description font size 16 vs 18** is the first time we've measured a recurring 18px description size that is consistently smaller in site. This may indicate `text-body` defaulting to 16px when design typically uses 18px for body copy. Look for `Heading/H5` token (18px) re-mapped as a body-text size — could be either a missing primitive size or a token mapping miss.
- **No images here** — section is text/CTA only, so image gaps are not in scope. Pure layout/type/button gap.
- **Section index 13 (last on page)** — this section ended up at the END of the rendered homepage instead of position 7. Compounds the seed/mapping order problem flagged in Section 5.
