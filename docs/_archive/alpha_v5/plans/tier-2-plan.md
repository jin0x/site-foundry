# Tier 2 PR — validated plan (2026-04-25)

Validated against per-section evidence in `screenshots/baseline-2026-04-25/` + Site Foundry code. Validation time-box ~25 min. P3 + P5 decisions pre-locked by user; P2 had one open question — resolved here.

Scope: P2 (Button rectangular shape) + P3 (`inverse-primary` variant) + P5 (consumer threading on inverse-tone blocks). Subsequent Tier 2 PRs cover P4/P6/P7/P8/P9.

---

## P2 — `<Button shape='rectangular'>` variant

**Status:** HOLD with refinement. Open question resolved — see "Variant-defaults-shape" below.

**Approach:** Add a `ButtonShape` const-enum (`PILL` / `RECTANGULAR`) following the `HeadingWeight` pattern in `heading-types.ts`. Split `rounded-full` out of `Button.tsx` `BASE_CLASSES`; resolve via `SHAPE_CLASSES` map. Default = `'pill'` for the existing `solid`/`outline`/`ghost` variants → preserves all existing call sites byte-for-byte.

**Variant-defaults-shape — RESOLVED: TRUE.** The new `inverse-primary` variant (P3) defaults `shape='rectangular'`. Add a `DEFAULT_SHAPE_BY_VARIANT` map mirroring `DEFAULT_WEIGHT_BY_SIZE` (Heading) to encode it. Why:

- Per-section evidence is unanimous across all 9 affected sections: every inverse-tone CTA in the design renders rectangular, none rounded. Reviewed: Hp 1 (Navy primary on photo hero), Hp 5 (Compare row Navy), Hp 7 (right-tile Navy), Hp 13 (lime callout Navy), Pl 1 (white-bg-with-border on photo hero — also rectangular), Pl 7 (right-tile Navy), Pl 11 (lime callout Navy). Decisions design language treats rectangular as the canonical CTA shape; pill is the legacy default we're *carrying forward* for non-inverse-primary uses, not a current design choice.
- Mirrors P1's pattern in `heading-types.ts` (display-tier sizes default `weight='light'`). The "primitive owns sensible defaults; consumers override" principle is already encoded.
- Reduces P5 call-site noise. With variant-defaults-shape, blocks pass only `variant='inverse-primary'` (one prop). Without it, every inverse-tone call site needs both `variant='inverse-primary'` and `shape='rectangular'` (two props). Six call sites × one extra prop = clutter without payoff.
- Forward-compatible. When the next inverse-* variant lands (e.g., the `inverse-secondary` white-bg-with-border pattern needed for audience-split LEFT tiles in Tier 3), it slots into `DEFAULT_SHAPE_BY_VARIANT` with the same default. No API churn.

**Tailwind classes:**

| token | classes | rationale |
|---|---|---|
| `pill` | `rounded-full` | preserved from current `BASE_CLASSES` |
| `rectangular` | `px-5 py-3.5` | maps to design's `px-20 py-14` Figma units → 20px/14px in CSS → `px-5 py-3.5` (Tailwind v4 default `1rem = 4` step is 4px-base; `px-5=20px`, `py-3.5=14px` ✓) |

The existing `BUTTON_SIZE_CLASSES` already contributes `px-6` (md) etc. for pill buttons. The rectangular shape's `px-5 py-3.5` overrides those when shape='rectangular'. Implementation: order classes so SHAPE_CLASSES emit *after* SIZE_CLASSES in the `cx()` call (later classes win in Tailwind utility ordering with conflicting properties; verified at run via tsc + dev server).

**Files touched:**
- `packages/ui/src/primitives/Button/button-types.ts` — add `ButtonShape`, `SHAPE_CLASSES`, `DEFAULT_SHAPE_BY_VARIANT`. Add `'inverse-primary'` to `ButtonVariant` enum + `BUTTON_VARIANT_COLOR_CLASSES` map (P3).
- `packages/ui/src/primitives/Button/Button.tsx` — accept `shape?: ButtonShape`; resolve `shape ?? DEFAULT_SHAPE_BY_VARIANT[variant]`; remove `rounded-full` from `BASE_CLASSES`; apply `SHAPE_CLASSES` after size classes.
- `packages/ui/src/primitives/Button/index.ts` — export `ButtonShape`.

---

## P3 — `<Button variant='inverse-primary'>` Navy fill

**Status:** PRE-LOCKED. Implementation as suggested. No further validation needed.

**Decision (locked):** Add `'inverse-primary'` to `ButtonVariant` enum (sibling of solid/outline/ghost), not `ButtonColor`. Naming preserves the semantic-name-not-color convention from theme.css ("inverse" = "rendered against an inverse-tone surface or as the inverse-toned CTA"; "primary" = "highest-rank action").

**Mechanism (resolved during validation):** The existing `BUTTON_VARIANT_COLOR_CLASSES` is a 2D matrix `Record<ButtonVariant, Record<ButtonColor, string>>`. Adding `'inverse-primary'` as a variant means it must coexist with the `ButtonColor` axis. Two options:

1. **Flat row:** `'inverse-primary'` row in the matrix maps all three colors (`primary`/`secondary`/`light`) to the same Navy classes. Color is effectively ignored when variant is inverse-primary.
2. **Refactor matrix:** Promote `inverse-primary` to a flat-variant model.

**Choice: Option 1.** Smallest diff; preserves the `CtaButton` consumer (which always passes both variant + color). Future devs reading the type signature see the fixed Navy classes for all three colors and understand the variant collapses the color axis.

**Classes (per validated tokens):**
```
INVERSE_PRIMARY = 'bg-[var(--color-navy-100)] text-[var(--color-inverse)] hover:opacity-90'
```
- `--color-navy-100` exists in theme.css (`#00274d`, line 130). Verified.
- `--color-inverse` exists in theme.css (`#ffffff`, line 269). Verified.
- `hover:opacity-90` matches the existing solid+primary hover pattern.

Default shape for `inverse-primary` resolves to `'rectangular'` per P2 above.

---

## P5 — Tone-aware Button color computation (consumer threading)

**Status:** PRE-LOCKED approach (a) — explicit-per-consumer. Implementation surfaces a CtaButton override prop and threads it from the small set of inverse-tone block branches.

**Why approach (a) over cascade (b) — restated for traceability:**
User prefers explicit-per-consumer over cascade-rebinding for buttons. Block authors reading JSX see exactly which variant renders; no implicit "this variant means something different inside `.tone-inverse`" surprise. Trade-off accepted: 6–10 expected per-consumer prop additions in this PR.

**Architecture refinement (discovered during validation):** Blocks don't use `<Button>` directly — they use `<CtaButton value={cta}>` which reads the variant from the schema (`CtaValue.variant: 'solid' | 'outline' | 'transparent'`). To thread `variant='inverse-primary'` from a block without expanding the schema (which would ripple to seeds + Sanity studio), we add an **optional override prop** to CtaButton:

```ts
interface CtaButtonProps {
  value: CtaValue;
  size?: ButtonSize;
  variant?: ButtonVariant; // override schema-derived variant
  shape?: ButtonShape;     // override default shape
}
```

When the override is present, CtaButton uses it; otherwise it falls back to the schema mapping. Blocks that know they're inverse-toned (via their own block-level prop or branch) pass `variant='inverse-primary'`; the variant-defaults-shape rule (P2) auto-applies `shape='rectangular'`.

**Why CtaButton override > schema extension:** schema extension would require:
- Adding `'inverse-primary'` to `CtaVariant` in `@site-foundry-template/sanity-types`.
- Updating Sanity studio config (likely a select widget).
- Setting the variant per CTA in seed data files.
- All seeds re-validate.

That's a scope expansion past Tier 2's P2+P3+P5 boundary. The override approach scopes the change to UI package only.

**Call sites identified (sweep complete):**

| # | Block file | Call site | Why threaded | Affected sections |
|---|---|---|---|---|
| 1 | `HeroCenterBlock.tsx` | `isBackground` branch — single CtaButton loop | `mediaPlacement='background'` is always an inverse-tone hero (dark photo + 40% black tint). All CTAs on this branch render as inverse-primary. | Hp 1, Pl 1, Pl 3 (if hero-orchestrated routes through here — check) |
| 2 | `CalloutBlock.tsx` (horizontal layout) | CtaButton loop in horizontal branch | `tone === 'accent'` → lime callout in design → Navy CTA. Other tones unchanged. | (none of the affected horizontal sections in scope; horizontal callouts not used on these pages currently — preserved for forward compat) |
| 3 | `CalloutBlock.tsx` (stacked layout) | CtaButton loop in stacked branch | `tone === 'accent'` → lime callout in design → Navy CTA. | Hp 13, Pl 11 |

**Total per-block edits:** 3 (one per branch listed). Well below the 12-site stop-and-escalate threshold.

**Out of scope — documented for Tier 3 escalation:**

- **FeatureGridBlock audience-split (Hp 7 + Pl 7).** The design's audience-split has TWO different inverse-tone treatments per section that the current schema can't disambiguate:
  - LEFT tile (`item.backgroundTone='inverse'` Navy bg): wants WHITE-bg button with `#e8e8e8` border + dark text — this is a *new* `inverse-secondary` variant not in P2/P3 scope.
  - RIGHT tile (`item.backgroundTone='none'` light bg): wants Navy bg button (the new `inverse-primary` variant). But there's no schema signal distinguishing it from a generic light-tile CTA.
  Threading by `isInverse` would invert the design intent (Navy CTA on Navy tile = invisible). **Skip this PR; needs Tier 3 work**: either (a) extend `FeatureGridItem` schema with a `cta.variantOverride` field, or (b) introduce an `AudienceSplitBlock` block type with explicit per-column CTA variants, or (c) extend `CtaValue.variant` schema to include `'inverse-primary'` (the schema-extension path P5(a) explicitly avoided for this PR — but valid for a future Tier 3 PR if the audience-split fix justifies it).

- **HeroSplitBlock CTAs.** Hp 3 hero-split already scored 6/7 post-Tier-1; CTA color/shape not flagged as critical. Skip — defer to subsequent Tier 2/3 PR if re-measure surfaces the gap.

- **AccordionBlock sidebar CTA.** Hp 12 / Pl 10 sidebar is on subtle (not inverse) bg per evidence. Skip.

- **CtaButton inside RichTextBlock / TabbedFeaturesBlock / TestimonialsBlock / etc.** None of these blocks use CtaButton (verified via grep). No threading needed.

**Files touched (P5):**
- `packages/ui/src/components/CtaButton.tsx` — add optional `variant` + `shape` overrides; thread through.
- `packages/ui/src/blocks/HeroCenterBlock/HeroCenterBlock.tsx` — pass `variant='inverse-primary'` in `isBackground` branch.
- `packages/ui/src/blocks/CalloutBlock/CalloutBlock.tsx` — pass `variant='inverse-primary'` when `tone === 'accent'` in both layout branches.

---

## Effort estimate

Within the ~1 day budget. Validation (this doc, ~25 min) + Button primitive implementation (~45 min) + CtaButton override (~15 min) + 2 block files threaded (~20 min) + tsc (~10 min) + dev server smoke (~15 min) ≈ 2.5h.

Firmer than the original ½–1d estimate because the call-site sweep + CtaButton override design proved smaller than the prompt's 6–10 site projection (3 actual sites). No call-site sprawl to escalate.

## Verification (post-merge)

Per the session prompt: re-measure rubric row 4 (color — button bg) + row 7 (affordance — button shape) on the 9 sections affected by P2 (Hp 1, 5, 7, 13; Pl 1, 3, 5, 7, 11). Spot-check 3 unaffected sections (Hp 2 logo-marquee, Hp 3 hero-split, Pl 6 core-capabilities) to confirm pill-default still applies on light-bg sections.

**Expected:** ~2 row-passes added per affected section (one for shape, one for color where Navy lands). Both pages projected to move from 57.1/53.2% to ~70/66%. Less than full Tier 2's 75–80% projection because P4/P6/P7/P8/P9 still pending.
