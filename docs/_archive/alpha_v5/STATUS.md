# alpha_v5 — Status

**alpha_v5 is now the canonical playbook source.** Future projects fork from here. alpha_v3 remains as a frozen historical snapshot (pre-Decisions-dogfood, pre-measurement-workflow); alpha_v4 was abandoned during integration uncertainty.

**Codified into this directory's playbook (`docs/`) as of 2026-04-25:**
- Decisions design-system token ingest (live in `packages/tokens/src/theme.css`)
- Measurement workflow at `docs/measured-fidelity-audit.md` — Playwright bundled-Chromium + Figma drill-in MCP + per-section diff scoring. Codified into `docs/figma-mcp-template.md` § "Stage 5+ — Measured fidelity audit" as a permanent post-build procedure.
- MCP-ceiling fallback ladder (`get_design_context` → `get_metadata` → child drill → `get_screenshot`) — already in `figma-mcp-template.md` step 0.
- Seed-file-first investigation rule — added to `figma-mcp-template.md` § "Stage 5+".
- Schema expansions (statGrid, videoContent, useCaseList, autoSwitchingCards + 4 schema extensions on existing blocks) — live in Site Foundry's `feat/decisions-dogfood-run` branch.

Future projects forking from alpha_v5 inherit all of the above by default.

The sections below are inherited from alpha_v3's status and describe alpha_v3's state — historical reference for general project context. New content specific to alpha_v5 lives in § "Closed experiment" + § "Codification log".

---

## Closed experiment — new-project bottom-up pipeline dogfood

Started 2026-04-22; closed 2026-04-24 after 4 sessions.

**Verdicts (post measured-fidelity-audit, 2026-04-25 session 4 close — supersedes prior estimates):**
- **Amortization PASS** on library-additions axis (`A_page2/A_page1 = 0/2 = 0`, well inside ≤0.5 threshold).
- **Wallclock demoted to footnote** — user clarified timing is irrelevant for unattended pipeline; library-additions is the sole amortization measure.
- **Visual fidelity — MEASURED (not estimated).** Original 100/98.5% Stage-5 numbers used color + typography-weight exemptions; honest rescore corrected those to ~65/70% (today) → ~91.5/94.7% (post-swap). Measurement pass over all 24 sections (`alpha_v5/docs/measured-fidelity-audit.md`, 4 sessions) reveals the rescore was ALSO ~50pp too generous — un-exempted only 2 of the 6 row-classes that fail at scale.
  - **Measured baseline (strict, ⚠=fail, 2026-04-25 audit):** Homepage **16.5%** (15/91), Platform **13.2%** (10/76). 0 sections at ≥5/7 on either page.
  - **Tier 1 PR landed (commit `6c7ebc8`, 2026-04-25):** Homepage **57.1%** (52/91, +40.7pp), Platform **53.2%** (41/77, +40.3pp). **Beats ~50% projection.** 4/24 sections now at ≥5/7 (Homepage 2 + 3, Platform 2 + 6).
  - **Realistic remaining roadmap:** ~75–80% post Tier-2 (3–4 days primitives — P2/P3/P5 next), ~85–90% post Tier-3 (1–2 wk block chrome + featured images), ~92–95% post Tier-4 (1 wk pipeline + content). **Roadmap is ~3 more weeks of focused fix work after Tier 1.**

**Next concrete action:** **Tier 2 PR** — P2 (`<Button shape='rectangular'>`) + P3 (`<Button variant='navy'>`) + P5 (tone-aware Button color). Combined leverage 54 across 9+6+3 sections. Projected to lift both pages from ~55% → ~75–80%. Effort ~3–4 days. Full ranked backlog at `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` § 9 (Tier 1 post-PR rescore) + § 4 (Tier 2 ranking).

**Audit pass complete 2026-04-25 (sessions 1–4):** 24/24 sections measured via Playwright bundled-Chromium + Figma drill-in MCP. Per-section diff docs in `alpha_v5/screenshots/baseline-2026-04-25/`. Cross-session log at `alpha_v5/screenshots/baseline-2026-04-25/SESSION-LOG.md`. Aggregation deliverables: corrected per-page rubric, cross-section gap heatmap (26 distinct patterns), categorized fix list ranked by leverage (4 tiers, top item T1 with score 69 affecting 23/24 sections), measured rescore replacing estimates in this file's queue § "Honest rescore". **Workflow proven valuable; recommend codifying into `figma-mcp-template.md` as a permanent Stage 5+ measurement procedure.**

Library delta across all sessions: 4 new blocks + 4 schema extensions + 1 heroCenter extend + 1 new statGrid = **2 amortization-test additions (sessions 1–2) + 8 completion additions (sessions 3–4)** on Site Foundry branch `feat/decisions-dogfood-run`.

Full retrospective: `alpha_v5/seeds/queues/2026-04-22-new-project-pipeline-queue.md` § "Retrospective — end of experiment" + § "Amortization verdict". Measurement evidence: `alpha_v5/library-coverage-ledger.md`.

Working files:

| File | Purpose |
|---|---|
| **`alpha_v5/RETROSPECTIVE-2026-04-25.md`** | **Synthesis-of-syntheses. Read first to catch up cold.** Calibration pattern, lessons learned, what-to-keep-vs-recalibrate, recommended forward sequence, alpha_v5 → alpha_v3 fold-in question. |
| `alpha_v5/seeds/queues/2026-04-22-new-project-pipeline-queue.md` | Pipeline progress — section maps, stage status, rubric scorecards, gap deltas, retrospective. |
| `alpha_v5/library-coverage-ledger.md` | Per-page addition counts, coverage %, amortization verdict. |
| `alpha_v5/pre-run-sanity-check.md` | 5-check pre-flight before Stage 1 runs. |
| `alpha_v5/session-prompts.md` | Kickoff / resume / retrospective + **measurement** + **aggregation** prompts + execution timeline. |
| **`alpha_v5/docs/measured-fidelity-audit.md`** | **Workflow doc — measurement pass that replaces Stage 5 estimation with empirical evidence (Playwright + drill-in MCP).** |
| `alpha_v5/PROJECT_DESIGN_NODES.md` | Decisions design system tokens (extracted via MCP) — canonical color/type/effect reference. |
| `alpha_v5/screenshots/baseline-2026-04-25/POC-FINDINGS.md` | PoC of the measurement workflow on AutoSwitchingCards. **Read this first** before running a measurement session — shows the output shape. |
| `alpha_v5/theme.css.draft` | Draft of the Decisions theme.css ingest (now shipped to Site Foundry; kept for reference + diff). |

**Primary deliverable:** working brand-accurate Homepage + Platform pages + amortization retrospective. NOT a gap list.

**Key measurement:** page 2 must add ≤ 0.5 × of what page 1 added across primitives / composites / blocks for the amortization thesis to pass. See ledger for exact thresholds.

**Next action:** run `pre-run-sanity-check.md`, capture Homepage + Platform Figma URLs, then begin Stage 1 of Page 1.

---

Living snapshot of where alpha_v3 stands (as inherited at snapshot time). Updated at the end of each working session. Pair with:

- `README.md` — project overview & layout
- `CONVENTIONS.md` — v2→v3 shape diff (authoritative field-name table)
- `IMPLEMENTATION-PLAN.md` — phased plan (strategic)
- This doc — where we are right now (tactical)

## Last updated

**2026-04-22 (evening)** — Round-2 re-run **queued**. Post-triage docs were tightened (9 scratchpad entries S1–S9 applied to `figma-mcp-template.md`, `component-queue-template.md`, `content-extraction-prompt.md`; pre-edit snapshots in `docs/_archive/2026-04-22-pre-round-2/`). Tier 1 + Tier 2 T2.3/T2.4 **schema** shipped (`richText.withCtas:true`; `featureGrid.items[].icon + .cta` as optional fields) — Site Foundry packages, `sanity-types` sync done, `FeatureGridBlock` React render deferred to T5.2. Fresh target page `signalwire-homepage-v2` bootstrapped in `site-foundry-dev`. Round-2 queue file at `seeds/queues/2026-04-22-signalwire-homepage-queue-v2.md` — next session reads it cold. Primary measurement: prediction-accuracy lift (target ≥90%, was 75%) + docs-edit stickiness per scratchpad entry.

**2026-04-22 (late)** — SignalWire homepage dogfood **closed**. 8 frames processed across 2 sessions (4 + 4); 7 applied to `signalwire-homepage`, 1 BLOCKED with schema gap filed. 53 ranked gap items surfaced across schema/composite/pipeline/token/docs layers. Full triage at `alpha_v3/gap-triage-2026-04-22.md`; docs-edit candidates staged in `alpha_v3/docs/_scratchpad/prompt-edits-candidates.md`. Prediction accuracy 6/8 (75%); rule codified: queue row notes must name gap explicitly OR mark "drill in first" (100% of misses were unhedged-simplicity claims).

**2026-04-22** — Phase 7 merged. SignalWire homepage integration planned; queue file `seeds/queues/2026-04-22-signalwire-homepage-queue.md` is the audit trail.

**2026-04-21** — Phase 7 (template UI buildout) complete. Primitives + composites + blocks shipped in `next-sanity-starter/packages/ui`; const-enum typing pattern established; dev catalogs with TOC scrollspy live. Token palette remains placeholder — real SignalWire swap scheduled Friday.

## Wider system picture

The full Figma-to-page pipeline has more stages than alpha_v3's scope. This section keeps the whole picture visible so "what's built vs. unbuilt" doesn't drift between chats.

### Stages

```
[Figma frame]
     ↓  (1) Figma MCP ingest
[MCP output: code hints, screenshot, tokens]
     ↓  (2) Frame → seed mapping         ← LLM-in-chat; no automation
[Seed JSON]
     ↓  (3) Seed → Sanity                 ← @site-foundry/connector-sanity
[pageBuilder entry on a Sanity page]
     ↓  (4) Render                         ← apps/web + Sanity queries
[Live page at localhost:3000/<slug>]
```

| Stage | Who runs it | Built? | Lives in |
|---|---|---|---|
| (1) MCP ingest | Figma MCP tool | ✅ external | n/a (Figma desktop / MCP server) |
| (2) Frame → seed | LLM-in-chat | 🟡 playbook only | `alpha_v3/docs/*` |
| (3) Seed → Sanity | Automated CLI | ✅ | `@site-foundry/connector-sanity` |
| (4) Render | Next.js + Sanity | ✅ (from starter) | `templates/next-sanity-starter/apps/web` |

### Explicitly unbuilt (all Site Foundry concerns)

- **Schema generation.** If a Figma frame needs a block type that doesn't exist (e.g., the SignalWire tabbed stat grid), today the LLM must flag and stop — no codegen path to a new `block.*` in `packages/sanity-schema`. Planned home: `@site-foundry/generator-next-sanity` (currently a 47-line stub).
- **Component generation.** Same for `packages/ui` React components and `packages/primitives`. No codegen; new ones must be hand-written.
- **Deterministic frame → seed.** Stage (2) above is an LLM reading the `docs/*` playbook. No code automates the mapping. Could be codified as a prompt-driven action inside a generator package, or a deterministic extractor with an LLM fallback for copy.
- **Reuse-vs-generate orchestration.** `generator-core`'s `actions` array lists the stages (`reuse-block` / `generate-schema` / `generate-query` / `generate-seed`) but doesn't execute them — it returns hardcoded descriptions. No matcher to decide "use existing block" vs. "need a new one."
- **Run orchestration.** `apps/operator-api` and `apps/cli` exist but don't call `sanityApplyConnector` or any generator. Health + placeholder plans only.
- **Evaluation.** `packages/evaluation-kit` is reserved — no screenshot diff, no before/after validation.

### Docs map

| Topic | File |
|---|---|
| How designers prep Figma for the pipeline | `alpha_v3/docs/designer-checklist.md` |
| How an LLM maps Figma MCP → primitives + tokens | `alpha_v3/docs/figma-mcp-template.md` |
| How an LLM writes a seed JSON | `alpha_v3/docs/content-extraction-prompt.md` |
| How to batch multiple Figma frames in one session | `alpha_v3/docs/component-queue-template.md` |
| SignalWire homepage dogfood round 1 — raw queue + handoffs | `alpha_v3/seeds/queues/2026-04-22-signalwire-homepage-queue.md` |
| SignalWire dogfood — **ranked gap triage** | `alpha_v3/gap-triage-2026-04-22.md` |
| Staged prompt-edit candidates (now Applied post-round-1) | `alpha_v3/docs/_scratchpad/prompt-edits-candidates.md` |
| Pre-round-2 doc snapshots (revert source if edits break) | `alpha_v3/docs/_archive/2026-04-22-pre-round-2/` |
| **Round-2 re-run queue (start here for next integration session)** | `alpha_v3/seeds/queues/2026-04-22-signalwire-homepage-queue-v2.md` |
| v2→v3 field shape diff | `alpha_v3/CONVENTIONS.md` |
| alpha_v3 phased history + "Out of scope" list | `alpha_v3/IMPLEMENTATION-PLAN.md` (§ end) |
| Site Foundry's intended architecture | `project/site-foundry/ARCHITECTURE.md` |
| Site Foundry's own "what's not built" statement | `project/site-foundry/ARCHITECTURE.md` § "Figma-to-Code Boundary" |

### Where the LLM-in-chat lives today

Stage (2) is the **only** step requiring an LLM per-run. The `docs/*` files are prompts for that LLM. Everything downstream (SeedArtifact → connector-sanity → render) is deterministic. That means automating stage (2) later — prompt-driven agent, deterministic extractor, or hybrid — won't invalidate the work done so far. The seed envelope (`SeedArtifact` in `registry-contracts`) is the stable boundary.

## Where we are

Phases 0–6 complete against the `site-foundry-dev` Sanity dataset (project `puqewi35`).

**Code lives in Site Foundry now.** The `scripts/` dir that held the apply pipeline has been deleted; alpha_v3 keeps only seeds and docs. The `pnpm apply` / `pnpm bootstrap-page` / `pnpm verify` scripts invoke Site Foundry's `@site-foundry/connector-sanity` via `tsx` against a relative path. See the migration map below.

Four blocks on `staging-homepage` — all idempotent (same `_key` on re-apply, no duplicates):

| Block type          | Figma node   | Block key        | Seed                                     | Source             |
| ------------------- | ------------ | ---------------- | ---------------------------------------- | ------------------ |
| `block.heroSplit`   | `757:6704`   | `fa8b45b52495`   | `seeds/hero-split-example.json`          | curated            |
| `block.richText`    | `2565:59056` | `fea44a4e5ef7`   | `seeds/rich-text-example.json`           | curated            |
| `block.featureGrid` | `757:6349`   | `f4c25c32dd02`   | `seeds/feature-grid-example.json`        | curated            |
| `block.featureGrid` | `757:5430`   | `ff61f9595674`   | `seeds/ai-voice-agents-example.json`     | Figma MCP ingest   |

Target page: `staging-homepage` (bootstrapped via `pnpm bootstrap-page`).

## Phase 6 — Site Foundry migration map

| alpha_v3 path (deleted)                                      | Site Foundry path (new/updated)                                                    |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `scripts/sanity-kit/markdownToPortableText.ts`               | `packages/sanity-kit/src/markdownToPortableText.ts`                                |
| `scripts/sanity-kit/imageUpload.ts`                          | `packages/sanity-kit/src/imageUpload.ts`                                           |
| `scripts/sanity-kit/sanitySafety.ts`                         | `packages/sanity-kit/src/sanitySafety.ts`                                          |
| `scripts/connectors-sanity/applySeedArtifact.ts`             | `packages/connector-sanity/src/apply.ts` (+ thin CLI in `cli.ts`)                  |
| `scripts/connectors-sanity/bootstrapTargetPage.ts`           | `packages/connector-sanity/src/bootstrap.ts` (+ thin CLI in `cli-bootstrap.ts`)    |
| `scripts/connectors-sanity/verifyPageState.ts`               | `packages/connector-sanity/src/verify.ts` (CLI folded into `cli.ts --verify`)      |
| inline `SeedFile`/`SeedLink`/`SeedCta`/`SeedImageSpec` types | `packages/registry-contracts/src/index.ts` (`SeedArtifact`/`SeedLink`/…)           |
| (implicit contract)                                          | `packages/connector-core/src/index.ts` → `Applicable<TInput, TResultPayload>`      |

`sanityApplyConnector` in `connector-sanity/src/apply.ts` is the orchestrator-facing `Applicable<SeedArtifact, {page, blockKey, blockType, block}>` object. `applySeedArtifact` remains the full-featured internal function (accepts client/target/seedDir overrides) that CLIs call directly.

No workspace integration for alpha_v3 — it stays a standalone single-package project. Its `tsx ../project/site-foundry/packages/connector-sanity/src/cli.ts` invocation relies on Node's module resolution walking up from the cli.ts location to find Site Foundry's per-package `node_modules/@site-foundry/*` symlinks (verified present after `pnpm install` in site-foundry).

## Phase 7 — template UI buildout

Lands the `packages/ui` surface that every block renders through, plus dev catalogs that exercise every variant. Everything lives under `templates/next-sanity-starter/` in Site Foundry; alpha_v3 consumes it at apply time only (Sanity-side), not at build time.

### Shipped

| Layer | Count | Notes |
|---|---|---|
| Primitives | 11 | `Stack`, `Grid`, `Container`, `Heading`, `Text`, `Eyebrow`, `Button`, `Badge`, `Image`, `Card`, `Accordion`, `Marquee` |
| Composites | 6 | `Section`, `SectionHeading`, `SectionCta`, `BaseBlock`, `CtaButton`, `HeadingGroup` |
| Blocks | 3 | `HeroSplitBlock`, `FeatureGridBlock`, `RichTextBlock` — all on const-enum props |
| Dev pages | 2 | `/dev/primitives` (12 sections), `/dev/components` (4 sections) — sticky-sidebar TOC scrollspy on `lg+`, chip wrap on mobile |
| Tokens | 1 | `packages/tokens/src/theme.css` placeholder palette; Tailwind v4 `@theme` consumes the CSS vars |

### Const-enum typing pattern

Every primitive ships a `*-types.ts` with a paired `const` + `type` declaration:

```ts
export const StackGap = { NONE: 'none', XS: 'xs', SM: 'sm', /* ... */ } as const;
export type  StackGap = (typeof StackGap)[keyof typeof StackGap];
```

Consumer code has two valid forms — string literal and enum reference — but the enum is the house style:

```tsx
<Stack gap={StackGap.MD}>   // preferred
<Stack gap="md">             // valid, flagged in review
```

Enum key casing is SNAKE_CASE regardless of value: `XL2 = '2xl'`, `R4_3 = '4/3'`, `PALE_BLUE = 'pale-blue'`. `Object.values(X)` returns the typed value list for iteration.

### Dev catalog scrollspy

`apps/web/app/dev/_components/DevToc.tsx` — `'use client'` IntersectionObserver with `rootMargin: '-20% 0px -70% 0px'` to highlight the section closest to viewport top. Sticky sidebar on `lg+`; horizontal chip wrap on narrower screens. `cx` is inlined (UI package doesn't export `./lib/cx`).

### Token status

`packages/tokens/src/theme.css` is a deliberate placeholder (dark-navy + teal) so the starter boots with something acceptable. Real SignalWire tokens swap in on Friday — the swap only edits hex values, not names or structure. Primitives + composites are untouched by that swap.

## Proven

- Markdown → Portable Text (headings, lists, blockquote, inline mailto/href links with `markDefs`).
- `sectionHeading.subheading` auto-wrap for bare strings.
- `imageWithAlt` upload with required-alt validation (hero-split exercised this once with a picsum URL).
- Stable `_key`s from `md5(figmaNodeId)` — no duplicates on re-run.
- Upsert (`unset` → `append`) on re-apply. Verified page still has exactly 3 blocks after a full re-run of all three seeds.
- Dry-run path validates shapes without network side effects (added `mockImageFields` / `mockNestedImageFields`).

## Untested / gaps

- `link.kind="page"` slug resolution (only `href` + `email` links used so far in seeds).
- `confirmProductionWrite` gate (never exercised against a `production` dataset).
- Nested images (hero-split had only one top-level image; no nested-array images yet).
- Orchestrator-driven `sanityApplyConnector.apply(seed, context)` path — implemented and typechecked, but only the CLI path (`applySeedArtifact` direct) has been exercised against live Sanity.

## Known quirks

- **Re-apply reorders:** `unset` + `append` moves the updated block to the end of `pageBuilder`. Fine for editors (drag-reorder in Studio); could be patched to "set by index" later if needed.
- **Env file location:** apply script reads `process.env` directly; no auto-loading. Canonical env lives at `/home/brock/Design-to-code-chats/project/site-foundry/.env`. Invoke pattern:
  ```bash
  set -a && source /home/brock/Design-to-code-chats/project/site-foundry/.env && set +a && pnpm apply <seed>
  ```
- **Three env namespaces for the same Sanity project.** Each consumer reads a different prefix:
  | Consumer       | File                              | Var prefix              |
  | -------------- | --------------------------------- | ----------------------- |
  | Studio (Vite)  | `apps/studio/.env`                | `SANITY_STUDIO_*`       |
  | Web (Next)     | `apps/web/.env.local`             | `NEXT_PUBLIC_SANITY_*`  |
  | alpha_v3 apply | sourced from `site-foundry/.env`  | `PUBLIC_SANITY_*`       |
  Same values (`puqewi35` / `site-foundry-dev`), three files. When setting up a fresh clone, all three must exist or the respective app fails with a different error flavor (Studio: "projectId missing," Web: "Configuration must contain projectId," apply: "PUBLIC_SANITY_PROJECT_ID is required").

## Starter bugs found (owed to colleague)

All prevented the starter from booting out of the box. Fixed in place for now; worth reporting upstream.

1. **Missing peer dep (Studio).** `apps/studio/package.json` needed `styled-components: ^6.1.15` added to `dependencies` — `sanity@5.21.0` requires it as a peer but the starter didn't declare it.
2. **Nonexistent icon import.** `packages/sanity-schema/src/blocks/featureGrid.ts` imported `GridIcon` from `@sanity/icons`, which doesn't exist in `@sanity/icons@3.7.4`. Replaced with `ThLargeIcon`.
3. **Missing tailwindcss in ui package (Web).** `packages/ui/src/styles/globals.css` has `@import "tailwindcss";` but `packages/ui/package.json` didn't declare `tailwindcss`. Turbopack resolves tailwindcss relative to the CSS file's directory (`packages/ui/src/styles/`), and pnpm's isolated hoisting meant it couldn't see the web app's copy. Added `tailwindcss: "catalog:"` to the ui package's devDependencies.
4. **Wrong turbopack workspace root + deprecated config key (Web).** `apps/web/next.config.ts` used `experimental.reactCompiler` (moved to top-level `reactCompiler` in Next 16), and no `turbopack.root` was set. Next detected two pnpm-workspace files in the parent chain (outer `project/site-foundry/` and inner starter) and picked the OUTER as workspace root — scoping turbopack's module resolution outside the starter's `node_modules` so the symlinked `tailwindcss` from fix #3 couldn't be found. Fixed by setting `turbopack.root` explicitly to the starter root via `path.resolve(dirname, '../..')`, and moving `reactCompiler` out of `experimental`.

## Next steps (ordered by value/ease)

Full ranked list lives in `alpha_v3/gap-triage-2026-04-22.md`. Summary:

1. **Tier 1 (ship before Friday, trivial):** (a) `block.richText` → `withCtas: true` — 1-line schema change at `packages/sanity-schema/src/blocks/richText.ts:5`; (b) `figma-mcp-template.md` featureGrid doc/code contradiction — 2-line edit (scratchpad entry **S3**).
2. **Pre-next-integration docs work:** apply scratchpad entries **S1 + S3** Thu (known-missing-schema patterns subsection + featureGrid fix) — lets any Thu re-runs benefit. Apply **S2 + S4–S9** early next week as one or two doc PRs. See `alpha_v3/docs/_scratchpad/prompt-edits-candidates.md`.
3. **Friday 2026-04-24 token swap.** Replace `packages/tokens/src/theme.css` with real SignalWire token values (hex-only per prior scoping). Re-verify `/dev/primitives`, `/dev/components`, and all 8 applied blocks on `/signalwire-homepage`.
4. **Tier 2 schema extensions (next sprint):** `block.heroCenter` (or `heroSplit.mediaPlacement=below + textAlign=center`) — highest fix-leverage (4/5 R3 hero-shaped frames); `block.tabbedFeatures` (3/3 dogfood runs, ship nested with `block.accordion` + `codeSample` field); `featureGrid` items gain `icon` + `cta` fields.
5. **Tier 3 new blocks (by fix-leverage):** `block.callout` (2/2 uses) → `block.testimonials` (1/1 + placeholder copy) → `block.comparison` (1/1 designer-reusable) → `block.logoMarquee` (BLOCKER for frame 4a). Full sequencing in triage doc.
6. **Site chrome architecture (Tier 4):** settings singleton + `<Navbar>` / `<Footer>` composites + layout wire-up. 2/2 dogfood runs surfaced this.
7. **Report starter bugs to colleague.** Four small diffs, high signal — the starter doesn't boot as-shipped (pre-Phase 7 fixes, see "Starter bugs found" below).
8. **Fill remaining connector gaps.** `link.kind="page"` seed, nested-array images, production-gate dry-run.
9. **Exercise `sanityApplyConnector` via orchestrator.** Wire a real caller (likely `generator-next-sanity` or `operator-api`) so the `Applicable` path isn't just type-checked but actually executed against Sanity.
10. **Pre-existing TS errors.** `app/api/revalidate/route.ts` (Next 16 `revalidateTag` signature), `sanity/lib/loaders.ts` (generic constraint), two PortableText `TypedObject` strictness issues in `BlockRenderer` / `RichTextBlock` / `HeadingGroup`. All untouched by Phase 7. Starter-side cleanup.

## Key files (alpha_v3 root)

```
seeds/
├── hero-split-example.json
├── rich-text-example.json
├── feature-grid-example.json
├── ai-voice-agents-example.json          # Figma MCP ingest (SignalWire 757:5430)
├── ai-voice-agents-mapping-notes.md      # Figma→seed mapping gaps (Phase 5)
└── content/rich-text-sample.md
docs/
├── figma-mcp-template.md
├── content-extraction-prompt.md
├── component-queue-template.md
└── designer-checklist.md
```

Code lives in Site Foundry — see the migration map above.

## Scripts (root package.json)

All three delegate to `@site-foundry/connector-sanity` via `tsx` against a relative path:

- `pnpm apply <seed> [--target <page-id>] [--dry-run]` — apply a seed
- `pnpm bootstrap-page [--id <id>] [--title <title>]` — create/replace a target page
- `pnpm verify [--target <page-id>]` — print the page's `pageBuilder` block list

## Scope boundary

alpha_v3 is now a **seed library + docs shelf**. The Sanity-apply slice it used to host lives in Site Foundry's `packages/sanity-kit` and `packages/connector-sanity`. Figma ingest, schema codegen, UI component codegen, and run orchestration also belong to Site Foundry.
