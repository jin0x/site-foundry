# Prompt-edit scratchpad — proposed changes staged for review

**Purpose:** stage proposed edits to the Figma-to-code prompts (`figma-mcp-template.md`, `component-queue-template.md`, `content-extraction-prompt.md`) **before** they land in the real files. Separates "I noticed a gap" from "the doc should change in exactly this way" — proposed edits get reviewed in aggregate (catches contradictions), can be revised against fresh evidence, and can optionally ride through a next-round dogfood before becoming permanent.

**Lifecycle of a scratchpad entry:**
1. **Proposed** — entry exists with evidence + proposed edit intent. Not yet in the real doc.
2. **Approved for apply** — user has reviewed, edit is ready to commit to the real doc.
3. **Applied** — edit is in the real doc. Entry retained here with a pointer to the commit/diff until the next integration confirms the edit stuck. Then delete.
4. **Rejected** — entry was proposed but further evidence or review killed it. Mark rejected, retain for a cycle, then delete.

**Scope discipline:** scratchpad is for **substantive rule/guidance changes**. Typos, stale paths, and mechanical fixes go direct — don't clutter this file.

**When to apply:** default is *apply approved entries immediately* so the next integration session benefits. Exception: if an entry is lower-confidence and the next integration is imminent, hold it and let that session's evidence inform the wording.

---

## Source evidence pointer

All entries below reference gap numbers from `seeds/queues/2026-04-22-signalwire-homepage-queue.md` § "Docs issues surfaced this session" (docs gaps 1–17). Source gap numbers shown in each entry's **Evidence** field for auditability.

---

## S1 — Known-missing-schema patterns subsection

**State:** Applied 2026-04-22 (snapshot: `docs/_archive/2026-04-22-pre-round-2/`)
**Target file:** `alpha_v3/docs/figma-mcp-template.md`
**Target section:** new subsection under `## Building a block from Figma`, step 2 (`Identify the block type`). Place *before* existing step 2 buckets so builders encounter it first.
**Evidence:** docs gaps 1, 8, 10, 12, 14, 16. 8 distinct pattern hits across 8 frames + Phase 5 AI Voice Agents precedent.
**Priority:** high (ship with S3 before Friday if possible — the earlier future sessions see this, the fewer cycles wasted trying to cram patterns into existing schemas).

**Proposed edit (intent + content):**

Add a subsection titled **"Known-missing-schema patterns — check FIRST"** listing patterns that have been confirmed missing across multiple dogfood runs, with evidence counts. Every builder reading this list before a new frame should expect these to be gaps, not try to cram them into existing blocks.

List (order by evidence count, descending):

| Pattern | Schema proposal | Evidence |
|---|---|---|
| Centered hero with media below (code-editor, diagram, screenshot) | `block.heroCenter` OR `heroSplit.mediaPlacement="below" + textAlign="center"` | 4/5 R3 hero-shaped frames, SignalWire homepage |
| Tabbed/grouped content (tabs → panes with mixed content) | `block.tabbedFeatures` — `groups[]: { label, content: [...] }` | 3/3 dogfood runs (Phase 5, R2, R3 #5) |
| Contained-card callout (heading + body + CTA + tone/icon) | `block.callout` (or `block.richText withCtas:true` for the CTA dimension only) | 2/2 uses (frame #1, frame #8) |
| Customer-logo row / trust marker | `block.logoMarquee` | 1/1 (frame #4a — currently BLOCKED) |
| Two-side comparison card pair with pro/con lists | `block.comparison` | 1/1 (frame #4b) |
| Collapsible list (FAQ / step-by-step with open state) | `block.accordion` OR nested `accordion` field in `tabbedFeatures` | 1/1 (R3 #5) |
| Code editor as media (window chrome + syntax highlighting) | `codeSample` field in media slot, OR `block.codeSample` | 2/2 R3 frames w/ code-editor media |
| Testimonial cards (quote + author + avatar + variants) | `block.testimonials` | 1/1 (frame #7) |

Add closing sentence: "When a frame matches one of these patterns, mark the queue row `BLOCKED` or `DONE-WITH-CAVEATS` with a pointer to this list — don't freelance a workaround."

**Rationale:** sets expectations up front. Without this list, every new builder rediscovers the same gaps from scratch. The list is also a design-system-level audit target — when an item ships, it graduates off the list.

**Validation plan:** next integration session should hit at least 1 pattern on this list (near-certain given marketing-page ubiquity). If the builder correctly marks it `BLOCKED` with a list pointer rather than freelancing, the entry worked.

**Apply:** recommended Thu, before any further integration work.

---

## S2 — "Drill in first" rule

**State:** Applied 2026-04-22 (snapshot: `docs/_archive/2026-04-22-pre-round-2/`)
**Target file:** `alpha_v3/docs/figma-mcp-template.md`
**Target section:** new step **0** at the top of `## Building a block from Figma` (before the existing step 1 MCP-pull guidance).
**Evidence:** docs gap 17. 2/8 frames contained multiple regions (frame #4 = marquee + comparison; frame #8 = CTA banner + footer).
**Priority:** high.

**Proposed edit (intent + content):**

Add a new step 0: **"0. Drill in first.** On any frame larger than a single hero/section (rule of thumb: >800px tall on desktop, or visually contains >1 distinct content zone), run `get_metadata` **before** picking a block type. A Figma 'frame' is a canvas unit, not necessarily a block unit — it may contain multiple block candidates (e.g. logo row + comparison section) or a mix of pageBuilder content + site-chrome (e.g. closer + footer). Treat each child frame as an independent candidate. If the parent splits, add queue rows for each child (`4a`, `4b`, ...) — don't renumber existing rows."

**Rationale:** cross-session evidence shows that assuming-one-frame = one-block leads to (a) seed files that mash two logical blocks together, or (b) trying to render site-chrome as pageBuilder content. Earned the rule the hard way twice in two sessions.

**Validation plan:** next integration session should `get_metadata` on any frame >800px before picking block type. Track in handoff summary prediction-accuracy line.

**Apply:** recommended Thu, before any further integration work.

---

## S3 — Fix featureGrid doc/code contradiction — **RETIRED 2026-04-23**

**State:** ✅ **Retired — obviated by schema ship.** T2.3 (`items[].icon`) + T2.4 (`items[].cta`) shipped in round 2 prep; T5.2 (render of those fields) shipped 2026-04-23. The doc/code contradiction no longer exists — schema now matches the richer "icon + title + description + cta" shape the prompt described. Round-2 handoff noted this as "N/A — obviated by T2.3/T2.4 schema ship. Can be retired from scratchpad watch list." Entry kept for provenance; no further action.
**Target file (historical):** `alpha_v3/docs/figma-mcp-template.md`
**Target section (historical):** `## Building a block from Figma` step 2, the `block.featureGrid` bucket description.
**Evidence (historical):** docs gap 7. Doc claimed `icon+title+description` but schema had only `title+description`. 1/1 builder-surprised (R2 Documentation).
**Priority (historical):** Tier 1.

**Proposed edit (intent + content):**

Two options — the fix is one OR the other, not both:

- **Option A (doc-side):** remove `icon+` from the bucket description. Replace with: _"Grid of cards (2–6 items, title+description; eyebrow optional) → `block.featureGrid`. If items have icons OR per-item CTAs, flag — schema does not carry them today (see Known-missing-schema patterns, `block.featureGrid` items `icon` / `cta` — pending Tier 2)."_
- **Option B (schema-side):** ship Tier 2 items T2.3 + T2.4 (add `icon` + `cta` to featureGrid items) — the doc is already correct for the desired end state. Requires ~2 hours of schema + React block work.

**Recommend: Option A for now.** Ship the doc fix Thu; ship Option B as part of the next-sprint Tier 2 batch (which also adds the `cta` field — then re-edit the doc to reflect the expanded schema).

**Rationale:** doc/code contradictions are high-severity because future builders trust the doc and get surprised by schema validation. Cheap to fix either direction.

**Validation plan:** next integration session's featureGrid row should either render icons + CTAs (if Option B shipped) or be marked with `DONE-WITH-CAVEATS` + gap pointer (if Option A shipped).

**Apply:** Thu, paired with T1.1 schema PR (richText withCtas).

---

## S4 — Site chrome vs. block content subsection

**State:** Applied 2026-04-22 (snapshot: `docs/_archive/2026-04-22-pre-round-2/`)
**Target file:** `alpha_v3/docs/figma-mcp-template.md`
**Target section:** new subsection after core principles (before `## Tech stack`).
**Evidence:** docs gap 9. 2/2 — frame #3 contained a floating navbar; frame #8 contained a full footer (5 columns + social + legal). Both are designer-standard (mockups show full page context) but neither belongs in pageBuilder.
**Priority:** high.

**Proposed edit (intent + content):**

Add a subsection titled **"Site chrome vs. block content"**:

> If the Figma frame contains site chrome — navbar, footer, banner, floating utility nav, cookie consent, site-wide search — **exclude from the block seed**. Site chrome does not belong in `pageBuilder`. Its home is:
>
> - **Eventual target (Tier 4):** a `settings` singleton in `packages/sanity-schema/src/singletons/settings.ts` driving a `<Navbar>` + `<Footer>` composite rendered inside `apps/web/app/layout.tsx`.
> - **Today:** site chrome has no home — flag in the queue file's "Schema gaps" as a site-chrome/layout-architecture gap and proceed with the block-content portion of the frame only.
>
> Typical shape to expect in the eventual settings singleton:
> ```
> settings.navigation: {
>   primary: [NavItem],
>   footer: {
>     columns: [{ label, links: [NavItem] }],
>     socials: [SocialLink],
>     legal: [legalItems],
>   }
> }
> ```
>
> When you encounter site chrome in a frame: mark the row `DONE-WITH-CAVEATS` if block content was applied, or `BLOCKED` if the frame was entirely site chrome. Add to Schema gaps: "site chrome — navbar/footer observed in frame X (evidence: `<nodeId>`), no schema destination today."

**Rationale:** this instinct is load-bearing for every marketing frame. Without it, every builder wastes a cycle deciding what to do with nav bars.

**Validation plan:** next frame containing site chrome → builder excludes cleanly + logs gap, no seed contamination.

**Apply:** recommended soon after S1–S3 (same PR if convenient).

---

## S5 — "Adjacent-but-degraded" block-type bucket + RichTextBlock gotchas

**State:** Applied 2026-04-22 (snapshot: `docs/_archive/2026-04-22-pre-round-2/`)
**Target file:** `alpha_v3/docs/figma-mcp-template.md`
**Target section:** `## Building a block from Figma` step 2 (extend the bucket list) + new footnote or subsection referencing `RichTextBlock`.
**Evidence:** docs gaps 1, 2. R1 callout decision (richText-as-callout) validated the pattern; R1 also surfaced that `RichTextBlock` body is hardcoded left-aligned regardless of `sectionHeading.align`.
**Priority:** medium.

**Proposed edit (intent + content):**

Two coordinated changes:

**(a) Add 5th block-type bucket** to the current list (heroSplit / featureGrid / richText / "anything else → stop"):

> **Adjacent-but-degraded** — the frame's intent isn't a perfect match for any existing block, but one block is close enough to carry the headline + most content. Use that block for a best-effort render, file the specific missing fields in the queue's Schema gaps section, and mark the row `DONE-WITH-CAVEATS` with a pointer to the gap entries. **Known adjacent-degrade paths:** callout-intent → `block.richText` (loses card frame/icon/tone, and loses CTA unless `withCtas:true` ships — T1.1); single-axis tabbed-content → `block.featureGrid` (loses tab switching).

**(b) Add `RichTextBlock` gotchas footnote** (under the `block.richText` bucket or in a new "Block gotchas" subsection):

> `RichTextBlock` current behavior — confirmed via dogfood runs, pending composite fixes (see Tier 5 item T5.1):
> - Body content is hardcoded **left-aligned** regardless of `sectionHeading.align`. Choosing `align="center"` only affects the heading/subheading, not the rich-text body.
> - `HeadingGroup` always emits `<h2>` regardless of intent.
> - No `ctas[]` or `media` fields today (see Tier 1 item T1.1 for CTAs).

**Rationale:** the "adjacent-but-degraded" pattern is the right call for any mature block system — but only if it's documented. Without it, builders either refuse to ship or silently drop design elements. The gotchas footnote prevents identical rediscovery.

**Validation plan:** next integration session hitting a near-match block should use the degraded-render path with explicit gap logging, not freelance or skip.

**Apply:** after S1–S3. Can bundle with S1 since it's the same section.

---

## S6 — content-extraction-prompt.md: CTA-absent + per-item CTA/icon flags + CTA-placement pattern

**State:** Applied 2026-04-22 (snapshot: `docs/_archive/2026-04-22-pre-round-2/`)
**Target file:** `alpha_v3/docs/content-extraction-prompt.md`
**Target section:** § "Mapping Figma button styles" (end of CTA object section) + § "Block-specific fields" / `block.featureGrid` + new § "CTA placement pattern (SignalWire design convention)".
**Evidence:** docs gaps 3, 6, plus post-dogfood design-pattern observation — designer uses **card-level CTAs** (per-item affordances on featureGrid items, testimonial cards, callout cards), NOT Section CTAs, for everything except hero/closer blocks.
**Priority:** medium.

**Proposed edit (intent + content):**

Two parallel additions:

**(a) CTA-absent escape hatch** (§ "Mapping Figma button styles"):

> **If the target block schema has no `ctas[]` field:**
> Do not silently drop the CTA. Mark the seed with a `// TODO: CTA dropped — schema gap <ID>` comment and add to the queue's Schema gaps section naming the exact missing field. The CTA content + link data goes into the gap entry so the fix-forward can recover it.

**(b) Per-item CTA flag** (§ "Block-specific fields" / `block.featureGrid`, sibling to the existing icon flag):

> The schema does NOT include per-item CTAs or links on `featureGrid` items. If the design has "Learn More", arrow-links, or similar affordances on each item, **flag — do not invent the field in the seed**. Record the CTA content in the queue's Schema gaps section keyed to Tier 2 item T2.4.

**(c) CTA placement pattern** (new subsection near the top of the doc, before block-specific fields):

> **CTA placement convention (SignalWire design, confirmed 2026-04-22 dogfood):**
>
> - **Card-level CTAs are the default.** Items inside `featureGrid`, `testimonials`, `callout`, and similar grid/card structures carry their own CTAs (usually a "Learn More →" ghost-link affordance). Schema support is pending (Tier 2 items T2.4, T3.1, T3.2); flag and record until schemas ship.
> - **Section-level CTAs (`ctas[]`) are reserved for hero and closer blocks.** `block.heroSplit`, `block.heroCenter` (pending), and `block.richText` (post-T1.1) use `ctas[]` for the primary page-level conversion affordance.
> - Do NOT replace a card-level CTA with a Section-level CTA to "make it fit" — the information architecture differs. If the design uses card-level CTAs and the block's schema only supports Section-level CTAs, flag as a gap, not as a content-shape mismatch.
> - **Do NOT** remove or deprecate Section CTAs; they remain correct for hero/closer blocks.

**Rationale:** content-extraction-prompt already correctly flags missing icons; parallel rule for CTAs closes the second-most-common foot-gun. R1 barely avoided this; codifying prevents future near-misses. The (c) pattern subsection prevents a different-but-related failure mode: a builder seeing a card-level CTA and silently promoting it to a Section CTA to "make the seed valid" — which loses the information architecture even when the render might look similar.

**Validation plan:** next featureGrid-shape frame with per-item affordances → builder flags, doesn't drop.

**Apply:** any time. Low coupling with other entries.

---

## S7 — Candidate+fallback per round + DONE-WITH-CAVEATS example

**State:** Applied 2026-04-22 (snapshot: `docs/_archive/2026-04-22-pre-round-2/`)
**Target file:** `alpha_v3/docs/component-queue-template.md`
**Target section:** § "Round structure" (add optional "Candidate + fallback" sub-template) and § "Handoff summary" (add example).
**Evidence:** docs gaps 4, 5.
**Priority:** low-medium.

**Proposed edit (intent + content):**

Two additions:

**(a) Candidate + fallback per round** (optional sub-template for round definitions):

> When writing a round definition, prefer the **candidate + fallback + gap-file** pattern:
>
> - **Candidate:** the block type you expect to use.
> - **Fallback:** what to do if the candidate can't carry the design — typically "degrade to X + file gap Y" or "mark BLOCKED + file new-schema gap Y."
> - **Exit when:** the rendered block plus any filed gaps together capture the frame's intent — not "when the render is perfect."
>
> Example (from this repo's 2026-04-22 queue, R1):
>
> > Candidate: `block.richText` with center alignment.
> > Fallback: if the richText content schema can't express a bordered centered callout with a CTA, file a gap for a new `block.callout` and document the exact field missing — don't freelance a workaround.
> > Exit when: the callout renders on the target page; audit checklist passes; gap entry written.

**(b) DONE-WITH-CAVEATS handoff line format** (add to § "Handoff summary" examples):

> Format a DONE-WITH-CAVEATS line as: `- Frame <N> DONE-WITH-CAVEATS (seed: <path>; see schema gap <X>, composite gap <Y>, docs gap <Z>).` — one line per frame, caveats linked by gap ID rather than re-described. The gap sections are the audit trail; the handoff is the index.

**Rationale:** both patterns were exercised well in 2026-04-22 queue organically — formalizing them makes them the default, not the exception.

**Validation plan:** next queue file uses candidate+fallback natively; handoff summary uses the 1-line DONE-WITH-CAVEATS format.

**Apply:** any time.

---

## S8 — Prediction-discipline rule

**State:** Applied 2026-04-22 (snapshot: `docs/_archive/2026-04-22-pre-round-2/`)
**Target file:** `alpha_v3/docs/component-queue-template.md`
**Target section:** new subsection under § "Queue template" — rules for writing the `Notes` column.
**Evidence:** docs gap 13 + session-2 prediction-accuracy analysis (6/8 = 75%; 100% of wrong predictions were unhedged "clean, no new schema" notes).
**Priority:** medium-high. This one is strongly earned — two wrong predictions, both following the same pattern, both costing rework.

**Proposed edit (intent + content):**

Add a subsection titled **"Prediction discipline — writing the Notes column"**:

> The Notes column on each queue row is a bet on what the frame will contain. These bets are audited in the handoff summary (see prediction-accuracy tracking). Rule:
>
> **Every Notes entry must either (a) name the expected gap explicitly, or (b) mark `requires drill-in`. Never write unhedged "clean, no new schema" claims.**
>
> Examples:
>
> - ✅ "Likely splits into 2 blocks (logo marquee + comparison). Drill in first."
> - ✅ "Centered hero with code-block media; almost certainly surfaces `mediaPlacement=below` or `block.heroCenter` gap."
> - ✅ "Requires drill-in — Figma name says 'Contact Form' but screenshot shows a closer."
> - ❌ "Cleanest R3 entry, no new schema expected." (unhedged)
> - ❌ "heroSplit variant with code-block media." (unhedged simplicity claim)
>
> Rationale from 2026-04-22 dogfood: across 8 frames, 100% of wrong predictions fit the unhedged-simplicity pattern. All correct predictions either named gaps explicitly or hedged with drill-in. Intuition about "clean" frames is unreliable when media or layout composition is non-standard.

**Rationale:** this is a *rule the evidence wrote*, not speculation — the prediction-accuracy pattern is empirical, the fix is free (write one more clause in the notes), and it compounds with every future queue.

**Validation plan:** next integration session tracks prediction accuracy in handoff; if the rule holds, accuracy should climb toward 90%+. If it doesn't, the rule needs refinement.

**Apply:** recommended Thu with S1–S5 so next integration runs against the tightened system.

---

## S9 — Prediction-accuracy tracking in handoff

**State:** Applied 2026-04-22 (snapshot: `docs/_archive/2026-04-22-pre-round-2/`)
**Target file:** `alpha_v3/docs/component-queue-template.md`
**Target section:** § "Handoff summary" — add an explicit subsection template.
**Evidence:** docs gap 11. 2026-04-22 sessions tracked this organically; formalizing makes it a default handoff section.
**Priority:** low.

**Proposed edit (intent + content):**

Add to the handoff summary template:

> ### Prediction accuracy (this session)
>
> Per row, was the queue's block-type/gap prediction:
> - ✓ **accurate** (named the gap correctly OR "drill-in first" resolved cleanly),
> - ✗ **wrong** (missed gap, wrong block type),
> - ~ **partial** (got block type right but missed a gap, or vice-versa)?
>
> Running tally across all integrations: `<N>/M accurate (P%)`.
>
> Note the pattern of any misses (per S8: unhedged-simplicity claims are the common failure mode).

**Rationale:** prediction accuracy is a leading indicator of docs quality. If it trends down, the `Known-missing-schema patterns` list (S1) or the block-type buckets need updates. If it trends up, the docs are doing their job.

**Validation plan:** next two handoff summaries include this section; user can read across them to see the trend.

**Apply:** bundle with S7 + S8 (all three are component-queue-template edits).

---

## Application order (recommended)

Group by file for one-PR-per-file application:

**Thursday pre-Friday (ship with Tier 1 schema PR):**
- `figma-mcp-template.md` — **S1 + S3** (known-missing list + featureGrid fix). Highest leverage per unit of docs edit.
- `packages/sanity-schema/src/blocks/richText.ts` — Tier 1 T1.1 (withCtas:true). Not a docs change but bundles naturally for the "fix what's bleeding" pass.

**Early next week (before next integration):**
- `figma-mcp-template.md` — **S2 + S4 + S5** (drill-in rule + site chrome + degraded-but-adjacent). Can ship in one `figma-mcp-template.md` PR alongside S1 + S3 if convenient.
- `content-extraction-prompt.md` — **S6** (CTA flags).
- `component-queue-template.md` — **S7 + S8 + S9** (candidate+fallback + prediction discipline + accuracy tracking).

**After next integration (validation round):**
- Review which scratchpad entries actually stuck based on next-run evidence.
- Delete entries that proved correct; revise or reject ones that didn't.
- Surface any new docs gaps as fresh scratchpad entries.

---

## Rejection / revision history

*(Empty. Populate if an entry is revised mid-review or killed after apply.)*
