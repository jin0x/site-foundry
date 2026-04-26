# Content Extraction Prompt — v3 Seed File Generation

**Purpose:** After building a block from Figma MCP output, produce a seed JSON that captures all content from the design. The seed feeds `applySeedArtifact` to populate Sanity with real page content.

**When:** Every time you build or update a block from a Figma design. The seed is produced in the same session, from the same MCP context — no second fetch needed, since Figma MCP asset URLs expire.

---

## Seed file envelope (v3)

Every seed is a JSON file saved to `seeds/<descriptive-name>.json`. Envelope:

```json
{
  "figmaNodeId": "757:6704",
  "targetPage": "staging-homepage",
  "blockType": "block.heroSplit",
  "fields": { ... },
  "images": { "topLevel": [...], "nested": [...] },
  "richText": [ "sectionHeading.subheading", "..." ]
}
```

### Required keys

| Key | Source | Notes |
|---|---|---|
| `figmaNodeId` | `node-id` from the Figma URL; convert dashes to colons: `757-6704` → `757:6704` | Used for deterministic `_key` generation |
| `targetPage` | Default: `staging-homepage` | Override per queue entry |
| `blockType` | One of the registered `block.*` types | Must exist in Site Foundry's schema |
| `fields` | Block-specific content + shared fields flattened in | See Section 2 |

### Optional keys

| Key | When to include |
|---|---|
| `images` | Any field carries a URL-based image spec that needs uploading |
| `richText` | Any field carries markdown that must become Portable Text |

**What's gone from v2:** `sectionCta` (now `fields.ctas[]`) and `sectionSettings` (now `fields.backgroundTone` + `fields.spacing`). See `CONVENTIONS.md` Section 6.

---

## Section 1 — Registered block types

Only these exist today. Do not invent types in seeds.

| `blockType` | Use when the design is… |
|---|---|
| `block.heroSplit` | Text + media side by side, often the top of a landing page |
| `block.featureGrid` | A grid of 2–6 concise cards (title + short description) |
| `block.richText` | Long-form editorial content (privacy policy, docs, articles) |

If the design needs something else, flag and add the schema before writing the seed.

---

## Section 2 — `fields` contents

`fields` is the complete block body: block-specific fields AND shared fields (flattened, not nested under a separate `sectionSettings`).

### Shared fields (added by `defineBlockSchema`)

| Field | Type | When to include | Values |
|---|---|---|---|
| `sectionHeading` | object | Whenever the block has a heading area | See below |
| `ctas` | array | Block has `withCtas: true` (heroSplit today) | Array of cta objects, max 2 |
| `backgroundTone` | string | Always safe to set — defaults to `none` | `none`, `subtle`, `accent`, `inverse` |
| `spacing` | string | Always safe to set — defaults to `default` | `compact`, `default`, `roomy` |

### `sectionHeading` object

```json
"sectionHeading": {
  "_type": "sectionHeading",
  "enabled": true,
  "eyebrow": "Platform",
  "heading": "Ship Sanity-backed marketing sites from Figma",
  "subheading": "Optional rich-text subtitle with **emphasis** or [links](https://…).",
  "align": "left"
}
```

| Field | Notes |
|---|---|
| `_type: "sectionHeading"` | Required — Sanity needs the type tag on nested objects |
| `enabled` | Default `true`. Set `false` to hide the whole heading block |
| `eyebrow` | Replaces v2's `badgeText` |
| `heading` | Plain string |
| `subheading` | **Rich text.** Write as markdown in the seed and declare the path in `richText`. If you leave it as a plain string, the seeder wraps it as a single paragraph. |
| `align` | `left` (default) or `center` |

### CTA object (in `fields.ctas[]`)

```json
{
  "_type": "cta",
  "enabled": true,
  "text": "See a live example",
  "link": {
    "kind": "href",
    "href": "https://example.com/live-example",
    "openInNewTab": true
  },
  "color": "primary",
  "variant": "solid"
}
```

| Field | Notes |
|---|---|
| `_type: "cta"` | Required on inline array objects |
| `enabled` | Default `true`. Rarely set explicitly in seeds |
| `text` | Required, plain string |
| `link.kind` | `page`, `href`, `email`, or `file` |
| `link.page` | For `kind="page"`: pass a slug string; the seeder resolves to a reference at apply-time |
| `link.href` | For `kind="href"`: absolute URL |
| `link.email` | For `kind="email"`: email address (no `mailto:` prefix) |
| `link.openInNewTab` | Default `false` |
| `color` | `primary` (default), `accent`, `light` |
| `variant` | `solid` (default), `outline`, `transparent` |

**Mapping Figma button styles:**

| Figma style | `variant` | `color` |
|---|---|---|
| Filled brand button | `solid` | `primary` |
| Filled accent / contrasting button | `solid` | `accent` |
| Filled light / inverse-on-dark button | `solid` | `light` |
| Border-only button | `outline` | pick matching color |
| Text-only / ghost / "Learn More" | `transparent` | pick matching color |

**Link default:** If the design doesn't show a clear destination, use `"kind": "href", "href": "#"`. Editors set real URLs in Studio.

---

## Section 3 — Block-specific fields

### `block.heroSplit`

Base fields (in addition to shared):

| Field | Type | Notes |
|---|---|---|
| `description` | text | Optional supporting paragraph below the heading. Plain string. |
| `media` | imageWithAlt | `{ "url": "...", "alt": "..." }` in seed; connector uploads + transforms |
| `mediaPlacement` | string | `left` or `right`. Default `right`. Infer from the design layout. |

Declare the image: `"images": { "topLevel": ["media"] }`.

### `block.featureGrid`

Base fields:

| Field | Type | Notes |
|---|---|---|
| `items` | array | 1–6 items, each `{_type:"object", eyebrow?, title, description?}` |
| `columns` | number | `2` or `3`. Default `3`. |

Each item's fields:

| Item field | Required? |
|---|---|
| `_type: "object"` | Yes |
| `eyebrow` | No |
| `title` | **Yes** (schema enforced) |
| `description` | No |

The schema today does NOT include icons on items. If the design has per-item icons, flag — do not invent the field in the seed.

### `block.richText`

Base fields:

| Field | Type | Notes |
|---|---|---|
| `content` | blockContent | Markdown string or `file:path.md` reference. **Required.** |

Declare it: `"richText": ["content"]`.

---

## Section 4 — Image extraction

### Image spec in seeds

```json
{
  "url": "https://www.figma.com/api/mcp/asset/uuid-here",
  "alt": "Descriptive alt text",
  "caption": "Optional caption"
}
```

The seeder downloads the URL, uploads to Sanity, and emits:

```json
{
  "_type": "imageWithAlt",
  "asset": { "_type": "reference", "_ref": "image-..." },
  "alt": "...",
  "caption": "..."
}
```

**Alt is required.** The seeder throws if any declared image field is missing `alt`. Write meaningful alt based on the Figma layer name, the visual context, and the component's purpose.

### Declaring image fields

```json
"images": {
  "topLevel": ["media"],
  "nested": [
    { "arrayField": "items", "imageFields": ["icon"] }
  ]
}
```

`topLevel` — any image field directly in `fields`.
`nested` — any image field inside items of an array in `fields`.

Site Foundry's current schema doesn't use `sectionImages` — every image is either top-level on the block or nested in an array.

### Figma MCP asset URLs

Image URLs are declared as constants at the top of the MCP output:

```javascript
const imgMedia = "https://www.figma.com/api/mcp/asset/901f8cb6-...";
```

These URLs expire (roughly 7 days). The seed must be **applied in the same session** the MCP context was pulled, or the images become broken references.

---

## Section 5 — Rich text extraction

For fields of type `blockContent` (rich text), the seed carries markdown that the connector converts to Portable Text.

### Declaring rich text

```json
"richText": ["content", "sectionHeading.subheading"]
```

Dot-paths are allowed. The connector walks into the `fields` object.

### Content sources

1. **File reference** — `"file:content/filename.md"` — reads markdown relative to the seed file's directory. Best for long content.
2. **Inline markdown** — write the markdown string directly in the JSON. Best for short content.

### Mapping MCP output to markdown

| MCP signal | Markdown |
|---|---|
| Largest heading style | `# H1` |
| Second-tier heading | `## H2` |
| Third-tier | `### H3` |
| Fourth-tier | `#### H4` |
| Body paragraph | plain text line |
| `font-['…Semibold']` / bold span | `**bold**` |
| Italic span | `*italic*` |
| `<ul className="list-disc">` | `- bullet` |
| Nested `<ul>` | `  - nested` (2-space indent) |
| `<ol>` | `1. numbered` |
| Colored text that's a link | `[text](url)` |
| Inline `<code>` | `` `code` `` |
| Struck text | `~~strike~~` |
| `&nbsp;` paragraphs | skip |

### Supported → Portable Text

| Markdown | Portable Text |
|---|---|
| `# ` through `#### ` | `block` with `style: h1–h4` |
| Paragraph | `block` with `style: normal` |
| `- item` | `block` with `listItem: bullet`, `level: 1` |
| `  - nested` | `listItem: bullet`, `level: 2` |
| `1. item` | `listItem: number` |
| `> quote` | `style: blockquote` |
| `**bold**` | span with `strong` mark |
| `*italic*` | span with `em` mark |
| `` `code` `` | span with `code` mark |
| `~~strike~~` | span with `strike-through` mark |
| `[text](url)` | span with link mark (added to `markDefs`) |

**Not supported:** images inside PT, code blocks, tables, nested inline marks. For those, populate in Studio after seeding.

---

## Section 6 — Nested arrays

For blocks with item arrays (featureGrid items, etc.):

```json
"fields": {
  "items": [
    {
      "_type": "object",
      "eyebrow": "Design source",
      "title": "Figma MCP ingest",
      "description": "Pull desktop and mobile frames..."
    }
  ]
}
```

Rules:

- `_type: "object"` on every item (Sanity needs it for anonymous inline objects)
- Do NOT add `_key` — the connector generates stable keys from `figmaNodeId + fieldName + index`
- Match field names to the schema exactly
- If the item has image fields, declare them in `images.nested`

---

## Section 7 — Section styling

### `backgroundTone`

Infer from the visual treatment:

| Visual cue | `backgroundTone` |
|---|---|
| Plain white / default surface | `none` |
| Light grey / subtle tint | `subtle` |
| Brand color / accent tint | `accent` |
| Dark / inverse | `inverse` |

### `spacing`

Infer from the padding rhythm of the section:

| Visual cue | `spacing` |
|---|---|
| Tighter than usual | `compact` |
| Standard rhythm | `default` |
| Hero-weight or callout with generous padding | `roomy` |

When unsure, pick `none` / `default` — editors adjust in Studio.

---

## Section 8 — Complete examples

### Example A — `block.heroSplit`

```json
{
  "figmaNodeId": "757:6704",
  "targetPage": "staging-homepage",
  "blockType": "block.heroSplit",
  "fields": {
    "sectionHeading": {
      "_type": "sectionHeading",
      "enabled": true,
      "eyebrow": "Platform",
      "heading": "Ship Sanity-backed marketing sites from Figma",
      "subheading": "Drop a design in, review the plan, apply with a **single command**.",
      "align": "left"
    },
    "description": "Every frame becomes a typed block with sensible defaults.",
    "media": {
      "url": "https://www.figma.com/api/mcp/asset/uuid-here",
      "alt": "Two teammates reviewing a Sanity Studio pageBuilder."
    },
    "mediaPlacement": "right",
    "ctas": [
      {
        "_type": "cta",
        "enabled": true,
        "text": "See a live example",
        "link": { "kind": "href", "href": "#", "openInNewTab": false },
        "color": "primary",
        "variant": "solid"
      }
    ],
    "backgroundTone": "subtle",
    "spacing": "default"
  },
  "images": { "topLevel": ["media"] },
  "richText": ["sectionHeading.subheading"]
}
```

### Example B — `block.featureGrid`

```json
{
  "figmaNodeId": "757:6349",
  "targetPage": "staging-homepage",
  "blockType": "block.featureGrid",
  "fields": {
    "sectionHeading": {
      "_type": "sectionHeading",
      "enabled": true,
      "eyebrow": "Capabilities",
      "heading": "Everything the pipeline covers today",
      "align": "center"
    },
    "items": [
      {
        "_type": "object",
        "eyebrow": "Design source",
        "title": "Figma MCP ingest",
        "description": "Pull desktop and mobile frames, extract tokens."
      },
      {
        "_type": "object",
        "eyebrow": "Typed blocks",
        "title": "Namespaced block.* types",
        "description": "Every block lives under block.*, mapped to a React component."
      }
    ],
    "columns": 3,
    "backgroundTone": "subtle",
    "spacing": "default"
  }
}
```

### Example C — `block.richText` with file reference

```json
{
  "figmaNodeId": "2565:59056",
  "targetPage": "staging-homepage",
  "blockType": "block.richText",
  "fields": {
    "sectionHeading": {
      "_type": "sectionHeading",
      "enabled": true,
      "heading": "Privacy Policy",
      "align": "left"
    },
    "content": "file:content/privacy-policy.md",
    "backgroundTone": "none",
    "spacing": "default"
  },
  "richText": ["content"]
}
```

---

## Checklist — before saving the seed

1. `blockType` is one of `block.heroSplit`, `block.featureGrid`, `block.richText` (today's registered set).
2. Field names match the block schema exactly.
3. `sectionHeading` is inside `fields`, with `_type: "sectionHeading"`.
4. Every cta has `_type: "cta"`, `text`, `link.kind`, and a default color/variant.
5. Every image spec has `url` AND `alt`. Alt is meaningful.
6. Every declared image field appears in `images.topLevel` or `images.nested`.
7. Every markdown field appears in `richText` — including nested paths like `sectionHeading.subheading` when rich formatting is present.
8. Inline array items have `_type: "object"` and no hand-rolled `_key`.
9. `figmaNodeId` uses colons, not dashes.
10. `backgroundTone` and `spacing` values are in their allowed enums.
11. Link `kind` is one of `page`, `href`, `email`, `file`.
12. For `link.kind === "page"`, the slug is confirmed to exist in the target dataset.

---

## Running the seed

```bash
# Dry run — validates, uploads images, converts markdown, prints the assembled block.
tsx scripts/connectors-sanity/applySeedArtifact.ts seeds/<name>.json --dry-run

# Real apply — upserts into pageBuilder on the target page.
tsx scripts/connectors-sanity/applySeedArtifact.ts seeds/<name>.json

# Override target page from the CLI.
tsx scripts/connectors-sanity/applySeedArtifact.ts seeds/<name>.json --target staging-homepage
```

Dry-run first, always. It's cheap and catches every validation error.
