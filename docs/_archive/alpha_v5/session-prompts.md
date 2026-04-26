# Session prompts + execution timeline — new-project bottom-up pipeline dogfood

**Purpose:** kickoff / resume / close prompts for the 5-stage pipeline dogfood running in this directory. Drop the appropriate prompt into a fresh Claude Code session to start or continue the experiment cold — the queue file and ledger carry the rest of the state.

Companion files:
- `seeds/queues/2026-04-22-new-project-pipeline-queue.md` — plan + stage progress + rubric scorecards + retrospective template.
- `library-coverage-ledger.md` — amortization measurement.
- `pre-run-sanity-check.md` — 5 pre-flight checks before Stage 1.

---

## When to use each prompt

| Session | Prompt | Use when... |
|---|---|---|
| 1 (first ever) | **Kickoff** | No prior session has run. Queue file's Stage progress tables all show `PENDING`. |
| 2 through N | **Resume** | At least one prior session ran. Queue has handoff notes at the bottom OR some Stage progress rows are no longer `PENDING`. Not all of Page 2 Stage 5 is complete. |
| Final (build phase) | **Retrospective** | BOTH pages' Stage progress tables show Stage 5 complete (rubric scorecards populated, ledger filled). One-shot — run once to close the experiment. |
| **Post-build measurement passes (1–4)** | **Measurement** | Pages applied + theme tokens shipped, but visual fidelity needs honest measurement to replace estimates. See `alpha_v5/docs/measured-fidelity-audit.md`. |
| **Post-measurement aggregation** | **Aggregation** | All per-section diff docs exist in the baseline screenshots dir. One-shot — produces corrected rubric + ranked gap list. |
| **Fix-phase sessions (Tier 1, 2, 3, 4 — separate sessions per tier)** | **Fix-phase kickoff** | AGGREGATION-SUMMARY exists + ranked fix backlog identifies the next-tier scope. Reusable per tier; user supplies tier number. |
| **Post-fix verification** | **Focused re-measure** | A fix-phase tier just landed. Re-measure only the rubric rows that tier was supposed to fix, confirm-or-break the projection, update measured numbers. |

---

## Kickoff prompt — session 1

Copy-paste into a fresh Claude Code session in this directory (or anywhere — the prompt specifies the working dir).

```
Run the new-project bottom-up pipeline dogfood — session 1.

Working directory: /home/brock/Design-to-code-chats/alpha_v5/

Entry point: read `alpha_v5/seeds/queues/2026-04-22-new-project-pipeline-queue.md` cold and follow it end to end. It's self-contained — status flags, required reading (6 files), Figma source, Sanity target, 5-stage pipeline definitions, rubric (visual + behaviors), abort criteria, section maps for both pages, Stage-1 resolution queues, retrospective templates.

Primary measurement (different from SignalWire dogfood): (a) library coverage amortization — page 2 should add ≤ 0.5 × what page 1 adds across primitives / composites / blocks for the thesis to pass; (b) visual + behavior fidelity ≥ 90% aggregate per page. This is NOT a gap-list run. Deliverable is working brand-accurate pages + retrospective. Render fidelity IS the point this time.

First concrete actions, in order:
1. Run `alpha_v5/pre-run-sanity-check.md` (5 checks, ~10 min). All must pass before Stage 1. If a check fails, fix — or fall back to alpha_v3 if it's integration-related. Do NOT proceed with a broken connector.
2. Snapshot Site Foundry git ref into `alpha_v5/library-coverage-ledger.md` § "Baseline".
3. Begin Page 1, Stage 1: FIRST action is `get_variable_defs` on design-system node `7912:138024` → log verbatim to § "Baseline token state" in the queue. THEN drill sections via `get_metadata` on `7876:38910`.
4. Resolve all 3 Homepage Stage-1 resolution queue questions before exiting Stage 1.

Session discipline:
- Respect all abort criteria in the queue file. Single stage >3h on one unit → escalate / skip / log. Page 1 wallclock 8h → soft cap. 12h → hard cap.
- Library additions (primitives / composites / blocks / schemas) commit to Site Foundry, NOT alpha_v5. alpha_v5 holds workflow + evidence only.
- Scope is narrow — site chrome, theme, scroll animation, responsive breakpoints are OUT of scope (see scorecard scope disclaimers). Don't spend cycles on them.
- Update § "Stage progress" tables as each stage closes. Populate the ledger per-page as you go — not at the end.

Close session when any of:
- Page 1 complete (all 5 stages, rubric recorded, ledger populated), OR
- 8h soft cap hit (interim handoff in queue + ledger, pause), OR
- Context running low (handoff, stop).

Write the handoff before closing, always.
```

---

## Resume prompt — sessions 2 through N

Reusable for every session after session 1 until both pages are Stage-5-complete.

```
Resume the new-project bottom-up pipeline dogfood.

Working directory: /home/brock/Design-to-code-chats/alpha_v5/

Entry point: read `alpha_v5/seeds/queues/2026-04-22-new-project-pipeline-queue.md` cold. Specifically:
- § "Stage progress" tables for both pages — tells you what's done vs pending.
- Handoff notes appended at the bottom (if any) — tells you where the last session stopped and any in-flight state.
- `alpha_v5/library-coverage-ledger.md` — current library coverage numbers per layer.

Resume from the last handoff's "In flight" entry or first "PENDING" stage. If multiple stages are pending, run them in order.

Primary measurement unchanged: library coverage amortization + ≥ 90% fidelity per page. Not a gap-list run.

Session discipline (same as kickoff):
- All abort criteria apply.
- Library additions commit to Site Foundry.
- Scope bounded — no site chrome / theme / scroll anim / responsive.
- Update § "Stage progress" tables as stages close; update ledger as you go.

Close session on: page complete, 8h soft cap on in-progress page, or context running low. Write handoff before closing.

If BOTH pages are Stage-5-complete when you read the queue file: do NOT start a new round. Stop and fire the retrospective prompt instead.
```

---

## Retrospective prompt — one-shot at end of experiment

Fire exactly once, when both pages' Stage progress shows Stage 5 complete.

```
Close the new-project bottom-up pipeline dogfood — retrospective pass.

Working directory: /home/brock/Design-to-code-chats/alpha_v5/

Inputs:
- `alpha_v5/seeds/queues/2026-04-22-new-project-pipeline-queue.md` — final state, both pages' stage progress + rubric scorecards populated.
- `alpha_v5/library-coverage-ledger.md` — baseline + per-page coverage + per-layer A_page1 / A_page2 totals.
- Any handoff summaries appended at the bottom of the queue file.

Actions:
1. Populate § "Amortization verdict — end of Page 2" in the queue. Compute ratios mechanically per layer:
   - Primitives: A_page2 / A_page1 → pass (≤ 0.5) / soft-fail (0.5–0.8) / hard-fail (≥ 0.8).
   - Composites: same.
   - Blocks: same.
   - Overall thesis verdict (pass if all three layers pass; soft-fail if any mixed; hard-fail if any hard-fail).
   - Also report wallclock ratio T_page2 / T_page1 — target ≤ 0.5 (consistent with library-add thesis).

2. Populate § "Retrospective — end of experiment" fully:
   - What worked / what didn't.
   - Per-stage feedback (1 ingestion → 5 fidelity).
   - Library additions summary with commit refs.
   - Aggregate fidelity per page (from both rubric tracks).
   - Docs changes indicated — which of the tightened docs earned revisions based on this run's evidence; propose as NEW entries in `alpha_v3/docs/_scratchpad/prompt-edits-candidates.md` (don't re-apply existing entries).
   - Abort triggers hit (which, when, why).
   - Time accounting per page + per stage + ratio.
   - Next-step recommendation (continue to pages 3+; revise pipeline shape; revert to frame-by-frame; or other).

3. Update `alpha_v5/STATUS.md` § "Active experiment" with verdict + pointer to retrospective. Rename "Active experiment" to "Closed experiment" once written.

4. Update memory `project_new_project_pipeline_dogfood.md` with closing state (verdict, pointer to retrospective section).

5. Close message should state explicitly: pass / soft-fail / hard-fail — and whether the pipeline shape is recommended for future runs. Hard-fail IS a valid finding — "amortization doesn't hold for this design language" is as valuable as "it does."

Do NOT delete the alpha_v5 branch or any artifacts. That's a user action after reviewing the retrospective.
```

---

## Execution timeline

### Realistic — 3 sessions over 2–3 calendar days

| Session | Actions | Budget | Prompt | Exit trigger |
|---|---|---|---|---|
| **1** | Pre-run sanity check (10m) → ledger baseline snapshot (5m) → Page 1 Stages 1–3 (Ingestion 30m + Primitivisation 2h + Componentisation 2h = ~4.5h). Commits land as each new primitive / composite / block ships to Site Foundry. | ~5h | Kickoff | End of Stage 3 (library complete for Page 1) OR 8h soft cap. |
| **2** | Page 1 Stage 4 (Layout/first run, 1h) → Stage 5 (Visual fidelity, 1.5h) → Begin Page 2 Stages 1–3 if time (amortized ~1.5h). | ~3–4h | Resume | Page 2 Stage 3 complete OR 8h cap on Page 2 OR context low. |
| **3** | Page 2 Stages 4–5 (1.5h amortized) → Retrospective (1–1.5h). Amortization verdict computed. Docs-scratchpad candidates filed. | ~3h | Resume (first half) + Retrospective (second half, fired when both pages Stage-5-complete) | Retrospective populated; STATUS + memory updated. |

### Aggressive — 2 sessions over 1–2 days

| Session | Actions | Budget |
|---|---|---|
| 1 | Pre-run + Page 1 full pipeline (Stages 1–5). | ~7–8h |
| 2 | Page 2 full pipeline + retrospective. | ~4h |

Only attempt if you have a clear 7–8h block for session 1 AND are confident Stage 2/3 won't blow the budget on a single gnarly primitive.

### Pessimistic — 4 sessions over 3–5 days

Expect this if Page 1 Stage 2 or 3 hits the "single stage >3h on one unit" escalation and you have to skip-and-log several primitives. The queue handles this — gaps get logged, pipeline continues, amortization math still works (escalated-and-skipped units count as `A_page1 = 1` with a gap annotation).

| Session | Actions | Budget |
|---|---|---|
| 1 | Pre-run + Page 1 Stages 1–3 (with 1 escalation) | ~6h |
| 2 | Page 1 Stages 4–5 | ~3h |
| 3 | Page 2 Stages 1–3 | ~3h |
| 4 | Page 2 Stages 4–5 + retrospective | ~3h |

### Decision points along the way

| Point | Question | Action |
|---|---|---|
| End of pre-run sanity check | Did all 5 checks pass? | Yes → Stage 1. No → fix integration OR fall back to alpha_v3 + restart session. |
| End of Page 1 Stage 1 | Did the 3 resolution-queue questions resolve cleanly? Did the design reveal "no identifiable component structure"? | Clean → Stage 2. Ad-hoc design → **abort; 1h sunk cost, write retrospective now.** |
| End of Page 1 Stage 3 | How many primitives / composites / blocks got ADDED (A_p1)? | Record in ledger. This is the baseline for amortization. |
| End of Page 1 Stage 5 | Visual ≥ 90%? Behavior ≥ 90%? | Both pass → Page 1 complete, start Page 2. Either fails → mark honest lower, continue to Page 2 anyway (Page 2 tests amortization; both-pages-ship is not required to prove the thesis). |
| End of Page 2 Stage 3 | What's A_p2 per layer? | Compute ratio. Hard-fail → **stop after Page 2, write retrospective with hard-fail verdict.** Pass / soft-pass → continue to Stages 4–5. |
| End of Page 2 Stage 5 | Both tracks ≥ 90%? | Either way, fire retrospective prompt. |

---

---

## Measurement prompt — measured fidelity audit (sessions 1–N of the audit pass)

Reusable per session until all 25 sections have a per-section diff doc. Each session covers ~6 sections; full pass = 4–5 sessions.

```
Run the measured fidelity audit — measurement session.

Working directory: /home/brock/Design-to-code-chats/alpha_v5/

Entry point: read `alpha_v5/docs/measured-fidelity-audit.md` cold and follow the per-section recipe end to end. The doc is self-contained — prerequisites, 5-step recipe with copy-paste code snippets, output format, pacing rules, failure modes, per-section template, closing condition.

Background: a PoC of this workflow ran on the AutoSwitchingCards section 2026-04-25. Output at `alpha_v5/screenshots/baseline-2026-04-25/POC-FINDINGS.md` — read this first to see the output shape and what evidence looks like.

Source of section list: `alpha_v5/seeds/queues/2026-04-22-new-project-pipeline-queue.md` § "Section map" for both Homepage (13 sections) and Platform (11 sections). Use the per-section nodeIds + candidate block names from that queue.

Working file index: `alpha_v5/screenshots/baseline-2026-04-25/SESSION-LOG.md` — create on first session if absent. Append a session-handoff block per session noting which sections completed, any new gap patterns, any sections that needed second-level drill-in.

Scope of THIS session: pick up where the SESSION-LOG.md left off. Process 4–6 sections (hard cap 8). For each, write a per-section diff doc to `alpha_v5/screenshots/baseline-2026-04-25/<page>-section-<NN>-<slug>.md` using the template at the bottom of measured-fidelity-audit.md.

Primary deliverable per session: per-section diff docs. NOT yet aggregating, NOT yet fixing. The audit is a measurement pass; aggregation happens in a separate session once all 25 are done.

Session discipline:
- All prerequisites must be true at session start (dev server up, Playwright bundled-Chromium configured, tokens at PROJECT_DESIGN_NODES.md). Re-verify them before starting if you're unsure.
- Per-section budget: ~10 min. If a section blows past 20 min on a single step, escalate (note in SESSION-LOG with the friction observed) and move on.
- 6-section soft cap, 8-section hard cap per session.
- Write SESSION-LOG handoff before closing — doesn't matter if you stopped at section 3 or section 6.

Close session on:
- 6 sections completed (write handoff, stop), OR
- 8-section hard cap, OR
- Context running low.

If the SESSION-LOG shows all 25 sections complete (Homepage 14 + Platform 11 each have a per-section diff): do NOT start another measurement session. Fire the Aggregation prompt instead.
```

---

## Aggregation prompt — one-shot at end of measurement pass

Fire exactly once when all 25 per-section diffs exist.

```
Close the measured fidelity audit — aggregation pass.

Working directory: /home/brock/Design-to-code-chats/alpha_v5/

Inputs:
- 25 per-section diff docs at `alpha_v5/screenshots/baseline-2026-04-25/<page>-section-<NN>-<slug>.md` (Homepage 14 + Platform 11).
- Session log at `alpha_v5/screenshots/baseline-2026-04-25/SESSION-LOG.md`.
- Existing queue at `alpha_v5/seeds/queues/2026-04-22-new-project-pipeline-queue.md` (specifically § "Honest rescore — two numbers per page" — the estimated numbers will be REPLACED with measured ones).
- PoC findings at `alpha_v5/screenshots/baseline-2026-04-25/POC-FINDINGS.md` for output-shape reference.

Actions:

1. **Per-page measured rubric.** For each page (Homepage, Platform), aggregate per-section row results from the diff docs:
   - Visual track: sum of passed rows / sum of (passed + ✗) rows. ⚠ counts as fail. N/A excluded from denominator.
   - Sections at ≥5/7: count.
   - Compare to the estimated honest-today / honest-post-swap numbers in the queue. Note the delta — was the estimate too generous or too harsh?

2. **Cross-section gap heatmap.** For each gap pattern observed (e.g. "card description uses --color-secondary on inverse-toned section"), count sections affected. Format as a table:
   | Gap pattern | Sections affected (count) | Severity (visible / structural / cosmetic) | Layer (token / primitive / block / content) |

3. **Categorized fix list, ranked by leverage.** Group all gaps by layer:
   - **Token-level fixes** (modify packages/tokens/src/theme.css — affects all sections downstream).
   - **Primitive-level fixes** (e.g. <Heading> needs `weight` prop or Display sizes).
   - **Block-level fixes** (per-block React updates, ranked by sections-affected).
   - **Schema / content-level fixes** (icon seeds, video URLs, image uploads).
   Rank within each tier by `(sections affected × severity weight)`. Severity weight: visible=3, structural=2, cosmetic=1.

4. **Update the queue's honest-rescore section** with measured numbers replacing estimates. Note explicitly that estimates were replaced and what direction the delta moved.

5. **Update STATUS.md + memory** with:
   - Measured fidelity numbers per page.
   - Top 3–5 highest-leverage fix items with file paths.
   - Pointer to the aggregation summary doc (write it as `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md`).

6. **Final close-out message** — one paragraph stating: pass-or-soft-fail of the post-token-swap fidelity claim (~91% / ~95% projection), the top 3 fix recommendations with estimated effort, and whether the workflow proved valuable enough to codify into figma-mcp-template.md as a permanent Stage 5+ procedure.

Do NOT start fixes in this session. The aggregation produces the prioritized backlog; a separate fix-phase session executes against it.
```

---

## Fix-phase kickoff prompt — ship the next-tier PR

Reusable per tier. The user supplies the tier number when pasting the prompt. One PR per tier (or per item if a tier is a basket of disparate fixes — call out in PR title).

**Framing rule:** AGGREGATION-SUMMARY § 3 contains both **issue evidence** and **suggested approaches**. Treat suggestions as **starting points, not prescriptions**. Some are obvious (the wrong-var-in-theme.css kind) and you ship as-suggested; others have real tradeoffs and need a moment of validation before coding. The session always runs a short validation step before implementation, and documents the validated approach (so revisions leave a paper trail).

```
Run a fix-phase session — Tier <N> PR.

Working directory: /home/brock/Design-to-code-chats/alpha_v5/

**Suggestions in AGGREGATION-SUMMARY § 3 are starting points, not prescriptions.** Your first 30 min validates them against per-section evidence. If a suggestion holds (most do — many fixes are obvious), proceed. If it's underdeveloped or wrong on closer read, refine and document the revision before coding. If a suggestion is materially wrong (not just refinable), STOP and escalate before coding — the upstream issue may live in AGGREGATION-SUMMARY § 3 itself.

Inputs (read in order, build context BEFORE editing):
- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — § 3 (issues + suggested approaches) + § 4 (top 10 by leverage) + § 5 (per-tier projections) + § 6 (top recommendations + effort estimates). Note Tier <N>'s gap IDs.
- For block-level items (Tier 3+): per-section evidence at `alpha_v5/screenshots/baseline-2026-04-25/<page>-section-<NN>-*.md`.
- Token reference: `alpha_v5/PROJECT_DESIGN_NODES.md`.
- Site Foundry codebase: `project/site-foundry/templates/next-sanity-starter/packages/`. Read relevant primitives/blocks BEFORE editing — preserve const-enum patterns, semantic var names, accessibility patterns.

Scope of THIS session: ship Tier <N> as a single PR (or per-line item if Tier <N> spans disparate fixes — name the gaps in the PR title, e.g. "feat(tokens+primitives): T1 + T2 + P1").

Workflow:
1. **Validate suggestions** (~30 min, time-boxed). For each item in Tier <N>:
   - Read § 3's evidence + suggested approach + any tradeoffs called out.
   - Cross-check against per-section evidence (rubric scores, computed-style values).
   - Decide: hold (suggestion is right), refine (suggestion is close but needs adjustment), or wrong (escalate).
   - For hold/refine: write the validated approach in `alpha_v5/plans/tier-<N>-plan.md` (preferred — leaves a paper trail) or as inline notes for the eventual commit body. Include why alternatives were rejected when there are real tradeoffs.
   - For wrong: stop, document why, escalate. Don't paper over an upstream problem to ship the tier.
2. **Implement** per the validated plan. Preservation rules:
   - Const-enum patterns (extend, don't replace; new enums follow existing HeadingSize / StackGap pattern).
   - Semantic var names (`--color-brand-turquoise` even when value isn't turquoise — see theme.css comments).
   - Accessibility (ARIA, keyboard nav, focus management) — never strip during a fidelity fix.
3. **tsc verification:** `cd project/site-foundry/templates/next-sanity-starter && pnpm -F @site-foundry-template/ui exec tsc --noEmit`. Confirm only pre-existing errors remain (BlockRenderer spread, RichTextBlock TypedObject, HeadingGroup TypedObject — see pre-run-sanity-check.md Check 2). Zero new errors.
4. **Commit** on `feat/decisions-dogfood-run` (or branch as appropriate). Message: `feat(<layer>): <gap-IDs> — <one-line summary> (leverage <score>)`. If you revised any suggested approach during step 1, note the revision and reason in the commit body.
5. **Verify runtime:** dev server still HTTP 200 on /new-project-homepage and /new-project-platform. No console errors.

Verification (designed up front — what success looks like):
- Tier <N>'s expected uplift comes from AGGREGATION-SUMMARY § 5. Note which rubric rows + which sections it should affect.
- Procedure: fire the **Focused re-measure prompt** for Tier <N> from this file after PR commits. The re-measure confirms or breaks the projection.

Session discipline:
- Do NOT touch items outside Tier <N>'s scope (saves Tier <N+1> for its own PR — keeps tier verification clean).
- Do NOT change semantic var names without flagging (downstream compat).
- Do NOT skip tsc.
- Do NOT proceed to next tier in the same session (each tier = its own PR + verify cycle).
- Do NOT skip the validation step in workflow 1, even when items look obvious. Documenting "suggestion held as-is" takes 30 seconds and the discipline matters more than the time saved.
- If validation reveals a suggestion is materially wrong: stop, document, escalate. Don't paper over.
- If implementation reveals a planning gap mid-flight (you chose approach A and it doesn't compile / breaks tests): revise the plan, document the revision, continue.
- If a Tier <N> item's complexity exceeds the AGGREGATION-SUMMARY estimate by >2× (e.g. T1 estimated ½–1 day, you're at day 2): stop, write a handoff explaining what's harder than expected, escalate.

Close session when:
- Tier <N> PR is committed.
- tsc passes (only pre-existing errors).
- Dev server renders both pages without console errors.
- Validated approach documented for each item (in plan file or commit body).
- Next action ("Focused re-measure prompt for Tier <N>") named in the handoff.
```

---

## Focused re-measure prompt — verify a tier's projection

Fires after a fix-phase tier lands. Re-measures ONLY the rubric rows that tier was supposed to fix; doesn't re-run the full 24-section pass. Confirms or breaks the projection.

```
Run a focused re-measure after Tier <N> PR landed.

Working directory: /home/brock/Design-to-code-chats/alpha_v5/

Inputs:
- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` § 4 (top fix items + which rubric rows each is expected to affect) + § 5 (projected uplift per tier).
- Original per-section diff docs at `alpha_v5/screenshots/baseline-2026-04-25/<page>-section-<NN>-*.md` (baseline rubric scores).
- `alpha_v5/measure-section.mjs` (Playwright extraction script — reusable from the original measurement pass).

Scope: only re-measure rubric ROWS affected by the just-shipped tier. Skip rows that tier didn't touch. (E.g. Tier 1 covers rows 3 + 4 across most sections; rows 1, 5, 6, 7 stay at their baseline scores.)

Prerequisites:
- Dev server running with the post-PR build. Verify HTTP 200 on /new-project-homepage and /new-project-platform first.
- Tier <N> PR committed locally (or on the branch the dev server is rendering from).

Workflow:
1. From AGGREGATION-SUMMARY § 4, list the rubric rows Tier <N> was scoped to fix (e.g. Tier 1 → rows 3 [Typography weight] + 4 [Color] + parts of row 2 [Typography size]).
2. For each section affected: re-run `measure-section.mjs` on that section to get post-PR computed styles. Compare against the section's design-measured values from the original diff doc.
3. For each previously-failing row that the tier should have fixed:
   - If now ✓ → mark as passed, increment per-page passing-cell count.
   - If still ✗ or ⚠ → document why (theme cascading? primitive prop not consumed? specific section override?). Do NOT silently move on.
4. Compute per-page measured-fidelity-after-Tier-<N>:
   - New passing cells / total non-N/A cells = % per page.
   - Compare to AGGREGATION-SUMMARY's projection (§ 5).
5. Document outcome:
   - **Confirms projection:** "Tier <N> shipped; pages now at X% / Y% measured (projected ~A% / ~B%). Within range. Continue to Tier <N+1>."
   - **Breaks projection (under):** "Tier <N> shipped; pages at X% / Y% (projected ~A% / ~B%). Investigate <list of rows still failing>."
   - **Breaks projection (over):** "Tier <N> shipped; pages at X% / Y% (projected ~A% / ~B%). Beat projection — likely caught some Tier <N+1> items as side-effects."

6. Append a "Tier <N> post-PR rescore" section to AGGREGATION-SUMMARY with the new measured numbers + delta-vs-projection.
7. Update queue file's "Measured rescore" section with new numbers.
8. Update STATUS.md + memory with the latest measured per-page percentages.

Close session when:
- Updated rescore is in AGGREGATION-SUMMARY + queue + STATUS + memory.
- Confirm-or-break verdict is documented.
- Next decision is named: "continue to Tier <N+1>" / "stop and investigate row Y" / "Tier <N+1> not worth running" (e.g. if Tier <N> already hit ≥90%).

Cost: ~30 min — much faster than the original full-pass measurement because we're only re-checking rows the tier touched, not all 7 rows × all sections.
```

---

## Notes on reuse

These prompts cover **the full lifecycle of an alpha_v5-style project** — build, measure, fix, verify. The set is liftable as a template; per-project customization is the swappable values listed below.

The seven-prompt set:

| Prompt | When | Project-specific values to swap |
|---|---|---|
| Kickoff (build-phase session 1) | Pages aren't yet rendered | working-dir path, queue-file path, design-system node, Page 1 nodeId |
| Resume (build-phase sessions 2–N) | Build is mid-flight | working-dir path, queue-file path |
| Retrospective (build-phase close-out) | Both pages reach Stage 5 | working-dir path, scratchpad pointer |
| Measurement (measured-fidelity-audit, sessions 1–N) | Pages render + need measured fidelity | working-dir path, screenshots-dir path, section-list source, dev-server URLs, fileKey |
| Aggregation (post-measurement, one-shot) | All per-section diff docs exist | working-dir path, screenshots-dir path, queue file path |
| Fix-phase kickoff (per tier) | AGGREGATION-SUMMARY has a ranked fix backlog | working-dir path, AGGREGATION-SUMMARY path, Site Foundry codebase paths, branch name |
| Focused re-measure (post-tier verification) | A fix-phase tier just landed | working-dir path, AGGREGATION-SUMMARY path, dev-server URLs |

**Pipeline-level invariants — preserve across all reuses:**

- The measurement thesis (amortization + fidelity).
- Session discipline (time boxes, abort criteria, handoff format).
- The cold-bootability rule: every prompt assumes the session has zero prior context and points at all the files needed to assemble understanding.
- The MCP-ceiling fallback ladder (`get_design_context` → `get_metadata` → child drill → `get_screenshot`).
- The seed-file-first investigation rule (when render diverges from queue: check seed → check block code → check design intent).
- The "fix one tier per PR" discipline (keeps tier-level verification clean).
- The "re-measure only affected rows" discipline (keeps post-fix verification cheap).
- **The "suggestions are starting points, not prescriptions" rule.** AGGREGATION-SUMMARY § 3 includes both issue evidence and suggested approaches. Every fix-phase session validates the suggestion against per-section evidence before coding — even when the answer is "hold as-is." Documenting a 30-second "suggestion held" matters as much as documenting a refinement. Skipping the validation step is the same failure mode as estimating-instead-of-measuring: it ships solutions that haven't been earned.

Drifting these per-project defeats the point of having a shared framework — and the framework's value compounds across projects when its invariants stay stable.

**For a brand-new project forking alpha_v5:**

1. Copy this whole `session-prompts.md` to the new project's working dir (or read it from alpha_v5 directly — these prompts can stay shared).
2. Substitute the project-specific values per the table above.
3. Run prompts in order: Kickoff → Resume → Resume → Retrospective → Measurement × N → Aggregation → Fix-phase kickoff (Tier 1) → Focused re-measure → Fix-phase kickoff (Tier 2) → Focused re-measure → … until projected fidelity is hit or the project is shipped.
