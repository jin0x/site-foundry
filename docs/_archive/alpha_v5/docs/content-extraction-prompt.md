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
| `block.heroCenter` | Centered heading + optional description + CTAs stacked over optional media. The default for any "anchor" section with a centered headline. Set `mediaPlacement='below'` (default) for media below content, or **`mediaPlacement='background'`** (shipped 2026-04-24) for photo-anchored heroes where the media is a full-width dimmed backdrop with white text overlaid. |
| `block.featureGrid` | A grid of 2–6 concise cards (title + short description; optional icon, **per-item `media`** for larger diagrams/screenshots below the description, per-item `cta`, **per-item `backgroundTone`** for audience-split patterns with dark/light tiles). |
| `block.statGrid` | Row of headline stat cards — big accent number + optional inline suffix + short description per card. Use for "50% / 5× / $1.2B" type stat rows. If items carry icons instead of big numerical labels, use `featureGrid` instead. |
| `block.richText` | Long-form editorial content (privacy policy, docs, articles) |
| `block.accordion` | Collapsible list — FAQ, step-by-step, or feature-list where each item expands to show a body paragraph. Items carry `title + body + defaultOpen`. **Optional `sidebar` field** (heading, description, avatar, cta) switches the block to a 2-col "Questions? We've got answers + Chat with support" layout. |
| `block.codeSample` | Code-editor window (window chrome + filename label + code body). Use for hero media alongside heroCenter, or as a nested content item inside `block.tabbedFeatures`. |
| `block.tabbedFeatures` | Tabbed container — pill-style tab filter switches between panes, each containing one or more nested `block.accordion`, `block.codeSample`, or **`block.useCaseList`** items. For "each tab shows a different feature slice" layouts. |
| `block.useCaseList` | Two-column content block — left = vertical list of items (each with label + right-arrow + bottom-border), right = a featured media + title + body caption. Designed to nest inside `tabbedFeatures` groups so each tab swaps both the list and the featured pane together (e.g. "By Industry → healthcare scene / By Initiative → initiative scene"). |
| `block.logoMarquee` | Horizontally scrolling row of customer / partner logos. Trust marker section ("Trusted by X"). Each item carries a logo image + optional name + optional href. Scrolling is always on — do not request a static mode based on a Figma screenshot alone; Figma designs *look* static because Figma is a static design tool. |
| `block.callout` | Contained-card callout. `layout='stacked'` (default): centered heading + body + CTA inside a card. **`layout='horizontal'`** (shipped 2026-04-24): left-aligned heading + body with right-aligned CTA — use for footer-strip CTAs like "Compare X → Download eBook". Tones: `default` / `frosted` / `accent`. |
| `block.testimonials` | Testimonial cards (quote + author + role + optional avatar). `layout='grid'` (default): static N-column grid. **`layout='carousel'`** (shipped 2026-04-24): `'use client'` carousel with dot indicators + auto-scroll (`autoScrollMs`, default 6000) + hover-pause. Item `variant`: `default` / `featured` (fuchsia border + blue glow) / **`video`** (thumbnail + play-button overlay, swaps to inline `<video controls>` on click; supply `videoUrl` + `thumbnail`). |
| `block.comparison` | Side-by-side comparison of 2–4 options. Each item has a title + optional logo + a list of bullets with per-bullet state (positive/negative/neutral). Supports `featured` variant to emphasize the preferred option. |
| `block.videoContent` | Inline video player + poster image + optional caption. Use for centered video-testimonial or product-tour anchor sections. If `videoUrl` is set (direct MP4/WebM for now), renders native HTML5 `<video controls>` with the poster; if absent, renders the poster with a decorative play-button overlay as a placeholder. |
| `block.autoSwitchingCards` | Pillar section — selectable cards left (icon + title + description + progress bar on active), media panel right that swaps with the active card. Client-side; auto-advances every `autoAdvanceMs` (default 10000); click-to-swap; hover pauses. Usually paired with `backgroundTone='inverse'` at the block level for dark pillar sections. |

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

**CTA-absent escape hatch.** If the target block schema has **no** `ctas[]` field (e.g. `block.featureGrid`, `block.richText` pre-T1.1):

- Do **not** silently drop the CTA from the seed.
- Do **not** promote a card-level CTA to a Section-level CTA to "make the schema fit" — this loses the information architecture even when the render might look similar (see CTA placement pattern below).
- Mark the seed with a `// TODO: CTA dropped — see schema gap <ID>` comment on the affected block and add an entry to the queue's Schema gaps section naming the exact missing field. Record the CTA content (text + link + variant) in the gap entry so the fix-forward can recover it.
- Mark the queue row `DONE-WITH-CAVEATS` with a pointer to the gap.

### CTA placement pattern (SignalWire design convention)

Confirmed 2026-04-22 dogfood. Every block with per-item cards uses **card-level** CTAs, not Section-level. Section-level `ctas[]` is reserved for specific block types only.

| CTA location | Schema today | Block types | Design intent |
|---|---|---|---|
| **Card-level** (per-item affordance) | pending (Tier 2 T2.4 for featureGrid; T3.1 callout; T3.2 testimonials) | featureGrid items, testimonial cards, callout cards | "Learn More →" / arrow-link / ghost variant — one CTA per card, pointing at item-specific destination |
| **Section-level** (`ctas[]`) | live | heroSplit (today), richText (post-T1.1), heroCenter (pending T2.1) | 1–2 primary page-level conversion affordances — "Get started" / "See docs" under the hero or closer |

Rules:

- **Do not remove or deprecate Section CTAs** — they remain correct for hero and closer blocks.
- **Do not promote a card-level CTA to a Section CTA to fit the current schema** — flag the gap and mark `DONE-WITH-CAVEATS`. The information architecture ("one CTA per card, item-specific") does not collapse cleanly into "one CTA for the whole section."
- **If the design is ambiguous** (e.g. a closer block with one big CTA + subtle secondary link), prefer Section-level CTAs — these are the blocks they were designed for.

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

### `block.heroCenter`

Base fields (in addition to shared):

| Field | Type | Notes |
|---|---|---|
| `description` | text | Optional centered paragraph below the heading. Plain string. Rendered with `max-w-2xl` for readability. |
| `media` | imageWithAlt | Optional hero media. For composed-graphic media, prefer the Figma REST API image spec `{ figmaNodeId, alt }` over a raw MCP URL — exports at the frame's layout bounds. |
| `mediaPlacement` | string | `'below'` (default) renders media stacked under the CTAs inside the standard BaseBlock shell. `'background'` (shipped 2026-04-24) renders the media as a full-bleed dimmed backdrop behind centered white text — use for photo-anchored heroes. Background mode skips the BaseBlock wrapper, so `backgroundTone` / `spacing` are ignored in that mode. |

Always centered alignment. In `below` mode the `sectionHeading.align` is overridden to `center` in the React render; set `align: "center"` in the seed for consistency.

Declare the image (if present): `"images": { "topLevel": ["media"] }`.

### `block.accordion`

Base fields (in addition to shared):

| Field | Type | Notes |
|---|---|---|
| `items` | array | 1–12 items, each `{ _type: "object", title, body?, defaultOpen? }`. `title` required; `body` is plain text (single paragraph); `defaultOpen: true` marks the lead item as expanded on load (only one item is open at a time). |
| `sidebar` | object? | Optional left-side support card. Shape: `{ heading?, description?, avatar?, cta? }`. When ANY of these fields is set, the block switches from single-column to a 2-column layout: left = big heading + raised-card panel (avatar + "Need help?" + description + CTA); right = the accordion items. `sectionHeading` is hidden in sidebar mode because `sidebar.heading` takes its place. |

Declare the sidebar avatar image if present: `"images": { "topLevel": ["sidebar.avatar"] }` — the seeder accepts dot-paths for nested image fields. Declaring isn't strictly required today (the connector discovers `asset.url`-shaped fields automatically), but makes intent explicit.

### `block.codeSample`

Base fields (in addition to shared):

| Field | Type | Notes |
|---|---|---|
| `filename` | string | Shown in window chrome (e.g. `"advanced-ivr.js"`). Optional. |
| `language` | string | Language hint for future syntax highlighting. Defaults to filename extension. Optional. |
| `code` | text | Required. The code body. Preserve newlines; `\n` in the seed maps to newlines in the rendered `<pre>`. |
| `caption` | string | Optional caption rendered below the window. |

Rendered with prism-react-renderer — token colors come from `--color-syntax-*` CSS variables in `packages/tokens/src/theme.css`. When `language` is omitted, the seeder infers it from the filename extension (e.g. `advanced-ivr.js` → `javascript`). Supported languages cover the Prism defaults (js/ts/tsx/py/json/html/css/yaml/bash/sql/graphql/etc.); unknown extensions fall back to plain text.

### `block.tabbedFeatures`

Base fields (in addition to shared):

| Field | Type | Notes |
|---|---|---|
| `groups` | array | 1–6 tabs. Each group: `{ _type: "object", label, content?: (block.accordion \| block.codeSample)[] }`. |

`label` is the tab pill text. `content` is an inline array of sub-blocks (not Sanity references) — nest complete block objects with their own `_type` and fields.

Example group shape:

```json
{
  "_type": "object",
  "label": "Contact Center Flows",
  "content": [
    {
      "_type": "block.accordion",
      "items": [
        { "_type": "object", "title": "01 Advanced IVR", "body": "…", "defaultOpen": true }
      ]
    },
    {
      "_type": "block.codeSample",
      "filename": "advanced-ivr.js",
      "code": "const ivr = …"
    }
  ]
}
```

The React block is `'use client'` — the tab switcher uses `useState`. One tab active at a time. Two items in `content` render 2-col on `lg`; one item renders full-width; three or more stack.

### `block.logoMarquee`

Base fields (in addition to shared):

| Field | Type | Notes |
|---|---|---|
| `items` | array | 1–24 items, each `{ _type: "object", logo, name?, href? }`. `logo` is an `imageWithAlt` (accepts both `{ url, alt }` and `{ figmaNodeId, alt }` — REST API path is preferred for designer-registered logo nodes). `name` is a Studio-preview label and alt fallback. `href` optional — wraps the logo in a link (opens in new tab). |
| `speed` | string | `slow` / `medium` / `fast`. Default `medium`. |
| `pauseOnHover` | boolean | Default `true`. |
| `fade` | boolean | Fade edges into the background. Default `true`. |

Declare the nested images: `"images": { "nested": [{ "arrayField": "items", "imageFields": ["logo"] }] }`.

### `block.callout`

Base fields (in addition to shared):

| Field | Type | Notes |
|---|---|---|
| `description` | text | Optional body paragraph below the heading. |
| `icon` | imageWithAlt | Optional icon / logo mark rendered above the heading (48×48 wrapper). Only renders in `layout='stacked'`. |
| `tone` | string | `default` (subtle raised card) / `frosted` (dark card with backdrop-blur, for closer banners) / `accent` (brand-gradient tinted card). Default `default`. |
| `layout` | string | `'stacked'` (default): centered column — icon + heading + body + CTAs. `'horizontal'` (shipped 2026-04-24): heading + body left-aligned in one column, CTAs right-aligned in a second column. Use horizontal for footer-strip CTAs (e.g. "Compare X → Download eBook"). |

Use `ctas[]` for the primary page-level CTA (1–2). Declare the icon image if present: `"images": { "topLevel": ["icon"] }`.

### `block.testimonials`

Base fields (in addition to shared):

| Field | Type | Notes |
|---|---|---|
| `items` | array | 1–6 items, each `{ _type: "object", quote, name, role?, avatar?, variant?, videoUrl?, thumbnail? }`. `quote` + `name` required. `variant` defaults to `default`; use `featured` for a single emphasized card (fuchsia border + blue glow), or **`video`** (shipped 2026-04-24) for a thumbnail + play-button card that swaps to inline `<video controls>` on click. |
| `columns` | number | `2` or `3`. Default `3`. Only applies in grid layout. |
| `layout` | string | `'grid'` (default): static N-column grid (RSC). **`'carousel'`** (shipped 2026-04-24): `'use client'` carousel with dot indicators, auto-scroll, and pause-on-hover. Cards render one-at-a-time full-width in the viewport. |
| `autoScrollMs` | number | Carousel auto-advance interval in ms. Default `6000`. Only applies in `layout='carousel'`. |

Video-variant items need `videoUrl` (direct MP4/WebM for now; YouTube/Vimeo embed support is a follow-on). `thumbnail` is shown before play. Without `videoUrl` the play button is disabled; without `thumbnail` a gray placeholder box renders.

Avatars render as a 48×48 circle (`<Avatar size=MD>`) — image from the `avatar` field, or author initials from `name` as a fallback. Avatars are rendered only on non-video variants.

Declare the nested images: `"images": { "nested": [{ "arrayField": "items", "imageFields": ["avatar", "thumbnail"] }] }`.

### `block.comparison`

Base fields (in addition to shared):

| Field | Type | Notes |
|---|---|---|
| `items` | array | 2–4 items, each `{ _type: "object", title, logo?, bullets, variant? }`. `title` required; `logo` optional `imageWithAlt` (renders above title at `h-8`); `variant` is `default` (neutral card) or `featured` (fuchsia border + blue glow — use once per block to emphasize the preferred option). |
| `items[].bullets` | array | 1–10 bullets per item, each `{ _type: "object", label, state }`. `state` is `positive` / `negative` / `neutral` (default `neutral`). Renders a colored circle with check / x / dot icon next to the label. |

Declare nested logo images if present: `"images": { "nested": [{ "arrayField": "items", "imageFields": ["logo"] }] }`.

### `block.featureGrid`

Base fields:

| Field | Type | Notes |
|---|---|---|
| `items` | array | 1–6 items (see item shape below) |
| `columns` | number | `2` or `3`. Default `3`. |

Each item's fields:

| Item field | Required? | Notes |
|---|---|---|
| `_type: "object"` | Yes | |
| `eyebrow` | No | Small label above title. |
| `title` | **Yes** (schema enforced) | |
| `description` | No | Paragraph under title. |
| `icon` | No | Small icon image (48×48 slot, `ImageFit.CONTAIN`). Decorative — do NOT use for large per-item images. |
| `media` | No | **Shipped D14, 2026-04-24.** Larger per-item image/diagram rendered below the description (use for flowcharts, UI screenshots, featured thumbnails). Accepts `imageWithAlt` — MCP URL or REST API `figmaNodeId` both work. |
| `cta` | No | Per-item CTA (shipped T2.4). Renders via `<CtaButton>`; pinned to the bottom of the card via flex. |
| `backgroundTone` | No | **Shipped D8, 2026-04-24.** `'none'` (default) / `'subtle'` (subtle raised) / `'inverse'` (dark surface with white text cascade). Use `'inverse'` for audience-split patterns (one dark tile + one light tile in a `columns=2` grid). CTAs inside inverse tiles should use `color='light'`. |

Declare images per-item when used: `"images": { "nested": [{ "arrayField": "items", "imageFields": ["icon", "media"] }] }`.

### `block.statGrid`

Shipped 2026-04-24 session 1. Base fields:

| Field | Type | Notes |
|---|---|---|
| `items` | array | 1–6 items, each `{ _type: "object", number, numberSuffix?, description? }`. `number` required (e.g. `"50%"`, `"5x"`, `"XX"`). `numberSuffix` renders inline next to the number (e.g. `"More trusted"` beside `"5x"`). |
| `columns` | number | `2` or `3`. Default `3`. |

Use when a row of headline stat cards is the design intent — big display-scale accent numbers (rendered with `HeadingColor.ROSE` in the current token set) + short descriptions. If items carry icons instead of big numbers, use `featureGrid` instead.

### `block.useCaseList`

Shipped D4 on 2026-04-24. Base fields:

| Field | Type | Notes |
|---|---|---|
| `items` | array | 1–12 items, each `{ _type: "object", label, href?, active? }`. `label` required; `href` optional (wraps the row in a link); `active: true` highlights one row as the "featured" match for the featured pane on the right. |
| `featuredMedia` | imageWithAlt | Image rendered in the right-hand pane. MCP URL or REST API spec both work. |
| `featuredTitle` | string | Caption heading overlaid at bottom-left of the featured media (with gradient scrim). |
| `featuredBody` | text | Caption body under the featured title. |

`useCaseList` is **primarily designed to nest inside a `block.tabbedFeatures` group's `content[]` array** — each tab carries a useCaseList so switching tabs swaps both the list and the featured pane together. Also usable as a standalone top-level block (but will render without a section heading since `withSectionHeading: false` is set on the schema).

Declare the featured image: at the tabbedFeatures level, `"images": { "nested": [{ "arrayField": "groups", "imageFields": ["featuredMedia"] }] }` — or rely on the connector's auto-discovery (it walks `asset.url`-shaped fields).

### `block.videoContent`

Shipped D1 on 2026-04-24. Base fields:

| Field | Type | Notes |
|---|---|---|
| `videoUrl` | url | Direct MP4/WebM source URL. YouTube/Vimeo embed support is a follow-on. If absent, the block renders the poster with a decorative play-button overlay (placeholder mode). |
| `poster` | imageWithAlt | Thumbnail shown before play. Renders as the native HTML5 `<video poster>` when `videoUrl` is set; renders as a standalone `<img>` with a centered play-button overlay otherwise. |
| `caption` | string | Optional caption rendered below the video. |

Declare the poster image: `"images": { "topLevel": ["poster"] }`.

### `block.autoSwitchingCards`

Shipped D2 on 2026-04-24. Base fields (plus shared; `withCtas: true`):

| Field | Type | Notes |
|---|---|---|
| `items` | array | 2–6 items, each `{ _type: "object", title, description?, icon?, media? }`. `title` required; `media` is the image shown in the right-hand panel when this card is the active selection. |
| `autoAdvanceMs` | number | Auto-advance interval in ms. Default `10000` (10s). |

Client-side behavior (baked into the block, not configurable per-seed): timer-driven rotation through items, click-to-swap, hover-on-left-stack pauses the timer, active card shows a thin fuchsia progress bar at the bottom of its row. Progress-bar animation depends on the `@keyframes progressBar` defined in `packages/ui/src/styles/globals.css`.

Commonly paired with `backgroundTone='inverse'` at the block level for dark pillar sections. Seed-level `ctas[]` renders below the grid as a section-level conversion affordance (e.g. "Schedule a demo").

Declare images per-item when used: `"images": { "nested": [{ "arrayField": "items", "imageFields": ["icon", "media"] }] }`.

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

### Two image sources — pick per field

Image specs accept **either** of two source shapes. The seeder resolves either to a Sanity asset ref.

**(a) Figma MCP asset URL** — the URL constants emitted at the top of the MCP output:

```json
{ "url": "https://www.figma.com/api/mcp/asset/901f8cb6-...", "alt": "..." }
```

These URLs expire (roughly 7 days). The seed must be **applied in the same session** the MCP context was pulled, or the images become broken references. For SVGs, the MCP-served file has no intrinsic dimensions and `preserveAspectRatio="none"` — the seeder normalizes this at upload time (pads viewBox to square, strips the stretch-fill attributes) so icons render at consistent size.

**(b) Figma REST API** — reference a Figma node by ID:

```json
{ "figmaNodeId": "893:36615", "alt": "Code editor showing SignalWire API call" }
```

With this shape the seeder hits `GET /v1/images/<fileKey>?ids=<nodeId>&format=svg` at apply-time. Two requirements:

1. **Seed envelope** must include `figmaFileKey` (extract from the Figma URL: `figma.com/design/<fileKey>/...`):
   ```json
   {
     "figmaNodeId": "...",
     "figmaFileKey": "ox8M7KAx62v6GmQPriJBmO",
     "targetPage": "...",
     ...
   }
   ```
2. **Env var** `FIGMA_API_TOKEN` in `project/site-foundry/.env`. Generate at https://www.figma.com/developers/api#access-tokens — read-only scope is sufficient.

Optional per-image overrides: `figmaFileKey` (if the asset lives in a different file), `figmaFormat` (`svg` default; `png` or `jpg` for raster), `figmaScale` (raster only, 0.01–4).

**When to pick which:**
- **MCP URL** for icons, small decorative images, anything where a "glyph tight bounding box" rendering is acceptable (the SVG normalizer corrects the stretching).
- **Figma REST API** for composed graphics (architecture diagrams, code-editor mockups, any `block.heroCenter` media slot) — exports the node at its layout bounds, so a 24×24 icon frame exports as 24×24 and a 900×400 diagram frame exports as 900×400. This is the fix for pipeline gap 1 / T4.2.

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

1. `blockType` is one of the currently-registered set: `block.heroSplit`, `block.heroCenter`, `block.featureGrid`, `block.statGrid`, `block.richText`, `block.accordion`, `block.codeSample`, `block.tabbedFeatures`, `block.useCaseList`, `block.logoMarquee`, `block.callout`, `block.testimonials`, `block.comparison`, `block.videoContent`, `block.autoSwitchingCards`.
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

Post-Phase-6 (see `STATUS.md`): apply/bootstrap/verify moved from `alpha_v3/scripts/` to `project/site-foundry/packages/connector-sanity/`. The alpha_v3 root `package.json` exposes `pnpm apply` / `pnpm bootstrap-page` / `pnpm verify` as thin wrappers that invoke the connector CLI via `tsx`.

Before any apply: source the canonical env file. `PUBLIC_SANITY_*` vars are read from `process.env` with no auto-load.

```bash
# From alpha_v3/
set -a && source /home/brock/Design-to-code-chats/project/site-foundry/.env && set +a

# Dry run — validates, uploads images, converts markdown, prints the assembled block.
pnpm apply seeds/<name>.json --dry-run

# Real apply — upserts into pageBuilder on the target page.
pnpm apply seeds/<name>.json

# Override target page from the CLI.
pnpm apply seeds/<name>.json --target signalwire-homepage
```

Dry-run first, always. It's cheap and catches every validation error.
