# SignalWire dogfood archive

Evidence from the 2026-04-22 dogfood run that validated the Figma-to-Sanity pipeline. **Reference material only — not a live project.**

## What's here

- `seeds/signalwire/` — 9 seed files for frames #1–#8 of the SignalWire homepage. Used to prove the end-to-end pipeline across all 11 block types. Applied to `signalwire-homepage-v2` in the `site-foundry-dev` dataset.
- `queues/` — two round queue files with session handoffs, prediction-accuracy tallies, and the S1–S9 docs-edit stickiness verdicts.

## Cross-project reference left at `alpha_v3/` root

- `gap-triage-2026-04-22.md` — the post-dogfood ranked gap list. Most items have been struck through as shipped; remaining entries are still useful cross-project intel.

## Why archived

SignalWire was never a live consumer — the designs were used as reference to stress-test the pipeline across a realistic set of frames. With the dogfood complete (every frame on its proper block type, zero degrade paths, 100% round-2 prediction accuracy), the working directory was cleared to make room for ProjectX.

## When to reference

- Verifying how a specific block was exercised end-to-end (look at the seeds).
- Understanding why a gap entry was ranked a certain way (queue handoffs have the evidence).
- Tracking which primitives got added as a result of dogfood friction.
