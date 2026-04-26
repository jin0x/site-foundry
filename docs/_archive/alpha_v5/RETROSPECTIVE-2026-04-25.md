# Retrospective — new-project Decisions dogfood (close-out 2026-04-25)

Synthesis-of-syntheses. If someone only reads one file from this experiment, this is it. Pairs with:

- **Data:** `screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` — measured rubric + ranked backlog
- **Audit trail:** `seeds/queues/2026-04-22-new-project-pipeline-queue.md` — full history
- **Workflow:** `docs/measured-fidelity-audit.md` — reusable measurement procedure
- **Tokens:** `PROJECT_DESIGN_NODES.md` — Decisions design system reference

---

## The headline finding — calibration pattern across three passes

| Pass | Method | Homepage | Platform | Δ from prior |
|---|---|---|---|---|
| Stage 5 rubric (with exemptions) | Estimate | 100% | 98.5% | — |
| Honest rescore (un-exempted color + typography) | Estimate | ~65% | ~70% | -35 / -29pp |
| Measured pass (Playwright + drill-in MCP, strict ⚠=fail) | **Measured** | **16.5%** | **13.2%** | -49 / -57pp |

**Each pass corrected the previous by 30-50pp in the same direction.** The honest rescore was right in *direction* but wrong in *magnitude* — un-exempting Color + Typography-weight only addressed 2 of the 6 row-classes that fail at scale. Rows 1 (chrome), 5 (padding), 6 (content/images), and 7 (affordance) ALSO fail at scale, but those gaps weren't visible without per-section measurement against design intent.

**Lesson that travels beyond this project:** rubric estimates default to optimistic in proportion to how hard the rubric is to score. When you can't see the gap concretely, intuition rounds toward "looks fine." Measurement isn't optional for fidelity claims you intend to publish externally.

---

## What's actually true now

**Amortization thesis: PASS** (unchanged). Library-additions ratio Page2/Page1 = 0/2 = 0. The bottom-up pipeline shape works as advertised; the page-cost-decreases-as-library-grows claim held empirically.

**Visual fidelity: ~15% strict measured** on both pages. Zero sections at ≥5/7 on either page; max section score is 3/7. The pages render functionally — content is there, palette is right — but the 7-axis rubric reads honestly low because typography sizes, block chrome, padding, content, and affordance all fail simultaneously.

**Realistic post-fix roadmap** (from AGGREGATION-SUMMARY's 4-tier ranking):

| Tier | Effort | Page-level fidelity uplift |
|---|---|---|
| Tier 1 (T1 + T2 + P1 single PR) | ½–1 day | ~15% → ~50% |
| Tier 2 (primitive-level, P2-P9) | +3-4 days | ~50% → ~75-80% |
| Tier 3 (block chrome + featured images) | +1-2 weeks | ~75-80% → ~85-90% |
| Tier 4 (pageBuilder ordering + content) | +1 week | ~85-90% → ~92-95% |

**Total: ~3-4 weeks of focused fix work to 90%+.** Not the "single PR" framing the post-token-swap projection implied. Token swap was directionally right but only one of four leverage layers.

---

## What was surprising

1. **Token swap moved less than expected.** Theme.css ingest fixed the palette mathematically, but the visible gaps were dominantly *primitive caps* (Heading maxes at h1=48; design uses 64/72), *block chrome* (universal outer borders + designed padding missing across 14 sections), *content* (no featured images), and *affordance shape* (rectangular vs pill buttons). Color was a smaller share of the gap than the rescore implied.

2. **Pipeline pageBuilder order scrambles design adjacency.** Render order on Platform: 1→2→3→6→11→4→9→8→5→10→7. Same scramble on Homepage. Known quirk in STATUS.md (`unset+append` upsert reorders), but only became *visible* at-scale during measurement. Earned its leverage-48 ranking honestly. Listed as S1 in the gap heatmap.

3. **One investigation finding travels beyond this project.** "We stand apart" was Section 4 the entire time, misclassified during session 2-extension as missing-section + idx-5 orphan. One `cat seeds/platform/04-numbered-features.json` would have caught it. **Rule earned: when render diverges from queue expectations, read the seed file FIRST.** Belongs in `figma-mcp-template.md`.

4. **Estimates were systematically too generous.** Three iterations. Each layer of evidence corrected by 30-50pp. The pattern itself is the lesson — not which specific number was wrong.

5. **The Playwright × Figma drill-in pairing was load-bearing** as a combination, not as either tool alone. Each gave us measured values from one side; together each rubric row had two concrete values and comparison was mechanical, no judgment calls. The drill-in fallback ladder (`get_design_context` → `get_metadata` → child-by-child → `get_screenshot`) was the unsexy piece that made it scale to dense section frames.

---

## What to keep vs recalibrate

**Keep:**
- The measure-first workflow (`docs/measured-fidelity-audit.md`). Reusable, ~12 min/section, produced honest evidence.
- The amortization-test discipline (library-additions ratio). Simple, mechanical, falsifiable.
- The dual-rubric (visual + behavior) for separating "looks right" from "works right."
- The two-tier rescore framing (today vs post-fix projection) — but apply it to *layered* fix tiers, not a single PR.
- The drill-in MCP fallback ladder for ceiling-error frames.
- The seed-file-first investigation rule.

**Recalibrate (do differently next time):**
- Drop the "single PR closes the fidelity gap" framing. Always wrong when fix layers cross primitive + token + block + content.
- Stage-5-with-exemptions rubric is fine for in-flight feedback. It is not fit to publish externally as a fidelity number. Use measurement before claiming externally.
- "X hours per page" is the **render-functional** budget, not the **render-brand-accurate** budget. Claim what you can measure.
- Time amortization curve is dependent on primitive maturity. Decisions exposed primitive caps (Heading h1=48px max). Fix those first; *then* future pages amortize cleanly.

**Throw away:**
- The original 100% / 98.5% Stage-5 numbers (artifact of exemption rule miscalibration).
- The "real tokens PR is the highest-leverage single follow-up" recommendation. The measurement showed token PR is one of four layers; T1+T2+P1 is the more honest framing.

---

## Recommended forward sequence

In order, with rationale:

1. **Codify measurement into `figma-mcp-template.md`** as a permanent Stage 5+ section. Highest-EV thing to come out of this run because every future project benefits. Three concrete additions: (a) measurement procedure pointing at `docs/measured-fidelity-audit.md`, (b) MCP-ceiling fallback ladder, (c) seed-file-first investigation rule.

2. **Ship Tier 1 PR** (½–1 day) as the first concrete fix delivery. Single PR touching `packages/tokens/src/theme.css` + `packages/ui/src/primitives/Heading`. Demonstrates workflow outputs translate to measurable improvements; gets both pages from ~15% to ~50% in one merge. User-facing artifact (a page that genuinely looks closer to design) lands fast.

3. **Re-measure ONLY affected rows after Tier 1 lands** — don't re-run the full 24-section pass. Visit each section in browser, verify the flagged rows now pass. ~30 min vs another 5h. Confirms the projection empirically OR breaks it (in which case investigate).

4. **Decide Tier 2-4 schedule** based on appetite. Each tier has defined scope + measurable uplift target. Predictable.

---

## Open question — alpha_v5 → alpha_v3 docs fold-in

The alpha_v3 docs (`figma-mcp-template.md`, `component-queue-template.md`, `content-extraction-prompt.md`) are the canonical playbook every future project's first session will read. The measurement workflow learned in alpha_v5 belongs to *every* future project, not just this one.

**Decision pending:** when to fold these alpha_v5 learnings into alpha_v3.

Recommendation: **after Tier 1 PR lands and re-measure confirms the ~50% projection holds.** That's the proof that the workflow's outputs translate to measurable real-world uplift. Once confirmed, copy:
- `alpha_v5/docs/measured-fidelity-audit.md` → `alpha_v3/docs/measured-fidelity-audit.md`
- Add Stage 5+ measurement section to `alpha_v3/docs/figma-mcp-template.md`
- Add MCP-ceiling fallback ladder to same file (S-D11 from scratchpad — already pending)
- Add seed-file-first rule to same file (newly earned this session)

Until then, alpha_v5 stays alive as the working dir + audit trail. Don't archive.

---

## File index — stable state at close

| File | Purpose | Status |
|---|---|---|
| `RETROSPECTIVE-2026-04-25.md` (this file) | Synthesis-of-syntheses | New 2026-04-25 |
| `STATUS.md` | Active-experiment block + verdicts + roadmap | Updated 2026-04-25 |
| `screenshots/baseline-2026-04-25/AGGREGATION-SUMMARY.md` | Measured rubric + cross-section heatmap + ranked backlog (4 tiers, top fixes) | Aggregation pass 2026-04-25 |
| `screenshots/baseline-2026-04-25/SESSION-LOG.md` | 4-session trace of measurement pass | Sessions 1-4 |
| `screenshots/baseline-2026-04-25/<page>-section-<NN>-<slug>.md` × 24 | Per-section diff docs (site vs design measured) | Complete |
| `screenshots/baseline-2026-04-25/POC-FINDINGS.md` | First proof-of-concept on AutoSwitchingCards (workflow validation) | PoC 2026-04-25 |
| `seeds/queues/2026-04-22-new-project-pipeline-queue.md` | Pipeline progress + history; § "Measured rescore" supersedes earlier estimates | Closed |
| `seeds/{platform,signalwire}/*.json` | 25 applied seeds | Stable (don't re-run) |
| `library-coverage-ledger.md` | Per-page library addition counts; amortization verdict | Closed |
| `docs/measured-fidelity-audit.md` | Reusable measurement workflow (Playwright + drill-in MCP) | New 2026-04-25 |
| `session-prompts.md` | Kickoff + resume + retrospective + measurement + aggregation prompts | Extended 2026-04-25 |
| `pre-run-sanity-check.md` | 5-check pre-flight | Stable |
| `theme.css.draft` | Draft of Decisions theme ingest (final shipped to Site Foundry) | Reference |
| `PROJECT_DESIGN_NODES.md` | Decisions design system tokens (extracted via MCP) | Stable reference |
| `measure-section.mjs` | playwright-core script used during measurement pass | Reusable |
| `gap-triage-2026-04-22.md` | SignalWire-era triage doc inherited from alpha_v3 fork | Historical (reference for rubric exemption decisions) |

Memory + STATUS pointers are coherent across all three top-level entry points (alpha_v5/STATUS.md, memory file, MEMORY.md index). A cold session can land at any of them and find their way to the rest.

---

## Single-line bottom line

**The bottom-up pipeline works (amortization PASS), the measurement workflow scales (~5h for 24 sections), and visual fidelity is a multi-layer fix problem with a predictable ~3-4 week roadmap to 90%+. None of those facts were certain before this run; all three are now grounded in evidence.**

Pause point. Next-step decisions are deferred to a future session.
