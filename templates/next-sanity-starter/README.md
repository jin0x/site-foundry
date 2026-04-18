# Next + Sanity Starter

Site Foundry's first consumer template. It inherits:

- workspace separation from `decisions-website`
- schema methodology from `decisions-website`
- enum and conditional-field patterns from `bedrock`

## Shape

```text
next-sanity-starter/
├── apps/
│   ├── studio/
│   └── web/
├── packages/
│   ├── sanity-schema/
│   ├── sanity-types/
│   └── ui/
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── turbo.json
```

## Intended use

- `apps/web` owns Next.js routing, draft mode, live content, and app-specific registry overrides.
- `apps/studio` owns Sanity Studio, desk structure, and Presentation tool resolve logic.
- `packages/sanity-schema` is the content contract.
- `packages/sanity-types` is generated output in the real system; this starter ships typed placeholders until typegen is wired.
- `packages/ui` provides primitives, components, and blocks with a `_type -> React component` registry.

The template is deliberately skeletal. It is the shape Site Foundry generators should materialize into, not a finished product site.
