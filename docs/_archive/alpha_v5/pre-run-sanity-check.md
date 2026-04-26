# Pre-run sanity check — alpha_v5 + Site Foundry

Run this **before** starting Stage 1 of the new-project pipeline dogfood. Goal: verify the alpha_v5 workflow directory correctly drives the Site Foundry connector + packages.

Each check has an expected result. If a check fails, fix before proceeding — do NOT paper over a broken integration with a pipeline run.

Total expected time: **~10 minutes**.

---

## Workspace layout — read this BEFORE running commands (gap D13)

Site Foundry has **two workspaces** with different package-name conventions. Running pnpm filters from the wrong one gives `No projects matched the filters` (benign but confusing).

- **Outer workspace:** `project/site-foundry/` — packages are named `@site-foundry/*` (primitives, components, blocks, connector-sanity, tokens, etc.). Most of these are mostly-empty scaffolds from generator/integration work; **the real block code does NOT live here**. The **exception** is `@site-foundry/connector-sanity`, which is what `pnpm apply` / `pnpm bootstrap-page` / `pnpm verify` invoke via relative path from `alpha_v5/`.
- **Inner (template) workspace:** `project/site-foundry/templates/next-sanity-starter/` — packages are named `@site-foundry-template/*` (ui, sanity-schema, sanity-types, tokens, web, studio, etc.). **This is where all block / primitive / schema / typed-sanity code lives**, and this is where the running web app + studio boot from.

**Rule of thumb for commands:**

| Operation | Run from |
|---|---|
| `pnpm apply`, `pnpm bootstrap-page`, `pnpm verify` | `alpha_v5/` (connector resolves via relative path) |
| `pnpm -F @site-foundry-template/<any> exec tsc --noEmit` | `project/site-foundry/templates/next-sanity-starter/` ✅ |
| `pnpm -F @site-foundry-template/web dev` (web dev server) | `project/site-foundry/templates/next-sanity-starter/` |
| `pnpm -F @site-foundry/connector-sanity <x>` (outer) | `project/site-foundry/` |

If you see `No projects matched the filters in "..."` — you're in the wrong workspace. `cd` into the template workspace (or the outer one if you're touching generator/connector packages).

---

## Check 1 — Env + connector reachability

```bash
cd /home/brock/Design-to-code-chats/alpha_v5
set -a && source /home/brock/Design-to-code-chats/project/site-foundry/.env && set +a

# Verify env vars are populated
echo "PROJECT_ID=$PUBLIC_SANITY_PROJECT_ID"
echo "DATASET=$PUBLIC_SANITY_DATASET"
echo "TOKEN present? ${SANITY_API_WRITE_TOKEN:+yes}"

# Sanity-read an existing page (SignalWire work)
pnpm verify --target signalwire-homepage
```

**Expected:**
- `PROJECT_ID=puqewi35`, `DATASET=site-foundry-dev`, `TOKEN present? yes`.
- `verify` prints the pageBuilder block list (should show multiple blocks from SignalWire runs). No errors.

**If this fails:**
- Check `.env` file exists at `/home/brock/Design-to-code-chats/project/site-foundry/.env`.
- Check `tsx` + `@site-foundry/connector-sanity` resolve from alpha_v5 — `ls node_modules/tsx` and `ls ../project/site-foundry/packages/connector-sanity/src/cli.ts` should both exist.

---

## Check 2 — Site Foundry packages build

**`pnpm -F @site-foundry-template/*` filters ONLY match from the template workspace** — see § "Workspace layout" above.

```bash
# Install from the outer workspace (installs everything):
cd /home/brock/Design-to-code-chats/project/site-foundry
pnpm install

# Typecheck from the TEMPLATE workspace:
cd /home/brock/Design-to-code-chats/project/site-foundry/templates/next-sanity-starter
pnpm -F @site-foundry-template/sanity-schema exec tsc --noEmit
pnpm -F @site-foundry-template/sanity-types exec tsc --noEmit
pnpm -F @site-foundry-template/ui exec tsc --noEmit
```

**Expected:**
- `pnpm install` completes without errors (may take a while on cold cache).
- `sanity-schema` tsc: passes OR prints the known Sanity v3 readonly-array `TS4104` errors (non-blocking — these come from schema option lists typed as `readonly [...]` that Sanity's FieldDefinition expects mutable).
- `sanity-types` tsc: passes clean.
- `ui` tsc: passes with ONLY these known pre-existing errors (fine — they predate this run; line numbers may shift as the file grows):
  - `src/blocks/BlockRenderer.tsx`: `error TS2698: Spread types may only be created from object types.`
  - `src/blocks/RichTextBlock/RichTextBlock.tsx`: `error TS2322` about `TypedObject` / `PortableTextLike`.
  - `src/components/HeadingGroup.tsx`: same `TS2322` pattern.

**If `pnpm -F @site-foundry-template/... No projects matched the filters in "..."`:** you're running from the outer workspace. `cd` into the template workspace (line 2 above) and retry.

**If unfamiliar TS errors appear:** these are likely from schema/block additions not accounted for in the known-errors list above. Fix before Stage 4 apply — a block that won't compile won't render. If they're in `types.ts` or `BlockRenderer.tsx`, you probably forgot to register a new block type in both `BlockMap` (types.ts) and `REGISTRY` (BlockRenderer.tsx).

---

## Check 3 — Dry-run an existing seed

```bash
cd /home/brock/Design-to-code-chats/alpha_v5
# (env already sourced from Check 1; if new shell, re-source)
pnpm apply seeds/hero-split-example.json --dry-run
```

**Expected:**
- Validates the seed, converts image specs / markdown, prints the assembled block object, reports `DRY_RUN=true`. No network writes.

**If this fails:** either the seed's block type doesn't match the current schema (update the seed), or the connector can't find the target page. Fix before going further.

---

## Check 4 — Web app boots + renders an existing block

The dev server runs from the **template workspace** — same place the Check 2 tsc commands ran.

```bash
cd /home/brock/Design-to-code-chats/project/site-foundry/templates/next-sanity-starter
pnpm -F @site-foundry-template/web dev
# Then in a browser: http://localhost:3000/signalwire-homepage
```

If the dev server is already running from a prior session (common in active development), skip the `pnpm dev` line and go straight to the curl/browser check. `curl -sS -o /dev/null -w "HTTP %{http_code}\n" http://localhost:3000/signalwire-homepage` is a cheap probe.

**Expected:**
- Dev server boots on port 3000 without compile errors (Turbopack "Ready" message).
- Visiting `/signalwire-homepage` returns the rendered SignalWire homepage (structure, any number of blocks — the point is *it renders*, not that it's beautiful).
- Check the browser console — no red errors.

**If the app fails to boot:** inspect the error. Common causes — missing env vars in `apps/web/.env.local`, out-of-sync dependencies, post-round-2 block component that imports a non-existent type. Fix before Stage 4.

---

## Check 5 — Bootstrap a disposable target page + clean up

```bash
cd /home/brock/Design-to-code-chats/alpha_v5
pnpm bootstrap-page --id sanity-check-disposable --title "Disposable sanity-check page"
```

**Expected:**
- Prints `Page ready: _id=sanity-check-disposable, _rev=...`.

Then delete manually in Studio (or leave it — it's harmless and will be cleaned up during dataset prunes).

**If this fails:** the write token may be missing or incorrect, or the connector's bootstrap flow has regressed. Fix before Stage 4 of Page 1 (can't apply to a target page that doesn't exist).

---

## Summary — ready to proceed?

| Check | Status |
|---|---|
| 1. Env + connector reachability | ☐ |
| 2. Site Foundry packages build | ☐ |
| 3. Dry-run existing seed | ☐ |
| 4. Web app boots + renders | ☐ |
| 5. Bootstrap a disposable page | ☐ |

All five must pass (or have a documented, understood failure mode) before starting **Stage 1 of Page 1 — Homepage** in the queue file.

If a check fails and the reason is "low-confidence alpha_v4 integration touched something" — fall back to **alpha_v3** or a pre-integration Site Foundry commit. The point of alpha_v5 is that it's a clean working directory; the point of the sanity check is to prove the integration question doesn't affect this experiment.

When all five pass, record the git ref of `project/site-foundry` as the experiment baseline in `library-coverage-ledger.md` § "Baseline".
