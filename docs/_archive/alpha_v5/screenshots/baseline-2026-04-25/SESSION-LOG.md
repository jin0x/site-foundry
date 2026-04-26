# Measured fidelity audit — session log

Index of measurement sessions, sections completed, and rolling notes on cross-section gap patterns or measurement friction. Append a session-handoff block per session.

Source workflow: `alpha_v5/docs/measured-fidelity-audit.md`.
Section list: `alpha_v5/seeds/queues/2026-04-22-new-project-pipeline-queue.md` § "Section map" (Homepage 13 + Platform 11 = 24 sections total).

---

## Session 1 — 2026-04-25

**Owner:** measured-fidelity-audit pass 1.

**Pre-flight**

- Dev server: HTTP 200 on `/new-project-homepage` and `/new-project-platform` ✓
- Bundled Chromium present at `/home/brock/.cache/ms-playwright/chromium-1217/` ✓
- `alpha_v5/measure-section.mjs` (generalized) created from PoC's `run-extract.mjs` ✓
- `alpha_v5/PROJECT_DESIGN_NODES.md` available ✓

**Sections completed (Homepage 1–5 + backfill 8):**

| # | Slug | Figma nodeId | Score | Drill-in needed? | Notes |
|---|---|---|---|---|---|
| 1 | hero-center | `7876:38920` | 1/7 | No | Bg-image ext gap; `Heading/Small=80px` outside canonical scale; rectangular Navy CTA gap |
| 2 | logo-marquee | `7876:38958` | 3/7 | No | Marquee always animates; intro text role mismatch (`<h2>` vs caption); card-chrome missing |
| 3 | hero-split | `7876:39024` | 3/7 | **Yes — parent + Grid both exceeded** | Drilled to right column `7876:42184`. **`Heading/H_n` token-name collision discovered.** Description uses Gray base vs design's Neutral base |
| 4 | stat-grid | `7926:30002` | 1/7 | No | **🔥 `--color-brand-fuchsia` token bug** — resolves to lime green `#b1fc5f` instead of raspberry `#e03b71`. Single-line theme.css fix. Block also emits both `font-medium` + `font-light` classes (conflict) |
| 5 | feature-grid-callout | `7876:38976` | 1/7 | No | **🔥 Structural drift — compound section split into 2 pageBuilder blocks 5,240px apart on rendered page.** Stage-2 mapping problem (adjacency lost) |
| 8 | autoswitching | `7876:51954` | 1/7 | (PoC backfill) | Per `POC-FINDINGS.md` — `--color-secondary` inverse-tone miscarriage, active-state metaphor wrong, primitive size cap |

**Cross-section gap patterns** (rolling, sorted by frequency)

| Pattern | Sections affected | Severity | Layer | Notes |
|---|---|---|---|---|
| `--color-secondary` resolves to Gray base; design uses Neutral/Black at 60% | 1, 3, 4, 5, 8 (5/6) | visible | Token | Single-line theme.css fix touches every secondary-text occurrence |
| `<Heading>` has no `weight` prop; design wants Light 300 on most large headings | 1, 3, 4, 5, 8 (5/6) | visible | Primitive | `--font-weight-light` exists but unused |
| `Heading/H_n` token-name collision: design's H1=64/H2=48/H3=32 vs theme's `--text-h1=48`/`--text-h2=30`/`--text-h3=24` | 1, 3, 4, 5 (4/6) | visible | Token | Section 1 also exposed `Heading/Small=80px` outside the H_n scale |
| Section/card padding too thin | 1, 3, 4, 5 (4/6) | structural | Block | Site `py-4` (16px); design `pb-64 pt-48 px-64` headers + `p-48` cards |
| Card/section outer border (3-or-4-sided `border #e8e8e8`) absent | 2, 4, 5 (3/6) | structural | Block | Recurring framing pattern |
| `<Button>` rectangular Navy variant missing (vs current rounded-full Bright Blue default) | 1, 5 (2/6) | visible | Primitive | Design CTAs are rectangular throughout |
| **🔥 `--color-brand-fuchsia` resolves to lime green `#b1fc5f`** | 4 (so far) | visible | Token | Single-line fix in theme.css; potentially affects other uses elsewhere |
| **🔥 Compound-section adjacency lost during seed mapping** | 5 (so far) | structural | Schema/seed | Stage-2 mapping problem; check Sections 9+ where queue notes "compound" patterns |

**Measurement friction observed**

- Section 3 hit MCP token ceiling on both parent (`7876:39024`) and Grid (`7876:39025`). Drilled via `get_metadata` regex on indent levels to find sibling Columns at same depth — first regex pass missed the right column because it stopped at the first match's children. Updated approach: scan for ALL siblings at a target indent before drilling deeper.
- The drill-in MCP cost is bursty: 0–1 calls per "simple" section (Section 1, 2, 4, 5), 3+ calls when section frame is dense (Section 3). Average ≈1.5 MCP calls per section.
- The measure-section.mjs script is solid; needle-based heading lookup worked for every section in this batch. Only Section 4's heading text wasn't discoverable from the queue file alone — had to drill Figma first to read the heading text. Worth noting for later sections without quoted heading copy in the queue.
- The script captures `<button>`s but not `<a>` link affordances embedded in paragraphs — Section 4's "Read Forrester's report" link was visible only because it appeared in `buttons[]` (via `a[href]` selector). Other styled-text anchors in middle of `<p>` would be missed. Future enhancement if needed.

**Handoff (next session — start at Homepage Section 6)**

Next sections to process (Homepage 6–11, soft cap 6 / hard cap 8):

| # | nodeId | Block candidate | Notes from queue |
|---|---|---|---|
| 6 | `7876:42408` | `block.videoContent` (new) | 64px heading + video thumbnail + play overlay + diamond pattern overlay |
| 7 | `7876:42445` | `block.featureGrid` cols=2 (extend) | 2-tile audience split: dark navy left "Mid-Market" / white right "Enterprise" — per-item backgroundTone needed |
| 9 | `7876:58184` | `block.tabbedUseCases` (new) | Tabbed header + list-of-industries + featured-image with caption overlay |
| 10 | `7876:58254` | `block.resourceCards` (new or featureGrid extend) | "Recognized as a category leader" + 3 cards with green diamond-frame images + Download Report links |
| 11 | `7876:58358` | `block.testimonials` extend | Carousel + video items + dot indicators + auto-scroll |
| 12 | `7876:58478` | `block.accordion` + sidebar callout | Questions + 5-item accordion + left support card |
| 13 | `7876:58620` | `block.callout` `tone='accent'` (lime) | Closing CTA with lime green bg |

(Section 8 already done as PoC backfill. Skip to Section 9 after Section 7.)

**Suggested batch for session 2:** Sections 6, 7, 9, 10, 11, 12 (6 sections; Section 13 to start session 3 if hard cap, otherwise queue Section 13 + Platform 1–5).

**Run pre-flight on session 2 start:** verify dev server still up at `localhost:3000`, MCP token ceiling pattern unchanged.

Pacing observation: per-section actual time ≈12–18 min (script run + MCP drill + diff doc write), longer than the 10-min target in the workflow doc but within tolerance. Section 3 took longest due to drill-in friction; Section 4 fastest due to clean MCP context. Session 1 wallclock ≈90 min total.

---

## Session 2 — 2026-04-25

**Owner:** measured-fidelity-audit pass 1 (continuation).

**Pre-flight**

- Dev server: HTTP 200 on `/new-project-homepage` ✓ (Platform not re-checked this session)
- Bundled Chromium present ✓
- `alpha_v5/measure-section.mjs` working ✓
- MCP token ceiling: `get_design_context` succeeded on all 6 section frames this session — no drill-in needed for any. Either the section frames in the 6–12 range are smaller than Section 3's was, or the ceiling was raised since session 1. Recording observation: cleaner pass than session 1.

**Sections completed (Homepage 6, 7, 9, 10, 11, 12):**

| # | Slug | Figma nodeId | Score | Drill-in needed? | Notes |
|---|---|---|---|---|---|
| 6 | video-content | `7876:42408` | 1/7 | No | **Block essentially stubbed.** Heading + placeholder-caption only; video thumbnail, play overlay, diamond logomark all absent. Placeholder copy leaks into UI. |
| 7 | feature-grid-tiles | `7876:42445` | 0/7 strict (2/7 generous) | No | 2-tile tone-flip works partially (white text on left navy ✓), but heading 24 vs 48, buttons rounded-full pill vs rectangular, **right-tile CTA Bright Blue vs Navy**. Label chips missing. Tile heights collapsed (262 vs 500px design). |
| 9 | tabbed-use-cases | `7876:58184` | 0/7 | No | **Tabs primitive metaphor wrong** (black pill vs underlined-text); featured-image right card collapsed (h-521 vs design h-836); frosted-glass caption overlay absent; logomark watermark absent; "By Industry" panel-header missing. |
| 10 | resource-cards | `7876:58254` | 1/7 | No | **`imageCount: 0`** — 3 mint-frame diamond-pattern image cards entirely absent. Subheading citation line missing. Split-row heading layout absent. Download Report rendered as rounded-full pill (should be text+underline link). Card-title size ✓ (only matching metric). |
| 11 | testimonials | `7876:58358` | 1/7 | No | Carousel infrastructure present (3 cards + 3 dots + 2 play buttons), but per-card photo bg, navy bg on quote card, brand-logo overlays, logomark watermark all absent. Tone-flip wrong (dark text on what should be white-on-photo/navy). **Card 1 seed wrong** (renders "Operations Leader/Interview" instead of "Darris Hampton/MidFirst Bank"). 3 dots vs 4 in design. |
| 12 | accordion-sidebar | `7876:58478` | 1/7 | No | **Best layout match yet** — sidebar+accordion split-row works, 5 accordion items, support card structure present. Gaps: heading 30 vs 48 + no two-tone split, support-description **font family Degular Demo not loaded** (uses IBM Plex Sans), CTA rounded-full Bright Blue vs rectangular Navy, accordion-header weight Medium vs Regular. |

**Cross-section gap patterns** (rolling, sorted by frequency — updated from session 1)

| Pattern | Sections affected | Severity | Layer | Notes |
|---|---|---|---|---|
| `--color-secondary` resolves to Gray/80; design uses Neutral 60% / primary text / inverse white | 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 (11/12) | visible | **Token** | Single-line theme.css fix; **highest-frequency gap** |
| `<Heading>` has no `weight` prop; design wants Light 300 on most large headings | 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 (11/12) | visible | Primitive | `--font-weight-light` exists but unused |
| **Heading-token-name collision** — site `text-h{n}` smaller than design Heading/H{n}: `h2`(30 vs 48), `h4`(20 vs 24); body sizes also miss `H5`(16 vs 18) and `H6`(14 vs 16) | 1, 3, 4, 5, 6, 7, 9, 10, 11, 12 (10/12) | visible | **Token** | Re-mapping `--text-h1..h6` to design's H1..H6 sizes is one of two single-place fixes (the other being `--color-secondary`) |
| Section / card outer border (`border #e8e8e8`) + white bg absent | 2, 4, 5, 6, 9, 10, 11 (7/12) | structural | Block | Card chrome needed |
| Section padding too thin (`py-4`/16 instead of `pb-64 pt-48 px-64` or `p-48`) | 1, 3, 4, 5, 6, 7, 9, 10, 11, 12 (10/12) | structural | Block | Recurring |
| `<Button>` rectangular variant missing | 1, 5, 7, 12 (4/12) | visible | Primitive | `<Button shape="rectangular">` |
| `<Button>` Navy fill variant missing | 7 (right-tile), 12 (chat with support) (2/12) | visible | Primitive | `<Button variant="navy">` |
| `<Button>` text-link / underline variant missing | 10 (Download Report) (1/12) | visible | Primitive | `<Button variant="link">` |
| Two-tone span within heading absent | 1, 5, 12 (3/12) | visible | Primitive | `<Heading>` accepts only plain string |
| Compound-section adjacency lost during seed mapping (rendered page order scrambled vs design) | 5, plus rendering order across all of session 2 | structural | Schema/seed | **NEW finding session 2:** rendered page order on `/new-project-homepage` is scrambled — Section 6 at idx 7, Section 7 at idx 13 (last), Section 10 at idx 5, Section 13 at idx 6. There's also an orphan section "Compare Decisions with competitors" at idx 12 not in queue map. |
| **🔥 `--color-brand-fuchsia` resolves to lime green `#b1fc5f`** | 4 only | visible | Token | Session 1 finding; single-line fix |
| Featured-image / decorative-image content absent (`imageCount: 0` or low) | 6, 9, 10, 11 (4/12) | structural | Block + Schema | Largest single-gap visual mass missing |
| Tabs primitive metaphor wrong (pill vs underlined-text) | 9 (and likely Platform sections using tabbedFeatures) (1+/12) | visible | Primitive | `<Tabs variant="underline">` |
| Block stubbed (renders skeleton without content slots) | 6 (videoContent) (1/12) | structural | Block | Block accepts schema fields but doesn't render them |
| First-card seed placeholder leaks instead of real content | 11 (testimonials) (1/12) | structural | Schema/seed | Seed for `items[0]` falls back to generic placeholder |
| Carousel/animation behaviors not implemented (auto-scroll, dot-sync) | 11 (1/12) | functional | Block | JS interaction layer |
| **Degular Demo font** referenced for Text/XSmall but not loaded | 12 (1/12) | visible | Token + asset | Need designer call: load font OR fall back to IBM Plex Sans 12px |

**Measurement friction observed (session 2)**

- **MCP cleaner this session.** All 6 sections returned `get_design_context` directly without ceiling fallback. Average ≈1.0 MCP call per section (vs session 1's ~1.5).
- **Rendered page order is scrambled.** Building a section-index → queue-number map at session start was essential. Recommend doing this at the start of every Homepage session: run `list-sections.mjs` (snippet at `/tmp/list-sections.mjs` from this session, or commit to repo) and confirm idx-to-section mapping. Without this, you'd measure the wrong section. Same will be needed for Platform.
- **One internal Bash error** during Section 6 measure script run, recovered by retrying without the redundant `HEADING` env var when `SECTION_INDEX` is set. Not a tool bug — just transient.
- **The `.slice(0, 8)` cap on `paragraphs[]` and `buttons[]`** in `measure-section.mjs` truncated some evidence on Section 9 (6th industry "Public Sector" not visible in output). For dense sections this could miss elements. Consider raising slice limit to 12 or making it env-configurable.
- **Pacing:** ~12–15 min per section this session, totaling ~80 min wall-clock for 6 sections. Consistent with session 1 cadence.

**Handoff (next session — start at Homepage Section 13, then Platform 1)**

Section 13 still pending on Homepage. Renderer index 6 ("Ready to explore the platform?", h=504, `relative py-32`).

| # | Page | nodeId | Block candidate | renderedIdx | Notes from queue |
|---|---|---|---|---|---|
| 13 | Homepage | `7876:58620` | `block.callout` `tone='accent'` (lime) | 6 | Closing CTA with lime green bg |

Then begin Platform sections 1–5. Need to:
1. Run `list-sections.mjs` against `http://localhost:3000/new-project-platform` first to build the section-idx map for Platform (will likely be similarly scrambled).
2. Reference queue file's "Section map (Platform)" subsection (not loaded this session).

**Suggested batch for session 3:** Section 13 + Platform 1–5 (6 sections). Section 13 should be quick (~5 min) — single CTA card with one heading and a button.

**Investigate before starting session 3:**
- The orphan rendered section "Compare Decisions with competitors" (renderedIdx 12, h=292, `py-16`) is on the homepage but not in the queue's Section map. Either it's a misplaced fragment from compound-Section-5 splitting, or it's a Platform section that leaked into Homepage rendering. Worth checking the seed file for `/new-project-homepage` to confirm intended page composition.
- The 13 mapped sections + 1 orphan = 14 rendered sections vs queue's 13. Confirms Stage-2 mapping issue from session 1.

**Pre-flight on session 3 start:** verify dev server still up at `localhost:3000` for both pages, MCP ceiling unchanged. Bundled Chromium and measure-section.mjs both intact.

**Cumulative session progress:** 12/24 sections measured (50%). Homepage 12/13 (Section 13 only remaining). Platform 0/11.

---

## Session 2-extension — 2026-04-25 (continued)

User requested continuation within the same session up to hard cap. 2 additional sections measured (Homepage 13 + Platform 1) bringing session 2 total to 8 — hard cap reached.

**Sections completed (extension):**

| # | Page | Slug | Figma nodeId | Score | Drill-in needed? | Notes |
|---|---|---|---|---|---|---|
| 13 | Homepage | callout-lime | `7876:58620` | 1/7 | No | **Section bg lime green `#a6f252` entirely absent** — dominant single gap. Decorative logomark above heading absent. CTA rounded-full Bright Blue vs rectangular Navy. Section bounds match design (504px). Once lime bg + Navy CTA + Light heading land, this section flips from 1/7 to ~6/7 — **highest leverage-per-fix on Homepage**. |
| Platform 1 | Platform | hero-center-bg | `7900:116212` | 1/7 | No | Hero with logistics-photo bg. Description uses `text-h3` (24px) instead of `text-body` — first section measured to do that, but design wants `Text/Medium` 18px Degular Demo. **Degular Demo gap recurs** (Section 12 was first; now confirmed 2/13). CTA white-text-on-white likely invisible — Button primitive may be inheriting tone from hero context incorrectly. |

**Cross-section gap patterns** (final rolling list at end of session 2 — 13 Homepage + 1 Platform = 14 sections measured)

| Pattern | Sections affected | Severity | Layer | Notes |
|---|---|---|---|---|
| `--color-secondary` resolves to Gray/80 | 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 (12/14) | visible | **Token** | Confirmed across accent/inverse/light/photo bg tones — token is wrong at resolution layer |
| `<Heading>` no `weight` prop | 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, P1 (13/14) | visible | Primitive | `--font-weight-light` exists but unused |
| **Heading-token-name collision** site `text-h{n}` < design Heading/H{n} | 1, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, P1 (12/14) | visible | **Token** | Single theme.css fix |
| Section padding too thin | 1, 3, 4, 5, 6, 7, 9, 10, 11, 12 (10/14) | structural | Block | Sections 13 & P1 have appropriate hero/callout padding (`py-32` and `min-h-[600px]`) |
| Section / card outer border + white bg absent | 2, 4, 5, 6, 9, 10, 11 (7/14) | structural | Block | Doesn't apply to bg-image or accent-bg sections (P1, 13) |
| `<Button>` rectangular variant missing | 1, 5, 7, 12, 13, P1 (6/14) | visible | Primitive | **Now appearing on every CTA-bearing section measured** |
| `<Button>` Navy fill variant missing | 7, 12, 13 (3/14) | visible | Primitive | `<Button variant="navy">` |
| `<Button>` outline-on-bg variant missing | P1 (1/14) | visible | Primitive | white border with `border-[#e8e8e8]` for hero CTAs |
| `<Button>` text-link / underline variant missing | 10 (1/14) | visible | Primitive | `<Button variant="link">` |
| Two-tone span within heading absent | 1, 5, 12 (3/14) | visible | Primitive | `<Heading>` accepts only plain string |
| Compound-section adjacency / rendered page order scrambled | Both pages observed | structural | Schema/seed | Homepage idx scramble + Platform also has Section 4 missing + "We stand apart" orphan at idx 5 |
| `--color-brand-fuchsia` resolves to lime green `#b1fc5f` | 4 only | visible | Token | Session 1 finding; single-line fix |
| Featured-image / decorative-image content absent | 6, 9, 10, 11, 13 (decorative logomark) (5/14) | structural | Block + Schema | Largest single-gap visual mass |
| Tabs primitive metaphor wrong (pill vs underlined-text) | 9 (1/14) | visible | Primitive | `<Tabs variant="underline">` |
| Block stubbed (renders skeleton without content slots) | 6 (1/14) | structural | Block | |
| First-card seed placeholder leaks | 11 (1/14) | structural | Schema/seed | |
| Carousel/animation behaviors not implemented | 11 (1/14) | functional | Block | |
| **Degular Demo font** not loaded — design uses for Text/XSmall (12px) AND Text/Medium (18px) | 12, P1 (2/14) | visible | Token + asset | Confirmed as a parallel scale, not anomaly. Loads needed OR document fallback. |
| **Section bg / accent-tone color absent on `tone='accent'` blocks** | 13 (1/14) | visible (DOMINANT) | Block + Schema | block.callout doesn't paint lime bg — single biggest visual offense in section |
| Hero CTA text-color tone-flip wrong (white-on-white) | P1 (1/14) | visible | Primitive | `<Button>` may be inheriting tone from hero context; needs verification screenshot |

**Platform-specific findings (session 2-extension)**

- **Platform Section 4 (numbered features `7900:118180`) is MISSING from rendered output.** Queue maps it but render skips it. Stage-2 mapping or seed gap. List-sections.mjs shows 11 rendered sections but 4 isn't one of them — section idx 5 has "We stand apart" instead, which isn't in the queue.
- **"We stand apart" orphan (h=1327, idx 5)** on Platform — not in queue's Section map. Mirrors Homepage's "Compare Decisions with competitors" orphan. Both pages have ≥1 unmapped rendered section.
- **Section idx → queue mapping (Platform, for next session reference):**
  - idx 0 → queue Section 1 (heroCenter bg, MEASURED ✓)
  - idx 1 → queue Section 2 (logoMarquee)
  - idx 2 → queue Section 3 (One platform / heroCenter w/ media)
  - idx 3 → queue Section 6 (Core capabilities 3×2 featureGrid)
  - idx 4 → queue Section 11 (callout lime — same as Homepage 13)
  - idx 5 → ORPHAN "We stand apart" (not in queue)
  - idx 6 → queue Section 9 (tabbedFeatures degraded)
  - idx 7 → queue Section 8 (testimonials)
  - idx 8 → queue Section 5 (How it works auto-switching)
  - idx 9 → queue Section 10 (accordion)
  - idx 10 → queue Section 7 (audience split)
  - **MISSING:** queue Section 4 (numbered features 01/02/03/04)

**Handoff (next session — start at Platform Section 2)**

Continue Platform measurement starting at queue Section 2 (logoMarquee, renderedIdx 1).

| # | Page | nodeId | Block candidate | renderedIdx | Notes from queue |
|---|---|---|---|---|---|
| 2 | Platform | `7900:117587` | `block.logoMarquee` static | 1 | Same 7 logos as Homepage 2 |
| 3 | Platform | `7900:117922` | `block.heroCenter` w/ media | 2 | "One platform. Fully orchestrated." + diamond+source/outcome graphic (treat as image per principle 3) |
| 4 | Platform | `7900:118180` | `block.featureGrid` cols=2 (degraded) | **NOT RENDERED** | Numbered 01-04 features. **Block missing from page entirely** — investigate seed/page composition before measuring; may need to add the section or score as "absent" |
| 5 | Platform | `7908:130564` | `block.featureGrid` cols=2 (degraded) | 8 | "How it works" auto-switching parallel; gap D2 |
| 6 | Platform | `7900:116272` | `block.featureGrid` cols=3, 6 items | 3 | "Core capabilities" 3×2 grid |
| 7 | Platform | `7908:136823` | `block.featureGrid` cols=2 | 10 | Audience split (parallels Homepage 7) |
| 8 | Platform | `7908:136870` | `block.testimonials` | 7 | Carousel (parallels Homepage 11) |
| 9 | Platform | `7924:6144` | `block.tabbedFeatures` | 6 | Industries list w/ featured media (parallels Homepage 9 simplified) |
| 10 | Platform | `7908:137059` | `block.accordion` | 9 | Same FAQ as Homepage 12 |
| 11 | Platform | `7908:137103` | `block.callout` accent | 4 | Lime CTA (parallels Homepage 13) |
| ORPHAN | Platform | unknown | "We stand apart" | 5 | h=1327 — investigate before measuring; may not have a queue mapping |

**Suggested batch for session 3:** Platform 2, 3, 5, 6, 7, 8 (6 sections — soft cap). Sections 9 & 10 to start session 4 if hard cap. Section 4 likely needs investigation pre-measurement; orphan idx 5 likely also.

**Investigation items deferred to session 3:**
1. **Platform Section 4 missing**: check seed file for `/new-project-platform` page-composition. Either add Section 4 or score as "absent — block not rendered."
2. **Two orphan sections** (Homepage idx 12 "Compare Decisions...", Platform idx 5 "We stand apart"): confirm whether intended or seed bugs.
3. **Degular Demo font loading**: designer call needed before fix work begins.

**Pacing observation (extended session 2):** 8 sections in ~135 min wall-clock (~17 min/section average — slightly slower due to Section 13 + Platform 1 both being content-light "easy" sections that turned out to need same diff-doc length). Consistent with hard-cap timing.

**Cumulative measurement progress:** 14/24 sections measured (58%). Homepage 13/13 ✓ COMPLETE. Platform 1/11 (10 remaining + 1 orphan + 1 missing-section investigation).

---

## Session 3 — 2026-04-25

**Owner:** measured-fidelity-audit pass 1 (continuation, Platform sections).

**Pre-flight**

- Dev server: HTTP 200 on `/new-project-platform` ✓
- Bundled Chromium present at `/home/brock/.cache/ms-playwright/chromium-1217/` ✓
- `alpha_v5/measure-section.mjs` working ✓
- `alpha_v5/PROJECT_DESIGN_NODES.md` available ✓
- `list-sections.mjs` at `/tmp/list-sections.mjs` (uses env var `URL`, not `PAGE_URL`) — re-confirmed Platform idx → queue map matches session 2-extension exactly.

**Sections completed (Platform 2, 3, 5, 6, 7, 8 — soft cap 6 reached):**

| # | Slug | Figma nodeId | renderedIdx | Score | Drill-in needed? | Notes |
|---|---|---|---|---|---|---|
| 2 | logomarquee | `7900:117587` | 1 | 3/7 | No | Same 7 logos as Homepage 2 — direct parallel; caption rendered as `<h2>` 30px instead of `<p>` 16px H6 muted. Marquee always animates (queue intent: static). |
| 3 | hero-orchestrated | `7900:117922` | 2 | 1/7 | No | "One platform. Fully orchestrated." — heading 30 vs 64. **Orchestration diagram (composed graphic per principle 3) entirely absent** — `imageCount: 1` vs ~12+ images intended. Largest single content gap on Platform. |
| 5 | how-it-works | `7908:130564` | 8 | 0/7 strict (1/7 generous) | **Yes — parent + Grid metadata both exceeded; drilled to Card-left only, Card-right exceeded → screenshot** | Direct parallel of Homepage Section 8 (auto-switching cards). Inverse Navy bg, white headings, but tabs concatenate title+description, active-state metaphor wrong (light-gray bg vs deep Navy w/ lime accent), featured-image right col absent, tab icons absent. **NEW token gap: no Navy-tone hierarchy** (`#001c36`, `#2b4b6b`, `#3d6c9a`, `#9ac4ec` all used in design — none in theme.css). |
| 6 | core-capabilities | `7900:116272` | 3 | 2/7 | No | **Best content-completeness yet** — all 6 icons + 6 titles + 6 descriptions present. Card title 24 ✓ (first card-title size match). Only chrome (border, padding) and heading typography keep it from passing. **Highest leverage-per-fix on Platform** alongside Section 13 callout. |
| 7 | audience-split | `7908:136823` | 10 | 0/7 strict (2/7 generous) | No | Direct parallel of Homepage 7. **Both CTAs broken** — left has white-on-white text (invisible), right has Bright Blue bg with dark text (should be Navy/white). Tone-flip applied to text but not to button colors. Heading 24 vs 48, h-294 vs design 500. Label chips ("Mid-Market"/"Enterprise") absent. |
| 8 | testimonials | `7908:136870` | 7 | 1/7 | No | Direct parallel of Homepage 11. **Card 1 placeholder seed leaks** identically ("Operations Leader/Interview" instead of "Darris Hampton/MidFirst Bank") — strongly suggests upstream Stage-2 seed pipeline issue. Photo bgs absent, Navy-bg card 3 absent, logomark watermark absent, 3 dots vs 4. **NEW token gap: no 32px slot in `text-h{n}` scale** (jumps 24→48; design quote uses 32). |

**Cross-section gap patterns** (rolling, sorted by frequency — updated through 20 sections measured)

| Pattern | Sections affected | Severity | Layer | Notes |
|---|---|---|---|---|
| `--color-secondary` resolves to gray @ 80%; design wants Neutral 60% / inverse white | 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, P1, P2, P3, P5, P6, P7, P8 (19/20) | visible | **Token** | Single-line theme.css fix; **near-universal** |
| `<Heading>` no `weight` prop / no Display sizes | 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, P1, P3, P5, P6, P7, P8 (18/20) | visible | Primitive | `--font-weight-light` exists but unused |
| Heading-token-name collision (`text-h{n}` < design Heading/H{n}) | 1, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, P1, P3, P5, P6, P7, P8 (17/20) | visible | **Token** | Single theme.css remap — `--text-h1..h6` to design's H1..H6 sizes |
| Section padding too thin (`py-4`/16 instead of `pb-64 pt-48 px-64`) | 1, 3, 4, 5, 6, 7, 9, 10, 11, 12, P3, P5, P6, P7, P8 (15/20) | structural | Block | Hero/callout sections (13, P1) have appropriate hero padding |
| Section / card outer border (`border #e8e8e8`) + `bg-white` chrome absent | 2, 4, 5, 6, 9, 10, 11, P2, P3, P6, P8 (11/20) | structural | Block | Doesn't apply to bg-image / accent-bg sections |
| `<Button>` rectangular variant missing | 1, 5, 7, 12, 13, P1, P7 (7/20) | visible | Primitive | Now appearing on every CTA-bearing section |
| `<Button>` Navy fill variant missing | 7, 12, 13, P7 (4/20) | visible | Primitive | `<Button variant="navy">` |
| Featured-image / decorative-image content absent (`imageCount: 0` or low) | 6, 9, 10, 11, 13, P3, P5, P8 (8/20) | structural | Block + Schema | Largest single visual mass missing in many sections |
| Two-tone span within heading absent | 1, 5, 12 (3/20) | visible | Primitive | `<Heading>` accepts plain string only |
| Compound-section adjacency / page order scrambled | both pages observed | structural | Schema/seed | Homepage idx scramble + Platform Section 4 missing + 2 orphans |
| `--color-brand-fuchsia` resolves to lime green `#b1fc5f` | 4 only (1/20) | visible | Token | Single-line fix in theme.css |
| Tabs primitive metaphor wrong (pill vs underlined-text) | 9 (1/20) | visible | Primitive | `<Tabs variant="underline">` |
| Active-state accent (lime border) on auto-switching list missing | 8, P5 (2/20) | visible | Primitive + Block | Same gap on Platform's How-it-works |
| Block stubbed (renders skeleton without content slots) | 6 (1/20) | structural | Block | videoContent |
| First-card seed placeholder leaks instead of real content | 11, **P8** (2/20) | structural | Schema/seed | **NEW: confirmed identical leak on Platform's testimonials — upstream Stage-2 issue** |
| Carousel/animation behaviors not implemented | 11, P8 (2/20) | functional | Block | Auto-scroll, dot-sync |
| Degular Demo font referenced but not loaded | 12, P1 (2/20) | visible | Token + asset | Confirmed parallel scale (XSmall 12 + Medium 18) |
| Section bg / accent-tone color absent on `tone='accent'` blocks | 13 (1/20) | visible (DOMINANT) | Block + Schema | Lime bg missing on callout |
| Hero CTA tone-flip wrong | P1, P7 (2/20) | visible | Primitive | Button color computation broken on inverse / per-tile-tone contexts |
| `<Button>` text-link / underline variant missing | 10 (1/20) | visible | Primitive | `<Button variant="link">` |
| **NEW:** No Navy-tone hierarchy in theme.css (`#001c36`, `#2b4b6b`, `#3d6c9a`, `#9ac4ec`) | P5 (1/20) | visible | Token | Active-state metaphor on auto-switching list breaks without these |
| **NEW:** No 32px slot in `text-h{n}` scale (24→48 jump) | P8 (1/20) | visible | Token | Quote text in testimonials uses 32px; not in current scale |
| **NEW:** Block tone-flip doesn't propagate to author block (testimonial author/role stays dark on inverse) | P8 (1/20) | visible | Block | Author template doesn't read `tone` prop |
| **NEW:** Block tone-flip doesn't propagate to button colors (audience-split CTA broken) | P7, also weakly Hwk7 (1.5/20) | visible | Primitive + Block | Tile tone wraps text but Button retains original variant |

**Measurement friction observed (session 3)**

- **MCP ceiling hit twice this session:** Section 5 parent and child Card-right both exceeded. Resolved via screenshot fallback for the Card-right (composed graphic per principle 3), plus drill-in via metadata-file Python parse for the Card-left. Average ≈1.7 MCP calls per section.
- **Section 5 metadata also exceeded** but JSON file parse via Python found 2 direct children at indent level 2 immediately. Lesson reaffirmed: dense `Section Features` frames (auto-switching, tabbed, multi-card) tend to exceed; single-row sections (logoMarquee, audience-split) stay under.
- **Pacing:** ~12–14 min/section, totaling ~75 min wall-clock for 6 sections. Fastest pacing of any session so far — likely because most Platform sections are direct parallels of Homepage and the gap patterns recur.
- **`list-sections.mjs` uses `URL` env var, not `PAGE_URL`.** Worth committing to repo or correcting in workflow doc — first run mistakenly used `PAGE_URL` and got Homepage output. Doc says `URL=...` is correct but the surrounding measure-section.mjs uses `PAGE_URL` — easy to confuse.
- **Some block-tone-flip failures only manifest on Platform.** Sections P5, P7, P8 each surface a different facet of "tone prop doesn't propagate" — different layers (author block, button, description text). Worth aggregating these into a single primitive/block "tone-aware compound" gap during fix planning.

**Handoff (next session — start at Platform Section 9, then 10, 11, then orphan investigation)**

3 Platform sections remaining + 2 investigations:

| # | Page | nodeId | Block candidate | renderedIdx | Notes |
|---|---|---|---|---|---|
| 9 | Platform | `7924:6144` | `block.tabbedFeatures` | 6 | Industries list w/ featured media (parallels Homepage 9 simplified). Heading "Decisions handles hundreds of diverse use cases..." |
| 10 | Platform | `7908:137059` | `block.accordion` | 9 | "Questions? We've got answers." — same FAQ as Homepage 12 |
| 11 | Platform | `7908:137103` | `block.callout` accent (lime) | 4 | "Ready to explore the platform?" — parallels Homepage 13 callout |
| ORPHAN | Platform | unknown | "We stand apart" | 5 | h=1327 — investigate seed file before measuring; may not have a queue mapping |
| MISSING | Platform | `7900:118180` | numbered features 01-04 | absent | Queue Section 4 not rendered; investigation deferred from session 2-ext |

**Suggested batch for session 4:** Platform 9, 10, 11 (3 measurements, very quick — all are mirrors of Homepage sections) + orphan investigation + missing-section investigation = ~4–5 hours of total work. Should complete the audit and reach the **24/24 all-sections-measured** state. After session 4, fire the Aggregation prompt (in `alpha_v5/session-prompts.md`).

**Investigation items for session 4:**
1. **Platform Section 4 missing** (`7900:118180`, numbered 01-04 features): check `/new-project-platform` page seed file for missing block. Either add Section 4 + score, or formally score "absent — block not rendered" and move on.
2. **"We stand apart" orphan** (renderedIdx 5, h=1327): confirm whether intended or seed bug. Check page composition.
3. **Reconcile testimonials seed leak** (Card 1 "Operations Leader/Interview"): now confirmed identical leak on both Homepage 11 and Platform 8 — strong signal upstream Stage-2 testimonials seed pipeline has a placeholder it's not overriding. Worth a parallel quick-look at the seed file even before aggregation.

**Pre-flight on session 4 start:** verify dev server still up at `localhost:3000/new-project-platform`. Bundled Chromium and measure-section.mjs both intact.

**Cumulative measurement progress:** 20/24 sections measured (83%). Homepage 13/13 ✓ COMPLETE. Platform 7/11 (3 remaining + 1 orphan + 1 missing-section investigation). On track to complete audit in session 4 and aggregate in session 5.

---

## Session 4 — 2026-04-25

**Owner:** measured-fidelity-audit pass 1 (final continuation, audit close).

**Pre-flight**

- Dev server: HTTP 200 on `/new-project-platform` ✓
- Bundled Chromium present at `/home/brock/.cache/ms-playwright/chromium-1217/` ✓
- `alpha_v5/measure-section.mjs` working ✓
- `/tmp/list-sections.mjs` intact (env var `URL`, not `PAGE_URL`) ✓
- Platform idx → queue map re-confirmed (matches session 2-extension + session 3) ✓

**Sections completed (Platform 9, 10, 11 + Section 4 retroactively):**

| # | Slug | Figma nodeId | renderedIdx | Score | Drill-in needed? | Notes |
|---|---|---|---|---|---|---|
| 9 | tabbed-features | `7924:6144` | 6 | 0/7 strict (1/7 generous) | No (succeeded directly — Session 3's prediction of dense overflow didn't materialize) | "By Industry" rendered as black-pill tab when design is panel-header (32px Regular). Right-card featured photo + size-64 logomark watermark + arrow-right icons on industry list all absent. Mirror of Homepage 9 gap pattern (no new categories). |
| 10 | accordion | `7908:137059` | 9 | 1/7 | No | Identical layout match to Homepage 12 — sidebar + accordion split-row works, all 5 questions present. Same gaps: Heading 30 vs 48 + no two-tone split, sub-text Plex vs **Degular Demo 12px** (3rd confirmed instance), CTA rounded-full Bright Blue vs rectangular Navy, accordion question 500 vs 400 weight. **Best content-completeness on Platform alongside Section 6.** |
| 11 | callout-lime | `7908:137103` | 4 | 1/7 (2/7 generous) | No | **Section bg lime green `#a6f252` entirely absent** — dominant gap. Identical to Homepage 13 in copy + layout + gap pattern. Once lime bg + Navy CTA + Light heading land, flips to ~6/7. Heading should pick up navy on accent tone (currently picks up `--color-primary` regardless of `tone`). |
| **4** | numbered-features ("We stand apart") | `7900:118180` | **5** | 0/7 strict (1-2/7 generous) | **Yes — `get_design_context` exceeded ceiling, fell back to `get_screenshot`** | **🎯 RESOLVES BOTH PRIOR INVESTIGATIONS.** Section 4 IS rendering, just at idx 5 with seed-driven heading "We stand apart" (which IS the design's actual heading per `get_screenshot`). Session 2-extension's "missing Section 4" + "We stand apart orphan" are the **same section**. D14 confirmed: per-item flowchart graphics absent (`featureGrid.items[].media` not implemented in block, despite seed lines 21-26/33-38/45-50/57-62 having `media.figmaNodeId` for each item). 2×2 grid + 4 numbered eyebrows ("01."–"04.") + 4 titles + 4 descriptions all render correctly. |

**Both deferred investigations closed in one finding** (no separate investigation docs needed):

- **"Platform Section 4 missing"** ⇒ FALSE — Section 4 renders at idx 5. Not missing.
- **"We stand apart orphan idx 5"** ⇒ FALSE — orphan IS Section 4. Not unmapped.
- The single root cause: session 2-extension assumed Section 4's heading would mention "01." or "Numbered Features", didn't read the seed file, and treated the unfamiliar heading "We stand apart" as evidence of an orphan + a missing section. **Both close to a single sentence in the corrected mapping below.**
- **Total Platform sections accounted for:** 11/11 (no orphans, no missing). **Homepage stays at 13/13 with the 1 remaining "Compare Decisions with competitors" orphan still unresolved** (deferred — not in this session's scope; aggregation will note it as 1 unmapped Homepage section, not blocker).

**Updated Platform render order (corrects session 3 mapping):**

| renderedIdx | y | h | Section | Heading | Status |
|---|---|---|---|---|---|
| 0 | 0 | 600 | 1 | "The agentic orchestration platform that simplifies complexity." | ✓ |
| 1 | 600 | 246 | 2 | "Trusted by Innovators" | ✓ |
| 2 | 846 | 890 | 3 | "One platform. Fully orchestrated." | ✓ |
| 3 | 1736 | 634 | 6 | "Core capabilities that set you up for success" | ✓ |
| 4 | 2370 | 504 | 11 | "Ready to explore the platform?" (callout) | ✓ |
| **5** | **2874** | **1327** | **4** | **"We stand apart" (was previously misread as orphan)** | ✓ |
| 6 | 4201 | 408 | 9 | "Decisions handles hundreds of diverse use cases..." (tabbed) | ✓ |
| 7 | 4608 | 992 | 8 | "Trusted by organizations solving dynamic problems." (testimonials) | ✓ |
| 8 | 5600 | 556 | 5 | "How it works" (auto-switching) | ✓ |
| 9 | 6156 | 510 | 10 | "Questions? We've got answers." (accordion) | ✓ |
| 10 | 6666 | 294 | 7 | "For growing teams" (audience split) | ✓ |

**No orphans on Platform.** Render order is scrambled vs queue order (4→11→4→9→8→5→10→7) — confirms Stage-2 compound-section adjacency loss persists, but no missing or extra sections.

**Cross-section gap patterns** (final rolling list at end of measurement pass — 24 sections total)

| Pattern | Sections affected (count / 24) | Severity | Layer |
|---|---|---|---|
| `--color-secondary` resolves to gray @ rgba(31,41,55,0.8); design wants Neutral 60% / inverse white / primary | 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11 (**23/24**) | visible | **Token** |
| `<Heading>` no `weight` prop / no Display sizes | 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, P1, P3, P4, P5, P6, P7, P8, P9, P10, P11 (**22/24**) | visible | Primitive |
| Heading-token-name collision (`text-h{n}` < design Heading/H{n}) | 1, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, P1, P3, P4, P5, P6, P7, P8, P9, P10, P11 (**21/24**) | visible | **Token** |
| Section padding too thin (py-4 vs designed pb-64 pt-48 px-64) | 1, 3, 4, 5, 6, 7, 9, 10, 11, 12, P3, P4, P5, P6, P7, P8, P9, P10 (**18/24**) | structural | Block |
| Section / card outer chrome (border #e8e8e8 + bg-white) absent | 2, 4, 5, 6, 9, 10, 11, P2, P3, P4, P6, P8, P9, P10 (**14/24**) | structural | Block |
| `<Button>` rectangular variant missing | 1, 5, 7, 12, 13, P1, P7, P10, P11 (**9/24**) | visible | Primitive |
| Featured/decorative image absent (`imageCount` low) | 6, 9, 10, 11, 13, P3, P4, P5, P8, P9, P11 (**11/24**) | structural | Block + Schema |
| `<Button>` Navy fill variant missing | 7, 12, 13, P7, P10, P11 (**6/24**) | visible | Primitive |
| Tabs / list-item primitive metaphor wrong | 9, P9 (2/24) | visible | Primitive |
| Active-state lime accent on auto-switching missing | 8, P5 (2/24) | visible | Primitive + Block |
| First-card seed placeholder leaks | 11, P8 (2/24) | structural | Schema/seed |
| Carousel/animation behaviors not implemented | 11, P8 (2/24) | functional | Block |
| Degular Demo font referenced but not loaded | 12, P1, P10 (3/24) | visible | Token + asset |
| Block tone-flip doesn't propagate to button colors | 7, P7, P11 (3/24) | visible | Primitive + Block |
| Section bg / accent-tone color absent on `tone='accent'` | 13, P11 (2/24) | visible (DOMINANT in those sections) | Block + Schema |
| Two-tone span within heading absent | 1, 5, 12, P10 (4/24) | visible | Primitive |
| `--color-brand-fuchsia` resolves to lime green | 4 only (1/24) | visible | Token |
| Block stubbed (renders skeleton without content slots) | 6 (1/24) | structural | Block |
| Compound-section adjacency / page order scrambled | both pages (24/24 affected) | structural | Schema/seed pipeline |
| No Navy-tone hierarchy in theme.css | P5 (1/24) | visible | Token |
| No 32px slot in `text-h{n}` scale | P8 (1/24) | visible | Token |
| Block tone-flip doesn't propagate to author block | P8 (1/24) | visible | Block |
| `<Button>` text-link / underline variant missing | 10 (1/24) | visible | Primitive |
| `featureGrid.items[].media` field not implemented (D14, queue-tracked) | P4 (1/24) | structural (DOMINANT in section) | Block + Schema |
| Eyebrow chip variant (navy bg + lime text) missing | P4 (1/24) | visible | Primitive + Block |
| Right-aligned subheading layout for split-header pattern | P4 (1/24) | structural | Block |

**Measurement friction observed (session 4)**

- **Sections 9, 10, 11 all returned `get_design_context` directly** — no drill-in needed for any. Cleaner than session 3 prediction.
- **Section 4 hit ceiling on `get_design_context`** (2.17M chars; way over). Fell back to `get_screenshot` for visual reference. Worked perfectly — extracted heading text + layout structure from one screenshot. Average MCP cost this session ≈ 1.25 calls per section (4 direct + 1 screenshot fallback for Section 4).
- **No Bash failures, no script issues.** Pacing: ~10 min/section + ~10 min for combined investigation = **~50 min wall-clock for 4 measurements + 2 investigations**. Well under hard cap. Fastest session of the audit.
- **Investigation collapse:** the two deferred investigations (missing Section 4 + "We stand apart" orphan) collapsed to one finding once the seed file was read. A single `cat seeds/platform/04-numbered-features.json` would have prevented the misclassification in session 2-extension. Lesson: when a render diverges from queue expectations, **read the seed file FIRST** before flagging missing/orphan.

**Cumulative measurement progress:** **24/24 sections measured (100%) ✓ AUDIT COMPLETE.** Homepage 13/13 + Platform 11/11. 1 Homepage orphan ("Compare Decisions with competitors" idx 12, h=292) remains unexplained — defer to aggregation as a known unmapped section, not a blocker. **Ready to fire Aggregation prompt.**
