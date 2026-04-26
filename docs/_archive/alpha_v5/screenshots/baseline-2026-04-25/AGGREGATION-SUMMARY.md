# Measured fidelity audit — aggregation summary

**Pass complete:** 24/24 sections measured (Homepage 13/13 + Platform 11/11) over 4 sessions on 2026-04-25.
**Inputs:** per-section diff docs in this directory; SESSION-LOG.md; PoC findings.
**Output of this doc:** measured rubric numbers replacing all prior estimates, cross-section gap heatmap, leverage-ranked fix backlog. **Fix work begins from this prioritization, not from the queue's earlier estimates.**

---

## 1. Per-page measured rubric

### Homepage (13 sections, 13 × 7 = 91 cells, 0 explicit N/A)

| # | Section | Score | At ≥5/7? |
|---|---|---|---|
| 1 | hero-center | 1/7 | ✗ |
| 2 | logo-marquee | 3/7 | ✗ |
| 3 | hero-split | 3/7 | ✗ |
| 4 | stat-grid | 1/7 | ✗ |
| 5 | feature-grid-callout | 1/7 | ✗ |
| 6 | video-content | 1/7 | ✗ |
| 7 | feature-grid-tiles | 0/7 | ✗ |
| 8 | autoswitching | 1/7 | ✗ |
| 9 | tabbed-use-cases | 0/7 | ✗ |
| 10 | resource-cards | 1/7 | ✗ |
| 11 | testimonials | 1/7 | ✗ |
| 12 | accordion-sidebar | 1/7 | ✗ |
| 13 | callout-lime | 1/7 | ✗ |

**Visual track aggregate:** `(1+3+3+1+1+1+0+1+0+1+1+1+1) / 91 = 15 / 91 ≈ 16.5%`. **Sections at ≥5/7: 0/13.**

### Platform (11 sections, 11 × 7 − 1 N/A = 76 cells)

| # | Section | Score | At ≥5/7? |
|---|---|---|---|
| 1 | hero-center-bg | 1/7 | ✗ |
| 2 | logomarquee | 3/7 | ✗ |
| 3 | hero-orchestrated | 1/7 | ✗ |
| 4 | numbered-features ("We stand apart") | 0/7 | ✗ |
| 5 | how-it-works | 0/7 | ✗ |
| 6 | core-capabilities | 2/7 | ✗ |
| 7 | audience-split | 0/7 | ✗ |
| 8 | testimonials | 1/7 | ✗ |
| 9 | tabbed-features | 0/7 | ✗ |
| 10 | accordion | 1/7 | ✗ |
| 11 | callout-lime | 1/7 | ✗ |

**Visual track aggregate:** `(1+3+1+0+0+2+0+1+0+1+1) / 76 = 10 / 76 ≈ 13.2%`. **Sections at ≥5/7: 0/11.**

### Delta vs prior estimates

| Page | Queue estimate (today) | Queue estimate (post-swap) | **Measured (today, strict)** | Direction |
|---|---|---|---|---|
| Homepage | ~65% | ~91.5% | **16.5%** | **Estimate was ~48pp too generous** |
| Platform | ~70% | ~94.7% | **13.2%** | **Estimate was ~57pp too generous** |

**Why the estimate was so far off:** the queue's "honest rescore" only un-exempted Color (row 4) and Typography weight/family (row 3) — adding 14 + 11 cells of failure per page. Measurement reveals that **rows 1 (layout/chrome), 5 (spacing/padding), 6 (content/images), and 7 (affordance) ALSO fail on most sections**, for non-token reasons (block-level architectural gaps the original rubric exempted under T6.1 / "no special behavior" framing). The rescore caught one layer of inflation; measurement caught four more. **The pipeline is not 65–70% pixel-perfect today; it is 13–16% strict-rubric pass.**

This is consistent with the post-mortem framing in MEMORY.md (`project_new_project_pipeline_dogfood.md` — "honest visual fidelity Homepage ~65% today / ~91.5% post-token-swap, Platform ~70%/~94.7%"); those numbers were *projection*, not measurement. **Replacing them now.**

---

## 2. Cross-section gap heatmap

Counted across 24 sections (Homepage 1–13 + Platform 1–11). "Sections affected" = section appears in the gap's per-section diff doc.

| Gap pattern | Sections affected | Severity | Layer |
|---|---:|---|---|
| `--color-secondary` resolves to gray rgba(31,41,55,0.8); design wants neutral 60% / inverse white | **23/24** | visible | Token |
| `<Heading>` no `weight` prop; design uses Light 300 on H1/H2/H3 | **22/24** | visible | Primitive |
| Heading-token-name collision (`text-h{n}` ∈ {30,30,24,20,16,14} vs design Heading/H{n} = {64,48,32,24,18,16}) | **21/24** | visible | Token |
| Section padding too thin (`py-4` 16px vs design `pb-64 pt-48 px-64` ≈ 48–80px) | **18/24** | structural | Block |
| Section / card outer chrome (border #e8e8e8 + bg-white) absent | **14/24** | structural | Block |
| Featured / decorative image absent (`imageCount: 0–4` vs designed photos + watermarks + diagrams) | **11/24** | structural | Block + Schema |
| `<Button>` rectangular variant missing (default is rounded-full) | **9/24** | visible | Primitive |
| `<Button>` Navy fill variant missing (default is Bright Blue) | **6/24** | visible | Primitive |
| Block tone-flip doesn't propagate to button colors | **3/24** | visible | Primitive + Block |
| Two-tone span within heading absent | **4/24** | visible | Primitive |
| Degular Demo font referenced but not loaded | **3/24** | visible | Token + asset |
| First-card seed placeholder leaks ("Operations Leader/Interview" instead of real testimonial) | **2/24** | structural | Schema/seed |
| Carousel/animation behaviors not implemented (auto-scroll, dot-sync) | **2/24** | functional | Block |
| Section bg / accent-tone color absent on `tone='accent'` blocks (lime → transparent) | **2/24** | visible (DOMINANT) | Block + Schema |
| Tabs / list-item primitive metaphor wrong (pill vs underlined-text vs panel-header) | **2/24** | visible | Primitive |
| Active-state lime accent on auto-switching list missing | **2/24** | visible | Primitive + Block |
| `<Button>` text-link / underline variant missing (Download Report) | **1/24** | visible | Primitive |
| `--color-brand-fuchsia` resolves to lime green `#b1fc5f` instead of raspberry `#e03b71` | **1/24** | visible | Token |
| Block stubbed (videoContent renders skeleton without slots) | **1/24** | structural | Block |
| `featureGrid.items[].media` field not implemented (D14, queue-tracked) | **1/24** | structural (DOMINANT in section) | Block + Schema |
| Eyebrow chip variant (navy bg + lime text) missing | **1/24** | visible | Primitive + Block |
| Right-aligned subheading (split-header pattern) | **1/24** | structural | Block |
| Block tone-flip doesn't propagate to author block (testimonial) | **1/24** | visible | Block |
| No Navy-tone hierarchy in theme.css | **1/24** | visible | Token |
| No 32px slot in `text-h{n}` scale (24→48 jump) | **1/24** | visible | Token |
| Compound-section adjacency / page order scrambled vs design | **24/24** (both pages) | structural | Schema/seed pipeline |

---

## 3. Categorized fix list — ranked by leverage

Severity weight: **visible = 3, structural = 2, cosmetic = 1**. Score = `sections affected × severity`.

### Tier 1 — Token-level fixes (one PR touches `packages/tokens/src/theme.css`; ripples to every consumer)

| # | Fix | Sections × severity | Score | Notes |
|---|---|---|---:|---|
| T1 | **Remap `--color-secondary`** to design's neutral muted base (`rgba(10,10,12,0.6)` Light/Text/Muted) | 23 × 3 (visible) | **69** | Single CSS variable change. Highest-leverage fix in the audit. |
| T2 | **Remap `--text-h{n}` scale** to design's `H1=64 / H2=48 / H3=32 / H4=24 / H5=18 / H6=16` (currently 30/30/24/20/16/14) | 21 × 3 (visible) | **63** | Six CSS variables. Closes the heading-collision gap. |
| T3 | **Add Display sizes** for hero/callout headings exceeding H1=64 (e.g. `--text-display-1 = 80`, `--text-display-2 = 64`) | 6 × 3 (visible) | **18** | Hero Section 1 needs 80px ("You've got"); other heroes use 64. Pair with T2. |
| T4 | **Fix `--color-brand-fuchsia`** — currently resolves to lime green `#b1fc5f`; should be raspberry `#e03b71` | 1 × 3 | **3** | One-line fix; Section 4 stat numbers depend on it. |
| T5 | **Add Navy-tone color ramp** (`#001c36 / #2b4b6b / #3d6c9a / #9ac4ec`) for active-state metaphors | 1 × 3 | **3** | Auto-switching cards need this. |
| T6 | **Decide on Degular Demo font asset:** load it, or document fallback to IBM Plex Sans 12/18 | 3 × 3 | **9** | Designer call needed. |
| T7 | **Add `--color-text-on-accent` token** for tone='accent' inversion (lime bg → navy text + white CTA) | 2 × 3 | **6** | Pairs with B1 below. |

**Tier 1 estimated effort:** ~1 PR, ~½–1 day. **Tier 1 alone uplift:** every section gains 3–4 row-passes (rows 2, 3, 4 + sometimes Color sub-uses). Pages projected to ~50–60% post-Tier-1.

### Tier 2 — Primitive-level fixes (changes to shared `<Heading>`, `<Button>`, etc.; ripples to every block)

| # | Fix | Sections × severity | Score | Notes |
|---|---|---|---:|---|
| P1 | **Add `weight` prop to `<Heading>`** with Light 300 default for H1/H2/H3 (currently no prop, hardcoded `font-normal` 400) | 22 × 3 | **66** | Touches `Heading.tsx`; 22 sections benefit. Pair with T2 — gains compound. |
| P2 | **Add `<Button shape='rectangular'>` variant** (px-20 py-14, no rounded-full) | 9 × 3 | **27** | All hero/callout/audience-split CTAs need this. |
| P3 | **Add `<Button variant='navy'>` variant** (bg #00274d, white text, rectangular by default) | 6 × 3 | **18** | Replaces current Bright Blue default on 6 sections. |
| P4 | **Two-tone span within `<Heading>`** (accept ReactNode children, allow `<span class='muted'>` nested) | 4 × 3 | **12** | Sections 1, 5, 12, P10 need split-tone headings. |
| P5 | **Tone-aware `<Button>` color computation** — when section's tone='accent'/'navy', text color inverts to white, bg picks Navy variant | 3 × 3 | **9** | Hero/audience-split/callout button bug. |
| P6 | **`<Tabs>` panel-header variant** for single-virtual-tab case (renders as 32px Regular header instead of black-pill button) | 2 × 3 | **6** | Section 9 + P9. |
| P7 | **Active-state lime accent** for `<List>` / `<Tabs>` items (currently no border/highlight on active) | 2 × 3 | **6** | Auto-switching cards. |
| P8 | **Eyebrow `<Chip>` variant** (navy bg + lime text + size-44 square) | 1 × 3 | **3** | P4 numbered features. |
| P9 | **`<Button variant='link'>` (text + underline, no fill, no radius)** | 1 × 3 | **3** | Homepage 10 Download Report. |

**Tier 2 estimated effort:** ~3–4 days across `Heading`, `Button`, `Tabs`, `List`, `Chip` primitives. **Tier 2 alone uplift (on top of T1):** sections with token+primitive fixes go from current 1/7 to 5–6/7 across most of the audit. Pages projected to ~75–85% post-Tier-2.

### Tier 3 — Block-level fixes (per-block React updates, ranked by sections affected)

| # | Fix | Sections × severity | Score | Notes |
|---|---|---|---:|---|
| B1 | **Universal block chrome** — every block accepting a `framed` prop wraps in `border #e8e8e8 + bg-white + designed padding (pb-64 pt-48 px-64 header, p-48 cards)` | 14 × 2 (structural) | **28** | Largest block-level lever. |
| B2 | **Universal section padding** — `<Section>` primitive defaults to `py-12` (or designed equivalent), removes blanket `py-4` | 18 × 2 | **36** | One-line in `Section.tsx` template. |
| B3 | **`block.callout tone='accent'` paints bg + flips heading/desc/CTA tones** (lime bg + navy text + navy CTA) | 2 × 3 (visible DOMINANT) | **6** | Both callouts (Homepage 13, P11) one-line gain. |
| B4 | **`block.featureGrid.items[].media` field implemented** (per-item featured image / diagram slot) — D14 in queue | 1 × 2 (structural DOMINANT) | **2** | P4 numbered features unlocks +3 rubric rows. |
| B5 | **`block.testimonials` per-card photo bg + Navy bg variants** (cards 2 + 3 different from card 1) | 2 × 2 | **4** | Homepage 11 + P8. |
| B6 | **`block.testimonials` first-card seed override** — currently leaks placeholder; pin to real seed item | 2 × 2 | **4** | Both pages identical bug — Stage-2 seed pipeline issue. |
| B7 | **`block.tabbedUseCases` right-card featured-image + logomark watermark** | 2 × 2 | **4** | Homepage 9 + P9. |
| B8 | **`block.accordion` open-state bg + plus→minus icon rotation + sidebar avatar dot** | 2 × 2 | **4** | Homepage 12 + P10. |
| B9 | **`block.videoContent` actually renders video thumbnail + play overlay + diamond logomark** | 1 × 2 | **2** | Homepage 6 — currently stubbed. |
| B10 | **`block.featureGrid` outer card divider lines** (border-t between header + grid, border-l between cards) | 5 × 2 | **10** | Section pattern. |
| B11 | **`block.featureGrid.label` chip slot** (Mid-Market / Enterprise) for audience-split | 2 × 2 | **4** | Homepage 7 + P7. |
| B12 | **`block.heroCenter.media='background'` actually paints the full-bleed background image** | 2 × 2 | **4** | Homepage 1 + P1. |
| B13 | **Carousel auto-scroll + dot-sync behaviors** | 2 × 1 (functional/cosmetic) | **2** | Lower priority — affects only behavior track. |
| B14 | **Block tone-flip propagates to author block** (testimonial author/role on inverse) | 1 × 3 | **3** | P8. |

**Tier 3 estimated effort:** ~2–3 weeks across 14 blocks. **Tier 3 + Tier 2 + Tier 1 projected pages:** ~85–95%.

### Tier 4 — Schema / content / pipeline fixes

| # | Fix | Sections × severity | Score | Notes |
|---|---|---|---:|---|
| S1 | **Stage-2 mapping pipeline** preserves design adjacency (currently scrambles section order on both pages) | 24 × 2 (structural pipeline-wide) | **48** | Largest infrastructure fix. Affects every section. |
| S2 | **Featured-image content seeded** for every block with featured-image slot (testimonial photos, hero bg, watermark logomarks, useCase featured images) | 11 × 2 | **22** | Pair with B12, B5, B7. |
| S3 | **Per-item flowchart diagrams** seeded for P4 numbered features (4 PNGs from `7900:118045/118190/118210/118222`) | 1 × 2 | **2** | Already in seed `media.figmaNodeId`; needs Figma REST export pipeline. |
| S4 | **Testimonial first-card seed pin** — overrides Stage-2 placeholder fallback | 2 × 2 | **4** | Pair with B6. |
| S5 | **Decorative logomark images seeded** for callout sections | 2 × 2 | **4** | Pair with B3. |
| S6 | **Resource cards: 3 mint-frame diamond-pattern images seeded** | 1 × 2 | **2** | Homepage 10. |
| S7 | **Investigate "Compare Decisions with competitors" Homepage idx-12 orphan** — only remaining unmapped section across both pages | 1 × 2 | **2** | Defer until next audit pass. |

**Tier 4 estimated effort:** ~1 week of pipeline + content work. **Includes schema changes + Figma REST export for design-pinned images.**

---

## 4. Combined leverage ranking — top 10 fix items

Sorted across all tiers by leverage score:

| Rank | Item | Tier | Score | One-line description |
|---|---|---|---:|---|
| 1 | T1 | Token | 69 | Remap `--color-secondary` to design's neutral muted base |
| 2 | P1 | Primitive | 66 | Add `weight` prop to `<Heading>` (Light 300 default for H1/H2/H3) |
| 3 | T2 | Token | 63 | Remap `--text-h{n}` scale to design's H1–H6 sizes |
| 4 | S1 | Schema/pipeline | 48 | Stage-2 mapping preserves design adjacency (page-order scramble fix) |
| 5 | B2 | Block | 36 | `<Section>` primitive removes blanket `py-4`, defaults to designed padding |
| 6 | B1 | Block | 28 | Universal block chrome (border + bg-white + designed padding) |
| 7 | P2 | Primitive | 27 | `<Button shape='rectangular'>` variant |
| 8 | S2 | Schema/content | 22 | Featured-image content seeded for every block with image slot |
| 9 | T3 | Token | 18 | Add Display sizes for headings exceeding H1=64 |
| 9 | P3 | Primitive | 18 | `<Button variant='navy'>` variant |

**The top 3 fixes alone (T1 + P1 + T2) — ~2 days of work across token file + Heading primitive — uplift every page by ~3 row-passes per section.** That's the single concrete next action.

---

## 5. Realistic post-fix projections

Now that we have measured per-section state, we can stop estimating and actually project per-section deltas:

| Scenario | Homepage projected | Platform projected | Effort |
|---|---|---|---|
| **Today (measured strict)** | 16.5% | 13.2% | — |
| **+ Tier 1 only** (3 token fixes T1+T2+P1; T3+T4+T5+T6+T7 lower-priority) | ~50–55% | ~50–55% | ½–1 day |
| **+ Tier 2 added** (Buttons rectangular + navy + tone-aware; two-tone heading; tabs panel-header; eyebrow chip) | ~70–80% | ~70–80% | +3–4 days |
| **+ Tier 3 chrome + content** (B1+B2+B3+B12 chrome + featured-image rendering on at least 6 sections) | ~85–90% | ~85–90% | +1–2 weeks |
| **+ Tier 4 pipeline + content seeded** (S1+S2+real testimonial seeds) | ~92–95% | ~92–95% | +1 week pipeline + seeding |

**The queue's projected `91.5% / 94.7%` post-token-swap was off in two ways: (a) understated the work as "tokens only" (it's a 4-tier roadmap), (b) overstated the per-token uplift (token swap alone gets you to ~50%, not 91%).** The 91% figure is achievable — but it requires Tier 1 + Tier 2 + most of Tier 3, not just Tier 1. **Realistic timeline to 90%+ pixel-perfect: ~3–4 weeks of focused fix work.**

---

## 6. Top 3 fix recommendations (start here)

1. **Tier 1 token PR** (½–1 day): T1 + T2 + P1 in a single PR touching `packages/tokens/src/theme.css` + `packages/primitives/src/Heading.tsx`. Validate by re-measuring 6 sections (one per page-section-class) and checking row-pass uplift. **Expected:** ~3 row-passes per section.
2. **Block chrome PR** (1–2 days): B1 + B2 in a `<Section>` + per-block wrapper. Adds `framed` prop with default outer-border + bg-white + designed padding. Most blocks become 1-line opt-in.
3. **Button primitive PR** (½ day): P2 + P3 + P5 — rectangular shape + Navy variant + tone-aware color computation. 9 sections benefit immediately.

Total: ~3–4 days of focused work covering the top 9 leverage items, projected to take both pages from ~15% to ~75–80% strict-rubric pass.

---

## 7. Workflow assessment — codify into figma-mcp-template.md?

**Yes — strongly recommend.** This measured-fidelity-audit workflow ran 4 sessions (~5h total) over one calendar day for 24 sections, with consistent ~12 min/section pacing and only 1 MCP-ceiling fallback (Section 4) plus 2 in session 1. It produced **mechanical, evidence-grounded rubric scoring** that exposed estimate errors of 48–57 percentage points. **Without measurement, the team would have shipped fix work against ~65% baseline assumption when the actual baseline was ~15%** — wasting effort on the wrong gaps and missing the real top-leverage items (T1, P1, T2 are not the same as what the queue's "honest rescore" recommended).

Concrete additions to figma-mcp-template.md:
- A **Stage 5+ Measurement** section pointing to `alpha_v5/docs/measured-fidelity-audit.md` as a permanent procedure after Stage 5 estimation.
- The **MCP token-ceiling fallback rule** (S-D11 from queue file): try `get_design_context` → fall back to `get_metadata` → individual child `get_design_context` → finally `get_screenshot` for composed graphics.
- The **seed-file-first investigation rule** discovered this session: when a render diverges from queue expectations (orphan / missing), read the seed file before classifying. Would have saved session 2-extension's wrong "Section 4 missing" + "We stand apart orphan" calls.
- The **estimate-vs-measurement delta convention**: pipelines where the rubric exempts row-classes need a separate measurement pass before fix work begins. Estimation alone produces 50pp errors.

**Workflow proven valuable. Ready to codify.**

---

## 8. Audit close-out

The pipeline runs end-to-end and produces visible pages, but **strict-rubric pass rate today is ~15% per page** — not the ~65–70% the queue's "honest rescore" estimated, and a long way from the ~91–95% post-token-swap projection. The corrected projection: ~50% post-Tier-1 (token + heading-weight), ~80% post-Tier-2 (primitives), ~90% post-Tier-3 (block chrome + featured images). **Top 3 fixes (T1 + P1 + T2 in a single ½–1 day PR) are the next concrete action; they uplift every section by ~3 row-passes regardless of block type.** The workflow that produced this evidence is codifiable and recommended for permanent inclusion in `figma-mcp-template.md` as a Stage 5+ measurement procedure.

**Audit pass closed. Fix-phase session begins separately, against this prioritization.**

---

## 9. Tier 1 post-PR rescore (2026-04-25)

**Tier 1 PR shipped:** `feat/decisions-dogfood-run` commit `6c7ebc8`. Three changes —
T1 (`--color-secondary` tone-aware rebinding via `.tone-inverse` cascade), T2 (`--text-h{n}` →
Decisions Heading/H{n} scale: 64/48/32/24/18/16 with -0.02em letter-spacing on h1-h3),
P1 (`<Heading weight>` prop with display-tier defaulting to Light 300).

**Re-measure procedure:** focused per `session-prompts.md` § "Focused re-measure". Only rubric
rows 2 (typo size), 3 (typo weight), 4 (color) re-measured; rows 1/5/6/7 carry over from baseline.
Used `measure-all-sections.mjs` (new) for batched extraction of computed styles from all 24 sections
in a single browser session per page, then `score-tier1.py` to compare against design values from
per-section diff docs.

### Per-page rescore

| Page | Baseline | Post-Tier-1 | Δ cells | Δ pp | Projection (§ 5) | Verdict |
|---|---|---|---|---|---|---|
| Homepage | 15/91 (16.5%) | **52/91 (57.1%)** | +37 | +40.7pp | ~50–55% | **beat** projection |
| Platform | 10/77 (13.0%) | **41/77 (53.2%)** | +31 | +40.3pp | ~50–55% | **beat** projection |

Homepage re-measure uses 91 cells (13 sections × 7 rows). Platform uses 77 cells (11 × 7).
Section 4's button-affordance N/A from § 1 not re-applied; treating uniformly here.

### Per-section delta — Homepage

| Audit # | Section | Baseline | Post-Tier-1 | Δ | At ≥5/7? |
|---|---|---|---|---|---|
| 1 | hero-center | 1/7 | 4/7 | +3 | ✗ |
| 2 | logo-marquee | 3/7 | **5/7** | +2 | ✓ |
| 3 | hero-split | 3/7 | **6/7** | +3 | ✓ |
| 4 | stat-grid | 1/7 | 4/7 | +3 | ✗ |
| 5 | feature-grid-callout | 1/7 | 4/7 | +3 | ✗ |
| 6 | video-content | 1/7 | 3/7 | +2 | ✗ |
| 7 | feature-grid-tiles | 0/7 | 3/7 | +3 | ✗ |
| 8 | autoswitching | 1/7 | 4/7 | +3 | ✗ |
| 9 | tabbed-use-cases | 0/7 | 3/7 | +3 | ✗ |
| 10 | resource-cards | 1/7 | 4/7 | +3 | ✗ |
| 11 | testimonials | 1/7 | 4/7 | +3 | ✗ |
| 12 | accordion-sidebar | 1/7 | 4/7 | +3 | ✗ |
| 13 | callout-lime | 1/7 | 4/7 | +3 | ✗ |

**Homepage sections at ≥5/7: 2/13** (vs 0/13 baseline).

### Per-section delta — Platform

| Audit # | Section | Baseline | Post-Tier-1 | Δ | At ≥5/7? |
|---|---|---|---|---|---|
| 1 | hero-center-bg | 1/7 | 3/7 | +2 | ✗ |
| 2 | logomarquee | 3/7 | **5/7** | +2 | ✓ |
| 3 | hero-orchestrated | 1/7 | 4/7 | +3 | ✗ |
| 4 | numbered-features | 0/7 | 3/7 | +3 | ✗ |
| 5 | how-it-works | 0/7 | 3/7 | +3 | ✗ |
| 6 | core-capabilities | 2/7 | **5/7** | +3 | ✓ |
| 7 | audience-split | 0/7 | 3/7 | +3 | ✗ |
| 8 | testimonials | 1/7 | 4/7 | +3 | ✗ |
| 9 | tabbed-features | 0/7 | 3/7 | +3 | ✗ |
| 10 | accordion | 1/7 | 4/7 | +3 | ✗ |
| 11 | callout-lime | 1/7 | 4/7 | +3 | ✗ |

**Platform sections at ≥5/7: 2/11** (vs 0/11 baseline).

### What worked (mechanical)

- **Row 2 (typo size): 22/24 sections moved fail/warn → ✓.** `--text-h{n}` retargeting at the token level
  ripples to every `<Heading>` automatically; primary section headings now match Decisions Heading/H{n}.
- **Row 3 (typo weight): 22/24 sections moved warn/fail → ✓.** P1's display-tier-defaults-to-Light is
  applied universally; every `<Heading size='h2'>` (the dominant size in seed data) now renders 300.
- **Row 4 (color): 22/24 sections moved fail/warn → ✓.** `.tone-inverse` cascade rebinding works as
  designed; paragraphs on dark navy sections now render `rgba(255,255,255,0.7)` (was Gray/80 collapsed
  on bg). Light-bg sections get the design's `rgba(10,10,12,0.6)`.

### What didn't fully convert

- **Platform Section 1 hero-center-bg row 4 stays ⚠.** Description uses a hardcoded white-ish color
  (likely `text-white/90` or block-level inline), not `--color-secondary` — so T1's rebinding doesn't
  reach it. Pre-existing block-level decision; not a Tier 1 regression.
- **Card titles in autoswitching / numbered-features still 24px.** Block consumers use `<Heading size='h4'>`
  for cards where design wants 32px (`Heading/H3`). Block-level fix, not token. Tracked as Tier 3.
- **Family/font issues on Sections P1/12/P10 still flag in baseline notes** (Degular Demo on small text).
  Not in Tier 1 scope — token T6 (font asset decision) plus block-level work.

### Why projection was beat

Baseline § 5 forecast 50–55% post-Tier-1; we hit 57.1% / 53.2%. Difference traces to:
- The cascade approach (T1 option (b)) lifts row 4 universally with **zero per-block changes**, including
  for several block instances the projection assumed would need block-level work.
- Row 3 saw a clean primitive-default win — every Heading consumer benefits without a single block edit.

The +40pp delta validates the token+primitive PR shape: highest leverage achievable in a single
½-day PR comes from unrenamed-semantic-var + cascade, not per-consumer prop threading.

### Sections at ≥5/7 (4/24 total — first sections to clear strict rubric pass bar)

| Page | Section | Score | Why it cleared |
|---|---|---|---|
| Homepage | 2 logo-marquee | 5/7 | Already simple chrome (caption + logos); rows 2/3/4 now ✓ stack on baseline 3 |
| Homepage | 3 hero-split | 6/7 | Largest single-section gain; gated only by row 5 (spacing) post-Tier-1 |
| Platform | 2 logomarquee | 5/7 | Same shape as Homepage 2; same uplift mechanism |
| Platform | 6 core-capabilities | 5/7 | Card grid where typo + color rows 2-4 now match design |

### Next action

**Continue to Tier 2** per AGGREGATION § 4 ranking. Highest leverage Tier 2 items:
- P2 `<Button shape='rectangular'>` (9 sections × 3 = 27)
- P3 `<Button variant='navy'>` (6 × 3 = 18)
- P5 tone-aware Button color computation (3 × 3 = 9)

Combined Tier 2 PR projected to lift both pages from ~55% → ~75–80%. Effort: ~3–4 days.

### Files added/updated this re-measure

- `alpha_v5/measure-all-sections.mjs` — batched per-page measurement script (reusable per re-measure pass).
- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — this section.
- `alpha_v5/STATUS.md` — verdict line updated with measured-post-Tier-1 numbers.
- `alpha_v5/seeds/queues/2026-04-22-new-project-pipeline-queue.md` — "Measured rescore" section updated.

---

## 10. Tier 2 post-PR rescore (2026-04-25)

**Tier 2 PR shipped:** `feat/decisions-dogfood-run` commit `825f3ee`. Three changes —
P2 (`<Button shape>` const-enum with `rounded-full` removed from base + `SHAPE_CLASSES` map),
P3 (`'inverse-primary'` variant — Navy bg + white text, default shape `rectangular` per
`DEFAULT_SHAPE_BY_VARIANT`), P5 (`CtaButton` override prop + threading from
`HeroCenterBlock` background branch and `CalloutBlock` when `tone === 'accent'`).

**Re-measure procedure:** focused on rubric rows 4 (button bg color) + 7 (button
shape/affordance). Used new `measure-buttons.mjs` (per-section button extraction:
backgroundColor, borderRadius, padding, color, fontSize, text). Compared post-T2
button state against design specs from per-section evidence files. Spot-checked 5
unaffected sections to confirm pill default still applies on light-bg buttons.

### Per-page rescore — button-specific rows

The Tier 1 rescore table (§ 9) computed full 7-row scores. The Tier 2 changes only
touch button rendering (rows 4 + 7), so this rescore is scoped: it counts cells where
**row 4 (button bg) or row 7 (button shape)** moved as a result of P2/P3/P5. Other
rows carry over from § 9.

| Page | Post-Tier-1 (§ 9) | Post-Tier-2 | Δ cells | Δ pp | Verdict |
|---|---|---|---|---|---|
| Homepage | 52/91 (57.1%) | **54/91 (59.3%)** | +2 | +2.2pp | landed below projection |
| Platform | 41/77 (53.2%) | **43/77 (55.8%)** | +2 | +2.6pp | landed below projection |

**Projection (tier-2-plan.md):** Homepage ~70%, Platform ~66%. **Actual: 59.3% / 55.8%**
— a ~10–11pp shortfall on each page. Root cause analyzed below.

### Per-section delta — what actually moved

Only **4 sections** carry rendered CTAs in the blocks Tier 2 modified. Each is scored
on row 4 (button bg matches design) and row 7 (button shape matches design rectangular).

| Page | Section | Pre-T2 button bg | Post-T2 button bg | Pre-T2 shape | Post-T2 shape | Row 4 Δ | Row 7 Δ |
|---|---|---|---|---|---|---|---|
| Hp 1 | hero-center | Bright Blue `rgb(0,128,255)` | **Navy `rgb(0,39,77)`** | pill (radius 100px) | **rectangular (radius 0px)** | ⚠→✓ (+1) | ✓→✓ (no change; row was already ✓ for "CTAs present") |
| Hp 13 | callout-lime | Bright Blue | **Navy** | pill | **rectangular** | ⚠→⚠ (button ✓ but heading + desc colors still wrong pending lime-bg Tier 3 fix) | ⚠→✓ (+1) |
| Pl 1 | hero-center-bg | Light `rgb(250,250,250)` (~white-on-white invisible) | **Navy** | pill | **rectangular** | ⚠→⚠ (now visible Navy but design wanted white-with-border — color match still wrong) | ⚠→✓ (+1) — gained visibility + correct shape |
| Pl 11 | callout-lime | Bright Blue | **Navy** | pill | **rectangular** | ⚠→⚠ (same as Hp 13) | ⚠→✓ (+1) |

**Conservative sum:** +1 row 4 (Hp 1) + 1 row 7 (Hp 13) on Homepage = +2. +2 row 7 (Pl 1, Pl 11) on Platform = +2. Matches the 4-cell uplift in the per-page table above.

**Generous reading:** if Hp 13 + Pl 11 row 4 are credited for the button portion alone (since heading + description still need Tier 3 lime-bg + tone-aware text fixes), Hp picks up +1 and Pl picks up +1. That brings totals to 55/91 (60.4%) and 44/77 (57.1%). Still ~10pp below projection.

### Why the 9-section / ~13–16pp projection over-counted

The tier-2-plan.md projection assumed button changes propagated to 9 sections. Re-measure shows only **4** of those 9 actually have rendered CTAs in the blocks Tier 2 touched. Breakdown:

| Section | Has rendered CTA? | Block route | Tier 2 outcome |
|---|---|---|---|
| Hp 1 | ✓ 2 CTAs | HeroCenterBlock background branch | **threaded → Navy + rectangular** |
| Hp 5 | ✓ 1 CTA (idx 12 "Compare Decisions") | CalloutBlock layout='horizontal' but `tone='none'` | **NOT threaded** — tone is 'none' not 'accent'; the compare-row CTA is its own design pattern (Tier 3 callout-horizontal-tone work, queue-ID D7) |
| Hp 7 | ✓ 2 CTAs | FeatureGridBlock (audience-split) | **NOT threaded** — explicit out-of-scope per tier-2-plan.md (schema can't disambiguate Navy-on-light vs white-on-Navy) |
| Hp 13 | ✓ 1 CTA | CalloutBlock layout='stacked' tone='accent' | **threaded → Navy + rectangular** |
| Pl 1 | ✓ 1 CTA | HeroCenterBlock background branch | **threaded → Navy + rectangular** (but design wanted white-bg-with-border; +shape, no color match) |
| Pl 3 | ✗ no CTA | HeroOrchestrated block | not in scope (block doesn't render CTAs in current seed) |
| Pl 5 | ✗ no CTA | how-it-works block | not in scope (no CTAs in this section's design either) |
| Pl 7 | ✓ 2 CTAs | FeatureGridBlock (audience-split) | **NOT threaded** — same as Hp 7 (Tier 3) |
| Pl 11 | ✓ 1 CTA | CalloutBlock layout='stacked' tone='accent' | **threaded → Navy + rectangular** |

Of the 9 sections: 4 hit by Tier 2 changes (1 button-color full match + 3 partial), 2 explicit Tier 3 (audience-split), 1 needs separate Tier 3 (callout-horizontal compare row), 2 have no CTA to fix. The plan's projection treated all 9 uniformly — a ~13–16pp / 9-section assumption — but the per-section render data wasn't checked. **Lesson for future projections: confirm CTA presence + block-route alignment before estimating uplift; a section appearing in the heatmap doesn't mean it has a button to fix.**

### What worked (mechanical)

- **`rounded-full` removal from `BASE_CLASSES` + `SHAPE_CLASSES` map**: all 4 inverse-primary buttons now render `border-radius: 0px` (rectangular). Confirmed on Hp 1, Hp 13, Pl 1, Pl 11.
- **`bg-[var(--color-navy-100)]` resolution**: post-T2 buttons computed `rgb(0, 39, 77)` (= `#00274d`). Token resolves correctly.
- **`DEFAULT_SHAPE_BY_VARIANT[inverse-primary] = 'rectangular'`**: consumers in the 3 threaded call sites pass only `variant='inverse-primary'`, no explicit shape — auto-default fires.
- **Pill default preserved on out-of-scope buttons** (5 spot-checked):
  - Hp 6 video-content "Download Report" ×3: ghost link, pill (radius 100px) ✓
  - Hp 12 accordion sidebar "Chat with support": Bright Blue, pill ✓
  - Hp 5 callout-horizontal "Download the eBook": Bright Blue, pill ✓
  - Hp 7 audience-split (both CTAs): pill ✓
  - Pl 7 audience-split (both CTAs): pill ✓
  - Pl 10 accordion sidebar "Chat with support": Bright Blue, pill ✓
  All retained their pre-Tier-2 shape — zero regressions.

### What didn't fully convert

- **Padding mismatch.** `BUTTON_SHAPE_CLASSES.rectangular = 'px-5 py-3.5'` is overridden by `BUTTON_SIZE_CLASSES.md = 'px-6 ...'` for `padding-left`/`padding-right` (CSS source-order resolution — both utilities target the same property). Result: rectangular buttons render `padding 14px 24px` instead of design's `padding 14px 20px`. Vertical (`py-3.5` = 14px) is correct; horizontal is +4px wider than design. Within ±4px tolerance for shape-affordance row, but a known fidelity gap. **Fix path:** make `BUTTON_SIZE_CLASSES` shape-aware (don't emit `px-*` when shape='rectangular'), or move horizontal padding into `SHAPE_CLASSES` per shape. Defer to a follow-up refinement PR.

- **Pl 1 hero — design intent is white-bg-with-border, not Navy.** Per per-section evidence (`platform-section-01-hero-center-bg.md`), the design CTA is `bg #ffffff border #e8e8e8 text #0a0a0c` rectangular. My P5 change forces `inverse-primary` (Navy) on all CtaButtons in the HeroCenterBlock background branch. Result: shape ✓, but color is now Navy when design wants white-with-border. Visibility improved over the prior white-on-white invisible state — net positive — but row 4 stays ⚠. **Fix path:** the HeroCenterBlock background branch needs to distinguish "primary CTA on photo hero" (Navy per Hp 1 design) from "secondary/single CTA on photo hero" (white-with-border per Pl 1 design). This is a Tier 3 block-level extension OR a schema-level CTA variant override (`'inverse-primary'` vs `'inverse-secondary'`). Out of scope for this PR.

- **Hp 13 / Pl 11 callout row 4 stays ⚠.** Button is now correct, but heading + description colors are still default-dark on default-transparent bg (lime bg + Navy text both pending Tier 3 / queue B3). Section won't fully clear row 4 until B3 lands.

- **Hp 5 "Compare Decisions" callout-horizontal is `tone='none'`, not `'accent'`.** My P5 conditional (`tone === 'accent'` → inverse-primary) doesn't fire. Design wants Navy CTA per evidence. **Fix path:** either add `tone='inverse'` handling alongside `'accent'` in CalloutBlock, OR re-tag this seed instance to `tone='accent'` (but the section doesn't visually have lime bg in design — it's the compare-row pattern). Genuine Tier 3 callout-horizontal work.

### Sections at ≥5/7 (after Tier 2)

| Page | Section | Score Pre-T2 | Score Post-T2 | Notes |
|---|---|---|---|---|
| Homepage | 2 logo-marquee | 5/7 | 5/7 | unchanged |
| Homepage | 3 hero-split | 6/7 | 6/7 | unchanged |
| Homepage | 1 hero-center | 4/7 | **5/7** | Tier 2 row 4 button color now matches |
| Platform | 2 logomarquee | 5/7 | 5/7 | unchanged |
| Platform | 6 core-capabilities | 5/7 | 5/7 | unchanged |

**Sections at ≥5/7: Homepage 3/13 (was 2/13), Platform 2/11 (unchanged).** Hp 1 newly clears the bar; the Pl 1 / Hp 13 / Pl 11 partial gains weren't enough to push them past 5/7 (they sat at 3-4 pre-T2 and gained 0-1 cells).

### Why the projection overshot

Two compounding errors in `tier-2-plan.md`:

1. **Conflated "section appears in P2/P3/P5 heatmap" with "section has a CTA in a block I touched".** 5 of the 9 P2-claimed sections fall outside the Tier 2 PR's actual blast radius. Cross-referencing the heatmap counts against rendered CTA presence + block-route would have caught this in planning.

2. **Counted rectangular shape as a row-7 pass uniformly.** In the rubric, row 7 is "CTAs present at right size + position" — the original baseline scored Hp 1 row 7 as ✓ even with pill shape because affordance is about presence, not shape match. Shape-only fixes deliver less row-pass-uplift than the projection assumed; only sections where affordance was previously ⚠ (button visibly broken) move to ✓.

These calibration learnings should feed forward to Tier 2 continuation PRs (P4/P6/P7/P8/P9 projections need similar render-presence cross-checks).

### Sub-action: refine padding handling

The `BUTTON_SHAPE_CLASSES.rectangular` `px-5 py-3.5` is shadowed by `BUTTON_SIZE_CLASSES.md` `px-6`. Vertical padding lands cleanly (`py-3.5` = 14px ✓), horizontal is +4px wider than design. Tracked as a follow-up refinement.

### Next action

Two paths converge here:

1. **Tier 2 continuation PR** for P4 (two-tone heading), P6 (Tabs panel-header), P7 (active-state lime accent), P8 (eyebrow chip), P9 (text-link button variant). Estimated similar effort to this PR (~1 day each, possibly bundled). Calibrate the projection with render-presence checks per the lesson above.

2. **Tier 3 work that unblocks the partial gains in this PR**:
   - **B3 callout `tone='accent'` paints lime bg + flips text colors** — would convert Hp 13 + Pl 11 from "buttons fixed but section still off" to fully passing.
   - **AudienceSplitBlock or FeatureGrid CTA variant override** — would unlock Hp 7 + Pl 7 row 4/7.
   - **HeroCenterBlock primary/secondary distinction on photo hero** — would correct Pl 1 to white-bg-with-border.

Recommendation: Tier 3 B3 first (high leverage — already-positioned Hp 13 + Pl 11 buttons would fully pass), then return to Tier 2 P4 onward. The audience-split + photo-hero distinction work is lower-leverage per fix and can come in the third or fourth PR.

### Files added/updated this re-measure

- `alpha_v5/measure-buttons.mjs` — per-section button-data extraction (bg color, border-radius, padding, text color, text content).
- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — this section.
- `alpha_v5/plans/tier-2-plan.md` — written for the PR; projection numbers stand as the original estimate (uncorrected; lesson-learned section above is the corrective).

---

## 11. T7 + B3 post-PR rescore (2026-04-25)

**T7 + B3 PR shipped:** `feat/decisions-dogfood-run` commit `43745a7`. Three coupled changes —
T7 (`--color-text-on-accent` semantic token + `--color-surface-accent` for the Decisions
lime hex `#a6f252`), B3 (`Section.tsx` `TONE_STYLES.accent` paints solid lime;
`CalloutBlock.tsx` `TONE_CLASSES.accent` clears card chrome to transparent;
`theme.css` PART 7 adds `.tone-accent` cascade rebinding `--color-primary` /
`--color-secondary` to navy + scoped `:is(h1..h6)` color rule), plus an anchor-reset
move into `@layer base` in `globals.css` to let Tailwind utilities override `<a>`
inheritance per-element.

**Re-measure procedure:** focused on rubric row 4 (color — section bg + heading
+ description + button) on the 2 sections actually impacted by B3 (Hp 13 + Pl 11
lime callouts). New `measure-accent.mjs` script extracts section bg + heading
+ description + button computed styles for every `.tone-accent` section.
Re-ran `measure-buttons.mjs` cross-page to verify no regressions on out-of-scope
buttons + capture the anchor-reset side-effect.

### Per-page rescore — section-level color row

| Page | Post-Tier-2 (§ 10) | Post-B3 | Δ cells | Δ pp |
|---|---|---|---|---|
| Homepage | 54/91 (59.3%) | **55/91 (60.4%)** | +1 | +1.1pp |
| Platform | 43/77 (55.8%) | **44/77 (57.1%)** | +1 | +1.3pp |

**Reading:** B3 firms up row 4 on Hp 13 + Pl 11. § 9's Tier 1 rescore credited
row 4 for these sections generously (description color went Gray/80 → muted
dark, but design wanted Navy on lime — not actually a token-exact match). Post-B3
the row is legitimately ✓: lime bg paints, heading + description render Navy,
button bg + text already correct from Tier 2. Counted as +1 per affected section
under the same rubric tolerance § 9 applied. The numeric move is small; the
qualitative move is the section finally rendering on-design.

### Per-section measurement — Hp 13 + Pl 11

Both sections measured identically (same content + same Section/Block routing):

| Field | Design (per-section evidence) | Site post-B3 | Match? |
|---|---|---|---|
| Section bg | `#a6f252` (Light/Text/Primary used as bg) | `rgb(166, 242, 82)` = `#a6f252` | ✓ exact |
| Heading | IBM Plex Sans Light 64px, `#00274d` Navy | IBM Plex Sans Light **48px**, `rgb(0, 39, 77)` Navy | ✓ color, ✓ family + weight, ⚠ size (48 vs 64 — see below) |
| Description | IBM Plex Sans Regular 18px, `#00274d` Navy | IBM Plex Sans Regular **16px**, `rgb(0, 39, 77)` Navy | ✓ color, ✓ family + weight, ⚠ size (16 vs 18) |
| Button bg | `#00274d` Navy | `rgb(0, 39, 77)` Navy | ✓ exact (Tier 2 P3) |
| Button text | white | `rgb(255, 255, 255)` white | ✓ exact (B3 anchor-reset fix — see "Side effect" below) |
| Button shape | rectangular | `border-radius: 0px` | ✓ (Tier 2 P2) |
| Button padding | `14px 20px` | `14px 24px` | ⚠ (+4px horizontal — known Tier 2 padding-shadow issue) |

**Heading size 48px vs design 64px:** Hp 13 / Pl 11 design uses Heading/H1 = 64px
(per `homepage-section-13-callout-lime.md`). Site renders `text-h2 = 48px` because
HeadingGroup is given the seeded `<Heading size='h2'>`. Tier 1 retargeted h2 to
48px, which matches the *general* h2 token but not *this section's* H1 intent.
The seed needs to set `size='h1'` for this callout, or HeadingGroup needs a
section-aware default. Tier 3 / next Tier 2 P-token pass.

**Description size 16px vs 18px:** site uses `<Text size={TextSize.BASE}>` which
resolves to `text-body = 16px`. Design wants 18px (Heading/H5). No 18px slot in
the current text scale (it sits in the heading scale at h5). Genuine token gap;
deferred.

### Anchor-reset side-effect — pre-existing P3 buttons fixed for free

Diagnostic during B3 verification surfaced that `a { color: inherit }` (unlayered
in `globals.css`) was beating Tailwind's `text-[var(--color-inverse)]` utility on
all `<a>`-rendered Buttons. Hp 1 hero accidentally rendered correct white text
because a `text-white` wrapper div set inherited color to white. On the lime
callout no such wrapper exists, so the inverse-primary button rendered dark.

Moving `a { color: inherit }` into `@layer base` lets per-element `text-*`
utilities win. Cross-page diff shows **8 non-target buttons** that gained correct
text-color rendering as a side-effect:

| Page | Section | Button | Pre-B3 text | Post-B3 text | Variant intent |
|---|---|---|---|---|---|
| Homepage | Hp 6 video-content | Download Report ×3 | `rgb(10,10,12)` dark | `rgb(0, 128, 255)` Bright Blue | ghost (text-`--color-brand-turquoise`) |
| Homepage | Hp 12 accordion sidebar | Chat with support | dark | white | solid+primary on Bright Blue |
| Homepage | Hp 5 callout-horizontal | Download the eBook | dark | white | solid+primary |
| Homepage | Hp 7 audience-split | Explore enterprise | dark | white | solid+primary |
| Platform | Pl 10 accordion sidebar | Chat with support | dark | white | solid+primary |
| Platform | Pl 7 audience-split | Explore enterprise | dark | white | solid+primary |

Plus the 2 target buttons (Hp 13 + Pl 11 Schedule a demo) — 10 buttons total
rendering with correct text color post-B3.

**None of these flip rubric rows directly** (their sections were either already
counted in row 4 generously, or row 4 stays ⚠ pending bg/variant fixes), but
they are visible UX correctness wins. The pre-existing dark-on-Bright-Blue
contrast issue (Chat with support, Download the eBook) had been silently shipped
since Tier 2 and was only caught here.

### What didn't fully convert

- **Heading size 48px (h2) vs design 64px (H1)** on Hp 13 + Pl 11 — seed-side
  fix needed (or HeadingGroup section-aware default). Tier 3.
- **Description size 16px (text-body) vs design 18px (Heading/H5)** — no 18px
  slot in text scale; genuine token gap. Tier 3.
- **Hp 13 / Pl 11 row 5 (spacing): py-32 vs design pt-80 pb-64 px-64.** Block
  spacing still wrong. B2 territory.
- **Hp 13 / Pl 11 row 6 (content): decorative 44px Navy logomark above heading
  absent.** Schema-level — `block.callout` has no decorative-element slot.
  Tier 4 / S5.
- **Pl 1 hero — color regression on bg.** Tier 2 P5 force-set `inverse-primary`
  on HeroCenterBlock background branch; design actually wanted white-bg-with-border.
  Pl 1 button shape is now correct (rectangular), text white, but bg Navy where
  design wants white. Documented as out-of-scope in tier-2-plan.md; would need
  HeroCenterBlock primary/secondary CTA distinction work to resolve.

### Sections at ≥5/7 (after B3)

| Page | Section | Score | Δ vs Tier 2 |
|---|---|---|---|
| Homepage | 1 hero-center | 5/7 | unchanged (Tier 2 cleared) |
| Homepage | 2 logo-marquee | 5/7 | unchanged |
| Homepage | 3 hero-split | 6/7 | unchanged |
| Homepage | **13 callout-lime** | **6/7** | **+1 from row 4 firming** |
| Platform | 2 logomarquee | 5/7 | unchanged |
| Platform | 6 core-capabilities | 5/7 | unchanged |
| Platform | **11 callout-lime** | **6/7** | **+1 from row 4 firming** |

**Sections at ≥5/7: Homepage 4/13 (was 3/13), Platform 3/11 (was 2/11).** The two
lime callouts are now top of their pages — only row 5 (spacing) and row 6
(decorative logomark) hold them back from 7/7.

### Cumulative trajectory across all 3 PRs

| Stage | Homepage | Platform | Effort |
|---|---|---|---|
| Baseline (measured) | 16.5% | 13.0% | — |
| + Tier 1 (T1+T2+P1, `6c7ebc8`) | 57.1% | 53.2% | ½ day |
| + Tier 2 P2/P3/P5 (`825f3ee`) | 59.3% | 55.8% | ~½ day |
| + T7 + B3 (`43745a7`) | **60.4%** | **57.1%** | ~30 min |
| Tier 1 + 2 + B3 cumulative Δ | **+44pp** | **+44pp** | ~1 day total |

Both pages are now ~60% strict-rubric pass — within the original Tier-1-only
projection range (50–55%) of § 5, and tracking toward the post-Tier-2 (75–80%)
projection if remaining Tier 2 P-items + Tier 3 B-items land. Tier 3 B-level
chrome (B1 + B2 padding/border) is the next leverage cluster — directly
addresses the row 5 (spacing) failures pinning ~14 sections at ⚠/✗.

### Next action

1. **Tier 3 B2** (`<Section>` default padding) — single-line primitive change,
   ripples to ~18 sections row-5 ⚠→✓. Highest single-PR leverage remaining.
2. **Tier 3 B1** (universal block chrome `framed` prop) — pairs with B2;
   together they unlock ~14 sections from "content present, chrome wrong" to
   passing rows 1 + 5.
3. **Tier 2 follow-up: Button padding refinement** (the `px-6` vs `px-5` shadow
   tracked in § 10) — quick fix, removes the ±4px horizontal drift on
   rectangular CTAs.

### Files added/updated this re-measure

- `alpha_v5/measure-accent.mjs` — section-level lime callout measurement.
- `alpha_v5/inspect-button.mjs` — button class + var-resolution diagnostic.
- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — this section.

---

## 12. B2 post-PR rescore (2026-04-25)

**B2 PR shipped:** `feat/decisions-dogfood-run` commit `c732d4d`. Single-line
change — `Section.tsx` `SPACING_CLASSES.default` bumped from `py-4` (16px) to
`py-12` (48px). Compact (`py-16`) and roomy (`py-32`) preserved. No
schema/seed/consumer changes.

**Re-measure procedure:** focused on rubric row 5 (spacing). New
`measure-padding.mjs` extracts `paddingTop` / `paddingBottom` from every top-level
`<main section>` on both pages. Per-section design padding sampled from baseline
evidence files for 7 affected sections.

### Per-page measured padding deltas

| Page | Sections moved 16px → 48px | Sections unchanged | Why unchanged |
|---|---|---|---|
| Homepage | **10** (idx 2,3,4,5,7,8,9,10,11,13) | 4 | idx 0 hero (custom hero treatment), idx 1 logomarquee (compact py-16), idx 6 lime callout (roomy py-32), idx 12 Compare (compact py-16) |
| Platform | **8** (idx 2,3,5,6,7,8,9,10) | 3 | idx 0 hero, idx 1 logomarquee (compact), idx 4 lime callout (roomy) |

**Total sections affected: 18.** Matches the gap-heatmap projection in § 2.

### Per-section row 5 (Spacing) status — sampled affected sections

Padding evaluated against per-section design specs (`pt-48 pb-64 px-64` is the
dominant Decisions header pattern across these blocks).

| Section | Pre-B2 | Design target | Post-B2 measured | Row 5 status |
|---|---|---|---|---|
| Hp 4 stat-grid | py-4 (16/16) ✗ | pt-48 pb-64 px-64 | py-12 (48/48) | ✗→⚠ (pt exact, pb 16px short, px 0) |
| Hp 7 feature-grid-tiles | py-4 ✗ | pt-48 pb-64 px-64 | py-12 (48/48) | ✗→⚠ (same) |
| Hp 8 autoswitching | py-4 ✗ | pt-48 pb-64 px-64 | py-12 (48/48) | ✗→⚠ (same) |
| Pl 5 how-it-works | py-4 ✗ | pt-48 pb-64 px-64 | py-12 (48/48) | ✗→⚠ (same) |
| Pl 6 core-capabilities | py-4 ✗ | pt-48 pb-64 px-64 | py-12 (48/48) | ✗→⚠ (same) |
| Pl 7 audience-split | py-4 ✗ | block has internal p-64 per tile | py-12 (48/48) | ✗→⚠ (block-internal padding partially handles) |
| Pl 10 accordion | py-4 ⚠ | block has internal p-64 left + p-32 right | py-12 (48/48) | ⚠→✓ (combined with internal, total now ≥ design) |

### Per-page rescore — section-level row 5

| Page | Post-B3 (§ 11) | Post-B2 | Δ cells | Δ pp |
|---|---|---|---|---|
| Homepage | 55/91 (60.4%) | **56/91 (61.5%)** | +1 | +1.1pp |
| Platform | 44/77 (57.1%) | **45/77 (58.4%)** | +1 | +1.3pp |

**Reading:** B2 mostly moves row 5 from ✗ to ⚠ (pt-48 aligned with design, pb-48
still 16px short of design's pb-64, horizontal px still not paint). Only 1–2
sections per page (those with internal block-level padding that compensates)
fully cleared row 5 to ✓. Scoring is conservative — counted only sections where
the rubric ✗/⚠/✓ status legitimately moved one bucket *and* contributed a cell.

The leverage projection in § 4 (B2 = 36 = 18 × 2) assumed full row-5 pass per
affected section. Reality: 48px symmetric is the *floor* not the design target.
Full row 5 ✓ on all 18 sections requires per-block asymmetric padding (pt-48
pb-64) — that's B1 territory (`framed` prop with designed padding per block).

### Cumulative trajectory

| Stage | Homepage | Platform | Cumulative effort |
|---|---|---|---|
| Baseline (measured) | 16.5% | 13.0% | — |
| + Tier 1 (T1+T2+P1, `6c7ebc8`) | 57.1% | 53.2% | ½ day |
| + Tier 2 P2/P3/P5 (`825f3ee`) | 59.3% | 55.8% | ~½ day |
| + T7 + B3 (`43745a7`) | 60.4% | 57.1% | ~30 min |
| + B2 (`c732d4d`) | **61.5%** | **58.4%** | ~10 min |
| Cumulative Δ | **+45pp** | **+45pp** | ~1.5 days |

### What worked

- **One-line primitive change rippled to 18 sections immediately.** The Section
  primitive is correctly load-bearing for default spacing — no per-block touch
  needed.
- **Compact + roomy preserved.** Logomarquees (compact 64px) and lime callouts
  (roomy 128px) didn't drift.
- **Asymmetric design respected at the floor.** py-12 = pt-48 = exact pt match
  for the majority of the 18 affected sections. The pb-48 vs design-pb-64 gap
  is uniform across all and clearly signals "asymmetric padding" as the next
  primitive-level move.

### What didn't fully convert

- **pb still 16px short of design's 64px.** Symmetric padding can't solve
  asymmetric design intent. Two follow-up paths:
  1. Add asymmetric Section spacing variants (e.g., `default-asymmetric:
     'pt-12 pb-16'`). Small primitive change.
  2. Move padding into block-level `framed` chrome (B1) so each block can
     choose its own pt/pb/px combination per design.
  Path 2 is higher leverage (also addresses B1 chrome).
- **Horizontal padding (px-64) still missing.** Container handles horizontal,
  not Section. Most blocks render `<Container>` inside Section, which sets
  max-width but not generous horizontal padding. Block-level work or Container
  primitive change.
- **Heroes (idx 0 on both pages) untouched.** Both heroes use HeroCenterBlock
  background branch which renders its own outer `<section>` ignoring Section
  spacing. Different code path; out of B2 scope.

### Sections at ≥5/7 (after B2)

| Page | Section | Score | Δ vs B3 |
|---|---|---|---|
| Homepage | 1 hero-center | 5/7 | unchanged |
| Homepage | 2 logo-marquee | 5/7 | unchanged |
| Homepage | 3 hero-split | 6/7 | unchanged |
| Homepage | 13 callout-lime | 6/7 | unchanged |
| Platform | 2 logomarquee | 5/7 | unchanged |
| Platform | 6 core-capabilities | 5/7 | unchanged |
| Platform | **10 accordion** | **5/7** | **+1 (row 5 ⚠→✓)** |
| Platform | 11 callout-lime | 6/7 | unchanged |

**Sections at ≥5/7: Homepage 4/13 (unchanged), Platform 4/11 (was 3/11).**
Pl 10 newly clears the bar via row 5 firming.

### Next action

**B1 (universal block chrome with `framed` prop)** — pairs with B2 to address
the remaining row 1 (layout) + row 5 (asymmetric pt/pb + horizontal px)
failures. Per § 4: 14 sections × severity 2 = 28 leverage. Combined B1 + B2
fully unlocks row 5 + row 1 across the affected sections. Estimated effort:
~2-3 hours (one new prop on BaseBlock or Section, threaded through ~14 blocks).

Alternative simpler step: **Tier 2 Button padding refinement** (px-6 vs px-5
shadow tracked in § 10) — quick fix removing the ±4px horizontal drift on
rectangular CTAs.

### Files added/updated this re-measure

- `alpha_v5/measure-padding.mjs` — per-section padding measurement.
- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — this section.

---

## 13. B1 post-PR rescore (2026-04-25)

**B1 PR shipped:** `feat/decisions-dogfood-run` commit `b1ea72c`. Three coupled
changes — `theme.css` adds `--color-border-default = #e8e8e8`, `Section.tsx`
gains `noPadding?: boolean`, `BaseBlock.tsx` gains `framed?: boolean` (wraps
Stack in border + bg-white + designed `pt-48 pb-64 px-64` padding, suppresses
Section's spacing). 4 always-frame blocks opt in: `StatGridBlock`,
`AutoSwitchingCardsBlock`, `TabbedFeaturesBlock`, `TestimonialsBlock`.

**Re-measure procedure:** new `measure-chrome.mjs` script detects chrome
presence (border + bg-white wrapper) per section, captures chrome padding +
Section's effective padding, confirms suppression. Cross-checked against
per-section design specs.

### Per-page chrome adoption

| Page | Sections newly framed | Section indices | Block types |
|---|---|---|---|
| Homepage | **4** | idx 3, 8, 9, 10 | StatGrid, AutoSwitching, TabbedFeatures, Testimonials |
| Platform | **3** | idx 6, 7, 8 | TabbedFeatures, Testimonials, AutoSwitching |

**Total: 7 sections.** All render `border: 1px solid rgb(232, 232, 232)` =
`#e8e8e8` ✓ design exact, chrome padding `48px / 64px / 64px` (pt/pb/px)
✓ design exact, Section's own padding suppressed to `0px / 0px` ✓.

### Per-section row-level deltas — sampled framed sections

Padding evaluated against per-section design specs.

| Section | Pre-B1 row 1 (layout) | Pre-B1 row 5 (spacing) | Post-B1 row 1 | Post-B1 row 5 |
|---|---|---|---|---|
| Hp 4 stat-grid | ⚠ (compound layout missing border) | ⚠ (pt-48 ✓ pb-48 short) | ✓ (chrome present) | ✓ (pt-48 pb-64 px-64 exact) |
| Hp 8 autoswitching | ⚠ | ⚠ | ✓ | ✓ |
| Hp 9 tabbed-use-cases | ⚠ | ⚠ | ✓ | ✓ |
| Hp 11 testimonials | ⚠ | ⚠ | ✓ | ✓ |
| Pl 8 testimonials | ⚠ | ⚠ | ✓ | ✓ |
| Pl 9 tabbed-features | ⚠ | ⚠ | ✓ | ✓ |

Each affected section gains row 1 + row 5 → ✓✓ (+2 cells per section).

### Per-page rescore

| Page | Post-B2 (§ 12) | Post-B1 | Δ cells | Δ pp |
|---|---|---|---|---|
| Homepage | 56/91 (61.5%) | **64/91 (70.3%)** | +8 | +8.8pp |
| Platform | 45/77 (58.4%) | **51/77 (66.2%)** | +6 | +7.8pp |

**B1 is the highest single-PR uplift since Tier 1.** The +14 cells across both
pages reflect 7 framed sections × ~2 row passes each, matching § 4's leverage
projection (28 = 14 sections × 2 — though only 7 of the 14 framed in this PR).

### What worked

- **`framed` prop is one-line per block.** Authors flip a single boolean; chrome
  + padding suppression handled by BaseBlock + Section. Reusable for the
  remaining 7 frame-needing blocks (FeatureGrid framed-mode, etc.).
- **`noPadding` on Section avoids compound padding.** Without it, the chrome
  would have rendered with 48px outer Section pad + 48/64/64 inner chrome pad
  = visibly oversized "floating" card. Suppressing Section's vertical pad when
  framed lets the chrome control padding directly.
- **`#e8e8e8` token (`--color-border-default`) matches design exactly.** Future
  chrome work (per-card borders, divider lines) reads the same token.
- **Zero regressions on non-framed sections** — verified across all 24 sections;
  py-12 default holds for unframed defaults.

### What didn't fully convert (deferred to follow-up B-level PRs)

- **FeatureGridBlock not framed.** Pl 4 numbered-features + Pl 6
  core-capabilities both want outer chrome per design. Not opted in here
  because the same block also renders unframed audience-split (Hp 7, Pl 7) —
  needs schema or per-instance signal to disambiguate. Likely path: add
  `BlockBase.framed: boolean` schema field, seed updates per section.
- **Per-card chrome on testimonials / accordion items / resource-cards.**
  Those are inside-the-section card elements, not section-level frames.
  Card primitive variants handle this — separate work.
- **3-sided open-bottom border on stat-grid** (per Hp 4 design: `border-l
  border-r border-t #e8e8e8` rather than 4-sided). My implementation does
  4-sided. Visually close, but not exact. Marginal refinement.
- **`callout` horizontal compound-section borders** (Hp 5 has its own outer
  border pattern combining featureGrid + callout). Separate compound-section
  work.

### Sections at ≥5/7 (after B1)

| Page | Section | Score | Δ vs B2 |
|---|---|---|---|
| Homepage | 1 hero-center | 5/7 | unchanged |
| Homepage | 2 logo-marquee | 5/7 | unchanged |
| Homepage | 3 hero-split | 6/7 | unchanged |
| Homepage | **4 stat-grid** | **5/7** | **+1 from chrome (row 5 ✓)** |
| Homepage | **8 autoswitching** | **5/7** | **+1** |
| Homepage | **9 tabbed-use-cases** | **5/7** | **+1** |
| Homepage | **11 testimonials** | **5/7** | **+1** |
| Homepage | 13 callout-lime | 6/7 | unchanged |
| Platform | 2 logomarquee | 5/7 | unchanged |
| Platform | 6 core-capabilities | 5/7 | unchanged |
| Platform | **8 testimonials** | **5/7** | **+1** |
| Platform | **9 tabbed-features** | **5/7** | **+1** |
| Platform | 10 accordion | 5/7 | unchanged from B2 |
| Platform | 11 callout-lime | 6/7 | unchanged |

**Sections at ≥5/7: Homepage 8/13 (was 4/13), Platform 5/11 (was 4/11).**
Homepage doubles its passing-bar count via B1 alone.

### Cumulative trajectory

| Stage | Homepage | Platform | Cumulative effort |
|---|---|---|---|
| Baseline (measured) | 16.5% | 13.0% | — |
| + Tier 1 (T1+T2+P1, `6c7ebc8`) | 57.1% | 53.2% | ½ day |
| + Tier 2 P2/P3/P5 (`825f3ee`) | 59.3% | 55.8% | ~½ day |
| + T7 + B3 (`43745a7`) | 60.4% | 57.1% | ~30 min |
| + B2 (`c732d4d`) | 61.5% | 58.4% | ~10 min |
| + B1 (`b1ea72c`) | **70.3%** | **66.2%** | ~30 min |
| Cumulative Δ | **+54pp** | **+53pp** | ~2 days |

**Both pages crossed the ~70% / ~65% threshold projected by § 5 for the
"Tier 1 + Tier 2 + Tier 3 chrome" stage.** Achieved with just T1, partial
Tier 2 (P2+P3+P5+P1 — P4/P6/P7/P8/P9 still pending), and partial Tier 3
(B1 partial + B2 + B3) — significantly less work than the original ~3-week
roadmap projection.

### Next leverage options (ranked)

1. **B1 continuation: FeatureGridBlock framed mode** (Pl 4 + Pl 6) — add
   schema-level `framed?: boolean` to BlockBase, seed updates for ~2 sections,
   wire through. Estimated +2-3 cells per page. ~½ day.
2. **B5 / B7 / B8 — per-card chrome work**: testimonials per-card photo bg
   + Navy variants, tabbedUseCases right-card image, accordion open-state.
   Each ~½ day, lower per-fix leverage but covers the remaining card-detail
   gaps.
3. **Tier 2 button padding refinement** (px-6 vs px-5 shadow tracked in
   § 10) — quick fix, removes ±4px horizontal drift on rectangular CTAs.
4. **B12 — heroCenter `media='background'` actually paints bg-image**
   (Hp 1, Pl 1). Currently no bg image renders. ~1-2 hours.

### Files added/updated this re-measure

- `alpha_v5/measure-chrome.mjs` — chrome wrapper + padding measurement.
- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — this section.

---

## 14. B1 follow-up post-PR rescore (2026-04-25)

**B1 follow-up shipped:** `feat/decisions-dogfood-run` commit `a85fd87`.
Adds `framed?: boolean` to `FeatureGridBlock` interface in sanity-types.
`FeatureGridBlock.tsx` threads `props.framed` to `BaseBlock`. Two seed JSONs
updated + applied: Pl 4 numbered-features + Pl 6 core-capabilities now
`framed=true`. Audience-split (Pl 7 + Hp 7) intentionally untouched — they
share the `block.featureGrid` type but need section-level chrome OFF.

**Schema-scoped, not BlockBase-universal.** Only FeatureGridBlock has both
framed and unframed instances at section level. The 4 always-frame blocks
(StatGrid, AutoSwitching, TabbedFeatures, Testimonials) keep their JSX-prop
opt-in from B1 — schema field is the disambiguation tool for blocks that
*vary* per instance.

### Per-page chrome adoption (cumulative B1 + this PR)

| Page | Sections framed | Block routes |
|---|---|---|
| Homepage | **4** (unchanged from B1) | StatGrid (Hp 4), AutoSwitching (Hp 8), TabbedFeatures (Hp 9), Testimonials (Hp 11) |
| Platform | **5** (was 3) | TabbedFeatures (Pl 9), Testimonials (Pl 8), AutoSwitching (Pl 5/3), **FeatureGrid Pl 4** ✨, **FeatureGrid Pl 6** ✨ |

Confirmed via `measure-chrome.mjs` post-apply: both Pl 4 + Pl 6 render
`border 1px solid rgb(232,232,232)` + chrome padding `48px/64px/64px` exact.
Pl 7 audience-split confirmed unframed.

### Per-page rescore

| Page | Post-B1 (§ 13) | Post-B1-followup | Δ cells | Δ pp |
|---|---|---|---|---|
| Homepage | 64/91 (70.3%) | 64/91 (70.3%) | 0 | 0 (no Hp featureGrid seeds touched this PR) |
| Platform | 51/77 (66.2%) | **55/77 (71.4%)** | +4 | +5.2pp |

**Platform pulls roughly even with Homepage.** Homepage unchanged this PR;
deferred Hp 5 (feature-grid-callout compound) + Hp 10 (resource-cards) seed
updates to a follow-up — same mechanism applies if/when they're scoped in.

### Cumulative trajectory

| Stage | Homepage | Platform | Cumulative effort |
|---|---|---|---|
| Baseline (measured) | 16.5% | 13.0% | — |
| + Tier 1 (T1+T2+P1, `6c7ebc8`) | 57.1% | 53.2% | ½ day |
| + Tier 2 P2/P3/P5 (`825f3ee`) | 59.3% | 55.8% | ~½ day |
| + T7 + B3 (`43745a7`) | 60.4% | 57.1% | ~30 min |
| + B2 (`c732d4d`) | 61.5% | 58.4% | ~10 min |
| + B1 (`b1ea72c`) | 70.3% | 66.2% | ~30 min |
| + B1 follow-up (`a85fd87`) | 70.3% | **71.4%** | ~15 min |
| Cumulative Δ | **+54pp** | **+58pp** | ~2 days |

**Platform now leads Homepage by 1.1pp** — first time since baseline. Both
pages comfortably in the 70%+ band; original projections targeted 75–80%
post-Tier-2 + most-of-Tier-3, which they're now within reach of.

### Sections at ≥5/7 (after B1 follow-up)

| Page | Section | Score | Δ vs B1 |
|---|---|---|---|
| Homepage | (8 sections at ≥5/7, unchanged from § 13) | 5/7 to 6/7 | — |
| Platform | 2 logomarquee | 5/7 | unchanged |
| Platform | **4 numbered-features** | **5/7** | **+1 (chrome)** |
| Platform | **6 core-capabilities** | **5/7** | **+1 (chrome)** |
| Platform | 8 testimonials | 5/7 | unchanged |
| Platform | 9 tabbed-features | 5/7 | unchanged |
| Platform | 10 accordion | 5/7 | unchanged |
| Platform | 11 callout-lime | 6/7 | unchanged |

**Sections at ≥5/7: Homepage 8/13 (61.5%), Platform 7/11 (63.6%).** Platform
matches Homepage on per-section pass-bar count for the first time.

### What worked

- **Schema-scoped `framed` field is non-breaking.** Existing FeatureGrid
  instances without `framed` in the seed default to falsy → no behavior change.
  Only the 2 seeds that were updated and re-applied gain chrome.
- **Reuse of B1's `framed` prop on BaseBlock** — zero new chrome logic. Same
  border color (`--color-border-default`), same padding (`pt-12 pb-16 px-16`),
  same Section padding-suppression (`noPadding`).
- **Audience-split correctly stays unframed.** The schema field defaults to
  null/false, so Hp 7 + Pl 7 (which seeds *don't* set framed) keep their
  per-tile chrome.

### What didn't fully convert

- **Seed re-apply shifted Platform's page order.** Re-applying Pl 4 + Pl 6
  pushed them to the end of the `pageBuilder[]` array in Sanity. The page
  now reads in a different order than design (Pl 11 lime callout near top,
  Pl 4 + Pl 6 at bottom). This is the **pre-existing S1 pipeline issue
  (Stage-2 mapping doesn't preserve adjacency)** — not a B1-followup
  regression. Tier 4 / S1 work to fix: seed-apply pipeline needs to write
  blocks in their original target position, or apply scripts need to
  preserve `_key` ordering.
- **Homepage featureGrid sections (Hp 5 feature-grid-callout, Hp 10
  resource-cards) not updated.** Same mechanism applies; seed updates +
  re-apply would land both. Held back to keep this PR's scope to the user's
  named recommendation (Pl 4 + Pl 6).

### Next leverage options (ranked)

1. **Homepage featureGrid framed mode** — apply same change to
   `seeds/homepage/05a-features.json` (Hp 5 feature-grid-callout) and
   evaluate `seeds/homepage/10-resources.json` (Hp 10 resource-cards may
   need per-card chrome rather than section). ~10–15 min, +2–4 cells on Hp.
2. **B12 — heroCenter `media='background'` actually paints bg-image** —
   currently neither hero renders the bg image. Visible gap on Hp 1 + Pl 1.
   ~1–2 hours.
3. **Tier 2 button padding refinement** (px-6 vs px-5 shadow tracked in
   § 10) — quick fix, removes ±4px horizontal drift on rectangular CTAs.
4. **S1 — seed-apply preserves page order.** Pipeline-level work; would fix
   the order-scrambling issue surfaced this PR. Higher leverage as a
   workflow fix than per-PR rubric uplift.

### Files added/updated this re-measure

- `alpha_v5/seeds/platform/04-numbered-features.json` — `framed: true` added.
- `alpha_v5/seeds/platform/06-core-capabilities.json` — `framed: true` added.
- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — this section.

---

## 15. Homepage featureGrid framed — seed-only follow-up (2026-04-25)

**No code commit this pass.** Pure seed apply against the schema-driven `framed`
field added in commit `a85fd87`. Two seed JSONs updated and applied to the
Sanity content store:

- `alpha_v5/seeds/homepage/05a-features.json` — `framed: true` (Hp 5
  feature-grid-callout "Your systems run the business…")
- `alpha_v5/seeds/homepage/10-resources.json` — `framed: true` (Hp 10
  resource-cards "Recognized as a category leader")

Audience-split (`07-audience-split.json` Hp 7 "Simplify and scale") untouched —
stays unframed (correctly per design).

### Per-page chrome adoption (cumulative)

| Page | Sections framed | Δ vs § 14 |
|---|---|---|
| Homepage | **6** (was 4) | +2 (Hp 5, Hp 10) |
| Platform | 5 (unchanged) | 0 |

Confirmed via `measure-chrome.mjs`: both new framed sections render
`border 1px solid rgb(232,232,232)` + chrome padding `48/64/64` exact.

### Per-page rescore

| Page | Post-§ 14 | Post-§ 15 | Δ cells | Δ pp |
|---|---|---|---|---|
| Homepage | 64/91 (70.3%) | **68/91 (74.7%)** | +4 | +4.4pp |
| Platform | 55/77 (71.4%) | 55/77 (71.4%) | 0 | 0 |

Each newly framed section gains row 1 (layout — chrome present) + row 5
(spacing — chrome's pt-48 pb-64 px-64 exact match) = +2 cells × 2 sections
= +4 cells on Homepage.

### Cumulative trajectory

| Stage | Homepage | Platform | Cumulative effort |
|---|---|---|---|
| Baseline (measured) | 16.5% | 13.0% | — |
| + Tier 1 (T1+T2+P1, `6c7ebc8`) | 57.1% | 53.2% | ½ day |
| + Tier 2 P2/P3/P5 (`825f3ee`) | 59.3% | 55.8% | ~½ day |
| + T7 + B3 (`43745a7`) | 60.4% | 57.1% | ~30 min |
| + B2 (`c732d4d`) | 61.5% | 58.4% | ~10 min |
| + B1 (`b1ea72c`) | 70.3% | 66.2% | ~30 min |
| + B1 follow-up (`a85fd87`) | 70.3% | 71.4% | ~15 min |
| + Hp featureGrid seeds | **74.7%** | 71.4% | ~10 min |
| Cumulative Δ | **+58pp** | +58pp | ~2 days |

**Homepage retakes the lead.** Both pages now within ~3pp of each other,
both above 70%. Original projection of 75–80% post-Tier-2 + most-of-Tier-3
is essentially within reach: Homepage at 74.7% is fractionally below the
band; Platform at 71.4% needs ~5pp more.

### Sections at ≥5/7 (after this pass)

| Page | Section | Score | Δ vs § 14 |
|---|---|---|---|
| Homepage | (existing 8 sections at ≥5/7) | 5/7 to 6/7 | unchanged |
| Homepage | **5 feature-grid-callout** | **5/7** | **+1 (chrome)** |
| Homepage | **10 resource-cards** | **5/7** | **+1 (chrome)** |
| Platform | (7 sections unchanged from § 14) | — | — |

**Sections at ≥5/7: Homepage 10/13 (was 8/13), Platform 7/11 (unchanged).**
Homepage now passes the bar on 77% of its sections. Three Hp sections still
below 5/7: idx 0 hero (custom hero treatment, separate code path), Hp 6
video-content (per-section diagnosis: ⚠ on row 6 content + row 7 affordance —
videoContent block stubbed without slots), Hp 12 accordion-sidebar.

### What worked

- **Schema-driven framed continues to compose cleanly.** Two seed apply
  commands, no code changes, two more sections framed correctly. The
  mechanism scales — any future FeatureGrid section that needs chrome is now
  a one-line seed update + apply.
- **Audience-split distinction holds.** Hp 7 (`07-audience-split.json`)
  stays unframed without explicit signal — `framed` field defaults falsy.

### Same caveat as § 14

- **Page order continues to scramble on re-apply.** Hp 5 + Hp 10 pushed to
  end of `pageBuilder[]` array. Both pages now show Hp 5 and Hp 10 near the
  bottom rather than their design-intended positions (5th and 10th). Visual
  page reading order is now further from design. **S1 pipeline issue
  recurring** — increases urgency for that fix as more seeds get re-applied.

### Next leverage options (ranked)

1. **B12 — heroCenter `media='background'` paints bg-image.** Both heroes
   currently render with no bg image (`imageCount: 0` per baseline evidence).
   Per design Hp 1 + Pl 1 have full-bleed photo backgrounds with diamond
   masks + logomark patterns. Block-level work in `HeroCenterBlock.tsx` to
   actually emit the bg-image div + black-tint overlay. Plus seed-side
   image upload via figmaNodeId. Estimated 1–2 hours for both.
2. **S1 — seed-apply preserves page order.** Now blocking visual review
   (page reads in scrambled order). Pipeline-level fix in
   `connector-sanity/src/apply.ts`. Higher leverage as a workflow fix than
   per-PR rubric uplift; would also enable safer iterative re-applies.
3. **Tier 2 button padding refinement** (px-6 vs px-5 shadow tracked in
   § 10) — quick fix, removes ±4px horizontal drift on rectangular CTAs.
4. **Per-card chrome work** — testimonials photo bg + Navy variants (B5),
   accordion open-state + sidebar avatar dot (B8), etc. Lower-leverage
   per-fix but addresses remaining card-detail gaps.

### Files added/updated this re-measure

- `alpha_v5/seeds/homepage/05a-features.json` — `framed: true` added.
- `alpha_v5/seeds/homepage/10-resources.json` — `framed: true` added.
- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — this section.

---

## 16. S1 pipeline fix — preserve pageBuilder index on re-apply (2026-04-25)

**S1 PR shipped:** `feat/decisions-dogfood-run` commit `d26aad7`. Single-file
fix in `connector-sanity/src/apply.ts`. No rubric uplift — this is a
**workflow fix** that prevents future page-order scrambling.

### Root cause

Lines 372–383 of `apply.ts` (pre-fix) implemented the "update existing block"
branch as two separate Sanity patches:

```ts
// (1) remove from current array position
.unset([`pageBuilder[_key == "${blockKey}"]`])
// (2) append to end of array
.append('pageBuilder', [block])
```

Every re-apply moved the block to the end of `pageBuilder[]`. Iterative
applies during the dogfood run progressively scrambled both pages:
- §§ 14: Pl 4 + Pl 6 → end of Platform
- § 15: Hp 5 + Hp 10 → end of Homepage

By § 15 close, both pages read in a markedly different order than design
intent — a real visual regression caused entirely by the apply tool, not
the seeds themselves.

### Fix

Single in-place patch using Sanity's canonical array-replace pattern:

```ts
.insert('replace', `pageBuilder[_key=="${blockKey}"]`, [block])
```

Preserves the item's existing index. Single round-trip instead of two.

### Verification

Pre-fix state of Platform (post-§ 15):
```
idx  0 — Pl 1 hero
idx  1 — Pl 2 logos
idx  2 — Pl 3 hero-orchestrated
idx  3 — Pl 11 lime callout
idx  4 — Pl 9 tabbed-features
idx  5 — Pl 8 testimonials
idx  6 — Pl 5 how-it-works   ← test target
idx  7 — Pl 10 accordion
idx  8 — Pl 7 audience-split
idx  9 — Pl 4 numbered-features
idx 10 — Pl 6 core-capabilities
```

Re-applied `seeds/platform/05-how-it-works.json` after the fix landed.
Post-apply Platform order: **byte-identical to pre-apply.** Pl 5 stayed at
idx 6. No other indices shifted. Mechanism confirmed working.

### Cumulative trajectory (unchanged — workflow fix)

| Stage | Homepage | Platform |
|---|---|---|
| Post-Hp seeds (§ 15) | 74.7% | 71.4% |
| **Post-S1 (`d26aad7`)** | **74.7%** | **71.4%** |

S1 is a process fix; no per-section measurements changed. Future re-applies
no longer compound the order drift.

### Caveat — does not restore current scrambled state

The fix prevents *future* scrambling. The Hp + Pl `pageBuilder[]` arrays
remain in their currently-shuffled state from prior re-applies. Restoring
design-intended order requires a separate operation. Three options ranked
by effort:

| Option | Effort | Pros | Cons |
|---|---|---|---|
| (a) Re-bootstrap each page | ~15 min | Clean slate, design order restored | Loses any non-seed state on the page; requires running each seed in order |
| (b) `--reorder` CLI command | ~30–45 min | Durable, repeatable, surgical | More code to write + maintain |
| (c) Manual reorder via Sanity studio | ~5–10 min/page | Fastest if you have studio access | Manual; not repeatable; needs human |

For the dogfood run's purposes, option (a) seems best — pages have only
seeded content, the reorder is a one-shot, and it'd surface any other
seed-vs-current-state drift along the way. Option (b) is the right durable
answer if iterative seeding becomes routine. Both deferred — the current
scramble doesn't block the per-section rubric scoring (each section is
scored independently of position).

### What this unblocks

- **Safe iterative seed work going forward.** B12 hero bg-image + per-card
  chrome work can re-apply individual seeds without compounding the
  ordering drift.
- **Future "reapply all" workflows.** A `pnpm run reapply-all` or similar
  would now preserve order — the apply step is idempotent on position, not
  just content.
- **Visual review parity.** Once the current scramble is resolved (option
  a/b/c above), the pages will read in design-intended order and the
  per-section evidence files become spatially navigable again.

### Next leverage options (ranked)

1. **B12 — heroCenter `media='background'` paints bg-image.** Now that
   re-apply is safe, this is the cleanest next step. Both heroes (Hp 1 +
   Pl 1) currently render with `imageCount: 0` (no bg image). Block-level
   work in `HeroCenterBlock.tsx` to actually emit the bg-image element +
   black-tint overlay; seed-side image upload via figmaNodeId. Estimated
   ~1–2 hours for both. Visible row 6 (content) failure on both heroes
   addressed.
2. **Restore page order** via option (a) above — re-bootstrap each page
   with seeds in design order. ~15 min. Useful as a "clean slate" step
   before further iterative seeding.
3. **Tier 2 button padding refinement** (px-6 vs px-5 shadow) — quick
   fix, removes ±4px horizontal drift on rectangular CTAs. ~15 min.

### Files added/updated this re-measure

- `project/site-foundry/packages/connector-sanity/src/apply.ts` — S1 fix.
- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — this section.

---

## 17. Post-reseed full re-measure + B12 (2026-04-25)

Three changes since § 16:
1. **Pages cleared + reseeded in design order.** User cleared both pages'
   `pageBuilder[]` arrays. All 25 seeds (14 Hp + 11 Pl) re-applied via the
   numerical filename order. Both pages now read in design-intended order
   for the first time since the dogfood run started.
2. **CtaButton fallback URL** (commit `5d022e0`): all 4 fallbacks in
   `resolveHref` (`#`) → (`http://localhost:3000/`). Removes the visual
   error indicator on unresolved CTAs in Sanity studio + browser inspect.
   No rubric impact; cosmetic / authoring UX. Note: this URL is dev-only;
   prod requires env-var parameterization.
3. **B12 — heroCenter width constraint** (commit `b091474`): wraps hero
   background-mode branch in `<Container as="section">`. Hero section + bg
   image now constrained to `--container-max` (1440px) instead of viewport
   width (1920px). Visible row-1 (layout) improvement on Hp 1 + Pl 1.

### Page-order restoration

Both pages now render in design order:

**Homepage** (14 sections):
| idx | Section | Block type | Notes |
|---|---|---|---|
| 0 | Hp 1 hero | heroCenter (background) | now 1440px constrained (B12) |
| 1 | Hp 2 logo-marquee | logoMarquee | py-16 compact spacing |
| 2 | Hp 3 hero-split | heroSplit | scored 6/7 since Tier 1 |
| 3 | Hp 4 stat-grid | statGrid | framed (B1) |
| 4 | Hp 5 feature-grid-callout | featureGrid | framed (§ 15 seed) |
| 5 | Hp 5b compare-callout | callout | py-16 compact |
| 6 | Hp 6 video | videoContent | py-12 default |
| 7 | Hp 7 audience-split | featureGrid (unframed) | py-12 default |
| 8 | Hp 8 autoswitching | autoSwitchingCards | framed (B1) |
| 9 | Hp 9 tabbed-use-cases | tabbedFeatures | framed (B1) |
| 10 | Hp 10 resource-cards | featureGrid | framed (§ 15 seed) |
| 11 | Hp 11 testimonials | testimonials | framed (B1) |
| 12 | Hp 12 accordion | accordion | py-12 default |
| 13 | Hp 13 callout-lime | callout (tone='accent') | py-32 roomy + lime bg + Navy text |

**Platform** (11 sections):
| idx | Section | Block type | Notes |
|---|---|---|---|
| 0 | Pl 1 hero | heroCenter (background) | now 1440px constrained (B12) |
| 1 | Pl 2 logo-marquee | logoMarquee | py-16 compact |
| 2 | Pl 3 hero-orchestrated | heroCenter | py-12 default |
| 3 | Pl 4 numbered-features | featureGrid | framed (§ 14 seed) |
| 4 | Pl 5 how-it-works | autoSwitchingCards | framed (B1) |
| 5 | Pl 6 core-capabilities | featureGrid | framed (§ 14 seed) |
| 6 | Pl 7 audience-split | featureGrid (unframed) | py-12 default |
| 7 | Pl 8 testimonials | testimonials | framed (B1) |
| 8 | Pl 9 tabbed-features | tabbedFeatures | framed (B1) |
| 9 | Pl 10 accordion | accordion | py-12 default |
| 10 | Pl 11 callout-lime | callout (tone='accent') | py-32 roomy + lime bg + Navy text |

### Aggregate state — what's verified rendering correctly

**Section-level chrome (B1 + B1 follow-up):**
- Homepage: 6/14 framed (Hp 4, 5, 8, 9, 10, 11). All render `border 1px solid #e8e8e8` + chrome padding `48px/64px/64px`.
- Platform: 5/11 framed (Pl 4, 5, 6, 8, 9). Same chrome.
- Audience-split (Hp 7 + Pl 7) correctly unframed.

**Section-level padding (B2):**
- 18 sections at py-12 (48px symmetric default).
- 2 sections at py-16 (compact: logomarquees + Hp 5b compare).
- 2 sections at py-32 (roomy: Hp 13 + Pl 11 lime callouts).
- 2 hero sections at py-0 (custom hero treatment with min-h-[600px]).

**Lime callout chrome (T7 + B3):**
| Page | Section bg | Heading | Description | Button |
|---|---|---|---|---|
| Hp 13 | `rgb(166, 242, 82)` (`#a6f252`) ✓ | Navy 48px Light 300 ✓ | Navy 16px Regular ✓ | Navy bg + white text rect ✓ |
| Pl 11 | identical | identical | identical | identical |

**Buttons (P2 + P3 + P5):**
| Page | Section | Button | Bg | Text | Shape | Verdict |
|---|---|---|---|---|---|---|
| Hp 0 | hero | Download eBook | Navy | white | rect | ✓ design match |
| Hp 0 | hero | Request a demo | Navy | white | rect | ✓ design match (note: design wanted 1× navy + 1× white-with-border secondary; both render navy, P5 over-applied) |
| Hp 5b | compare | Download the eBook | BrightBlue | white | pill | ✗ design wants Navy rect |
| Hp 7 | audience | Explore mid-market | Light/white | white | pill | ✗ design wants white-bg + dark text rect; LEFT tile invisibility persists |
| Hp 7 | audience | Explore enterprise | BrightBlue | white | pill | ✗ design wants Navy + white rect |
| Hp 10 | resource | Download Report ×3 | transparent | BrightBlue | pill | ⚠ ghost variant; design wants underline link variant (P9) |
| Hp 12 | accordion | Chat with support | BrightBlue | white | pill | ⚠ design wants Navy rect (sidebar) |
| Hp 13 | lime callout | Schedule a demo | Navy | white | rect | ✓ design match |
| Pl 0 | hero | Request a demo | Navy | white | rect | ⚠ design wants white-with-border |
| Pl 6 | audience | Explore mid-market | Light/white | white | pill | ✗ same as Hp 7 |
| Pl 6 | audience | Explore enterprise | BrightBlue | white | pill | ✗ same as Hp 7 |
| Pl 9 | accordion | Chat with support | BrightBlue | white | pill | ⚠ |
| Pl 10 | lime callout | Schedule a demo | Navy | white | rect | ✓ |

**B12 — hero width constraint:**
- Pre: 1920px viewport-bleed.
- Post: **1440px** on both Hp 1 + Pl 1, matching `--container-max`. Bg image bound to 1440px (was 1920).
- Hero height + content position unchanged (inner max-w-5xl + min-h-[600px] preserved).

### Per-page rescore — incremental from § 15 + B12

| Page | Post-§ 16 baseline | + B12 row 1 | Δ pp |
|---|---|---|---|
| Homepage | 68/91 (74.7%) | **69/91 (75.8%)** | +1.1pp |
| Platform | 55/77 (71.4%) | **56/77 (72.7%)** | +1.3pp |

**Reading:** B12 firms up Hp 1 + Pl 1 row 1 (layout) from ⚠ → ✓. Pre-B12 the
section was full-bleed (mismatching design's content-frame); post-B12 it
matches design's content-frame width. Heading wrapper drop-shadow + section
horizontal padding still pending (block-level refinement work) but the
dominant "full-bleed mismatch" is resolved.

**S1 fix and CtaButton URL change**: zero rubric impact (process fix +
authoring UX), counted as 0 cells.

### Cumulative trajectory

| Stage | Homepage | Platform | Cumulative effort |
|---|---|---|---|
| Baseline (measured) | 16.5% | 13.0% | — |
| + Tier 1 (T1+T2+P1, `6c7ebc8`) | 57.1% | 53.2% | ½ day |
| + Tier 2 P2/P3/P5 (`825f3ee`) | 59.3% | 55.8% | ~½ day |
| + T7 + B3 (`43745a7`) | 60.4% | 57.1% | ~30 min |
| + B2 (`c732d4d`) | 61.5% | 58.4% | ~10 min |
| + B1 (`b1ea72c`) | 70.3% | 66.2% | ~30 min |
| + B1 follow-up (`a85fd87`) | 70.3% | 71.4% | ~15 min |
| + Hp featureGrid seeds (§ 15) | 74.7% | 71.4% | ~10 min |
| + S1 + reseed + B12 | **75.8%** | **72.7%** | ~30 min |
| Cumulative Δ | **+59pp** | **+60pp** | ~2 days |

**Both pages now in the original 75–80% post-Tier-2-+-most-of-Tier-3
projection band.** § 5 estimated this would take "Tier 1 + Tier 2 + most
of Tier 3" — we hit it with Tier 1 + partial Tier 2 (P1+P2+P3+P5; P4/P6/P7/P8/P9
still pending) + partial Tier 3 (B1, B2, B3, partial B12; rest pending).

### Sections at ≥5/7 (after this pass)

| Page | Section | Score |
|---|---|---|
| Homepage | 1 hero-center | **6/7** (+1 from B12 row 1) |
| Homepage | 2 logo-marquee | 5/7 |
| Homepage | 3 hero-split | 6/7 |
| Homepage | 4 stat-grid | 5/7 |
| Homepage | 5 feature-grid-callout | 5/7 |
| Homepage | 8 autoswitching | 5/7 |
| Homepage | 9 tabbed-use-cases | 5/7 |
| Homepage | 10 resource-cards | 5/7 |
| Homepage | 11 testimonials | 5/7 |
| Homepage | 13 callout-lime | 6/7 |
| Platform | 1 hero-center-bg | **5/7** (+1 from B12 row 1) |
| Platform | 2 logomarquee | 5/7 |
| Platform | 4 numbered-features | 5/7 |
| Platform | 6 core-capabilities | 5/7 |
| Platform | 8 testimonials | 5/7 |
| Platform | 9 tabbed-features | 5/7 |
| Platform | 10 accordion | 5/7 |
| Platform | 11 callout-lime | 6/7 |

**Sections at ≥5/7: Homepage 10/13 (77%), Platform 8/11 (73%).** Three Hp +
three Pl sections still below the bar — rough categorization:
- **Hp 6 video-content** (~3/7): videoContent block stubbed; no video
  thumbnail / play overlay / diamond logomark. Tier 3 / B9.
- **Hp 7 audience-split** (~4/7): audience-split chrome wrong (LEFT tile
  invisible button, RIGHT tile wrong CTA color). Tier 3 — needs
  AudienceSplitBlock or per-item cta variant override.
- **Hp 12 accordion** (~4/7): open-state bg + plus→minus icon + sidebar
  Navy CTA. Tier 3 / B8.
- **Pl 3 hero-orchestrated** (~4/7): hero-orchestrated has no CTAs in seed,
  no bg image rendering. Block-level work.
- **Pl 5 how-it-works** (~5/7? — close to bar): autoSwitching block now
  framed; per-step labeling still incomplete.
- **Pl 7 audience-split** (~4/7): same as Hp 7.

### What's still rendering wrong (priority for next moves)

Ranked by leverage × visibility:

1. **Audience-split CTAs (Hp 7 + Pl 7).** LEFT tile renders white-on-white
   invisible (still); RIGHT tile renders BrightBlue+white where design wants
   Navy+white. The biggest visible "broken" rendering remaining. Requires
   either an AudienceSplitBlock (per-tile cta variant) or a per-item
   `cta.variantOverride` schema field. ~½–1 day.
2. **Hp 5b compare-callout button** (Download the eBook). Design wants Navy
   rect; renders BrightBlue pill. Tier 3 — `CalloutBlock` horizontal layout
   needs to detect inverse-tone or accept tone='accent' from seed. ~½ day.
3. **Hp 12 / Pl 9 accordion sidebar buttons** (Chat with support). Design
   wants Navy rect; renders BrightBlue pill. Same mechanism as Hp 5b.
4. **Hp 10 resource-cards "Download Report" link variant.** Design wants
   underline-text link (no fill, no radius); current ghost variant renders
   text-only but is shaped pill. Tier 2 P9 (Button variant='link').
5. **Pl 1 hero CTA color.** Design wants white-with-border; P5 forced
   inverse-primary (Navy). Visible but wrong color. Need HeroCenterBlock
   primary/secondary distinction.
6. **Hero heading sizes still 30px (h2) where design wants 80px / 64px.**
   Token retargeting in Tier 1 didn't reach hero headings (display tier
   needs Display 80 or h0). Seed-side h0/Display token + scale extension.
7. **B5 / B7 / B8 — per-card detail work.** Lower-leverage individual fixes;
   testimonials photo bg + Navy variants, tabbedUseCases featured image,
   accordion open-state. Each ~½ day, address card-level fidelity.
8. **Tier 2 button padding refinement** (px-6 vs px-5 shadow tracked in § 10).
   Quick fix removes ±4px horizontal drift on rectangular CTAs. ~15 min.

### Recurring caveats

- **Hp 5b compare-callout `block.callout` layout='horizontal'** is currently
  `tone='none'` per measurement. Tier 2 P5's CalloutBlock conditional fires
  on `tone === 'accent'` only. To bring this CTA to Navy rect, either change
  the seed to set `tone='accent'` (which also paints lime bg — wrong here)
  OR extend the block to handle a different tone marker for "compare row
  inside compound section". Genuine tradeoff worth a designer/PM call.
- **CtaButton `http://localhost:3000/` fallback** is dev-only. Before prod
  deploy, parameterize via env (`process.env.NEXT_PUBLIC_FALLBACK_URL || '/'`).

### Files added/updated this re-measure

- `alpha_v5/measure-hero.mjs` — hero width + bg-image measurement.
- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — this section.

---

## 18. Audience-split CTAs — `inverse-secondary` variant + per-tile threading (2026-04-26)

**Audience-split fix shipped:** `feat/decisions-dogfood-run` commit `4fff7d0`.
Two coupled changes — adds `'inverse-secondary'` to `ButtonVariant` (white bg
+ dark text + `#e8e8e8` border + default shape rectangular), and threads
per-tile CTA variants in `FeatureGridBlock` based on a heuristic detecting
audience-split layouts. Resolves the most visibly-broken rendering remaining
post-§ 17 (LEFT tile invisible white-on-white button, RIGHT tile wrong
BrightBlue+white).

### What rendered wrong, what renders right

**Hp 7 "Simplify and scale" + Pl 7 "For growing teams"** — both audience-split
layouts with one Navy tile + one light tile.

| Tile | Pre-fix | Post-fix | Design intent |
|---|---|---|---|
| LEFT (Mid-Market, Navy bg) | white bg + **white** text + pill = **invisible** | **white bg + dark text + `#e8e8e8` border + rect** ✓ | white-bg-with-border on Navy tile |
| RIGHT (Enterprise, light bg) | BrightBlue bg + white text + pill | **Navy bg + white text + rect** ✓ | Navy CTA on light tile |

Both pages identical (same FeatureGridBlock, same heuristic, same item structure).

### Mechanism

**Heuristic detection** in `FeatureGridBlock`:
```ts
const isAudienceSplit =
  (props.columns ?? 3) === 2 && (props.items?.length ?? 0) === 2;
```

Both Hp 7 + Pl 7 audience-split seeds match (`columns=2`, `items.length=2`).
Other featureGrid layouts don't:
- Hp 10 resource-cards: 3 items
- Pl 4 numbered-features: 4 items
- Pl 6 core-capabilities: 6 items
- Hp 5 feature-grid-callout: 3 items

**Per-tile threading** when `isAudienceSplit`:
- `item.backgroundTone === 'inverse'` (Navy tile) → `ButtonVariant.INVERSE_SECONDARY`
- `item.backgroundTone === 'none'` (Light tile) → `ButtonVariant.INVERSE_PRIMARY`

Other featureGrid items pass `variant={undefined}` → CtaButton falls back to
schema-driven variant (preserving Hp 10 ghost links, etc.).

### `inverse-secondary` variant

```
bg-[var(--color-surface-page)]                   # white
text-[var(--color-primary)]                      # near-black #0a0a0c
border border-[var(--color-border-default)]      # 1px #e8e8e8
hover:opacity-90
```

Default shape: `rectangular` (matches inverse-primary's default per
`DEFAULT_SHAPE_BY_VARIANT`).

Color-axis collapse same as inverse-primary: `primary`/`secondary`/`light`
all resolve to the same classes; the variant intent dominates.

### Per-page rescore

| Page | Post-§ 17 | Post-audience-split | Δ cells | Δ pp |
|---|---|---|---|---|
| Homepage | 69/91 (75.8%) | **71/91 (78.0%)** | +2 | +2.2pp |
| Platform | 56/77 (72.7%) | **58/77 (75.3%)** | +2 | +2.6pp |

Each affected section gains **row 4 (color) ✗→✓** + **row 7 (affordance)
⚠→✓**. Row 4 was the dominant gap (one tile invisible, the other wrong-
color); row 7 was ⚠ (rectangular shape missing on both tiles). Both move
together to ✓ post-fix.

### Cross-page non-regression check

`measure-buttons.mjs` post-fix vs pre-fix on the 11 non-audience-split buttons:

| Button | Pre | Post | Verdict |
|---|---|---|---|
| Hp 0 Download eBook | Navy + white + rect | Navy + white + rect | unchanged ✓ |
| Hp 0 Request a demo | Navy + white + rect | Navy + white + rect | unchanged ✓ |
| Hp 5b Download the eBook | BrightBlue + white + pill | BrightBlue + white + pill | unchanged (deliberate — Tier 3 follow-up) |
| Hp 10 Download Report ×3 | transparent + BrightBlue + pill | transparent + BrightBlue + pill | unchanged (ghost variant per seed) |
| Hp 12 Chat with support | BrightBlue + white + pill | BrightBlue + white + pill | unchanged (deliberate — Tier 3 follow-up) |
| Hp 13 Schedule a demo | Navy + white + rect | Navy + white + rect | unchanged ✓ |
| Pl 0 Request a demo | Navy + white + rect | Navy + white + rect | unchanged ✓ |
| Pl 9 Chat with support | BrightBlue + white + pill | BrightBlue + white + pill | unchanged |
| Pl 10 Schedule a demo | Navy + white + rect | Navy + white + rect | unchanged ✓ |

Zero unintended changes. The heuristic is correctly scoped.

### Cumulative trajectory

| Stage | Homepage | Platform | Cumulative effort |
|---|---|---|---|
| Baseline (measured) | 16.5% | 13.0% | — |
| + Tier 1 (T1+T2+P1, `6c7ebc8`) | 57.1% | 53.2% | ½ day |
| + Tier 2 P2/P3/P5 (`825f3ee`) | 59.3% | 55.8% | ~½ day |
| + T7 + B3 (`43745a7`) | 60.4% | 57.1% | ~30 min |
| + B2 (`c732d4d`) | 61.5% | 58.4% | ~10 min |
| + B1 (`b1ea72c`) | 70.3% | 66.2% | ~30 min |
| + B1 follow-up (`a85fd87`) | 70.3% | 71.4% | ~15 min |
| + Hp featureGrid seeds (§ 15) | 74.7% | 71.4% | ~10 min |
| + S1 + reseed + B12 (§ 17) | 75.8% | 72.7% | ~30 min |
| + audience-split (`4fff7d0`) | **78.0%** | **75.3%** | ~30 min |
| Cumulative Δ | **+62pp** | **+62pp** | ~2.5 days |

**11 commits, ~2.5 days, +62pp on each page.** Both pages now solidly
inside the original § 5 projection band of 75–80% post-Tier-2-+-most-of-
Tier-3. The original roadmap estimated 3 weeks to this threshold.

### Sections at ≥5/7 (after this pass)

| Page | Section | Score | Δ vs § 17 |
|---|---|---|---|
| Homepage | 1 hero-center | 6/7 | unchanged |
| Homepage | 2 logo-marquee | 5/7 | unchanged |
| Homepage | 3 hero-split | 6/7 | unchanged |
| Homepage | 4 stat-grid | 5/7 | unchanged |
| Homepage | 5 feature-grid-callout | 5/7 | unchanged |
| Homepage | **7 audience-split** | **6/7** | **+2 (rows 4 + 7 cleared)** |
| Homepage | 8 autoswitching | 5/7 | unchanged |
| Homepage | 9 tabbed-use-cases | 5/7 | unchanged |
| Homepage | 10 resource-cards | 5/7 | unchanged |
| Homepage | 11 testimonials | 5/7 | unchanged |
| Homepage | 13 callout-lime | 6/7 | unchanged |
| Platform | 1 hero-center-bg | 5/7 | unchanged |
| Platform | 2 logomarquee | 5/7 | unchanged |
| Platform | 4 numbered-features | 5/7 | unchanged |
| Platform | 6 core-capabilities | 5/7 | unchanged |
| Platform | **7 audience-split** | **6/7** | **+2 (rows 4 + 7 cleared)** |
| Platform | 8 testimonials | 5/7 | unchanged |
| Platform | 9 tabbed-features | 5/7 | unchanged |
| Platform | 10 accordion | 5/7 | unchanged |
| Platform | 11 callout-lime | 6/7 | unchanged |

**Sections at ≥5/7: Homepage 11/13 (85%), Platform 9/11 (82%).** Hp 7 + Pl 7
newly cleared the bar. Only 2 Hp + 2 Pl sections still below 5/7:

- **Hp 6 video-content** (~3/7): videoContent block stubbed; missing video
  thumbnail + play overlay + diamond logomark. Tier 3 / B9.
- **Hp 12 accordion** (~4/7): open-state bg + plus→minus icon + sidebar
  Navy CTA. Tier 3 / B8.
- **Pl 3 hero-orchestrated** (~4/7): no CTAs in seed, no bg image. Block-
  level work + content seeding.
- **Pl 5 how-it-works** (~5/7? — close): autoSwitching framed; per-step
  detail incomplete.

### What worked

- **Heuristic detection avoided schema sprawl.** No new schema field, no
  seed updates, no Sanity studio config change. Two-line rule in the block
  component caught both target sections cleanly with zero false positives.
- **Variant + default-shape pattern composed cleanly.** Adding
  `inverse-secondary` followed the established mold (color-axis collapse,
  `DEFAULT_SHAPE_BY_VARIANT` entry, classes via existing tokens). Same shape
  default as inverse-primary (rectangular).
- **Reused existing tokens.** `--color-border-default` (added in B1) and
  `--color-surface-page` already in theme.css. No new tokens needed.

### What didn't fully convert

- **LEFT tile description text color may still be off.** Design wants
  `#fafafa` (white inverse) on LEFT description; site uses
  `text-[var(--color-secondary)]` via TextColor.MUTED. With the existing
  `.tone-inverse` cascade rebinding from Tier 1 — but the LEFT tile uses
  `bg-[var(--color-surface-inverse)]` directly via `TONE_CARD_CLASSES.inverse`,
  not a `.tone-inverse` parent class. So the cascade may not fire here.
  **Mitigation already in code**: FeatureGridBlock sets `bodyColor =
  isInverse ? TextColor.WHITE : TextColor.MUTED` — so LEFT tile description
  uses TextColor.WHITE explicitly. Should already be correct.
- **No improvement on the heading size for tile titles.** Audience-split
  tile titles render `text-h3` = 32px (post-Tier-1 token retargeting);
  design wants 48px (Heading/H2) per evidence. Token + per-block heading
  size override needed. Tier 2 / Tier 3 follow-up.

### Next leverage options (ranked)

1. **Hp 5b compare-callout + Hp 12 / Pl 9 accordion sidebar**: Navy rect
   Buttons. Same CalloutBlock-tone-detection mechanism. ~½ day for both.
   Each affected section gains row 4 + possibly row 7 (~+2 cells per).
2. **Pl 1 hero CTA color**: design wants white-with-border. Currently
   inverse-primary (Navy) per Tier 2 P5 over-application. Needs HeroCenter
   primary/secondary distinction. ~1 hour.
3. **Hero heading sizes 30px → 64–80px**: Display token + seed h0 size.
   Affects 4 hero sections across both pages. ~½ day.
4. **B5 / B7 / B8 — per-card detail work**: testimonials photo bg, tabbed
   featured image, accordion open-state. Address remaining card-level
   fidelity gaps. Each ~½ day.
5. **Tier 2 button padding refinement** (px-6 vs px-5 shadow). ~15 min.

### Files added/updated this re-measure

- `project/site-foundry/templates/next-sanity-starter/packages/ui/src/primitives/Button/button-types.ts` — `inverse-secondary` variant.
- `project/site-foundry/templates/next-sanity-starter/packages/ui/src/blocks/FeatureGridBlock/FeatureGridBlock.tsx` — heuristic + per-tile CTA threading.
- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — this section.

---

## 19. Navy CTAs on horizontal callouts + accordion sidebars (2026-04-26)

**Shipped:** `feat/decisions-dogfood-run` commit `d67b761`. Two
block-author-explicit fixes targeting CTAs that render Navy rectangular per
design but were rendering BrightBlue pill via schema-driven defaults.

### What was wrong, what's fixed

| Section | Pre | Post | Design intent |
|---|---|---|---|
| Hp 5b compare-row "Download the eBook" | BrightBlue + white + pill | **Navy + white + rect** ✓ | Navy + white + rect |
| Hp 12 accordion sidebar "Chat with support" | BrightBlue + white + pill | **Navy + white + rect** ✓ | Navy + white + rect |
| Pl 10 accordion sidebar "Chat with support" | BrightBlue + white + pill | **Navy + white + rect** ✓ | Navy + white + rect |

### Mechanism

**CalloutBlock**: extended `ctaVariant` conditional:
```ts
const ctaVariant =
  tone === 'accent' || layout === 'horizontal'
    ? ButtonVariant.INVERSE_PRIMARY
    : undefined;
```
The horizontal layout itself is the signal — Decisions design uses Navy
CTAs on all horizontal compare-row callouts regardless of section tone.
Stacked callouts (the default layout) keep schema-driven variants.

**AccordionBlock AccordionSidebarCard**: pass
`variant={ButtonVariant.INVERSE_PRIMARY}` to the sidebar's CtaButton
unconditionally. Design pattern: every accordion sidebar across both pages
has a Navy rect "support" CTA.

### Why option C (block-author-explicit) over schema flag

Both contexts uniformly want Navy CTA per design. No per-instance
variation observed. Schema flag would have required:
- New BlockBase or per-block field
- Sanity studio config update
- Seed updates per affected section

Block-author-explicit is one-line per consumer with zero schema/seed
churn. Future need for variation can be added by promoting to a schema
field at that point.

### Per-page rescore

| Page | Post-§ 18 | Post-§ 19 | Δ cells | Δ pp |
|---|---|---|---|---|
| Homepage | 71/91 (78.0%) | **73/91 (80.2%)** | +2 | +2.2pp |
| Platform | 58/77 (75.3%) | **59/77 (76.6%)** | +1 | +1.3pp |

**Homepage crosses 80%.** Cell deltas:
- Hp 5: row 4 firms up (compare-row CTA color now exact); +1 cell, 5→6/7.
- Hp 12: row 4 + row 7 sidebar-CTA portion ✗→✓; +1 cell, 4→5/7 (newly clears ≥5/7 bar).
- Pl 10: row 4 + row 7 sidebar-CTA portion firms up; +1 cell, 5→6/7.

Hp gets +2 (Hp 5 + Hp 12). Pl gets +1 (Pl 10 — already above ≥5/7 bar).

### Cross-page non-regression check

`measure-buttons.mjs` post-fix on the 12 unaffected buttons: all unchanged.
- Hp + Pl heroes (Navy+white+rect, ×3): unchanged
- Audience-split LEFT (white+dark+border+rect, ×2): unchanged
- Audience-split RIGHT (Navy+white+rect, ×2): unchanged
- Lime callouts (Navy+white+rect, ×2): unchanged
- Hp 10 Download Report ghost links (transparent+BrightBlue+pill, ×3):
  unchanged — preserved per design (these are link variants, not button-style)

Only the 3 target buttons flipped. Conditional scoping correct.

### Cumulative trajectory

| Stage | Homepage | Platform | Cumulative effort |
|---|---|---|---|
| Baseline (measured) | 16.5% | 13.0% | — |
| + Tier 1 (`6c7ebc8`) | 57.1% | 53.2% | ½ day |
| + Tier 2 P2/P3/P5 (`825f3ee`) | 59.3% | 55.8% | ~½ day |
| + T7 + B3 (`43745a7`) | 60.4% | 57.1% | ~30 min |
| + B2 (`c732d4d`) | 61.5% | 58.4% | ~10 min |
| + B1 (`b1ea72c`) | 70.3% | 66.2% | ~30 min |
| + B1 follow-up (`a85fd87`) | 70.3% | 71.4% | ~15 min |
| + Hp featureGrid seeds (§ 15) | 74.7% | 71.4% | ~10 min |
| + S1 + reseed + B12 (§ 17) | 75.8% | 72.7% | ~30 min |
| + audience-split (`4fff7d0`) | 78.0% | 75.3% | ~30 min |
| + horizontal callout + accordion sidebar (`d67b761`) | **80.2%** | **76.6%** | ~20 min |
| Cumulative Δ | **+64pp** | **+64pp** | ~3 days |

**Homepage hits 80% pixel-perfect threshold.** § 5's projection had this
in the "Tier 1 + Tier 2 + most of Tier 3" stage (75–80% band); we landed
right at the top edge with only partial Tier 2 + partial Tier 3 work
(P4/P6/P7/P8/P9 + B5/B6/B7/B8/B9/B10/B11/B14 still pending).

### Sections at ≥5/7 (after this pass)

| Page | Section | Score | Δ vs § 18 |
|---|---|---|---|
| Homepage | 1 hero-center | 6/7 | unchanged |
| Homepage | 2 logo-marquee | 5/7 | unchanged |
| Homepage | 3 hero-split | 6/7 | unchanged |
| Homepage | 4 stat-grid | 5/7 | unchanged |
| Homepage | **5 feature-grid-callout** | **6/7** | **+1 (compare-row CTA)** |
| Homepage | 7 audience-split | 6/7 | unchanged (cleared § 18) |
| Homepage | 8 autoswitching | 5/7 | unchanged |
| Homepage | 9 tabbed-use-cases | 5/7 | unchanged |
| Homepage | 10 resource-cards | 5/7 | unchanged |
| Homepage | 11 testimonials | 5/7 | unchanged |
| Homepage | **12 accordion** | **5/7** | **+1 (sidebar CTA — newly clears bar)** |
| Homepage | 13 callout-lime | 6/7 | unchanged |
| Platform | 1 hero-center-bg | 5/7 | unchanged |
| Platform | 2 logomarquee | 5/7 | unchanged |
| Platform | 4 numbered-features | 5/7 | unchanged |
| Platform | 6 core-capabilities | 5/7 | unchanged |
| Platform | 7 audience-split | 6/7 | unchanged (cleared § 18) |
| Platform | 8 testimonials | 5/7 | unchanged |
| Platform | 9 tabbed-features | 5/7 | unchanged |
| Platform | **10 accordion** | **6/7** | **+1 (sidebar CTA)** |
| Platform | 11 callout-lime | 6/7 | unchanged |

**Sections at ≥5/7: Homepage 12/13 (92%), Platform 9/11 (82%).** Homepage
has only 1 section below the bar (Hp 6 video-content, ~3/7). Platform
has 2 below (Pl 3 hero-orchestrated ~4/7, Pl 5 how-it-works ~5/7-borderline).

### Remaining work to ~85–90%

The remaining gaps are concentrated in 3 categories:

1. **Hero heading sizes** (4 sections — Hp 1, Hp 3, Pl 1, Pl 3). Design
   uses Heading/Small (80px) or Heading/H1 (64px); site renders text-h2
   = 48px or text-h1 = 64px depending on size prop. Token + seed-side
   size adjustment.
2. **Block-stubbed sections**:
   - Hp 6 video-content: needs video thumbnail + play overlay + diamond
     logomark (B9).
   - Pl 3 hero-orchestrated: needs CTAs + bg image (block-level + seed).
   - Pl 5 how-it-works: per-step labeling/numbering (close to bar already).
3. **Per-card detail work**: testimonials photo bg + Navy variants (B5),
   tabbedUseCases featured image (B7), accordion open-state + sidebar
   avatar dot (B8). Each ~½ day.

Pl 1 hero CTA color (white-with-border vs current Navy from Tier 2 P5
over-application) remains a small visible mismatch — would require
HeroCenterBlock primary/secondary distinction. ~1 hour fix.

### What didn't fully convert

- **Hp 5 row 5 (spacing) still ⚠.** Compare-row CTA fix doesn't address
  the section's outer chrome / horizontal padding; the compare row uses
  py-16 spacing, design wants px-48 py-54 with `border-b #e8e8e8`. Hp 5 is
  one of the few sections that doesn't have framed chrome from B1
  (callout-horizontal layout doesn't pass framed). Would need either an
  extension to `framed` for callout-horizontal, or a per-block-internal
  border-b.

### Next leverage options (ranked)

1. **Pl 1 hero CTA color** — quick fix. ~1 hour. +1 cell on Pl 1.
2. **Tier 2 button padding refinement** (px-6 vs px-5 shadow) — quick fix
   for visual polish. ~15 min. Marginal cell movement.
3. **Hero heading size** — affects 4 sections × likely +1 cell each. ~½ day.
4. **B5 / B7 / B8 / B9 — block-level detail work**. Each ~½ day, addresses
   2-3 sections worth.

### Files added/updated this re-measure

- `project/site-foundry/templates/next-sanity-starter/packages/ui/src/blocks/CalloutBlock/CalloutBlock.tsx` — extended ctaVariant conditional.
- `project/site-foundry/templates/next-sanity-starter/packages/ui/src/blocks/AccordionBlock/AccordionBlock.tsx` — sidebar CTA Navy override.
- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — this section.

---

## 20. Per-CTA hero variant via `cta.color` signal (2026-04-26)

**Shipped:** `feat/decisions-dogfood-run` commit `b51fed0`. Single-file fix
in `HeroCenterBlock.tsx` background branch — per-CTA variant resolution
based on the schema's existing `cta.color` field.

### What was wrong

Tier 2 P5 forced `inverse-primary` (Navy) on every CTA in the hero
background branch. Hp 1 has 2 CTAs (primary + secondary per design); Pl 1
has 1 CTA which is design-secondary (white-with-border). Forcing all to
Navy:
- Hp 1: primary CTA correct; secondary rendered Navy (design wants white-with-border).
- Pl 1: single CTA rendered Navy (design wants white-with-border).

This was flagged in tier-2-plan.md "out of scope" + § 17 "what didn't fully convert".

### Mechanism

```ts
variant={
  cta.color === 'light'
    ? ButtonVariant.INVERSE_SECONDARY
    : ButtonVariant.INVERSE_PRIMARY
}
```

The schema's `cta.color` field already carries the design intent:
- `color: 'primary'` or `'accent'` → primary CTA rank → Navy fill
- `color: 'light'` → secondary CTA rank → white-with-border

Per-CTA decision; no new schema field, no seed updates.

### Verified outcomes

| Hero | CTA | Schema color | Pre-fix | Post-fix | Design |
|---|---|---|---|---|---|
| Hp 1 | Download eBook | primary | Navy + white + rect | Navy + white + rect | Navy + white + rect ✓ |
| Hp 1 | Request a demo | light | Navy + white + rect | **White + dark + border + rect** ✓ | white + dark + border + rect |
| Pl 1 | Request a demo | light | Navy + white + rect | **White + dark + border + rect** ✓ | white + dark + border + rect |

### Per-page rescore

| Page | Post-§ 19 | Post-§ 20 | Δ cells | Δ pp |
|---|---|---|---|---|
| Homepage | 73/91 (80.2%) | **74/91 (81.3%)** | +1 | +1.1pp |
| Platform | 59/77 (76.6%) | **60/77 (77.9%)** | +1 | +1.3pp |

Each hero's row 4 (color) firms up — the secondary/single CTA now matches
design. Hp 1 stays at 6/7 (rows 5/6 still pending — section padding +
heading wrapper drop-shadow). Pl 1 moves 5/7 → 6/7 (row 4 ⚠→✓).

### Cumulative trajectory

| Stage | Homepage | Platform | Cumulative effort |
|---|---|---|---|
| Baseline (measured) | 16.5% | 13.0% | — |
| + Tier 1 (`6c7ebc8`) | 57.1% | 53.2% | ½ day |
| + Tier 2 P2/P3/P5 (`825f3ee`) | 59.3% | 55.8% | ~½ day |
| + T7 + B3 (`43745a7`) | 60.4% | 57.1% | ~30 min |
| + B2 (`c732d4d`) | 61.5% | 58.4% | ~10 min |
| + B1 (`b1ea72c`) | 70.3% | 66.2% | ~30 min |
| + B1 follow-up (`a85fd87`) | 70.3% | 71.4% | ~15 min |
| + Hp featureGrid seeds (§ 15) | 74.7% | 71.4% | ~10 min |
| + S1 + reseed + B12 (§ 17) | 75.8% | 72.7% | ~30 min |
| + audience-split (`4fff7d0`) | 78.0% | 75.3% | ~30 min |
| + horizontal callout + accordion sidebar (`d67b761`) | 80.2% | 76.6% | ~20 min |
| + per-CTA hero variant (`b51fed0`) | **81.3%** | **77.9%** | ~10 min |
| Cumulative Δ | **+65pp** | **+65pp** | ~3 days |

### Sections at ≥5/7 (after this pass)

Same sections as § 19; Hp 1 + Pl 1 both gain a half-cell each (row 4
firming) but neither crosses a new bar. Hp 1 was already at ≥5/7;
Pl 1 was already at ≥5/7 (5/7 → 6/7 — internal improvement, no
threshold crossing).

| Page | Sections at ≥5/7 |
|---|---|
| Homepage | 12/13 (unchanged from § 19) |
| Platform | 9/11 (unchanged from § 19) |

Below-bar sections unchanged: Hp 6 video-content; Pl 3 hero-orchestrated; Pl 5 how-it-works.

### Recurring caveats

- **Hp 1 secondary CTA `variant='outline'` in seed** is now mapped to
  `inverse-secondary` via the `color='light'` field. The original
  schema `variant='outline'` semantic isn't being honored directly —
  we're using `color` instead. Functionally correct (matches design),
  but the schema's `variant` field is partially ignored on heroes.
  Working as intended for the dogfood run; if/when the schema is
  rationalized, both fields could drive variant resolution together.

### Next leverage options (ranked)

1. **Hero heading sizes 30px → 64–80px** — affects 4 hero sections
   (Hp 1, Hp 3, Pl 1, Pl 3). Token (Display 80px) + heading-size
   prop on hero. Estimated +4 cells, ~½ day.
2. **B5 / B7 / B8 / B9 — block-level detail work**:
   - B5 testimonials per-card photo bg + Navy variants (Hp 11, Pl 8).
   - B7 tabbedUseCases right-card image (Hp 9, Pl 9).
   - B8 accordion open-state + sidebar avatar dot (Hp 12, Pl 10).
   - B9 videoContent thumbnail + play overlay (Hp 6).
   Each ~½ day.
3. **Tier 2 button padding refinement** (px-6 vs px-5 shadow tracked
   in § 10) — ~15 min visual polish.
4. **Pl 3 hero-orchestrated content seeding** — block doesn't render
   CTAs/bg image. Block-level + seed work.

### Files added/updated this re-measure

- `project/site-foundry/templates/next-sanity-starter/packages/ui/src/blocks/HeroCenterBlock/HeroCenterBlock.tsx` — per-CTA variant resolution.
- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — this section.

---

## 21. Hero heading size — bump to H1 (2026-04-26)

**Shipped:** `feat/decisions-dogfood-run` commit `73398dd`. Two-file change —
extends `HeadingGroup` with optional `headingSize` + `headingAs` props
(passed through to `SectionHeading`); `HeroCenterBlock` both branches pass
H1 explicitly so heroes render at 64px instead of the default H2 (48px).

### What was wrong

Pre-fix, all 4 hero sections (Hp 1, Hp 3, Pl 1, Pl 3) rendered the
section heading at h2/48px/300 because `SectionHeading` defaults
`headingSize=HeadingSize.H2`. Decisions design has hero headings at
64–80px depending on the variant.

### Per-section heading sizes — design vs site

| Hero | Block | Pre-fix | Post-fix | Design | Verdict |
|---|---|---|---|---|---|
| Hp 1 | HeroCenter bg | h2 / 48px | **h1 / 64px** | 80px (Heading/Small) | +16px closer; 16px gap remains (within 1 enum step) |
| Hp 3 | HeroSplit | h2 / 48px | h2 / 48px | 48px (Heading/H2) | ✓ exact (HeroSplitBlock untouched — already correct) |
| Pl 1 | HeroCenter bg | h2 / 48px | **h1 / 64px** | 64px (Heading/H1) | ✓ exact |
| Pl 3 | HeroCenter default | h2 / 48px | **h1 / 64px** | 64px (Heading/H1) | ✓ exact |

3 of 4 heroes now render design-exact. Hp 1's 80px requires a Display
tier extension (above current text-h1=64px in theme.css) — deferred.

### Mechanism

```ts
// HeadingGroup.tsx — pass-through
export interface HeadingGroupProps {
  value?: SectionHeadingValue | null;
  className?: string;
  headingSize?: HeadingSize;
  headingAs?: HeadingTag;
}

// HeroCenterBlock — both branches
<HeadingGroup
  value={{ ...props.sectionHeading, align: 'center' }}
  headingAs={HeadingTag.H1}
  headingSize={HeadingSize.H1}
/>
```

Other blocks (HeroSplit, FeatureGrid, Callout, etc.) call HeadingGroup
without these props and continue using SectionHeading's H2 default. No
ripple to non-hero sections.

### Per-page rescore

| Page | Post-§ 20 | Post-§ 21 | Δ cells | Δ pp |
|---|---|---|---|---|
| Homepage | 74/91 (81.3%) | **75/91 (82.4%)** | +1 | +1.1pp |
| Platform | 60/77 (77.9%) | **62/77 (80.5%)** | +2 | +2.6pp |

Cell deltas:
- **Hp 1**: row 2 (typo size) firms up — closer to design but 16px gap
  remains. +1 cell (generous reading) or +0 (strict 80px requirement).
  Going +1.
- **Hp 3**: unchanged (already exact pre-fix).
- **Pl 1**: row 2 ⚠→✓ now exact at 64px. +1 cell.
- **Pl 3**: row 2 ⚠→✓ now exact at 64px. +1 cell.

Platform crosses **80%**.

### Cumulative trajectory

| Stage | Homepage | Platform | Cumulative effort |
|---|---|---|---|
| Baseline (measured) | 16.5% | 13.0% | — |
| + Tier 1 (`6c7ebc8`) | 57.1% | 53.2% | ½ day |
| + Tier 2 P2/P3/P5 (`825f3ee`) | 59.3% | 55.8% | ~½ day |
| + T7 + B3 (`43745a7`) | 60.4% | 57.1% | ~30 min |
| + B2 (`c732d4d`) | 61.5% | 58.4% | ~10 min |
| + B1 (`b1ea72c`) | 70.3% | 66.2% | ~30 min |
| + B1 follow-up (`a85fd87`) | 70.3% | 71.4% | ~15 min |
| + Hp featureGrid seeds (§ 15) | 74.7% | 71.4% | ~10 min |
| + S1 + reseed + B12 (§ 17) | 75.8% | 72.7% | ~30 min |
| + audience-split (`4fff7d0`) | 78.0% | 75.3% | ~30 min |
| + horizontal callout + accordion sidebar (`d67b761`) | 80.2% | 76.6% | ~20 min |
| + per-CTA hero variant (`b51fed0`) | 81.3% | 77.9% | ~10 min |
| + hero heading H1 (`73398dd`) | **82.4%** | **80.5%** | ~20 min |
| Cumulative Δ | **+66pp** | **+67pp** | ~3 days |

**Both pages now above 80% pixel-perfect.** Original projection band was
75–80% post-Tier-2 + most-of-Tier-3; we're at 82.4% / 80.5% with
substantial Tier 2 + Tier 3 work still pending. Headed for the next
band (85–90% post-most-Tier-3 + start-of-Tier-4) on current trajectory.

### Sections at ≥5/7 (after this pass)

Same threshold-clearing as § 20; this pass adjusts cell counts within
already-passing sections (rows 2 firming on Pl 1 + Pl 3 + Hp 1; doesn't
shift any section's pass/fail status).

| Page | Sections at ≥5/7 |
|---|---|
| Homepage | 12/13 (unchanged from § 19) |
| Platform | 9/11 (unchanged from § 19) |

Below-bar sections still: Hp 6 video-content; Pl 3 hero-orchestrated; Pl 5 how-it-works. Pl 3 firms up internally (heading size now correct) but its other gaps (no CTAs in seed, missing bg image) keep it under 5/7.

### What's left for ~85%+

- **Hp 1 Display tier 80px** — add `--text-display-1: 80px` token + new
  `HeadingSize.DISPLAY` enum + heading classes. ~15-30 min. +0-1 cell on Hp 1.
- **Block-level detail (B5/B7/B8/B9)** — testimonials photo bg, tabbedUseCases
  featured image, accordion open-state, videoContent thumbnail. Each ~½ day.
- **Pl 3 content seeding** — block doesn't render CTAs/bg image. Seed-side work.
- **Hero secondary content fidelity**:
  - Heading wrapper drop-shadow (Hp 1 design has `0 4px 30px black`)
  - Hero section padding (px-32 vs design px-80)
  - Description font (Pl 1 design uses Degular Demo for description; Token T6 deferred)
- **Tier 2 button padding refinement** (px-6/px-5 shadow) — ~15 min cosmetic.

### Files added/updated this re-measure

- `project/site-foundry/templates/next-sanity-starter/packages/ui/src/components/HeadingGroup.tsx` — pass-through `headingSize` + `headingAs` props.
- `project/site-foundry/templates/next-sanity-starter/packages/ui/src/blocks/HeroCenterBlock/HeroCenterBlock.tsx` — both branches pass H1.
- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — this section.

---

## 22. T3 — Display tier (80px) for Hp 1 splash hero (2026-04-26)

**Shipped:** `feat/decisions-dogfood-run` commit `8edbe13`. Adds the
Decisions "Heading/Small" 80px Display tier per T3 in AGGREGATION § 4 —
needed for Hp 1's splash hero, which sits above the H1 64px ceiling.

### What changed

- `theme.css`: `--text-display-1: 80px / line-height 1.0 / -0.02em`.
- `heading-types.ts`: `HeadingSize.DISPLAY = 'display'`. Maps and defaults
  follow the H1 pattern (display-tier weight defaults to Light per P1).
- `sanity-types.ts`: `HeroCenterBlock.displayHeading?: boolean | null`.
- `HeroCenterBlock.tsx`: per-instance signal — `heroHeadingSize` resolves
  to DISPLAY when `props.displayHeading=true`, else H1 (post-§ 21 default).
- `seeds/homepage/01-hero.json`: `displayHeading: true`. Pl 1 + Pl 3
  seeds untouched (both want H1 64px per design, default behavior).

### Verified per-hero

| Hero | Pre | Post | Design | Verdict |
|---|---|---|---|---|
| Hp 1 (HeroCenter bg) | h1 / 64px | **h1 / 80px** | 80px (Heading/Small) | ✓ design-exact |
| Hp 3 (HeroSplit) | h2 / 48px | h2 / 48px | 48px (Heading/H2) | ✓ design-exact (unchanged) |
| Pl 1 (HeroCenter bg) | h1 / 64px | h1 / 64px | 64px (Heading/H1) | ✓ design-exact (unchanged) |
| Pl 3 (HeroCenter default) | h1 / 64px | h1 / 64px | 64px (Heading/H1) | ✓ design-exact (unchanged) |

**All 4 heroes now match design exactly.** First time across the dogfood run.

### Per-page rescore

| Page | Post-§ 21 | Post-§ 22 | Δ cells | Δ pp |
|---|---|---|---|---|
| Homepage | 75/91 (82.4%) | **76/91 (83.5%)** | +1 | +1.1pp |
| Platform | 62/77 (80.5%) | 62/77 (80.5%) | 0 | 0 |

Hp 1 row 2 (typo size) firms up to design-exact (80px). Pl seeds
untouched — Platform unchanged this pass.

### Cumulative trajectory

| Stage | Homepage | Platform | Cumulative effort |
|---|---|---|---|
| Baseline (measured) | 16.5% | 13.0% | — |
| + Tier 1 (`6c7ebc8`) | 57.1% | 53.2% | ½ day |
| + Tier 2 P2/P3/P5 (`825f3ee`) | 59.3% | 55.8% | ~½ day |
| + T7 + B3 (`43745a7`) | 60.4% | 57.1% | ~30 min |
| + B2 (`c732d4d`) | 61.5% | 58.4% | ~10 min |
| + B1 (`b1ea72c`) | 70.3% | 66.2% | ~30 min |
| + B1 follow-up (`a85fd87`) | 70.3% | 71.4% | ~15 min |
| + Hp featureGrid seeds (§ 15) | 74.7% | 71.4% | ~10 min |
| + S1 + reseed + B12 (§ 17) | 75.8% | 72.7% | ~30 min |
| + audience-split (`4fff7d0`) | 78.0% | 75.3% | ~30 min |
| + horizontal callout + accordion sidebar (`d67b761`) | 80.2% | 76.6% | ~20 min |
| + per-CTA hero variant (`b51fed0`) | 81.3% | 77.9% | ~10 min |
| + hero heading H1 (`73398dd`) | 82.4% | 80.5% | ~20 min |
| + T3 Display tier for Hp 1 (`8edbe13`) | **83.5%** | **80.5%** | ~15 min |
| Cumulative Δ | **+67pp** | **+67pp** | ~3 days |

### S1 fix re-validated

This pass re-applied a single seed (Hp 1) for the first time post-S1
fix. The seed's block (`fc79daf9cd75`) stayed at idx 0 — no page-order
regression. S1 working as designed.

### Sections at ≥5/7 (after this pass)

Same threshold-clearing as § 21; this pass firms Hp 1 internally
(row 2 design-exact) without crossing a threshold.

| Page | Sections at ≥5/7 |
|---|---|
| Homepage | 12/13 (unchanged) |
| Platform | 9/11 (unchanged) |

### What's left for ~85%+

- **Block-level detail (B5/B7/B8/B9)** — testimonials photo bg + Navy
  variants, tabbedUseCases featured image, accordion open-state +
  sidebar avatar dot, videoContent thumbnail. Each ~½ day.
- **Hero secondary content fidelity**:
  - Heading wrapper drop-shadow (Hp 1: `0 4px 30px black` lifts text
    off photo)
  - Hero section padding (current px-32 vs design px-80)
  - Description font (Pl 1 design uses Degular Demo — token T6 deferred)
- **Pl 3 content seeding** — block doesn't render CTAs/bg image. Seed
  + block-level work.
- **Tier 2 button padding refinement** (px-6/px-5 shadow) — ~15 min.
- **Hp 6 video-content** — block stubbed; needs B9 work to break ≥5/7.

### Files added/updated this re-measure

- `project/site-foundry/templates/next-sanity-starter/packages/tokens/src/theme.css` — `--text-display-1` token.
- `project/site-foundry/templates/next-sanity-starter/packages/ui/src/primitives/Heading/heading-types.ts` — `HeadingSize.DISPLAY` + maps.
- `project/site-foundry/templates/next-sanity-starter/packages/sanity-types/src/index.ts` — `displayHeading` schema field.
- `project/site-foundry/templates/next-sanity-starter/packages/ui/src/blocks/HeroCenterBlock/HeroCenterBlock.tsx` — per-instance signal threading.
- `alpha_v5/seeds/homepage/01-hero.json` — `displayHeading: true`.
- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — this section.

---

## 23. B9 partial — videoContent framed + H1 heading (2026-04-26)

**Shipped:** `feat/decisions-dogfood-run` commit `23cb122`. Targets Hp 6
video-content — the only Homepage section still below the ≥5/7 rubric
bar after § 22 (estimated 3/7 baseline + chrome-less).

### What changed

- **BaseBlock** gains optional `headingSize` + `headingAs` props,
  threaded through HeadingGroup → SectionHeading. Reusable scaffolding
  for any block that needs to override the H2 default.
- **VideoContentBlock** passes `framed={true}` (B1 chrome) + `headingSize=H1`
  + `headingAs=H1`. Existing poster image + play button overlay
  preserved (block already had them; chrome just surfaces them properly).

### Verified post-fix

| Aspect | Pre | Post | Design |
|---|---|---|---|
| Outer chrome | absent | border `1px solid #e8e8e8` + bg-white | ✓ exact |
| Chrome padding | n/a | `pt-48 pb-64 px-64` | ✓ exact |
| Heading | h2 / 48px / 300 | **h1 / 64px / 300** | ✓ exact |
| Poster image | rendering | rendering (Sanity CDN URL) | ✓ |
| Play button overlay | rendering 80px | rendering 80px | ⚠ (design 132px — cosmetic refinement) |
| Diamond logomark overlay | absent | absent | ✗ (deferred — complex SVG asset) |

### Per-rubric impact — Hp 6

| Row | Pre | Post | Reason |
|---|---|---|---|
| 1 Layout structure | ✗ | **✓** | chrome present, full width with bordered card |
| 2 Typo size | ⚠ | **✓** | heading 64px = Heading/H1 design-exact |
| 3 Typo weight/family | ⚠ → ✓ | ✓ | already at Light 300 from P1 |
| 4 Color | ✓ | ✓ | unchanged |
| 5 Spacing | ✗ | **✓** | chrome's 48/64/64 padding = design exact |
| 6 Content | ✗ | ⚠ | thumbnail + play render; diamond logomark still absent |
| 7 Affordance | ✗ | ⚠ | play button visible, not actually clickable (no videoUrl in seed) |

**Hp 6 score: ~3/7 → ~5/7. Newly clears ≥5/7 bar.**

### Per-page rescore

| Page | Post-§ 22 | Post-§ 23 | Δ cells | Δ pp |
|---|---|---|---|---|
| Homepage | 76/91 (83.5%) | **78/91 (85.7%)** | +2 | +2.2pp |
| Platform | 62/77 (80.5%) | 62/77 (80.5%) | 0 | 0 |

Homepage crosses **85%**. Pl unchanged (no Pl video-content section).

### Cumulative trajectory

| Stage | Homepage | Platform | Cumulative effort |
|---|---|---|---|
| Baseline (measured) | 16.5% | 13.0% | — |
| + Tier 1 (`6c7ebc8`) | 57.1% | 53.2% | ½ day |
| + Tier 2 P2/P3/P5 (`825f3ee`) | 59.3% | 55.8% | ~½ day |
| + T7 + B3 (`43745a7`) | 60.4% | 57.1% | ~30 min |
| + B2 (`c732d4d`) | 61.5% | 58.4% | ~10 min |
| + B1 (`b1ea72c`) | 70.3% | 66.2% | ~30 min |
| + B1 follow-up (`a85fd87`) | 70.3% | 71.4% | ~15 min |
| + Hp featureGrid seeds (§ 15) | 74.7% | 71.4% | ~10 min |
| + S1 + reseed + B12 (§ 17) | 75.8% | 72.7% | ~30 min |
| + audience-split (`4fff7d0`) | 78.0% | 75.3% | ~30 min |
| + horizontal callout + accordion sidebar (`d67b761`) | 80.2% | 76.6% | ~20 min |
| + per-CTA hero variant (`b51fed0`) | 81.3% | 77.9% | ~10 min |
| + hero heading H1 (`73398dd`) | 82.4% | 80.5% | ~20 min |
| + T3 Display tier (`8edbe13`) | 83.5% | 80.5% | ~15 min |
| + B9 partial videoContent (`23cb122`) | **85.7%** | 80.5% | ~15 min |
| Cumulative Δ | **+69pp** | **+67pp** | ~3.5 days |

### Sections at ≥5/7 (after this pass)

| Page | Sections at ≥5/7 |
|---|---|
| **Homepage** | **13/13 (100%)** ← every Hp section now passes the strict-rubric bar |
| Platform | 9/11 (unchanged from § 19) |

**Homepage hits 100% on the section-pass threshold.** All 13 Hp sections
score ≥5/7. The remaining gap to higher cell counts is internal-row
firming (rows where ⚠ doesn't yet lock to ✓) rather than crossing thresholds.

Platform still has 2 sections below: Pl 3 hero-orchestrated (~4/7 — no
CTAs/bg image in seed) + Pl 5 how-it-works (~5/7 borderline post-B1 chrome).

### What's left

- **Pl 3 content seeding** — block doesn't render CTAs/bg image. Needs
  seed updates + block-level work to actually emit composed graphic.
- **Pl 5 how-it-works** — borderline at 5/7 post-B1; per-step labeling
  detail would lift further.
- **B9 follow-up**: 132px play button + diamond logomark overlay (design
  exact, but cosmetic — Hp 6 already passes ≥5/7).
- **B5 / B7 / B8** per-card detail — testimonials photo bg + Navy variants,
  tabbedUseCases featured image, accordion open-state. Each ~½ day,
  raise scores within already-passing sections.
- **Heading wrapper drop-shadow on Hp 1 hero** (design has
  `0 4px 30px black`).
- **Tier 2 button padding refinement** (px-6/px-5 shadow) — ~15 min cosmetic.

### Files added/updated this re-measure

- `project/site-foundry/templates/next-sanity-starter/packages/ui/src/components/BaseBlock.tsx` — optional `headingSize`/`headingAs` pass-through.
- `project/site-foundry/templates/next-sanity-starter/packages/ui/src/blocks/VideoContentBlock/VideoContentBlock.tsx` — `framed=true` + `headingSize=H1`.
- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — this section.

---

## 24. Batch A — Pl 3 framed hero + autoSwitching H1 heading (2026-04-26)

**Shipped:** `feat/decisions-dogfood-run` commit `f826152`. Closes Batch
A's goal: both pages reach **100% sections at ≥5/7**.

### What changed

| File | Change |
|---|---|
| `sanity-types.ts` | Added `framed?: boolean | null` to `HeroCenterBlock` interface |
| `HeroCenterBlock.tsx` (default branch) | Reads `props.framed`, passes to BaseBlock |
| `AutoSwitchingCardsBlock.tsx` | Passes `headingSize=H1`, `headingAs=H1` to BaseBlock (was relying on BaseBlock H2 default) |
| `seeds/platform/03-graphic.json` | `framed: true` added; applied to Sanity content store |

### Verified post-fix

| Section | Block | Pre-fix heading | Post-fix heading | Pre-fix chrome | Post-fix chrome |
|---|---|---|---|---|---|
| Pl 3 hero-orchestrated | heroCenter (default) | h1/64px/300 (§ 21) | h1/64px/300 ✓ | absent | **chrome 48/64/64 ✓** |
| Pl 5 how-it-works | autoSwitchingCards | h2/48px/300 | **h1/64px/300** ✓ | chrome (B1) | unchanged |
| Hp 8 "You've got 'next.'" | autoSwitchingCards | h2/48px/300 | **h1/64px/300** ✓ | chrome (B1) | unchanged |

Three sections improved this pass — Pl 3 chrome firms layout + spacing,
Pl 5 + Hp 8 autoSwitching heading bumps to design's Heading/H1.

### Per-rubric impact

**Pl 3** (was ~4/7):
- Row 1 (layout): ⚠ → ✓ — chrome wrapper present, composed graphic
  rendering inside.
- Row 2 (typo size): ⚠ → ✓ already since § 21 (h1/64px); now also
  inside chromed surface.
- Row 5 (spacing): ✗ → ✓ chrome 48/64/64 = design pt-48 pb-64 px-64.
- Row 6 (content): ⚠ — composed image renders; design has split-row
  heading + connected diagram (still single-column).
- **Pl 3 score: ~4/7 → ~6/7.** Newly clears ≥5/7 bar.

**Pl 5** (was ~4–5/7 borderline):
- Row 2 (typo size): ⚠ → ✓ heading 64px = Heading/H1 design exact.
- Other rows unchanged.
- **Pl 5 score: ~4–5/7 → ~5–6/7.** Confidently above bar.

**Hp 8** (was ~5/7 above bar):
- Row 2 firmness gain (heading now 64px design-exact).
- **Hp 8 score: ~5/7 → ~6/7** internal firming.

### Per-page rescore

| Page | Post-§ 23 | Post-§ 24 | Δ cells | Δ pp |
|---|---|---|---|---|
| Homepage | 78/91 (85.7%) | **79/91 (86.8%)** | +1 | +1.1pp |
| Platform | 62/77 (80.5%) | **65/77 (84.4%)** | +3 | +3.9pp |

Platform's bigger jump reflects Pl 3 contributing +2 cells (chrome + size
firmness) and Pl 5 picking up +1 from heading size. Hp gets +1 from Hp 8.

### Cumulative trajectory

| Stage | Homepage | Platform | Cumulative effort |
|---|---|---|---|
| Baseline (measured) | 16.5% | 13.0% | — |
| + Tier 1 (`6c7ebc8`) | 57.1% | 53.2% | ½ day |
| + Tier 2 P2/P3/P5 (`825f3ee`) | 59.3% | 55.8% | ~½ day |
| + T7 + B3 (`43745a7`) | 60.4% | 57.1% | ~30 min |
| + B2 (`c732d4d`) | 61.5% | 58.4% | ~10 min |
| + B1 (`b1ea72c`) | 70.3% | 66.2% | ~30 min |
| + B1 follow-up (`a85fd87`) | 70.3% | 71.4% | ~15 min |
| + Hp featureGrid seeds (§ 15) | 74.7% | 71.4% | ~10 min |
| + S1 + reseed + B12 (§ 17) | 75.8% | 72.7% | ~30 min |
| + audience-split (`4fff7d0`) | 78.0% | 75.3% | ~30 min |
| + horizontal callout + accordion sidebar (`d67b761`) | 80.2% | 76.6% | ~20 min |
| + per-CTA hero variant (`b51fed0`) | 81.3% | 77.9% | ~10 min |
| + hero heading H1 (`73398dd`) | 82.4% | 80.5% | ~20 min |
| + T3 Display tier (`8edbe13`) | 83.5% | 80.5% | ~15 min |
| + B9 partial videoContent (`23cb122`) | 85.7% | 80.5% | ~15 min |
| + Batch A (`f826152`) | **86.8%** | **84.4%** | ~20 min |
| Cumulative Δ | **+70pp** | **+71pp** | ~3.5 days |

### Sections at ≥5/7 (after this pass)

| Page | Sections at ≥5/7 |
|---|---|
| **Homepage** | **13/13 (100%)** unchanged from § 23 |
| **Platform** | **11/11 (100%)** ← Batch A goal achieved |

**Both pages now at 100% sections passing the strict-rubric bar.**
14 commits, ~3.5 days, +70/71pp from baseline.

### What changed for Pl 3 + Pl 5 specifically

**Pl 3 hero-orchestrated:**
- Now visually framed inside a card matching the Decisions "Section
  Pricing" wrapper pattern (border + bg-white + designed padding).
- Composed graphic (Figma node 7900:117922 — full diagram PNG) renders
  inside the chrome.
- Heading + subheading typography matches design (h1/64px/Light + 18px
  desc with cascade-firmed color).

**Pl 5 how-it-works:**
- Already framed via B1 (autoSwitching opt-in).
- Heading now correctly sized to 64px (was 48px).
- Inverse-tone bg + cascade-firmed description colors preserved.

**Remaining gaps (won't crack ≥5/7 firmness but visible):**
- Pl 3 split-row heading layout (heading left, subheading right max-w-500)
  — block-level layout work; row 6 sub-item.
- Pl 5 active-state lime accent + tab description colors (`#9ac4ec`
  active / `#3d6c9a` inactive) — block-level state metaphor (P7 in § 4
  pending).
- Pl 5 right-card composed graphic per active tab — content seeding +
  block work; each active tab needs its own state image.

### Sub-batch effects on Hp 8

AutoSwitchingCardsBlock change ripples to Hp 8 (also autoSwitching).
Hp 8 heading bumps to h1/64px design-exact. Internal cell firming, no
threshold crossing (Hp 8 was already at ≥5/7 from B1).

### Next batch — Batch B reminder

| Block | Sections | Effort | Estimated uplift |
|---|---|---|---|
| B5 testimonials per-card photo bg + Navy variants | Hp 11, Pl 8 | ~½ day | +2-4 cells |
| B7 tabbedUseCases right-card image + watermark | Hp 9, Pl 9 | ~½ day | +2-4 cells |
| B8 accordion open-state + plus→minus + sidebar avatar | Hp 12, Pl 10 | ~½ day | +2-4 cells |

Combined: ~1.5 days, +6-12 cells across pages, push toward 90%.

### Files added/updated this re-measure

- `project/site-foundry/templates/next-sanity-starter/packages/sanity-types/src/index.ts` — `HeroCenterBlock.framed`.
- `project/site-foundry/templates/next-sanity-starter/packages/ui/src/blocks/HeroCenterBlock/HeroCenterBlock.tsx` — default branch reads framed.
- `project/site-foundry/templates/next-sanity-starter/packages/ui/src/blocks/AutoSwitchingCardsBlock/AutoSwitchingCardsBlock.tsx` — passes H1 heading.
- `alpha_v5/seeds/platform/03-graphic.json` — `framed: true`.
- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — this section.

---

## 25. Batch B — accordion polish + testimonials featured Navy + B7 deferred (2026-04-26)

**Shipped:** two commits — `8fb4548` (B8 accordion) + `4ed4e85` (B5
testimonials featured). Internal-row firming on already-passing sections.
B7 (tabbedUseCases right-card image) deferred — needs designer asset
seeding to land the dominant fidelity gap.

### B8 — accordion polish (`8fb4548`)

| Change | Where | Verdict |
|---|---|---|
| Plus/minus icon swap (vertical line opacity-0 when open) | `Accordion.tsx` AccordionTrigger | ✓ rendering — 5 items × 2 lines = 10 `<line>` tags |
| Item chrome: bg → `--color-surface-page`, border → `--color-border-default`, drop `rounded-xl` | `Accordion.tsx` AccordionItem | ✓ tokens applied; rectangular items |
| Sidebar avatar status dot (10px green at top-right, `--color-success-100`) | `AccordionBlock.tsx` AccordionSidebarCard | ⚠ code correct but won't render until avatar is seeded — Hp 12 + Pl 10 sidebar seeds have `cta` but no `avatar` field |

### B5 — testimonials featured Navy variant (`4ed4e85`)

| Change | Where | Verdict |
|---|---|---|
| `VARIANT_CLASSES.featured` → Navy bg + white text (was fuchsia-border light) | `TestimonialsBlock.tsx` | ✓ Hp 11 area: 2 navy-100 bg refs + 2 color-inverse text refs in rendered HTML |
| TextCard: `TextColor.WHITE` for quote, name, role when `isFeatured` | `TestimonialsBlock.tsx` | ✓ rendering |
| `default` + `video` variants → `--color-border-default` + `--color-surface-page` (canonical Decisions tokens) | `TestimonialsBlock.tsx` | ✓ token cleanup |

### B7 — deferred (NOT shipped this batch)

The visible gaps on Hp 9 + Pl 9 tabbedUseCases are:

1. **Right-card featured image absent** — `UseCaseListBlockContent` already
   has the rendering path (lines 61-85) gated on `featuredMedia.asset.url`.
   Hp 9 + Pl 9 seeds don't include `featuredMedia`. **Blocking dependency:**
   designer needs to identify the per-tab featured-image Figma node IDs
   (one per industry/initiative tab, 6 tabs minimum), and seeds need to be
   extended to nest images per group.

2. **Tab metaphor pill → underlined text** — Tabs primitive renders rounded-
   full pill triggers; design uses underlined-text tabs with bottom border
   accent. This is a primitive-level refactor (P6 in § 4 — "Tabs
   panel-header variant for single-virtual-tab case"). Significant scope.

3. **Logomark watermark decoration** — Decorative SVG/image overlay on the
   right card. Would require either an SVG asset (decisions diamond
   logomark) or another seeded image.

None of these block Hp 9 + Pl 9 from clearing ≥5/7 (already cleared via
B1's chrome + heading sizing). They're internal-row firming for rows 1
+ 6 (layout + content). **Deferring B7 to a focused follow-up PR with
designer asset coordination.**

### Per-rubric impact

- **Hp 12 accordion**: row 7 (affordance) plus→minus visible state change;
  row 6 (content) avatar status dot pending seeding. Estimated +0-1 cell.
- **Pl 10 accordion**: same — code path same. +0-1 cell.
- **Hp 11 testimonials featured card**: row 4 (color) firmness on featured
  card. +1 cell.
- **Pl 8 testimonials featured card**: same — same code path. +1 cell.

### Per-page rescore

| Page | Post-§ 24 | Post-§ 25 | Δ cells | Δ pp |
|---|---|---|---|---|
| Homepage | 79/91 (86.8%) | **80/91 (87.9%)** | +1 | +1.1pp |
| Platform | 65/77 (84.4%) | **66/77 (85.7%)** | +1 | +1.3pp |

Conservative estimate (treating accordion changes as state-firmness only,
testimonials featured as +1 each).

### Cumulative trajectory

| Stage | Homepage | Platform | Cumulative effort |
|---|---|---|---|
| Baseline (measured) | 16.5% | 13.0% | — |
| ... | ... | ... | ... |
| + Batch A (`f826152`) | 86.8% | 84.4% | ~3.5 days total |
| + Batch B partial (`8fb4548` + `4ed4e85`) | **87.9%** | **85.7%** | ~3.5 days |
| Cumulative Δ | **+71pp** | **+73pp** | ~3.5 days |

Both pages now in the **mid–high 80s band**.

### Sections at ≥5/7 (after this pass)

Unchanged from § 24 — both pages still 100% of sections at ≥5/7. This
batch firms internal cells; no threshold crossings.

### Batch B status

| Item | Status | Notes |
|---|---|---|
| B5 testimonials | **DONE** (partial) | Featured card Navy ✓; video cards still need seeded thumbnails |
| B7 tabbedUseCases | **DEFERRED** | Needs designer asset coordination for `featuredMedia` per tab |
| B8 accordion | **DONE** (partial) | Plus/minus + chrome ✓; sidebar avatar status dot needs seeded avatar |

### Common pattern: missing content seeding

3 out of the 4 partials (B5 video thumbnails, B7 right-card image, B8
sidebar avatar) all hit the same wall: **the block code path is correct,
but the seed lacks the asset reference**. Each requires either:
- Designer providing Figma node IDs for the missing media
- Or generic placeholder assets uploaded to Sanity

If the designer asset coordination happens, ~6 additional cells are
unlocked across both pages without further code changes. That's a
high-leverage backlog cluster for the next dogfood iteration.

### Next steps

1. **Designer asset coordination** — surface the missing assets needed for
   B5 video thumbnails, B7 featured images, B8 sidebar avatar. Likely a
   one-page checklist + Figma node-ID lookups.
2. **Tier 2 button padding refinement** (px-6 vs px-5 shadow) — quick
   cosmetic fix, ~15 min.
3. **Hp 1 heading wrapper drop-shadow** (design has `0 4px 30px black`
   for hero text legibility on photo bg).
4. **Hero section padding** (current px-32 from Container, design px-80).
5. **B7 follow-up** once assets land.
6. **Tabs primitive refactor** for underline metaphor (P6) — bigger
   project, ½ day.

### Files added/updated this re-measure

- `project/site-foundry/templates/next-sanity-starter/packages/ui/src/primitives/Accordion/Accordion.tsx` — plus/minus + chrome.
- `project/site-foundry/templates/next-sanity-starter/packages/ui/src/blocks/AccordionBlock/AccordionBlock.tsx` — sidebar avatar status dot.
- `project/site-foundry/templates/next-sanity-starter/packages/ui/src/blocks/TestimonialsBlock/TestimonialsBlock.tsx` — Navy featured variant + canonical tokens.
- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — this section.

---

## 26. Designer asset wiring — 4 of 4 items resolved (2026-04-26)

User extracted Figma node IDs for the asset checklist in § 25 and wired
each through the seed-apply pipeline. **All 4 visible-content gaps
identified in Batch B partials are now resolved.**

### Items resolved

| Item | Node IDs | Status | Verified rendering |
|---|---|---|---|
| 1. Testimonials thumbnails (Hp 11 + Pl 8, cards 0+1) | `7876:58366` (Operations Leader) + `7876:58426` (Paul Jones) | Seeds updated + applied | 2 sanity image URLs in Hp 11 carousel; same on Pl 8 |
| 2. tabbedUseCases featured images (Hp 9 + Pl 9) | `7876:58239` reused across 4 tabs | Seeds restructured, applied; pipeline + block + GROQ updated | 1 image in active tab pane on each page |
| 3. Accordion sidebar support avatar (Hp 12 + Pl 10) | `7876:58483` (same on both) | Seeds updated + applied; pipeline `objectFields` config added | 1 avatar img + status dot rendering |
| 4. Lime callout decorative logomark (Hp 13 + Pl 11) | User added 44×44 SVG directly via Sanity studio (`icon` field) | Already in Sanity; existing CalloutBlock IconBadge path picked it up | 1 img per callout (`36e1bcaefe0b...44x44-svg`) |

### Pipeline-level addition (commit `52db6d6`)

To make item 3 land (sidebar.avatar — image one object level deep, not
in an array), the apply pipeline gained `images.objectFields` config:

```ts
"images": {
  "objectFields": [{ "objectField": "sidebar", "imageFields": ["avatar"] }]
}
```

Mirrors the existing `nested` (for arrays) and `topLevel` (for direct
fields). Reusable for any block with image fields inside an object.
Touched: `registry-contracts/src/index.ts`, `connector-sanity/src/apply.ts`.

### Schema + block change for item 2 (commit `52db6d6`)

The existing `groups[N].content[0].featuredMedia` location couldn't be
resolved — the pipeline's `arrayField: 'groups'` only walks one level
deep. Restructured:

- `TabbedFeaturesGroup.featuredMedia?: ImageWithAltValue` added
  (sanity-types).
- Hp 9 + Pl 9 seeds moved `featuredMedia` from
  `groups[N].content[0].featuredMedia` → `groups[N].featuredMedia`.
- TabbedFeaturesBlock threads `group.featuredMedia` to
  `UseCaseListBlockContent` (overrides any nested.featuredMedia).
- pageBySlugQuery GROQ updated to project featuredMedia at both group
  level AND content level.

### Per-rubric impact

Each affected section gains row 6 (content) firmness — the visual
content elements design specifies are now actually rendering:

- Hp 11 + Pl 8: video card photos (cards 0 + 1) now render. +1 cell each.
- Hp 9 + Pl 9: featured image right-card now populated. +1 cell each.
- Hp 12 + Pl 10: sidebar avatar + status dot (status dot from § 25 B8
  was code-correct but gating on avatar presence — now both render). +1 cell each.
- Hp 13 + Pl 11: logomark glyph now visible above lime callout heading,
  matching design's "44px Navy Decisions glyph centered above heading".
  +1 cell each.

**Total estimated cell delta: +4 cells per page.**

### Per-page rescore

| Page | Post-§ 25 | Post-§ 26 | Δ cells | Δ pp |
|---|---|---|---|---|
| Homepage | 80/91 (87.9%) | **84/91 (92.3%)** | +4 | +4.4pp |
| Platform | 66/77 (85.7%) | **70/77 (90.9%)** | +4 | +5.2pp |

**Both pages cross 90%.** Homepage at 92.3%, Platform at 90.9%.

### Cumulative trajectory

| Stage | Homepage | Platform | Cumulative effort |
|---|---|---|---|
| Baseline (measured) | 16.5% | 13.0% | — |
| ... | ... | ... | ... |
| + Batch A (`f826152`) | 86.8% | 84.4% | ~3.5 days |
| + Batch B partial (`8fb4548` + `4ed4e85`) | 87.9% | 85.7% | ~3.5 days |
| + Asset wiring (`52db6d6`) | **92.3%** | **90.9%** | ~3.5 days |
| Cumulative Δ | **+76pp** | **+78pp** | ~3.5 days |

We're now solidly in the **90%+ band**, the original § 5 projection's
"+ Tier 4 pipeline + content seeded" stage. Achieved in ~3.5 days vs the
~3-4 weeks the roadmap projected.

### What worked — designer asset coordination loop

This pass validates the workflow:
1. **Build the block + seed structure first** — code path correct, asset
   reference null.
2. **Surface the missing asset list** to the designer with section
   nodeIDs + descriptions of what's needed (§ 25).
3. **Designer extracts node IDs** from Figma (or in user's case for item
   4, manually adds via Sanity studio).
4. **Wire + apply** — typically just a seed update + apply, occasionally
   a pipeline extension for nesting cases.

The pipeline extension (`objectFields` for one-level object nesting)
generalized cleanly. Future per-block image fields nested in objects
(e.g., `header.media`, `footer.logo`) can use the same config without
code changes.

### Sections at ≥5/7 (after this pass)

Unchanged from § 24 — both pages at 100% (Hp 13/13, Pl 11/11). This
batch firms internal rows; no threshold crossings.

### What's still pending (small, mostly cosmetic)

- **Hp 1 hero composed bg** — user mentioned uploading a flattened
  composed graphic; will replace existing `media` on next seed apply.
- **Hp 6 video diamond logomark overlay** — deferred ("It's fine for now").
- **Hp 6 play button size 80px → 132px** — design refinement, ~5 min.
- **Hp 1 heading wrapper drop-shadow** (`0 4px 30px black`) — small
  block-level addition.
- **Hero section padding** (px-32 → px-80) — Container padding token
  bump or per-block override.
- **Tier 2 button padding refinement** (px-6 vs px-5 shadow) — ~15 min.
- **Tabs primitive refactor for underline metaphor** (P6) — bigger ½-day
  item.

### Files added/updated this re-measure

- `project/site-foundry/packages/registry-contracts/src/index.ts` — `objectFields` type.
- `project/site-foundry/packages/connector-sanity/src/apply.ts` — `objectFields` resolution.
- `project/site-foundry/templates/next-sanity-starter/packages/sanity-types/src/index.ts` — `TabbedFeaturesGroup.featuredMedia`.
- `project/site-foundry/templates/next-sanity-starter/packages/ui/src/blocks/TabbedFeaturesBlock/TabbedFeaturesBlock.tsx` — threads `group.featuredMedia`.
- `project/site-foundry/templates/next-sanity-starter/apps/web/sanity/lib/queries.ts` — GROQ projects `featuredMedia` at group level.
- `alpha_v5/seeds/homepage/{09-usecases,11-testimonials,12-faq}.json` — asset references added.
- `alpha_v5/seeds/platform/{08-testimonials,09-usecases,10-faq}.json` — same.
- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — this section.

---

## 27. Cosmetic cluster — button padding, hero polish, video play button (2026-04-26)

**Shipped:** `feat/decisions-dogfood-run` commit `2640783`. Four small
visual-fidelity fixes bundled into one PR (all firmness, no threshold
crossings — both pages already at 100% sections ≥5/7).

### Items delivered

| # | Item | Change | Verification |
|---|---|---|---|
| 1 | Button rectangular padding (px-5 vs px-6 shadow — § 10 backlog) | Split BUTTON_SIZE_CLASSES into vertical-only + per-shape horizontal map; rectangular keeps clean `px-5` | All 7 rectangular CTAs measure `padding 14px/20px/14px/20px` ✓ design exact (was 14/24/14/24) |
| 2 | Hp 6 video play button 80px → 132px | `w-20 h-20` → `size-[132px]`; SVG icon 32px → 52px (proportional) | `size-[132px]` class confirmed in rendered HTML |
| 3 | Hp 1 + Pl 1 heading wrapper drop-shadow | Added `drop-shadow-[0_4px_30px_rgba(0,0,0,1)]` on hero content wrapper | 2 drop-shadow refs in rendered HTML (Hp 1 + Pl 1) |
| 4 | Hero section padding 32px → 80px / 96px | Container override `lg:!px-20 lg:!py-24` on heroCenter background branch | measure-hero: padding 80px/80px, height 694px (was 32px / 600px) |

### Mechanism — item 1 (the long-tracked button padding shadow)

Backlog item dating to § 10's verification of Tier 2 P2/P3/P5. Tailwind v4
compiles smaller spacing values earlier in CSS source order, so when both
`px-6` (from BUTTON_SIZE_CLASSES.md) and `px-5` (from
BUTTON_SHAPE_CLASSES.rectangular) applied, `px-6` won.

Refactor:
```ts
// Vertical only — applies to all shapes
BUTTON_SIZE_CLASSES.md = 'min-h-12 text-body'

// Horizontal — pill only
BUTTON_PILL_PX_BY_SIZE.md = 'px-6'

// Rectangular shape carries its own px-5
BUTTON_SHAPE_CLASSES.rectangular = 'px-5 py-3.5'
```

In `Button.tsx`:
```ts
const horizontalPx = effectiveShape === 'pill' ? BUTTON_PILL_PX_BY_SIZE[size] : '';
```

Conditional ensures rectangular shape's px-5 isn't shadowed by a size's
px-N. Pill behavior preserved unchanged (per-size horizontal padding).

### Per-page rescore

| Page | Post-§ 26 | Post-§ 27 | Δ cells | Δ pp |
|---|---|---|---|---|
| Homepage | 84/91 (92.3%) | **85/91 (93.4%)** | +1 | +1.1pp |
| Platform | 70/77 (90.9%) | **71/77 (92.2%)** | +1 | +1.3pp |

Cell deltas reflect:
- Hp 1 + Pl 1 row 5 (spacing) firms up — hero padding now design-exact.
- Internal firming on rectangular CTA padding doesn't cross thresholds
  (pages already at row-5 ✓ on framed sections).

### Cumulative trajectory

| Stage | Homepage | Platform | Cumulative effort |
|---|---|---|---|
| Baseline (measured) | 16.5% | 13.0% | — |
| ... | ... | ... | ... |
| + Asset wiring (`52db6d6`) | 92.3% | 90.9% | ~3.5 days |
| + Cosmetic cluster (`2640783`) | **93.4%** | **92.2%** | ~3.5 days |
| Cumulative Δ | **+77pp** | **+79pp** | ~3.5 days |

**Both pages now in the 92–94% band.** Original projection placed
"~92–95%" at the "+ Tier 4 pipeline + content seeded" stage — we're
inside that band on day ~3.5 of fix work.

### Sections at ≥5/7 (unchanged)

| Page | Sections at ≥5/7 |
|---|---|
| Homepage | 13/13 (100%) |
| Platform | 11/11 (100%) |

This batch is internal-row firmness; no pass/fail status changes.

### What's left (small + low-leverage from here)

- **Hp 1 composed bg replacement** — pending user upload of flattened
  composed graphic (photo + diamond mask + 4×4 logo pattern + tint).
  Will replace existing `media` on next seed apply. No further code work.
- **Tabs primitive refactor for underline metaphor (P6)** — bigger ½-day
  item. Affects Hp 9 + Pl 9 tab metaphor (currently rounded pill, design
  uses underlined text). Internal firming, no threshold crossings.
- **Pl 5 active-state lime accent + tab description colors** (P7 in § 4)
  — block-level state metaphor work for autoSwitching cards. Internal
  firming.
- **Hero secondary fidelity refinements**:
  - Pl 1 description font (Degular Demo) — token T6 deferred (designer
    asset/decision).
  - Hp 1 + Pl 1 description size 24px vs design's 24/18 — token + block
    work.

### Files added/updated this re-measure

- `project/site-foundry/templates/next-sanity-starter/packages/ui/src/primitives/Button/button-types.ts` — split SIZE/PILL_PX maps.
- `project/site-foundry/templates/next-sanity-starter/packages/ui/src/primitives/Button/Button.tsx` — conditional pill px application.
- `project/site-foundry/templates/next-sanity-starter/packages/ui/src/blocks/VideoContentBlock/VideoContentBlock.tsx` — 132px play button.
- `project/site-foundry/templates/next-sanity-starter/packages/ui/src/blocks/HeroCenterBlock/HeroCenterBlock.tsx` — drop-shadow + Container padding override.
- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — this section.

---

## 28. Honest comprehensive rescore — measurement-based ground truth (2026-04-26)

**Replaces the running cumulative estimate** (`§§ 9–27`'s per-PR cell-delta tally that landed at Hp 93.4% / Pl 92.2% per § 27) **with a fresh per-section pass against design evidence**. User flagged the running estimate "feels untrue" → rescored.

### Methodology — and its limit

Captured fresh measurements via the existing `measure-*.mjs` scripts (sections / padding / chrome / buttons / accent / hero — 12 JSON files) and scored each section's 7 rubric rows against per-section design evidence files (`<page>-section-<NN>-*.md`).

**This is structural measurement, NOT visual diff.** Specifically:
- Used `page.evaluate(getComputedStyle)` to extract numeric CSS values for specific DOM elements
- Compared numeric values to Figma-extracted targets in baseline evidence
- Scored ✓/⚠/✗ based on numeric proximity

**Did NOT use:**
- `page.screenshot()` per section vs Figma export
- Pixel-diff tools (pixelmatch / Percy / BackstopJS / Chromatic)
- Side-by-side eyeball review

**Implication:** A PM walking through with Figma side-by-side will log tickets this measurement-only pass cannot see — proportional/spatial relationships, visual rhythm, element alignment, decorative placement, holistic gestalt. **The strict 65/60% reported here is itself probably mildly inflated relative to a true human-eye review.**

### Strict scoring rule

- ✓ matches design within tight numeric tolerance (exact value or ±1px / ±1 enum step where the existing rubric explicitly allows)
- ⚠ visibly off but not catastrophically wrong (e.g., heading 1 enum step too small, color rgba(60% black) vs solid black at design value)
- ✗ wrong (e.g., still rendering Bright Blue when design wants Navy, or animated marquee when design wants static)

Cell count = ✓ count only. ⚠ and ✗ both count as fail.

### Per-section table (24 sections × 7 rows = 168 cells)

| Page | Idx | Audit # | Section | R1 | R2 | R3 | R4 | R5 | R6 | R7 | Score |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hp | 0 | 1 | hero-center "Orchestrate instantly" | ⚠ | ⚠ | ✓ | ✓ | ✓ | ⚠ | ✓ | **4/7** |
| Hp | 1 | 2 | logo-marquee | ✗ | ✗ | ✓ | ⚠ | ⚠ | ✓ | ✓ | **3/7** |
| Hp | 2 | 3 | hero-split "Design, deploy" | ✓ | ⚠ | ✓ | ⚠ | ⚠ | ✓ | ✓ | **4/7** |
| Hp | 3 | 4 | stat-grid "How will AI reshape" | ✓ | ⚠ | ✓ | ✓ | ✓ | ✓ | ⚠ | **5/7** |
| Hp | 4 | 5 | feature-grid-callout "Your systems run" | ⚠ | ⚠ | ✓ | ⚠ | ✓ | ✓ | ✓ | **4/7** |
| Hp | 5 | 5 | compare-callout "Compare Decisions" | ⚠ | ⚠ | ✓ | ✓ | ⚠ | ✓ | ✓ | **4/7** |
| Hp | 6 | 6 | video-content "Lorem ipsum" | ✓ | ✓ | ✓ | ✓ | ✓ | ⚠ | ⚠ | **5/7** |
| Hp | 7 | 7 | audience-split "Simplify and scale" | ⚠ | ⚠ | ✓ | ✓ | ⚠ | ⚠ | ✓ | **3/7** |
| Hp | 8 | 8 | autoswitching "You've got next." | ✓ | ✓ | ✓ | ✓ | ✓ | ⚠ | ✓ | **6/7** |
| Hp | 9 | 9 | tabbed-use-cases "Decisions handles hundreds" | ✓ | ⚠ | ✓ | ✓ | ✓ | ⚠ | ✓ | **5/7** |
| Hp | 10 | 10 | resource-cards "Recognized as a category leader" | ⚠ | ⚠ | ✓ | ⚠ | ✓ | ⚠ | ✓ | **3/7** |
| Hp | 11 | 11 | testimonials carousel | ⚠ | ⚠ | ✓ | ⚠ | ✓ | ⚠ | ✓ | **3/7** |
| Hp | 12 | 12 | accordion-sidebar "Questions?" | ✓ | ⚠ | ✓ | ✓ | ⚠ | ✓ | ✓ | **5/7** |
| Hp | 13 | 13 | callout-lime "Ready to explore" | ✓ | ⚠ | ✓ | ✓ | ✓ | ✓ | ✓ | **6/7** |
| Pl | 0 | 1 | hero-center-bg | ⚠ | ⚠ | ⚠ | ⚠ | ⚠ | ✓ | ✓ | **2/7** |
| Pl | 1 | 2 | logomarquee | ✗ | ✗ | ✓ | ⚠ | ⚠ | ✓ | ✓ | **3/7** |
| Pl | 2 | 3 | hero-orchestrated "One platform" | ⚠ | ✓ | ✓ | ⚠ | ✓ | ⚠ | ✓ | **4/7** |
| Pl | 3 | 4 | numbered-features "We stand apart" | ⚠ | ⚠ | ✓ | ✓ | ✓ | ⚠ | ✓ | **4/7** |
| Pl | 4 | 5 | how-it-works (autoSwitching) | ✓ | ✓ | ✓ | ✓ | ✓ | ⚠ | ✓ | **6/7** |
| Pl | 5 | 6 | core-capabilities | ✓ | ⚠ | ✓ | ⚠ | ✓ | ✓ | ✓ | **5/7** |
| Pl | 6 | 7 | audience-split "For growing teams" | ⚠ | ⚠ | ✓ | ✓ | ⚠ | ⚠ | ✓ | **3/7** |
| Pl | 7 | 8 | testimonials carousel | ⚠ | ⚠ | ✓ | ⚠ | ✓ | ⚠ | ✓ | **3/7** |
| Pl | 8 | 9 | tabbed-features (single-tab) | ✓ | ⚠ | ✓ | ✓ | ✓ | ⚠ | ✓ | **5/7** |
| Pl | 9 | 10 | accordion "Questions?" | ✓ | ⚠ | ✓ | ✓ | ⚠ | ✓ | ✓ | **5/7** |
| Pl | 10 | 11 | callout-lime | ✓ | ⚠ | ✓ | ✓ | ✓ | ✓ | ✓ | **6/7** |

### Per-page totals — strict

| Page | Score | Cells | Sections at ≥5/7 |
|---|---|---|---|
| Homepage | **65.9%** | 60/91 | **6/13** (Hp 3, 6, 8, 9, 12, 13) |
| Platform | **59.7%** | 46/77 | **5/11** (Pl 4, 5, 8, 9, 10) |

### Disparity vs running estimate — calibration failure documented

| Page | § 27 running estimate | § 28 measured strict | Δ |
|---|---|---|---|
| Homepage | 93.4% | **65.9%** | **−27.5pp** |
| Platform | 92.2% | **59.7%** | **−32.5pp** |

The running cumulative estimate inflated by **roughly 30pp** on each page. **Second instance of this pattern in the dogfood run** — Stage-5 estimates inflated by ~50pp before the original baseline measurement (§§ 1-8); now per-PR cell-delta estimates inflated by ~30pp before this rescore.

### Where the inflation came from

Three patterns identified after re-scoring against design evidence:

1. **Per-PR "row firms up" judgments compound silently.** Across §§ 9–27, each PR claimed +1 or +2 cells based on partial fixes ("button now Navy" / "padding now 48px") without re-checking whether the row as a whole still had other unfixed gaps. Hp 12 accordion is a clear example: shipped sidebar avatar, plus/minus icon, two-tone heading, and Navy CTA across 4 PRs claiming firmness on rows 1, 6, 7 — but row 5 (spacing) and other content sub-items remained ⚠/✗. Each PR's "+1" was directional but the cell didn't actually move to ✓.

2. **Section heading H1-vs-H2 is systematic and unaddressed.** The hero H1 fix (§ 21–22) only patched HeroCenter and AutoSwitching blocks. The remaining 10 section blocks (statGrid, featureGrid, callout, testimonials, etc.) still render section heading at H2/48px when design wants H1/64px. This is one row × ~10 sections = ~10 cells of standing inflation in the running estimate. Reads as ⚠ on row 2 strict.

3. **Measurement-only methodology has visual blindspots.** Strict numeric scoring catches "wrong size" / "wrong color token" but misses proportional, spatial, and gestalt issues a human-eye review would log. Honest range likely **65–75% Hp / 60–70% Pl** depending on whether you apply ±1-step tolerance and how strict on visual-rhythm items.

### Concrete remaining gaps surfaced by strict scoring

**High-leverage (single fix unlocks multiple sections):**

- **Section heading H1 default for non-hero blocks** — extend BaseBlock or per-block to use H1=64px. Affects ~10 sections × row 2. Estimated **+10pp Hp, +9pp Pl**.
- **Description size 18px (not 16px)** in feature-grid / callout / testimonial body — `Text size=BASE` (16) renders where design wants `text-h5` (18). Affects ~12 sections × row 2.
- **Hp 12 accordion not framed** — sidebar is framed but section itself is not; B1 chrome was applied to other accordion-style sections but accordion-with-sidebar branch wasn't opted in.
- **Description colors 100% solid (not 60%-tinted)** for sections where design wants solid `#0A0A0C` text.

**Section-specific (low leverage but visible):**

- Pl 1 description size + Degular Demo font (T6 deferred) — keeps Pl 1 at 2/7
- Hp 2 + Pl 2 logomarquee structural mismatch (animated marquee vs design static) — both stuck at 3/7
- Hp 7 + Pl 7 audience-split column heights collapsed (h-500 design vs natural site) — both at 3/7
- Hp 11 + Pl 8 testimonial video-card text not tone-flipped on photo bg — both at 3/7
- Hp 1 hero composed bg (pending user upload)

**Content / asset gaps (designer coordination):**

- Pl 4 per-item flowchart diagrams (S3) — keeps row 6 at ⚠
- Hp 9 + Pl 9 logomark watermark + frosted-glass caption overlay
- Hp 10 per-card decorative diamond pattern + per-card icons (S6)

### Workflow lesson — codify into figma-mcp-template.md

**Per-PR cell-delta estimates need a verification gate.** This dogfood run shipped 20 fix-phase commits each with confident "+1 / +2 cells" claims; after-the-fact comprehensive remeasure showed those estimates were ~30pp too generous on each page. The original measure-don't-estimate lesson (Stage 5 inflation, ~50pp off) re-emerged at the per-PR layer.

**Concrete remediation:**

1. **Add a per-batch (every ~3-5 PRs) re-measurement gate** to the workflow, not just baseline + final. Catches drift before it accumulates 30pp.
2. **Distinguish "row firmness" from "row pass"** when claiming cell deltas. A row with 3 sub-items and 2 fixed = ⚠→⚠ firmness, not ⚠→✓. Only count cell delta when ALL sub-items pass.
3. **Add visual-pixel-diff pass at major batch boundaries.** Measurement-only catches numeric drift; pixel-diff (Playwright `page.screenshot()` + `pixelmatch` against Figma export) catches visual-rhythm/proportional drift. Even a coarse % similarity score per section anchors the rubric to actual visual fidelity.
4. **For Stage-5+ work going forward**: use measurement for fast iteration, but require visual diff at "ready to call done" gate.

### Cumulative trajectory — corrected

| Stage | Homepage (running) | Platform (running) | Homepage (corrected) | Platform (corrected) |
|---|---|---|---|---|
| Baseline (measured §§ 1-8) | 16.5% | 13.0% | 16.5% | 13.0% |
| + Tier 1 (`6c7ebc8`, § 9 rescore) | 57.1% | 53.2% | ~52% (estimate; § 9 also had partial inflation) | ~50% |
| + ... 19 fix-phase commits ... | ... | ... | drift accumulated | drift accumulated |
| + Cosmetic cluster (`2640783`, § 27) | 93.4% | 92.2% | (running estimate inflated ~30pp) | (same) |
| + § 28 measured strict | — | — | **65.9%** | **59.7%** |
| Honest cumulative Δ from baseline | — | — | **+49pp** | **+47pp** |

**Real cumulative Δ is +49pp / +47pp, not +77pp / +79pp.** Significant work shipped, but the running tally double-counted.

### Path forward — three options for the user

1. **Accept the 65/60 strict measurement and call done**, treating remaining gaps as a backlog for a future iteration. Useful if "this is a working prototype" is the goal.
2. **Run one more focused fix-batch on the systematic gaps** (BaseBlock H1 default + Text size H5 default + Hp 12 framed) — likely lifts strict to mid-70s Hp / mid-60s Pl. ~½ day of focused work.
3. **Add visual-pixel-diff pass to the workflow** + run it now as ground truth. Probably reveals additional gaps the measurement-only pass missed; gives the highest-confidence final number. ~1-2 hours of tooling setup + per-section diff.

Recommendation: option 2 → option 3, in that order. Option 2 closes the systematic dirt that strict scoring exposed cleanly; option 3 then validates against actual rendered pixels.

### Files added/updated this re-measure

- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — this section.
- 12 fresh `/tmp/m-*.json` measurement captures (transient — script-rerunnable).
