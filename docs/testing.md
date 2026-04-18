# Testing

The current testing posture is intentionally small. The goal is to confirm that the workspace loads, the contracts typecheck, and the first operator surface returns a plan.

## 1. Workspace typecheck

```bash
corepack pnpm typecheck
```

Expected result: the Turbo workspace completes successfully.

## 2. Registry smoke test

```bash
corepack pnpm smoke:registry
```

Expected result:

```text
No registry items have been installed yet.
```

This confirms the CLI entrypoint is reachable.

## 3. Generation smoke test

```bash
corepack pnpm smoke:generate
```

Expected result: a JSON payload with:

- a generated `run`
- a generated `plan`
- `next-sanity` artifact paths under `templates/next-sanity-starter`

## 4. Operator API boot

```bash
corepack pnpm dev:api
```

Expected result:

```text
Site Foundry operator API listening on http://localhost:4010
```

Stop it with `Ctrl+C` when finished.

Health check:

```bash
curl http://localhost:4010/health
```

Expected result:

```json
{"ok":true,"service":"operator-api"}
```

Notes:

- `http://localhost:4010/` returning `404` is expected
- `POST /runs` currently returns a placeholder run record
- executable HTTP requests are in `apps/operator-api/testing.http`

## Not covered yet

- real Figma ingestion
- real schema/code writes
- persistent registry storage
- starter runtime verification
- integration tests
