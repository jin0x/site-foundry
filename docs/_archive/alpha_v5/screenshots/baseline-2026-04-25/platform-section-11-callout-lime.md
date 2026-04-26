# Platform — Section 11 — Callout (Lime CTA)

**Section nodeId (Figma):** `Kd4MoDaQreiazP75Ujy8kt:7908:137103`
**Block type rendered:** `block.callout` `tone='accent'`
**Site URL:** `http://localhost:3000/new-project-platform` (scroll to ~y=2370px)
**Date measured:** `2026-04-25`
**Mirrors:** Homepage Section 13 (identical schema, identical copy "Ready to explore the platform?" / "Schedule a demo")

## Site (rendered) — measured

| Element | Family | Size | Weight | Color | Notes |
|---|---|---|---|---|---|
| Heading `<h2>` "Ready to explore the platform?" | IBM Plex Sans | 30px | 400 | #0a0a0c | `text-h2 font-normal` |
| Description `<p>` | IBM Plex Sans | 16px | 400 | rgba(31,41,55,0.8) | `text-body text-[var(--color-secondary)] max-w-2xl` |
| CTA `<a>` "Schedule a demo" | IBM Plex Sans | 16px | 500 | #0a0a0c on rgb(0,128,255) | rounded-full Bright Blue pill |
| Section bg | — | — | — | transparent (body) | **lime green absent** |
| Section padding | — | 128px 0px | — | — | `relative py-32` ✓ correct hero/callout padding |

Section bounds: `1920 × 504px`. ImageCount: 0 (**no decorative logomark**). InteractiveCount: 0.

## Design (Figma) — measured via `get_design_context` on `7908:137103`

| Element | Family | Size | Weight | Color | Layout |
|---|---|---|---|---|---|
| Section bg | — | — | — | **#a6f252 lime** (Light/Text/Primary used as bg) | flex-col items-center pb-64 pt-80 px-64 |
| Decorative logomark | — | size-44 | — | navy on lime | rounded-488.9 (full circle), top-aligned above heading |
| Heading | IBM Plex Sans Light | 64px (Heading/H1) | 300 | #00274d (--secondary navy) | leading-1.1 w-1200 text-center |
| Description | IBM Plex Sans Regular | 18px (Heading/H5) | 400 | #00274d (navy) | leading-1.4 max-w-500 text-center |
| CTA "Schedule a demo" | IBM Plex Sans Regular | 14px | 400 | white on #00274d (Navy) | px-20 py-14 **rectangular** (NOT rounded-full) |

## Diff — site vs design

### Critical
| Element | Site | Design | Delta | Root cause / layer |
|---|---|---|---|---|
| Section bg color | transparent / inherits page | **#a6f252 lime** | missing | **Block + Schema** — `tone='accent'` doesn't paint lime; same dominant gap as Homepage 13 |
| Decorative logomark | absent | size-44 navy logomark above heading | missing | **Block** — callout has no decorative-element slot |
| Heading size | 30px | 64px | -34px (-53%) | **Token** — `text-h2` vs Heading/H1 |
| Heading weight | 400 | 300 Light | wrong | **Primitive** — `<Heading>` no `weight` prop |
| Heading color | #0a0a0c | #00274d navy | wrong (would be visibly wrong if lime bg landed; currently both invisible because no bg) | **Block + Token** — heading should pick up `--color-text-on-accent` (navy) when on accent tone |
| Description color | rgba(31,41,55,0.8) `--color-secondary` (Tailwind gray) | #00274d navy | wrong | **Block + Token** — same accent-tone awareness gap |
| Description size | 16px | 18px (Heading/H5) | -2px | **Token** — no 18px slot |
| CTA shape | rounded-full pill | rectangular px-20 py-14 | wrong | **Primitive** — `<Button shape='rectangular'>` missing |
| CTA bg | #0080ff Bright Blue | #00274d Navy | wrong tone | **Primitive** — `<Button variant='navy'>` missing |
| CTA text color | #0a0a0c (dark on light blue → unreadable) | white on navy | wrong | **Primitive** — same Navy variant gap |

### Secondary
| Element | Site | Design | Notes |
|---|---|---|---|
| Section padding | 128px 0 (`py-32`) | pb-64 pt-80 px-64 | matches in spirit (callout padding ≈ hero padding); within tolerance |
| Section bounds height | 504px | similar (504+) | OK |
| Heading text | matches exactly | matches | ✓ |
| Description text | matches exactly | matches | ✓ |
| CTA copy | matches | matches | ✓ |

## Rubric scoring

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Layout structure | ✓ | Centered heading + description + single CTA — structure matches |
| 2 | Typography — size | ✗ | Heading 30 vs 64; description 16 vs 18 |
| 3 | Typography — weight/family | ✗ | Heading 400 vs 300 Light; family ✓ |
| 4 | Color | ✗ | Section bg missing (dominant); heading + desc + CTA all wrong tone |
| 5 | Spacing | ✓ | `py-32` is roughly equivalent to design's pb-64 pt-80 px-64 ratio for centered content |
| 6 | Content present | ⚠ | Heading + desc + CTA all present; **decorative logomark absent** |
| 7 | Affordance | ⚠ | CTA present at right size, but tone wrong + shape wrong |

**Score:** `1/7` (`2/7` generous if "structure ✓" passes spacing too). Section pass: ✗.

## Gap categorization

- **Token-level:** `--color-secondary` universal; `text-h{n}` collision; no 18px slot; no `tone='accent'` lime token applied as bg.
- **Primitive-level:** `<Heading>` weight + Display sizes; `<Button>` rectangular + Navy variant; `<Button>` text color must invert when on dark/navy bg.
- **Block-level:** `block.callout` `tone='accent'` doesn't paint bg; decorative-element / logomark slot missing; heading + description + CTA color computation broken on accent-tone (none invert to navy/white as design specifies).
- **Schema/content-level:** decorative logomark image not seeded.

## Notes / surprises

- **Lime bg is the dominant gap** — once it lands, plus Heading goes Navy + Light + 64, plus Description goes Navy + 18, plus CTA Navy rectangular → this section flips from 1/7 to ~6/7. Same leverage profile as Homepage 13.
- **Identical to Homepage 13** — exact same copy, exact same gap pattern. One fix lifts both. **Two callout sections, same fixes.**
- Description's design color is `#00274d` (navy / Light/Background/Secondary used as text — name confusing!). The design uses lime on navy as its accent inversion: lime bg → navy text. Site's `text-[var(--color-secondary)]` resolves to wrong gray instead.
- `imageCount: 0` confirms no decorative image renders — same as Homepage 13's "5 (decorative logomark)" phrase actually meant the gap, not present.
- Section padding `py-32` (128px) is the right magnitude for a callout — closer to design than most other sections (which used `py-4`/16). This is ✓.
