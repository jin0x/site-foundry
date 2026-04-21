/**
 * Sanity safety utilities — client factory, dataset gate, dataset export.
 *
 * Env contract (PUBLIC_SANITY_* namespace, distinct from SANITY_STUDIO_* and
 * NEXT_PUBLIC_SANITY_* used by Studio and Web apps respectively):
 *   PUBLIC_SANITY_PROJECT_ID   (required)
 *   PUBLIC_SANITY_DATASET      (defaults to 'development')
 *   SANITY_API_WRITE_TOKEN     (required for write client)
 */

import { createClient, type SanityClient } from '@sanity/client';
import { createInterface } from 'readline';
import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export function getTargetDataset(): string {
  return process.env.PUBLIC_SANITY_DATASET || 'development';
}

export function isProduction(): boolean {
  return getTargetDataset() === 'production';
}

export interface CreateClientOptions {
  apiVersion?: string;
}

export function createSanityWriteClient(opts: CreateClientOptions = {}): SanityClient {
  const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) {
    throw new Error('PUBLIC_SANITY_PROJECT_ID is required.');
  }

  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) {
    throw new Error('SANITY_API_WRITE_TOKEN is required. Generate one at https://sanity.io/manage');
  }

  return createClient({
    projectId,
    dataset: getTargetDataset(),
    apiVersion: opts.apiVersion || '2025-01-28',
    token,
    useCdn: false,
  });
}

export interface ExportDatasetOptions {
  dataset?: string;
  /** Directory containing the Sanity studio (for `sanity dataset export` to pick up config). */
  studioCwd?: string;
  /** Directory where the `backups/` folder lives. Defaults to process.cwd(). */
  backupsCwd?: string;
}

export function exportDataset(opts: ExportDatasetOptions = {}): string {
  const ds = opts.dataset || getTargetDataset();
  const backupsCwd = opts.backupsCwd || process.cwd();
  const backupsDir = join(backupsCwd, 'backups');

  if (!existsSync(backupsDir)) {
    mkdirSync(backupsDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const filename = `${ds}-${timestamp}.tar.gz`;
  const filepath = join(backupsDir, filename);

  const studioCwd = opts.studioCwd || process.cwd();

  execSync(
    `npx sanity dataset export ${ds} ${filepath}`,
    { cwd: studioCwd, stdio: 'inherit' },
  );
  return filepath;
}

function prompt(question: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

export interface ConfirmOptions {
  operation: string;
  destructive?: boolean;
  skipBackup?: boolean;
  studioCwd?: string;
  backupsCwd?: string;
}

/**
 * Gate for production writes. On non-production datasets, returns true immediately.
 * On production: prompts, optionally takes a backup, and requires explicit confirm
 * for destructive operations.
 */
export async function confirmProductionWrite(opts: ConfirmOptions): Promise<boolean> {
  const dataset = getTargetDataset();

  if (dataset !== 'production') {
    return true;
  }

  const bannerLines = [
    '',
    '===========================================================',
    '                   PRODUCTION DATASET                      ',
    '===========================================================',
    `  Dataset:    ${dataset}`,
    `  Operation:  ${opts.operation}`,
  ];
  if (opts.destructive) {
    bannerLines.push('  WARNING: This operation is DESTRUCTIVE');
  }
  bannerLines.push('===========================================================');
  bannerLines.push('');

  for (const line of bannerLines) console.log(line);

  const answer = await prompt('Type "yes" to continue: ');
  if (answer !== 'yes') {
    return false;
  }

  if (opts.destructive) {
    const confirm = await prompt('Type "production" to confirm destructive operation: ');
    if (confirm !== 'production') {
      return false;
    }
  }

  if (!opts.skipBackup) {
    exportDataset({
      dataset,
      studioCwd: opts.studioCwd,
      backupsCwd: opts.backupsCwd,
    });
  }

  return true;
}
