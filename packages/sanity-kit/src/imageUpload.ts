/**
 * Image upload utility — downloads images from URLs and uploads to Sanity.
 *
 * Features:
 *  - Downloads from any URL (Figma MCP asset URLs, external URLs)
 *  - Uploads via `client.assets.upload('image', ...)`
 *  - Content-hash cache to avoid re-uploading identical images
 *  - Returns an `imageWithAlt` shape (alt required by schema)
 *
 * Cache file: `.cache/asset-map.json` in the process cwd.
 */

import { createHash } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { SanityClient } from '@sanity/client';

export interface SanityImageWithAlt {
  _type: 'imageWithAlt';
  asset: {
    _type: 'reference';
    _ref: string;
  };
  alt: string;
  caption?: string;
}

interface AssetCacheEntry {
  sanityId: string;
  contentHash: string;
  uploadedAt: string;
  sourceUrl: string;
}

type AssetCache = Record<string, AssetCacheEntry>;

const CACHE_DIR = join(process.cwd(), '.cache');
const CACHE_FILE = join(CACHE_DIR, 'asset-map.json');

function loadCache(): AssetCache {
  if (!existsSync(CACHE_FILE)) return {};
  try {
    return JSON.parse(readFileSync(CACHE_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function saveCache(cache: AssetCache): void {
  if (!existsSync(CACHE_DIR)) {
    mkdirSync(CACHE_DIR, { recursive: true });
  }
  writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

async function downloadImage(url: string): Promise<{ buffer: Buffer; contentType: string }> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status} ${response.statusText} — ${url}`);
  }

  const contentType = response.headers.get('content-type') || 'image/png';
  const arrayBuffer = await response.arrayBuffer();
  return { buffer: Buffer.from(arrayBuffer), contentType };
}

function contentHash(buffer: Buffer): string {
  return createHash('sha256').update(buffer).digest('hex');
}

function extensionFromContentType(contentType: string): string {
  const map: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/gif': 'gif',
    'image/svg+xml': 'svg',
    'image/webp': 'webp',
    'image/avif': 'avif',
  };
  return map[contentType] || 'png';
}

export interface UploadImageOptions {
  url: string;
  alt: string;
  caption?: string;
  filename?: string;
}

/**
 * Download an image from a URL, upload it to Sanity, and return an
 * `imageWithAlt` value ready for use in a document.
 *
 * Uses a content-hash cache to skip re-uploads of identical images.
 */
export async function uploadImage(
  client: SanityClient,
  opts: UploadImageOptions,
): Promise<SanityImageWithAlt> {
  if (!opts.alt || !opts.alt.trim()) {
    throw new Error(`imageWithAlt requires a non-empty alt. URL: ${opts.url}`);
  }

  const { buffer, contentType } = await downloadImage(opts.url);
  const hash = contentHash(buffer);

  const cache = loadCache();
  if (cache[hash]) {
    return buildImageWithAlt(cache[hash].sanityId, opts);
  }

  const ext = extensionFromContentType(contentType);
  const uploadFilename = opts.filename ? `${opts.filename}.${ext}` : `upload-${hash.slice(0, 12)}.${ext}`;

  const asset = await client.assets.upload('image', buffer, {
    filename: uploadFilename,
    contentType,
  });

  cache[hash] = {
    sanityId: asset._id,
    contentHash: hash,
    uploadedAt: new Date().toISOString(),
    sourceUrl: opts.url,
  };
  saveCache(cache);

  return buildImageWithAlt(asset._id, opts);
}

function buildImageWithAlt(sanityId: string, opts: UploadImageOptions): SanityImageWithAlt {
  const value: SanityImageWithAlt = {
    _type: 'imageWithAlt',
    asset: { _type: 'reference', _ref: sanityId },
    alt: opts.alt,
  };
  if (opts.caption && opts.caption.trim()) {
    value.caption = opts.caption;
  }
  return value;
}

interface ImageSpec {
  url: string;
  alt: string;
  caption?: string;
}

function isImageSpec(value: unknown): value is ImageSpec {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return typeof v.url === 'string';
}

/**
 * Process top-level image fields on a fields object.
 * Every declared field must carry both `url` and `alt` — missing alt throws.
 */
export async function resolveImageFields(
  client: SanityClient,
  fields: Record<string, unknown>,
  imageFields: string[],
): Promise<Record<string, unknown>> {
  for (const fieldName of imageFields) {
    const value = fields[fieldName];
    if (!isImageSpec(value)) continue;

    if (typeof value.alt !== 'string' || !value.alt.trim()) {
      throw new Error(`Image field "${fieldName}" is missing required alt text.`);
    }

    fields[fieldName] = await uploadImage(client, {
      url: value.url,
      alt: value.alt,
      caption: value.caption,
      filename: fieldName,
    });
  }

  return fields;
}

/**
 * Process images nested inside an array of items (e.g. a featureGrid item with an icon).
 */
export async function resolveNestedImageFields(
  client: SanityClient,
  items: Record<string, unknown>[],
  imageFields: string[],
): Promise<Record<string, unknown>[]> {
  for (let i = 0; i < items.length; i++) {
    for (const fieldName of imageFields) {
      const value = items[i][fieldName];
      if (!isImageSpec(value)) continue;

      if (typeof value.alt !== 'string' || !value.alt.trim()) {
        throw new Error(`Image field "${fieldName}" in item ${i} is missing required alt text.`);
      }

      items[i][fieldName] = await uploadImage(client, {
        url: value.url,
        alt: value.alt,
        caption: value.caption,
        filename: `${fieldName}-${i}`,
      });
    }
  }

  return items;
}
