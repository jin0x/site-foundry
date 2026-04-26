# alpha_v3

alpha_v3 is the design-to-code-to-Sanity working set, re-versioned for the **Site Foundry** target.

It is a clean break from `alpha_v2`: the *algorithms* carry over intact (image upload caching, markdown → Portable Text, stable block keys, idempotent upserts) but every field name, block-type namespace, and shared-field shape has been re-modeled to match `templates/next-sanity-starter` in the `site-foundry` repo.

---

## Why a new version

Between v2 and the Site Foundry handoff, the CMS contract changed:

- blocks are now namespaced: `block.heroSplit`, `block.featureGrid`, `block.richText`
- CTAs moved from `sectionCta.primary / sectionCta.secondary` slots to an ordered `ctas[]` array
- section styling split from a single `backgroundVariant` into `backgroundTone` + `spacing`
- images must be `imageWithAlt` (alt required, caption optional)
- section headings now carry rich-text subheadings and alignment

A compat shim would have bought us two weeks of bridge code with zero long-term value. A clean break costs one afternoon of renaming and documents the actual target.

See [CONVENTIONS.md](./CONVENTIONS.md) for the full field-by-field diff against v2.

---

## What alpha_v3 is (and isn't)

alpha_v3 is a **working set** — a collection of utilities, seed-file examples, and prompt templates that we use *before* Site Foundry is ready to host them natively.

It is intentionally narrow. It covers one slice of Site Foundry's generation pipeline:

```
Figma MCP output → seed JSON → applied Sanity draft
                       ^
              alpha_v3 lives here
```

It does **not**:

- ingest Figma directly (that's `connector-figma` / the operator API in Site Foundry)
- generate schema or components (that's `generator-next-sanity`)
- plan runs, manage artifacts, or persist registry state

Those responsibilities belong to Site Foundry. alpha_v3's purpose is to make the last-mile "write content into Sanity" step concrete and battle-tested, so when Site Foundry is ready to wire it in, the code and the conventions have already been validated against real pages.

---

## Where things live

```
alpha_v3/
├── README.md                         ← this file
├── CONVENTIONS.md                    ← v2 → v3 field-name diff
├── IMPLEMENTATION-PLAN.md            ← phased integration plan
├── scripts/
│   ├── sanity-kit/                   ← eventual home: packages/sanity-kit
│   │   ├── markdownToPortableText.ts
│   │   ├── imageUpload.ts
│   │   └── sanitySafety.ts
│   └── connectors-sanity/            ← eventual home: packages/connector-sanity
│       └── applySeedArtifact.ts
├── seeds/
│   ├── hero-split-example.json       ← block.heroSplit demo
│   ├── rich-text-example.json        ← block.richText with file-ref markdown
│   ├── feature-grid-example.json     ← block.featureGrid with nested items
│   └── content/
│       └── rich-text-sample.md       ← sample markdown for richText seed
└── docs/
    ├── figma-mcp-template.md         ← Next.js + Site Foundry primitives variant
    ├── content-extraction-prompt.md  ← seed-file generation instructions
    └── designer-checklist.md         ← Phase 0 designer token readiness
```

Every file here has a documented target location in Site Foundry. See [IMPLEMENTATION-PLAN.md](./IMPLEMENTATION-PLAN.md) for the migration map.

---

## How it fits Site Foundry

Site Foundry's ARCHITECTURE.md explicitly calls out that the Figma-to-code pipeline has not yet been copied into the repo. alpha_v3 is the thing that *will* be copied in, broken up along Site Foundry's package boundaries:

| alpha_v3 file | Site Foundry destination |
|---|---|
| `scripts/sanity-kit/markdownToPortableText.ts` | `packages/sanity-kit/src/markdown.ts` |
| `scripts/sanity-kit/imageUpload.ts` | `packages/sanity-kit/src/assets.ts` |
| `scripts/sanity-kit/sanitySafety.ts` | `packages/sanity-kit/src/client.ts` |
| `scripts/connectors-sanity/applySeedArtifact.ts` | `packages/connector-sanity/src/apply.ts` |
| `seeds/*.json` | generator output artifacts (`artifacts/seeds/*.json`) |
| `docs/figma-mcp-template.md` | `packages/connector-figma` prompts |
| `docs/content-extraction-prompt.md` | `packages/generator-core` normalize stage |
| `docs/designer-checklist.md` | operator-facing onboarding docs |

---

## Running locally (pre-integration)

The scripts here are shaped to be dropped into Site Foundry, but they run standalone against any Sanity project that has the `next-sanity-starter` schema installed. See [IMPLEMENTATION-PLAN.md](./IMPLEMENTATION-PLAN.md) Phase 1 for the standalone-run setup.

---

## Related

- `alpha_v2/` — previous iteration, kept for reference on what changed
- `project/site-foundry/` — the target repo (colleague's)
- `project/Site Foundry/` — architecture docs / zip-folder version of the same
