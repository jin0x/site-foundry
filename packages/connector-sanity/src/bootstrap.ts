/**
 * Bootstrap a target page document in Sanity for seed apply testing.
 *
 * Creates (or overwrites) a minimal `page` document with a known _id, an
 * empty pageBuilder array, and a matching slug. Safe to run multiple times.
 */

import { createSanityWriteClient, getTargetDataset } from '@site-foundry/sanity-kit';

export interface BootstrapPageOptions {
  id?: string;
  title?: string;
  log?: (msg: string) => void;
}

export interface BootstrapPageResult {
  id: string;
  rev: string;
  dataset: string;
}

export async function bootstrapTargetPage(
  opts: BootstrapPageOptions = {},
): Promise<BootstrapPageResult> {
  const log = opts.log || ((m: string) => console.log(m));
  const id = opts.id || 'staging-homepage';
  const title = opts.title || 'Staging Homepage';

  const client = createSanityWriteClient();
  const dataset = getTargetDataset();

  log(`Bootstrapping page "${id}" in dataset "${dataset}"...`);

  const doc = {
    _id: id,
    _type: 'page',
    title,
    slug: { _type: 'slug', current: id },
    pageBuilder: [],
  };

  const result = await client.createOrReplace(doc);
  log(`Page ready: _id=${result._id}, _rev=${result._rev}`);

  return { id: result._id, rev: result._rev, dataset };
}
