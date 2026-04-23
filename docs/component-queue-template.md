# Component Queue Template

Use this when building **multiple blocks from Figma in one session**. It formalizes the "batch queue processing" pattern referenced in `figma-mcp-template.md` so the work stays traceable across context windows and hand-offs.

Pair with:

- `docs/figma-mcp-template.md` — the actual build rules (primitives, tokens, enum usage)
- `docs/content-extraction-prompt.md` — seed JSON shape and field mapping
- `docs/designer-checklist.md` — what Figma state must be true before a frame enters the queue

---

## When to use a queue

Use a queue when **any** of these are true:

- 2+ distinct Figma frames need to become blocks in the same session
- A single frame spans multiple block types that must ship together
- The build will cross a context compaction boundary
- The work involves a mix of **reuse an existing block** + **propose a new block**, and the decisions need to be auditable

Skip the queue for a single one-off block — just follow the `figma-mcp-template.md` flow inline.

---

## Queue file location

Keep the queue file inside the working directory, next to the seeds it produces:

```
alpha_v3/seeds/queues/<session-slug>-queue.md
```

Example: `alpha_v3/seeds/queues/2026-04-21-signalwire-homepage-queue.md`.

One queue file per session. Don't reuse stale queues — `DONE` rows from a week ago are noise.

---

## Queue template

Copy this into the queue file at the start of the session. Fill the header once, then add one row per frame.

```markdown
# <session-slug> — Figma → blocks queue

**Started:** <YYYY-MM-DD>
**Figma file:** <URL>
**Target page:** <sanity page id>
**Sanity dataset:** <dataset name>
**Builder:** <name / LLM session>

## Frames

| # | Status | Figma node | Block type | Seed file | Notes |
|---|---|---|---|---|---|
| 1 | PENDING | `757:6704` | `block.heroSplit` | `seeds/hero-homepage.json` | |
| 2 | PENDING | `757:6349` | `block.featureGrid` | `seeds/features-homepage.json` | |
| 3 | PENDING | `757:5430` | `block.featureGrid` | `seeds/ai-voice-agents.json` | desktop-only graphic (see note) |
| 4 | BLOCKED | `757:7100` | NEEDS NEW SCHEMA | — | tabbed stat grid — file schema issue before unblocking |

## Schema gaps surfaced this session

*(Fill as you go. Each row is a reason a frame is `BLOCKED` or `DONE-WITH-CAVEATS`.)*

- `block.statTabs` — tabbed container with numeric stats. Figma frame `757:7100`. Closest existing block: `block.featureGrid` (doesn't support tabs). Cannot ship without schema work.
- `block.featureGrid.column enum` — design uses a 4-col layout. Current schema allows only `2 | 3`. Temporarily shipped as 3-col + flagged.

## Primitive / composite gaps

*(Same idea, but for the `packages/ui` side.)*

- `<Stack direction="row">` — came up three times. Today Stack is column-only; had to drop to raw `flex flex-row`. Worth adding as a prop.
- No existing `<StatBlock>` composite — built inline inside the featureGrid for now.
```

---

## Prediction discipline — writing the Notes column

The Notes column on each queue row is a bet on what the frame will contain. These bets are audited in the handoff summary (see prediction-accuracy tracking, below). Rule:

**Every Notes entry must either (a) name the expected gap explicitly, or (b) mark `requires drill-in`. Never write unhedged "clean, no new schema" claims.**

Examples:

- ✅ "Likely splits into 2 blocks (logo marquee + comparison). Drill in first."
- ✅ "Centered hero with code-block media; almost certainly surfaces `mediaPlacement=below` or `block.heroCenter` gap."
- ✅ "Requires drill-in — Figma name says 'Contact Form' but screenshot shows a closer."
- ❌ "Cleanest R3 entry, no new schema expected." (unhedged)
- ❌ "heroSplit variant with code-block media." (unhedged simplicity claim)

**Rationale from 2026-04-22 dogfood:** across 8 frames, **100% of wrong predictions fit the unhedged-simplicity pattern.** All correct predictions either named gaps explicitly or hedged with drill-in. Intuition about "clean" frames is unreliable when media or layout composition is non-standard. Pulling MCP context is cheap; wrong predictions are expensive.

---

## Candidate + fallback per round (when the queue spans rounds)

For queues large enough to span rounds or days (like full-page dogfoods), add per-round definitions above the frames table. Each round gets a **candidate + fallback + exit criteria** trio rather than just a frame list.

- **Candidate:** the block type you expect to use.
- **Fallback:** what to do if the candidate can't carry the design — typically "degrade to X + file gap Y" or "mark BLOCKED + file new-schema gap Y."
- **Exit when:** the rendered block plus any filed gaps together capture the frame's intent — not "when the render is perfect."

Example (from `alpha_v3/seeds/queues/2026-04-22-signalwire-homepage-queue.md`, Round 1):

```markdown
### Round 1 — single small block

- **Target:** frame #1 (node `893:7165` — "Held Hostage by Vendor Roadmaps?" callout).
- **Candidate:** `block.richText` with center alignment.
- **Fallback:** if the `richText` content schema can't express a bordered centered callout with a CTA, file a gap for a new `block.callout` and document the exact field missing — don't freelance a workaround.
- **Exit when:** the callout renders on the target page; audit checklist passes; at least one gap or "nothing to add" note written into the gap sections below.
- **Time budget:** 1 hour. If round 1 exceeds 90 minutes, stop and investigate what's wrong with the docs.
```

For small queues (one round, no time budget), the candidate + fallback can live in the frame row's Notes column instead (see Prediction discipline above).

---

## Per-frame workflow

For each `PENDING` row, run the full `figma-mcp-template.md` build flow and these queue-specific rules:

### 1. Claim the row
Change `PENDING` → `IN PROGRESS`. One row at a time — no parallel frames.

### 2. Do the build
Follow `figma-mcp-template.md` end-to-end. Nothing in the queue mode lowers the quality bar. Specifically:

- Pre-write checklist for every `<div>`
- Enum form preferred for every primitive prop
- No arbitrary hex / rgba — tokens or flag
- Static graphics → image field, not code

### 3. Produce the seed + dry-run

```bash
# from alpha_v3/
set -a && source /home/brock/Design-to-code-chats/project/site-foundry/.env && set +a
pnpm apply seeds/<file>.json --dry-run
```

Iterate until dry-run passes.

### 4. Apply

```bash
pnpm apply seeds/<file>.json
pnpm verify
```

Confirm visually in Studio + `apps/web` dev preview.

### 5. Post-build audit (mandatory before marking `DONE`)

Tick every item:

- [ ] Pre-write checklist respected — no raw `<div>` where a primitive fits
- [ ] All primitive props use the const-enum form (`StackGap.MD`, not `'md'`); any string-form usage has a written reason
- [ ] No `bg-[rgba(...)]` / `bg-[#...]` / `border-[#...]` / `text-[#...]` — everything decomposed to tokens
- [ ] Every new enum value used has a matching schema entry
- [ ] Seed JSON validated against `SeedArtifact` (dry-run passed)
- [ ] Applied seed visible in Studio under the target page's `pageBuilder`
- [ ] `apps/web` renders the block without runtime errors
- [ ] Any schema gaps captured in "Schema gaps surfaced this session"
- [ ] Any primitive gaps captured in "Primitive / composite gaps"

### 6. Close the row
Change `IN PROGRESS` → `DONE` (or `DONE-WITH-CAVEATS` with a pointer to the gap section, or `BLOCKED` with a reason).

---

## Status values

| Status | Meaning |
|---|---|
| `PENDING` | Not started. |
| `IN PROGRESS` | Currently being built. At most one row at a time. |
| `DONE` | Applied to Sanity, visually verified, no known issues. |
| `DONE-WITH-CAVEATS` | Applied but with a flagged gap (wrong column count, missing variant, placeholder copy). Gap row in the gap section must exist. |
| `BLOCKED` | Can't ship without schema or primitive work. Gap row must exist. Move on — don't sit on the row. |
| `SKIP` | Deliberately out of scope for this session. Include a one-line reason. |

---

## Context budget

**Hard rule:** if four or more frames have been built in a single session, stop after the current one. Update the queue, produce the handoff summary (below), and end the session.

This isn't about avoiding fatigue — it's about staying recoverable. A 4-block session that crosses a context compaction line loses coherence; 4 separate 4-block sessions each with a clean queue file does not.

---

## Handoff summary (end of session)

At the end of every session — whether finished or paused — append this to the queue file:

```markdown
## Handoff — <YYYY-MM-DD>

### Completed
- Frame 1 DONE (seed: seeds/hero-homepage.json).
- Frame 2 DONE-WITH-CAVEATS (seed: seeds/features-homepage.json; see schema gap 3, composite gap 1, docs gap 5).

### In flight
- (nothing — or the frame mid-build, with a pointer to where you stopped)

### Remaining
- Frame 3 (PENDING)
- Frame 4 (BLOCKED — see schema gap 2: block.statTabs)

### Prediction accuracy (this session)
- Frame 1: ✓ accurate — candidate block held, no surprise gaps.
- Frame 2: ~ partial — block type right, missed the column-count gap until MCP drill-in.
- Frame 3: ✗ wrong — "cleanest entry, no new schema" note; frame actually had 3-axis complexity.
- **Session tally:** 1/3 accurate, 1 partial, 1 wrong.
- **Running tally across all integrations:** `<N>/M accurate (P%)`.
- **Miss pattern:** frame 3's miss followed the usual unhedged-simplicity pattern (see Prediction discipline). Frame 2's partial was a drill-in-skipped miss.

### Gaps to carry forward
- schema gap 2: `block.statTabs` schema work (blocks frame 4)
- composite gap 1: `<Stack direction="row">` primitive enhancement
- schema gap 4: `block.featureGrid.columns = 4` enum entry
```

**Line formats:**

- Per-frame completion line: `- Frame <N> <STATUS> (seed: <path>; see <gap-IDs>).` Keeps the handoff as an index — the gap sections are the audit trail; don't re-describe caveats inline.
- Per-frame prediction line: `- Frame <N>: ✓ accurate | ~ partial | ✗ wrong — <one-line-why>.`
- Gap carry-forward line: `- <gap-type> <gap-ID>: <one-line-summary> (blocks frame <N> | 2/2 runs hit this | ...).`

**Why prediction-accuracy tracking matters:** prediction accuracy is a leading indicator of docs quality. If it trends down, the *Known-missing-schema patterns* list in `figma-mcp-template.md` or the block-type buckets need updates. If it trends up, the docs are doing their job. Tracking per-session makes both visible.

The handoff is what makes the queue valuable. If the next session (or the next LLM) can't pick up from the queue file alone, the queue failed.

---

## What to do with surfaced gaps

- **Schema gaps** (new block type, missing field, missing enum value) → open a tracking issue against `packages/sanity-schema` in Site Foundry. Don't patch the schema inline during a queue run — schema changes deserve their own review.
- **Primitive gaps** (missing prop, missing enum key, missing primitive) → open a tracking issue against `packages/ui`. Flag it in the queue's "Primitive / composite gaps" section so the next builder knows they're not the first to hit it.
- **Token gaps** (no close color match, spacing outside the scale) → flag in-line in the seed/block + note on the queue. Don't invent new token names.
- **Content gaps** (Figma lacks copy, designer left `Lorem ipsum`) → placeholder + queue note + ping the designer.

The queue is the audit trail for "what did this session change, what did it surface, and what did we punt on." Keep it honest.
