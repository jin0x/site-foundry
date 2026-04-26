## Colors
https://www.figma.com/design/a9We7ZVxDDdUfyIbyRutxs/Decisions---Rebrand-%7C-Internal?node-id=1604-280&m=dev
## Typography
https://www.figma.com/design/a9We7ZVxDDdUfyIbyRutxs/Decisions---Rebrand-%7C-Internal?node-id=1604-1167&m=dev
## Icons
https://www.figma.com/design/a9We7ZVxDDdUfyIbyRutxs/Decisions---Rebrand-%7C-Internal?node-id=1604-1304&m=dev
## Spacing
https://www.figma.com/design/a9We7ZVxDDdUfyIbyRutxs/Decisions---Rebrand-%7C-Internal?node-id=1604-11514&m=dev
## Layout
https://www.figma.com/design/a9We7ZVxDDdUfyIbyRutxs/Decisions---Rebrand-%7C-Internal?node-id=1604-11921&m=dev
## Effects
https://www.figma.com/design/a9We7ZVxDDdUfyIbyRutxs/Decisions---Rebrand-%7C-Internal?node-id=1604-12412&m=dev
## Buttons + Badges
https://www.figma.com/design/a9We7ZVxDDdUfyIbyRutxs/Decisions---Rebrand-%7C-Internal?node-id=1604-12541&m=dev
## Forms
https://www.figma.com/design/a9We7ZVxDDdUfyIbyRutxs/Decisions---Rebrand-%7C-Internal?node-id=1604-13451&m=dev
## Navigation
https://www.figma.com/design/a9We7ZVxDDdUfyIbyRutxs/Decisions---Rebrand-%7C-Internal?node-id=1604-13587&m=dev
## Cards
https://www.figma.com/design/a9We7ZVxDDdUfyIbyRutxs/Decisions---Rebrand-%7C-Internal?node-id=1604-13671&m=dev
## Content
https://www.figma.com/design/a9We7ZVxDDdUfyIbyRutxs/Decisions---Rebrand-%7C-Internal?node-id=1604-13778&m=dev
## Grid
https://www.figma.com/design/a9We7ZVxDDdUfyIbyRutxs/Decisions---Rebrand-%7C-Internal?node-id=1604-14058&m=dev
## Radius
https://www.figma.com/design/a9We7ZVxDDdUfyIbyRutxs/Decisions---Rebrand-%7C-Internal?node-id=1604-14464&m=dev

---

# Extracted token set

Pulled via Figma MCP `get_variable_defs` on all 13 nodes above, 2026-04-24. Union of variables referenced across those nodes. **Note:** `get_variable_defs` returns variables *referenced by the node's design*, so each node returned a partial view; this section is the consolidated union, grouped and deduplicated.

**Source file:** Decisions — Rebrand | Internal (`a9We7ZVxDDdUfyIbyRutxs`).

## Colors — tokenised

Full color system with 10-step opacity ramps (10–90 are alpha-tinted; 100 is solid). Every ramp listed below has the same pattern.

### Neutrals

| Token | Value |
|---|---|
| `Black` | `#0a0a0c` |
| `White` / `Base/White` | `#ffffff` |
| `Black/100%` | `#000000` |
| `Neutral/900` | `#171717` |
| `Light/Text/Default` | `#0A0A0C` |
| `Light/Text/Inverse` | `#FFFFFF` |

### Gray (10–100 ramp, base `#1f2937`)

| Step | Value |
|---|---|
| 10 | `#1f29371a` |
| 20 | `#1f293733` |
| 30 | `#1f29374d` |
| 40 | `#1f293766` |
| 50 | `#1f293780` |
| 60 | `#1f293799` |
| 70 | `#1f2937b2` |
| 80 | `#1f2937cc` |
| 90 | `#1f2937e5` |
| 100 | `#1f2937` |

### Slate (10–100 ramp, base `#64748b`)

| Step | Value |
|---|---|
| 10 | `#64748b1a` |
| 20 | `#64748b33` |
| 30 | `#64748b4d` |
| 40 | `#64748b66` |
| 50 | `#64748b80` |
| 60 | `#64748b99` |
| 70 | `#64748bb2` |
| 80 | `#64748bcc` |
| 90 | `#64748be5` |
| 100 | `#64748b` |

### Brand — Dark Blue / navy (10–100 ramp, base `#00274d`)

Primary brand. Used as dominant surface + heading accent.

| Step | Value |
|---|---|
| 10–90 | `#00274d1a` → `#00274de5` (alpha-tinted) |
| 100 | `#00274d` |

### Brand — Bright Blue (10–100 ramp, base `#0080ff`)

Secondary/interactive brand. Used on links, highlighted CTAs.

| Step | Value |
|---|---|
| 10–90 | `#0080ff1a` → `#0080ffe5` |
| 100 | `#0080ff` |

### Brand — Soft Blue (10–100 ramp, base `#eaf6ff`)

Tertiary/surface-tint brand. Used for subtle backgrounds.

| Step | Value |
|---|---|
| 10–90 | `#eaf6ff1a` → `#eaf6ffe5` |
| 100 | `#eaf6ff` |

### Brand — Lime Green (10–100 ramp, base `#b1fc5f`)

**Accent brand.** This is the color observed as token drift D16 in the original run.

| Step | Value |
|---|---|
| 10–90 | `#b1fc5f1a` → `#b1fc5fe5` |
| 100 | `#b1fc5f` |

### Status — Success (10–100 ramp, base `#22c55e`)

| Step | Value |
|---|---|
| 10–90 | `#22c55e1a` → `#22c55ee5` |
| 100 | `#22c55e` |

### Status — Success Text (10–100 ramp, base `#14532d`)

Paired with Success for readable text overlays.

| Step | Value |
|---|---|
| 10–90 | `#14532d1a` → `#14532dcc` |
| 100 | `#14532d` |

### Status — Error (10–100 ramp, base `#ef4444`)

| Step | Value |
|---|---|
| 10–90 | `#ef44441a` → `#ef4444e5` |
| 100 | `#ef4444` |

### Status — Error Text (10–100 ramp, base `#7f1d1d`)

| Step | Value |
|---|---|
| 10–90 | `#7f1d1d1a` → `#7f1d1de5` |
| 100 | `#7f1d1d` |

### Status — Warning (10–100 ramp, base `#eab308`)

| Step | Value |
|---|---|
| 10–90 | `#eab3081a` → `#eab308e5` |
| 100 | `#eab308` |

### Status — Warning Text (10–100 ramp, base `#854d0e`)

| Step | Value |
|---|---|
| 10–90 | `#854d0e1a` → `#854d0ee5` |
| 100 | `#854d0e` |

## Typography — tokenised (IBM Plex Sans)

Full scale, IBM Plex Sans family, 4 weights per size (Regular 400, Medium 500, SemiBold 600, Bold 700). Display sizes have negative letter-spacing (-2); Text sizes have 0.

### Display scale

| Token | Size / Line-height | Letter-spacing |
|---|---|---|
| `Display 2xl` | 72 / 90 | -2 |
| `Display xl`  | 60 / 72 | -2 |
| `Display lg`  | 48 / 60 | -2 |
| `Display md`  | 36 / 44 | -2 |
| `Display sm`  | 30 / 38 | 0 |
| `Display xs`  | 24 / 32 | 0 |

### Text scale

| Token | Size / Line-height | Letter-spacing |
|---|---|---|
| `Text xl`  | 20 / 30 | 0 |
| `Text lg`  | 18 / 28 | 0 |
| `Text md`  | 16 / 24 | 0 |
| `Text sm`  | 14 / 20 | 0 |
| `Text xs`  | 12 / 18 | 0 |

**Weights per size:** Regular (400), Medium (500), SemiBold (600), Bold (700) — e.g. `Display xl/Bold`, `Text md/Regular`.

**Note on Inter:** sample text labels on the Colors / Effects / Layout / Navigation / Buttons / Forms pages use `Inter` for UI-chrome text (section headings in the design-system pages themselves). Inter is NOT part of the canonical scale — it's the Figma-page internal UI font. IBM Plex Sans is the brand typography and the only family with a structured scale.

## Effects / Shadows — tokenised (7 levels)

| Token | Definition |
|---|---|
| `Shadows/shadow-xs`  | drop-shadow `0 1px 2px rgba(0,0,0,0.05)` |
| `Shadows/shadow-sm`  | drop-shadow `0 1px 2px -1 rgba(0,0,0,0.10)`, `0 1px 3px 0 rgba(0,0,0,0.10)` |
| `Shadows/shadow-md`  | drop-shadow `0 2px 4px -2 rgba(0,0,0,0.06)`, `0 4px 6px -1 rgba(0,0,0,0.10)` |
| `Shadows/shadow-lg`  | drop-shadow `0 2px 2px -1 rgba(0,0,0,0.04)`, `0 4px 6px -2 rgba(0,0,0,0.03)`, `0 12px 16px -4 rgba(0,0,0,0.08)` |
| `Shadows/shadow-xl`  | drop-shadow `0 3px 3px -1.5 rgba(0,0,0,0.04)`, `0 8px 8px -4 rgba(0,0,0,0.03)`, `0 20px 24px -4 rgba(0,0,0,0.08)` |
| `Shadows/shadow-2xl` | drop-shadow `0 4px 4px -2 rgba(0,0,0,0.04)`, `0 24px 48px -12 rgba(0,0,0,0.18)` |
| `Shadows/shadow-3xl` | drop-shadow `0 5px 5px -2.5 rgba(10,13,18,0.04)`, `0 32px 64px -12 rgba(10,13,18,0.14)` |

## Icons — NOT tokenised as variables

The Icons node returned only base colors (Black / White / Bright Blue). Icons are implemented as Figma components with swap-able color props, not as named variables. For implementation: use the UI kit's icon-family components + pass brand color via `<IconBadge>` color prop.

## Spacing — NOT tokenised as variables (via MCP)

`get_variable_defs` on the Spacing node returned only sample-label colors + typography. No `spacing/*` or `space/*` variables appeared. Implication: spacing in the Decisions design is either (a) hard-coded in Figma auto-layout values, or (b) tokenised at a Figma Variable level that MCP's `get_variable_defs` isn't surfacing from this page. **Treat spacing values from section-level Figma inspection as authoritative** until a canonical spacing scale is published by the designer.

## Layout — NOT tokenised as variables (via MCP)

Same as Spacing — the Layout node returned font samples and colors, no `layout/*` variables. The page-level behavior note "1920 viewport / 1440 content max-width" remains the load-bearing container rule; no additional layout constants were surfaced.

## Grid — NOT tokenised as variables (via MCP)

Same pattern. The Grid node returned a smaller sample set. Grid definitions (column count, gutter) are likely hard-coded per-component, not tokenised.

## Radius — NOT tokenised as variables (via MCP)

Radius node returned only sample colors + typography. No `radius-*` or `border-radius-*` variables. Implication: radius values in the Decisions design are either hard-coded per-component or not yet lifted to Variables. **Treat radius values from section-level Figma inspection as authoritative.**

## Buttons + Badges / Forms / Navigation / Cards / Content — compositional, not tokenised

These five nodes returned subsets of the Color + Typography variables already listed above — they show DEFAULTS used by button/badge/form/nav/card compositions, not new token categories. Composition-level design is embodied in the component library, not in Figma Variables. For implementation: inspect individual components in each category (e.g. the `Button / Primary / Default` variant) rather than pulling from these umbrella pages.

---

# Canonical state summary

**Tokenised and reliably available via MCP:**
- Colors (rich — brand + neutrals + status, with 10-step opacity ramps)
- Typography (full scale, IBM Plex Sans, 6 display + 5 text sizes × 4 weights)
- Effects / shadows (7-level scale)

**NOT tokenised — or tokenised at a level MCP doesn't surface:**
- Spacing (use section-level inspection)
- Radius (use section-level inspection)
- Layout / Grid (page-level rules only)

**Partial / compositional (use UI-kit components directly):**
- Icons
- Buttons + Badges
- Forms
- Navigation
- Cards

**Implication for visual rubric rescoring:** Color and Typography checks CAN be made honest (token-exact) because the token set is now empirically known. Spacing and Radius checks will remain inspection-based per-section, not token-checked — the same tolerance rule (`±4px` / one enum step) applies.
