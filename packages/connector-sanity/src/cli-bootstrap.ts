#!/usr/bin/env tsx
/**
 * Bootstrap a target page document for seed apply testing.
 *
 * Usage:
 *   tsx cli-bootstrap.ts [--id <id>] [--title <title>]
 *
 * Defaults: id="staging-homepage", title="Staging Homepage"
 */

import { bootstrapTargetPage } from './bootstrap.js';

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const idIdx = args.indexOf('--id');
  const id = idIdx >= 0 ? args[idIdx + 1] : undefined;
  const titleIdx = args.indexOf('--title');
  const title = titleIdx >= 0 ? args[titleIdx + 1] : undefined;

  const result = await bootstrapTargetPage({ id, title });
  console.log(`Apply seeds with targetPage="${result.id}" (or --target ${result.id}).`);
}

main().catch((err) => {
  console.error('Bootstrap failed:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});
