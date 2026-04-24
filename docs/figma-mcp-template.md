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

1. Flex column? → `<Stack>` (default direction is column)
2. Flex row? → `<Stack direction={StackDirection.ROW}>`
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

- **Preferred:** use the Figma REST API image spec — `{ "figmaNodeId": "<nodeId>", "alt": "..." }` on the image field + `figmaFileKey` on the seed envelope + `FIGMA_API_TOKEN` in `.env`. The REST API exports the node at its layout bounds (a 900×400 diagram frame exports as 900×400). This is the fix for pipeline gap 1 / T4.2 — see `content-extraction-prompt.md` §Two image sources for the full seed shape.
- **Fallback (icons / small decorations):** use the Figma MCP URL (`{ url, alt }`). The seeder normalizes SVG stretch-fill attributes at upload so icons render consistently.
- Build the surrounding block normally.
- If the graphic is desktop-only, hide on mobile responsively.

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

## Site chrome vs. block content

If the Figma frame contains **site chrome** — navbar, footer, banner, floating utility nav, cookie consent, site-wide search — **exclude from the block seed**. Site chrome does not belong in `pageBuilder`. Its home is:

- **Eventual target:** a `settings` singleton in `packages/sanity-schema/src/singletons/settings.ts` driving a `<Navbar>` + `<Footer>` composite rendered inside `apps/web/app/layout.tsx`.
- **Today:** site chrome has no home — flag in the queue file's "Schema gaps" as a site-chrome/layout-architecture gap and proceed with the block-content portion of the frame only.

Typical shape to expect in the eventual settings singleton:

```
settings.navigation: {
  primary: [NavItem],
  footer: {
    columns: [{ label, links: [NavItem] }],
    socials: [SocialLink],
    legal: [legalItems],
  }
}
```

**When you encounter site chrome in a frame:** mark the row `DONE-WITH-CAVEATS` if block content was applied, or `BLOCKED` if the frame was entirely site chrome. Add to Schema gaps: *"site chrome — navbar/footer observed in frame X (evidence: `<nodeId>`), no schema destination today."* Confirmed 2/2 in 2026-04-22 dogfood (floating navbar in hero frame, full footer in closer frame). Bound to recur — every marketing mockup shows full-page context.

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
| `block.heroCenter` | `description` (text, optional), `media` (imageWithAlt, optional) | sectionHeading, ctas[], backgroundTone, spacing |
| `block.featureGrid` | `items[]` (eyebrow, title, description, icon, cta), `columns` (2 or 3) | sectionHeading, backgroundTone, spacing |
| `block.richText` | `content` (blockContent) | sectionHeading, ctas[], backgroundTone, spacing |
| `block.accordion` | `items[]` (title, body, defaultOpen) | sectionHeading, backgroundTone, spacing |
| `block.codeSample` | `filename`, `language`, `code` (text), `caption` | sectionHeading, backgroundTone, spacing |
| `block.tabbedFeatures` | `groups[]` (label + `content[]` of inline `block.accordion` \| `block.codeSample`) | sectionHeading, backgroundTone, spacing |
| `block.logoMarquee` | `items[]` (logo imageWithAlt + optional name + optional href), `speed` (slow/medium/fast), `pauseOnHover`, `fade` | sectionHeading, backgroundTone, spacing |
| `block.callout` | `description` (text, optional), `icon` (imageWithAlt, optional), `tone` (default/frosted/accent) | sectionHeading, ctas[], backgroundTone, spacing |
| `block.testimonials` | `items[]` (quote, name, role?, avatar?, variant = default \| featured), `columns` (2 or 3) | sectionHeading, backgroundTone, spacing |
| `block.comparison` | `items[]` (title, logo?, bullets[]: {label, state: positive \| negative \| neutral}, variant = default \| featured) | sectionHeading, backgroundTone, spacing |

Shared fields are added automatically by `defineBlockSchema`. `sectionHeading` is always added unless explicitly disabled; `ctas` only when `withCtas: true`.

Block React implementations live in `packages/ui/src/blocks/<Block>/<Block>.tsx` and are dispatched by `BlockRenderer` on `_type`.

### Block gotchas (confirmed via dogfood)

Known behaviors that will bite if you don't know about them. Log a new one here whenever a dogfood session surfaces a primitive-render quirk.

**`RichTextBlock`** — `packages/ui/src/blocks/RichTextBlock/RichTextBlock.tsx`:
- Body is **always left-aligned** within the max-width prose column. `sectionHeading.align` controls the heading only — not the body. For centered heading + body + CTA (callout intent) use `block.callout`. For per-paragraph alignment inside long-form content (rare), extend the `blockContent` schema with a block-level `textAlign` property and pass custom PortableText components.
- `HeadingGroup` always emits `<h2>` regardless of intent.
- No `media` field today.
- `ctas[]` shipped via T1.1 (`withCtas: true`) for section-level conversion affordances under long-form content.

**`FeatureGridBlock`** — `packages/ui/src/blocks/FeatureGridBlock/FeatureGridBlock.tsx`:
- Items render `icon + eyebrow + title + description + cta` (icon first, cta last). `icon` is sized in a 48×48 wrapper with `ImageFit.CONTAIN`; `cta` renders via `<CtaButton>` (transparent/ghost variants work well for "Learn More" affordances). T2.3 (`items[].icon`) + T2.4 (`items[].cta`) shipped in schema; T5.2 shipped in render. The fetch query (`apps/web/sanity/lib/queries.ts`) expands `items[].icon.asset->` + `items[].cta.link.*` — don't skip those in new page queries.

**`HeroSplitBlock`** — `packages/ui/src/blocks/HeroSplitBlock/HeroSplitBlock.tsx`:
- Hardcoded 2-column split layout. For centered heroes with media-below, use `block.heroCenter` (shipped T2.1) instead of forcing through `HeroSplitBlock`.

**`HeroCenterBlock`** — `packages/ui/src/blocks/HeroCenterBlock/HeroCenterBlock.tsx`:
- Renders centered heading + optional centered description (max-w-2xl) + centered CTAs row + optional media below. Always centered — the `sectionHeading.align` field is overridden to `center` inside the render (seed value is ignored for alignment; set it anyway for consistency).
- Use for: centered marketing headlines over a composed graphic (code-editor, architecture diagram, screenshot). The media slot expects an `imageWithAlt` — for composed graphics, prefer the Figma REST API image spec (`{ figmaNodeId, alt }`) over the MCP URL since the REST API exports at the frame's layout bounds. See `content-extraction-prompt.md` §Two image sources.

---

## Primitives reference

All primitives export from `@site-foundry-template/ui` alongside their const-enum types and class-map constants. Enum imports shown inline.

### `<Stack>` — flex layout (column or row)

```tsx
import { Stack, StackGap, StackAlign, StackDirection } from '@site-foundry-template/ui';
```

| Prop | Type | Default |
|---|---|---|
| `as` | `ElementType` | `'div'` |
| `direction` | `StackDirection` | `StackDirection.COLUMN` → `'column'` |
| `gap` | `StackGap` | `StackGap.MD` → `'md'` |
| `align` | `StackAlign` | undefined |

Enum values: `StackDirection = COLUMN | ROW`; `StackGap = NONE | XS | SM | MD | LG | XL | XL2 | XL3`; `StackAlign = START | CENTER | END | STRETCH`.

**Figma mapping:** Auto Layout frame. `direction` maps from the Figma layout direction; gap maps from the Figma gap variable. `align` applies to the cross-axis (horizontal alignment when column, vertical alignment when row).

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

### `<IconBadge>` — sized container for an icon / glyph

```tsx
import { IconBadge, IconBadgeSize } from '@site-foundry-template/ui';
```

| Prop | Type | Default |
|---|---|---|
| `source` | `ImageWithAltValue?` | — (preferred: pass the Sanity object) |
| `src` / `alt` | `string` | — (overrides `source`) |
| `size` | `IconBadgeSize` | `IconBadgeSize.MD` → `'md'` (48px badge, 24px icon) |
| `children` | `ReactNode?` | — (overrides the image — pass inline SVG when needed) |

Enum values: `IconBadgeSize = SM | MD | LG` (32 / 48 / 64px badges, with 16 / 24 / 32px icons inside). Renders a rounded-xl surface-raised container with the icon centered at ~50% of the badge dimension. Override `className` for tonal tints (`bg-[color-mix(in_srgb,var(--color-brand-turquoise)_20%,transparent)]`) or floating positioning (`-mt-8` to overlap the parent's top edge).

### `<Avatar>` — rounded user/brand portrait

```tsx
import { Avatar, AvatarSize } from '@site-foundry-template/ui';
```

| Prop | Type | Default |
|---|---|---|
| `source` | `ImageWithAltValue?` | — (preferred: pass the Sanity object) |
| `src` / `alt` | `string` | — (overrides `source`) |
| `name` | `string?` | — (used for alt fallback + initials when no image) |
| `size` | `AvatarSize` | `AvatarSize.MD` → `'md'` (48px) |

Enum values: `AvatarSize = XS | SM | MD | LG | XL` (24 / 32 / 48 / 64 / 96px). Shows a circular image when `src` or `source.asset.url` resolves; otherwise falls back to 2-letter initials from `name`; otherwise renders an empty placeholder circle (decorative, `aria-hidden="true"`).

### `<Accordion>` — compound, `'use client'`

```tsx
import {
  Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent,
  AccordionType,
} from '@site-foundry-template/ui';
```

Compose with `<AccordionItem value="a">` wrapping `<AccordionHeader>` + `<AccordionTrigger>` and a sibling `<AccordionContent>`. Full keyboard nav (↑/↓/Home/End) + ARIA. `<Accordion type={AccordionType.SINGLE}>` (default) or `MULTIPLE`.

### `<Tabs>` — compound, `'use client'`

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@site-foundry-template/ui';
```

Compose with `<TabsList>` wrapping `<TabsTrigger value="a">` buttons, paired with `<TabsContent value="a">` panels. Single-selection, controlled or uncontrolled (`defaultValue` / `value` + `onValueChange`). Full keyboard nav (←/→/Home/End), roving tabindex, `role="tab"`/`tabpanel"` + `aria-selected`/`aria-controls`. Pill-style tablist baked into `<TabsList>` defaults — override via `className`.

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

0. **Drill in first.** On any frame larger than a single hero / section (rule of thumb: >800px tall on desktop, or visually contains >1 distinct content zone), run `get_metadata` **before** picking a block type. A Figma "frame" is a canvas unit, not necessarily a block unit — it may contain multiple block candidates (e.g. logo row + comparison section) or a mix of pageBuilder content + site-chrome (e.g. closer + footer). Treat each child frame as an independent candidate. If the parent splits, add queue rows for each child (`4a`, `4b`, ...) — do not renumber existing rows. Earned the hard way 2/8 frames in 2026-04-22 dogfood.

   **Leaf-parent quirk:** if `get_metadata` returns a leaf (no children) on a visibly-non-empty frame, the frame's visual contents are likely peer-level component instances — still queryable by their own node IDs, just not reachable through the parent's metadata tree. Hit once in round 2 on frame #8 (`893:7486` returned leaf; `893:7487` CTA Banner + `893:7489` Footer were siblings). When this happens, pull known child IDs from prior-round evidence, the Figma dev-mode sidebar, or query by visible layer name. Don't treat a leaf result as "nothing there."

1. **Pull MCP context.**
   - `get_design_context` on desktop node
   - `get_design_context` on mobile node (if separate)
   - `get_variable_defs` on desktop node

2. **Identify the block type.**

   If the frame clearly doesn't map to any registered block, flag it + mark the row `BLOCKED` — do not freelance a workaround. The build plan captures the new-schema need, not the build step.

   Work through the block-type buckets in order — the first seven are the "happy path" matches against currently-registered blocks; then the escape hatch; then the hard stop.
   - Split hero with a media column → `block.heroSplit`.
   - Centered hero / anchor section (heading + optional description + CTAs over optional media below) → `block.heroCenter` (T2.1). For composed-graphic media (code editors, diagrams), prefer the Figma REST API image spec.
   - Grid of cards (2–6 items, title + description + optional icon + optional cta) → `block.featureGrid`. Icons + per-item CTAs are carried end-to-end post T2.3/T2.4 + T5.2.
   - Long-form editorial (headings, paragraphs, lists) → `block.richText`. Supports `ctas[]` for section-level conversion affordances under the prose column.
   - Collapsible list (FAQ / step-by-step with open state) → `block.accordion` (T3.4). Items have `title + body + defaultOpen` fields; rendered via the `<Accordion>` primitive (single-open by default).
   - Code editor window (chrome + filename + body) → `block.codeSample` (T3.5). Fields: `filename + language + code + caption`. Use standalone as hero media OR nested inside a tabbedFeatures tab pane. Syntax highlighting via prism-react-renderer; token colors route through `--color-syntax-*` CSS variables (swap with the token theme, no component edits). Language inferred from `filename` extension when `language` is absent.
   - Tabbed / grouped content (tab filter swaps between panes containing accordion/codeSample combos) → `block.tabbedFeatures` (T2.2). Shape: `groups[]: { label, content[]: (block.accordion | block.codeSample)[] }`. Content array is inline sub-blocks — no Sanity refs. Render is `'use client'` with a useState tab switcher.
   - Horizontal row of customer / partner logos ("Trusted by…") → `block.logoMarquee` (T3.6). Items carry `logo + name + href`. Wraps the `<Marquee>` primitive; fade + pause-on-hover default true. For logo SVGs, prefer the Figma REST API image spec (designer-registered logo nodes export cleanly at their frame bounds).
   - Contained-card callout (heading + body + CTA, sits inside a distinct card frame) → `block.callout` (T3.1). Fields: `description + icon + tone`. `tone='default'` for a subtle raised card, `tone='frosted'` for dark frosted-backdrop cards (closers), `tone='accent'` for brand-gradient cards. Wraps the `<Card>` primitive with tone classes layered via `className`.
   - Testimonial cards (quote + author + avatar, optionally with a featured card emphasized) → `block.testimonials` (T3.2). Fields: `items[]: { quote, name, role?, avatar?, variant }` + `columns`. `variant='featured'` renders with fuchsia border + blue glow shadow + larger quote text. Avatar optional — renders via `<Avatar>` primitive (48px circle, image or initials fallback). Carousel behavior (dots + rotation) not yet shipped; v1 renders as a static grid.
   - Side-by-side comparison with per-item pro/con bullets (e.g. "Us vs Them") → `block.comparison` (T3.3). Fields: `items[]: { title, logo?, bullets[]: { label, state }, variant }`. Bullet `state` of `positive` renders a turquoise checkmark, `negative` a fuchsia x, `neutral` a dot. `variant='featured'` is the same emphasis treatment as testimonials (fuchsia border + blue glow). Min 2 items, max 4. Inline SVG icons today — `<BulletIndicator>` primitive extraction deferred (composite gap 11) until a second use site appears.
   - **Adjacent-but-degraded.** The frame's intent isn't a perfect match for any existing block, but one block is close enough to carry the headline + most content. Use that block for a best-effort render, file the specific missing fields in the queue's Schema gaps section, and mark the row `DONE-WITH-CAVEATS` with a pointer to the gap entries.
   - Anything else (matches no happy-path bucket AND no sane degrade path) → flag as needing new schema; mark row `BLOCKED`; stop.

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
