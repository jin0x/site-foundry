# Figma MCP Integration Rules — Site Foundry / `next-sanity-starter`

These rules define how to translate Figma MCP output into code for the Site Foundry `next-sanity-starter` target. They MUST be followed for every Figma-driven change.

This file is **not** a blank template with `[FILL IN]` slots — it is populated for the Site Foundry stack, the live `packages/ui` primitive + composite + block set, and the const-enum typing pattern the codebase has settled on. When Site Foundry registers a new block, adds a primitive, or swaps tokens, update this file in the same change.

Target repo layout:

```
packages/ui/
├── src/
│   ├── primitives/            # Stack, Grid, Heading, Text, Eyebrow, Button, Badge, Image, Card, Accordion, Marquee, Container
│   ├── components/            # Section, SectionHeading, SectionCta, BaseBlock, CtaButton, HeadingGroup
│   └── blocks/                # HeroSplitBlock, FeatureGridBlock, RichTextBlock + BlockRenderer
packages/tokens/               # theme.css (CSS vars consumed by @theme)
packages/sanity-schema/        # block schemas
```

Everything exports through `@site-foundry-template/ui` (the package name in the starter). No separate `@site-foundry/primitives` package.

---

## Required flow (do not skip)

1. Run `get_design_context` on the **desktop** Figma node first.
2. Run `get_design_context` on the **mobile** Figma node second (when split).
3. Run `get_variable_defs` on the desktop node to capture token names.
4. **Check for static graphics.** Deeply nested absolute positioning, grid overlays with pixel-level placements, dozens of small SVG fragments composing one visual — treat these as CMS images, never rebuild in code. See *Core principle 3*.
5. Compare desktop + mobile output to infer responsive behavior.
6. Map every value against the tables below. **Never use arbitrary Tailwind values when a token exists within 2px.**
7. Build using primitives + composites from `@site-foundry-template/ui`. Run the pre-write checklist before writing any `<div>`.
8. Produce a seed JSON per `docs/content-extraction-prompt.md`.
9. Dry-run the seed. Fix errors. Apply.

---

## Core principles

### 1. Always use a primitive — even if the prop surface isn't perfect

If a primitive exists for the job, USE IT. `<Stack gap={StackGap.MD}>` with an imperfect gap beats a raw `<div class="flex flex-col gap-3">` every time. Primitive props can be tweaked with one edit; raw HTML requires a rewrite.

**Pre-write checklist — run this BEFORE writing any `<div>`:**

1. Flex column? → `<Stack>`
2. Flex row? → **NOT a Stack prop** — write `<div className="flex flex-row ...">` (current Stack is column-only; flag if you need this often)
3. Multi-column layout? → `<Grid cols={3}>` or `<Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }}>`
4. Heading element? → `<Heading as={HeadingTag.H2} size={HeadingSize.H2}>`
5. Body text? → `<Text size={TextSize.BASE}>`
6. Eyebrow / label / tag? → `<Eyebrow>` (brand-accented uppercase) or `<Badge>` (pill)
7. Button or CTA? → `<Button>` for a standalone button; `<CtaButton value={cta} />` when rendering a Sanity `cta` object
8. Card-style container? → `<Card variant={CardVariant.DEFAULT}>`
9. Image? → `<Image source={imageWithAlt} />` (reads `asset.url` + `alt` from Sanity) or `<Image src={...} alt={...} />`
10. Collapsible FAQ / steps? → `<Accordion>` (compound — `AccordionItem` / `AccordionHeader` / `AccordionTrigger` / `AccordionContent`)
11. Horizontal scroller / logo cloud? → `<Marquee>`
12. Max-width content wrapper? → `<Container size={ContainerSize.LG}>`
13. Full-width section with padding + tone? → `<Section>` or the block's `<BaseBlock>` shell, not a bare `<section>`
14. Block shell with sectionHeading + content? → `<BaseBlock block={props}>…</BaseBlock>`
15. None of the above apply → `<div>` with Tailwind

### 2. Codebase tokens are the source of truth, not Figma

When a Figma hex is close but not exact to a codebase token, **use the codebase token**. The codebase defines correctness; Figma documents intent.

> **Today's palette is placeholder.** `packages/tokens/src/theme.css` ships a neutral dark-navy + teal palette so the starter boots with something acceptable. Real SignalWire tokens land in a follow-up that only edits `theme.css`. Structure, variable names, and downstream usage stay identical after the swap.

Priority for color resolution:

1. Exact match to a primitive's enum (`color={TextColor.MUTED}`, `color={ButtonColor.PRIMARY}`)
2. Exact match to a Tailwind class generated from a `@theme` CSS var (`bg-[var(--color-surface-raised)]`)
3. Close match (within 2 shades) → use the enum or token
4. No close match → flag it, do not invent arbitrary hex values

### 3. Detect static graphics — do not build them as code

Treat an element as a **static graphic** (so: a CMS image field, not code) when `get_design_context` returns:

- Deeply nested absolute positioning with pixel-level coordinates
- Inline grid placements with `grid-cols-[max-content]` and positioned children
- Dozens of small SVG/image fragments composing a single visual
- Layer names like *wireframe chart*, *diagram*, *illustration*, *graphic*, *flowchart*

When detected:

- Export the graphic as an image, upload via the seeder (`images.topLevel`)
- Build the surrounding block normally
- If the graphic is desktop-only, hide on mobile responsively

### 4. Prefer the const-enum over string literals

Every primitive's variant/size/color/etc. ships as a `const` + `type` pair (same name, declaration-merged). Both forms typecheck, but the enum form gives autocomplete and survives renames:

```tsx
// Preferred
<Stack gap={StackGap.MD}>
<Heading size={HeadingSize.H2}>
<Button variant={ButtonVariant.OUTLINE} color={ButtonColor.PRIMARY}>

// Still valid, but flagged in review
<Stack gap="md">
<Heading size="h2">
<Button variant="outline" color="primary">
```

Enum key casing follows SNAKE_CASE even when values have slashes or numbers: `ImageAspectRatio.R4_3 = '4/3'`, `StackGap.XL2 = '2xl'`, `TextColor.PALE_BLUE = 'pale-blue'`.

---

## Tech stack

```
Framework:           Next.js 16, App Router, React Server Components, Turbopack build
CMS:                 Sanity (starter: next-sanity-starter)
Styling:             Tailwind CSS v4 (@theme-driven; no CSS Modules)
Token source:        packages/tokens/src/theme.css → CSS variables
Breakpoint strategy: Mobile-first. Desktop overrides at md: (768px) / lg: (1024px)
Component pattern:   RSC by default; 'use client' declared explicitly (Accordion only, today)
Block registry:      _type → React component in packages/ui/src/blocks/BlockRenderer.tsx
UI package name:     @site-foundry-template/ui
```

---

## Currently registered blocks

Only these block types exist in Site Foundry's schema today. Do NOT invent new block types in seeds — if a design needs something not in this list, flag it and add the schema first.

| `_type` | Schema fields | Shared fields |
|---|---|---|
| `block.heroSplit` | `description` (text), `media` (imageWithAlt), `mediaPlacement` (left/right) | sectionHeading, ctas[], backgroundTone, spacing |
| `block.featureGrid` | `items[]` (eyebrow, title, description), `columns` (2 or 3) | sectionHeading, backgroundTone, spacing |
| `block.richText` | `content` (blockContent) | sectionHeading, backgroundTone, spacing |

Shared fields are added automatically by `defineBlockSchema`. `sectionHeading` is always added unless explicitly disabled; `ctas` only when `withCtas: true`.

Block React implementations live in `packages/ui/src/blocks/<Block>/<Block>.tsx` and are dispatched by `BlockRenderer` on `_type`.

---

## Primitives reference

All primitives export from `@site-foundry-template/ui` alongside their const-enum types and class-map constants. Enum imports shown inline.

### `<Stack>` — vertical flex layout

```tsx
import { Stack, StackGap, StackAlign } from '@site-foundry-template/ui';
```

| Prop | Type | Default |
|---|---|---|
| `as` | `ElementType` | `'div'` |
| `gap` | `StackGap` | `StackGap.MD` → `'md'` |
| `align` | `StackAlign` | undefined |

Enum values: `StackGap = NONE | XS | SM | MD | LG | XL | XL2 | XL3`; `StackAlign = START | CENTER | END | STRETCH`.

**Figma mapping:** Auto Layout frame set to vertical. Gap maps from the Figma gap variable.

### `<Grid>` — CSS grid

```tsx
import { Grid, GridGap } from '@site-foundry-template/ui';
```

| Prop | Type | Default |
|---|---|---|
| `cols` | `number \| { mobile, tablet, desktop }` | `{ mobile: 1, tablet: 2, desktop: 3 }` |
| `gap` | `GridGap` | `GridGap.LG` → `'lg'` |

Enum values: `GridGap = NONE | SM | MD | LG | XL | XL2`. `cols` accepts a plain number (1–6) or a responsive object.

### `<Heading>` — semantic headings

```tsx
import { Heading, HeadingTag, HeadingSize, HeadingColor } from '@site-foundry-template/ui';
```

| Prop | Type | Default |
|---|---|---|
| `as` | `HeadingTag \| ElementType` | `'h2'` |
| `size` | `HeadingSize` | `HeadingSize.H3` → `'h3'` |
| `color` | `HeadingColor` | `HeadingColor.DEFAULT` |

Enum values: `HeadingTag = H1..H6 | P`; `HeadingSize = H1..H6`; `HeadingColor = DEFAULT | FOREGROUND | WHITE | PRIMARY | SECONDARY | GRADIENT | BLACK | ROSE | GRAY`.

Note: `size` and `as` are independent (visual size vs. semantic tag). Default `as="h2"` + `size="h3"` is intentional.

### `<Text>` — paragraphs and inline text

```tsx
import { Text, TextTag, TextSize, TextColor } from '@site-foundry-template/ui';
```

| Prop | Type | Default |
|---|---|---|
| `as` | `TextTag \| ElementType` | `'p'` |
| `size` | `TextSize` | `TextSize.BASE` → `'base'` |
| `color` | `TextColor` | `TextColor.DEFAULT` |

Enum values: `TextTag = DIV | P | SPAN | LI | OL | UL | CODE | TIME`; `TextSize = CAPTION | XS | SM | BASE | MD | LG | XL`; `TextColor = DEFAULT | MUTED | SUBTLE | FOREGROUND | WHITE | PRIMARY | SECONDARY | GRADIENT | BLACK | PALE_BLUE | ROSE | GRAY | LIGHT_GRAY`.

Use `color={TextColor.MUTED}` for body copy under a heading — that's the most-used pair.

### `<Eyebrow>` — small uppercase labels

```tsx
import { Eyebrow } from '@site-foundry-template/ui';
```

No props beyond `as` + `className`. Renders uppercase, tracked, brand-accented. For anything beyond the stock style, use `<Text size={TextSize.CAPTION} className="uppercase tracking-widest">` instead.

### `<Button>` — CTA element (plain)

```tsx
import { Button, ButtonVariant, ButtonSize, ButtonColor } from '@site-foundry-template/ui';
```

| Prop | Type | Default |
|---|---|---|
| `variant` | `ButtonVariant` | `ButtonVariant.SOLID` |
| `size` | `ButtonSize` | `ButtonSize.MD` |
| `color` | `ButtonColor` | `ButtonColor.PRIMARY` |
| `href` | `string?` | — (renders `<a>` if set, otherwise `<button>`) |

Enum values: `ButtonVariant = SOLID | OUTLINE | GHOST`; `ButtonSize = SM | MD | LG`; `ButtonColor = PRIMARY | SECONDARY | LIGHT`.

For rendering a Sanity `cta` object directly, prefer `<CtaButton>` (below) — it handles link resolution (`page` / `email` / `file` / `href`) and variant/color mapping.

### `<Badge>` — small pill

```tsx
import { Badge, BadgeVariant, BadgeColor } from '@site-foundry-template/ui';
```

| Prop | Type | Default |
|---|---|---|
| `variant` | `BadgeVariant` | `BadgeVariant.OUTLINE` |
| `color` | `BadgeColor` | `BadgeColor.DARK` |

Enum values: `BadgeVariant = OUTLINE | SOLID`; `BadgeColor = DARK | PRIMARY | SECONDARY | LIGHT`.

### `<Image>` — Sanity-aware image

```tsx
import { Image, ImageAspectRatio, ImageFit, ImageRadius } from '@site-foundry-template/ui';
```

| Prop | Type | Default |
|---|---|---|
| `source` | `ImageWithAltValue?` | — (preferred: pass the Sanity object) |
| `src` / `alt` | `string` | — (overrides `source` when both provided) |
| `aspectRatio` | `ImageAspectRatio` | `ImageAspectRatio.AUTO` |
| `fit` | `ImageFit` | `ImageFit.COVER` |
| `rounded` | `ImageRadius` | `ImageRadius.NONE` |

Enum values: `ImageAspectRatio = AUTO | SQUARE | VIDEO | R4_3 | R3_2 | R21_9`; `ImageFit = COVER | CONTAIN | FILL | NONE | SCALE_DOWN`; `ImageRadius = NONE | SM | MD | LG | XL | FULL`.

Returns `null` if no `src` resolves — don't wrap in a conditional yourself.

### `<Card>` — content container

```tsx
import { Card, CardVariant, CardPadding, CardRadius } from '@site-foundry-template/ui';
```

| Prop | Type | Default |
|---|---|---|
| `as` | `ElementType` | `'div'` |
| `variant` | `CardVariant` | `CardVariant.DEFAULT` |
| `padding` | `CardPadding` | `CardPadding.MD` |
| `radius` | `CardRadius` | `CardRadius.XL` |

Enum values: `CardVariant = DEFAULT | SUBTLE | GHOST`; `CardPadding = NONE | SM | MD | LG`; `CardRadius = NONE | SM | MD | LG | XL`.

For feature tiles, use `as="article"` to keep semantics right.

### `<Accordion>` — compound, `'use client'`

```tsx
import {
  Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent,
  AccordionType,
} from '@site-foundry-template/ui';
```

Compose with `<AccordionItem value="a">` wrapping `<AccordionHeader>` + `<AccordionTrigger>` and a sibling `<AccordionContent>`. Full keyboard nav (↑/↓/Home/End) + ARIA. `<Accordion type={AccordionType.SINGLE}>` (default) or `MULTIPLE`.

### `<Marquee>` — horizontal auto-scroll, RSC

```tsx
import { Marquee, MarqueeSpeed, MarqueeGap } from '@site-foundry-template/ui';
```

| Prop | Type | Default |
|---|---|---|
| `speed` | `MarqueeSpeed` | `MarqueeSpeed.MEDIUM` |
| `gap` | `MarqueeGap` | `MarqueeGap.LG` |
| `pauseOnHover` | `boolean` | `true` |
| `reverse` | `boolean` | `false` |
| `fade` | `boolean` | `true` |
| `fadeWidth` | `string` | `'15%'` |

Pure-CSS animation (no client JS); duplicates children with `aria-hidden` for the loop.

### `<Container>` — max-width wrapper

```tsx
import { Container, ContainerSize } from '@site-foundry-template/ui';
```

| Prop | Type | Default |
|---|---|---|
| `size` | `ContainerSize` | `ContainerSize.XL` |

Enum values: `ContainerSize = XS | SM | MD | LG | XL | WIDE | FULL`.

`XL` uses `--container-max` (token); `WIDE` is an escape hatch at `--breakpoint-xl`; others map to Tailwind's `max-w-*` utilities.

---

## Composites reference

Composites live in `packages/ui/src/components/` and wrap primitives for the block shell. Use these when building a block — do not re-implement the section frame.

### `<BaseBlock block={props}>` — block shell

Wraps `<Section>` + automatic `<HeadingGroup>` + `<Stack>`. Every block's top-level render should be a `<BaseBlock>`. Reads `spacing`, `backgroundTone`, `sectionHeading` off `props`. Use `showHeading={false}` when the block lays out the heading itself (see `HeroSplitBlock`).

### `<SectionHeading>` — eyebrow + heading + subheading group

Standalone heading block — only use when placing a heading outside the auto-rendered `<HeadingGroup>` inside `<BaseBlock>`. Props: `eyebrow`, `heading`, `subheading`, `align`, `headingAs`, `headingSize`, `headingColor`.

### `<SectionCta>` — CTA row

Flex row of `<CtaButton>` or `<Button>` children. Handles alignment; no other logic.

### `<CtaButton value={cta}>` — Sanity CTA renderer

Pass the raw `cta` object from Sanity. Resolves `link.kind` (`page` / `email` / `file` / `href`), maps `variant` (`solid` / `outline` / `transparent`) and `color` (`primary` / `accent` / `light`) into the `<Button>` enum forms.

### `<HeadingGroup value={sectionHeading}>` — renders a Sanity `sectionHeading`

Called automatically by `<BaseBlock>`. Manual usage rare.

### `<Section>` — raw section shell

`<BaseBlock>` wraps this. Direct use is for the dev catalog / one-offs.

---

## Color token mapping

`packages/tokens/src/theme.css` defines CSS variables that Tailwind v4's `@theme` consumes. Reference them via `var(--...)` inside arbitrary classes, or via Tailwind utilities generated off the variable name.

> **Placeholder values today.** Structure is stable; hex values swap with the SignalWire token set in a follow-up PR that only touches `theme.css`.

### Foreground / text

| CSS variable | Role | Primitive mapping |
|---|---|---|
| `--color-primary` | default body text | `TextColor.FOREGROUND` |
| `--color-secondary` | muted body text | `TextColor.MUTED`, `TextColor.LIGHT_GRAY` |
| `--color-tertiary` | subtle text | `TextColor.SUBTLE`, `TextColor.GRAY` |
| `--color-disabled` | disabled state | — (use directly) |
| `--color-inverse` | text on inverse surfaces | — (via `inverse` Section tone) |

### Brand

| CSS variable | Role | Primitive mapping |
|---|---|---|
| `--color-brand-turquoise` | primary accent | `ButtonColor.PRIMARY`, `TextColor.PRIMARY`, `Eyebrow` (baked in) |
| `--color-brand-fuchsia` | secondary accent | `ButtonColor.SECONDARY` (Badge only), `TextColor.SECONDARY` / `TextColor.ROSE` |
| `--color-brand-blue` | tertiary accent | `TextColor.PALE_BLUE` |
| `--color-brand-purple` | — | — (no enum yet) |
| `--color-brand-gold` | — | — (no enum yet) |
| `--color-brand-light-bg` | light brand surface | `ButtonColor.LIGHT` |

### Surface

| CSS variable | Role |
|---|---|
| `--color-surface-page` | page background (default `Section` tone `none`) |
| `--color-surface-raised` | subtle raised card |
| `--color-surface-elevated` | elevated card / modal |
| `--color-surface-inverse` | inverse section background |

Section `backgroundTone` field maps to these via `<Section>`:

| `backgroundTone` | Surface |
|---|---|
| `none` | `--color-surface-page` |
| `subtle` | `--color-surface-raised` |
| `accent` | brand-tinted gradient (see `Section.tsx`) |
| `inverse` | `--color-surface-inverse` + light text |

### Opacity variants — never use rgba()

Tailwind v4's `/` syntax handles opacity. `rgba(R, G, B, A)` → `bg-[var(--token)]/{A*100}` or `color-mix(in srgb, var(--token) {A*100}%, transparent)`. Never write `bg-[rgba(...)]` or `border-[#hex]` — decompose into `token/opacity` or flag that no token is close.

---

## Typography token mapping

Map Figma sizes to the `text-*` classes generated from `@theme` `--text-*` variables + the `TextSize` / `HeadingSize` enums.

| Figma desktop | Figma mobile | Primitive |
|---|---|---|
| 56–72px | 40–48px | `<Heading as={HeadingTag.H1} size={HeadingSize.H1}>` |
| 40–48px | 32–36px | `<Heading size={HeadingSize.H2}>` |
| 28–32px | 24–28px | `<Heading size={HeadingSize.H3}>` |
| 20–24px | 18–20px | `<Heading size={HeadingSize.H4}>` or `<Text size={TextSize.LG}>` |
| 16–18px | 16px | `<Text size={TextSize.MD}>` (prose body) |
| 14–16px | 14–16px | `<Text size={TextSize.BASE}>` (default body) |
| 12–14px | 12–14px | `<Text size={TextSize.SM}>` |
| 10–12px | 10–12px | `<Text size={TextSize.CAPTION}>` or `<Eyebrow>` |

Responsive behavior is handled inside each `text-*` class — you do **not** add `md:text-*` overrides on `<Heading>` / `<Text>`. If the design needs a size between two enum steps, use the closer one and flag it.

### Font weights

| Figma style | Tailwind |
|---|---|
| Regular | `font-normal` |
| Medium | `font-medium` |
| Semibold | `font-semibold` |
| Bold | `font-bold` |

### Critical rule

**NEVER** use arbitrary text sizes like `text-[49px]` — always a token or enum. If nothing maps, flag it.

---

## Spacing rules

Tailwind v4's default scale, anchored by `--spacing: 0.25rem` (4px per step).

| Pixels | Tailwind | Common use |
|---|---|---|
| 4px | `1` | micro gaps |
| 8px | `2` | icon gaps |
| 12px | `3` | small gaps |
| 16px | `4` | standard padding |
| 24px | `6` | card gaps |
| 32px | `8` | section internal spacing |
| 48px | `12` | section padding |
| 64px | `16` | major section gaps |
| 80px | `20` | large section spacing |

Prefer the `StackGap` / `GridGap` enums whenever you're spacing siblings inside a flex / grid container — don't hard-code `gap-6` unless you're inside a raw `<div>`.

Block vertical padding comes from the `spacing` field, handled by `<Section>` via `<BaseBlock>`:

| `spacing` | py |
|---|---|
| `compact` | `py-8 md:py-12` |
| `default` | `py-12 md:py-20` |
| `roomy` | `py-20 md:py-32` |

### Critical rule

**NEVER** use arbitrary spacing like `p-[33px]` when a token exists within 2px. If nothing fits, flag it.

---

## Border radius

Radius comes from `@theme` `--radius-*` variables and from the primitive radius enums (`CardRadius`, `ImageRadius`).

| Pixels | Tailwind | Primitive enum |
|---|---|---|
| 4px | `rounded-sm` | `SM` |
| 8px | `rounded-md` | `MD` |
| 12px | `rounded-lg` | `LG` |
| 16px | `rounded-xl` | `XL` |
| 9999px | `rounded-full` | `FULL` (Image) |

---

## Building a block from Figma

End-to-end flow:

1. **Pull MCP context.**
   - `get_design_context` on desktop node
   - `get_design_context` on mobile node (if separate)
   - `get_variable_defs` on desktop node

2. **Identify the block type.**
   - Split hero with a media column → `block.heroSplit`
   - Grid of cards (2–6 items, icon+title+description) → `block.featureGrid`
   - Long-form editorial (headings, paragraphs, lists) → `block.richText`
   - Anything else → flag as needing new schema; stop.

3. **Map the layout to primitives + composites.**
   - Outer shell → `<BaseBlock block={props}>` (auto-renders sectionHeading)
   - Inner layout → `<Stack>` / `<Grid>` / `<Container>`
   - Content atoms → `<Heading>` / `<Text>` / `<Eyebrow>` / `<Badge>` / `<Image>` / `<Card>`
   - CTAs → `<SectionCta>` wrapping `<CtaButton value={cta} />`
   - Interactivity → `<Accordion>` / `<Marquee>` only when the design demands it; both are already wired through the dev catalog for reference

4. **Extract content → seed JSON.**
   - Follow `docs/content-extraction-prompt.md`
   - Save to `alpha_v3/seeds/<block-name>-<variant>.json`

5. **Dry-run the seed.**
   - From `alpha_v3/`:
     ```bash
     set -a && source /home/brock/Design-to-code-chats/project/site-foundry/.env && set +a
     pnpm apply seeds/<file>.json --dry-run
     ```
   - Fix errors, iterate.

6. **Apply for real.**
   - `pnpm apply seeds/<file>.json`
   - `pnpm verify` to confirm the block is on the target page
   - Confirm visually in Studio and in `apps/web` dev preview (`pnpm -F @site-foundry-template/web dev`)

7. **Record anything surprising.**
   - Seed-shape issues → update `docs/content-extraction-prompt.md`
   - Schema gaps → open a tracking issue against Site Foundry
   - Primitive gaps (e.g., "needed a row-stack, Stack is column-only") → update this file's pre-write checklist in the same PR

---

## Batch queue processing

When building multiple blocks in one session, use the batch flow in `docs/component-queue-template.md`. Summary of the rules that still apply per-block:

1. Maintain a queue file listing the Figma nodes to process, each marked `PENDING` / `DONE`.
2. For each pending entry, run the full flow above.
3. **Post-build audit** before marking `DONE`:
   - Every `<div>` checked against the pre-write checklist
   - No `bg-[rgba(...)]`, `bg-[#...]`, `border-[#...]`, `text-[#...]` — all decomposed to tokens
   - Every primitive prop uses its const-enum (`StackGap.MD`, not `"md"`) — string form is tolerated but flagged
   - Every new enum value used has a corresponding schema entry
4. Generate and dry-run the seed.
5. Apply for real.
6. Mark `DONE`, move to the next entry.
7. **Context budget:** if four or more blocks built in one session, stop after the current one, update the queue, and output a summary. Do not start a block you might not finish.

Queue mode does NOT mean lower quality. Same standards apply as a single build.
