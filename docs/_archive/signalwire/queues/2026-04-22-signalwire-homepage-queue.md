# 2026-04-22 — SignalWire homepage → Figma-to-Sanity integration

This file doubles as both the **session plan** and the **build queue**. The next Claude session can pick up cold from this file alone — no prior-conversation context required.

---

## Why this session exists

This is the **dogfood run** for Phase 7 (the `packages/ui` primitive + composite + block buildout in `next-sanity-starter`). The entire Figma-to-Sanity pipeline has been wired end-to-end — connector, schema, primitives, composites, blocks, dev catalogs, const-enum typing pattern — but never exercised against a real production Figma file with the new UI in place. The `ai-voice-agents` seed (757:5430) was the only prior Figma MCP run, and it predates the UI buildout.

The **primary deliverable is not the rendered page.** It is:

1. A dogfooding pass on `alpha_v3/docs/figma-mcp-template.md` and `alpha_v3/docs/component-queue-template.md` — what broke, what guidance was missing, what needs editing.
2. A ranked **gap list** (schema / primitive / enum / token) with Figma-node evidence so each gap can be ticketed against the right Site Foundry package.
3. A staged `signalwire-homepage` in Sanity so the Friday token swap has real content to visually validate against (colors will shift; structure/enum/schema work from this session holds).

The rendered blocks are a byproduct — the dogfood is the product.

## Status flags (read before building)

- **🟡 Placeholder palette.** `packages/tokens/src/theme.css` currently ships a neutral dark-navy + teal placeholder. Real SignalWire tokens swap in on **Friday 2026-04-24** via a follow-up PR that edits only hex values. Do **not** spend time on color-matching now — flag color mismatches as "awaiting Friday swap" and move on. Structure, enum names, spacing, typography are all stable.
- **🟡 Visual review is structure-only.** Reviewers should verify layout / hierarchy / content faithfulness — not color fidelity — until post-Friday.
- **🟢 Const-enum pattern is house style.** Every primitive prop should use its enum form (`StackGap.MD`, not `'md'`). String-literal form still typechecks but is flagged in review.
- **🟢 The queue is the audit trail.** Update it as you go. Every gap encountered → a row in the gap sections below. If something is surprising, it belongs in the queue.

## Required reading (before you start building)

Open these in order — they define the flow, the rules, and the current state:

1. `alpha_v3/STATUS.md` — living snapshot (Phase 6 + 7), next-steps list, known quirks, env setup.
2. `alpha_v3/docs/figma-mcp-template.md` — primitive + composite reference, pre-write checklist, token mapping, post-build audit. **This is the rule book.**
3. `alpha_v3/docs/component-queue-template.md` — the workflow this queue file follows. Status values, per-frame audit, context budget, handoff rules.
4. `alpha_v3/docs/content-extraction-prompt.md` — seed JSON shape and field mapping. `SeedArtifact` is the stable contract — `project/site-foundry/packages/registry-contracts/src/index.ts`.
5. `alpha_v3/CONVENTIONS.md` — v2 → v3 field-name diff (authoritative when you see an old shape in a reference).

## Source — Figma

- **File:** [SignalWire Website — Internal](https://www.figma.com/design/ox8M7KAx62v6GmQPriJBmO/SignalWire-Website--Internal-?node-id=893-6813&m=dev)
- **fileKey:** `ox8M7KAx62v6GmQPriJBmO`
- **Page nodeId:** `893:6813` (name: `1440w dark`, 1440×7922px desktop composition)

MCP URL parsing reminder: in the URL, `node-id=893-6813` → nodeId is `893:6813` (convert `-` to `:`).

## Target — Sanity

- **Dataset:** `site-foundry-dev` (project `puqewi35`) — same as all prior alpha_v3 work.
- **Target page (new, don't reuse staging-homepage):** `signalwire-homepage`.
- **Bootstrap command** (run once at session start, before applying any seed):
  ```bash
  cd /home/brock/Design-to-code-chats/alpha_v3
  set -a && source /home/brock/Design-to-code-chats/project/site-foundry/.env && set +a
  pnpm bootstrap-page --id signalwire-homepage --title "SignalWire homepage"
  ```
- **Apply command** (per seed):
  ```bash
  pnpm apply seeds/signalwire/<file>.json --target signalwire-homepage --dry-run   # validate first
  pnpm apply seeds/signalwire/<file>.json --target signalwire-homepage              # real apply
  ```
- **Verify command** (after each apply):
  ```bash
  pnpm verify --target signalwire-homepage
  ```
- **Dev preview:**
  ```bash
  cd /home/brock/Design-to-code-chats/project/site-foundry/templates/next-sanity-starter
  pnpm -F @site-foundry-template/web dev
  # then visit http://localhost:3000/signalwire-homepage
  ```

**Env namespace quirk** (from STATUS.md): the apply script reads `PUBLIC_SANITY_*` vars directly from `process.env`; no auto-load. Always `source` the canonical `.env` file shown above before `pnpm apply`.

## Round structure

~2 working days before Friday's token swap (today is Wed 2026-04-22). Three rounds of increasing scope, each gated by explicit exit criteria.

### Round 1 — single small block
- **Goal:** validate the end-to-end flow (MCP → seed → apply → verify) against a live Figma node with the new UI in place. Prove the queue workflow + template guidance work on a block that's too small to hide any bugs.
- **Target:** frame #1 below (node `893:7165` — "Held Hostage by Vendor Roadmaps?" callout).
- **Candidate block:** `block.richText` with center alignment. If the `richText` content schema can't express a bordered centered callout with a CTA, file a gap for a new `block.callout` and document the exact field missing — don't freelance a workaround.
- **Exit when:** the callout renders on `signalwire-homepage` in dev preview; audit checklist passes; at least one gap or "nothing to add" note written into the gap sections below.
- **Time budget:** 1 hour. If round 1 exceeds 90 minutes, stop and investigate what's wrong with the docs.

### Round 2 — one section with items
- **Goal:** exercise `block.featureGrid` against real content (links, multi-line descriptions, possibly icons/badges) at realistic scale.
- **Target:** frame #2 below (node `893:7461` — "Dive into Documentation" card grid).
- **Candidate block:** `block.featureGrid`. `columns` is currently `2 | 3`; flag if the design wants 4.
- **Exit when:** grid renders with all items, links resolve correctly; audit passes; any column-count / item-shape gaps filed.
- **Time budget:** 2 hours.

### Round 3 — full page assembly
- **Goal:** assemble the full homepage. Expect 3–5 schema/primitive gaps to surface — file them, don't patch inline.
- **Targets:** frames #3–#8 below.
- **Exit when:** every frame row is `DONE` / `DONE-WITH-CAVEATS` / `BLOCKED`; the handoff summary at the bottom of this file is populated; gaps are ranked by blocker-ness.
- **Time budget:** 4 hours. If we blow past 4 hours, ship what's applied and log the rest per the stop criteria below.

## Session stop criteria

Stop the session (write handoff summary, end) when **any** of these hit:

- Round 1 surfaces >2 blocking schema gaps (pipeline + docs need work before the run can continue).
- Round 3 assembly exceeds 4 hours regardless of frame count completed.
- Four or more frames completed in this session (the queue template's context budget — preserves recoverability).
- Friday arrives — swap and re-verify take priority over new frames.

"Stop" means: mark in-flight row appropriately, populate the handoff summary at the bottom of this file, end the session. Do **not** silently keep working past the limits.

## Workflow per frame

Condensed from `docs/figma-mcp-template.md` and `docs/component-queue-template.md`. Full rules in those files — don't skip the pre-write checklist.

1. Flip the row's status `PENDING` → `IN PROGRESS`. One row at a time.
2. `get_design_context` on the desktop node. Check for mobile variant; `get_design_context` on that too.
3. `get_variable_defs` on the desktop node to capture Figma token names (useful for token mapping + Friday reconciliation).
4. **Detect static graphics** (dozens of positioned SVG fragments, nested absolute positioning, diagram/illustration layer names) → treat as `imageWithAlt` CMS fields, NOT code. See template core principle 3.
5. Identify the block type. If no existing schema fits, mark row `BLOCKED`, file a schema gap, move on.
6. Build the block using `@site-foundry-template/ui` primitives/composites. **Run the pre-write checklist for every `<div>`.** Use const-enum form for every prop.
7. Write the seed JSON per `docs/content-extraction-prompt.md` — save to the `seeds/signalwire/` path in the frames table.
8. `pnpm apply seeds/signalwire/<file>.json --target signalwire-homepage --dry-run`. Iterate until clean.
9. `pnpm apply ...` (real). `pnpm verify --target signalwire-homepage` to confirm presence.
10. Visual check in dev preview at `localhost:3000/signalwire-homepage`.
11. Run the **post-build audit** from `docs/component-queue-template.md` (9 checkboxes). Tick every one or explain why it's skipped.
12. Update the row status → `DONE` / `DONE-WITH-CAVEATS` / `BLOCKED`. Add any gaps to the sections below.

---

## Frames

Ordered by **build order** (Round 1 first), not page order. The `Page y` column shows where each frame sits in the rendered page (top-down). All rows start `PENDING`.

| # | Round | Status | Figma node | Page y | Size (desktop) | Section name | Candidate block | Seed file | Notes |
|---|---|---|---|---|---|---|---|---|---|
| 1 | R1 | DONE-WITH-CAVEATS | `893:7165` | 3427 | 1440×657 | "Held Hostage by Vendor Roadmaps?" callout | `block.richText` (degraded render) | `seeds/signalwire/held-hostage-callout.json` | Applied as best-effort `block.richText` with centered heading + left-aligned body in 44rem container. Lost: CTA ("Try SignalWire for Free"), floating warning-triangle icon badge, contained-card frame, decorative gradient overlay. See schema gap 1 (`block.callout`) + gap 2 (richText lacks `withCtas`) + composite gap 1 (card-framed section) + composite gap 2 (RichTextBlock body alignment). |
| 2 | R2 | DONE-WITH-CAVEATS | `893:7461` | 5845 | 1440×1156 | "Dive into Documentation" card grid | `block.featureGrid` | `seeds/signalwire/dive-into-documentation.json` | 6 items / 3 cols fits schema; heading + subheading + 6 titles + 6 descriptions applied. Lost: per-item icons (6×), per-item "Learn More →" CTAs (6×), tab filter (`Communications Platform` / `AI Voice Agents` / `SDKs & Libraries`), bordered-table grid treatment, decorative gradient overlay. See schema gaps 4–7, composite gaps 4–6, docs gaps 6–8. |
| 3 | R3 | DONE-WITH-CAVEATS | `893:36599` | 0 | 1440×1338 | "The communications control plane" hero | `block.heroSplit` (wrong layout, content preserved) | `seeds/signalwire/hero-communications-control-plane.json` | Seed applied as heroSplit w/ `mediaPlacement="right"` + heading/body/2 CTAs. Renders 2-col side-by-side with "Media placeholder" box — design is centered-text with code-editor media BELOW. Lost: centered layout, below-media placement, backdrop-blur/gradient container, code editor asset (no single hosted URL — DOM-composited fragments), floating navbar (site chrome). Confirmed queue prediction (`block.heroCenter` / `mediaPlacement="below"` gap). See schema gaps 8–9, composite gaps 7–8, docs gaps 9–10. |
| 4 | R3 | SPLIT | `893:6814` | 1338 | 1440×1109 | Logo row + "Production is a Costly Place" comparison | **split → 4a + 4b** | (see 4a, 4b) | `get_metadata` confirmed two child frames: `893:7069` marquee + `893:7139` comparison section. Queue prediction accurate. Split into rows 4a and 4b per queue row conventions. |
| 4a | R3 | BLOCKED | `893:7069` | 1338 | 1440×153 | "Trusted by forward-thinking companies" logo marquee | none — new `block.logoMarquee` needed | `seeds/signalwire/customer-logos.json` (not written) | **BLOCKED.** 6 composed-SVG logos (Phoenix Children's, Samsung, Audi, Replicant, McFarland Clinic, Filevine) with horizontal-scroll marquee treatment + label. No existing block carries logo arrays. `block.richText` with label-only would mislead editors (primary content IS the logos). Applying nothing preserves page truthfulness. See schema gap 11, pipeline gap 1 (composed-SVG logos). |
| 4b | R3 | DONE-WITH-CAVEATS | `893:7139` | 1491 | 1440×955 | "Production is a Costly Place..." Traditional vs SignalWire comparison | `block.featureGrid` 2-col (degraded render) | `seeds/signalwire/production-costly-comparison.json` | Applied as featureGrid 2-col with items = `{title, description}` (pro/con lists flattened into description prose). Lost: per-item bullet structure (5 items × 2 cards), per-item X/check icons (red X for pain, green check for benefit), SignalWire-card brand treatment (fuchsia border + blue drop-shadow glow + platform logo badge), heading sizes semantic H2 (49px in Figma). See schema gap 12 (`block.comparison`), composite gaps 10-11, token gap 5, docs gap 12. |
| 5 | R3 | DONE-WITH-CAVEATS | `893:7147` | 2447 | 1440×980 | "Everything You Need, Unified." | `block.richText` (degraded render, queue prediction wrong) | `seeds/signalwire/everything-you-need-unified.json` | **Queue prediction was WRONG** — this is not "heroSplit with code-block media." Actual layout: centered heading+subheading at top + 3-tab pill filter + 2-col below (5-item accordion on left, code-block-with-window-chrome-and-syntax-highlighting on right) + caption. Applied as richText with heading + subheading only. Lost: TabFilter (3 tabs, RECURRING 3/3 dogfood runs — now a hot-list item), 5-item accordion with open/closed state, code block with window chrome + line numbers + syntax highlighting, tab-controls-content interactive pattern, below-media/centered layout. See schema gap 6 (tabbedFeatures — RECURRING 3/3), gap 8 (heroCenter — 3/3 R3 frames), new schema gap 13 (accordion), new schema gap 14 (code sample), new composite gaps 12-13, token gap 6, docs gaps 14-15. |
| 6 | R3 | DONE-WITH-CAVEATS | `893:7173` | 4084 | 1440×1048 | "You Write the Logic. Voice AI Follows It." | `block.heroSplit` (wrong layout, media missing) | `seeds/signalwire/voice-ai-follows-logic.json` | **Queue prediction ("clean, no new schema expected") was WRONG.** Frame has (a) split-heading row (heading left + body right), (b) full-width architecture diagram BELOW — same `mediaPlacement=below` gap as frame #3 (gap now 2/2 R3 frames), (c) legend row with 3 color-dot indicators, (d) architecture diagram is composed of 50+ absolute-positioned SVG Vector fragments — Figma MCP returns no single composed-export URL. Lost: split-header, below-media layout, diagram media entirely, legend row. See schema gaps 8 (recurring) + 10 (new split-header), pipeline gap 1 (new), composite gap 9 (legend), docs gap 11 (queue prediction accuracy). |
| 7 | R3 | DONE-WITH-CAVEATS | `893:7450` | 5132 | 1440×713 | "Join the thousands of developers" testimonials | `block.featureGrid` 3-col (degraded render) | `seeds/signalwire/testimonials-thousands-of-devs.json` | Carousel of 3 testimonial cards (Default + Featured + Default, carousel dots below). Designer-registered `Testimonial Card/Default` (690:78) + `Testimonial Card/Featured` (690:85) components. Content is placeholder ("Lorem ipsum" / "John Doe" / "CEO of Company Co.") — awaiting real customer copy. Applied as featureGrid 3-col with title=quote, description=attribution. Lost: avatars (no `image` field on item), Featured-card variant (fuchsia border + blue glow), carousel dots pagination, quote-as-primary-content semantics (featureGrid treats title as heading, so quote renders as heading — visually wrong). See schema gap 15, composite gap 14, docs gap 16. |
| 8 | R3 | DONE-WITH-CAVEATS | `893:7487` (CTA banner only; `893:7489` footer excluded) | 7001 | 1440×921 | "Stack for What's Next" CTA banner + site footer | `block.heroSplit` (degraded; same as frames #3/#6) | `seeds/signalwire/whats-next-closer.json` | **Frame contains two distinct regions:** CTA Banner (`893:7487` — designer-registered component, description: _"Full-width closing CTA. Dark frosted card with logo mark, headline, and primary button."_) + Footer (`893:7489` — designer-registered component, description: _"Full site footer. Brand + social links + 5 navigation columns + legal bottom bar."_). Applied only the CTA Banner region as `block.heroSplit` with centered sectionHeading + description + 1 CTA. Footer excluded per schema gap 9 / docs gap 9 (site-chrome rule). Lost: frosted/bordered callout-card treatment (confirms gap 1 — `block.callout`, now 2/2 uses this session), starry-nebula backdrop image, centered below-CTA layout (gap 8, 4/4 R3 hero-shaped frames), footer entirely. See gaps 1 (strengthened), 8 (strengthened 4/4), 9 (strengthened — now includes footer), docs gap 17. |

**Row conventions:**
- Add rows if a single Figma frame becomes multiple blocks (see frame #4 note).
- Don't renumber on insertion — append a `.5` / `.75` / etc. suffix to keep audit history stable (`4a`, `4b` for frame #4's split).
- `BLOCKED` rows MUST have a matching entry in the "Schema gaps" or "Primitive / composite gaps" section below.

---

## Schema gaps surfaced this session

*(Fill as you go. Each row: what's missing, Figma evidence, current workaround, blocker or non-blocker.)*

### 1. `block.callout` — contained-card callout schema (BLOCKER for fidelity; NON-BLOCKER for pipeline)
- **Figma evidence:** node `893:7165` ("Held Hostage by Vendor Roadmaps?"). The design is a self-contained rounded card (856×~455, `bg-[rgba(24,26,40,0.4)]`, `rounded-[12px]`), centered on a dark page bg, with a floating warning-triangle icon badge hovering above the card, a heading (Instrument Sans SemiBold 64px), body paragraph, a decorative gradient overlay filling the card's background, and a single primary CTA ("Try SignalWire for Free", pink `#f72a72` solid).
- **Closest existing block:** `block.richText` — carries heading + body text via sectionHeading + `content`, but lacks CTA, icon slot, contained-card frame, and decorative-overlay media. `block.heroSplit` has media + ctas but wrong layout shape (split, not centered card).
- **Minimum fields needed:** `heading` (or reuse sectionHeading), `body` (rich text or string), `ctas[]` (reuse shared withCtas), `icon?` (imageWithAlt or registered icon ref), `framed?: boolean` (toggles the bordered card), optionally `decorativeMedia?` (imageWithAlt) for the overlay, optionally `tone: 'subtle' | 'accent' | 'inverse'` separate from section `backgroundTone`.
- **Workaround applied:** used `block.richText` with `sectionHeading.align: "center"`, `spacing: "roomy"`, body text in `content`. Dropped CTA, icon, card frame, decoration.
- **Severity:** non-blocker for **pipeline dogfood** (pipeline validated end-to-end); blocker for **visual fidelity** — callouts are a common marketing pattern and this design clearly wants the card treatment. **Now 2/2 uses this run** — frame #8's "Stack for What's Next" CTA Banner (designer-registered as `CTA Banner`, node `693:20`, description: _"Full-width closing CTA. Dark frosted card with logo mark, headline, and primary button."_) is structurally identical: contained card + centered heading + body + CTA + decorative background. Frame #1 used a warning/info-callout variant (icon above card, dark card on dark page); frame #8 uses a closer/CTA-banner variant (card on imagery background, no icon). Same underlying schema — just different decoration + optional `icon?` vs `backgroundMedia?` toggle. A single `block.callout` schema covers both. Three more R3 frames may hit similar gaps (#3/#5 "centered hero variants" particularly).
- **Target package:** `project/site-foundry/templates/next-sanity-starter/packages/sanity-schema/src/blocks/` (new file `callout.ts` + register in `blocks/index.ts`) + matching `packages/ui/src/blocks/CalloutBlock/CalloutBlock.tsx` + register in `BlockRenderer.tsx`.

### 2. `block.richText` lacks `withCtas: true` (LOW-EFFORT; MIGHT OBVIATE gap #1's CTA concern)
- **Figma evidence:** same frame `893:7165`. CTA "Try SignalWire for Free" is attached to a block the docs classify as `richText`.
- **Current schema:** `packages/sanity-schema/src/blocks/richText.ts:5` calls `defineBlockSchema` without `withCtas: true`. The shared fields machinery supports it (`defineBlockSchema.ts:46-55`). One-line change adds `ctas[]` with the existing max-2 validation to every richText block.
- **Workaround applied:** dropped CTA from seed.
- **Trade-off vs. gap #1:** flipping `withCtas: true` on richText is a 1-line change that unlocks ~60% of the callout use case (CTA renders below body). Still loses card frame, icon, decoration. Worth pairing with gap #1 — short-term mitigation while `block.callout` is designed.
- **Severity:** non-blocker; low-effort quick win.
- **Target package:** `packages/sanity-schema/src/blocks/richText.ts`.

### 4. `block.featureGrid` items lack `icon` field (RECURRING — Phase 5 AI Voice Agents already flagged)
- **Figma evidence:** node `893:7461`, all 6 items have distinct Lucide-style icons rendered at 24px in pink (`file-code-2`, `plug-2`, `memory-stick`, `code`, `binary`, `bot-message-square`). The **designer's own Figma component description** for `Detail Block` (node `690:100`) reads verbatim: _"Grid cell in the Documentation section. Icon + title + description + CTA."_ — the schema is underspec'd against the design intent, not just this instance.
- **Current schema:** `packages/sanity-schema/src/blocks/featureGrid.ts:19-31` — item shape is `{eyebrow, title, description}`. No icon field. (Phase 5 notes: `seeds/ai-voice-agents-mapping-notes.md` did not explicitly flag icons — but this run confirms the need.)
- **Minimum fields:** `icon?: imageWithAlt` OR `icon?: string` (lucide name keyed into a registry). Lucide-name route is cleaner if the design system standardizes on Lucide; imageWithAlt is more flexible but heavier to author.
- **Workaround applied:** dropped icons. Grid renders as title+description only.
- **Severity:** high. Affects item recognition. Recurring pattern.
- **Target package:** `packages/sanity-schema/src/blocks/featureGrid.ts` + `packages/ui/src/blocks/FeatureGridBlock/FeatureGridBlock.tsx` (add icon rendering slot).

### 5. `block.featureGrid` items lack per-item CTA / link
- **Figma evidence:** same frame, all 6 items have a "Learn More →" ghost link. Designer's own component description explicitly names the slot: "Icon + title + description + CTA."
- **Current schema:** no per-item `link` or `cta` field.
- **Minimum fields:** `cta?: cta` on each item (reuse existing cta type — keeps linkKind resolution and color/variant mapping consistent).
- **Workaround applied:** dropped "Learn More" links. Items render inert.
- **Severity:** high. Affects affordance — users can't navigate out of the tile.
- **Target package:** `packages/sanity-schema/src/blocks/featureGrid.ts` + `packages/ui/src/blocks/FeatureGridBlock/FeatureGridBlock.tsx`.

### 6. `sectionHeading` has no adjacent-controls slot (tab filter, filter chips, etc.)
- **Figma evidence:** heading row is horizontally split — heading+subheading on the left (576px), a `TabFilter` pill switcher on the right (3 tabs: "Communications Platform" / "AI Voice Agents" / "SDKs & Libraries"). Second confirmation after Phase 5 AI Voice Agents (6-tab selector above stat cards).
- **Current schema:** `sectionHeading` is a vertical stack (eyebrow / heading / subheading / align). No concept of adjacent controls or tabbed content.
- **Two plausible paths:**
  - **Option A — Dedicated block.** New `block.tabbedFeatures` (or `block.tabbedGrid`) with `groups[]` where each group has its own `items[]`. Matches designer's mental model (the tabs swap grid content). This is the Phase 5-flagged `block.statTabs` pattern generalized.
  - **Option B — Shared slot on sectionHeading.** `sectionHeading.action` field of type `tabFilter | link | cta` — a right-side slot carrying lightweight adjacent UI. Shallower than option A but doesn't solve the "tabs actually swap content" problem.
- **Workaround applied:** dropped tab filter. Only the "Communications Platform" tab's content was ever available from MCP anyway (inactive tabs' content isn't retrievable through this frame).
- **Severity:** high. **Now 3/3 dogfood runs** (Phase 5 AI Voice Agents, R2 Documentation, R3 frame #5). Promoted to Tier 1 hot-list item — this is the single most missing pattern in the schema.
- **Frame #5 addition:** the tab filter on `893:7147` (3 tabs: "Contact Center Flows" / "AI Voice Agents" / "Carrier Grade APIs") controls a 2-col panel below — an accordion (left) + code sample (right) — that swaps per tab. This clarifies the schema shape: `block.tabbedFeatures` should have `groups[]` where each group's body holds an arbitrary nested block selection (Accordion + CodeSample, FeatureGrid + nothing, etc.), not just swap-in feature-grid items. Effectively a small portable-text-inside-tab model. Schema authors: think `groups[]: { label, content: [AccordionBlock | CodeSampleBlock | FeatureGridBlock] }` rather than `groups[]: { label, items[] }`.
- **Target package:** `packages/sanity-schema/src/blocks/` (new `tabbedFeatures.ts`) OR `packages/sanity-schema/src/objects/sectionHeading.ts` (add action field).

### 8. `block.heroCenter` OR `heroSplit.mediaPlacement: "below"` + `textAlign: "center"`
- **Figma evidence:** node `893:36599`. Heading "The communications control plane" is centered on the page (64px, Instrument Sans SemiBold), body centered below, 2 CTAs centered below body, code editor mockup sits BELOW the text block (not beside it), spanning a wider width (1044px) than the text (924px). Queue predicted this gap — **confirmed.**
- **Current schema:** `heroSplit.mediaPlacement` enum is effectively binary. `HeroSplitBlock.tsx:20` — `const mediaFirst = props.mediaPlacement === 'left';` — only recognizes `'left'` as a special case; everything else renders media on the right. `HeroSplitBlock.tsx:24` — grid layout is hardcoded `lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]` (2-col side-by-side, no single-column-stacked code path).
- **Two plausible paths:**
  - **Option A — Expand heroSplit.** Add `"below"` to `mediaPlacement`, add `textAlign?: "left" | "center"` prop, rewrite `HeroSplitBlock` to switch layouts based on both.
  - **Option B — New block.** `block.heroCenter` with inherent center-alignment + below-media layout. Cleaner semantic boundary; parallel with `block.heroSplit` naming.
- **Workaround applied:** degraded heroSplit with `mediaPlacement: "right"`. Wrong layout but content preserved (heading, body, 2 CTAs). Media slot shows "Media placeholder" box.
- **Severity:** high. **Now 3/3 R3 frames** (frame #3 hero, frame #5 "Everything You Need, Unified.", frame #6 architecture diagram — all have centered heading + below-positioned media/content). Frame #5 further confirms: centered heading anchors a below-layout section, regardless of whether media is a single image or an interactive panel. heroCenter would be the right atom to build once, reuse everywhere.
- **Target package:** `packages/sanity-schema/src/blocks/heroSplit.ts` + `packages/ui/src/blocks/HeroSplitBlock/HeroSplitBlock.tsx` (option A) OR new `packages/sanity-schema/src/blocks/heroCenter.ts` + `packages/ui/src/blocks/HeroCenterBlock/HeroCenterBlock.tsx` (option B).
- **Session update after frame #8:** 4/5 R3 frames where a hero-shaped layout is the candidate block (frames #3, #5, #6, #8 — hero/closer) have centered headings with content below. Frame #4b is the lone exception (left-aligned 2-col comparison). The pattern is the dominant hero-shape in this Figma file — strong evidence for Option B (first-class `block.heroCenter`).

### 9. Site chrome (navbar, footer) has no home in the pipeline
- **Figma evidence:** frame `893:36599` includes a floating pill-shaped navbar at `top-[69px]`, designer-tagged as _"Main nav. Pill-shaped floating bar with logo, links, and CTA."_ Contains left nav links (Product / Contact Centers / Solutions / Resources), logo, right nav links + 2 small CTAs (Login, Sign up). The frame mockup includes site chrome; the pipeline has no place to put it. **Frame #8 confirms the footer side of this gap:** `893:7489` is the full site footer — brand logo + tagline, 5 social-link icons, 5 navigation columns (Platform / Solutions / Learn / About / Developers — 18 total links), divider, copyright + 3 legal links. Designer-registered as `Footer` (node `693:59`), description: _"Full site footer. Brand + social links + 5 navigation columns + legal bottom bar."_ Same architectural bucket as navbar — site-global, not block-level.
- **Current state:** starter's `apps/web/app/layout.tsx` does not render a navbar (rendered HTML shows only `<main>` → block section). There's no `<Navbar>` composite in `packages/ui`. Navbar content isn't in any Sanity schema.
- **Architectural decision needed (not a schema defect — a scope decision):**
  - Navbar belongs in `apps/web/app/layout.tsx` driven by the `settings` singleton schema (site-global, edited once).
  - OR a `navigation` document type (editorially-owned navigation tree).
  - OR a pageBuilder `block.navbar` (per-page overrides — unlikely desired pattern).
- **Workaround applied:** excluded navbar from the hero-block seed (frame #3), excluded footer from the closer-block seed (frame #8). Both correct calls — site-level, not block-level.
- **Severity:** high. 2/2 session frames with site chrome drop the chrome. Needs product-level decision before Figma frames with navbars/footers can be fully rendered. The starter has `settings.ts` singleton already — it's the natural home. Shape-wise: `settings.navigation: { primary: navItem[], footer: { columns: { label, links: navItem[] }[], socials: navItem[], legal: navItem[] } }`. `navItem` = `{ label, link: cta.link, children?: navItem[] }`.
- **Target package:** `packages/sanity-schema/src/singletons/settings.ts` (extend with `navigation`) + `packages/ui/src/components/` (new `Navbar/` + `Footer/`) + `apps/web/app/layout.tsx` (read + render).

### 10. Split-heading row layout (heading + description side-by-side at top of block)
- **Figma evidence:** frame #6 `893:7173` header is 1092px wide containing heading (460px left) + description (flex-1 right) — both at the SAME vertical level. Frame #2 (`893:7461`) had a similar pattern with heading-left + tab-filter-right. Two distinct patterns use horizontal header layouts; neither is expressible via the current stacked sectionHeading.
- **Current schema:** `sectionHeading` is a vertical stack (eyebrow / heading / subheading / align). No concept of split-left-right header.
- **Minimum fields:** sectionHeading could gain a `layout: "stacked" | "split"` enum. Or: every block that needs this could accept a `headingLayout` preset on the block itself.
- **Workaround applied:** used `align: "left"` vertical stack. Heading and description render as vertical block, not side-by-side.
- **Severity:** medium. Recurring (2 confirmed occurrences).
- **Target package:** `packages/sanity-schema/src/objects/sectionHeading.ts` + `packages/ui/src/components/HeadingGroup.tsx`.

### 7. `block.featureGrid` has no "grid treatment" variant (cards vs. bordered-table)
- **Figma evidence:** grid renders as a **bordered table** — pink outer border (`brand/fuchsia #f72a72`), grey internal dividers (`background/raised #222436`), 32px cell padding, seamless cells. FeatureGridBlock renders each item as a separate `<Card>` primitive with gap-sm — spatially distinct cards, not a bordered table.
- **Current behavior:** two visually different idioms conflated under one block type.
- **Minimum fields:** `variant?: 'cards' | 'table' | 'bordered'` (presentation-level) on featureGrid.
- **Workaround applied:** accepted Card rendering.
- **Severity:** medium. Content is faithful; visual idiom differs.
- **Target package:** `packages/sanity-schema/src/blocks/featureGrid.ts` + `packages/ui/src/blocks/FeatureGridBlock/FeatureGridBlock.tsx`.

### 11. `block.logoMarquee` — customer-logo row / scrolling trust marker (BLOCKER for 4a)
- **Figma evidence:** node `893:7069` ("Marquee Background"). A horizontal row at the very top of the "Production is a Costly Place" section: left-side label "Trusted by forward-thinking companies" (Lexend Regular 16px, white/50% opacity) + right-side row of 6 monochrome customer logos (Phoenix Children's, Samsung, Audi, Replicant, McFarland Clinic, Filevine) + gradient-overlay mask (fade-at-edges treatment typical of auto-scrolling marquees). 1440×153 full-width section on `bg-[var(--background/surface,#181a28)]`.
- **Closest existing block:** none. `block.featureGrid` doesn't carry logos (title+description only; max 3 cols vs. required 6). `block.richText` carries only the label, dropping all 6 logos (primary content).
- **Minimum fields needed:** `label?: string`, `items[]: { logo: imageWithAlt, href?: string, name?: string }` (min 3 / max ~12), `variant?: 'static' | 'scrolling'` (for the marquee-animation treatment), `fadeEdges?: boolean` (gradient mask).
- **Workaround applied:** row 4a marked `BLOCKED`. Seed not written. Logo imagery is the primary content of the block — applying a label-only stub would mislead editors about what's really there.
- **Severity:** high. Logo-trust strips are a standard SaaS-homepage pattern; the schema is blind to this entire idiom. Very likely to recur across marketing sites.
- **Target package:** `project/site-foundry/templates/next-sanity-starter/packages/sanity-schema/src/blocks/` (new `logoMarquee.ts` + register in `blocks/index.ts`) + matching `packages/ui/src/blocks/LogoMarqueeBlock/LogoMarqueeBlock.tsx` + register in `BlockRenderer.tsx`. Also needs a `<LogoMarquee>` composite (see composite gap 10) that handles the scrolling + edge-fade treatment.

### 13. `block.accordion` (or `accordion` field on a new `block.tabbedFeatures`) — collapsible list with open/closed state + description panel
- **Figma evidence:** frame `893:7147` has a 5-item accordion on the left side: `01 Advanced IVR` (open, with visible description "Get the DTMF out of here. Build AI powered interactive voice response systems with dynamic routing and intelligent call handling.") + 4 collapsed items (`02 AI Call Routing`, `03 Call Queuing`, `04 Conferencing`, `05 Live Transcription`). Each item has: pink number prefix for the open item, grey number prefix for closed items, chevron toggle icon (up when open / down when closed). Designer-registered components (`701:6779` / `701:6780`) with descriptions: _"Use-case list item — expanded/active state. Pink accent."_ / _"Use-case list item — collapsed state."_
- **Closest existing block:** none. `featureGrid` items lack open/closed state + description is always shown; `richText` has no list. `heroSplit` has no list.
- **Minimum fields needed:** `items[]: { label: string, description: string, number?: string }` + presentational `defaultOpen?: number`. Alternatively: the accordion is a *sub-field* of a `block.tabbedFeatures` (since it only exists inside a tab). See schema gap 6 — this is likely a child of tabbedFeatures, not a top-level block.
- **Workaround applied:** degraded to `block.richText` with heading + body only.
- **Severity:** medium-high. Likely a child of `tabbedFeatures` — the tabs swap between different accordion+code pairings. Not a standalone frequent pattern, but the accordion affordance (collapsible list with active-item detail) is common enough to be worth a standalone primitive even outside tabbedFeatures.
- **Target package:** `packages/sanity-schema/src/` — nested object `objects/accordion.ts` (reusable inside blocks). + `packages/ui/src/components/Accordion/` composite.

### 15. `block.testimonials` — quote + author + optional featured variant + optional carousel
- **Figma evidence:** frame `893:7450`. Three cards in a carousel (dots indicator below — currently dot 2 of 3 active). Default card variant = dark surface + subtle border. Featured card variant = fuchsia border + blue glow + larger quote text (25px vs 16px) + slightly wider (456px vs 394px). Each card carries: a quote (string), an avatar (52px circular image), a name (string), a role (string). Designer-registered components `Testimonial Card/Default` (690:78) and `Testimonial Card/Featured` (690:85) — explicit two-variant pattern.
- **Closest existing block:** `block.featureGrid` 3-col. Item shape is `{eyebrow, title, description}`. Can carry quote-in-title + attribution-in-description but loses avatar (no image field), Featured variant (no per-item emphasis), and semantically conflates heading with quote.
- **Minimum fields needed:** `items[]: { quote: text, author: { name: string, role?: string, avatar?: imageWithAlt }, variant?: 'default' | 'featured' }`. Optional presentational `layout?: 'grid' | 'carousel'` for the 3-at-a-time-with-dots pattern vs. a static grid.
- **Workaround applied:** degraded to `block.featureGrid` 3-col with title=quote and description="Name — Role" joined. Visually suboptimal (quote renders as heading).
- **Severity:** high. Testimonial sections are a marketing-page staple; first dogfood encounter, but expectable across every product page in a SignalWire-scale marketing site.
- **Target package:** `packages/sanity-schema/src/blocks/testimonials.ts` (new) + `packages/ui/src/blocks/TestimonialsBlock/TestimonialsBlock.tsx` (new). Pair with composite gap 14.

### 14. Embedded code sample — `codeSample` object field or `block.codeSample` block
- **Figma evidence:** frame `893:7147` right column is a rendered code editor mockup: window chrome with 3 traffic-light circles + filename label (`advanced-ivr.js`), line numbers, syntax-highlighted JavaScript. Designer-registered component `Code Block` (node `690:33`) with description: _"Syntax-highlighted code window. Window chrome + line numbers."_ The Figma file includes a `syntax/*` token family (`syntax/comment #898995`, `syntax/value #d4d4d8`, `syntax/property #ffffff`, `syntax/string #40e0d0`, `syntax/keyword #6e9eff`, `syntax/operator #ffd700`). This is a first-class, token-backed component in the design system.
- **Closest existing block:** none. Not `block.richText` (plain prose), not `block.heroSplit` (media is `imageWithAlt` — wrong type). Frame #3 hero had a similar code-editor mockup that also fell through.
- **Minimum fields needed:** `code: text` (raw source), `language: string` (for syntax highlighting), `filename?: string` (window-chrome label), `showLineNumbers?: boolean`, `caption?: string`. As a block: title + optional caption + the above. As an object: nest inside `tabbedFeatures.groups[].media` or a new `block.heroSplit.media.codeSample` variant.
- **Workaround applied:** dropped entirely. richText can't carry code samples.
- **Severity:** high. Developer-tool marketing pages are built around code samples. Frame #3 (hero) and #5 (tabbedFeatures accordion right panel) both carry code samples — 2/2 R3 frames with code samples have dropped them.
- **Target package:** `packages/sanity-schema/src/` — either `objects/codeSample.ts` (reusable nested field) + `packages/ui/src/components/CodeBlock/` composite; OR full `blocks/codeSample.ts` for standalone code-sample blocks.

### 12. `block.comparison` — two-side comparison card layout with pro/con lists
- **Figma evidence:** node `893:7139` children `893:7145` ("Comparison Card/Traditional") + `893:7146` ("Comparison Card/SignalWire"). Designer's own component descriptions (pulled verbatim from Figma via `get_design_context`): _"Left card — traditional CPaaS pain points. Red X icons."_ / _"Right card — SignalWire benefits. Green check icons."_ The design is a first-class, reusable component — not a one-off. Each card has a header (text or logo+text) + a vertical list of items, each item = icon + short string. The "SignalWire" card has emphasis treatment: 1.1px fuchsia border (`#f72a72`), blue drop-shadow glow (`rgba(4,78,244,0.4)` 222px blur), platform logo in the header.
- **Closest existing block:** `block.featureGrid` 2-col carries the two items' titles + descriptions but can't express (a) per-item list structure — each card has 5 sub-items, not one blob, (b) per-item indicator icons (X vs check), (c) one-side-highlighted treatment. Total info loss: 4 of the 5 design affordances.
- **Minimum fields needed:** `sides[]: { header: string, logo?: imageWithAlt, items: [{ label: string, kind: 'pro' | 'con' | 'neutral' }], emphasis?: 'none' | 'primary' }` (2-side minimum; design uses exactly 2). Alt shape: `{ left: {...}, right: {...} }` pair — less flexible but more semantic.
- **Workaround applied:** degraded to `block.featureGrid` 2-col with items = `{title, description}`, flattened pro/con list into description prose separated by `. `. No icons. No emphasis. No logos.
- **Severity:** high. Comparison cards are a marketing-page staple (us-vs-competitor, old-way-vs-new-way, tier-vs-tier). Designer's explicit component descriptions confirm this is a deliberate, reusable pattern — not a bespoke one-off.
- **Target package:** `packages/sanity-schema/src/blocks/` (new `comparison.ts`) + `packages/ui/src/blocks/ComparisonBlock/ComparisonBlock.tsx`.

### 3. `sectionHeading` cannot size up to H1 (MINOR)
- **Figma evidence:** heading "Held Hostage by Vendor Roadmaps?" renders at 64px (H1 scale). `sectionHeading` + default `HeadingGroup` renders the heading as `<h2>` with `text-h2` and `font-normal`. No way to override size or weight from the seed.
- **Current behavior:** every block's primary heading is visually H2, regardless of page-level importance.
- **Workaround applied:** accepted H2. The queue says not to color-match; I'm treating size-match the same.
- **Severity:** cosmetic; affects visual audit, not content fidelity.
- **Target package:** `packages/sanity-schema/src/objects/sectionHeading.ts` (add `size?: 'h1' | 'h2' | 'h3'`, default `h2`) + `packages/ui/src/components/HeadingGroup.tsx` (read the prop).

## Primitive / composite gaps surfaced this session

*(Same idea, but for `packages/ui`. Example candidates already flagged in docs: `<Stack direction="row">`, primitives that came up often enough to warrant a new atom.)*

### 1. No contained-card `<Section>` variant / `<CalloutFrame>` composite
- **Figma evidence:** `893:7165` card is a width-capped (856px), rounded (12px), tinted inner frame on a full-width dark page section. Every current `Section` `backgroundTone` (`none`/`subtle`/`accent`/`inverse`) fills edge-to-edge; none produces a centered bordered card.
- **Workaround applied:** none — richText has no shell to contain. Dropped on the floor.
- **Options:** (a) add a `framed` boolean to `<Section>` that wraps the inner Container in a Card-like shell, (b) add a `<CalloutFrame>` composite that sits between `<Section>` and its children, (c) extend `<Card>` to work as a section-level container (it's currently a feature-tile primitive).
- **Target package:** `packages/ui/src/components/Section.tsx` or new `packages/ui/src/components/CalloutFrame.tsx`.

### 2. `RichTextBlock` body is hardcoded left-aligned regardless of `sectionHeading.align`
- **Evidence:** `packages/ui/src/blocks/RichTextBlock/RichTextBlock.tsx:8` — `<div className="max-w-[44rem] space-y-4 text-[var(--color-secondary)] leading-[1.7]">` has no text-align. The design is centered; the heading group centers via `HeadingGroup`, but the body paragraph below it stays left-aligned, creating an asymmetric visual.
- **Rendered DOM confirmed:** `text-center items-center` on the heading group wrapper; body wrapper has no alignment class.
- **Options:** (a) read `sectionHeading.align` down into RichTextBlock body, (b) add a `bodyAlign` prop to `block.richText` schema, (c) add a `textAlign` prop to `RichTextBlock`.
- **Target package:** `packages/ui/src/blocks/RichTextBlock/RichTextBlock.tsx` + possibly `packages/sanity-schema/src/blocks/richText.ts`.

### 4. No `<TabFilter>` / pill-switcher primitive
- **Evidence:** `893:7461` header has a `TabFilter` component (Figma node `693:8`, designer-tagged as _"Pill-based tab switcher. Used in the Documentation section."_). AI Voice Agents (Phase 5) also had a 6-tab switcher. Two independent occurrences in the same codebase's Figma file.
- **Workaround applied:** dropped. No render path exists.
- **Target package:** `packages/ui/src/primitives/` (new `TabFilter/` with `TabFilterProps`, const-enum per the pattern).

### 5. No `<IconTile>` composite (icon + title + description + optional CTA)
- **Evidence:** 6 cells in `893:7461`, plus the `Detail Block` Figma component description explicitly names this shape. Likely the fastest composite to land alongside schema gap 4 — keeps FeatureGridBlock's rendering path simple by using a single dedicated tile composite.
- **Target package:** `packages/ui/src/components/` (new `IconTile/`).

### 7. `HeroSplitBlock` is hardcoded 2-column — no centered single-column layout path
- **Evidence:** `packages/ui/src/blocks/HeroSplitBlock/HeroSplitBlock.tsx:24` — grid class `grid gap-8 items-center lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]`. Even with no media, renders 2 columns with placeholder in right column. No prop to switch to single-column / media-below.
- **Workaround applied:** accepted 2-col wrong layout.
- **Target package:** `packages/ui/src/blocks/HeroSplitBlock/HeroSplitBlock.tsx` (tied to schema gap 8).

### 9. No `<Legend>` composite (color-dot indicator row)
- **Evidence:** frame `893:7173` has a legend row under the diagram: 3 glowing-dot + label pairs (Control Plane blue `#044ef4`, Media Engine turquoise `#40e0d0`, Voice AI Kernel pink `#f72a72`) rendered in `JetBrains Mono`. A standard data-viz affordance.
- **Workaround applied:** dropped entirely (not expressible in heroSplit; tied to the diagram which is also dropped).
- **Target package:** `packages/ui/src/components/` (new `Legend/`) — only if legends become common. Currently 1/4 frames. Low priority but flag.

### 8. No `<Navbar>` composite or site-chrome primitive
- **Evidence:** tied to schema gap 9 (site chrome architecture). No Navbar component in `packages/ui/src/components/`.
- **Workaround applied:** excluded from seed (site-level concern, not block-level).
- **Target package:** `packages/ui/src/components/Navbar/` (new, once architectural decision lands).

### 6. No "ghost link with arrow" CtaButton affordance
- **Evidence:** 6 "Learn More →" links in `893:7461` (Figma component `Prop=Ghost`, node `689:14`, designer-tagged as _"Ghost/link button. Used in Detail Blocks as 'Learn More'."_). The existing `CtaButton variant=transparent` is close but has no arrow; the design's arrow is structural to the affordance.
- **Options:** (a) add `withArrow?: boolean` to `CtaButton`, (b) new `<LearnMoreLink>` composite, (c) add an `icon?: 'arrow-right'` prop to `Button`.
- **Target package:** `packages/ui/src/primitives/Button/` or `packages/ui/src/components/`.

### 10. No `<LogoMarquee>` composite
- **Evidence:** frame `893:7069` (schema gap 11). Needs a composite that renders a row of logos + optional label + optional auto-scroll + optional edge-fade gradient mask.
- **Workaround applied:** none — whole frame blocked.
- **Target package:** `packages/ui/src/components/LogoMarquee/` (new). Paired with schema gap 11 (`block.logoMarquee`).

### 12. No `<Accordion>` / `<AccordionItem>` primitive
- **Evidence:** frame `893:7147` 5-item accordion. Designer-registered components (nodes `701:6779` open / `701:6780` closed) with descriptions: _"Use-case list item — expanded/active state. Pink accent."_ / _"Use-case list item — collapsed state."_ First occurrence but high-likelihood of recurrence on product/pricing/feature pages.
- **Workaround applied:** none — dropped entirely.
- **Target package:** `packages/ui/src/components/Accordion/` (new). Paired with schema gap 13. Open/closed state likely client-side (`'use client'`) since interactive — set expectation in the composite.

### 14. No `<TestimonialCard>` composite (+ maybe `<Avatar>` primitive + `<Carousel>` with dot indicators)
- **Evidence:** frame `893:7450`. Designer-registered two-variant card. Carousel (3 cards visible at once + dots at bottom showing 3-page scroll state) is a presentation-level concern: the grid layout shows 3 at a time here, but conceptually N testimonials rotate through.
- **Workaround applied:** none — degraded to generic `<Card>` via FeatureGridBlock.
- **Target package:** `packages/ui/src/components/TestimonialCard/` (new, const-enum `TestimonialVariant.DEFAULT | FEATURED`). Also check if `<Avatar>` primitive exists; if not, add `packages/ui/src/primitives/Avatar/`. Carousel primitive (`<Carousel>` with dot pagination) is optional — only needed if testimonials block uses `layout: 'carousel'`.

### 13. No `<CodeBlock>` composite (window chrome + line numbers + syntax highlighting)
- **Evidence:** frame `893:7147` right panel is a `Code Block` designer-registered component (node `690:33`): _"Syntax-highlighted code window. Window chrome + line numbers."_ Chrome = 3 traffic-light circles (red/yellow/green) + filename label. Line numbers in gutter (`syntax/comment` grey). Code body with per-span syntax tokens (`syntax/keyword`, `syntax/string`, `syntax/property`, `syntax/operator`, `syntax/value`). JetBrains Mono font. Frame #3 (hero) had a similar code-editor mockup — 2/2 R3 frames with code samples. First-class design-system component with dedicated token family.
- **Workaround applied:** dropped entirely.
- **Options:** (a) static — author passes pre-highlighted markup or raw text + language; composite uses a syntax-highlighter lib (e.g. shiki) at build time. (b) MD fenced-code-block round-trip through Sanity's `blockContent` — but then line-number gutter + window chrome need wrapping via a serializer.
- **Target package:** `packages/ui/src/components/CodeBlock/` (new). Paired with schema gap 14.

### 11. No `<ComparisonCard>` composite + `<BulletIndicator>` primitive
- **Evidence:** frame `893:7139` children. `ComparisonCard` = header (text or logo+text) + vertical list of `{indicator, label}` rows. `BulletIndicator` = 20px circle with `lucide/check` (green) or `lucide/x` (pink). Designer's explicit component set (nodes `689:54` / `689:70`) — reusable by design. Two plausible API shapes: (a) `<ComparisonCard header items emphasis?>` composite wraps a `<Card>`, (b) `<ComparisonGrid sides>` block-level composite renders both cards in a grid.
- **Workaround applied:** none — degraded to `FeatureGridBlock`'s `<Card>` which can't carry icon+label rows or emphasis variant.
- **Target package:** `packages/ui/src/components/ComparisonCard/` (new) + `packages/ui/src/primitives/BulletIndicator/` (new, const-enum `BulletKind.PRO | CON | NEUTRAL`). Paired with schema gap 12.

### 3. No floating-badge primitive (for the icon-above-card pattern)
- **Evidence:** `893:36712` — a circular bordered badge (`1.588px white/10 border`, `52px` inner icon) positioned absolutely above the callout card. Common SaaS marketing motif (warning / info / tip callouts).
- **Workaround applied:** none — dropped from the render entirely.
- **Severity:** low until `block.callout` exists. File as a composite concern to solve alongside callout.
- **Target package:** `packages/ui/src/components/` (new, e.g. `<IconBadge>`).

## Pipeline gaps surfaced this session

*(New section — the pipeline itself has limits that aren't schema or primitive gaps. Document so future sessions don't rediscover.)*

### 1. Figma MCP doesn't export composed-from-fragments graphics as single URLs
- **Evidence:** frames `893:7173` (architecture diagram) and `893:36599` (code editor mockup). Both are Core Principle 3 "static graphics" per `docs/figma-mcp-template.md`. But Figma MCP's `get_design_context` returns the graphics decomposed into 50+ individual SVG Vector URLs and text spans, not a single unified image asset URL. `get_screenshot` returns a base64 image, not a hosted URL the seeder can fetch.
- **Impact:** `imageWithAlt` fields cannot be populated for composed graphics via the automated pipeline. Requires manual export from Figma or a new MCP capability.
- **Severity:** medium. Core Principle 3 is a cornerstone rule but the MCP pipeline doesn't support it end-to-end for composed diagrams. Two R3 frames were blocked on this.
- **Paths forward:**
  - (a) Workflow doc: "For composed graphics, manually export from Figma as PNG and upload via separate flow" (likely direct Sanity Studio upload).
  - (b) Infrastructure: add a helper that uses `get_screenshot` to get base64 → writes temp file → uploads through existing imageUpload. Would need minor seeder change to accept `data:` or local-path URLs.
  - (c) Wait for Figma MCP to ship a "flatten-to-image" mode for composed nodes.

## Token gaps / mismatches surfaced this session

*(Remember: hex values swap Friday. Flag **structural** token gaps — a semantic role that doesn't exist, not a hex that doesn't match. Example: "Figma uses a 5th brand color (lime) with no matching `--color-brand-*` variable.")*

### 1. Fonts: Instrument Sans (heading) + Lexend (body) — confirm Friday-swap scope
- **Figma evidence:** `get_variable_defs` on `893:7165` returned typography tokens `Heading/H1: Instrument Sans SemiBold 64/77`, `Heading/H6: Instrument Sans Medium 20/24`, `Body/Body: Lexend Regular 16/27`. These two font families are specific to SignalWire.
- **Current state:** placeholder theme — unverified whether these fonts are loaded in `packages/tokens` / `apps/web` today.
- **Question for Friday:** is the token-swap PR hex-only (as STATUS.md claims), or does it also include font loading? Resolve before Friday so visual verification can distinguish "font not loaded yet" from "wrong font-family token name."
- **Severity:** structural question, not a gap yet. Flag so the Friday PR scope is explicit.

### 2. Callout-frame tone — no semantic role for "card tint on dark page"
- **Figma evidence:** card uses `rgba(24,26,40,0.4)` — a subtle lift above the page `#0e0e18`. Distinct from `--color-surface-raised` (which is a full-section tone, not a contained card).
- **Current state:** no token covers "subtle tinted contained card". Tied to composite gap #1.
- **Severity:** wait until gap #1 lands — token need follows from primitive decision. Flag now so the Friday-swap discussion doesn't force premature hex.

### 4. `background/raised: #222436` used as component tint, not only section tone
- **Figma evidence:** R2 uses this value as (a) the tab filter active bg, (b) the grid internal divider / outer-border-except-brand color.
- **Current state:** `--color-surface-raised` exists as a section-level tone. Same CSS variable being used at the primitive level is fine, but once the swap lands, consider whether `--color-border-subtle` and `--color-surface-chip` deserve their own semantic roles (distinct from section tone).
- **Severity:** non-blocker. Heads-up for Friday's discussion.

### 6. `syntax/*` token family — dedicated design-system tokens for code highlighting
- **Figma evidence:** `get_variable_defs` on `893:7147` returned a full `syntax/*` family: `syntax/comment: #898995`, `syntax/value: #d4d4d8`, `syntax/property: #ffffff`, `syntax/string: #40e0d0`, `syntax/keyword: #6e9eff`, `syntax/operator: #ffd700`. SignalWire's design system treats code-sample syntax as a first-class token domain, not a dev-only concern.
- **Current state:** unknown whether `packages/tokens/src/theme.css` has `--color-syntax-*` variables. Likely absent (starter theme is a generic SaaS palette; SignalWire-specific token categories like `syntax/*` would only land as part of the Friday token PR).
- **Paths forward:** (a) add full `--color-syntax-*` family in Friday token swap; (b) if `<CodeBlock>` composite uses a syntax highlighter like shiki, wire its theme to CSS variables so switching `--color-syntax-*` at runtime re-themes all code samples.
- **Severity:** medium. Unblocks visual fidelity for developer-marketing content, which is a core SignalWire use case.

### 5. Callout tones `callout/danger/border: #f72a72` + `callout/success/border: #40e0d0` — structural roles, not just hexes
- **Figma evidence:** `get_variable_defs` on `893:6814` returned `callout/danger/border: #f72a72` (red X pain-points) and `callout/success/border: #40e0d0` (green check benefits). Same fuchsia hex as `brand/fuchsia` but a semantically distinct role (danger-indicator, not brand-accent). SignalWire card's emphasis border also uses `#f72a72` — that is brand-fuchsia, not danger.
- **Current state:** unknown whether `--color-callout-danger-*` / `--color-callout-success-*` semantic roles exist in `packages/tokens/src/theme.css`. If only generic semantic roles exist (`--color-state-error`, `--color-state-success`), mapping is likely fine post-Friday. Flag now so the Friday swap designer explicitly considers "callout" as a semantic category.
- **Severity:** low-medium. Structural question: is "callout" a first-class semantic category, or is "danger/success" enough? Design system design decision.
- **Paths forward:** (a) map both Figma tokens to `--color-state-error` / `--color-state-success`, (b) introduce `--color-callout-*` family for callouts specifically.

### 3. Pink CTA color `#f72a72` (`badge/brand/fg`)
- **Figma evidence:** CTA bg color. Labeled `badge/brand/fg` in Figma variables.
- **Current mapping guess:** likely maps to `--color-brand-fuchsia` post-Friday (the docs map `ButtonColor.SECONDARY` to fuchsia). Flag as "awaiting Friday swap" — no action this session.
- **Severity:** none. Noise for completeness.

## Docs issues surfaced this session

*(`docs/figma-mcp-template.md` and `docs/component-queue-template.md` were just written and never dogfooded. When you find a gap in the guidance — missing rule, wrong primitive prop, stale path — record it here. This is the most important section.)*

### 1. `figma-mcp-template.md` § "Identify the block type" is too binary
- **File:** `alpha_v3/docs/figma-mcp-template.md`, § "Building a block from Figma" step 2.
- **Current text:** four buckets (heroSplit / featureGrid / richText / "anything else → flag, stop").
- **Gap:** "anything else → stop" leaves no room for the **degraded-render escalation path** that R1's queue file codified ("try richText with center alignment; if it can't carry CTA + card, file `block.callout` gap"). That path is valuable — it validates the pipeline even when no block is a perfect fit.
- **Fix:** add a 5th bucket: "Adjacent-but-degraded → use the closest existing block for best-effort render, file the gap list with the exact missing fields, mark row `DONE-WITH-CAVEATS`." Explicitly name "callout / contained card" as a known-missing type to prevent builders from picking richText without thinking.
- **Severity:** medium. This is the kind of judgment every frame after #1 will need.

### 2. Missing: known RichTextBlock behavior caveats
- **File:** `alpha_v3/docs/figma-mcp-template.md`, § "Primitives reference" / "Composites reference" / anywhere richText is described.
- **Gap:** no doc note that `RichTextBlock` body is hardcoded left-aligned (not following `sectionHeading.align`), and that `HeadingGroup` always emits `<h2>` regardless of intent. Builders who pick richText expecting "center alignment flows through" will be surprised.
- **Fix:** add a "RichTextBlock gotchas" subsection or footnote under the block reference table. Include: body-alignment hardcoded, heading tag locked to H2, no ctas/no media fields.
- **Severity:** low-medium. Prevents identical rediscovery in future sessions.

### 3. `content-extraction-prompt.md` § "Mapping Figma button styles" needs an escape hatch
- **File:** `alpha_v3/docs/content-extraction-prompt.md`, § "Mapping Figma button styles" (end of "CTA object" section).
- **Gap:** no guidance for "design has a CTA but the target block schema has no `ctas[]` field". A naive reader drops the CTA silently (which I almost did). Should say: "if the block type has no ctas[] and the design has a CTA, file a schema gap and mark `DONE-WITH-CAVEATS` — do not drop silently."
- **Severity:** low. My instinct + the queue file's R1 framing caught it this time; codify the rule so future builders don't need to infer.

### 4. Queue template's R1 guidance was sharp and usable
- **File:** `alpha_v3/docs/component-queue-template.md`.
- **Observation (not a gap):** the queue file's R1-specific framing ("if richText can't carry a centered callout with a CTA, file a gap for block.callout; don't freelance a workaround") was exactly the right level of prescription. The queue file itself drove the decision — the rule book didn't. Consider promoting this pattern (per-round explicit candidate + fallback + gap-filing rule) into the component-queue-template itself as an optional section called "Candidate + fallback per round."
- **Severity:** low. Enhancement, not a fix.

### 6. `content-extraction-prompt.md` § "block.featureGrid" correctly flags icons, doesn't flag CTAs
- **File:** `alpha_v3/docs/content-extraction-prompt.md`, § "Block-specific fields" / "block.featureGrid".
- **Current text:** _"The schema today does NOT include icons on items. If the design has per-item icons, flag — do not invent the field in the seed."_ — correct, useful.
- **Gap:** parallel rule missing for CTAs. Every item in R2 had a "Learn More →" affordance; naive reading wouldn't flag it.
- **Fix:** add sibling note: _"The schema does NOT include per-item CTAs/links. If the design has 'Learn More' or similar affordances on each item, flag — do not invent the field."_
- **Severity:** medium. Catches the second-most-common featureGrid surprise.

### 7. `figma-mcp-template.md` block-type bucket text contradicts schema
- **File:** `alpha_v3/docs/figma-mcp-template.md`, § "Building a block from Figma" step 2.
- **Current text:** _"Grid of cards (2–6 items, icon+title+description) → block.featureGrid"_.
- **Issue:** says `icon+title+description`, but the schema has NO icon field. Doc promise ≠ schema reality. Either (a) fix the schema to match the doc, or (b) fix the doc to drop `icon+` from the bucket description and add a caveat that icons need gap escalation.
- **Severity:** high. This is a doc/code contradiction, not just an omission. Future builders will trust the doc and be surprised by schema validation.

### 8. Tab filter / tabbed content is now a hot-list gap (flagged 2/2 dogfood runs)
- **File:** `alpha_v3/docs/figma-mcp-template.md`, § "Identify the block type" and/or a new "Known-missing-schema patterns" subsection.
- **Observation:** Phase 5 AI Voice Agents had 6 tabs; R2 has 3 tabs. Two of the first three Figma runs against this codebase hit this gap. It's not a long-tail — it's central.
- **Fix:** add a "Known-missing-schema patterns" bullet list near the block-type buckets: tabbed/grouped content (`block.tabbedFeatures`), contained-card callout (`block.callout`), centered heroes with code-media (flagged in queue for R3 #3/#5), logo marquee (flagged for R3 #4). Sets expectations that these will be flagged, not freelanced.
- **Severity:** high. Drives builder judgment on every new frame.

### 9. Missing: site-chrome-inside-frame handling rule
- **File:** `alpha_v3/docs/figma-mcp-template.md` — new subsection, e.g. "Site chrome vs. block content."
- **Gap:** designers ship frames with navbars and footers in-situ (standard practice — shows full-page context). The docs don't tell the builder what to do. Default instinct is either (a) include navbar content in the block seed, or (b) ignore it silently — both wrong. Right answer: exclude from block seed, flag as site-chrome gap, punt to a layout-level decision.
- **Fix:** add a rule: _"If the Figma frame contains site chrome (navbar, footer, banner, floating utility nav), exclude from the block seed. Site chrome belongs in `apps/web/app/layout.tsx` driven by a settings singleton or a navigation document type — never in pageBuilder."_
- **Severity:** high. Bound to trip every builder at least once.

### 10. Missing: "centered hero with media below" pattern in known-missing-schema list
- **File:** `alpha_v3/docs/figma-mcp-template.md` — § "Known-missing-schema patterns" (see docs gap 8 above — the list that should be created).
- **Gap:** the pattern is common (SaaS page-top hero with centered pitch + below code-sample or product-screenshot). Queue flagged it for frame #3 ✓, likely hits again on frame #5. Belongs on the permanent list.
- **Fix:** add to the list: _"Centered hero with media below — `block.heroCenter` (not yet in schema), OR pending `heroSplit.mediaPlacement=below + textAlign=center` enhancement."_
- **Severity:** medium. Sets expectation.

### 11. Queue-file prediction accuracy is a signal in itself
- **File:** `alpha_v3/docs/component-queue-template.md` § Queue template + `figma-mcp-template.md` block-type identification.
- **Observation:** R3 frame #6's queue note read "_Cleanest R3 entry (no new schema expected)_" — wrong. The frame had split-header + below-media + composed-graphic-missing-from-MCP. All 3 gaps were surfaces the queue author (prior session) didn't anticipate.
- **Why it matters:** queue predictions are bets. Tracking their accuracy shows where builder intuition is reliable (heroSplit with real clean media placement) vs. unreliable (anything with non-standard layout composition).
- **Fix:** add to `component-queue-template.md` a handoff section on prediction accuracy: "For each row, was the queue's block-type guess right? Wrong? Surprisingly right?" Small overhead, big signal for "when should we trust intuition vs. always do full MCP pull first."
- **Severity:** low. Meta-observation. Useful for getting better at queue authoring.

### 12. `figma-mcp-template.md` — add `block.comparison` + `block.logoMarquee` to known-missing-schema patterns
- **File:** `alpha_v3/docs/figma-mcp-template.md`, § proposed "Known-missing-schema patterns" (see docs gap 8 above).
- **Gap:** frame #4 added two more missing block types to the list. Both are standard SaaS marketing-page patterns — logo-trust strips and us-vs-them comparison tables. Neither is expressible in any existing schema.
- **Fix:** extend the known-missing list to include: `block.logoMarquee` (customer-logos row with optional auto-scroll), `block.comparison` (2-side pro/con card pair). Frame #4's confirmation that *comparison cards* are designer-reusable components (explicit Figma component descriptions) makes this stronger than the other items on the list.
- **Severity:** high (per the umbrella docs gap 8 — the list itself is high-severity).

### 14. `figma-mcp-template.md` — known-missing-schema list grows further (accordion, codeSample)
- **File:** `alpha_v3/docs/figma-mcp-template.md` § proposed "Known-missing-schema patterns".
- **Gap:** frame #5 adds two more entries that any builder hitting a developer-marketing Figma file will encounter: `block.accordion` (or nested `accordion` field in `tabbedFeatures.groups[].content`) and `block.codeSample` (or `codeSample` field nested in media slots). Both are designer-registered components in the Figma file — not one-offs.
- **Fix:** extend the list. Full current tally: `block.callout`, `block.tabbedFeatures` (3/3 runs), `block.heroCenter` (or `heroSplit.mediaPlacement=below+textAlign=center`, 3/3 R3 frames), `block.logoMarquee`, `block.comparison`, `block.accordion`, `block.codeSample` / `codeSample` field, `block.testimonials` (pending confirmation in frame #7). The list is now long enough to justify a "what fields are we missing?" design-system-level audit, not just per-block patching.
- **Severity:** high.

### 17. Frame-contains-multiple-regions pattern — frame #8 makes it explicit
- **File:** `alpha_v3/docs/figma-mcp-template.md` / `alpha_v3/docs/component-queue-template.md`.
- **Observation:** frame #4 split into 2 blocks (marquee + comparison). Frame #8 also contained two distinct regions (CTA banner + footer), one of which (footer) is site-chrome and excluded from pageBuilder entirely. Frame-structural rule: a Figma "frame" is a canvas unit, not necessarily a block unit. Builders should `get_metadata` first on any section-sized frame and treat each child frame as a candidate block unit.
- **Fix:** add to `figma-mcp-template.md` § "Building a block from Figma": a new step _"0. Drill in first with `get_metadata` on any frame larger than a single hero/section. A Figma frame may contain multiple blocks (logo row + comparison section), or a mix of pageBuilder content + site-chrome (closer + footer). Treat each child frame as an independent candidate."_ This codifies what frame #4 and frame #8 taught the hard way.
- **Severity:** high. Every multi-region frame without this step risks (a) cramming two logical blocks into one seed, or (b) trying to render site-chrome as pageBuilder content.

### 16. `figma-mcp-template.md` — `block.testimonials` joins known-missing-schema list
- **File:** `alpha_v3/docs/figma-mcp-template.md` § proposed "Known-missing-schema patterns".
- **Gap:** frame #7 confirmed the `block.testimonials` gap predicted in queue table. Designer-registered Default + Featured variants make this a clearly intended reusable component, not a one-off.
- **Fix:** add `block.testimonials` (quote + author + variant) to the known-missing list. The full list now covers the vast majority of first-class marketing-page patterns: callout, tabbedFeatures (3/3), heroCenter (3/3 R3), logoMarquee, comparison, accordion, codeSample, testimonials. A builder reading this list before any new frame will know to expect gaps rather than trying to cram into existing blocks.
- **Severity:** medium (per the list's overall high severity — each addition incrementally less marginal).

### 15. Re-tier: `block.tabbedFeatures` is now the top Tier 1 item (3/3 runs)
- **File:** `alpha_v3/seeds/queues/2026-04-22-signalwire-homepage-queue.md` — the handoff's Tier rankings themselves.
- **Observation:** prior handoff ranked tabbedFeatures in Tier 3 ("larger work"). Frame #5 as the 3rd dogfood run hitting this gap (2/2 was already notable; 3/3 over different surface areas is now a pattern). Every one of those 3 was a different page section: Phase 5's stat-tab switcher, R2 Documentation's tab-swap, R3 #5's tab-controls-accordion+code. The shape keeps recurring; the schema is the bottleneck.
- **Fix:** promote to Tier 1 item 3 on the carry-forward list. Tag as "blocks further fidelity on this page and any other product/marketing Figma handoff — ship this schema before next dogfood run."

### 13. Queue prediction accuracy — frame #4 split was accurate
- **File:** `alpha_v3/docs/component-queue-template.md` § handoff summary prediction tracking.
- **Observation:** Frame #4's queue note predicted "_likely one Figma frame containing a logo marquee + a 2-col comparison_" — accurate. `get_metadata` confirmed two child frames matching exactly that description. Block-type guess (`block.logoMarquee` + comparison) was also accurate (both are gaps, so guess → fallback path was right).
- **Running tally (across both sessions):** queue predictions 4/6 accurate. R1 ✓, R2 ✓, R3 #3 ✓, R3 #4 ✓ (split confirmed + both block-type guesses right); R3 #5 ✗ (said "heroSplit variant with code-block media" — actual was tabbedFeatures+accordion+code, a 3-axis miss), R3 #6 ✗ (said "cleanest R3 entry, no new schema expected" — wrong on all fronts).
- **Pattern in misses:** both wrong predictions were for "assumed-simple" frames where the queue author expected one-axis complexity (just a code-block media variant; just a clean heroSplit). Both were actually 2- or 3-axis complex. The *accurate* predictions either (a) named the gap preemptively ("likely splits into 2 blocks", "confirm heroCenter gap") or (b) said "needs drill-in first" (frame #4). Predictions that skip the drill-in hedge are the ones that go wrong.
- **Severity:** low-medium. Add to component-queue-template.md as a prediction-discipline rule: *"when writing queue row 'notes', either name the expected gap explicitly or mark 'requires drill-in'; do NOT write unhedged 'clean, no new schema' notes."*

### 5. Missing: handoff summary examples for DONE-WITH-CAVEATS
- **File:** `alpha_v3/docs/component-queue-template.md` § "Handoff summary".
- **Gap:** the handoff example shows Completed / In flight / Remaining / Gaps. It doesn't show how to write a DONE-WITH-CAVEATS line that links to a specific gap-section entry. First-time users will either over-describe the caveat in the handoff (duplicating the gap entry) or under-describe it (losing the trail).
- **Fix:** add a 1-line example: `- Frame 1 DONE-WITH-CAVEATS (seed: seeds/signalwire/held-hostage-callout.json; see schema gap 1, composite gap 1-2, docs gap 1).`
- **Severity:** low.

---

## Handoff — 2026-04-22

**Session wallclock:** ~2h (R1 ≈ 45 min, R2 ≈ 30 min, R3 #3 ≈ 25 min, R3 #6 ≈ 20 min). Well under R1's 1h + R2's 2h + R3's 4h individual budgets; **hit the 4-frame session cap** before running out of R3 budget. Pacing was NOT the bottleneck — schema coverage was.

**Page state in Sanity (`signalwire-homepage`, dataset `site-foundry-dev`):**
```
block.richText     (f770b43a788b)  ← R1 Held Hostage callout
block.featureGrid  (f6c0f293a954)  ← R2 Dive into Documentation
block.heroSplit    (f22686d9c7a1)  ← R3 #3 communications control plane hero
block.heroSplit    (f86db37aa73a)  ← R3 #6 You Write the Logic / Voice AI
```
Page-order display is wrong (applied in build-order not page-order) — known quirk per STATUS.md; editors drag-reorder in Studio.

### Completed (4 frames, all DONE-WITH-CAVEATS)
- Frame 1 (R1): `block.richText` — `seeds/signalwire/held-hostage-callout.json`. Lost CTA, icon, card frame, decoration. Pipeline validated end-to-end.
- Frame 2 (R2): `block.featureGrid` — `seeds/signalwire/dive-into-documentation.json`. Lost 6 per-item icons, 6 per-item "Learn More" CTAs, tab filter, bordered-table grid treatment. **Notable:** designer's own Figma component description for `Detail Block` explicitly reads "Icon + title + description + CTA" — schema carries 2 of 4 fields.
- Frame 3 (R3 #3): `block.heroSplit` degraded (wrong layout) — `seeds/signalwire/hero-communications-control-plane.json`. Lost centered layout + below-media placement (now 2/2 R3 frames hit this), code-editor media (composed graphic — no single MCP URL), floating navbar (site-chrome architecture gap), backdrop-blur container treatment.
- Frame 6 (R3 #6): `block.heroSplit` degraded (wrong layout) — `seeds/signalwire/voice-ai-follows-logic.json`. Queue's "cleanest R3 entry, no new schema expected" prediction was wrong. Lost split-heading row, below-media placement, diagram media entirely (composed graphic), legend row.

### In flight
*(none — session cleanly closed at 4-frame cap)*

### Remaining in R3 (4 frames carried to next session)
- Frame 4 (`893:6814`) — Logo row + "Production is a Costly Place" comparison. PENDING. Queue suggests likely splits into 2 blocks (`block.logoMarquee` + `block.comparison`-ish). Begin with `get_metadata` on the parent to confirm split before picking block types.
- Frame 5 (`893:7147`) — "Everything You Need, Unified." PENDING. Queue expects same `mediaPlacement=below` gap as #3/#6. Now 3rd hit will strengthen the case — but also low marginal gap signal.
- Frame 7 (`893:7450`) — "Join the thousands of developers" testimonials. PENDING. Try `block.featureGrid` 3-col first; if item shape can't carry avatar+quote, file `block.testimonials`.
- Frame 8 (`893:7486`) — "Stack for What's Next" closer. PENDING. Figma name says "Contact Form" but screenshot is a CTA closer. Drill in with `get_design_context` first before picking block type.

### Gaps to carry forward — ranked by fix-leverage

**Tier 1 — 1-line fixes with high user-visible impact:**
1. **`block.richText` → `withCtas: true`** (schema gap 2, `packages/sanity-schema/src/blocks/richText.ts:5`). Unlocks CTAs on every richText — immediately fixes ~60% of the R1 callout use case. **Ship before Friday.**
2. **`figma-mcp-template.md` doc/code contradiction** (docs gap 7). Template claims featureGrid has `icon+title+description`; schema only has 2 of 3. Either extend schema or fix doc. One edit either way.

**Tier 2 — small schema extensions, broad impact:**
3. **`block.featureGrid` items add `icon` field** (schema gap 4). Designer's own component description calls this out. Recurring pattern.
4. **`block.featureGrid` items add `cta` / `link` field** (schema gap 5). Same source — designer's spec.
5. **`block.heroCenter` OR `heroSplit.mediaPlacement=below` + `textAlign=center`** (schema gap 8). 2/2 R3 frames hit this. Could preempt frames #3/#5/#6 failures with one change. Recommend Option B (new block) — cleaner semantic boundary, parallel with `heroSplit` naming. But Option A (extend heroSplit) is the 2-line change. User call.

**Tier 3 — larger work, blocks design-fidelity:**
6. **`block.callout` new schema + React component** (schema gap 1). Carries heading+body+cta+icon+tone+optional decorative bg. ~2h work. Required for R1 fidelity.
7. **`block.tabbedFeatures` new schema + React component** (schema gap 6). Used 2/2 dogfood runs (Phase 5 AI Voice Agents + R2 Documentation). Most-recurring missing-type.
8. **Site chrome architecture decision** (schema gap 9). Product-level: where does navbar live? Settings singleton vs. navigation doc vs. block. Needs alignment before any frame with navbar-in-mockup can render.

**Tier 4 — pipeline / composite work:**
9. **`RichTextBlock` body alignment from `sectionHeading.align`** (composite gap 2). `RichTextBlock.tsx:8`. One-file change.
10. **`FeatureGridBlock` render with icon + item-CTA** (composite gap 5 / IconTile). Follows schema gap 4-5.
11. **Figma MCP composed-graphic export** (pipeline gap 1). Workflow fix OR infrastructure fix.
12. Lower-priority composite work (contained-card section, floating badge, TabFilter primitive, Learn More ghost w/ arrow, Navbar composite, Legend composite — composite gaps 1, 3, 4, 6, 8, 9).

**Tier 5 — cosmetic:**
13. `sectionHeading` H1 size option (schema gap 3). Cosmetic.
14. Split-heading row layout (schema gap 10). 2 occurrences — bump to Tier 3 if it keeps recurring.
15. `block.featureGrid` `variant` for bordered-table treatment (schema gap 7). Single occurrence.

### Docs changes to make in next session (from Docs gaps 1–11)
Priority-ordered:
1. `figma-mcp-template.md` — add **"Known-missing-schema patterns"** subsection (docs gaps 1, 8, 10). List: callout, tabbedFeatures, heroCenter, logoMarquee, comparison, testimonials. Every new frame should check this list FIRST.
2. `figma-mcp-template.md` — fix featureGrid doc/code contradiction on icons (docs gap 7). Two options — user's call.
3. `figma-mcp-template.md` — add **"Site chrome vs. block content"** subsection (docs gap 9). Navbar/footer never in pageBuilder.
4. `figma-mcp-template.md` — add **"Adjacent-but-degraded" block-type bucket** + `RichTextBlock` gotchas (docs gaps 1, 2).
5. `content-extraction-prompt.md` — add "flag CTAs when schema lacks them" sibling rule (docs gap 6).
6. `content-extraction-prompt.md` — add CTA-drop escape-hatch guidance (docs gap 3).
7. `component-queue-template.md` — codify "candidate + fallback per round" + DONE-WITH-CAVEATS handoff example (docs gaps 4, 5) + prediction-accuracy tracking (docs gap 11).

### Friday token-swap follow-ups (token gaps 1–4)
- Confirm Friday PR scope: **is font loading (Instrument Sans + Lexend) included, or hex-only?** STATUS.md claims hex-only, but the starter's current theme may not load SignalWire fonts. Structural question, not a gap yet — clarify Friday-PR scope.
- Expect no surprise from token gaps 2–4 (callout tint, `background/raised` as component tint, pink `#f72a72`). All hex-only concerns, will resolve with the palette swap.
- **Post-Friday action:** re-verify all 4 applied blocks visually. Palette swap is supposed to touch only hex values, so structure/spacing/enum/schema work from this session should be unaffected. Quick visual pass at `/signalwire-homepage` will confirm.

### Primary deliverable verdict
Per queue file's opening statement: _"The primary deliverable is not the rendered page. It is: (1) dogfooding pass on docs, (2) ranked gap list with Figma-node evidence, (3) staged signalwire-homepage for Friday token swap."_

- ✅ (1) Dogfooded both `figma-mcp-template.md` and `component-queue-template.md`. 11 docs gaps surfaced, prioritized. Most actionable: hot-list of known-missing-schema patterns.
- ✅ (2) **10 schema gaps, 9 composite gaps, 1 pipeline gap, 4 token notes, 11 docs gaps = 35 ranked items** with Figma-node evidence and target-package paths. Tier 1 is 2 one-line fixes ready to ship before Friday.
- ✅ (3) `signalwire-homepage` staged with 4 blocks. All 4 render HTTP 200 in dev preview.

### What this session proved about the prediction framework
- Queue predictions for R1 (richText vs. callout) and R2 (featureGrid at scale) were accurate.
- Queue prediction for R3 frame #3 ("almost certainly surfaces heroCenter gap") was accurate ✓
- Queue prediction for R3 frame #6 ("cleanest R3 entry, no new schema expected") was **wrong** ✗ — frame had split-header + below-media + composed-graphic pipeline gap. Intuition about "heroSplit-shaped" frames is unreliable when the media is non-trivial.
- **Takeaway:** don't trust "clean" predictions without an MCP pull. Pulling context is cheap; wrong predictions waste time.

---

## Handoff — 2026-04-22 (session 2)

**Session wallclock:** ~1.5h (frame #4 ≈ 25 min including split + gaps, frame #5 ≈ 20 min, frame #7 ≈ 15 min, frame #8 ≈ 20 min, handoff + gap updates ≈ 10 min). Well under the 4h R3 budget; **hit the 4-frame session cap** per queue template rules.

**Page state in Sanity (`signalwire-homepage`, dataset `site-foundry-dev`, now 8 blocks):**
```
block.richText     (f770b43a788b)  ← R1 Held Hostage callout                  (session 1)
block.featureGrid  (f6c0f293a954)  ← R2 Dive into Documentation               (session 1)
block.heroSplit    (f22686d9c7a1)  ← R3 #3 communications control plane hero  (session 1)
block.heroSplit    (f86db37aa73a)  ← R3 #6 You Write the Logic / Voice AI     (session 1)
block.featureGrid  (ffc95243e138)  ← R3 #4b Production is a Costly Place      (session 2)
block.richText     (f2c4ee556716)  ← R3 #5 Everything You Need, Unified       (session 2)
block.featureGrid  (f22b4f1d1184)  ← R3 #7 Join the thousands of developers   (session 2)
block.heroSplit    (f5049d34469e)  ← R3 #8 Stack for What's Next closer       (session 2)
```
Build-order vs. page-order mismatch persists (known STATUS.md quirk; editors drag-reorder in Studio).

### Completed (4 frames applied + 1 BLOCKED split; 4 DONE-WITH-CAVEATS)
- Frame 4 (R3 #4): SPLIT confirmed via `get_metadata` — 4a marquee + 4b comparison.
  - Frame 4a BLOCKED: `seeds/signalwire/customer-logos.json` (not written). `block.logoMarquee` schema needed (schema gap 11). Logo imagery is primary content; label-only stub would mislead editors.
  - Frame 4b DONE-WITH-CAVEATS: `block.featureGrid` 2-col — `seeds/signalwire/production-costly-comparison.json`. Lost per-item bullet structure (5 items × 2 cards), X/check indicators, SignalWire-card fuchsia+glow emphasis treatment, platform logo in header. See schema gap 12 (`block.comparison`), composite gaps 10-11, token gap 5, docs gap 12.
- Frame 5 (R3 #5) DONE-WITH-CAVEATS: `block.richText` — `seeds/signalwire/everything-you-need-unified.json`. **Queue prediction was WRONG** ("heroSplit variant with code-block media" — actual was tabbedFeatures + accordion + code-block, 3-axis complexity). Lost tab filter (RECURRING 3/3 dogfood runs), 5-item accordion with open/closed state, code editor with window chrome + syntax highlighting + line numbers, caption. See gaps 6 (strengthened 3/3), 8 (strengthened 3/3 R3), 13, 14, composite gaps 12-13, token gap 6, docs gaps 14-15.
- Frame 7 (R3 #7) DONE-WITH-CAVEATS: `block.featureGrid` 3-col — `seeds/signalwire/testimonials-thousands-of-devs.json`. Queue prediction ACCURATE (predicted `block.testimonials` fallback). Lost: avatars, Featured-card variant (fuchsia border + blue glow, 25px quote vs 16px), carousel dots, quote-as-primary-content semantics. Content is placeholder ("Lorem ipsum" / "John Doe") — awaiting real customer copy. See schema gap 15, composite gap 14, docs gap 16.
- Frame 8 (R3 #8) DONE-WITH-CAVEATS: `block.heroSplit` — `seeds/signalwire/whats-next-closer.json`. **Multi-region frame** — CTA Banner (`893:7487`) applied; Footer (`893:7489`) excluded per schema gap 9 site-chrome rule. CTA Banner is structurally a callout (2/2 uses of `block.callout` now this session). Lost: frosted-card treatment, starry-nebula backdrop image, centered below-CTA layout, entire footer (5 nav columns + 5 social links + legal + brand). See gaps 1 (strengthened 2/2), 8 (strengthened 4/5 R3 hero-shaped frames), 9 (strengthened — now includes footer), docs gap 17.

### In flight
*(none — session cleanly closed at 4-frame cap; all 8 R3 frames now resolved)*

### Remaining
*(no R3 frames left — every row is DONE / DONE-WITH-CAVEATS / BLOCKED)*
**The integration run has closed.** All 8 frames are either applied or blocked-with-schema-gap-filed. The Figma-to-Sanity dogfood pass is complete; further work is on the Site Foundry package side (schema/composite fixes), not on this queue.

### Session-2-specific gap additions (delta from session 1)

**New schema gaps (5):**
- Gap 11 — `block.logoMarquee` (BLOCKER for 4a)
- Gap 12 — `block.comparison` (2-side card pair with pro/con lists + emphasis variant)
- Gap 13 — `block.accordion` (or nested `accordion` field in `tabbedFeatures.groups[].content`)
- Gap 14 — `codeSample` field or `block.codeSample` (code block with window chrome + syntax highlighting)
- Gap 15 — `block.testimonials` (quote + author + avatar + variant)

**Strengthened existing schema gaps (4):**
- Gap 1 (callout) — was 1/1 (frame #1 "Held Hostage"); now 2/2 (frame #8 CTA Banner structurally identical).
- Gap 6 (tabbedFeatures) — was 2/2 (Phase 5 + R2); now **3/3** (added R3 #5).
- Gap 8 (heroCenter / mediaPlacement=below) — was 2/2 R3 frames; now **4/5** R3 hero-shaped frames (added #5 centered heading, #8 centered heading+CTA; frame #4b is 2-col comparison, the lone non-centered hero-shape).
- Gap 9 (site chrome) — was navbar-only; now **navbar + footer** (frame #8 Footer).

**New composite gaps (5):** 10 (`<LogoMarquee>`), 11 (`<ComparisonCard>` + `<BulletIndicator>`), 12 (`<Accordion>`), 13 (`<CodeBlock>`), 14 (`<TestimonialCard>` + `<Avatar>` + `<Carousel>`).

**New token gaps (2):** 5 (`callout/*` tones — danger/success borders), 6 (`syntax/*` family — 6 tokens for code highlighting).

**New docs gaps (6):** 12 (extend known-missing-schema), 13 (prediction accuracy #4), 14 (accordion + codeSample), 15 (re-tier tabbedFeatures to Tier 2), 16 (testimonials in known-missing), 17 (multi-region frame drill-in rule).

**End-of-run totals across both sessions:** 15 schema gaps + 14 composite gaps + 1 pipeline gap + 6 token notes + 17 docs gaps = **53 ranked items** with Figma-node evidence.

### Gaps to carry forward — RE-RANKED (post-session-2)

**Tier 1 — ship before Friday (1-line / trivial):**
1. **`block.richText withCtas: true`** (gap 2) — still unshipped; now 2/2 callout-shape uses want CTAs (frames #1, #8). 1-line change, `packages/sanity-schema/src/blocks/richText.ts:5`. **Ship before Friday.**
2. **`figma-mcp-template.md` featureGrid doc/code contradiction** (docs gap 7) — still unshipped. Two-line edit.

**Tier 2 — small schema extensions, broad impact:**
3. **`block.heroCenter` (or `heroSplit.mediaPlacement=below + textAlign=center`)** (gap 8) — **4/5 R3 hero-shaped frames** hit this. Single change fixes 4 of 8 page blocks. Strongest fix-leverage Tier 2 item.
4. **`block.tabbedFeatures`** (gap 6) — 3/3 dogfood runs. **Promoted from Tier 3.** Shape: `groups[]: { label, content: [AccordionBlock | CodeSampleBlock | FeatureGridBlock] }`.
5. **`block.featureGrid` items add `icon`** (gap 4) — designer-spec'd.
6. **`block.featureGrid` items add `cta`** (gap 5) — designer-spec'd.

**Tier 3 — larger new blocks (in descending fix-leverage):**
7. **`block.callout`** (gap 1) — 2/2 uses this run. Frames #1 + #8. Unblocks both.
8. **`block.testimonials`** (gap 15) — staple marketing pattern. Frame #7.
9. **`block.comparison`** (gap 12) — designer-registered reusable, 1 use (frame #4b).
10. **`block.accordion`** (gap 13) — likely nested in tabbedFeatures; ship together.
11. **`block.codeSample`** or nested `codeSample` field (gap 14) — 2/2 R3 frames with code-editor media dropped it. Ship with tabbedFeatures.
12. **`block.logoMarquee`** (gap 11) — BLOCKER for frame 4a. Not wired into any other frame this run.

**Tier 4 — architectural:**
13. **Site chrome settings singleton** (gap 9) — navbar + footer confirmed 2/2. Target: `packages/sanity-schema/src/singletons/settings.ts` + `packages/ui/src/components/Navbar` + `Footer` + `apps/web/app/layout.tsx`.
14. **Figma MCP composed-graphic export** (pipeline gap 1) — workflow OR infra fix. 2/2 R3 frames with diagrams dropped the imagery.

**Tier 5 — pipeline / composite work (follow their paired schema gap):**
15. RichTextBlock body alignment from sectionHeading.align (composite gap 2). 1-file change.
16. FeatureGridBlock icon + item-CTA render (composite gap 5 / `<IconTile>`).
17. `<ComparisonCard>` + `<BulletIndicator>` (composite gap 11).
18. `<Accordion>` (composite gap 12).
19. `<CodeBlock>` window-chrome + syntax-highlighting (composite gap 13).
20. `<TestimonialCard>` + `<Avatar>` + optional `<Carousel>` (composite gap 14).
21. `<LogoMarquee>` (composite gap 10).
22. `<Navbar>` + `<Footer>` (composite gap 8, extended for footer).
23. `<TabFilter>` primitive (composite gap 4).
24. Remaining composites (`<CalloutFrame>` 1, `<IconBadge>` 3, Learn-More ghost-w/-arrow 6, `<Legend>` 9).

**Tier 6 — cosmetic:**
25. sectionHeading H1 size option (gap 3).
26. Split-heading row layout (gap 10) — 2 occurrences.
27. featureGrid `variant` for bordered-table (gap 7) — 1 occurrence.

### Docs changes — priority-ordered (post-session-2)
1. `figma-mcp-template.md` — add **"Known-missing-schema patterns"** subsection (docs gaps 1, 8, 10, 12, 14, 16). **Full list:** `block.callout` (2/2 uses), `block.tabbedFeatures` (3/3 runs), `block.heroCenter` or `heroSplit.mediaPlacement=below+textAlign=center` (4/5 R3), `block.logoMarquee`, `block.comparison`, `block.accordion`, `block.codeSample`, `block.testimonials`. Eight entries. Every new frame checks this list FIRST.
2. `figma-mcp-template.md` — add **"Drill in first"** rule (docs gap 17). `get_metadata` on any section-sized frame before picking a block type. Frames #4 and #8 BOTH contained multiple regions — one was a split (marquee+comparison), one was pageBuilder+site-chrome (CTA Banner+Footer). Rule earned the hard way twice.
3. `figma-mcp-template.md` — fix featureGrid doc/code contradiction (docs gap 7). Still unshipped.
4. `figma-mcp-template.md` — **"Site chrome vs. block content"** subsection (docs gap 9). Include footer examples too — not just navbar. Reference the target schema shape (settings.navigation with primary + footer.columns + socials + legal).
5. `figma-mcp-template.md` — "Adjacent-but-degraded" block-type bucket + `RichTextBlock` gotchas (docs gaps 1, 2).
6. `content-extraction-prompt.md` — CTA-schema-absent flag + per-item CTA/icon flag (docs gaps 3, 6).
7. `component-queue-template.md` — candidate+fallback per round + DONE-WITH-CAVEATS handoff example (docs gaps 4, 5).
8. `component-queue-template.md` — **prediction-discipline rule** (docs gap 13): queue row notes must either name the expected gap OR mark "requires drill-in". No unhedged "clean, no new schema" claims. Both session-2 wrong predictions (R3 #5 and session-1 R3 #6) were unhedged; all right predictions were either explicit or hedged.
9. `component-queue-template.md` — prediction-accuracy tracking (docs gap 11). Running tally lives in each session's handoff.

### Friday token-swap follow-ups
- Re-verify: does Friday PR include font loading (Instrument Sans + Lexend) or hex-only? (Session 1 question, still open.)
- **Added this session:** confirm Friday PR covers the `syntax/*` token family (token gap 6) — 6 tokens needed for code highlighting. If Friday scope skips these, `<CodeBlock>` composite should wire to CSS variables anyway so it re-themes on swap.
- **Added this session:** clarify `callout/*` tone semantics (token gap 5) — is `callout/danger/border` + `callout/success/border` a first-class semantic category, or a re-labeling of `--color-state-error` / `--color-state-success`?
- **Post-Friday action:** re-verify all 8 applied blocks visually. Same logic as session 1 — hex-only swap should leave structure/spacing/enum/schema work intact.

### Primary deliverable verdict (post-session-2)
Per queue file's opening statement: _"(1) dogfooding pass on docs, (2) ranked gap list with Figma-node evidence, (3) staged signalwire-homepage for Friday token swap."_

- ✅ (1) Dogfooded docs across 8 frames spanning all R3 scope. **17 docs gaps** identified and prioritized. Biggest finding: the known-missing-schema pattern list is now 8 items long — a design-system-level audit is warranted, not just per-block patching.
- ✅ (2) **53 ranked items across both sessions** (15 schema + 14 composite + 1 pipeline + 6 token + 17 docs). Tier 1 remains 2 trivial fixes (still unshipped); Tier 2 now leads with `heroCenter` (4/5 R3 leverage) and `tabbedFeatures` (3/3 runs) — both justified as "fix once, unblock many" on fresh evidence.
- ✅ (3) `signalwire-homepage` staged with 8 blocks (up from 4). Four more frames applied this session, one BLOCKED with explicit gap. All render HTTP 200 in dev preview.

### What session 2 proved about the prediction framework
- Session-2 predictions: **3/4 accurate** (R3 #4 ✓ split confirmed, R3 #5 ✗ unhedged "clean" claim, R3 #7 ✓ hedged "try featureGrid, fall back to block.testimonials", R3 #8 ✓ hedged "drill in first").
- **Across both sessions: 6/8 accurate (75%).**
- **100% of wrong predictions were "unhedged clean" notes.** Both R3 #6 ("cleanest R3 entry, no new schema expected") and R3 #5 ("heroSplit variant with code-block media") asserted simplicity without drill-in. Both were multi-axis complex.
- **100% of right predictions** either named the expected gap explicitly (R3 #3, R3 #7) or flagged "drill in first" (R3 #4, R3 #8).
- **Codified rule** (docs gap 13): queue row notes must name the gap OR mark "requires drill-in". Never make unhedged simplicity claims.
