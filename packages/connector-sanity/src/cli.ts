#!/usr/bin/env tsx
/**
 * Apply a seed JSON file to a target Sanity page.
 *
 * Usage:
 *   tsx cli.ts <seed-file.json> [--target <page-id>] [--dry-run]
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import type { SeedArtifact } from '@site-foundry/registry-contracts';
import { applySeedArtifact } from './apply.js';
import { verifyPageState } from './verify.js';

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const verify = args.includes('--verify');
  const targetIdx = args.indexOf('--target');
  const target = targetIdx >= 0 ? args[targetIdx + 1] : undefined;
  const seedPath = args.find(
    (a, i) => !a.startsWith('--') && args[i - 1] !== '--target',
  );

  if (verify && !seedPath) {
    const result = await verifyPageState(target || 'staging-homepage');
    if (!result) {
      console.log(`No page found.`);
      return;
    }
    console.log(`Page ${result.id} — ${result.blocks.length} block(s):`);
    for (const b of result.blocks) console.log(`  ${b.type}  (${b.key})`);
    return;
  }

  if (!seedPath) {
    console.error('Usage: tsx cli.ts <seed-file.json> [--target <page-id>] [--dry-run]');
    console.error('       tsx cli.ts --verify [--target <page-id>]');
    process.exit(1);
  }

  const resolvedPath = resolve(seedPath);
  if (!existsSync(resolvedPath)) {
    console.error(`Seed file not found: ${resolvedPath}`);
    process.exit(1);
  }

  const seed: SeedArtifact = JSON.parse(readFileSync(resolvedPath, 'utf-8'));

  try {
    const result = await applySeedArtifact({
      seed,
      seedDir: dirname(resolvedPath),
      target,
      dryRun,
    });

    console.log('');
    console.log(`Result: ${result.status} (${result.mode})`);
    console.log(`  page:       ${result.page}`);
    console.log(`  blockKey:   ${result.blockKey}`);
    console.log(`  blockType:  ${result.blockType}`);
    if (dryRun) {
      console.log('');
      console.log('Block data:');
      console.log(JSON.stringify(result.block, null, 2));
    }
  } catch (err) {
    console.error('');
    console.error('Apply failed:', err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
