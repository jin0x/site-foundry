# Retrospective — Decisions new-project Pipeline Hardening Run (2026-04-26)

> Drafted as collaborative retrospective with system-side observations (commit history, measurements, § 28 ground-truth scoring) integrated with editorial direction from project lead. Direct quotes preserved where they crystallize a position; otherwise findings are written as shared.

## 0. Provenance

- **Branch:** `feat/decisions-dogfood-run` on `project/site-foundry/templates/next-sanity-starter`
- **Working dir:** `/home/brock/Design-to-code-chats/alpha_v5/`
- **Build phase closed** 2026-04-24 (per `RETROSPECTIVE-2026-04-25.md`); fix-phase ran 2026-04-25 → 2026-04-26
- **Commits in scope:** `9dfc36e` design system import + 24 fix-phase commits (final: `33ba95c`)
- **Pages targeted:** `/new-project-homepage` (13 sections) + `/new-project-platform` (11 sections) — 24 sections × 7 rubric rows = 168 cells

This retrospective covers the **fix-phase iteration** (post-baseline-measurement). Distinct from the baseline-measurement retro at `RETROSPECTIVE-2026-04-25.md`. Two retros because two distinct phases:
- **2026-04-25 retro:** baseline measurement + Stage-5 calibration discovery (~50pp inflation in Stage-5 estimates)
- **2026-04-26 retro (this doc):** 24 fix-phase commits + per-PR cell-delta calibration discovery (~30pp inflation in running tally)

---

## 1. Summary

### What we ran

24 fix-phase commits across 4 tiers + cosmetic cluster + 2 calibration rescores, ~4 days clock time. Goal: lift the measured baseline (Hp 16.5% / Pl 13.0% strict-rubric pass) toward 90%+. Original projection was "92–95% post-Tier-1 + Tier-2 + most-of-Tier-3 + Tier-4-pipeline-+-content-seeded" stage.

### What numbers landed

| Metric | Value |
|---|---|
| Running cumulative estimate at "ship" point (§ 27) | Hp 93.4% / Pl 92.2% |
| § 28 honest comprehensive measured strict | **Hp 65.9% / Pl 59.7%** |
| Calibration delta | **−27.5pp Hp / −32.5pp Pl** |
| Honest cumulative Δ from baseline | +49pp Hp / +47pp Pl |
| Sections at ≥5/7 strict | Hp 6/13 (Hp 3, 6, 8, 9, 12, 13); Pl 5/11 (Pl 4, 5, 8, 9, 10) |
| Commits | 24 fix-phase + base |
| New blocks delivered | 0 (architecture sufficient) |
| New primitive variants | ~6 (inverse-primary, inverse-secondary, link Button, DISPLAY heading size, Tabs underline, Eyebrow chip patterns) |
| Schema additions | `framed`, `displayHeading`, `headingMuted`, group-level `featuredMedia`, `objectFields` pipeline config |
| Pre-existing tsc errors carried | 3 (BlockRenderer, RichTextBlock, HeadingGroup PortableText narrowing) — never new |

### Calibration story

Two distinct estimate-inflation events in this dogfood run, both with the same root cause (optimistic counting of partial fixes as full row passes):

1. **Stage-5 estimates inflated ~50pp** before baseline measurement (caught at 2026-04-25). Stage-5 had exempted whole row classes ("color is tokenized so it'll be fine").
2. **Per-PR cell-delta estimates inflated ~30pp** before § 28 (caught at 2026-04-26). Per-PR had counted "row firms up from one ⚠ sub-item to ✓" as +1 cell while other ⚠/✗ sub-items in the row remained unfixed.

Different layers; identical pattern. **Both surfaced ONLY because we ran a comprehensive measurement pass.** Without it, the Stage-5 number would have shipped as "100% with exemptions" and the fix-phase number would have shipped as "92–95%". Neither would have been true.

---

## 2. What worked (system wins)

### Token-level wins

- **T1 cascade rebinding** (`6c7ebc8`) — `.tone-inverse` and `.tone-accent` rebinding `--color-secondary` solved 22+ sections in a single PR with **zero per-block changes**. Highest-leverage move in the run; works because semantic var names were preserved from Decisions design tokens, so per-block code reading `var(--color-secondary)` doesn't need to know about tone context.
- **T7 + T5 active-state ramp** — small additive token sets paired with block work delivered exact-token visual matches (lime callouts, autoSwitching active state).
- **T3 Display tier** — adding `--text-display-1: 80px` was 1 line + 1 enum entry + per-instance schema flag; unblocked Hp 1's exact 80px requirement.

### Architecture wins

- **`framed` prop on BaseBlock** — single `framed?: boolean` reused 7 times across 4 always-frame blocks (StatGrid, AutoSwitching, TabbedFeatures, Testimonials) + 3 schema-driven instances (FeatureGrid for Pl 4 + Pl 6 + Hp 5 + Hp 10; HeroCenter for Pl 3). **Cleanest pattern of the run** — additive, opt-in, reusable, no schema churn for always-frame blocks.
- **`noPadding` on Section** for compound padding avoidance — small primitive escape hatch unlocked correct hero + framed-block padding without compound-padding bugs.
- **Section heading variant override threading** (HeadingGroup → SectionHeading → BaseBlock) — once the override path existed, all heading-size fixes plugged in cleanly.

### Pipeline wins

- **S1 page-order preservation** (`d26aad7`) — single-line fix in `apply.ts` (`unset+append` → `insert('replace', ...)`) eliminated the entire iterative-seed-scrambling problem. Without it, every subsequent dogfood iteration would have continued corrupting page adjacency silently.
- **`images.objectFields` pipeline extension** — additive ~15-line addition to `apply.ts` solved sidebar.avatar (and any future object-nested image field) cleanly.
- **Designer asset coordination loop** (§§ 25–26) — surfacing a checklist of missing nodeIDs to the designer + receiving them in a single round + applying via existing pipeline. Worked end-to-end in <½ day.

### Variant wins

- **`inverse-primary` + `inverse-secondary` ButtonVariants** — cleanly captured the Decisions design system's two main CTA states. Schema-aware threading via `cta.color` signal (`'light'` → secondary, else → primary) unlocked correct hero CTAs without seed extension.
- **Per-block-author-explicit pattern** for Navy CTAs on horizontal callouts + accordion sidebars (vs schema-driven) — kept the change footprint small (no schema/seed churn) when the design uniformly wanted Navy in those contexts.

### Macro-level system assessment

Beyond the per-fix wins enumerated above, the system architecture as a whole landed in a state described as: "This run brought everything close to being in a perfect place" and "This system has worked incredibly well, and is the basis for projects going forward." The token + primitive + schema architecture is now the validated foundation for forks; the design→code→QA→fixes→client-review loop is mostly solved at the architectural layer (visual fidelity verification being the primary outstanding piece — see § 3).

No specific per-fix high-leverage callouts were enumerated from a PM/handoff perspective; the wins above are ordered by impact-on-cell-counts as measured by the system.

---

## 3. What didn't work / gaps surfaced (system limits)

### Per-PR cell-delta inflation — silent for 20 commits

The dominant calibration failure. Across §§ 9–27, each PR claimed +1 or +2 cells based on partial fixes ("button now Navy" / "padding now 48px") without re-checking whether the row as a whole still had other unfixed sub-items.

Concrete example: **Hp 12 accordion**. Across 4 PRs (B8 plus/minus icon, B8 chrome, B6 sidebar avatar, P4 two-tone heading) we claimed firmness on rows 1, 6, 7. § 28 strict scoring shows the section actually scores 5/7 — most of those claimed deltas were directional but didn't move cells.

Pattern repeats across ~15 sections. Aggregate inflation: **~30pp per page**.

**Architectural cause (not just scoring discipline):** the inflation is a **methodology** failure, not a self-reporting failure. There was no per-PR verification gate — the only measurement-level checks were at start + end of fix phase. Per-PR self-reports compounded silently because nothing forced a re-check between commits. The fix isn't "score better" or "be more honest in commit messages"; it's "add per-batch verification gates" (Iteration B in § 5 implements this at the tooling layer; § 4 lesson 12 implements it at the prompt layer via validate-first). Both are the same architectural pattern — verification gate before claiming a result — applied at different points in the workflow.

### Stage 1 missed page-level patterns

Several visually-obvious patterns never made it into the implementation. As surfaced during retrospective dialogue:

> "I think the first stage i.e. establishing blocks, behaviours, primitives, layouts, page level details needs more input from the user. Some things that are obvious when I view Figma don't shine through on the system ingestion level."

Three concrete examples enumerated:
- **All sections framed by default** (except callout) — implementation framed only ~half the sections, opt-in per block
- **Consistent 32px gap between sections** — implementation has variable gaps via Section spacing prop (compact / default / roomy)
- **Page-wide single bg color** — implementation has per-section tone with no overall page bg

These are designer conventions visible at the page level but invisible at the per-section drill-in level. The Stage 1 ingestion pulls per-section evidence + design-system tokens; **neither captures page-level patterns**. Result: implementation doesn't reflect the conventions even when they're trivial design decisions.

### Measurement-only methodology has visual blindspots

`measure-*.mjs` extracts computed CSS values via `page.evaluate(getComputedStyle)`. That catches "wrong size / wrong color token" but misses:

- **Proportional / spatial relationships** (heading correctly 80px but visually too small for the section)
- **Visual rhythm** (correct padding numbers but feels cramped)
- **Element alignment** (CTAs positioned correctly individually but stack wrong)
- **Decorative element placement** (logomark sits at right corner pixel-wise but misses visual center)
- **Holistic gestalt** — does the section "read correctly"

Framing surfaced during the rescore dialogue:

> "The assumption based system seems to have a bias towards marking something as correct with a proper check, even with access to measurements, playwright and Figma."

> "I'm asking as a human who sees things through the lens of an eye, so maybe computationally is perfect since we're processing the data through code/computer systems."

> "When a project manager goes through this, they will highlight every little difference, so if we're going to share something, I'd rather be strict and not have a large number of tickets floated back to us."

Even § 28's strict measurement-based scoring is **probably mildly inflated** relative to a true human-eye review. A PM walking through with Figma side-by-side will log tickets the script can't see.

**Pattern observation across the run:**

> "this highlights for the second time, that we are overscoring the visual fidelity without ensuring it actually matches up with the designs."

The two inflation events (Stage-5 ~50pp + per-PR ~30pp) share the same shape — optimistic counting against an unverified reference. The system needs visual verification gates to break the pattern.

### Subtle visual signals the script can't see

A small but real example caught during the run: the Button primitive's fallback `href` was rendering `#` (technically valid HTML) but reading as visually broken in Sanity studio + browser inspect. The structural measurement system would never have flagged this; only human-eye review surfaced:

> "# alone isn't valid and has a error mark on it that implies something broke."

This is a representative example of what visual review catches that numeric measurement misses.

### Primitive anti-patterns (4 instances)

During fix-phase work, several plain `<span>` elements were introduced where primitive variants should have been used:

| Anti-pattern | Block | Should be |
|---|---|---|
| Audience-split chip (light bg + border) | FeatureGridBlock (B11) | Eyebrow variant or new `<Chip>` primitive |
| Numbered chip (44×44 navy/lime) | FeatureGridBlock (P8) | Same |
| Sidebar status dot (10px green indicator) | AccordionBlock (B8) | Avatar variant (`indicator?: 'online' \| ...`) |
| Row label (during P6 — caught + corrected) | UseCaseListBlock | `<Text className="text-h4">` (corrected to use primitive after user feedback) |

Common driver: small styled element doesn't fit cleanly into existing primitive's variant API; `<span>` is the unblock-it-now path. Each ducks the question of "should this primitive's variant API expand?"

**Connects to § 4 lesson 12 (validate-first):** the planning step that should have asked "expand variant API or override via className?" was skipped under time-pressure. Each `<span>` is downstream of a missing validation gate — a fix-phase prompt with explicit validate-first discipline would have surfaced the question before the shortcut was taken. The anti-pattern itself is a symptom; the cause is the same prescriptive-without-validation failure mode that drove per-PR cell-delta inflation.

Worth noting: each plain `<span>` is **grep-invisible** from a primitive-audit perspective. Scattered enough that they'll be hard to find during retrospective cleanup unless we know where to look (this doc enumerates them).

**Forward standard set during the run:**

> "I think using <Text> and then assigning className=\"text-h4\" is the best way, given that it will be very easily findable later on and can be brough back up in a retrospective."

This is the canonical pattern going forward when a primitive's variant API doesn't cover a design need: use the primitive, override via `className`. The override stays grep-discoverable; the primitive shell preserves audit reachability. Plain `<span>` should be considered an anti-pattern.

### Heading H1-vs-H2 systematic gap (~10 sections)

Section headings render as H2 (48px) in most blocks while design wants H1 (64px). The hero H1 fix (§§ 21–22) only patched HeroCenter and AutoSwitching; the remaining 10 section blocks (statGrid, featureGrid, callout, testimonials, accordion, etc.) still default to H2. **This is one row × ~10 sections = the largest single contributor to inflation.**

Fix is structural: BaseBlock should default to H1 with per-block override, OR a smarter HeadingGroup that resolves to H1 by default and accepts H2/H3 overrides for nested cases. Not yet implemented.

### Description size + color systematic gaps

- **Body description sizes** render as `Text size=BASE` (16px) in feature-grid / callout / testimonial / etc. while design wants `text-h5` (18px). Affects ~12 sections.
- **Description colors** render as `rgba(10,10,12,0.6)` (60% opacity) where design wants solid `#0A0A0C`. Most descriptions, but design varies — some sections do want 60%.

Both are 1-step systematic drift accumulated across most section blocks. Not yet fixed.

### Asset-coordination loop scale unknown + friction signal

The loop that worked (§§ 25–26) was: 4 missing assets → checklist surfaced → designer/user pasted figmaNodeIDs back → seeds updated + applied. Worked end-to-end at this scale. **But**: only one designer + one Sanity user + 4 assets. At larger scale (10+ assets, multi-stakeholder, asynchronous) the unstructured paste-checklist format may not hold up. No formal handoff artifact yet.

A friction signal surfaced during the avatar lookup:

> "Do you mean this node? 7876:58483 The circular avatar for Chat with Support? Can we not pull it from the node?"

Read: the system requires manual figmaNodeID lookup for what looked like an obvious extraction from the parent component. Suggests the loop could be automated further — the system already has the parent section nodeID; finding "the avatar" inside it should be a tractable Figma MCP query rather than a human-resolved lookup. Worth investigating in a future iteration.

---

## 4. Lessons codified

(Captured into auto-memory at `project_new_project_pipeline_dogfood.md` + propagation paths into `figma-mcp-template.md`)

### From this run

1. **Measure-don't-estimate at every layer**, not just at Stage-5 vs measurement boundary. Per-PR cell deltas need verification gates too.
2. **Per-batch verification gates** — every ~3-5 PRs run a measurement re-check, not just at start + end of fix phase.
3. **Pass criteria stated up front, not inferred per-PR.** Fix-phase planning should specify the bar for each row before code lands ("row 4 passes when all 4 sub-items resolve to ✓"). Per-PR self-reporting is then mechanical (does this PR satisfy the stated bar?), not subjective. Distinguishing "row firms up" from "row passes" is downstream of plan-design discipline — the upstream lesson is that **pass criteria must be explicit before implementation**. A row with 3 sub-items and 2 fixed = ⚠→⚠ firmness, NOT ⚠→✓; only count cell delta when ALL sub-items pass against the up-front criterion.
4. **Measurement ≠ visual fidelity.** Numeric measurement is necessary but insufficient. For "ready-to-share" gates, add visual-pixel-diff (Playwright `page.screenshot()` + `pixelmatch` against Figma export).
5. **`images.objectFields` pipeline pattern** for one-level-deep object-nested image fields. Reusable for any future block with this structure.
6. **S1 fix matters under iterative seeding** — `insert('replace', ...)` instead of `unset+append`. Without it, every fix-phase re-apply corrupts page adjacency silently.
7. **Seed-file-first investigation rule** when render diverges from queue expectations.
8. **Tailwind v4 spacing-shadow gotcha** — same-property utilities resolve by source order in compiled CSS (smaller spacing values come earlier → larger spacing values win). Pattern: split conflicting utility-class layers so they don't both apply (e.g., size px vs shape px).
9. **Anti-pattern flag**: plain `<span>` for styled elements where primitive variant API should expand. Each instance ducks the variant-API design question.
10. **Layered anchor reset** — globals.css `a { color: inherit }` must live in `@layer base` so Tailwind `text-*` utilities can override per-element. Discovered during B3; without it, every `<Button as="a">` with `text-[var(--color-inverse)]` was being shadowed.

11. **Visual-diff goal is PM-acceptable tolerance, NOT absolute pixel perfection.** Pixel-perfect is the wrong optimization target — chasing it creates fix-cause-new-break loops because designer artifacts, system tradeoffs, and font-rendering-at-scale all generate sub-1% pixel drift that isn't actionable. The right target is "close enough that a PM wouldn't log a ticket" with explicit space for "designer artifact, query the designer" classification. Threshold ranges (~95% pass / ~85-95% triage / <85% fail) calibrated per project; system principles (token usage, primitive boundaries) override pixel match when they conflict.

12. **Validate-first invariant for fix-phase prompts.** Prompts that prescribe solutions ("change `--color-secondary` to X") create the same optimism failure mode as Stage-5 rubric estimates: they ship implementation choices without validating against alternatives, and the validation never happens silently. Codified in `session-prompts.md` Fix-phase kickoff prompt: every fix-phase session runs a 30-min validation step against per-section evidence + AGGREGATION-SUMMARY § 3 alternatives BEFORE coding. Suggestions in § 3 are starting points, not prescriptions. Documenting "suggestion held as-is" matters as much as documenting a refinement; skipping validation is the same shape of failure as estimating-not-measuring at the rubric layer. The two patterns are the same architectural problem at different layers (rubric scoring vs. prompt design); the same fix (verification gate before claiming a result) applies to both.

13. **Orchestration / parallel-worker patterns: read-only OK, fix-phase NO.** Considered an orchestrator + parallel sub-agent pattern (`Agent` tool + `isolation: "worktree"`) to reduce human-as-bottleneck. Conclusion: the pattern works for **read-only / measurement passes** (per-section workers in parallel — `Agent` tool already supports this with worktree isolation) but **NOT for fix-phase work**. Chained fix-phase sessions undermine the validate-first invariant — wrong calls in tier N compound through tier N+1 before human review. Future projects: parallelize the measurement audit if speed matters; preserve the per-tier human checkpoint between fix-phase sessions. Permission-batching at an orchestrator level is also a non-fix: Claude Code's permission system grants by user, not by orchestrator, so workers' permission requests still flow to the human regardless.

14. **alpha_v5 is the canonical playbook source going forward.** alpha_v3 frozen as historical snapshot (pre-Decisions-dogfood, pre-measurement-workflow); alpha_v4 abandoned during integration uncertainty; future projects fork from alpha_v5. The `alpha_vN` naming convention is being used as snapshot-versioning in lieu of git branches given iteration speed. For a new project: clone alpha_v5 → alpha_v6, substitute project-specific tokens (`PROJECT_DESIGN_NODES.md`) and seeds, run the prompt lifecycle. Tokens are project-specific; schema additions (`framed`, `displayHeading`, etc.) carry forward; workflow docs carry forward; per-section evidence files do NOT carry forward.

15. **session-prompts.md 7-prompt lifecycle is itself an artifact.** Build (kickoff / resume / retrospective) + measurement (audit) / aggregation + fix-phase kickoff + focused re-measure. Cold-bootability is a pipeline-level invariant: every prompt assumes zero prior context and points at all the files needed to assemble understanding. Project-specific values (paths, fileKey, branch name, dev-server URL) are tabulated for substitution in § "Notes on reuse." This prompt set is what future projects inherit — not just the workflow docs they reference.

16. **Wallclock is irrelevant for an unattended pipeline.** Stakeholder-facing framing matters: the system can run for 2–3 hours per page unattended; the user "sets it running and walks away." Library-additions amortization (P2/P1 ratio) is the only meaningful per-page cost measure. Sell brand-accurate pages from Figma at predictable per-page work cost — don't sell time-to-render. The wallclock-as-side-metric framing in § 1 is the right level; this lesson restates it as something to repeat in client / stakeholder conversations rather than as an internal accounting note.

17. **Semantic var-name preservation tradeoff in theme.css.** Shipped Decisions tokens with names diverging from values intentionally — `--color-brand-fuchsia` holds lime green, `--color-brand-purple` holds soft blue, `--color-brand-gold` holds warning yellow. Rationale: a rename refactor would touch every primitive consumer reading these vars; preserving names kept the change footprint at theme.css alone. Cosmetic rename is a follow-up PR if mismatches cause confusion in practice (none observed yet during the run, but it's a real ergonomic compromise that future-fork readers will hit). Documenting the tradeoff so the decision isn't re-litigated each time someone reads `--color-brand-fuchsia` and finds a green color.

### Carried from baseline retro (still load-bearing)

- Measurement workflow at `alpha_v5/docs/measured-fidelity-audit.md` is permanent Stage 5+
- Figma MCP token-ceiling fallback ladder (try `get_design_context` → `get_metadata` → individual child `get_design_context` → `get_screenshot`)
- Rubric exemption rule: only legitimate exemption is when failing row matches a known Tier-2/3 gap with explicit deferral note

---

## 5. Action plan — next iterations (A–E)

| Iteration | Goal | Effort | Dependency |
|---|---|---|---|
| **A. Stage 1 hardening** | Page-node Figma MCP inspection (`get_design_context` on the page node, not just children) + designer Q&A checklist + `_page-patterns.json` artifact + Page/Section/Container reading patterns from it. **Process change as well as tooling:** human-as-curator review of page-level conventions BEFORE Stage 1 drills into sections. Tooling alone doesn't catch designer-conventions like "all sections framed by default" or "32px gap rhythm" — a human reviewing the page-node screenshot does. The `_page-patterns.json` artifact is what the human produces; the tooling is what consumes it downstream. | ~1–2 days | none |
| **B. Visual-similarity gate** (NOT pixel-perfection) | `measure-visual-diff.mjs` (Playwright section screenshots + Figma MCP design screenshots + similarity scoring via `pixelmatch` or perceptual hash); per-batch verification gate; rescore rubric format that includes similarity scores. **Threshold: PM-acceptable tolerance, not absolute match** — see § 7 calibration boundary. | ~1–2 days | none — independent of A but pairs cleanly |
| **C. Re-baseline alpha_v5 against new gates** | Run A + B against current branch state. Get a real visual-diff number per section. Identify systematic gaps strict measurement missed. | ~½ day | A + B |
| **D. Focused fix-batch on systematic gaps** | BaseBlock H1 default for non-hero blocks, Text H5 default for body descriptions, Hp 12 framed, plus whatever C surfaces. Use B's per-batch gate. | ~½–1 day | C |
| **E. WORKFLOW.md authorship** | Consolidated stage-by-stage usage guide referencing the alpha_v5 artifacts + new gates from A + B. Include calibration lessons from §§ 1–4. | ~½ day | D |

**Sequence rationale:** A unblocks B (visual diff needs page-level expectations to know what to compare against). B is where the leverage is — eliminates the calibration failure pattern. C validates A + B. D is the first run with the new gates active. E captures the system after it's stabilized.

**Total: ~4–6 days focused work** to close out dogfood-run hardening properly.

**Origin of iterations A + B:** these crystallize directly from the proposal made during retrospective dialogue:

> "Going forward I believe batching fixes, then running a full testing workflow would make the most sense. That is to say, check measurements, check visually with playwright, compare vs. Figma, and mark appropriately. ... The upfront cost is higher given the back and forth between testing and coding but the hope is that it prevents multiple fixes having to repeated over and over in order to get to full visual fidelity."

> "In my view it is better overall context on the designs and heavier usage of playwright <> figma interaction to get things as close to pixel perfection as we can."

A captures "better overall context on the designs"; B captures "heavier playwright ↔ figma interaction"; D realizes the "batched fixes + full testing workflow" cycle.

### Explicitly deferred — responsive / a11y / performance

Responsive testing, accessibility auditing, and performance budgets are real gaps but **deferred until design-to-code workflow is feature-complete**. Position established:

> "responsive, a11y pass and performance are definitely concerns, but they rank below the designs to code changes. Without having an absolute workflow that performs correctly for the design to code, everything else is not particurlaly useful. It obviously would be nice to have these, but focusing on them now pre-feature complete state would be a mistake."

This is correct prioritization. None of those concerns are useful until the pipeline reliably produces visually-faithful output. Sequencing:
1. Stabilize design-to-code (Iterations A–E)
2. Then: responsive coverage (likely Iteration F), a11y audit (G), perf budgets (H)
3. Then: Sanity studio handoff protocol (designer-edits-content workflow)

Iteration F+ are explicitly out of scope for the next round.

---

## 6. Pre-deploy checklist

Before pushing `feat/decisions-dogfood-run` to production or opening a long-lived PR:

- [ ] **CtaButton `http://localhost:3000/` fallback** → parameterize to `process.env.NEXT_PUBLIC_FALLBACK_URL ?? '/'`. Currently dev-only literal will break in prod. Flagged in commit `5d022e0` body.
- [ ] **3 pre-existing tsc errors** (BlockRenderer, RichTextBlock, HeadingGroup PortableText type narrowing) — not new but fail strict CI. Knock out before opening PR.
- [ ] **HeroSplitBlock + StatGridBlock unstaged `bg-white` modifications** — leftover from pre-dogfood experimentation. Decide: keep, revert, or fold into a real commit.
- [ ] **Hp 1 composed bg upload** — designer to upload flattened composed graphic (photo + diamond mask + 4×4 logo pattern + 20% black tint) replacing current single photo at figmaNodeId.
- [ ] **§ 28 strict measurement noted in PR description** — branch's earlier commit messages claim cumulative percentages that strict rescore now contradicts. Either update commit messages (rebase → fragile) or note in PR description that "running per-commit estimates were ~30pp inflated; ground-truth strict measured Hp 65.9% / Pl 59.7% per § 28."
- [ ] **Decide: do we ship now at strict 65/60, or run Iteration D first to lift to mid-70s?** Materially affects what number goes in the PR description.

---

## 7. Open questions / what's not yet known

- Will visual-pixel-diff (Iteration B) surface systematic issues we haven't seen yet? Probably yes, based on how much the strict measurement rescore moved. But pixel-diff also has its own calibration questions (anti-aliasing, font rendering, viewport).
- What's the right pixel-similarity threshold (90%? 95%? per-section calibrated?) Need to run B once to know the realistic distribution.
- Does Stage 1 hardening (Iteration A) replicate cleanly to a fresh project? Need to test by forking alpha_v5 → alpha_v6 for next project.
- How does the designer asset coordination loop scale beyond 1 designer + 1 Sanity user + 4 assets? At larger scale, does the checklist format hold up? Might need a structured artifact (JSON/YAML) the designer fills in directly.
- Visual fidelity is the "biggest" hurdle but responsive + a11y + perf budgets remain unresolved. Are those next-quarter problems or do we tackle one in Iteration F+?
- For the next project's fork: which alpha_v5 artifacts copy forward as-is vs which are project-specific? (Tokens are project-specific. Schema additions like `framed` carry forward. Workflow docs carry forward. Per-section evidence files do NOT carry forward.)

### Direction stated for what comes next

> "Where do we go from here in order to progress towards perfection? In my view it is better overall context on the designs and heavier usage of playwright <> figma interaction to get things as close to pixel perfection as we can."

Stated direction: **as close to design fidelity as the system can reasonably get**, achieved via better design context (Iteration A) + heavier Playwright↔Figma interaction (Iteration B). The action plan in § 5 is the operationalization of this direction.

### Calibration boundary on visual diff — NOT absolute pixel perfection

A second-order calibration surfaced during retrospective dialogue that's important to record alongside the iteration plan:

> "One pushback is on the pixel diff. I think going for absolute pixel perfect is a mistake. Some designers make mistakes or things just can't be exact pixel perfection without anti-patterns in relation to sizing or shading or padding. Looking for pixel perfection will, quite possibly, lead to going in circles trying to solve one tiny issue, only to cause things to break somewhere else. Comparisons are definitely worth it, and getting as close to designs as possible is important, just looking for ABSOLUTE pixel perfection seems too tight."

This is a load-bearing constraint on Iteration B (visual-pixel-diff gate). The diff system is valuable, but its goal is **PM-acceptable tolerance**, not 100% match. Concretely:

- **Designer artifacts ≠ code bugs.** Designers make mistakes. The diff system needs a way to flag "this is a designer artifact, query the designer" vs "this is a code bug, fix the code" — without forcing the implementation to chase the artifact.
- **Some perfect matches force anti-patterns.** Padding / sizing / shading sometimes can't be 1:1 without code that violates other system principles (e.g., per-pixel Tailwind arbitraries that bypass the token system, or breaking primitive variant boundaries). Choose the system principle over the pixel.
- **Threshold should accept reasonable drift.** A 95% similarity score on a section that "reads correctly" to a PM is a pass. The 5% delta might be anti-aliasing, font rendering at scale, or a 1-2px decorative offset — not actionable.
- **Tight pursuit creates whack-a-mole.** Fix-one-tiny-issue → break-something-else loops are real and waste cycles. The rubric should reward "close enough that a PM wouldn't log a ticket" not "absolute match."

**Operational implication for Iteration B:**

| Score band | Meaning | Action |
|---|---|---|
| ~95%+ similarity | PM-acceptable | ✓ pass |
| ~85-95% | visible but possibly justified (anti-pattern avoided / designer artifact / scale-rendering) | ⚠ flag, surface for human triage; not auto-failed |
| <85% | likely real code gap | ✗ fail, fix |

Per-section threshold may need calibration once Iteration B runs — there's no universal "right" number, only a defensible distribution per page. The threshold itself is an open question (see § 7).

**This calibration distinguishes "useful diff system" from "perfectionism trap."** The retrospective records both the direction (closer to design fidelity) and the constraint (don't chase absolute pixel perfection) because both are load-bearing.

### Intentional scope of this PR

> "This is a large single PR on the site-foundry, purposefully. The goal of this PR was hardening the system and we've achieved a great load, yet there is more yet to solve."

Worth recording explicitly: the size of `feat/decisions-dogfood-run` (24 fix-phase commits + base) is a deliberate choice, not accidental scope creep. The PR's purpose was system hardening — primitive variants, schema patterns, pipeline fixes — which by nature span many files and disciplines. Future projects forking alpha_v5 inherit this hardened foundation; their PRs should be smaller and more domain-focused.

---

## 8. Cross-references

- `alpha_v5/RETROSPECTIVE-2026-04-25.md` — baseline-measurement retrospective (predecessor to this doc)
- `alpha_v5/screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — per-PR detail (§§ 1–28); § 28 is the honest-rescore ground truth
- `alpha_v5/screenshots/baseline-2026-04-25/SESSION-LOG.md` — original measurement session trace
- `alpha_v5/docs/measured-fidelity-audit.md` — Stage 5+ measurement workflow (existing)
- `alpha_v5/docs/figma-mcp-template.md` — Figma MCP usage + token-ceiling fallback rules (existing)
- `~/.claude/projects/-home-brock-Design-to-code-chats/memory/project_new_project_pipeline_dogfood.md` — auto-memory entry (codified lessons + how-to-apply)
- `alpha_v5/seeds/queues/2026-04-22-new-project-pipeline-queue.md` — original pipeline progress queue + measured rescore subsection
