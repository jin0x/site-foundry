# Designer Checklist — Token Readiness for Automated Builds

This checklist defines what "design ready for build" means when the Figma MCP pipeline targets Site Foundry's `next-sanity-starter`. Share it with the designer before frames are finalized.

The Figma MCP returns whatever the layer is actually wired to, not what's defined in collections. Defined-but-unapplied tokens are invisible to automation. Every item below directly affects whether the MCP output produces clean, tokenized code — or arbitrary values that require manual cleanup.

---

## The checklist

### Spacing — highest-leverage fix

- [ ] **Auto Layout gaps bound to spacing variables.** Every gap and padding value in Auto Layout should reference a spacing variable, not a raw pixel number. This is the single highest-impact improvement — one mechanical pass through Auto Layout fields converts 80% of arbitrary values into scale references.

### Typography

- [ ] **All text layers use text styles or typography variables.** No raw font-size/weight/line-height values. When the MCP returns `text-[16px]` instead of a style reference, the extractor has to guess which Heading/Text primitive to pick.

### Colors

- [ ] **Flat fills bound to color variables.** Every solid fill should reference a variable, not a raw hex. When the MCP returns `#631B3A` the extractor needs a lookup table; when it returns `color/brand/primary` it maps directly to a primitive prop.

- [ ] **Gradients have a strategy.** Multi-stop gradients with intermediate colors don't fit token systems cleanly. Decide up front: either simplify to tokenized stops, or accept that gradients are bespoke CSS. Either answer is fine — having no answer causes rework.

### Images and alt text

- [ ] **Every image has descriptive layer naming.** Site Foundry's `imageWithAlt` type **requires** an alt at the schema level. The extractor pulls alt from the Figma layer name or a caption annotation. Generic names like `image`, `img-1`, `photo` force manual writes later.

- [ ] **Static graphics are isolated in their own frame.** Illustrations, wireframe charts, and diagrams with dozens of small fragments should be one frame marked as a graphic — not composed from design primitives. These get exported as images, not rebuilt in code.

### Mobile

- [ ] **Mobile uses component instances, not rebuilt frames.** Designers tend to rebuild mobile layouts as raw frames instead of component instances with responsive variants. This breaks the two-call MCP workflow (desktop + mobile) because mobile output diverges structurally. Mobile should use the same components as desktop, with variant properties toggled.

### Precision

- [ ] **Sub-pixel values rounded.** Dimensions like `343.5px` or `47.2px` create arbitrary values in code. Round to whole pixels, or bind to spacing variables.

### Hygiene

- [ ] **No stray template or test pages.** Leftover pages with wrong fonts, colors, or placeholder content pollute MCP search results. Archive or delete pages not part of the active design.

- [ ] **Section padding follows a convention.** Consistent vertical padding site-wide creates predictable rhythm. In Site Foundry, sections use one of three settings: `compact`, `default`, `roomy` — picking a Figma padding value per category (e.g., 48 / 80 / 128 px) and holding to it makes the `spacing` field translate cleanly.

### Blocks, not vibes

- [ ] **Section layouts align with the registered block types.** Today Site Foundry supports `block.heroSplit`, `block.featureGrid`, `block.richText`. Designs that lean on variations of those translate smoothly; designs that invent new layouts block the pipeline until schema lands. Coordinate before finalizing frames that don't fit the registry.

- [ ] **Section headings use the same structure site-wide.** Eyebrow → heading → optional subheading → alignment (left/center). Matches the `sectionHeading` object the schema expects.

- [ ] **CTA buttons use a consistent visual system with no more than three color-variant combinations.** The schema offers `color × variant = 9` total combinations; using more than three in the same page creates editorial noise without visual benefit.

---

## Pilot frame test

Before the designer builds out full pages, request **one fully tokenized pilot frame** — a single hero with all the above applied. Run it through the pipeline:

1. `get_variable_defs` — do variable references appear, or raw hex / raw px?
2. `get_design_context` — does the output contain token names, or arbitrary Tailwind values?
3. Write a seed. Dry-run. Apply to a staging page.

If the pilot goes through with fewer than three manual fixes, the design system is flowing correctly. If the seed needs surgery or the extractor has to guess at image alts, the feedback loop starts here — before five pages of un-tokenized frames exist.

---

## Why this matters

| Item | Cost if missed |
|---|---|
| Spacing bound to variables | Manual cleanup on every block, every section |
| Mobile uses component instances | Mobile diverges, double the components to maintain |
| Gradient strategy decided | Each gradient becomes bespoke inline CSS |
| Section padding convention | `spacing` field picks become guesses |
| Sub-pixel rounding | Ugly arbitrary values, manual rounding pass |
| No stray template pages | Wrong fonts/colors leak into MCP output |
| Alt text in layer names | Manual alt writes for every image, or accessibility failures |
| Section layouts fit registered blocks | Pipeline blocks on schema gaps; nothing applies |

The other items (shadow tokens, opacity tokens, multi-theme mode) are nice-to-haves handled iteratively. The items above are the ones that cost real time when missed.
