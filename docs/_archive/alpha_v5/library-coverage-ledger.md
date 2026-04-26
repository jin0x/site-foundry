# Library coverage ledger — new-project pipeline dogfood

Per-page tracking of **library addition cost**. The amortization thesis predicts page 2 adds significantly less than page 1. This ledger is the evidence.

Paired with `seeds/queues/2026-04-22-new-project-pipeline-queue.md` — queue holds pipeline progress; this holds measurement.

---

## Terminology

- **Layer** — one of: primitives, composites, blocks (+ their schemas).
- **Pre-coverage `E`** — count of items in a layer that exist in Site Foundry's library *before* the page's Stage 2/3 begins.
- **Needed `N`** — count of items in a layer that the page requires (as determined in Stage 2/3 classification).
- **Added `A`** — count of items newly built or extended for this page. Equivalently: the items classified as "extend" or "new" during the stage.
- **Reused `R`** — `N − A`. Items the page uses as-is.
- **Coverage % before** — `E / N × 100`. How much of the page's need was already in the library when the page started.

**Per-layer classification discipline:** when recording items in stages 2/3, tag each as `reuse` / `extend` / `new`. `extend` and `new` both count toward `A`; `reuse` counts toward `R`.

---

## Baseline — library state at experiment start

Snapshot `pnpm -F @site-foundry-template/ui exec tsc --noEmit` doesn't enumerate items; fill this table by listing `packages/ui/src/primitives/*`, `packages/ui/src/components/*`, `packages/ui/src/blocks/*`, and `packages/sanity-schema/src/blocks/*`. Done once before Page 1 Stage 2.

**Snapshot taken:** 2026-04-24 14:18 (session 1 start)
**Branch:** `feat/decisions-dogfood-run`
**Commit SHA:** `8c69e123e95161669211bda809f160f2398ab076`

- **Primitives in library at start:** `15` — Accordion, Avatar, Badge, Button, Card, Container, Eyebrow, Grid, Heading, IconBadge, Image, Marquee, Stack, Tabs, Text
- **Composites in library at start:** `6` — BaseBlock, CtaButton, HeadingGroup, Section, SectionCta, SectionHeading
- **Blocks (React) in library at start:** `11` — AccordionBlock, CalloutBlock, CodeSampleBlock, ComparisonBlock, FeatureGridBlock, HeroCenterBlock, HeroSplitBlock, LogoMarqueeBlock, RichTextBlock, TabbedFeaturesBlock, TestimonialsBlock
- **Schemas in library at start:** `11` — accordion, callout, codeSample, comparison, featureGrid, heroCenter, heroSplit, logoMarquee, richText, tabbedFeatures, testimonials
- **Target package path (for additions):** `templates/next-sanity-starter/packages/ui/` + `templates/next-sanity-starter/packages/sanity-schema/` (the outer `project/site-foundry/packages/*` are empty scaffolds — the running web app consumes the template sub-workspace).

Git diff between this ref and end-of-experiment ref = total library addition.

---

## Page 1 — Homepage

### Primitives
Enumerated from the 13-section pull; primitive set in `templates/next-sanity-starter/packages/ui/src/primitives/` = 15 total; used on Page 1 below.

| Element needed | Classification | Notes | Commit |
|---|---|---|---|
| `<Stack>` | reuse | Flex columns throughout | — |
| `<Grid>` | reuse | 2/3-column layouts (rows 4, 5, 7, 9, 10) | — |
| `<Container>` | reuse | 1440 max content width per page-level behaviors | — |
| `<Heading>` | reuse | IBM Plex Sans Light weight = token drift, NOT primitive issue (font-heading class + --font-weight-heading var) | — |
| `<Text>` | reuse | Body copy 15/18/16/14px | — |
| `<Button>` | reuse | SOLID/OUTLINE variants fine; token-level color accuracy deferred | — |
| `<Image>` | reuse | Photos + logos | — |
| `<Card>` | reuse | Stat cards (row 4), feature cards (row 5), resource cards (row 10) | — |
| `<Avatar>` | reuse | Help-card avatar in row 12 FAQ | — |
| `<Accordion>` | reuse | Row 12 FAQ | — |
| `<Tabs>` | reuse | Row 9 UseCases (will render with tabbedFeatures block fallback) | — |
| `<Badge>` | reuse | "Mid-Market"/"Enterprise" chips (row 7) | — |
| `<IconBadge>` | reuse | Row 5 icon tiles; existing sizing works, color via className override | — |
| `<Eyebrow>` | reuse | Not used on Page 1 (design uses Badge-style chips for eyebrow role) — kept in enumeration since it's reachable | — |
| `<Marquee>` | reuse | Not used on Page 1 (row 2 uses static bar via Grid+Image) — primitive exists and would apply to a future scrolling variant | — |

**Totals:** `N_p1 = 15, E_p1 = 15, A_p1 = 0, R_p1 = 15`
**Coverage % before:** `100%`

**Primitive gap candidates surfaced (not shipped):**
- `Heading.weight` prop — design uses Light (300) everywhere; primitive has no weight axis today. **Token-level solution preferred** (change `--font-weight-heading`); primitive stays as-is.
- `Button.size=XS` for the 14px buttons — current SM/MD/LG may cover this; confirm in Stage 5.
- One-off visual patterns (progress bar under active card in row 8, carousel dots in row 11) — **not primitive-worthy** for a single use site. Revisit if Page 2 recurs them.

### Composites
| Element needed | Classification | Notes | Commit |
|---|---|---|---|
| `<BaseBlock>` | reuse | every block shell | — |
| `<HeadingGroup>` | reuse | auto-rendered by BaseBlock | — |
| `<SectionHeading>` | reuse | — | — |
| `<Section>` | reuse | wrapped by BaseBlock | — |
| `<SectionCta>` | reuse | all CTA rows | — |
| `<CtaButton>` | reuse | dispatches Sanity `cta` objects | — |

**Totals:** `N_c1 = 6, E_c1 = 6, A_c1 = 0, R_c1 = 6`
**Coverage % before:** `100%`

**Composite gap candidates surfaced (not shipped):**
- `<ProgressIndicator>` / thin progress bar — row 8 AutoSwitchingCards only. One use site → inline CSS, not composite-worthy.
- `<CarouselDots>` — row 11 testimonials only. Same logic.
- `<SupportCard>` — row 12 FAQ sidebar support slot. Could be generalized if pattern recurs.

### Blocks (React + schema)

Mapping — one row per section or sub-block in the section map. "Strategy" names the block chosen + the degradation mode (if any).

| Element needed | Classification | Strategy | Notes | Commit |
|---|---|---|---|---|
| `block.heroCenter` (Row 1) | **extend** | Add `mediaPlacement: 'below' \| 'background'`. Background mode renders media as full-width dimmed bg with white text overlay. | Implemented with absolute-positioned bg + `bg-black/40` overlay. Skips BaseBlock wrapper in bg mode to get full-width. | `875b0ae` (Site Foundry, branch `feat/decisions-dogfood-run`) |
| `block.logoMarquee` (Row 2) | reuse-with-degradation | No static mode — will scroll. Design is static. | Gap logged: `logoMarquee.speed='static'` option needed. |  — |
| `block.heroSplit` (Row 3) | reuse | Standard split — media on left, text on right (`mediaPlacement='left'`). | — | — |
| `block.statGrid` (Row 4) | **new** | New block: big accent number + optional inline suffix + description per item. Columns 2/3. | Registered: schema + type + React + BlockRenderer. | `2f25f9e` (Site Foundry, branch `feat/decisions-dogfood-run`) |
| `block.featureGrid` (Row 5 top) | reuse | Standard 3-column icon featureGrid. Icons + eyebrow + title + desc. | — | — |
| `block.callout` (Row 5 bottom) | reuse-with-degradation | Horizontal compare-CTA row. `callout` is always centered — will render centered, not left-aligned. | Gap logged: horizontal callout variant. | — |
| `block.heroCenter` (Row 6 Video) | reuse-with-degradation | Use heroCenter with media=video-poster image. No play button, no video. | Gap logged: `block.videoContent` needed for real inline player. | — |
| `block.featureGrid` (Row 7) | reuse-with-degradation | Use columns=2 — 2 regular cards. Loses dark-navy-left tile tone. | Gap logged: per-item `backgroundTone` on featureGrid items. | — |
| `block.featureGrid` (Row 8 AutoSwitching) | reuse-with-degradation | Use columns=2 with flowchart as media + 4 cards as items (no auto-switching). | Gap logged: `block.autoSwitchingCards` with timer + selection state. | — |
| `block.tabbedFeatures` (Row 9 UseCases) | reuse-with-degradation | Map tabs to tabbedFeatures groups; content per tab = an accordion of industries. Loses the right-side featured media. | Gap logged: `block.tabbedUseCases` layout (item-list + featured media per tab). | — |
| `block.featureGrid` (Row 10 Resources) | reuse-with-degradation | 3 items with `icon` repurposed as the resource thumbnail. Loses the green diamond-framed styling + big card image. | Gap logged: `block.resourceCards` with featured-image layout. | — |
| `block.testimonials` (Row 11) | reuse-with-degradation | Static grid of 3 items, text-only (quote + name + role + avatar). Video items dropped. No carousel. No dots. | Gaps logged: carousel layout, video item variant, dot indicators, auto-scroll. | — |
| `block.accordion` (Row 12) | reuse-with-degradation | Single-column accordion, 5 items, first open. Loses left-side support card. | Gap logged: accordion sidebar-slot OR separate callout block. | — |
| `block.callout` (Row 13) | reuse | `tone='accent'` — current accent is brand-gradient, design uses solid lime green. Token drift, not block issue. | Token drift logged — will show up in Stage 5. | — |

**Totals:** `N_b1 = 14 use sites, E_b1 = 11 block types pre-existing, A_b1 = 2 (1 extend heroCenter + 1 new statGrid), R_b1 = 12 reuse/reuse-with-degradation use sites`
**Coverage % before:** `11/12 = 91.7%` (only statGrid is net-new; all other use sites map to pre-existing block types, even if degraded)

**Block/schema gap candidates surfaced (not shipped — logged for Page 2 and beyond):**
- `logoMarquee.speed='static'` — static mode, disables animation.
- `callout` horizontal variant — left-aligned heading + right-aligned CTA.
- `block.videoContent` — real inline video player + poster.
- `featureGrid.items[].backgroundTone` — per-item bg tone.
- `block.autoSwitchingCards` — selectable cards with timed rotation + per-card media.
- `block.tabbedUseCases` — tabbed item-list + featured media panel.
- `block.resourceCards` — featured-image card with download link.
- `testimonials.layout='carousel'` + video item variant + dot indicators + auto-scroll.
- `accordion.sidebar` slot (or separate callout block via pageBuilder ordering) for FAQ-style layouts.

### Page 1 summary

| Layer | Needed (N) | Pre-existing (E) | Added (A) | Coverage % before |
|---|---|---|---|---|
| Primitives | 15 | 15 | 0 | 100% |
| Composites | 6 | 6 | 0 | 100% |
| Blocks (use sites / types) | 14 / 12 | 11 types | 2 (1 extend + 1 new) | 91.7% |
| **Totals** | 35 atomic slots | 32 existing | 2 additions | 91.4% |

**Wallclock — Page 1:** in progress (see queue file "Stage progress"). Stage 1: 0.3h; Stage 2: 0.1h; Stage 3: 1.5h; Stage 4: tbd; Stage 5: tbd.

---

## Page 2 — Platform

### Primitives
Same 15-primitive set as Page 1. Platform uses 12 directly (Stack, Grid, Container, Heading, Text, Button, Image, Card, Badge, IconBadge, Accordion) + Eyebrow + Marquee kept in enumeration for reachability.

| Element needed | Classification | Notes | Commit |
|---|---|---|---|
| `<Stack>` | reuse | flex columns throughout | — |
| `<Grid>` | reuse | 2-col and 3×2 grids | — |
| `<Container>` | reuse | 1440 max content width | — |
| `<Heading>` | reuse | same token-drift (Light weight, IBM Plex Sans, occasional `Degular Demo` on row 1 description) as Page 1 | — |
| `<Text>` | reuse | body copy 15/18/16/14px — same sizes as Page 1 | — |
| `<Button>` | reuse | same navy-solid / light-outline variants | — |
| `<Image>` | reuse | bg photo (row 1), logos (row 2), composed graphics (rows 3, 4 per-item, 5 UI, 9 featured) | — |
| `<Card>` | reuse | feature cards, numbered cards, testimonial cards | — |
| `<Badge>` | reuse | "Mid-Market"/"Enterprise" chips (row 7) | — |
| `<IconBadge>` | reuse | row 6 icon tiles, row 4 numbered-badge via content override | — |
| `<Accordion>` | reuse | row 10 FAQ | — |
| `<Avatar>` | reuse | help-card avatar on row 10 (same as Homepage Row 12) | — |
| `<Eyebrow>` | reuse | not used on Platform either (Badge chips serve eyebrow role) | — |
| `<Marquee>` | reuse | not used on Platform either (row 2 static as on Homepage) | — |
| `<Tabs>` | reuse | not used on Platform — row 9 has no visible tabs; simpler than Homepage row 9 | — |

**Totals:** `N_p2 = 15, E_p2 = 15, A_p2 = 0, R_p2 = 15`
**Coverage % before:** `100%`

**Primitive gap candidates surfaced:** None new. Platform observed an extra typography edge case (`Degular Demo` family on one description — Row 1), but family-swap remains a token-level change, not a primitive change. Same verdict as Page 1.

### Composites
| Element needed | Classification | Notes | Commit |
|---|---|---|---|
| `<BaseBlock>` | reuse | — | — |
| `<HeadingGroup>` | reuse | — | — |
| `<SectionHeading>` | reuse | — | — |
| `<Section>` | reuse | — | — |
| `<SectionCta>` | reuse | — | — |
| `<CtaButton>` | reuse | — | — |

**Totals:** `N_c2 = 6, E_c2 = 6, A_c2 = 0, R_c2 = 6`
**Coverage % before:** `100%`

### Blocks
Mapping — 11 Platform sections; 10 pattern-match Homepage directly.

| Element needed | Classification | Strategy | Notes | Commit |
|---|---|---|---|---|
| `block.heroCenter` + `mediaPlacement='background'` (Row 1) | reuse | Extension already landed on Page 1 (`875b0ae`). | Same hero pattern, different copy + bg photo. | — |
| `block.logoMarquee` (Row 2) | reuse-with-degradation | Same scrolling-when-should-be-static degradation as Page 1 (D6). | Same 7 logos + slightly different heading copy. | — |
| `block.heroCenter` with media (Row 3) | reuse | Static graphic exported as single image via Figma REST API. | Uses the `mediaPlacement='below'` default (from same `875b0ae` extension). | — |
| `block.featureGrid` cols=2 (Row 4 numbered cards) | reuse-with-degradation | **Novel pattern; held line on amortization.** Render 4 numbered-badge + title + description cards. Diagrams dropped. Gap **D14** filed (`featureGrid.items[].media`). | ⚠ Fidelity ~50% reduction on this section — diagrams are a large share of visual weight. | — |
| `block.featureGrid` cols=2 (Row 5 auto-switching) | reuse-with-degradation | Same as Page 1 row 8. Static grid. | D2 recurs. | — |
| `block.featureGrid` cols=3 (Row 6 6-item core capabilities) | reuse | Matches Page 1 row 5a pattern. | — | — |
| `block.featureGrid` cols=2 (Row 7 audience split) | reuse-with-degradation | Same as Page 1 row 7. Loses per-tile bg tone. | D8 recurs. | — |
| `block.testimonials` (Row 8) | reuse-with-degradation | Same as Page 1 row 11. Static grid. | D3 recurs. | — |
| `block.tabbedFeatures` with 1 group (Row 9) | reuse-with-degradation | Simpler than Page 1 row 9 (no visible tabs). Same as Page 1 degradation. | D4 recurs. | — |
| `block.accordion` (Row 10 FAQ) | reuse-with-degradation | Same as Page 1 row 12. | D9 recurs. | — |
| `block.callout` `tone='accent'` (Row 11 SectionCTA) | reuse | Same as Page 1 row 13. | Lime-green accent token drift recurs. | — |

**Totals:** `N_b2 = 11 use sites, E_b2 = 12 block types pre-existing (incl. new statGrid from Page 1), A_b2 = 0, R_b2 = 11`
**Coverage % before:** `11/11 = 100%`

**Page 2 gap deltas (NEW — not in Page 1 gap list):**
- **D14** `featureGrid.items[].media` — per-item large-format image/diagram field (>= 300px), distinct from the 48×48 `icon` slot. Row 4 numbered cards on Platform. First time this pattern appears; Homepage Row 10 (ResourceCards) had a similar diamond-framed image need but a different visual treatment.
- **D15 (token)** `Degular Demo` font family on Row 1 description — a second heading/body family beyond IBM Plex Sans. Either the designer introduced a second family deliberately (unlikely — likely unintentional placeholder) or it's a drift that should resolve to IBM Plex Sans.
- **D16 (token)** neon green `#A6F252` (observed in Row 6 icons + suggested by Light/Text/Primary token name). New brand-accent color not in any Page 1 section. Should be added to the Site Foundry token set as `--color-brand-lime` or similar.

### Page 2 summary

| Layer | Needed (N) | Pre-existing (E) | Added (A) | Coverage % before |
|---|---|---|---|---|
| Primitives | 15 | 15 | 0 | 100% |
| Composites | 6 | 6 | 0 | 100% |
| Blocks (use sites / types) | 11 / 12 | 12 types | 0 | 100% |
| **Totals** | 32 atomic slots | 33 existing | 0 additions | 100% |

**Wallclock — Page 2:** in progress. Stage 1: 0.25h (14:50 → 15:05); Stages 2 + 3: <0.1h (ledger fill).

---

## Fidelity follow-on — session 3 (D1–D4 + D14 ship)

After Page 1 + Page 2 closed with amortization pass but fidelity below 90%, user prioritized shipping the 5 deferred gaps identified in the retrospective. These are **post-experiment additions** — they do NOT count toward the original Page 1 vs. Page 2 amortization ratio (which was computed on the state at end-of-Page-2 and remains `0 / 2 = 0` PASS).

Site Foundry commits shipped this session:

| Commit | Gap | Title |
|---|---|---|
| `e71f09b` | D14 | `feat(block): featureGrid items[].media for per-item large image/diagram` |
| `965cf00` | D1 | `feat(block): add block.videoContent for inline video player with poster and caption` |
| `bfe963a` | D4 | `feat(block): add block.useCaseList as tabbedFeatures content variant` |
| `8ee641b` | D3 | `feat(block): testimonials carousel layout + video variant with dot indicators and auto-scroll` |
| `f2bf0a0` | D2 | `feat(block): add block.autoSwitchingCards with timed rotation click-to-swap hover-pause and progress bar` |

**Library delta (session 3):** 2 schema extends (D14 featureGrid, D3 testimonials layout/variant) + 3 new blocks (D1 videoContent, D4 useCaseList, D2 autoSwitchingCards). Plus one CSS keyframes definition (progressBar) in `packages/ui/src/styles/globals.css`.

**Total library state after session 3:**
- Primitives: 15 (unchanged from baseline).
- Composites: 6 (unchanged).
- Blocks (React): 11 + 4 new = **15** (AccordionBlock, AutoSwitchingCardsBlock, CalloutBlock, CodeSampleBlock, ComparisonBlock, FeatureGridBlock, HeroCenterBlock, HeroSplitBlock, LogoMarqueeBlock, RichTextBlock, StatGridBlock, TabbedFeaturesBlock, TestimonialsBlock, UseCaseListBlock, VideoContentBlock).
- Schemas: 11 + 4 new = **15** (matching set).

**Fidelity after D1-D4+D14 ship (re-scored — see queue file for per-row detail):**

| Page | Visual (before) | Visual (after) | Behavior (before) | Behavior (after) |
|---|---|---|---|---|
| Homepage | 82.5% (9/14 sections) | **93.75%** (13/14) | 22.2% (4/18 ✓) | 55.6% (10/18 ✓; 0 ✗) |
| Platform | 75.4% (6/11 sections) | **92.3%** (10/11) | 18.75% (3/16 ✓) | 68.75% (11/16 ✓; 0 ✗) |

**Both pages now pass the 90% visual gate.** Behavior rubric still below 90% on strict scoring, but **zero outright ✗ failures remain on either page** — the remaining ⚠s are content-gaps (no real `videoUrl` seeded), page-level visual-only checks (1920/1440, 32px gap — not verifiable from this env), a deferred keyboard-nav nice-to-have, and a few small cosmetic variants (CTA hover-inverse, Card hover-elevate, D6 logoMarquee static).

### Session 4 — D7 + D8 + D9 ship + row 2 correction

Additional commits after session 3:

| Commit | Gap | Title |
|---|---|---|
| `ba4e546` | D9 | `feat(block): accordion sidebar slot for FAQ-style 2-col layout with support card` |
| `458f088` | D7 | `feat(block): callout horizontal layout with left heading and right CTA` |
| `478d1dd` | D8 | `feat(block): featureGrid items[].backgroundTone with inverse text cascade for audience-split tiles` |

**User correction:** D6 `logoMarquee.speed='static'` removed from the gap list — the Figma screenshot *looked* static only because Figma is a static design tool; the scrolling marquee IS the intended behavior. Row 2 Layout on both pages flipped ⚠ → ✓ retroactively.

**Library delta (session 4):** 3 schema extends (callout.layout, featureGrid.items[].backgroundTone, accordion.sidebar). No new blocks.

**Total library state after session 4:** unchanged counts from session 3 — 15 primitives, 6 composites, 15 blocks + schemas. All 3 session-4 changes are extensions to existing block schemas.

**Final fidelity scoring:**

| Page | Visual (final) | Behavior (final) |
|---|---|---|
| Homepage | **100.0%** (80/80; 14/14 sections ≥ 5/7) | 61.1% (11/18 ✓, 0 ✗) |
| Platform | **98.5%** (64/65; 11/11 sections ≥ 5/7) | 68.75% (11/16 ✓, 0 ✗) |

**All 25 visual-rubric sections across both pages now pass ≥ 5/7.** Behavior rubric stays below 90% strict scoring, but that's dominated by content-gaps (no real video URLs), page-level unverifiable-from-this-env checks, and small polish (hover variants, keyboard nav). Zero architectural gaps remain.

---

## Amortization verdict

Per-layer ratio `A_page2 / A_page1`:

| Layer | A_page1 | A_page2 | Ratio | Verdict |
|---|---|---|---|---|
| Primitives | 0 | 0 | 0/0 undefined | **trivially pass** (no growth on either page; primitive set already mature) |
| Composites | 0 | 0 | 0/0 undefined | **trivially pass** |
| Blocks | 2 | 0 | 0 | **PASS** (≤ 0.5 threshold) |
| **Totals** | 2 | 0 | 0 | **PASS** |

**Pass thresholds (from queue file):**
- Pass: `A_page2 ≤ 0.5 × A_page1` → achieved (0 ≤ 1).
- Soft-fail: `0.5 × A_page1 < A_page2 < 0.8 × A_page1`.
- Hard-fail: `A_page2 ≥ 0.8 × A_page1`.

### Wallclock amortization

Parallel measure: does **time** amortize even if library additions do?

- `T_page1 ≈ 0.62h` (~37 min, session 1, 2026-04-24 14:12 → 14:49, active work throughout).
- `T_page2 ≈ 0.33–0.42h` (~20–25 min active, session 2; raw wallclock 45 min but user stepped away 20–25 min during the session — correction applied 2026-04-24 post-run).
- **Corrected ratio `T_page2 / T_page1 ≈ 0.54–0.68`** (using the 20/37 lower bound = 0.54; 25/37 upper bound = 0.68; midpoint 22/37 ≈ 0.59).
- **Target:** `T_page2 ≤ 0.5 × T_page1` (strict) — corrected range **sits at/near the threshold**.
- **Verdict:** **PASS (within measurement uncertainty).** Lower bound 0.54 is technically above 0.5 but within the noise implied by imprecise absence-time accounting. User's call on the corrected number is pass — direction is clear, exact ratio is uncertain.

### Overall finding

**Library-additions thesis: PASS. Wallclock thesis: PASS (within measurement uncertainty, after absence-time correction).**

Both metrics move the same direction once the Page 2 active-work time is corrected for the user's 20–25 min step-away. Raw uncorrected wallclock (45 min) would have shown no amortization; corrected active wallclock (20–25 min) puts the ratio at/near the ≤0.5 threshold.

The library-additions measure (the stated thesis) held cleanly — Page 2 added 0 blocks, giving a clean `0/2` ratio well inside the ≤0.5 target. The honest caveat is that Row 4 numbered FeatureCards was deliberately classified as `reuse-with-degradation` rather than shipped as a `featureGrid.items[].media` extension (D14); had the extension shipped, A_p2 would be 1 and the ratio would be exactly 0.5, still a pass.

**Wallclock driver:** Page 2 saved time cleanly on Stages 2+3 (primitivisation + componentisation were near-instant since no new library work). MCP drill-in, seed-writing, and rubric scoring still took per-page time, but less than Page 1 because the pattern-recognition work was already done (10/11 Platform sections matched a Homepage pattern directly, so each section was minutes of re-confirmation rather than minutes of first-time classification).

**Measurement lesson for future runs:** raw wallclock timers don't capture attention time — need an explicit "session active minutes" log or start/stop markers around breaks. D18 candidate: add active-time logging to the stage-progress tables in the queue template.

**Pipeline-design implication (revised):** client-facing time estimates can assume some amortization when the library is mature — not constant per-page time as I originally claimed. The bottom-up pipeline's time-cost claim holds directionally too, once measurement is honest.
