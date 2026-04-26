# Tier 1 PR — validated plan (2026-04-25)

Validated against per-section evidence in `screenshots/baseline-2026-04-25/` + Site Foundry code. Validation time-box ~30 min. All three suggestions HOLD with the refinements noted below.

---

## T1 — `--color-secondary` tone-aware rebinding

**Status:** HOLD with refinement (pick approach (b); also fix light-bg default).

**Approach picked:** (b) Single tone-aware computation via CSS cascade.

**Why (b) over (a) and (c):**
- (a) "new var `--color-secondary-on-inverse` + block-side selection": every block consuming `--color-secondary` on an inverse surface would have to switch tokens. Touch radius = every Text/Heading/Accordion/RichText/etc. consumer that ever appears in a `tone='inverse'` Section. Large.
- (c) "block-level prop on `<Text>` to pick the right token": API change to Text + every consumer needs an explicit `surface` prop. Largest.
- (b) Re-binds `--color-secondary` inside `.tone-inverse` via CSS cascade. Zero changes to consumers — the variable name stays put, value resolves differently in the inverse-tone subtree. Smallest blast radius. Preserves the "names preserved for downstream compat" convention already documented in theme.css header.

**Mechanism:** Section.tsx already renders `style={TONE_STYLES[tone]}` inline; we add a parallel `tone-${tone}` class so CSS selectors can match. theme.css gets a tone-override block (outside `@theme`) re-binding `--color-secondary` (and `--color-tertiary` for symmetry, since both miscarriage on inverse surfaces) when `.tone-inverse` is in the ancestor chain.

**Scope decision — accent tone:** DEFER to Tier 3. Section 13 + P11 (lime callouts) need both the lime bg AND tone-aware text. Adding `.tone-accent` rebinding now would be invisible until B3 lands (the lime bg block fix). Save the rebinding addition for the same PR as B3.

**Light-bg default:** Also bump default `--color-secondary` from `var(--color-gray-80)` (`#1f2937cc`, slate-tinted) to the design's `rgba(10,10,12,0.6)` (Light/Text/Default at 60%). Smaller visual change but matches the design token. One-line change; included in T1.

**Files touched:**
- `packages/tokens/src/theme.css` — change default `--color-secondary` value; add tone-override block at end of file (outside `@theme`).
- `packages/ui/src/components/Section.tsx` — add `tone-${tone}` class alongside existing inline style.

**Why not rename `--color-secondary` itself:** the prompt's preservation rule. Downstream blocks read this name; a rename would cascade.

---

## T2 — `--text-h{n}` scale → Decisions Heading/H{n}

**Status:** HOLD as suggested. Validation revealed the design uses TWO typography scales — **Display** (canonical, in PROJECT_DESIGN_NODES.md) for huge marketing text, and **Heading/H{n}** (referenced in per-section evidence but NOT extracted into PROJECT_DESIGN_NODES.md) for actual section headings. The Tier-1 plan's target scale (h1=64 / h2=48 / h3=32 / h4=24 / h5=18 / h6=16) is the **Heading/H{n}** scale. This is what section headings actually use across the audit.

**Per-section corroboration (sample):**
- Section 13 callout: heading "Ready to explore the platform?" = 64px Light → maps to Heading/H1=64.
- Section 8 autoswitching: card title = 32px Regular → maps to Heading/H3=32.
- Section P4 numbered features: "We stand apart" = ~64px Light Heading/H1; card titles = ~24px Regular Heading/H4.

**Final values (ship in theme.css):**

| token | size | line-height | letter-spacing |
|---|---|---|---|
| `--text-h1` | 64px | 1.1 | -0.02em |
| `--text-h2` | 48px | 1.15 | -0.02em |
| `--text-h3` | 32px | 1.25 | -0.02em |
| `--text-h4` | 24px | 1.33 | (default 0) |
| `--text-h5` | 18px | 1.56 | (default 0) |
| `--text-h6` | 16px | 1.5 | (default 0) |

Line-heights cross-checked against Decisions Display scale ratios (Display lg 48/60 = 1.25; Display md 36/44 = 1.22).

**What we're NOT doing in T1:** Display sizes >64px (T3 in the queue). Hero Section 1 wants 80px (`Heading/Small` per evidence) — that's a Tier 1 expansion if we add it; the queue scoped it to T3. Holding it back.

**Files touched:**
- `packages/tokens/src/theme.css` — six `--text-h{n}` blocks, all in PART 4.

---

## P1 — `<Heading>` `weight` prop

**Status:** HOLD with refinement (pick Option 1 — primitive defaults).

**Approach picked:** Option 1 — primitive owns default-weight-by-size.

**Why Option 1 over Option 2:**
- Option 2 (consumer-explicit weight per call) would require touching every block that renders a `<Heading>` — that's >20 blocks. Expands T1 past day-1. The prompt explicitly flagged this as out-of-budget.
- Option 1 keeps T1 to a single primitive change. The "couples primitive to Decisions-specific weight choices" concern is already true of the current code — `HEADING_SIZE_CLASSES.h1` is hardcoded to `font-medium`, which is just as opinionated as defaulting display sizes to Light. Trading one opinion for another (a more accurate one).

**Defaults (display→Light, text→Regular):**

| size | default weight | rationale |
|---|---|---|
| h1 | light (300) | display tier; design uses Light universally on h1 |
| h2 | light (300) | display tier; design uses Light on h2 in 12+ sections |
| h3 | light (300) | display tier per Decisions Heading scale |
| h4 | regular (400) | text tier |
| h5 | regular (400) | text tier |
| h6 | regular (400) | text tier |

**Implementation shape:**
- Add `HeadingWeight` const-enum to `heading-types.ts` (mirrors `HeadingSize` pattern: LIGHT/REGULAR/MEDIUM/SEMIBOLD/BOLD).
- Split `HEADING_SIZE_CLASSES` to size-only (`text-h{n}` only, no `font-*`).
- Add `HEADING_WEIGHT_CLASSES` map (light/regular/medium/semibold/bold → `font-light/font-normal/font-medium/font-semibold/font-bold`).
- Add `DEFAULT_WEIGHT_BY_SIZE` map.
- `Heading.tsx`: accept `weight?: HeadingWeight`; resolve `weight ?? DEFAULT_WEIGHT_BY_SIZE[size]`; apply both classes.
- `index.ts`: export `HeadingWeight`.

**Tailwind v4 verification:** `font-light` works (already used in `StatGridBlock.tsx:29`), confirming `--font-weight-light: 300` in theme.css generates the utility. No additional theme work needed.

**`as` independence preserved:** the `as` prop continues to control rendered tag independently of size+weight (per the preservation rule).

**Files touched:**
- `packages/ui/src/primitives/Heading/heading-types.ts` — add `HeadingWeight`, refactor class maps.
- `packages/ui/src/primitives/Heading/Heading.tsx` — accept `weight` prop; resolve effective weight.
- `packages/ui/src/primitives/Heading/index.ts` — export `HeadingWeight`.

---

## Effort estimate

Within the ½–1 day budget. ~30 min validation (this doc) + ~2-3h implementation + 30 min tsc/dev-server verification.

## Verification (post-merge)

Per the session prompt: re-measure rubric rows 3 (typo weight/family) + 4 (color) + parts of row 2 (typo size) on all 24 sections. Expected: ~3 row-passes added per section.
