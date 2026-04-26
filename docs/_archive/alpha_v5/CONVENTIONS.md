# Conventions — alpha_v2 → alpha_v3

This file documents every shape change between `alpha_v2`'s seed format and `alpha_v3`'s Site-Foundry-aligned format. It exists so that:

1. We don't have to re-discover the diff every time we copy a v2 seed.
2. When Site Foundry's schemas drift, we have a baseline to compare against.
3. The extraction prompt and the seeder stay in sync.

If you edit a shape in the seeder, update this file in the same commit.

---

## Section 1 — Block type names

**v2:** snake_case, unnamespaced.

```json
"blockType": "hero_text"
"blockType": "use_cases"
"blockType": "split_content"
"blockType": "rich_text"
```

**v3:** dot-namespaced camelCase, prefixed with `block.`.

```json
"blockType": "block.heroSplit"
"blockType": "block.featureGrid"
"blockType": "block.richText"
```

**Why:** Site Foundry's Sanity schema (`templates/next-sanity-starter/packages/sanity-schema/src/blocks/*.ts`) registers every block as `name: 'block.xxx'`. The UI BlockRenderer (`packages/ui/src/blocks/BlockRenderer.tsx`) matches on `_type` against `block.heroSplit`, `block.featureGrid`, `block.richText`. The namespace reserves room for `card.*`, `nav.*`, etc.

**Migration:** Every v2 seed's `blockType` maps to a v3 equivalent if one exists. If none exists yet, flag in the implementation plan as "needs Site Foundry schema before porting."

| v2 blockType | v3 blockType | Notes |
|---|---|---|
| `hero_text` | `block.heroSplit` (if media present) or new text-only block | Site Foundry currently only has heroSplit |
| `split_content` | `block.heroSplit` | Same shape, different name |
| `rich_text` | `block.richText` | Direct map |
| `use_cases` | `block.featureGrid` | Similar shape — nested item array |
| `cta_callout` | Not yet in Site Foundry | Blocked |
| `comparison` | Not yet in Site Foundry | Blocked |
| `documentation-grid` | `block.featureGrid` | Possibly, depending on icon support |

---

## Section 2 — CTAs

**v2:** two named slots on a section.

```json
"sectionCta": {
  "primary": { "text": "Get Started", "link": { ... }, "arrow": true, "variant": "solid" },
  "secondary": { "text": "Talk to Sales", "link": { ... }, "arrow": true, "variant": "outline" }
}
```

**v3:** one ordered array, placed inside `fields` on blocks that include `withCtas: true`.

```json
"fields": {
  ...,
  "ctas": [
    {
      "_type": "cta",
      "enabled": true,
      "text": "Get Started",
      "link": { ... },
      "color": "primary",
      "variant": "solid"
    },
    {
      "_type": "cta",
      "enabled": true,
      "text": "Talk to Sales",
      "link": { ... },
      "color": "primary",
      "variant": "outline"
    }
  ]
}
```

**Why:** The colleague's schema uses `defineBlockSchema({ withCtas: true })` which adds a single `ctas` array (max 2). There is no "primary/secondary" distinction at the data level — order determines visual prominence. This matches how Sanity handles repeatable objects and makes it trivial to add, remove, or reorder without special handling.

**Field-level diff inside each CTA:**

| v2 | v3 | Notes |
|---|---|---|
| — | `_type: "cta"` | Required for inline object arrays |
| — | `enabled: true` | New field, defaults to true; hides text/link when false |
| `text` | `text` | Unchanged |
| `link.linkType` | `link.kind` | Same enum values: `page`, `href`, `email` — plus new `file` |
| `link.href` | `link.href` | Unchanged |
| `link.pageRef` | `link.page` (reference) | v3 wants a real `{_type: 'reference', _ref: '<id>'}`, not a slug string |
| `link.email` | `link.email` | Unchanged |
| `link.newTab` | `link.openInNewTab` | Renamed, default `false` |
| `arrow: true` | *(removed)* | Site Foundry's cta schema has no arrow toggle — presentation-only concern |
| `variant: "solid" \| "outline" \| "ghost"` | `variant: "solid" \| "outline" \| "transparent"` | `ghost` → `transparent` |
| — | `color: "primary" \| "accent" \| "light"` | New — replaces visual-only variation |

**Migration note for `link.kind: "page"`:** v2 accepted a slug string. v3 needs a reference. The connector resolves this at apply-time by querying Sanity for `*[_type=="page" && slug.current==$slug][0]._id` and wrapping in `{_type: "reference", _ref: id}`. Seeds can still *author* with a slug; resolution happens in the apply layer.

---

## Section 3 — Section styling

**v2:** single string.

```json
"sectionSettings": {
  "backgroundVariant": "gradient-purple"
}
```

**v3:** two orthogonal fields, flattened into the block (no nested `sectionSettings` object).

```json
"fields": {
  ...,
  "backgroundTone": "subtle",
  "spacing": "default"
}
```

**Why:** The colleague's `defineBlockSchema` splits what v2 overloaded into one field. `backgroundTone` picks the surface color/brightness; `spacing` picks the vertical rhythm. The two are independent — a block can be `tone=inverse spacing=roomy` without inventing a new variant name.

**Enum values (from `shared/options.ts`):**

| Field | Values | Default |
|---|---|---|
| `backgroundTone` | `none`, `subtle`, `accent`, `inverse` | `none` |
| `spacing` | `compact`, `default`, `roomy` | `default` |

**Migration from v2 variant strings:** Case-by-case. A handful of common mappings:

| v2 `backgroundVariant` | v3 `backgroundTone` | v3 `spacing` |
|---|---|---|
| `none` / `white` | `none` | `default` |
| `muted` / `light-grey` | `subtle` | `default` |
| `brand` / `gradient-purple` | `accent` | `default` |
| `dark` / `inverse` | `inverse` | `default` |
| `dense` / `compact-section` | *(pick tone separately)* | `compact` |
| `hero` / `large-pad` | *(pick tone separately)* | `roomy` |

---

## Section 4 — Images

**v2:** raw Sanity image ref, alt optional and positional.

```json
"image": { "_type": "image", "asset": { "_ref": "image-abc-800x600-png" }, "alt": "..." }
```

The old imageUpload utility returned `{ _type: "image", asset: { _ref } }` and spread in an `alt` if the seed provided one.

**v3:** `imageWithAlt` custom type. Alt is a real field, required by schema validation. Caption is optional.

```json
"media": {
  "_type": "imageWithAlt",
  "asset": { "_type": "reference", "_ref": "image-abc-800x600-png" },
  "alt": "Two developers reviewing a dashboard on a laptop",
  "caption": "Staging environment rollout review"
}
```

**Why:** Required alt at the schema level prevents headless-accessible-image leaks. `imageWithAlt` lives at `packages/sanity-schema/src/objects/imageWithAlt.ts` and is referenced by every block field that holds an image (e.g., `heroSplit.media`, `backgroundImage` when we port it).

**Migration:**
- The seeder's `imageUpload` function now emits `{ _type: "imageWithAlt", asset, alt, caption? }` — not `{_type:"image", ...}`.
- Seeds must provide alt for every image; dry-run validation fails loudly when alt is missing.
- `image-upload.ts` cache is unchanged — still keyed by content hash, still stored in `.cache/asset-map.json`.

---

## Section 5 — Section heading

**v2:** plain-text subheading, badge-styled eyebrow.

```json
"sectionHeading": {
  "heading": "Dive into Documentation",
  "subheading": "Guides, API references, and SDKs.",
  "badgeText": "Docs"
}
```

**v3:** eyebrow is a string, subheading is **rich text** (blockContent), new `align` + `enabled` fields.

```json
"sectionHeading": {
  "_type": "sectionHeading",
  "enabled": true,
  "eyebrow": "Docs",
  "heading": "Dive into Documentation",
  "subheading": "Guides, API references, and SDKs.",
  "align": "left"
}
```

**Why `subheading` is rich text:** The colleague's schema uses `type: 'blockContent'`. This lets designers drop a link or inline emphasis into a subheading without us having to rebuild the field as a full rich-text block.

**Seed handling:** If the seed provides `subheading` as a plain string, the connector wraps it in a single-paragraph Portable Text block at apply-time. If the seed provides markdown, declare `sectionHeading.subheading` in `richText` so the seeder converts it. See `docs/content-extraction-prompt.md` for examples.

| v2 field | v3 field | Notes |
|---|---|---|
| `badgeText` | `eyebrow` | Renamed |
| `heading` | `heading` | Unchanged — still plain string |
| `subheading` | `subheading` | Type changed string → blockContent |
| — | `enabled: true` | New — when false, the whole heading block is hidden |
| — | `align: "left" \| "center"` | New — default `left` |

---

## Section 6 — Seed envelope

**v2 envelope:**

```json
{
  "figmaNodeId": "757:6704",
  "targetPage": "staging-homepage",
  "blockType": "hero_text",
  "fields": { ... },
  "images": { "topLevel": [...], "nested": [...], "sectionImages": [...] },
  "richText": [ "content" ],
  "sectionCta": { "primary": {...}, "secondary": {...} },
  "sectionSettings": { "backgroundVariant": "...", "backgroundImage": {...} }
}
```

**v3 envelope:**

```json
{
  "figmaNodeId": "757:6704",
  "targetPage": "staging-homepage",
  "blockType": "block.heroSplit",
  "fields": {
    "sectionHeading": { ... },
    "description": "...",
    "media": { "url": "...", "alt": "..." },
    "mediaPlacement": "right",
    "ctas": [ ... ],
    "backgroundTone": "subtle",
    "spacing": "default"
  },
  "images": { "topLevel": ["media"], "nested": [...] },
  "richText": [ "sectionHeading.subheading", "description" ]
}
```

**Shape changes:**

- `sectionCta` (top-level) → gone. CTAs live in `fields.ctas[]`.
- `sectionSettings` (top-level) → gone. Style fields live directly in `fields` (`backgroundTone`, `spacing`, `mediaPlacement`).
- `fields.sectionHeading` stays in `fields` (unchanged placement).
- `images.sectionImages` → gone. Section-level images would now just be top-level fields (e.g., `backgroundMedia`), declared in `images.topLevel`.
- `richText` now supports **nested paths** like `"sectionHeading.subheading"` — the connector walks dot-paths into the fields object.

---

## Section 7 — Key derivation

**Unchanged from v2.** Every block gets `_key = "f" + md5(figmaNodeId).slice(0, 11)` for idempotency. Re-running the same seed updates the same block. Every inline array object gets `_key = "f" + md5(`${figmaNodeId}:${fieldName}:${index}`).slice(0, 11)`.

---

## Section 8 — Non-changes (intentional)

These v2 patterns carry into v3 unmodified:

- Dataset gating via `PUBLIC_SANITY_DATASET` env var
- Interactive production-write confirmation with auto-backup
- Content-hash image cache in `.cache/asset-map.json`
- Markdown → Portable Text converter (same subset of markdown)
- Dry-run flag (`--dry-run`) that prints the resolved block data without writing
- Seeder orchestration order: parse seed → resolve rich text → resolve images → build block data → patch page

If we change any of those, update this section.
