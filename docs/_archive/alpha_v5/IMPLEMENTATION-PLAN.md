# Implementation Plan — alpha_v3 into Site Foundry

This plan is **phased, not timed**. Each phase has explicit entry criteria, work items, exit criteria, and notes. Phases run roughly in order but can overlap where items are independent.

The goal of the plan is one narrow end-to-end path:

> One Figma node → one seed artifact → one `block.heroSplit` rendered on a live Sanity page on the `next-sanity-starter` shape.

Everything after that is coverage, not net-new capability.

---

## Phase 0 — Prerequisites

Things that must be true before any v3 code runs. Work we do *not* own, but that we depend on.

### Entry criteria

- alpha_v2 exists and the seeder pattern is understood (it does).
- `project/site-foundry/` repo is checked out locally (it is).
- `project/Site Foundry/` architecture docs have been read (they have).

### Work items

- **P0.1 — Verify Site Foundry workspace installs.**
  - Run `corepack pnpm install` inside `project/site-foundry/`.
  - Run `corepack pnpm typecheck` — expect clean pass.
  - Run `corepack pnpm smoke:registry` and `corepack pnpm smoke:generate`.
  - Log any failures into a Site Foundry issue, not alpha_v3.

- **P0.2 — Provision a Sanity dev project for testing.**
  - Either reuse the existing Decisions / staging project, or create a fresh one for Site Foundry experiments.
  - Capture `projectId`, `dataset`, and a write token (scoped to the dev dataset).
  - Confirm the `next-sanity-starter` studio (`apps/studio`) boots against it and shows the page builder with `block.heroSplit`, `block.featureGrid`, `block.richText` registered.

- **P0.3 — Confirm the pageBuilder field name.**
  - Current assumption in the seeder: the target document holds its blocks in a field called `pageBuilder` (inherited from v2).
  - Verify in `packages/sanity-schema/src/documents/page.ts` (or equivalent). If it's `blocks`, `content`, or something else, the seeder's patch paths need updating in Phase 2.

- **P0.4 — Confirm the link-resolution strategy.**
  - For `link.kind === "page"`, decide: does the seed author carry a slug, a Sanity `_id`, or a Studio-facing placeholder?
  - Default assumption: seeds carry a slug; the connector resolves at apply-time. Document the decision in `CONVENTIONS.md` Section 2.

### Exit criteria

- Studio boots against a real dataset with an empty page visible.
- A write token exists and the dataset env vars are captured somewhere safe (not committed).
- The pageBuilder field name is confirmed and matches the seeder.

### Notes

- Do **not** commit real project IDs or tokens to alpha_v3. Use `.env.local` or environment variables scoped to the shell session.
- If the starter's schema shifts during this phase, update `CONVENTIONS.md` rather than forking logic in the seeder.

---

## Phase 1 — Port sanity-kit utilities

Move the three utilities into a shape that can be dropped into `packages/sanity-kit` later, but that also runs standalone from `alpha_v3/scripts/`.

### Entry criteria

- Phase 0 complete.

### Work items

- **P1.1 — `markdownToPortableText.ts`.**
  - Copy from `alpha_v2/scripts/utils/markdown-to-portable-text.ts` unchanged.
  - Convert `markdown-to-portable-text` filename to camelCase `markdownToPortableText.ts` (matches the Site-Foundry package naming).
  - Keep the same supported subset: h1–h4, paragraphs, bullet/numbered lists with nesting, blockquote, inline bold/italic/code/strike/link.
  - No behavior changes.

- **P1.2 — `imageUpload.ts`.**
  - Copy from `alpha_v2/scripts/utils/image-upload.ts`.
  - **Change the emitted shape** from `{ _type: "image", asset, alt? }` to `{ _type: "imageWithAlt", asset, alt, caption? }`. Alt is required; throw a clear error in `resolveImageFields` / `resolveNestedImageFields` when a seed is missing `alt`.
  - Keep the content-hash cache (`.cache/asset-map.json`).
  - Keep both helpers: `resolveImageFields` (top-level) and `resolveNestedImageFields` (arrays).

- **P1.3 — `sanitySafety.ts`.**
  - Copy from `alpha_v2/scripts/utils/sanity-safety.ts`.
  - Remove the hard-coded default `projectId: 'puqewi35'`. Require `PUBLIC_SANITY_PROJECT_ID` to be set; fail loudly otherwise.
  - Update the dataset export helper's `cwd` from `studio/` (v2's flat layout) to `apps/studio/` (Site Foundry's monorepo layout). Actually — for standalone runs from alpha_v3, leave `cwd` configurable via param; default to `process.cwd()`.
  - Everything else (production gate, interactive confirm, auto-backup) unchanged.

### Exit criteria

- The three utilities run under `tsx` against a dev dataset.
- A contrived image upload through `uploadImage()` returns an `imageWithAlt` shape.
- A contrived markdown string through `markdownToPortableText()` produces a valid Portable Text array.

### Notes

- Resist the urge to introduce a new abstraction here. These three files exist as three files for a reason — each one is a single concern and gets imported separately.
- If we want a single top-level `index.ts` barrel for the eventual `packages/sanity-kit`, add it in Phase 6 when the package actually exists.

---

## Phase 2 — Implement `applySeedArtifact`

Rebuild the page-seeder as a single connector-shaped function that takes a seed + a Sanity client and applies the block to a target page.

### Entry criteria

- Phase 1 complete.
- Seed envelope shape finalized in `CONVENTIONS.md` Section 6.

### Work items

- **P2.1 — Entry signature.**
  - Export `applySeedArtifact(opts)` where `opts` includes `client`, `seed`, `dryRun`, `target` (page override), and a `logger` hook.
  - Return a structured result: `{ status: "applied" | "skipped" | "dry-run", blockKey, mode: "insert" | "update", page }`.
  - This is the shape the Site Foundry `connector-sanity.apply()` action will wrap.

- **P2.2 — Seed validation.**
  - Validate `blockType` starts with `block.` (reject unnamespaced types with a clear error).
  - Validate every image field declared in `images.topLevel` / `images.nested` has `alt` present.
  - Validate `fields.ctas` (if present) is an array, every item has `_type: "cta"`, and every item's `link.kind` is one of the allowed values.
  - Validate `fields.backgroundTone` and `fields.spacing` against the enum lists (reject unknown values, don't silently pass through).
  - Validation failures throw; the connector never half-writes.

- **P2.3 — Rich-text resolution with nested paths.**
  - Support `richText` entries like `"sectionHeading.subheading"` — walk the dot-path into `fields`, replace the string with PT blocks.
  - Support the `file:` prefix (loads markdown from disk relative to the seed file) exactly as v2.
  - When `subheading` is provided as a plain string (no richText declaration), auto-wrap in a single-paragraph PT block at apply-time — write to `CONVENTIONS.md` that this is the behavior.

- **P2.4 — Image resolution.**
  - Call `resolveImageFields` for `images.topLevel`.
  - Call `resolveNestedImageFields` for each entry in `images.nested`.
  - No longer has a `sectionImages` branch (removed in v3; see `CONVENTIONS.md` Section 6).

- **P2.5 — Link resolution.**
  - For every CTA with `link.kind === "page"` and a slug in `link.page`, resolve the slug to a Sanity `_id` via a GROQ query, then replace with `{_type: "reference", _ref: id}`.
  - If the slug doesn't resolve, throw with a clear message naming the slug and the CTA `text` for debuggability.

- **P2.6 — Block assembly.**
  - Build the block: `{ _key: stableKey(figmaNodeId), _type: seed.blockType, ...seed.fields }`.
  - Apply `ensureArrayKeys` to `fields.ctas` and any other inline-object arrays.
  - No more top-level `sectionCta` or `sectionSettings` merging — fields are pre-flattened in the seed.

- **P2.7 — Patch the page.**
  - Check that the target page exists (published or draft `drafts.<id>`).
  - Check for an existing block with the same `_key`.
  - If exists: `unset` the old one, then `append`.
  - If not: `setIfMissing({pageBuilder: []}).append('pageBuilder', [block])`.
  - Use the confirmed pageBuilder field name from P0.3.
  - Honor `dryRun`: return the assembled block without patching.

- **P2.8 — CLI wrapper (for standalone runs).**
  - Keep a thin `scripts/connectors-sanity/applySeedArtifact.ts` that parses argv (`--target`, `--dry-run`, seed path) and calls `applySeedArtifact(...)`.
  - This is disposable — when Site Foundry's CLI wraps it, the wrapper goes away.

### Exit criteria

- `tsx scripts/connectors-sanity/applySeedArtifact.ts seeds/hero-split-example.json --dry-run` prints a valid `block.heroSplit` with resolved images and a PT-wrapped subheading.
- Running without `--dry-run` writes the block to the target page.
- Re-running without any changes updates the same block (idempotent).
- All validation errors surface with a readable message naming the offending field.

### Notes

- The seeder runs outside the generator's plan/run contract for now. Once Site Foundry has the generation-run contract wired, `applySeedArtifact` gets called with `runId` and emits run events — that's a Phase 6 concern, not here.
- We're deliberately not implementing schema-aware validation (reading the live Sanity schema and diffing the seed against it). That's a future Site Foundry capability; for now, enum-list validation and structural checks are sufficient.

---

## Phase 3 — First end-to-end on `block.heroSplit`

One real Figma frame → one seed → one visible block in Studio.

### Entry criteria

- Phase 2 complete.
- A target page exists in the Sanity dev dataset with a known ID.
- A designer-ready Figma frame for a hero section exists.

### Work items

- **P3.1 — Pull Figma MCP for the hero frame.**
  - `get_design_context` on the desktop node.
  - `get_design_context` on the mobile node (if split).
  - `get_variable_defs` to surface token names.

- **P3.2 — Write `seeds/hero-split-example.json` for the real frame.**
  - Follow `docs/content-extraction-prompt.md` (updated in Phase 5).
  - Fill in `sectionHeading`, `description`, `media`, `mediaPlacement`, `ctas[]`, `backgroundTone`, `spacing`.
  - Declare `images.topLevel: ["media"]`.
  - Declare `richText: ["sectionHeading.subheading"]` if the subheading has any rich formatting.

- **P3.3 — Apply.**
  - `tsx scripts/connectors-sanity/applySeedArtifact.ts seeds/hero-split-example.json --dry-run` first.
  - Inspect output. Fix any seed errors.
  - `tsx scripts/connectors-sanity/applySeedArtifact.ts seeds/hero-split-example.json` for real.
  - Open Studio, confirm the block appears with correct content.
  - Run `apps/web` in dev mode against the dataset, confirm the block renders with expected primitives.

- **P3.4 — Record findings.**
  - Any seed-shape surprises (things the prompt didn't tell us to extract, things the schema required that we missed) — update `docs/content-extraction-prompt.md`.
  - Any seeder bugs — fix and bump `CONVENTIONS.md` if behavior changed.

### Exit criteria

- One real hero is visible in both Studio and `apps/web` dev preview, sourced entirely from seed.
- The round-trip is idempotent — re-running the seed produces the same block with no duplicates.

### Notes

- This phase is a learning phase, not a delivery phase. Every surprise is evidence the earlier docs need clarification.
- If the first pass takes multiple tries, that's normal — don't treat it as a blocker.

---

## Phase 4 — Coverage for `block.richText` and `block.featureGrid`

Extend the happy path to the other two blocks currently registered in Site Foundry.

### Entry criteria

- Phase 3 complete and the hero round-trip is idempotent.

### Work items

- **P4.1 — `block.richText` coverage.**
  - Use `seeds/rich-text-example.json` + `seeds/content/rich-text-sample.md` as the starting point.
  - Run end-to-end. Verify PT is stored correctly in Sanity (open raw JSON in Studio).
  - Verify the `RichTextBlock` UI component renders it.
  - If any markdown constructs don't survive, either extend `markdownToPortableText.ts` or document them as unsupported in `CONVENTIONS.md` Section 8.

- **P4.2 — `block.featureGrid` coverage.**
  - Use `seeds/feature-grid-example.json` as the starting point.
  - Exercise the `items[]` array — the schema requires min 1, max 6, and each item has `title` as required.
  - Verify `ensureArrayKeys` produces stable keys for each item.
  - If we need image support inside items (feature icons), confirm `schema` allows it. Current schema has `{eyebrow, title, description}` only — icons would need a schema extension.

- **P4.3 — Mixed page.**
  - Build a page with hero + richText + featureGrid applied in sequence from three separate seeds.
  - Verify order in `pageBuilder` array matches apply order.
  - Verify each block maintains its own `_key` and updates idempotently.

### Exit criteria

- All three currently-registered block types have a working seed + apply round-trip.
- A mixed page builds and renders correctly end-to-end.

### Notes

- If either block type's shape surprises us in practice, `CONVENTIONS.md` Section 1 is where the mapping table gets updated.
- Do not add new block types to Site Foundry's schema here — that's the colleague's territory. File requests in a tracking doc.

---

## Phase 5 — Documentation for operators

Make the seed-authoring workflow self-serve for anyone who knows the Site Foundry conventions.

### Entry criteria

- Phase 4 complete — we know which block shapes actually work.

### Work items

- **P5.1 — Update `docs/figma-mcp-template.md`.**
  - Fill in the Site Foundry-specific `[FILL IN]` slots: Next.js 15 + Sanity + Tailwind CSS.
  - Replace the component checklist with primitives from `packages/primitives` and blocks from `packages/blocks`.
  - Add a "Known registered blocks" section referencing `block.heroSplit`, `block.featureGrid`, `block.richText` — so the prompt doesn't suggest ones that don't exist.

- **P5.2 — Update `docs/content-extraction-prompt.md`.**
  - Rewrite the field extraction rules for v3: namespaced blockType, ctas array, split tone/spacing, imageWithAlt, sectionHeading changes.
  - Update all four example seeds to use v3 shapes.
  - Update the checklist (bottom of the file) to match v3 constraints.
  - Add a new rule for rich-text subheadings: detect inline links or emphasis in the subheading text; if present, declare `sectionHeading.subheading` in `richText`.

- **P5.3 — Port `docs/designer-checklist.md`.**
  - Copy largely as-is — the guidance is project-agnostic.
  - Update any references to "your project" to be Site Foundry-aware.
  - Add a note about imageWithAlt: every image in Figma must have a descriptive alt text somewhere accessible to the extractor (either as a Figma layer name, a frame caption, or a documented convention).

### Exit criteria

- A second operator (or the colleague) can follow the docs end-to-end to build a new page from a Figma frame without asking us questions.

### Notes

- Don't skip writing these docs "because we know the system." Future-us is a second operator.
- If the docs get long, factor into smaller files — don't make them unreadable to preserve file count.

---

## Phase 6 — Integrate into Site Foundry packages

Copy the working code into Site Foundry's actual package structure.

### Entry criteria

- Phases 1–5 complete.
- Colleague has either confirmed the target package layout or is ready to pair on it.
- Site Foundry's generator-core / connector-core contracts are stable enough to wire into.

### Work items

- **P6.1 — Create `packages/sanity-kit`.**
  - New workspace package in `project/site-foundry/packages/sanity-kit/`.
  - Move the three utilities in. Suggested layout:
    - `src/markdown.ts` (was `markdownToPortableText.ts`)
    - `src/assets.ts` (was `imageUpload.ts`)
    - `src/client.ts` (was `sanitySafety.ts`)
    - `src/index.ts` — barrel export
  - Add a minimal `package.json` with `@sanity/client` as a dependency.
  - Run `corepack pnpm typecheck` at the workspace root to confirm it compiles.

- **P6.2 — Create `packages/connector-sanity`.**
  - New workspace package in `project/site-foundry/packages/connector-sanity/`.
  - Move `applySeedArtifact` in.
  - Implement against the connector contract (`packages/connector-core`): `capability` declarations, `testConnection`, `apply`, etc.
  - `apply` takes the artifact path (the seed JSON), not the seed object — the connector reads + validates + applies.

- **P6.3 — Wire to `generator-next-sanity`.**
  - When the generator produces a seed artifact as part of a run, the run's apply phase calls `connector-sanity.apply(artifactPath)`.
  - Seed artifacts should be emitted under the run's artifact directory, not hand-written from `alpha_v3/seeds/` anymore.

- **P6.4 — Expose via operator API / CLI.**
  - `POST /runs/:id/apply` (operator API) → triggers connector apply for each artifact.
  - `sf apply <runId>` (CLI) → same, from the shell.
  - Status shows up in the dashboard when that app exists.

- **P6.5 — Delete `alpha_v3/scripts/` once Site Foundry's version runs green.**
  - Keep `alpha_v3/seeds/*.json` as reference examples until the generator emits equivalents.
  - Keep `alpha_v3/docs/*.md` until their content is integrated into Site Foundry's `docs/` or connector prompts.
  - Mark the retired scripts in `alpha_v3/README.md` with a clear "moved to `packages/sanity-kit` / `packages/connector-sanity` in Site Foundry as of <date>" note.

### Exit criteria

- A Site Foundry CLI command runs: `sf apply <runId>` and the run's seed artifacts land as blocks on the target Sanity page.
- alpha_v3 is effectively archival — its scripts are superseded, its docs are linked from Site Foundry.

### Notes

- This phase is where the generation-run contract, artifact paths, and connector contract get real tests. Expect friction at the seams.
- Resist over-abstracting on day one. If the connector can only apply seeds (not schema, not components), that's fine — split concerns later.

---

## Cross-cutting concerns

### Idempotency

Every phase preserves v2's idempotency guarantee: re-applying a seed updates the same block, never duplicates. The `stableKey(figmaNodeId)` hash is the load-bearing bit. If we ever derive keys a different way, flag it in `CONVENTIONS.md` Section 7 and plan a migration pass for existing pages.

### Backups

Production writes always take a backup first (via `sanitySafety.ts`). Do not disable this for "fast iteration" unless you've explicitly scoped the dataset to `development`. The production gate is not a performance nit — it's the thing that keeps a bad seed from nuking live content.

### Error handling

Prefer hard failures over silent drift. If a seed has an invalid enum value, throw at validation — don't pass through and let Sanity accept unknown data. If a page doesn't exist, throw — don't create it silently. The seeder is called from a run that's tracked; errors surface as run failures, not half-written pages.

### Versioning

When `CONVENTIONS.md` Section 6 (the envelope) changes in a breaking way, bump a `schemaVersion` field in seed files. The connector rejects unknown versions. We don't have this yet — add in Phase 6 when the generator starts emitting seed artifacts programmatically.

### Rollback

If a seed apply corrupts content, the backup in `backups/` restores from before. There is no per-block rollback — the granularity is dataset-wide. Plan accordingly for production applies.

---

## Out of scope

Things alpha_v3 explicitly does **not** address, so they don't creep into the plan:

- Figma ingestion (`connector-figma`)
- Schema generation (`generator-next-sanity`)
- Component generation (same)
- Registry persistence
- Evaluation / screenshot diffing (`evaluation-kit`)
- Multi-tenant auth or project provisioning
- Promotion contracts (dev → staging → prod)
- Sanity typegen wiring (starter still uses hand-stubbed types)

Each is a Site Foundry concern. alpha_v3 contributes only the Sanity-apply slice.
