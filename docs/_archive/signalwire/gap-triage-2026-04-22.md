# Gap triage — SignalWire homepage dogfood (2026-04-22)

Post-session ranked followup list, consolidated from `seeds/queues/2026-04-22-signalwire-homepage-queue.md` (sessions 1 & 2, 8 frames applied, 1 BLOCKED-with-schema-gap-filed, 4h total).

This doc is the **one-pass consolidation** of the 53 raw gap entries in the queue file, enriched per item with:
- **Category:** schema / composite / pipeline / token / docs / architectural
- **Candidate type:** `[impl]` (code change), `[docs]` (prompt edit), `[impl+docs]` (both), `[pipeline]` (tooling/workflow)
- **Target:** exact file or package
- **Effort:** trivial / small / medium / large / architectural
- **Evidence:** N/total frames that surfaced it
- **Blocker:** whether anything's blocked until this lands

Docs-edit candidates (marked `[docs]` or `[impl+docs]`) are staged in `docs/_scratchpad/prompt-edits-candidates.md` with proposed diff intent before they touch the real prompts.

---

## TL;DR — what to do

1. **Before Friday (today–Thu):** ship Tier 1 (two trivial items). Apply scratchpad entries S1 + S3 to the docs so any Thu-morning re-runs benefit.
2. **Friday:** token swap is independent, hex-only. Re-verify 8 applied blocks visually.
3. **Post-Friday, next sprint:** tackle Tier 2 (three small schema extensions, one larger block). `heroCenter` and `tabbedFeatures` are the two highest-leverage shipments — first touches 4/5 R3 hero-shaped frames, second hit 3/3 dogfood runs.
4. **Ongoing:** Tier 3+ is the backlog; prioritize by "fix-leverage" (how many design frames unblocked per PR). `block.callout` and `block.testimonials` lead on that axis.

**End-of-dogfood totals:** 15 schema + 14 composite + 1 pipeline + 6 token + 17 docs = **53 ranked items**. 6/8 frame predictions accurate (75%). 100% of wrong predictions were unhedged "clean, no new schema" claims → codified as prediction-discipline rule (scratchpad S8).

### Design-pattern observations from dogfood (affect Tier 2/3 priority + docs)

**CTA placement convention — card-level is the default, not Section-level.** The SignalWire designer uses per-item CTAs on every grid/card block (featureGrid items, testimonial cards, callout cards). Section-level `ctas[]` are reserved for hero and closer blocks only. Implications:

- **Reinforces Tier 2 T2.4** (`featureGrid` items add `cta`) — this isn't an optional polish, it's the default CTA location in this design system.
- **Reinforces Tier 3 T3.1 / T3.2** (`block.callout`, `block.testimonials`) — each should carry a card-level CTA field from the start.
- **Section CTAs stay as-is** — still correct for hero/closer blocks; do NOT remove or deprecate them.
- **Captured in scratchpad S6** as a "CTA placement pattern" subsection for `content-extraction-prompt.md`, so future builders understand the convention and don't silently promote a card-level CTA to Section-level to "make the seed valid."

---

## Tier 1 — ship before Friday (trivial, high ROI)

| # | Item | Type | Target | Effort | Evidence | Notes |
|---|---|---|---|---|---|---|
| T1.1 | `block.richText` → `withCtas: true` | `[impl]` | `project/site-foundry/packages/sanity-schema/src/blocks/richText.ts:5` | trivial (1 line) | 2/2 callout-shape uses (frames #1 "Held Hostage", #8 CTA Banner) | Unlocks CTAs on every richText immediately. Does NOT obviate the eventual `block.callout` schema but cuts the R1 callout fidelity loss by ~60%. |
| T1.2 | `figma-mcp-template.md` featureGrid doc/code contradiction | `[docs]` | `alpha_v3/docs/figma-mcp-template.md` — block-type bucket text claims "icon+title+description" but schema has 2 of 3 | trivial (2 lines) | 1/1 (R2 Documentation) | Either extend schema (Tier 2 item T2.2) or fix doc — pick one now. Scratchpad **S3** stages the doc fix. |

Tier 1 action: commit T1.1 as a single-line schema PR; apply scratchpad S3 to fix the template. Both before EOD Thursday.

---

## Tier 2 — small schema extensions, broad impact (next sprint)

Ordered by fix-leverage (frames unblocked per PR).

| # | Item | Type | Target | Effort | Evidence | Notes |
|---|---|---|---|---|---|---|
| ~~T2.1~~ | ~~`block.heroCenter`~~ | — | — | — | — | ✅ **SHIPPED 2026-04-22** — Option A chosen (new `block.heroCenter` + `HeroCenterBlock.tsx`). Frame #5 re-applied as heroCenter in place (blockKey `f2c4ee556716`, `signalwire-homepage-v2`); frames #3 / #6 / #8 eligible for heroCenter migration when real media land (frame #3 code-editor + frame #6 architecture diagram need Figma REST API path; frame #8 stays on richText/callout). |
| ~~T2.2~~ | ~~`block.tabbedFeatures`~~ | — | — | — | — | ✅ **SHIPPED 2026-04-22** — schema (`tabbedFeatures.ts`) + `'use client'` React block with `useState` tab switcher. Ships alongside T3.4 (accordion) + T3.5 (codeSample) as **peer blocks** (nested via inline array inside `groups[].content[]`). Frame #5 re-applied with 3 tabs (Contact Center Flows / AI Voice Agents / Carrier Grade APIs); tab 1 carries real Figma content, tabs 2–3 are placeholders awaiting designer copy. |
| T2.3 | `block.featureGrid` items → `icon` field | `[impl]` | `packages/sanity-schema/src/blocks/featureGrid.ts` item subschema | small | R2 (6 items) + AI Voice Agents prior | Designer's own Figma component description for `Detail Block` explicitly reads "Icon + title + description + CTA" — schema carries only 2 of 4. |
| T2.4 | `block.featureGrid` items → `cta` / `link` field | `[impl]` | same file as T2.3 | small | R2 (6 items, all "Learn More →" affordances) | Ship with T2.3 — same schema, same designer-spec. |

---

## Tier 3 — new block schemas (larger work, highest design-fidelity leverage)

Ordered by number of frames unblocked.

| # | Item | Type | Target | Effort | Evidence | Notes |
|---|---|---|---|---|---|---|
| ~~T3.1~~ | ~~`block.callout`~~ | — | — | — | — | ✅ **SHIPPED 2026-04-23** — schema (`callout.ts`) with `description + icon + tone` (default / frosted / accent). React block uses `<Card>` primitive + tone classes layered via `className` (no new composite needed — resolves composite gap 1 / T5.10 in the same ship). Frames #1 + #8 migrated off `block.richText` → `block.callout` in place (keys `f770b43a788b` + `f5049d34469e`). Decorative-background media (starry nebula for frame #8) deferred to T3.1-v2 polish. |
| ~~T3.2~~ | ~~`block.testimonials`~~ | — | — | — | — | ✅ **SHIPPED 2026-04-23** — schema (`testimonials.ts`) with `items[]: { quote, name, role?, avatar?, variant }` + `columns`. React block with inline `TestimonialCard` using `<Card>` + variant className (default = subtle border, featured = fuchsia border + blue glow + larger quote). Frame #7 migrated off featureGrid 3-col degrade (key `f22b4f1d1184`). **Shipped same-day:** `<Avatar>` primitive (XS/SM/MD/LG/XL sizes, ImageWithAlt support, name-based initials fallback) — partial close on composite gap 14. **Still deferred:** `<TestimonialCard>` composite extraction (YAGNI — single use site today) and carousel dots (v1 renders as static grid — awaiting real customer count from designer). |
| ~~T3.3~~ | ~~`block.comparison`~~ | — | — | — | — | ✅ **SHIPPED 2026-04-23** — schema (`comparison.ts`) with `items[]: { title, logo?, bullets[]: {label, state: positive\|negative\|neutral}, variant }`. React block with inline ComparisonCard + BulletRow + inline SVG check/x icons. Frame #4b migrated off featureGrid 2-col prose degrade (key `ffc95243e138`); 5 bullets per card rendering with correct states (5 negative on Traditional, 5 positive on featured SignalWire card). Featured variant = fuchsia border + blue glow shadow (same treatment as testimonials). **Deferred:** `<BulletIndicator>` primitive extraction (composite gap 11 / T5.x — YAGNI, single use site today); platform logos in card headers (slot exists in schema, not filled in this demo). |
| ~~T3.4~~ | ~~`block.accordion`~~ | — | — | — | — | ✅ **SHIPPED 2026-04-22** — peer block (not nested-only). Uses existing `<Accordion>` primitive. Can be used top-level OR as tabbedFeatures tab-pane content via inline array. |
| ~~T3.5~~ | ~~`block.codeSample`~~ | — | — | — | — | ✅ **SHIPPED 2026-04-22** — peer block (not nested-only). Structured render: window chrome (traffic-light dots + filename) + `<pre><code>`. **Syntax highlighting deferred** as T5.x polish — requires either a lightweight highlighter (prism-react-renderer) or Figma REST API export of the `Code Block` component as SVG. |
| ~~T3.6~~ | ~~`block.logoMarquee`~~ | — | — | — | — | ✅ **SHIPPED 2026-04-23** — schema (`logoMarquee.ts`) + React block wrapping existing `<Marquee>` primitive. Frame #4a no longer BLOCKED: 6 logos seeded via Figma REST API (nodes `893:7072`/`7076`/`7086`/`7092`/`7101`/`7122`). Per-item `href` is optional (opens in new tab when set). Composite gap 10 resolved in the same ship — no separate `<LogoMarquee>` composite needed. |

---

## Tier 4 — architectural

| # | Item | Type | Target | Effort | Evidence | Notes |
|---|---|---|---|---|---|---|
| T4.1 | Site chrome — settings singleton + Navbar/Footer composites + layout wire-up | `[impl+docs]` | new `packages/sanity-schema/src/singletons/settings.ts`, `packages/ui/src/components/Navbar/`, `Footer/`, `apps/web/app/layout.tsx` wire | architectural | 2/2 (navbar from frame #3 hero, footer from frame #8 closer) | Product-level decision: settings-singleton vs. navigation doc vs. block. Scratchpad entry **S4** stages the docs-side rule ("site chrome never in pageBuilder") independently — that rule can ship before the schema work. |
| T4.2 | Figma MCP composed-graphic export | `[pipeline]` | either (a) workflow docs ("export diagrams as flattened PNG before MCP pull") or (b) infra fix on MCP side | architectural | 2/2 R3 frames with diagrams (frame #3 code-editor, frame #6 voice-AI diagram, arguably frame #5 code-editor) | MCP returned fragment-trees instead of single URLs for composed graphics. Workaround documented in core principle 3 of figma-mcp-template.md, but the pipeline-level fix (flatten before export) is superior. |

---

## Tier 5 — composite / pipeline work (pairs with a Tier 1–3 schema gap)

Ship each item with or immediately after its paired schema PR.

| # | Item | Type | Target | Pairs with | Effort |
|---|---|---|---|---|---|
| ~~T5.1~~ | ~~`RichTextBlock` body-alignment cascade~~ | — | — | — | ✅ **RESOLVED 2026-04-23 (rejected design, semantics preserved)** — after T3.1 `block.callout` shipped, the cascade was obviated. RichTextBlock body stays always-left-aligned inside the max-width prose column; `sectionHeading.align` controls the heading only. Any future per-paragraph alignment inside long-form content is a `blockContent` schema extension, not a block-level knob. |
| T5.2 | `FeatureGridBlock` renders item icon + item CTA | `[impl]` | `packages/ui/src/blocks/FeatureGridBlock/FeatureGridBlock.tsx` + new `<IconTile>` composite | T2.3 + T2.4 | small |
| T5.3 | `<ComparisonCard>` + `<BulletIndicator>` composites | `[impl]` | new `packages/ui/src/components/ComparisonCard/`, `BulletIndicator/` | T3.3 | medium |
| T5.4 | `<Accordion>` / `<AccordionItem>` composite | `[impl]` | new `packages/ui/src/components/Accordion/` (⚠ primitive `<Accordion>` exists in `packages/ui/src/primitives/Accordion/` — verify naming collision before creating a composite wrapper) | T3.4 | small–medium |
| ~~T5.5~~ | ~~`<CodeBlock>` composite~~ | — | — | — | ✅ **Obviated 2026-04-23** — syntax highlighting shipped inside CodeSampleBlock via prism-react-renderer + `--color-syntax-*` tokens; window chrome + filename chrome is a small inline render. No separate composite needed. |
| T5.6 | `<TestimonialCard>` + `<Avatar>` + `<Carousel>` composites | `[impl]` | new in `packages/ui/src/components/` | T3.2 | medium |
| T5.7 | `<LogoMarquee>` composite | `[impl]` | new in `packages/ui/src/components/` (⚠ primitive `<Marquee>` exists — composite wraps it with logo-specific sizing + grayscale + fade) | T3.6 | small |
| T5.8 | `<Navbar>` + `<Footer>` composites | `[impl]` | new in `packages/ui/src/components/` | T4.1 | medium |
| ~~T5.9~~ | ~~`<TabFilter>` primitive~~ | — | — | — | ✅ **SHIPPED 2026-04-22** — built as `<Tabs>` compound (Radix-style): `Tabs + TabsList + TabsTrigger + TabsContent`. Context-based state, keyboard nav (←→/Home/End), roving tabindex, full ARIA (`role="tab"`/`tabpanel"`, `aria-selected`, `aria-controls`). TabbedFeaturesBlock now uses it + Grid — zero raw `<div>`/`<button>` in the block. |
| ~~T5.10~~ | ~~`<CalloutFrame>` composite~~ | — | — | — | ✅ **SHIPPED 2026-04-23 (with T3.1)** — no separate composite needed. `<Card>` primitive + tone className in CalloutBlock covers all three observed variants (default / frosted / accent). |
| ~~T5.11~~ | ~~`<IconBadge>` primitive~~ | — | — | — | ✅ **SHIPPED 2026-04-23** — sized rounded-xl container with icon at 50% of badge dimension (SM/MD/LG = 32/48/64px). Accepts `source` / `src` / `children` (inline SVG). "Floating" positioning is a consumer className override (`-mt-8` etc.). CalloutBlock refactored off raw-div icon wrapper. Composite gap 3 resolved. |
| T5.12 | "Ghost link with arrow" `CtaButton` variant | `[impl]` | extend `packages/ui/src/components/CtaButton.tsx` (or a `variant="ghost-arrow"` flag) | T2.4 | trivial–small |
| T5.13 | `<Legend>` composite (color-dot indicator row) | `[impl]` | new in `packages/ui/src/components/` | nothing open (1 cosmetic occurrence) | trivial |

---

## Tier 6 — cosmetic / low-occurrence (backlog)

| # | Item | Type | Effort | Evidence | Notes |
|---|---|---|---|---|---|
| T6.1 | `sectionHeading` H1 size option | `[impl]` | trivial | 1/8 | Cosmetic — current max is H2. |
| T6.2 | Split-heading row layout (heading + description side-by-side at top of block) | `[impl]` | small | 2/8 | If recurs in next integration, promote to Tier 3. |
| T6.3 | `block.featureGrid` `variant` for bordered-table grid treatment | `[impl]` | small | 1/8 (R2) | Single occurrence — keep in backlog. |

---

## Docs-edit candidates — staged in scratchpad

All 9 entries from session-2 handoff "Docs changes — priority-ordered" are staged in `docs/_scratchpad/prompt-edits-candidates.md`:

| Scratchpad ID | Target doc | Summary | Source gap(s) | State |
|---|---|---|---|---|
| **S1** | `figma-mcp-template.md` | **NEW** "Known-missing-schema patterns" subsection (8 entries) | docs 1, 8, 10, 12, 14, 16 | Proposed |
| **S2** | `figma-mcp-template.md` | **NEW** "Drill in first" rule — `get_metadata` before picking block type on any section-sized frame | docs 17 | Proposed |
| **S3** | `figma-mcp-template.md` | **FIX** featureGrid doc/code contradiction on icons (Tier 1 item T1.2) | docs 7 | Proposed — **ship Thu** |
| **S4** | `figma-mcp-template.md` | **NEW** "Site chrome vs. block content" subsection | docs 9 | Proposed |
| **S5** | `figma-mcp-template.md` | **NEW** "Adjacent-but-degraded" block-type bucket + `RichTextBlock` gotchas | docs 1, 2 | Proposed |
| **S6** | `content-extraction-prompt.md` | **ADD** CTA-absent flag + per-item CTA/icon sibling flag | docs 3, 6 | Proposed |
| **S7** | `component-queue-template.md` | **ADD** candidate+fallback per round + DONE-WITH-CAVEATS handoff example | docs 4, 5 | Proposed |
| **S8** | `component-queue-template.md` | **ADD** prediction-discipline rule (queue row notes must name gap OR mark "drill in first") | docs 13 | Proposed |
| **S9** | `component-queue-template.md` | **ADD** prediction-accuracy tracking subsection for handoff summaries | docs 11 | Proposed |

Application order: **S1 + S3 first** (ship Thu pre-Friday), **S2 + S4 + S5 next** (highest-severity rule clarifications), **S6 second** (catches the most future-builder foot-guns), **S7–S9 last** (queue-template improvements — validated by next integration's prediction accuracy).

---

## What's NOT in this triage (deliberately)

- **Cosmetic color/token mismatches against the placeholder palette.** Friday hex swap will resolve these; triaging them now is wasted motion. Tracked in queue file's "Token gaps" section for post-Friday re-verification.
- **Individual bug fixes inside already-applied blocks.** 4 of 8 blocks rendered DONE-WITH-CAVEATS — the caveats are logged in the queue's per-frame `Completed` entries, and most are absorbed by the Tier 3 new-schema work. Don't patch applied blocks before the corresponding schema lands.
- **`ai-voice-agents-mapping-notes.md`'s three Phase-5 gaps (tabbed container, column enum, title-emphasis variant).** Folded into this triage: tabbed container → T2.2 (tabbedFeatures, promoted to 3/3 evidence), column enum → T6.3, title-emphasis → nothing open (single cosmetic occurrence).

---

## Recommended sequence (calendar view)

- **Today (Wed 2026-04-22):** review this triage + scratchpad, approve or redirect.
- **Thu 2026-04-23:** ship T1.1 (schema PR, 1-line) + S3 (docs fix). Apply S1 to the prompt so any Thu re-runs benefit.
- **Fri 2026-04-24:** token swap PR lands; re-verify 8 applied blocks visually at `/signalwire-homepage`.
- **Next sprint:** T2.1 (heroCenter) + T2.2 (tabbedFeatures with nested T3.4, T3.5) + T2.3–T2.4 (featureGrid icon + cta). This unblocks the majority of the current page's fidelity losses.
- **Ongoing:** drain Tier 3–5 by fix-leverage; Tier 6 stays backlog unless future integrations promote items.

Next integration session should open with a `get_design_context` + `get_metadata` on a new Figma source (or re-run frames #5 + #8 against the tightened schema) — with the scratchpad edits already applied, the prediction-accuracy rate should climb from 75% toward 90%+.
