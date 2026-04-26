# Page Ingestion Prompt — Figma → Block Registry Audit

**Purpose:** Before building for a new project, ingest all its Figma pages and produce a **registry audit** — per-page block catalog + cross-page usage aggregate + a ranked build plan. The audit tells you exactly which registered blocks get used, what variants are needed, what patterns are unmapped, and what you can skip entirely.

This is **reconnaissance, not construction.** The output is a decision document, not code. Run this once at the start of a project to avoid the two classic failure modes:

- **Over-build:** shipping blocks the project doesn't use.
- **Under-build:** discovering a needed pattern mid-build and scrambling.

Companion docs (read before starting):

- `docs/figma-mcp-template.md` — the authoritative block registry (currently-registered `block.*` types + variants + primitives). The audit maps frames *against this truth*.
- `docs/content-extraction-prompt.md` — the seed shape per block. Referenced when the audit proposes variant captures.
- `gap-triage-*.md` (most recent) — prior-project's unmapped-pattern history, for vocabulary consistency.

---

## When to run this

Run this before building any block-schema or seed work for a new project. Skip for:

- Single-frame one-off additions to an already-audited project.
- Token-palette-only changes (pure `theme.css` swaps don't need schema rethinks).
- Re-audits triggered by schema ships — update the existing audit file in place instead of starting fresh.

---

## Prerequisites

1. **Figma access token** with `file_content:read` scope, exported as `FIGMA_API_TOKEN` in `.env`. Required for REST-API image exports of composed graphics; also used incidentally by the ingestion to resolve designer-registered component instances.
2. **Figma MCP tools available:** `get_metadata`, `get_design_context`, `get_variable_defs`, `get_screenshot`.
3. **Knowledge of the registered blocks** in the target project. Read `figma-mcp-template.md §Currently registered blocks` before the first frame — don't re-discover the registry frame by frame.
4. **List of Figma page URLs** to ingest — one URL per page, direct-linked to the page root frame. Extract `fileKey` + `nodeId` from each URL (`figma.com/design/<fileKey>/...?node-id=<nodeId>`).

---

## Input format

The human provides a list of page URLs. Example:

```
Pages to ingest (ProjectX):
1. Home — https://www.figma.com/design/XXXX/ProjectX?node-id=10-100
2. Pricing — https://www.figma.com/design/XXXX/ProjectX?node-id=20-200
3. Features — https://www.figma.com/design/XXXX/ProjectX?node-id=30-300
4. About — https://www.figma.com/design/XXXX/ProjectX?node-id=40-400
```

The audit output path is conventionally `alpha_v3/audits/<project>-page-ingestion-<YYYY-MM-DD>.md`. Create the directory if it doesn't exist.

---

## Output shape

The audit is a single markdown file with four sections. Fill them in order; each phase checkpoints so the session can pause/resume without losing state.

```markdown
# <Project> page ingestion audit — <YYYY-MM-DD>

## Input
- Pages ingested: N
- Source file: `<fileKey>`
- Auditor: <session id>
- Registered blocks at time of audit: <copy list from figma-mcp-template.md>

## Phase 1 — Per-page catalogs

### Page 1 — <name> (node `<id>`)
...

### Page 2 — <name> (node `<id>`)
...

## Phase 2 — Registry audit (aggregate)

### Block usage across all pages
| Block | Pages using | Variants observed | Evidence |
|---|---|---|---|
| ...

### Registered blocks with ZERO use
- ...

### Unmapped patterns (candidates for new schema)
| Pattern | Occurrences | Pages | Proposed block | Effort |
|---|---|---|---|---|
| ...

### Token / design-system signals
- ...

## Phase 3 — Build plan

### Ship (ordered by leverage)
1. ...

### Skip / de-prioritize
- ...

### Keep from existing registry (high usage, no change)
- ...

### Variant additions on existing blocks
- ...

### Open questions for designer
- ...
```

---

## The three phases

### Phase 1 — Per-page catalogs

For each page URL in input order:

1. Extract `fileKey` + pageNodeId from URL.
2. Run `get_metadata` on the page node. Record the top-level frame list (these are the page's sections).
3. For each top-level frame, run the **per-frame decision tree** below.
4. Write a page entry to the audit file using the per-page template.

**Per-page template:**

```markdown
### Page <N> — <name> (node `<fileKey>/<pageNodeId>`)

**Dimensions:** <width>×<height>. **Top-level frame count:** <N>.

**Block candidates (in page order):**

| # | Frame | Block type | Variants | Evidence | Notes |
|---|---|---|---|---|---|
| 1 | `<nodeId>` — "<name>" | `block.heroSplit` | mediaPlacement=right, 2 CTAs, media=image | dims 1440×720, 2 CTA instances | — |
| 2 | `<nodeId>` — "<name>" | `block.featureGrid` | columns=3, 6 items, icons+CTAs per item | dims 1440×1200, 6 Detail Block instances | 4-col on larger breakpoints? confirm w/ designer |
| ... |

**Site chrome excluded:**
- `<nodeId>` "Navbar" (1440×72) — site-chrome / `block.navbar` candidate
- `<nodeId>` "Footer" (1440×480) — site-chrome / `block.footer` candidate

**Unmapped patterns on this page:**
- `<nodeId>` "Pricing Tiers" — 3 cards with tier name + price + bullets + CTA. No registered block matches. Candidate: `block.pricingGrid`.

**Page-level observations:**
- Every hero on this page uses heroCenter with code-editor media — consistent pattern.
- Navbar layout differs from other pages (transparent on home, solid elsewhere).
```

### Phase 2 — Registry audit (aggregate across all pages)

After all pages are cataloged, consolidate:

1. **Block usage table** — one row per `block.*` type that appears at least once. Aggregate pages + variants + evidence refs.
2. **Zero-use registry entries** — list registered blocks that no page uses. These are candidates to skip from the ProjectX build and (long-term) candidates to remove from the registry.
3. **Unmapped patterns** — consolidate from per-page lists. Rank by occurrence count + page coverage. High-occurrence patterns are high-priority candidates for new schemas.
4. **Token / design-system signals** — on your way through the pages, run `get_variable_defs` on a representative frame per page and collect unique token names. Note which existing `--color-*` / `--text-*` / `--spacing-*` tokens seem present vs. missing in the target design system. This is the pre-work for a later token-ingestion pass.

**Block usage table format:**

| Block | Pages using | Variants observed | Evidence |
|---|---|---|---|
| `block.heroSplit` | p1, p3 | mediaPlacement=right (2/2), 1 CTA (1), 2 CTAs (1) | p1 frame `10:101`, p3 frame `30:301` |
| `block.featureGrid` | p1, p2, p3, p4 | columns=3 (3), columns=4 (1 — new variant); icons only (2), icons+CTAs (2) | p1 frame `10:120`, ... |

**Zero-use list format:**

```markdown
- `block.comparison` — zero pages use. Skip for ProjectX build. Keep in registry if the codebase is shared across projects; otherwise delete-candidate.
- `block.tabbedFeatures` — zero pages use.
```

**Unmapped patterns format:**

| Pattern | Occurrences | Pages | Proposed block | Proposed schema | Effort |
|---|---|---|---|---|---|
| Pricing tier card (tier name + price + period + bullets + CTA) | 3 | p2, p3, p5 | `block.pricingGrid` | `items[]: { name, price, period?, bullets[], cta, featured? }` | medium |
| Stats band (4 big numbers + labels) | 2 | p1, p4 | `block.statsBand` | `items[]: { value, label, suffix? }`, columns? | small |
| Two-column article with inline images | 1 | p5 | ??? (treat as long-form richText for now; re-evaluate if recurs) | — | low |

### Phase 3 — Build plan

From Phase 2, produce a ranked build order:

1. **Ship new schemas**, ordered by frames-unblocked-per-PR. Each entry: ID, one-line schema shape, effort, dependencies (other schemas, primitives, tokens).
2. **Skip / de-prioritize** — zero-use registered blocks. Document the decision; don't delete unless the registry is project-specific.
3. **Keep** — registered blocks with healthy usage. Reference existing `figma-mcp-template.md` entries; no change needed.
4. **Variant additions on existing blocks** — cases where a block is used but a new value is needed (`columns: 4`, `tone: 'warning'`, a new `variant: 'compact'`).
5. **Open questions for designer** — things the audit couldn't resolve without human input. Examples: two pages use apparently-same pattern but one has 3 cards and one has 4 — is the difference intentional?

Build plan template:

```markdown
## Phase 3 — Build plan

### Ship (ordered by leverage)
1. **`block.pricingGrid`** (blocks 3 pages) — schema: `items[]: { name, price, period?, bullets[], cta, featured? }`. Effort: medium. Render: `<Grid>` + `<Card>` + `<Stack>`. No new primitives needed.
2. **`block.statsBand`** (blocks 2 pages) — schema: `items[]: { value, label, suffix? }` + `columns`. Effort: small. Render: `<Grid>` + `<Stack>`. Consider extracting `<StatDisplay>` primitive if a third use appears.
3. ...

### Variant additions
- `block.featureGrid` — add `columns: 4` to allowed values (observed on p3).
- `block.callout` — add `tone: 'warning'` (observed on p1 pricing-error callout).

### Skip / de-prioritize
- `block.comparison` — zero use. Skip build; keep registry entry for future projects.
- `block.tabbedFeatures` — zero use.

### Keep (no change needed)
- `block.heroSplit`, `block.heroCenter`, `block.featureGrid` (+ variant above), `block.richText`, `block.logoMarquee`, `block.callout` (+ variant above)

### Open questions for designer
- p2 pricing cards show 3 tiers, p5 shows 4. Is the 4th (enterprise) a separate design pattern or the same block with 4 items?
- p1 navbar is transparent; p3/p4 navbar is solid. One `block.navbar` with a `transparent` variant, or two separate patterns?
- p4 hero has a partial "scroll indicator" graphic — decorative-only or semantic affordance?
```

---

## Per-frame decision tree

Run this for every frame encountered. Output per frame: `{ nodeId, classification, blockType?, variants, evidence }`.

1. **Is this a page container** (no discrete visual content — just a wrapper for child frames)?
   - **Yes** → iterate to direct children, recurse the decision tree on each.
   - **No** → proceed.

2. **Run `get_metadata` on the frame** (mandatory per S2 for any frame >800px tall, but cheap enough to run on every frame in an audit — the drill-in discipline pays off). Record: dimensions, direct child count, direct-child names + types.

3. **Leaf-parent quirk check:** if `get_metadata` returns a leaf (no children) but the frame is visually non-empty, its children are likely peer-level component instances. Query those IDs from the Figma dev-mode sidebar or from the page's parent metadata. Record the found child IDs before classifying.

4. **Classify the frame** into one of:

   a. **SITE CHROME** — navbar, footer, cookie banner, floating utility nav, site-wide search, global announcement bar. Telltale signs:
      - Full-width (matches page width)
      - Positioned at top or bottom of the page stack
      - Recurs across pages with identical or near-identical content
      - Designer-registered component named `Navbar` / `Footer` / similar
      - Contains links to other pages rather than in-page content

      → Exclude from pageBuilder. Record in site-chrome section of the page catalog. Move on.

   b. **MULTI-REGION** — >1 distinct content zone in one Figma frame. Examples: "CTA banner + footer" (frame #8 in SignalWire dogfood), "logo row + comparison" (frame #4). Telltale signs:
      - >1 designer-registered component instance at top level
      - Visually-distinct vertical sections with independent internal structure
      - Section heading that applies to only part of the frame

      → Split into sub-frames. Recurse the decision tree on each.

   c. **SINGLE-BLOCK CANDIDATE** — one coherent block shape. Proceed to step 5.

5. **Match against registered blocks** in this priority order (from `figma-mcp-template.md §Building a block from Figma` step 2):

   - `block.heroSplit` — text + media side-by-side
   - `block.heroCenter` — centered heading + optional description + CTAs over optional media below
   - `block.featureGrid` — grid of cards (2–6 items: eyebrow/title/description + optional icon/cta)
   - `block.richText` — long-form editorial prose
   - `block.callout` — contained-card emphasis (heading + body + CTA in a bordered frame)
   - `block.testimonials` — quote cards (default + featured variants)
   - `block.comparison` — side-by-side comparison cards with pro/con bullets
   - `block.tabbedFeatures` — tab filter → content panes (nested accordion/codeSample)
   - `block.accordion` — collapsible list (FAQ, steps)
   - `block.codeSample` — code window (chrome + filename + code body + caption)
   - `block.logoMarquee` — scrolling customer/partner logos

   Record best-match block type.

6. **Capture variants** on the matched block. Use the per-block taxonomy table below to know what axes matter.

7. **If no block matches:** record as UNMAPPED. Describe the pattern in one sentence. Propose a schema shape. Flag the frame size (minor decoration vs. major section).

8. **Emit the per-frame record.** One row in the page's block-candidates table.

**Anti-patterns (do not do):**

- Don't emit "unhedged simplicity" classifications. Every unclear frame either names the likely gap OR flags `requires drill-in`. In the SignalWire dogfood, **100% of wrong predictions followed the unhedged-simplicity pattern.**
- Don't force a block match when the frame clearly needs a new schema. Record as UNMAPPED with a proposed shape — the audit's job is to surface gaps, not hide them.
- Don't renumber frames inside a page or across pages. Use the Figma node IDs as stable references.
- Don't run `get_design_context` on every frame — it's expensive. Use `get_metadata` for classification; only pull `get_design_context` when you need actual copy (final seed authoring in Phase 3 ship work, not Phase 1 ingestion).

---

## Variant capture taxonomy per block

For each registered block, these are the variant axes to record during ingestion. Anything new → flag as variant gap on that block.

| Block | Variant axes to capture |
|---|---|
| `block.heroSplit` | `mediaPlacement` (left/right/unknown), has-media (y/n), media kind (image/composed-graphic/code/diagram/screenshot), `#ctas` (0/1/2), CTA variants used |
| `block.heroCenter` | has-media (y/n), media kind, `#ctas`, description length (short/medium/long) |
| `block.featureGrid` | `columns` (2/3/other), `#items`, item shape: which of `{eyebrow, title, description, icon, cta}` are present; CTA variants used; card-frame treatment (subtle/bordered/elevated) |
| `block.richText` | has-ctas (y/n), content length, presence of lists / quotes / code blocks |
| `block.callout` | `tone` (default/frosted/accent/new?), has-icon (y/n), has-decorative-bg (y/n), `#ctas` |
| `block.testimonials` | `columns`, `#items`, presence of `featured` variant, has-avatars (y/n), carousel affordance (y/n) |
| `block.comparison` | `#items` (2/3/4+), has-logo per item (y/n), has-featured-variant (y/n), bullet state distribution (positive/negative/neutral ratios) |
| `block.tabbedFeatures` | `#groups`, tab label shape (text/icon+text), content shape per group (accordion only / codeSample only / accordion+codeSample / other) |
| `block.accordion` | standalone or nested-in-tabbedFeatures, `#items`, has-defaultOpen (y/n), body content richness (single paragraph vs multi-paragraph) |
| `block.codeSample` | standalone or nested, languages observed, `#lines` range, has-caption (y/n), window-chrome style (macOS / other) |
| `block.logoMarquee` | `#logos`, has-section-heading (y/n), heading placement (above/inline), has-hrefs (y/n), speed if inferrable |

When a variant axis has a **new value** not currently in the schema:
- Record it in the page entry with `variant gap: <block>.<axis> = <new value>`.
- Aggregate in Phase 2 under "Variant additions" in the build plan.
- Don't propose a whole new block if the pattern fits an existing block with a new variant value.

---

## Unmapped pattern recording

When a frame doesn't match any registered block, write:

```markdown
**Unmapped pattern — `<working name>`**
- Evidence: page <N> frame `<nodeId>` (<width>×<height>).
- One-sentence description: <what the designer drew>.
- Distinguishing features: <what makes it NOT fit an existing block>.
- Proposed block type: `block.<name>`.
- Proposed schema shape: `items[]: { ... }` / `fields: ...` (rough — the real schema shape happens at build time, not audit time).
- Effort estimate: trivial / small / medium / large.
- Frame-size weight: major (full-page section) / minor (decorative band) / micro (inline element).
```

When the same pattern recurs on multiple pages, aggregate in Phase 2:

```markdown
**`block.pricingGrid`** — 3 occurrences across p2, p3, p5.
- Shape: tier cards with `{ name, price, period, bullets[], cta }`. Featured-tier variant on the middle card (p2).
- Effort: medium.
- Blocks: 3 pages from shipping until built.
```

---

## Token / design-system signal capture

During Phase 1 drill-ins, on a **representative frame per page** (a hero or feature section — not navbar/footer), run `get_variable_defs` and record:

- Unique token names observed (`--color-brand-primary`, `--color-surface-page`, etc.)
- Numeric spacing values that don't fit a standard 4px scale
- Font families used (and weights)
- Radius values
- Shadow definitions

Aggregate in Phase 2 under "Token / design-system signals." This is Phase-0 data for a later token-ingestion pass — not a deliverable of this audit, but valuable context.

---

## Anti-patterns and miss-mode prevention

The SignalWire dogfood taught us which miss modes kill an audit:

- **Unhedged simplicity.** Calling a frame "clean, no new schema" without drill-in evidence → 100% of wrong predictions in round 1 followed this pattern. Every frame in your catalog either names the expected gap OR flags `requires drill-in`. Zero exceptions.
- **Skipping drill-in on >800px frames.** Multi-region frames disguised as single blocks bit us 2/8 times in round 1. Run `get_metadata` on every top-level page frame.
- **Confusing Figma frame boundaries with block boundaries.** A Figma frame is a canvas unit, not a block unit. Big frames = multiple blocks. Split at multi-region; don't cram.
- **Ingesting site chrome as pageBuilder content.** Navbars and footers are cross-page concerns; they don't belong in per-page catalogs. Exclude at classification step 4a.
- **Freelancing unmapped patterns into registered blocks.** If a frame doesn't fit, record UNMAPPED — don't force it into `block.richText` just to have an answer. The audit exists to surface gaps.
- **Leaf-parent quirk.** `get_metadata` on a frame whose visual children are peer-level instances returns a leaf. Don't treat that as "nothing there" — query known child IDs from the dev-mode sidebar or visible layer names.
- **MCP URL expiry.** Don't rely on MCP asset URLs for the audit — they expire in ~7 days. For any image evidence you want preserved in the audit, reference the Figma node ID + use the REST API path (`figmaNodeId` spec) when the audit leads to seed authoring later.

---

## Runbook — typical session flow

1. **Session start:** paste the list of Figma page URLs. Confirm `FIGMA_API_TOKEN` present in `.env`.
2. **Set up the audit file** at `alpha_v3/audits/<project>-page-ingestion-<YYYY-MM-DD>.md`. Pre-populate the Input section and four empty phase headers.
3. **Phase 1 — iterate pages.** For each page URL: extract `fileKey`+`nodeId`, run `get_metadata` on the page, then run the per-frame decision tree on each top-level frame. Fill the per-page entry. Save after each page (checkpoint).
4. **Phase 2 — consolidate.** After all pages have an entry, fill the aggregate tables. Zero-use and unmapped patterns are the high-signal outputs.
5. **Phase 3 — build plan.** Order ship items by frames-unblocked-per-PR. Write open-questions section explicitly — these go back to the designer/PM.
6. **Handoff.** The audit file is the deliverable. The next session (schema shipping) reads it and executes the build plan.

**Expected audit length per project:** 5–10 pages ingested → ~500–800 line audit file. Longer is fine; shorter likely means under-captured variants.

**Expected session length for ingestion:** 1–3 hours for a typical 5–8 page marketing site. Larger (15+ pages) split across two sessions; checkpoint after Phase 1 for each batch.

---

## Ready-to-run prompt

Paste this into a fresh session after setting `FIGMA_API_TOKEN`:

```
I'm starting a page-ingestion audit for <project name>. Please follow the runbook in `alpha_v3/docs/page-ingestion-prompt.md`.

Pages to ingest:
1. <name> — <figma URL>
2. <name> — <figma URL>
3. <name> — <figma URL>
...

Write the audit to `alpha_v3/audits/<project-slug>-page-ingestion-<today>.md`. Checkpoint after each Phase 1 page and at each phase boundary. Reference `docs/figma-mcp-template.md §Currently registered blocks` as the block registry truth. Emit a build plan at the end ordered by frames-unblocked-per-PR.

Go.
```

---

## Final deliverable checklist

Before calling an audit complete:

- [ ] Every page in the input list has a Phase 1 entry
- [ ] Every top-level frame in every page is classified (registered-block match / site-chrome / multi-region-split / unmapped)
- [ ] Phase 2 block-usage table includes every registered block that appears ≥1 times
- [ ] Phase 2 zero-use list includes every registered block that appears 0 times
- [ ] Phase 2 unmapped-patterns table has evidence (page + node ID) for every entry
- [ ] Phase 3 build plan orders new schemas by leverage
- [ ] Phase 3 includes open questions for the designer
- [ ] Zero unhedged-simplicity classifications — every entry names the expected match OR flags requires-drill-in
- [ ] Token/design-system signals section has at least one entry per page sampled
