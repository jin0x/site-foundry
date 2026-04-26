# 2026-04-22 — SignalWire homepage → Figma-to-Sanity integration (ROUND 2)

This is the **round-2 re-run** of the SignalWire homepage dogfood. Same 8 frames as round 1, fresh session, fresh Sanity page (`signalwire-homepage-v2`), **tightened docs**.

The round-1 queue (`2026-04-22-signalwire-homepage-queue.md`) is the prior evidence. It is closed; do not edit it. This file is the round-2 audit trail.

---

## Why round 2

Round 1 surfaced **53 ranked gaps** across schema/composite/pipeline/token/docs. Post-round-1 we:

1. Consolidated the gaps into a ranked triage: `alpha_v3/gap-triage-2026-04-22.md`.
2. Staged and applied **9 docs edits** to `figma-mcp-template.md`, `component-queue-template.md`, `content-extraction-prompt.md` (see `alpha_v3/docs/_scratchpad/prompt-edits-candidates.md`). Pre-edit snapshots: `docs/_archive/2026-04-22-pre-round-2/`.
3. Shipped **Tier 1** + **Tier 2 T2.3/T2.4 schema-only** fixes to Site Foundry:
   - `block.richText` → `withCtas: true` (T1.1) — richText now carries `ctas[]`.
   - `block.featureGrid` item fields → added optional `icon` (T2.3) and `cta` (T2.4).
   - **Render fixes deliberately skipped** for T2.3/T2.4 — `FeatureGridBlock` React still renders `eyebrow + title + description` only. Icons/CTAs land in the seed but don't render. Known deferred visual gap, does not block doc-validation.
4. Deliberately did NOT ship Tier 2.1 (`heroCenter`), Tier 2.2 (`tabbedFeatures`), or any Tier 3 new blocks. Those require designer review, real copy, and (for tokens) post-Friday swap — and their absence in round 2 is the whole point. See "What round 2 is measuring" below.

## What round 2 is measuring

The primary deliverable is **not** "better block fidelity." It is:

1. **Prediction-accuracy lift.** Round 1 was 6/8 = 75%; 100% of wrong predictions were unhedged "clean" claims. Docs change (scratchpad S8) codified the rule. Does the rate climb to ≥ 90%? Do misses still follow the unhedged-simplicity pattern, or does a new miss pattern emerge?
2. **Docs-edit stickiness.** Each of the 9 scratchpad entries (S1–S9) is a bet that an edit will change builder behavior. Round 2 is the validation:
   - **S1** (Known-missing-schema patterns list) — does the builder check it FIRST and mark matching frames `BLOCKED` with list pointers, rather than cramming into existing blocks?
   - **S2** (Drill in first) — does the builder `get_metadata` on frames >800px BEFORE picking a block type?
   - **S3** (featureGrid doc fix) — no longer relevant; schema now matches doc after T2.3/T2.4 ship.
   - **S4** (Site chrome) — does the builder cleanly exclude navbar/footer and log a site-chrome gap?
   - **S5** (Adjacent-but-degraded) — does the builder use the degraded-render path with explicit gap logging, or skip/freelance?
   - **S6** (CTA placement pattern) — does the builder resist promoting card-level CTAs to Section-level?
   - **S7–S9** (queue-template improvements) — does this very queue file use the formats correctly? Are handoffs cleaner?
3. **Unknown-unknowns.** Gaps we missed in round 1. With the known-gaps list active, anything new that surfaces is net-new intel.
4. **Regression check on the two shipped schemas.** `richText` callout-intent frames (#1, #8) should now carry their CTAs end-to-end. `featureGrid` items (#2 Documentation, #7 Testimonials) should carry icon + cta data in the seed (even if not rendered).

**Stopping motivation:** if prediction-accuracy is ≥ 90% AND every scratchpad entry's validation condition holds, the docs ARE doing their job; we can move up-stack to ship Tier 2.1/2.2/Tier 3 schemas with confidence. If it's worse (prediction accuracy down OR new unhedged misses OR docs-edits didn't change behavior), the scratchpad should be revised or reverted before any further schema work.

## Status flags (read before building)

- **🟢 Docs are tightened.** Read `figma-mcp-template.md` and `component-queue-template.md` cold — do NOT rely on memory from round 1. The Known-missing-schema subsection (step 2 of Building a block flow) is now mandatory-first-check.
- **🟢 richText + featureGrid schemas extended.** `richText.ctas[]` available; `featureGrid.items[].icon` + `.cta` available. Seeds that previously flagged these as gaps should now carry the data.
- **🟡 FeatureGridBlock React render is deferred** — icons + per-item CTAs will not render even if present in seed. This is a known Tier 5 T5.2 deferred gap, not a bug. Do NOT file as a new gap.
- **🟡 Placeholder palette still in effect** — Friday 2026-04-24 token swap unchanged. Do not spend cycles on color matching; flag tone-level concerns only (e.g. "semantic role missing", not "hex doesn't match").
- **🟢 All of Tier 2.1 / 2.2 / Tier 3 remains unshipped** — `heroCenter`, `tabbedFeatures`, `block.callout`, `block.testimonials`, `block.comparison`, `block.accordion`, `block.codeSample`, `block.logoMarquee`. Frames hitting these should resolve via adjacent-but-degraded OR BLOCKED status, NOT freelance.

## Required reading (before you start)

1. `alpha_v3/gap-triage-2026-04-22.md` — ranked gap list; primary source of truth for what's intentionally un-fixed.
2. `alpha_v3/docs/figma-mcp-template.md` — **tightened** with S1, S2, S3, S4, S5 (see § "Known-missing-schema patterns" and new § "Site chrome vs. block content").
3. `alpha_v3/docs/component-queue-template.md` — **tightened** with S7, S8, S9 (§ "Prediction discipline", § "Candidate + fallback per round", updated handoff format).
4. `alpha_v3/docs/content-extraction-prompt.md` — **tightened** with S6 (§ "CTA placement pattern", CTA-absent escape hatch, per-item CTA flag).
5. `alpha_v3/seeds/queues/2026-04-22-signalwire-homepage-queue.md` — round-1 queue + both session handoffs. Evidence source for re-predicted gaps.
6. `alpha_v3/STATUS.md` — project state; env setup; known quirks.

## Source — Figma

Same as round 1.

- **File:** [SignalWire Website — Internal](https://www.figma.com/design/ox8M7KAx62v6GmQPriJBmO/SignalWire-Website--Internal-?node-id=893-6813&m=dev)
- **fileKey:** `ox8M7KAx62v6GmQPriJBmO`
- **Page nodeId:** `893:6813`

## Target — Sanity

- **Dataset:** `site-foundry-dev` (project `puqewi35`).
- **Target page (fresh):** `signalwire-homepage-v2` — bootstrapped 2026-04-22 (`_rev=lIAk1VnXAN0Mfad7DhQiDZ` at creation). The round-1 `signalwire-homepage` page is preserved for comparison.
- **Apply:**
  ```bash
  cd /home/brock/Design-to-code-chats/alpha_v3
  set -a && source /home/brock/Design-to-code-chats/project/site-foundry/.env && set +a
  pnpm apply seeds/signalwire/<file>.json --target signalwire-homepage-v2 --dry-run
  pnpm apply seeds/signalwire/<file>.json --target signalwire-homepage-v2
  pnpm verify --target signalwire-homepage-v2
  ```
- **Dev preview:**
  ```bash
  cd /home/brock/Design-to-code-chats/project/site-foundry/templates/next-sanity-starter
  pnpm -F @site-foundry-template/web dev
  # visit http://localhost:3000/signalwire-homepage-v2
  ```
- **Seed files:** reuse the same `seeds/signalwire/<file>.json` paths as round 1 — overwrite in place. Git diff against round 1 seeds shows per-frame delta (new CTAs on richText blocks; new icon/cta data on featureGrid items).

## Round structure

Same 3-round cadence as round 1. Time-boxed identically.

### Round 1 (re-pass) — single small block
- **Target:** frame #1 (node `893:7165` — Held Hostage callout).
- **Candidate:** `block.richText` with `ctas[]` — NOW that T1.1 shipped, the CTA can land end-to-end.
- **Fallback:** if `richText` + `ctas[]` still loses the card-frame / icon / tone dimensions, flag as `block.callout` gap (unchanged from round 1 — still Tier 3). Mark `DONE-WITH-CAVEATS` pointing to schema gap 1.
- **Expected prediction:** ✓ accurate (hedged — we know `block.callout` is still missing, but richText now carries more of the intent).
- **Exit when:** callout renders with CTA on `signalwire-homepage-v2`; audit passes; prediction logged.

### Round 2 (re-pass) — one section with items
- **Target:** frame #2 (node `893:7461` — Dive into Documentation grid).
- **Candidate:** `block.featureGrid` with items carrying `icon` + `cta` (T2.3/T2.4 now shipped at schema level).
- **Fallback:** none needed — all previously-flagged fields now schema-supported. The render won't show the icons/CTAs (deferred T5.2) — that's a known visual gap, NOT a new schema flag.
- **Expected prediction:** ✓ accurate (named the gap in round 1; now resolved at schema level).
- **Exit when:** seed carries all 6 items with icon + cta fields; dry-run validates clean; apply succeeds.

### Round 3 (re-pass) — full page assembly
- **Targets:** remaining 6 frames (#3–#8, including split #4a/#4b).
- **Expected gap hits (from round-1 evidence):** `block.heroCenter` (#3, #5, #8), `block.tabbedFeatures` + `codeSample` + `accordion` (#5), composed-graphic MCP pipeline gap (#3, #5, #6), `block.logoMarquee` (#4a BLOCKED), `block.comparison` (#4b), `block.testimonials` (#7), site chrome (#3 navbar, #8 footer).
- **What's new to look for:** any gap NOT on the round-1 list. Any builder behavior deviating from scratchpad predictions (did S1-S9 change the right things?).
- **Exit when:** every frame row has prediction + outcome logged; handoff summary populated; docs-edit stickiness verdict per entry.

## Session stop criteria

Same as round 1 plus one new rule:

- Four-frame per-session cap (unchanged).
- 4h R3 budget per session (unchanged).
- Friday arrives → swap + re-verify take priority (unchanged).
- **NEW: if prediction-accuracy for the first 3 frames of any session is ≤ 33% (i.e. 1/3 or worse), stop and investigate.** The docs edits should have moved accuracy up, not down; a drop means an edit is actively misdirecting.

## Frames

Same 8 frames as round 1. Ordered by build order. Each row carries a **prediction** (from round-1 evidence + docs-tightened expectation) — this is the bet the docs tightening should make MORE often right.

| # | Round | Status | Figma node | Prediction | Seed file | Notes |
|---|---|---|---|---|---|---|
| 1 | R1 | DONE-WITH-CAVEATS | `893:7165` | ✓ accurate: richText + CTA now shipped (T1.1); card-frame/icon/tone still degraded → `DONE-WITH-CAVEATS` pointing at Tier 3 `block.callout` gap | `seeds/signalwire/held-hostage-callout.json` | CTA lands end-to-end; seed validated clean; applied to v2. Still missing card frame, icon badge, decorative gradient overlay (schema gap 1 / T3.1 unchanged). |
| 2 | R2 | DONE-WITH-CAVEATS | `893:7461` | ✓ accurate: featureGrid now carries icon + cta at schema level; render deferred T5.2 | `seeds/signalwire/dive-into-documentation.json` | 6 items × (title + description + icon + cta) in seed; all 6 icons uploaded; 6× "Learn More" CTAs (ghost/transparent, color=primary) on every item. Tab filter at header still a T2.2 tabbedFeatures gap; bordered-table grid treatment still T6.3. |
| 3 | R3 | DONE-WITH-CAVEATS | `893:36599` | ~ partial (accurate): matches Known-missing centered-hero-with-media-below pattern | `seeds/signalwire/hero-communications-control-plane.json` | S2 drill-in ran; split revealed title zone (`893:36606`) + code-editor media zone (`893:36615`) + Navbar (`897:37487`). Navbar excised per S4. Applied as degraded `heroSplit` mediaPlacement=right, media dropped (composed-from-fragments — pipeline gap 1). Gaps unchanged from round 1 (schema gap 8 heroCenter, schema gap 9 site-chrome, pipeline gap 1). |
| 4 | R3 | SPLIT | `893:6814` | ✓ accurate: splits into 4a (logoMarquee BLOCKED) + 4b (comparison DONE-WITH-CAVEATS via featureGrid 2-col) | — | `get_metadata` ran first; confirmed 2 child frames exactly as predicted: `893:7069` marquee + `893:7139` comparison. |
| 4a | R3 | BLOCKED | `893:7069` | ✓ accurate: BLOCKED on T3.6 `block.logoMarquee` | `seeds/signalwire/customer-logos.json` (not written) | Round-1 BLOCKED unchanged; no seed written. Schema gap 11 carries forward. |
| 4b | R3 | DONE-WITH-CAVEATS | `893:7139` | ✓ accurate: degraded via featureGrid 2-col | `seeds/signalwire/production-costly-comparison.json` | Applied to v2 unchanged from round 1 (pro/con lists flattened into description prose, no bullet indicators, no fuchsia emphasis border). Schema gap 12 (block.comparison / T3.3) carries forward. |
| 5 | R3 | DONE-WITH-CAVEATS | `893:7147` | ✓ accurate: S1 list-check surfaced 3 patterns simultaneously on first pass (T2.2 tabbedFeatures + T3.4 accordion + T3.5 codeSample) + T2.1 heroCenter ambient; zero temptation to call `heroSplit` | `seeds/signalwire/everything-you-need-unified.json` | **Round-1 miss FIXED.** S2 drill-in returned `Tab Filter` (693:8) + 5× `Accordion Item` (701:6779/701:6780) + `Code Block` (690:33) — all three designer-registered, all three known-missing. Degraded via centered richText (heading + body paragraph only). Schema gaps 6/13/14/8 all resurface unchanged; composite gaps 4/12/13 unchanged; token gap 6 (syntax/*) unchanged. |
| 6 | R3 | DONE-WITH-CAVEATS | `893:7173` | ✓ accurate: S1 matched heroCenter on first pass; S2 drill-in confirmed split-heading row (Title at x=0 + Subtitle at x=520 inside same Title container), composed-diagram (50+ vectors), legend | `seeds/signalwire/voice-ai-follows-logic.json` | **Round-1 miss FIXED.** Degraded via `heroSplit` mediaPlacement=right with media dropped (composed graphic — pipeline gap 1 unchanged). Schema gap 8 (heroCenter) + schema gap 10 (split-heading) + pipeline gap 1 + composite gap 9 (legend row) all resurface unchanged. Design-context exceeded the 25K-token response limit (expected for 50+ vector diagram) — extracted title/subtitle/legend text via file read, fidelity loss concentrated in diagram media which degrade-drops anyway. |
| 7 | R3 | DONE-WITH-CAVEATS | `893:7450` | ✓ accurate: featureGrid 3-col degrade held | `seeds/signalwire/testimonials-thousands-of-devs.json` | 3 items (Default/Featured/Default); T2.4 cta field N/A (design has no card CTAs); T2.3 icon field N/A (cards have avatars not icons — `image` field would be needed, neither in schema). Placeholder copy retained ("Lorem ipsum" / "John Doe") — awaiting real customer copy. Schema gap 15 / T3.2 (block.testimonials) unchanged; composite gap 14 (avatar + Featured variant + carousel dots) unchanged. |
| 8 | R3 | DONE-WITH-CAVEATS | `893:7487` (CTA banner; `893:7489` footer excluded) | ✓ accurate: S2 drill-in returned 2 sibling instances (CTA Banner 980×404 + Footer 1440×403); S4 excised Footer; T1.1 let richText carry the CTA end-to-end | `seeds/signalwire/whats-next-closer.json` | **Round-2 degrade upgrade vs round 1.** Round 1 used `block.heroSplit` with centered sectionHeading + description + 1 CTA (documented as "heroSplit forced into non-split role"). Round 2 switches to `block.richText` + `ctas[]` post-T1.1 — this is the documented degrade for callout-intent per S5/S1. Lost fidelity identical to round 1 (frosted-card treatment, starry-nebula backdrop, logo mark per component description). Schema gap 1 (block.callout / T3.1) strengthened to 2/2 uses this round; schema gap 9 (site-chrome / T4.1) strengthened to include footer. |

**Prediction discipline:** every row above names either (a) the expected gap explicitly OR (b) "drill in first". No unhedged simplicity. Per `component-queue-template.md` § Prediction discipline.

---

## Schema gaps surfaced this session

*(Same format as round 1. Key signal: do the SAME gaps resurface (expected for unshipped Tier 2.1/2.2/Tier 3), or do NEW gaps emerge?)*

**Session 1 (frames 1–4): zero NEW schema gaps.** Every gap observed is already on round-1's list:

- Frame #1: schema gap 1 (`block.callout` / T3.1) — unchanged; CTA dimension now covered by T1.1 but card frame / icon / tone still missing. Strengthened to **3/3 uses** counting frame #8's forthcoming CTA banner variant (prediction).
- Frame #2: schema gap 6 (`block.tabbedFeatures` / T2.2) — tab filter at the header is still a known gap. Resurfaced unchanged.
- Frame #3: schema gap 8 (`block.heroCenter` / T2.1), schema gap 9 (site-chrome / T4.1), pipeline gap 1 (composed-graphic export / T4.2) — all resurfaced unchanged.
- Frame #4a: schema gap 11 (`block.logoMarquee` / T3.6) — unchanged BLOCKER.
- Frame #4b: schema gap 12 (`block.comparison` / T3.3) — resurfaced unchanged.

Expected for unshipped Tier 2.1/2.2/Tier 3 schemas. Docs tightening correctly routed these into adjacent-but-degraded / BLOCKED paths instead of freelance attempts.

**Session 2 (frames 5–8): zero NEW schema gaps.** Every gap observed is already on round-1's list:

- Frame #5: schema gap 6 (`block.tabbedFeatures` / T2.2) — **4th cumulative use** (Phase 5 + R2 + R3 #5 round 1 + R3 #5 round 2). Schema gap 8 (`block.heroCenter` / T2.1) — ambient match for centered-anchor. Schema gap 13 (`block.accordion` / T3.4) — resurfaced unchanged. Schema gap 14 (`block.codeSample` / T3.5) — resurfaced unchanged. All 4 gaps surfaced **via S1 list-check on first pass**, before any block-type commitment.
- Frame #6: schema gap 8 (`block.heroCenter` / T2.1) — **4/5 → now 5/5 R3 hero-shaped frames with centered/anchored-heading intent**. Schema gap 10 (split-heading / new in round 1) — resurfaced unchanged. Pipeline gap 1 (composed-graphic) — strengthened to 2/2 R3 diagrams (frame #3 code editor + frame #6 architecture diagram).
- Frame #7: schema gap 15 (`block.testimonials` / T3.2) — resurfaced unchanged. Placeholder copy still in Figma (awaiting real customer content) — not a new gap, design-state observation.
- Frame #8: schema gap 1 (`block.callout` / T3.1) — **strengthened to 2/2 round-2 uses** (frames #1 + #8), matching round-1's same 2/2. Schema gap 9 (site-chrome / T4.1) — **strengthened to include footer** (1440×403 instance `893:7489`). **Round-2 degrade upgrade:** switched from `block.heroSplit` (round 1) to `block.richText` (round 2 post-T1.1) — docs-stickiness win, not a new gap.

**Cumulative round-2 totals:** 0 new schema gaps across 8 frames. Every gap maps to round-1's list of 53. Docs-tightening held — the S1 known-missing-schema-patterns list correctly anticipated every frame's gap structure.

## Primitive / composite gaps surfaced this session

**Session 1: zero NEW composite gaps.** All observed gaps map to round-1 entries:

- Frame #1: composite gap 1 (contained-card Section / CalloutFrame), composite gap 2 (RichTextBlock body alignment), composite gap 3 (IconBadge) — unchanged.
- Frame #2: composite gap 4 (TabFilter primitive), composite gap 5 (IconTile), composite gap 6 (ghost-arrow CtaButton variant) — unchanged. Note: FeatureGridBlock still renders title+description only — icons/CTAs live in seed but do not render. Per status flag 🟡, this is deferred T5.2, NOT a new gap.
- Frame #3: composite gap 7 (HeroSplit centered single-column), composite gap 8 (Navbar composite) — unchanged.
- Frame #4b: composite gap 10 (LogoMarquee), composite gap 11 (ComparisonCard + BulletIndicator) — unchanged.

**Session 2: zero NEW composite gaps.** All observed gaps map to round-1 entries:

- Frame #5: composite gap 4 (TabFilter primitive) — 2nd encounter; composite gap 12 (AccordionListItem with numeric prefix + pink-accent-on-open) — unchanged; composite gap 13 (CodeBlock composite — window chrome + line numbers + syntax spans) — unchanged; composite gap 2 (RichTextBlock body alignment) — applies since we used richText degrade (heading centers, body stays left-aligned).
- Frame #6: composite gap 7 (HeroSplit centered single-column) — applies to degrade path; composite gap 9 (Legend row — 3 color-dot + label pairs) — unchanged.
- Frame #7: composite gap 14 (TestimonialCard Default+Featured variants + Avatar slot + Carousel dots) — unchanged. FeatureGridBlock render of title+description only means avatars/Featured variant/quote-as-primary-content not representable even in degrade.
- Frame #8: composite gap 1 (contained-card CalloutFrame — frosted card treatment) — 2nd-use strengthened; composite gap 2 (RichTextBlock body alignment) — **NOTED on closer block**: body "APIs built for speed..." will render left-aligned even with sectionHeading.align=center. Visual fidelity loss on the final-impression closer — escalates priority of T5.1 vs round 1's assessment. Still NOT a new gap, just higher-stakes placement.

**Cumulative round-2 totals:** 0 new composite gaps across 8 frames. Round 1's list of 14 composite gaps remains exhaustive.

## Token gaps / mismatches surfaced this session

- **Session 1 (frames 1–4):** none — placeholder palette still active until Friday; no new semantic-role gaps observed in frames 1–4.
- **Session 2 (frames 5–8):** zero NEW token gaps. Frame #5 re-exercises `syntax/*` family (token gap 6 from round 1). Frame #6 re-exercises brand-turquoise/brand-blue/brand-fuchsia as data-viz legend roles. Frame #7 re-exercises brand-fuchsia as Featured-card border + blue glow shadow. Frame #8 uses rgba(14,14,24,0.6) + border rgba(255,255,255,0.1) for frosted-card — per status flag 🟡, placeholder palette means tone-level concerns only, and there's no "frosted surface" semantic role in the current token set. Not filing as new — Friday swap will determine if the real SignalWire token set adds one.

## Docs-edit validation per entry (S1–S9)

### S1 — Known-missing-schema patterns list: did the builder check FIRST?
- **Frame #1:** ✅ STUCK. Matched "Contained-card callout (heading + body + CTA + tone/icon)" on first pass; routed to richText + ctas (post-T1.1) per the list's own resolution. Did not freelance.
- **Frame #2:** ✅ STUCK (partial). featureGrid itself is not a known-missing pattern (its schema now covers icon + cta post T2.3/T2.4). The **tab filter** in the header WAS identified against the list as a `block.tabbedFeatures` hit (schema gap 6), and correctly flagged-not-fixed.
- **Frame #3:** ✅ STUCK. Matched "Centered hero with media below (code-editor, diagram, screenshot)" on first pass. Used adjacent-but-degraded via heroSplit with mediaPlacement=right.
- **Frame #4:** ✅ STUCK. Parent frame didn't need the list (a multi-region container per S2); children hit the list: 4a = `block.logoMarquee`, 4b = `block.comparison`, both routed to BLOCKED / DONE-WITH-CAVEATS correctly.
- **Frame #5:** ✅ STUCK — **the headline test of round 2.** S1 list surfaced THREE patterns simultaneously on first pass: "Tabbed / grouped content" (T2.2), "Collapsible list" (T3.4), "Code editor as media" (T3.5), plus partial "Centered hero with media below" (T2.1 ambient). Zero temptation to call `heroSplit + code-block media` (the round-1 unhedged miss). Evidence from metadata drill: designer-registered `Tab Filter` (693:8), 5× `Accordion Item` (701:6779/701:6780), `Code Block` (690:33) — three first-class components, three list hits. Degrade routed to centered `richText` with heading + body-paragraph only, DONE-WITH-CAVEATS pointer to 4 gap IDs (T2.1/T2.2/T3.4/T3.5).
- **Frame #6:** ✅ STUCK. S1 matched "Centered hero with media below (diagram)" (T2.1) on first pass, as with frame #3. S2 drill-in confirmed split-heading (T2.5 / split-heading / schema gap 10 from round 1) + 50+ vector diagram (pipeline gap 1 / T4.2) + legend row (composite gap 9) — all three already on round-1's gap list. Routed to heroSplit mediaPlacement=right with media dropped (same degrade as frame #3).
- **Frame #7:** ✅ STUCK. Matched "Testimonial cards (quote + author + avatar + variants)" → T3.2. Adjacent-but-degraded via featureGrid 3-col per documented degrade path. Avatar + Featured variant + carousel dots all flagged (composite gap 14).
- **Frame #8:** ✅ STUCK. CTA Banner portion matched "Contained-card callout" (T3.1) — same list row as frame #1. Post-T1.1 degrade = `block.richText` with ctas[]. Footer portion NOT on the S1 list (it's site-chrome per separate rule) — excised via S4. **Zero list-miss, zero freelance.** S1 is the load-bearing docs edit of round 2 — 8/8 frames checked against it first, every frame routed through its rules.

### S2 — Drill in first: did the builder `get_metadata` on >800px frames BEFORE picking block type?
- **Frame #1:** N/A (657px tall, single content zone). Rule didn't trigger.
- **Frame #2:** ✅ STUCK. Frame 1156px tall → `get_metadata` ran first. Confirmed single content zone ("Dive into Documentation" header + 2× rows of 3 Detail Blocks), no unexpected children. Allowed confident block-type pick before `get_design_context`.
- **Frame #3:** ✅ STUCK. Frame 1338px tall → `get_metadata` ran first. Surfaced 3 regions: title (`893:36606`), code-editor media (`893:36615`), Navbar (`897:37487`). Without drill-in, navbar would have been missed.
- **Frame #4:** ✅ STUCK (highest-value application this session). Frame 1108px tall → `get_metadata` ran first. Confirmed split into 4a (`893:7069` marquee) + 4b (`893:7139` comparison) BEFORE picking block types. Matches round-1's accurate prediction — no regression.
- **Frame #5:** ✅ STUCK. Frame 980px tall → `get_metadata` ran first. Surfaced Heading frame (Title + Description) + Tab Filter instance + Links Container (5 Accordion Items) + Code Section (Code Block + caption). Allowed S1 to run against the 3 designer-registered component instances directly. Critical prevention: without drill-in, `get_design_context` returns only the HTML-ish tree without exposing which children are instances of which designer-registered components — drill-in delivered the component identities up front.
- **Frame #6:** ✅ STUCK. Frame 1048px tall → `get_metadata` ran first. Surfaced Title frame (Title + Subtitle side-by-side, confirming split-heading schema gap 10) + Group 83 (diagram composition — 50+ vector fragments across Pattern + Mask groups + Diagram Treatment) + Legend (3 Container rows with ellipse + text pairs). Diagram's vector-fragment decomposition surfaced at metadata level, confirming pipeline gap 1 pre-emptively without needing to parse the 63,580-char design_context response.
- **Frame #7:** ✅ STUCK (though the 800px threshold is a judgment call). Frame 713px tall → below the strict threshold, but still multi-zone. `get_metadata` ran first anyway and confirmed Title + Section (3 Testimonial Card instances: Default/Featured/Default) + carousel dots. Confirmed the 2-variant card pattern before `get_design_context`.
- **Frame #8:** ✅ STUCK (pivotal). Frame 921px tall → `get_metadata` ran first on the named parent `893:7486` and returned a leaf with zero children, which would have been misleading. Follow-up `get_metadata` on the two known-from-round-1 sibling instances (`893:7487` CTA Banner 980×404 + `893:7489` Footer 1440×403) confirmed they exist as designer-registered instances. **Note on parent-leaf behavior:** when a Figma frame is named but its contents are all instance references at the same/peer level, `get_metadata` on the container returns a leaf. Multi-region detection in this case relies on either prior-round evidence or a broader query. Not a drill-in failure — just a characteristic of the MCP tool worth documenting.

**Cumulative across round 2:** S2 applied to 7/8 frames (frame #1 below threshold). Every application surfaced structural information that materially affected the block-type decision — including preventing round-1 miss calls. High-value rule, zero regressions.

### S3 — featureGrid doc fix
- N/A this round (obviated by T2.3/T2.4 schema ship — `figma-mcp-template.md` now matches schema reality).

### S4 — Site chrome: did the builder cleanly excise navbar/footer?
- **Frame #1–#2, #4:** N/A (no chrome in frame).
- **Frame #3:** ✅ STUCK. Navbar `897:37487` (1052×56 at y=69) identified in `get_metadata` output, excluded from seed, logged as ongoing schema gap 9 / T4.1. No content leakage into the block seed.
- **Frame #5–#7:** N/A (no chrome in any of these frames).
- **Frame #8:** ✅ STUCK (the footer test). Footer `893:7489` (1440×403, full-width designer-registered component) excluded from seed, logged as strengthening schema gap 9 / T4.1. Seed targets the CTA Banner instance `893:7487` only; `figmaNodeId` in the seed points at the banner not the parent container. Zero footer content leakage into the block seed. Combined with the navbar excision in frame #3, S4 now has **2/2 site-chrome validations** — both types (header navbar + footer) routed correctly.

**Cumulative across round 2:** S4 fired on 2/8 frames (the two that contained site chrome). Both correctly excised. Rule is well-calibrated — it doesn't over-trigger on block-content-only frames.

### S5 — Adjacent-but-degraded + RichTextBlock gotchas: degraded-render path with explicit gap logging?
- **Frame #1:** ✅ STUCK. Used `block.richText` + `withCtas` (now shipped) as the documented degrade path for callout-intent; explicit pointer to schema gap 1 (block.callout) for the unfilled dimensions (card frame, icon, decoration). RichTextBlock body-alignment gotcha (body stays left-aligned even when sectionHeading.align=center) still applies — captured in figma-mcp-template.md § block gotchas; composite gap 2 / T5.1 unchanged.
- **Frame #3:** ✅ STUCK. Used `block.heroSplit` mediaPlacement=right as documented degrade path for heroCenter pattern; explicit pointer to schema gap 8 (block.heroCenter / T2.1).
- **Frame #4b:** ✅ STUCK. Used `block.featureGrid` 2-col as documented degrade path for comparison; explicit pointer to schema gap 12 (block.comparison / T3.3).
- **Frame #5:** ✅ STUCK. Used `block.richText` with heading + body-paragraph only as the documented adjacent-but-degraded path for multi-axis-complex content (tabbedFeatures + accordion + codeSample all missing). Pointers to T2.2 / T3.4 / T3.5 / T2.1 in the DONE-WITH-CAVEATS line. RichTextBlock body-alignment gotcha applies (body stays left-aligned even though design is centered) — captured at composite gap 2 / T5.1 unchanged.
- **Frame #6:** ✅ STUCK. Used `block.heroSplit` mediaPlacement=right as documented degrade path for heroCenter pattern with composed-graphic media (same shape as frame #3). Media dropped per pipeline gap 1. Pointers to T2.1 / T2.5 (split-heading) / T4.2 (pipeline) / composite gap 9 (legend).
- **Frame #7:** ✅ STUCK. Used `block.featureGrid` 3-col as documented degrade path for testimonials (quote → title, attribution → description). Pointers to T3.2 and composite gap 14 (avatar + Featured variant + carousel).
- **Frame #8:** ✅ STUCK — **round-2 degrade upgrade**. Round 1 used `block.heroSplit` for this CTA banner (centered heading + description + CTA, but heroSplit is semantically a 2-col split). Round 2 used `block.richText` + `ctas[]` post-T1.1 — this is the documented degrade for callout-intent per S1's own resolution line. Better docs alignment, identical information architecture end-to-end. Pointer to T3.1 (block.callout) for card-frame/backdrop/logo-mark dimensions. RichTextBlock body-alignment gotcha again applies (closer tagline will render left-aligned) — escalates the T5.1 priority per composite-gap section above.

**Cumulative across round 2:** S5 fired on 6/8 frames. Every firing used a documented degrade path with explicit gap-ID pointers. Zero freelance attempts. Round 2 even *upgraded* one degrade call (frame #8) from round-1's heroSplit to round-2's richText — a docs-stickiness win.

### S6 — CTA placement pattern: did the builder resist promoting card-level CTAs to Section-level?
- **Frame #2:** ✅ STUCK (primary test). 6 per-item "Learn More" CTAs placed **on each item** using the now-shipped T2.4 `items[].cta` field — NOT promoted to `fields.ctas[]` at section level. Matches the documented card-level convention exactly.
- **Frame #1:** N/A (CTA is section-level by design — single primary CTA under body, documented as one of the richText/closer/hero section-level use cases).
- **Frame #3:** N/A (2 CTAs under hero — section-level per convention).
- **Frame #4b:** N/A (degraded featureGrid items don't carry CTAs in this design; pro/con list items are not CTAs).
- **Frame #5:** N/A (no CTAs in design — accordion items are interactive but not CTAs; tab filter is navigation; no section-level conversion affordance).
- **Frame #6:** N/A (no CTAs in design — pure architecture explanation frame).
- **Frame #7:** N/A (testimonial cards have **no card-level CTAs** in this design — quote + avatar + name only. T2.4 availability did not force a CTA where none exists in the design. Zero temptation to invent CTAs to "use" the new schema field).
- **Frame #8:** ✅ STUCK (the closer-CTA test). Single primary CTA "Try SignalWire for Free" placed at **section level** (`fields.ctas[]`) — correct per the documented closer-block convention (1–2 primary conversion affordances). No attempt to promote to a card-level anywhere. The card-level / Section-level distinction held cleanly.

**Cumulative across round 2:** S6 applied to 2 explicit tests (frames #2 card-level + #8 section-level) plus 6 N/A cases. Zero cases of promotion-to-fit-schema or invention-of-absent-CTAs. Rule is well-scoped.

### S7 — Candidate+fallback per round + DONE-WITH-CAVEATS line format: is THIS queue file using the format correctly?
- ✅ STUCK. Round definitions (R1 re-pass / R2 re-pass / R3 re-pass) each include candidate + fallback + exit criteria. Frame row status transitions use `DONE-WITH-CAVEATS` with pointer to gap IDs (schema gap N / composite gap N / pipeline gap N). Frame 4 uses the `SPLIT` → `4a` / `4b` sub-row convention per round-1 precedent.

### S8 — Prediction discipline: are row notes hedged or gap-naming? Does round-2 accuracy exceed round-1's 75%?
- ✅ STUCK (session 1). All 4 frames (1, 2, 3, 4) predictions were accurate this session. Session-1 tally: 4/4 = 100%.
- ✅ STUCK (session 2). All 4 frames (5, 6, 7, 8) predictions were accurate this session. Session-2 tally: 4/4 = 100%. **Crucially, the two round-1 misses (frames #5 and #6) — both unhedged "clean" claims in round 1 — flipped to accurate in round 2.** Frame #5's row note explicitly named "3-axis complexity (tabbedFeatures + accordion + codeSample)" — the gap-naming form required by S8. Frame #6's row note said "matches Known-missing pattern (centered hero + diagram media)" — again gap-naming. Both the pre-frame predictions (written in the queue BEFORE the build) and the as-built outcomes matched.
- **Round-2 total tally: 8/8 accurate (100%).** Up from round 1's 6/8 (75%). Target ≥90% cleared by a full 10-point margin.
- **Miss pattern in round 2:** zero misses. The unhedged-simplicity pattern that drove 100% of round-1's misses was absent from round-2's queue — every row note either named gaps explicitly or flagged `requires drill-in`. Docs edit S8 is doing its job.

### S9 — Prediction-accuracy tracking in handoff: is the handoff populated with the new subsection?
- ✅ STUCK. See § "Prediction accuracy (this session)" below.

## Unknown-unknowns surfaced this session

*(New gaps that were NOT on round-1's list.)*

- *(Session 1: none — frames 1–4 behaved exactly as round 1 predicted and the docs-tightened list anticipated. Frames 5–8 are the higher-risk frames for unknown-unknowns since they carry the round-1 misses and the multi-region CTA-banner-plus-footer frame. Watch this section in session 2.)*
- **Session 2: none.** Across 4 of the highest-risk frames in the project (2 round-1 misses + multi-region closer + testimonials with designer-registered variants) **zero** gaps surfaced that weren't already on round-1's list of 53. The round-1 gap triage was **exhaustive** against the actual frames of this homepage.

**Two minor observations that are NOT new gaps, logged here so they aren't lost:**
  1. **CTA Banner component description mentions "logo mark" but current instance renders only heading + description + button.** The designer description for `CTA Banner` (node 693:20) reads: _"Full-width closing CTA. Dark frosted card with logo mark, headline, and primary button."_ The live instance in frame #8 has no logo mark. Not a new gap — T3.1 `block.callout` already lists an optional `icon`/`logo` slot. Could be a stale component description, or could indicate the logo is a future variant. Flag for designer review, not schema work.
  2. **`get_metadata` on a parent frame whose children are all instance references at the peer level returns a leaf.** Frame #8's parent `893:7486` returned `<frame ... width="1440" height="921" />` with no children. Both the CTA Banner (`893:7487`) and Footer (`893:7489`) exist as siblings/instances queryable by ID but not reachable via the parent's metadata tree. Not a schema or docs gap — it's a property of the MCP tool's response shape. Worth documenting in `figma-mcp-template.md` §Drill in first: "if `get_metadata` returns a leaf for a large frame with visible contents, try known child IDs from prior rounds OR broaden the query." Low priority; hit this exactly once across 8 frames.

## Regressions / unexpected behavior

*(Anything that worked in round 1 but is broken in round 2 — e.g. a schema change that inadvertently invalidated an existing seed. Expected empty.)*

- *(Session 1: none.* T1.1 (richText.withCtas:true) and T2.3/T2.4 (featureGrid items.icon + items.cta) applied cleanly. Round-1 seeds that were re-used with only `targetPage` updated (frames #3, #4b) applied without any schema validation errors — confirming the shipped schemas are **additive** and did not invalidate the round-1 seed shapes.*)*
- **Session 2: none.** All 4 session-2 seeds dry-ran clean + applied clean to `signalwire-homepage-v2`. Round-1 seed shapes retained as round-2 base (frames #5 richText, #6 heroSplit, #7 featureGrid) each applied with only `targetPage` updated — confirming additive schema behavior holds for the v2 page as well. Frame #8's block-type change from `heroSplit` → `richText` is a degrade-path improvement (not a regression) — both seeds are valid today, both carry the same conversion intent; round-2's choice better aligns with the documented callout degrade.

---

## Handoff — 2026-04-22 (round-2 session 1 of 2)

**Session wallclock:** ~35 min (R1 re-pass ≈ 8 min, R2 re-pass ≈ 10 min, R3 #3 ≈ 8 min, R3 #4 split ≈ 9 min). Well inside round-1's equivalent 2h for 4 frames — re-passes are cheaper than fresh builds, as expected.

**Page state in Sanity (`signalwire-homepage-v2`, dataset `site-foundry-dev`):**
```
block.richText     (f770b43a788b)  ← R1 Held Hostage callout (now WITH cta)
block.featureGrid  (f6c0f293a954)  ← R2 Dive into Documentation (now WITH 6× icon + 6× cta per item)
block.heroSplit    (f22686d9c7a1)  ← R3 #3 communications control plane hero (unchanged from round 1)
block.featureGrid  (ffc95243e138)  ← R3 #4b Production is a Costly Place comparison (unchanged from round 1)
```
Page-order display still wrong (applied in build-order not page-order) — known quirk per STATUS.md.

### Completed (4 frames this session)
- Frame 1 (R1) DONE-WITH-CAVEATS (seed: `seeds/signalwire/held-hostage-callout.json`; see schema gap 1 carry-forward, composite gaps 1–3, composite gap 2 RichTextBlock body alignment). CTA now lands end-to-end — clean regression test for T1.1. ✓
- Frame 2 (R2) DONE-WITH-CAVEATS (seed: `seeds/signalwire/dive-into-documentation.json`; see schema gap 6 / T2.2 tabbedFeatures for tab filter, schema gap 7 / T6.3 for bordered-table grid treatment, composite gap 5 IconTile, composite gap 6 ghost-arrow CtaButton). All 6 items now carry icon + cta in seed — clean regression test for T2.3/T2.4. FeatureGridBlock render of icons/CTAs is deferred T5.2, not filed as new gap. ✓
- Frame 3 (R3 #3) DONE-WITH-CAVEATS (seed: `seeds/signalwire/hero-communications-control-plane.json`; see schema gap 8 heroCenter, schema gap 9 site-chrome/navbar excision, pipeline gap 1 code-editor composed-graphic). Navbar correctly excised via S4; code-editor media dropped per pipeline gap 1; applied as degraded `heroSplit` right-placement. ~
- Frame 4 (R3 #4) SPLIT (via S2 `get_metadata` drill-in): 
  - Frame 4a BLOCKED (seed not written; see schema gap 11 `block.logoMarquee` / T3.6). Unchanged from round 1.
  - Frame 4b DONE-WITH-CAVEATS (seed: `seeds/signalwire/production-costly-comparison.json`; see schema gap 12 `block.comparison` / T3.3, composite gap 11 ComparisonCard + BulletIndicator). Applied as degraded featureGrid 2-col — identical shape to round 1. ✓

### In flight
- *(none — session cleanly closed at 4-frame cap)*

### Remaining in R3 (4 frames carried to next session)
- Frame 5 (`893:7147`) — "Everything You Need, Unified." PENDING. **Round-1 miss #1.** Session 2's most important test: does S1 list-check prevent the unhedged "heroSplit + code-block media" call from round 1? Does the builder now name ≥3 gap pointers (tabbedFeatures + accordion + codeSample)?
- Frame 6 (`893:7173`) — "You Write the Logic. Voice AI Follows It." PENDING. **Round-1 miss #2.** Session 2 test: does S8 prediction-discipline rule prevent the unhedged "cleanest R3 entry" call from round 1?
- Frame 7 (`893:7450`) — testimonials. PENDING. featureGrid 3-col fallback; T3.2 block.testimonials gap unchanged; per-item cta now available via T2.4.
- Frame 8 (`893:7486`) — "Stack for What's Next" CTA banner + footer. PENDING. Combined S2 + S4 test (multi-region + site-chrome). CTA banner maps to richText + CTA (now available post-T1.1).

### Prediction accuracy (this session)
- Frame 1: ✓ accurate — richText + ctas end-to-end as predicted; degrade path still names block.callout for remaining dimensions.
- Frame 2: ✓ accurate — T2.3/T2.4 cleanly accommodate icon + cta per item; no new gaps; tab filter correctly identified as existing T2.2 gap.
- Frame 3: ~ partial (accurate) — S1 list matched heroCenter pattern as predicted; S2 drill-in surfaced navbar; S4 excised it.
- Frame 4: ✓ accurate — split confirmed via S2; 4a BLOCKED + 4b degrade both matched round-1 outcome.
- **Session tally: 4/4 accurate (100%).**
- **Running tally across round 2:** 4/4 so far. Running round 1+2 re-pass tally for these 4 frames: 8/8 accurate (round 1 also got these right). Meaningful lift signal has to come from frames 5 & 6 in session 2 — those are the frames that moved round 1 to 6/8. If round 2 gets them, we clear 90%.
- **Miss pattern:** zero misses this session. All predictions either named the expected gap explicitly OR flagged "drill in first." S8 prediction-discipline rule has held 4/4.

### Docs-edit stickiness verdict (S1–S9)
- **S1** (Known-missing-schema patterns list) — **STUCK.** 4/4 frames (1, 2's tab filter, 3, 4a, 4b) routed through the list correctly. No freelance attempts. Evidence: § S1 above.
- **S2** (Drill in first) — **STUCK.** 3/3 applicable frames (>800px tall) ran `get_metadata` before `get_design_context` / block-type pick. Highest-value application was frame 4 (split confirmed pre-emptively). Evidence: § S2 above.
- **S3** (featureGrid doc fix) — **N/A** (obviated by T2.3/T2.4 schema ship). No validation possible this round.
- **S4** (Site chrome) — **STUCK** (limited sample: only frame 3 surfaced navbar in session 1). Full test comes with frame 8 (footer) in session 2. Evidence: § S4 above.
- **S5** (Adjacent-but-degraded + RichTextBlock gotchas) — **STUCK.** 3/3 applicable frames (1, 3, 4b) used the documented degrade path with explicit gap-ID pointers. Evidence: § S5 above.
- **S6** (CTA placement pattern) — **STUCK.** Frame 2's 6 per-item CTAs placed at card level via T2.4; zero temptation to promote to section. Evidence: § S6 above.
- **S7** (Candidate+fallback per round + DONE-WITH-CAVEATS line format) — **STUCK (self-assessment).** This queue file uses both conventions correctly. Evidence: queue structure itself — see § Round structure and § Completed above.
- **S8** (Prediction discipline) — **STUCK so far.** 4/4 row notes gap-named or drill-in-hedged; 4/4 predictions accurate. Real test is frames 5 & 6 in session 2 — row notes for those are already gap-named (not unhedged) so baseline discipline is good; outcome determines if the discipline holds.
- **S9** (Prediction-accuracy tracking subsection in handoff) — **STUCK.** See § Prediction accuracy above — subsection is present, per-frame, with running tally and miss-pattern analysis.

**Verdict so far:** all 8 applicable scratchpad entries STUCK through 4 frames. Zero revisions recommended. Zero rollbacks warranted. Full verdict pending session 2 completion.

### Gaps to carry forward (delta from round 1 only)
- **No new schema gaps** surfaced session 1. All observations map to round-1 entries.
- **No new composite gaps** surfaced session 1.
- **No new token gaps** surfaced session 1.
- **Strengthened evidence:** schema gap 1 (block.callout) — frame #1's CTA-dimension now covered, narrowing the remaining block.callout need to card frame + icon + decorative bg (not CTA). Still Tier 3 T3.1, but the "minimum fields needed" list shrinks.
- **Note on frame 4b:** the absence of a new gap here is notable. Round 1 flagged schema gap 12 (`block.comparison` / T3.3) with full fidelity loss detail. Re-applying with zero changes and getting identical render means: the T3.3 gap is exactly as scoped — no hidden sub-gaps emerged on re-pass.

### Unknown-unknowns for follow-up
- *(none in session 1)*. Session 2 is where this section is expected to grow — frames 5 & 6 were the round-1 misses; frame 8 is a multi-region CTA banner + footer that may surface footer-shape nuances not yet documented.

### Friday token-swap follow-ups
- No new token gaps this session. Token gaps 1–6 from round 1 are unchanged (fonts + callout tones + syntax/* family + brand-fuchsia-as-badge-fg).
- **Re-verify reminder post-Friday:** 4 applied blocks on `signalwire-homepage-v2` AND all 7 applied blocks on `signalwire-homepage` (round 1's page, retained for comparison). Hex swap should affect both pages identically. Any visual delta between the two pages post-swap that isn't explained by the 3 seed deltas (CTA on R1; icons/CTAs on R2; no delta on R3/R4b) signals a token-scoping bug.

### Session 2 priorities (for next-session context)
1. **Frame 5** (`893:7147`) — the prediction-discipline test. Expect the S1 list to surface 3 known-missing patterns simultaneously (tabbedFeatures, accordion, codeSample). Write the seed as best-effort richText with heading+subheading only, pointer to 3 gap IDs in the DONE-WITH-CAVEATS line.
2. **Frame 6** (`893:7173`) — the second round-1 miss. Expect S1 to match "Centered hero with media below (diagram)" (heroCenter pattern, same as frame #3), plus pipeline gap 1 (composed-from-fragments diagram). Split-heading layout (schema gap 10) is the only round-1 delta-risk — confirm via `get_metadata`.
3. **Frame 7** (`893:7450`) — testimonials degrade, first test of post-T2.4 cta on an item whose CTA wasn't actually in round-1 seed.
4. **Frame 8** (`893:7486`) — the S4 + S2 combined test. Expect `get_metadata` to reveal a `CTA Banner` region + a `Footer` region; write a richText + CTA seed for the banner (post-T1.1) and excise the footer per S4.

If all 4 session-2 frames pass prediction + S1–S9 stickiness, the docs-tightening was the right bet. If frame 5 or 6 misses, revise the S1 / S8 entries in the scratchpad before any further schema work.

---

## Handoff — 2026-04-22 (round-2 session 2 of 2 — FINAL)

**Session wallclock:** ~40 min (frame 5 ≈ 10 min including S1 check + MCP + seed + apply; frame 6 ≈ 12 min with the oversized design_context handling; frame 7 ≈ 6 min; frame 8 ≈ 12 min including the multi-region drill and degrade upgrade). **Total round-2 wallclock ≈ 75 min for 8 frames** vs round 1's ≈ 4 hours — re-passes with tightened docs are roughly 3× faster.

**Final page state in Sanity (`signalwire-homepage-v2`, dataset `site-foundry-dev`) — 8 blocks:**
```
block.richText     (f770b43a788b)  ← Frame #1  Held Hostage callout              (S1)
block.featureGrid  (f6c0f293a954)  ← Frame #2  Dive into Documentation            (S1)
block.heroSplit    (f22686d9c7a1)  ← Frame #3  Communications Control Plane hero  (S1)
block.featureGrid  (ffc95243e138)  ← Frame #4b Production Costly comparison       (S1)
block.richText     (f2c4ee556716)  ← Frame #5  Everything You Need, Unified       (S2 NEW)
block.heroSplit    (f86db37aa73a)  ← Frame #6  Voice AI Follows Logic             (S2 NEW)
block.featureGrid  (f22b4f1d1184)  ← Frame #7  Testimonials                       (S2 NEW)
block.richText     (f5049d34469e)  ← Frame #8  What's Next closer (richText!)     (S2 NEW)
```
Frame #8's blockKey `f5049d34469e` matches round-1's key on the v1 page (deterministically hashed from `figmaNodeId=893:7487`) but the `_type` is now `block.richText` instead of `block.heroSplit` — evidence that the key is input-hash-only, decoupled from block-type selection.

### Completed (4 frames this session)
- Frame 5 (R3 #5) DONE-WITH-CAVEATS (seed: `seeds/signalwire/everything-you-need-unified.json`; see schema gaps 6/13/14/8, composite gaps 2/4/12/13, token gap 6). S1 list-check surfaced 3 patterns simultaneously; degraded via centered richText. **Round-1 unhedged miss → round-2 accurate.** ✓
- Frame 6 (R3 #6) DONE-WITH-CAVEATS (seed: `seeds/signalwire/voice-ai-follows-logic.json`; see schema gaps 8/10, pipeline gap 1, composite gaps 7/9). S1 matched heroCenter; S2 confirmed split-heading + 50+ vector diagram + legend; degraded via heroSplit mediaPlacement=right with media dropped. **Round-1 unhedged miss → round-2 accurate.** ✓
- Frame 7 (R3 #7) DONE-WITH-CAVEATS (seed: `seeds/signalwire/testimonials-thousands-of-devs.json`; see schema gap 15, composite gap 14). featureGrid 3-col degrade; T2.3/T2.4 N/A for this frame (no icons, no per-card CTAs). Placeholder copy retained. ✓
- Frame 8 (R3 #8) DONE-WITH-CAVEATS (seed: `seeds/signalwire/whats-next-closer.json`; see schema gaps 1/9, composite gaps 1/2). S2 drill-in revealed 2-region frame; S4 excised Footer; T1.1 let richText carry the CTA. **Round-2 degrade upgrade: block.heroSplit (round 1) → block.richText (round 2).** ✓

### In flight
- *(none — session cleanly closed at 4-frame cap)*

### Remaining in R3
- *(none — all 8 frames complete)*

### Prediction accuracy (this session)
- Frame 5: ✓ accurate — S1 list-check surfaced 3 known-missing patterns simultaneously (tabbedFeatures + accordion + codeSample) + T2.1 ambient; DONE-WITH-CAVEATS line carries 4 gap pointers; zero temptation to call heroSplit.
- Frame 6: ✓ accurate — S1 matched heroCenter on first pass; S2 confirmed split-heading + composed diagram + legend all on round-1's list; degrade path matched frame #3's.
- Frame 7: ✓ accurate — featureGrid 3-col degrade held; T2.4 availability correctly not-applied (design has no card CTAs).
- Frame 8: ✓ accurate — S2 drill-in revealed 2 regions (CTA Banner + Footer); S4 excised Footer; T1.1 enabled the richText+CTA degrade which better matches callout-intent than round-1's heroSplit choice.
- **Session 2 tally: 4/4 accurate (100%).**
- **Round-2 total tally: 8/8 accurate (100%).** Target ≥90% cleared. Round-1 was 6/8 (75%); round-2 lift = +25 percentage points.
- **Miss pattern:** zero misses in either session. The unhedged-simplicity pattern that caused 100% of round-1's misses was absent from the round-2 queue — every row note was either gap-naming or drill-in-hedged. S8's prediction-discipline rule held across all 8 frames.
- **Round-1 re-pass outcome:** both round-1 misses (frames #5 and #6) flipped to accurate in round 2. S1 list-check prevented frame #5's "heroSplit + code-block media" miscall. S8's prediction-discipline rule (combined with S1) prevented frame #6's "cleanest R3 entry" miscall. The two mechanisms worked together — S1 surfaced the gaps, S8 forced the queue-row note to name them.

### Docs-edit stickiness verdict — FINAL (S1–S9)

Eight applicable scratchpad entries (S3 N/A — obviated by schema ship). All 8: **STUCK**. Per-entry verdict below.

- **S1** (Known-missing-schema patterns list) — **STUCK.** 8/8 frames checked against the list before block-type commitment. Primary load-bearing edit of round 2 — frame #5's 3-simultaneous-pattern-surface, frame #6's heroCenter match, frame #8's callout match all hinged on this list. **Keep as-is. Zero revisions.**
- **S2** (Drill in first) — **STUCK.** 7/8 frames ≥800px ran `get_metadata` before `get_design_context`. Highest-value applications: frame #3 navbar discovery, frame #4 split detection, frame #5 component-identity surfacing, frame #8 multi-region confirmation. **Keep as-is.** One observation worth a sentence-level doc nudge: when `get_metadata` returns a leaf for a large frame whose children are peer instances, try known child IDs or broaden the query (frame #8 behavior).
- **S3** (featureGrid doc fix) — **N/A.** Obviated by T2.3/T2.4 schema ship — `figma-mcp-template.md` now matches schema reality. No validation possible this round. **Can be retired from scratchpad watch list.**
- **S4** (Site chrome) — **STUCK.** 2/2 site-chrome encounters correctly excised (navbar in frame #3, footer in frame #8). Rule is well-scoped — didn't over-trigger on block-content-only frames. **Keep as-is.**
- **S5** (Adjacent-but-degraded + RichTextBlock gotchas) — **STUCK.** 6/6 degrade applications used documented paths with explicit gap-ID pointers. Zero freelance. Bonus: frame #8 *upgraded* a round-1 degrade call (heroSplit → richText) to the better-documented path — a docs-stickiness win. **Keep as-is.**
- **S6** (CTA placement pattern) — **STUCK.** Both explicit tests held (frame #2 card-level, frame #8 section-level). 6 N/A cases all correctly identified (no invention of CTAs to use T2.4). **Keep as-is.**
- **S7** (Candidate+fallback per round + DONE-WITH-CAVEATS line format) — **STUCK.** This queue file itself uses both conventions correctly across 8 rows. Round definitions have candidate+fallback+exit; frame rows use DONE-WITH-CAVEATS with gap-ID pointers. **Keep as-is.**
- **S8** (Prediction discipline) — **STUCK.** 8/8 row-note predictions accurate. Zero unhedged-simplicity claims. Round-2 lift = +25 percentage points vs round 1 (100% vs 75%). **Keep as-is — highest-ROI edit of round 2 after S1.**
- **S9** (Prediction-accuracy tracking subsection in handoff) — **STUCK.** This handoff has it, session-1 handoff had it, per-frame + running tally + miss pattern all populated. **Keep as-is.**

**Verdict:** all 8 applicable scratchpad entries STUCK across all 8 frames. **Zero revisions recommended. Zero rollbacks warranted.** The docs-tightening worked. The full accuracy lift (75% → 100%) plus zero new gaps plus zero regressions plus degrade-path upgrade on frame #8 means the round-2 hypothesis — _"tightening docs will move accuracy ≥90% and not introduce new misses"_ — is confirmed.

### Gaps to carry forward (delta from round 1 only)
- **No new schema gaps** across all 8 round-2 frames.
- **No new composite gaps** across all 8 round-2 frames.
- **No new token gaps** across all 8 round-2 frames.
- **No new pipeline gaps** across all 8 round-2 frames.
- **No new docs gaps** (beyond the minor `get_metadata`-on-peer-instance-parent nudge for S2).
- **Strengthened evidence (no scope change):**
  - Schema gap 1 (`block.callout` / T3.1): 2/2 uses this round (frames #1 + #8), matching round 1's 2/2. Minimum-field list narrowed to card-frame + icon/logo + tone/decorative-bg (CTA dimension now covered by T1.1).
  - Schema gap 6 (`block.tabbedFeatures` / T2.2): 4/4 cumulative (Phase 5 + R2 + R3 #5 round 1 + R3 #5 round 2).
  - Schema gap 8 (`block.heroCenter` / T2.1): 5/5 R3 hero-shaped frames across both rounds.
  - Pipeline gap 1 (composed-graphic export / T4.2): 2/2 R3 diagrams (frame #3 code-editor composition in round 1, frame #6 architecture diagram confirmed again in round 2). Round-2 hit an additional operational manifestation: the 63,580-char design_context response ceiling. Worth noting in docs that oversized responses are a secondary signal of composed-graphic frames, not just a tooling edge case.
- **Note on frame 4b's round-2 no-op:** re-applying the round-1 seed shape to v2 produced identical schema validation and identical render — confirming the T3.3 `block.comparison` gap is exactly as scoped from round 1. Clean regression, no hidden sub-gaps.
- **Note on frame #8's degrade upgrade:** this is the single behavioral change between rounds. Round-1 used `block.heroSplit` (degraded into callout role); round-2 uses `block.richText` (post-T1.1 documented callout-intent degrade). Both seeds carry identical conversion intent (heading + tagline + CTA). Round-2's choice better matches the S1 resolution row for "Contained-card callout". This is a **docs-stickiness win**, not a regression — and it's the kind of win that only becomes visible on a re-pass of the same frame.

### Unknown-unknowns for follow-up
- *(Session 2: none.)* Two minor observations (CTA Banner logo mark; parent-leaf metadata behavior on peer-instance frames) are logged in § Unknown-unknowns above — neither is a new gap; the first is a designer-review nudge, the second is a small figma-mcp-template.md sentence addition. Low priority.

### Friday token-swap follow-ups
- No new token gaps this session. Token gaps 1–6 from round 1 remain unchanged.
- **Expanded re-verify reminder post-Friday:** 8 applied blocks on `signalwire-homepage-v2` AND all 7 applied blocks on `signalwire-homepage` (round-1's page, retained for comparison). Hex swap should affect both pages identically.
- **Deltas to expect between v1 and v2 post-swap:**
  1. Frame #1 v2 has a CTA (v1 did not).
  2. Frame #2 v2 has 6× icons + 6× CTAs per item in seed (v1 did not).
  3. Frame #8 v2 is `block.richText` (v1 was `block.heroSplit`) — visual treatment will differ on this block only. Intentional round-2 degrade upgrade.
  4. All other blocks (#3, #4b, #5, #6, #7) should render byte-for-byte identically between v1 and v2 when hex is the only moving variable.
- Any visual delta post-swap NOT explained by the 3 deltas above signals a token-scoping bug.

### What to do next (post-Friday, post-round-2)
Round 2 validated the docs-tightening hypothesis cleanly. Unblocks the next phase:

1. **Ship Tier 2 schemas** (T2.1 `block.heroCenter`, T2.2 `block.tabbedFeatures`, with T3.4 `block.accordion` + T3.5 `block.codeSample` nested inside T2.2). These are the highest-leverage shipments; round 2 confirmed they won't surface surprise adjacent gaps (no unknown-unknowns across 8 frames).
2. **Ship Tier 3 schemas** (T3.1 `block.callout`, T3.2 `block.testimonials`, T3.6 `block.logoMarquee` to unblock frame #4a). Ordered by fix-leverage per gap-triage.
3. **Ship Tier 5 React renders** — T5.1 RichTextBlock body-alignment, T5.2 FeatureGridBlock icon + per-item CTA rendering. Without T5.2, all the T2.3/T2.4 seed data from frames #2 and #7 sits in Sanity but doesn't render.
4. **Retire S3 from scratchpad watch list** (already obviated by schema ship).
5. **Leave S1, S2, S4, S5, S6, S7, S8, S9 as-is.** All proven stuck across 8 frames. The docs-tightening PR is **DONE**.

**Round-2 dogfood is closed.** Primary deliverable met: 100% prediction accuracy vs round-1's 75%, zero new gaps, zero regressions, zero docs revisions needed. The Friday token swap can proceed on both `signalwire-homepage` and `signalwire-homepage-v2` pages independently; post-swap re-verify compares the two to isolate any token-scoping bugs.
