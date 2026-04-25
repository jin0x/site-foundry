/**
 * applySeedArtifact — apply a seed artifact to a target Sanity page.
 *
 * Given a seed describing a single `block.*` with resolved content, normalizes,
 * validates, uploads images, converts markdown, resolves page references, and
 * upserts the block into the page's `pageBuilder` array.
 *
 * Idempotent: each block's `_key` is derived from the seed's `figmaNodeId`, so
 * re-running the same seed updates the same block.
 */

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { createHash } from 'crypto';
import type { SanityClient } from '@sanity/client';

import type { Applicable, ApplyResult } from '@site-foundry/connector-core';
import type { SeedArtifact } from '@site-foundry/registry-contracts';
import {
  createSanityWriteClient,
  getTargetDataset,
  resolveImageFields,
  resolveNestedImageFields,
  markdownToPortableText,
  wrapPlainStringAsPortableText,
} from '@site-foundry/sanity-kit';

const ALLOWED_BACKGROUND_TONES = new Set(['none', 'subtle', 'accent', 'inverse']);
const ALLOWED_SPACINGS = new Set(['compact', 'default', 'roomy']);
const ALLOWED_CTA_COLORS = new Set(['primary', 'accent', 'light']);
const ALLOWED_CTA_VARIANTS = new Set(['solid', 'outline', 'transparent']);
const ALLOWED_LINK_KINDS = new Set(['page', 'href', 'email', 'file']);

const PAGE_BUILDER_FIELD = 'pageBuilder';

export type ApplySeedResultPayload = {
  page: string;
  blockKey: string;
  blockType: string;
  block: Record<string, unknown>;
};

export type ApplySeedResult = ApplyResult<ApplySeedResultPayload>;

export interface ApplySeedOptions {
  client?: SanityClient;
  seed: SeedArtifact;
  /** Directory the seed was loaded from — used to resolve `file:` markdown references. */
  seedDir?: string;
  /** Override the target page from the seed. */
  target?: string;
  dryRun?: boolean;
  /** Optional logger; defaults to console.log. */
  log?: (msg: string) => void;
}

function stableKey(source: string): string {
  return 'f' + createHash('md5').update(source).digest('hex').slice(0, 11);
}

function ensureArrayKeys(arr: unknown[], figmaNodeId: string, path: string): void {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item && typeof item === 'object' && !Array.isArray(item)) {
      const obj = item as Record<string, unknown>;
      if (!obj._key) {
        obj._key = stableKey(`${figmaNodeId}:${path}:${i}`);
      }
    }
  }
}

function getByPath(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && !Array.isArray(acc)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function setByPath(obj: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split('.');
  let cursor: Record<string, unknown> = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const next = cursor[key];
    if (!next || typeof next !== 'object') {
      cursor[key] = {};
    }
    cursor = cursor[key] as Record<string, unknown>;
  }
  cursor[keys[keys.length - 1]] = value;
}

function validateSeed(seed: SeedArtifact): void {
  if (!seed.blockType?.startsWith('block.')) {
    throw new Error(
      `blockType must be namespaced (e.g. "block.heroSplit"). Got: ${JSON.stringify(seed.blockType)}`,
    );
  }
  if (!seed.figmaNodeId) {
    throw new Error('figmaNodeId is required.');
  }
  if (!seed.targetPage) {
    throw new Error('targetPage is required (or pass --target).');
  }
  if (!seed.fields || typeof seed.fields !== 'object') {
    throw new Error('fields is required and must be an object.');
  }

  const bgTone = seed.fields.backgroundTone;
  if (bgTone !== undefined && !ALLOWED_BACKGROUND_TONES.has(String(bgTone))) {
    throw new Error(
      `backgroundTone must be one of ${[...ALLOWED_BACKGROUND_TONES].join(', ')}. Got: ${String(bgTone)}`,
    );
  }

  const spacing = seed.fields.spacing;
  if (spacing !== undefined && !ALLOWED_SPACINGS.has(String(spacing))) {
    throw new Error(
      `spacing must be one of ${[...ALLOWED_SPACINGS].join(', ')}. Got: ${String(spacing)}`,
    );
  }

  const ctas = seed.fields.ctas;
  if (ctas !== undefined) {
    if (!Array.isArray(ctas)) {
      throw new Error(`fields.ctas must be an array. Got: ${typeof ctas}`);
    }
    ctas.forEach((cta, i) => validateCta(cta, i));
  }
}

function validateCta(cta: unknown, index: number): void {
  if (!cta || typeof cta !== 'object') {
    throw new Error(`ctas[${index}] must be an object.`);
  }
  const c = cta as Record<string, unknown>;
  if (!c.text || typeof c.text !== 'string') {
    throw new Error(`ctas[${index}].text is required.`);
  }
  if (!c.link || typeof c.link !== 'object') {
    throw new Error(`ctas[${index}].link is required.`);
  }
  const link = c.link as Record<string, unknown>;
  if (typeof link.kind !== 'string' || !ALLOWED_LINK_KINDS.has(link.kind)) {
    throw new Error(
      `ctas[${index}].link.kind must be one of ${[...ALLOWED_LINK_KINDS].join(', ')}. Got: ${String(link.kind)}`,
    );
  }
  if (c.color !== undefined && !ALLOWED_CTA_COLORS.has(String(c.color))) {
    throw new Error(
      `ctas[${index}].color must be one of ${[...ALLOWED_CTA_COLORS].join(', ')}. Got: ${String(c.color)}`,
    );
  }
  if (c.variant !== undefined && !ALLOWED_CTA_VARIANTS.has(String(c.variant))) {
    throw new Error(
      `ctas[${index}].variant must be one of ${[...ALLOWED_CTA_VARIANTS].join(', ')}. Got: ${String(c.variant)}`,
    );
  }
}

async function resolveRichTextPaths(
  seed: SeedArtifact,
  seedDir: string,
  log: (msg: string) => void,
): Promise<void> {
  if (!seed.richText || seed.richText.length === 0) return;

  for (const path of seed.richText) {
    const value = getByPath(seed.fields, path);
    if (typeof value !== 'string') {
      throw new Error(`Rich text field "${path}" is not a string.`);
    }

    let markdown: string;
    if (value.startsWith('file:')) {
      const mdPath = resolve(seedDir, value.slice(5));
      if (!existsSync(mdPath)) {
        throw new Error(`Rich text file not found: ${mdPath}`);
      }
      markdown = readFileSync(mdPath, 'utf-8');
      log(`Rich text "${path}": loaded ${mdPath}`);
    } else {
      markdown = value;
    }

    const pt = markdownToPortableText(markdown);
    setByPath(seed.fields, path, pt);
  }
}

function autoWrapSectionHeadingSubheading(fields: Record<string, unknown>): void {
  const sh = fields.sectionHeading;
  if (!sh || typeof sh !== 'object') return;
  const heading = sh as Record<string, unknown>;
  if (typeof heading.subheading === 'string') {
    heading.subheading = wrapPlainStringAsPortableText(heading.subheading, 'sh');
  }
}

async function resolveCtaPageRefs(
  client: SanityClient,
  fields: Record<string, unknown>,
): Promise<void> {
  const ctas = fields.ctas;
  if (!Array.isArray(ctas)) return;

  for (let i = 0; i < ctas.length; i++) {
    const cta = ctas[i] as Record<string, unknown>;
    if (!cta.link || typeof cta.link !== 'object') continue;
    const link = cta.link as Record<string, unknown>;
    if (link.kind !== 'page') continue;

    const page = link.page;
    if (!page) continue;

    if (typeof page === 'string') {
      const id = await client.fetch<string | null>(
        `*[_type=="page" && slug.current==$slug][0]._id`,
        { slug: page },
      );
      if (!id) {
        throw new Error(
          `ctas[${i}].link.page: could not resolve slug "${page}" to a page _id in dataset "${getTargetDataset()}".`,
        );
      }
      link.page = { _type: 'reference', _ref: id };
    }
  }
}

function mockImageFields(fields: Record<string, unknown>, imageFields: string[]): void {
  for (const fieldName of imageFields) {
    const value = fields[fieldName];
    if (!value || typeof value !== 'object') continue;
    const spec = value as Record<string, unknown>;
    if (typeof spec.url !== 'string') continue;
    if (typeof spec.alt !== 'string' || !spec.alt.trim()) {
      throw new Error(`Image field "${fieldName}" is missing required alt text.`);
    }
    fields[fieldName] = {
      _type: 'imageWithAlt',
      asset: { _type: 'reference', _ref: '<DRY-RUN-UNRESOLVED>' },
      alt: spec.alt,
      ...(typeof spec.caption === 'string' && spec.caption.trim() ? { caption: spec.caption } : {}),
    };
  }
}

function mockNestedImageFields(items: Record<string, unknown>[], imageFields: string[]): void {
  for (let i = 0; i < items.length; i++) {
    for (const fieldName of imageFields) {
      const value = items[i][fieldName];
      if (!value || typeof value !== 'object') continue;
      const spec = value as Record<string, unknown>;
      if (typeof spec.url !== 'string') continue;
      if (typeof spec.alt !== 'string' || !spec.alt.trim()) {
        throw new Error(`Image field "${fieldName}" in item ${i} is missing required alt text.`);
      }
      items[i][fieldName] = {
        _type: 'imageWithAlt',
        asset: { _type: 'reference', _ref: '<DRY-RUN-UNRESOLVED>' },
        alt: spec.alt,
        ...(typeof spec.caption === 'string' && spec.caption.trim() ? { caption: spec.caption } : {}),
      };
    }
  }
}

function normalizeCtas(fields: Record<string, unknown>): void {
  const ctas = fields.ctas;
  if (!Array.isArray(ctas)) return;

  for (const cta of ctas as Record<string, unknown>[]) {
    if (!cta._type) cta._type = 'cta';
    if (cta.enabled === undefined) cta.enabled = true;
    if (cta.color === undefined) cta.color = 'primary';
    if (cta.variant === undefined) cta.variant = 'solid';

    const link = cta.link as Record<string, unknown> | undefined;
    if (link && link.openInNewTab === undefined) {
      link.openInNewTab = false;
    }
  }
}

export async function applySeedArtifact(opts: ApplySeedOptions): Promise<ApplySeedResult> {
  const log = opts.log || ((m: string) => console.log(m));
  const seed = opts.seed;
  const seedDir = opts.seedDir || process.cwd();

  validateSeed(seed);

  const client = opts.client || createSanityWriteClient();
  const targetPage = opts.target || seed.targetPage;

  log(`Applying ${seed.blockType} (node ${seed.figmaNodeId}) → ${targetPage}`);

  await resolveRichTextPaths(seed, seedDir, log);
  autoWrapSectionHeadingSubheading(seed.fields);

  const imageResolveOptions = { figmaFileKey: seed.figmaFileKey };
  if (seed.images?.topLevel?.length) {
    if (opts.dryRun) {
      mockImageFields(seed.fields, seed.images.topLevel);
    } else {
      await resolveImageFields(client, seed.fields, seed.images.topLevel, imageResolveOptions);
    }
  }
  if (seed.images?.nested) {
    for (const nested of seed.images.nested) {
      const arr = seed.fields[nested.arrayField];
      if (Array.isArray(arr)) {
        if (opts.dryRun) {
          mockNestedImageFields(arr as Record<string, unknown>[], nested.imageFields);
        } else {
          await resolveNestedImageFields(
            client,
            arr as Record<string, unknown>[],
            nested.imageFields,
            imageResolveOptions,
          );
        }
      }
    }
  }

  normalizeCtas(seed.fields);
  if (!opts.dryRun) {
    await resolveCtaPageRefs(client, seed.fields);
  }

  const blockKey = stableKey(seed.figmaNodeId);
  const block: Record<string, unknown> = {
    _key: blockKey,
    _type: seed.blockType,
    ...seed.fields,
  };

  for (const [fieldName, value] of Object.entries(block)) {
    if (Array.isArray(value)) {
      ensureArrayKeys(value, seed.figmaNodeId, fieldName);
    }
  }

  if (opts.dryRun) {
    return {
      status: 'dry-run',
      mode: 'insert',
      page: targetPage,
      blockKey,
      blockType: seed.blockType,
      block,
    };
  }

  const pageExists = await client.fetch<number>(
    `count(*[_id == $id || _id == "drafts." + $id])`,
    { id: targetPage },
  );
  if (pageExists === 0) {
    throw new Error(`Target page "${targetPage}" not found in dataset "${getTargetDataset()}".`);
  }

  const existingKey = await client.fetch<string | null>(
    `*[_id == $id || _id == "drafts." + $id][0].${PAGE_BUILDER_FIELD}[_key == $key][0]._key`,
    { id: targetPage, key: blockKey },
  );

  if (existingKey) {
    log(`Updating existing block (key: ${blockKey})`);
    /* S1: in-place replace at the existing key's array index. The prior
     * implementation did `unset` then `append`, which moved the block to the
     * end of `pageBuilder[]` on every re-apply — progressively scrambling
     * page order across iterative seed applies. `insert('replace', ...)` is
     * Sanity's canonical pattern for replacing an array item at a path, and
     * it preserves the item's existing index. */
    await client
      .patch(targetPage)
      .insert('replace', `${PAGE_BUILDER_FIELD}[_key=="${blockKey}"]`, [block])
      .commit();

    return {
      status: 'applied',
      mode: 'update',
      page: targetPage,
      blockKey,
      blockType: seed.blockType,
      block,
    };
  }

  log(`Appending new block (key: ${blockKey})`);
  await client
    .patch(targetPage)
    .setIfMissing({ [PAGE_BUILDER_FIELD]: [] })
    .append(PAGE_BUILDER_FIELD, [block])
    .commit();

  return {
    status: 'applied',
    mode: 'insert',
    page: targetPage,
    blockKey,
    blockType: seed.blockType,
    block,
  };
}

/**
 * `Applicable<SeedArtifact, ApplySeedResultPayload>` — the orchestrator-facing
 * entry point. Constructs a default client from env and calls the internal
 * `applySeedArtifact` function. CLIs and tests should prefer `applySeedArtifact`
 * directly when they need to pass a pre-built client or resolve `file:` paths.
 */
export const sanityApplyConnector: Applicable<SeedArtifact, ApplySeedResultPayload> = {
  async apply(seed, context) {
    return applySeedArtifact({
      seed,
      dryRun: context?.dryRun,
      log: context?.log,
    });
  },
};
