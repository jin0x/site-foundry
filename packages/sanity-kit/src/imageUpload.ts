/**
 * Image upload utility — downloads images from URLs and uploads to Sanity.
 *
 * Sources:
 *  - Any direct URL (Figma MCP asset URLs, external URLs) — via `ImageSpecUrl`
 *  - Figma node via the Figma REST API — via `ImageSpecFigma` (requires FIGMA_API_TOKEN)
 *
 * Features:
 *  - Uploads via `client.assets.upload('image', ...)`
 *  - Content-hash cache to avoid re-uploading identical images
 *  - SVG normalization — strips `width/height="100%"`, `preserveAspectRatio="none"`,
 *    and pads viewBox to square so Sanity records accurate dimensions and the asset
 *    renders correctly in fixed-size containers (see note below)
 *  - Returns an `imageWithAlt` shape (alt required by schema)
 *
 * Cache file: `.cache/asset-map.json` in the process cwd.
 *
 * SVG normalization note: Figma MCP serves SVGs with no intrinsic size
 * (`width/height="100%"`) and `preserveAspectRatio="none"`, which causes icons to
 * stretch-fill any container and makes Sanity record the glyph's tight bounding box
 * as the asset's dimensions. The normalizer pads the viewBox to a square (max of w/h)
 * and sets numeric width/height matching the square's side — icons in a grid then
 * render at consistent size with their natural aspect preserved.
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
  let buffer: Buffer = Buffer.from(arrayBuffer);

  if (contentType.startsWith('image/svg')) {
    buffer = normalizeSvg(buffer);
  }

  return { buffer, contentType };
}

/**
 * Threshold (in viewBox units) below which an SVG is treated as icon-sized
 * and padded to a square. Above this threshold — media-sized SVGs like
 * screenshots, diagrams, or code-editor exports — the natural aspect is
 * preserved so a 1044×558 node doesn't become a 1044×1044 square with empty
 * vertical space.
 */
const ICON_PAD_MAX_DIM = 100;

/**
 * Normalize an SVG so Sanity records correct dimensions and downstream renders
 * don't stretch-fill their container. Always strips the Figma-MCP-served
 * attributes that break grids (`width/height="100%"`, `preserveAspectRatio="none"`,
 * `style`, `overflow`) and sets numeric width/height matching the viewBox.
 *
 * For icon-sized SVGs (both viewBox dims ≤ ICON_PAD_MAX_DIM), the viewBox is
 * also padded to a square so a grid of icons renders at consistent visual weight.
 * Larger SVGs keep their natural aspect ratio.
 *
 * Returns the original buffer unchanged if the SVG lacks a parseable viewBox.
 */
export function normalizeSvg(buffer: Buffer): Buffer {
  const text = buffer.toString('utf-8');
  const svgTagMatch = text.match(/<svg\s+([^>]*)>/i);
  if (!svgTagMatch) return buffer;

  const originalTag = svgTagMatch[0];
  let attrs = svgTagMatch[1];

  const viewBoxMatch = attrs.match(/viewBox\s*=\s*"([^"]+)"/i);
  if (!viewBoxMatch) return buffer;

  const parts = viewBoxMatch[1].trim().split(/\s+/).map(Number);
  if (parts.length !== 4 || parts.some((n) => !Number.isFinite(n))) return buffer;

  const [vbMinX, vbMinY, vbWidth, vbHeight] = parts;
  if (vbWidth <= 0 || vbHeight <= 0) return buffer;

  const shouldPadToSquare = vbWidth <= ICON_PAD_MAX_DIM && vbHeight <= ICON_PAD_MAX_DIM;
  const targetWidth = shouldPadToSquare ? Math.max(vbWidth, vbHeight) : vbWidth;
  const targetHeight = shouldPadToSquare ? Math.max(vbWidth, vbHeight) : vbHeight;
  const dx = (targetWidth - vbWidth) / 2;
  const dy = (targetHeight - vbHeight) / 2;
  const newViewBox = `${vbMinX - dx} ${vbMinY - dy} ${targetWidth} ${targetHeight}`;

  attrs = attrs
    .replace(/\s*width\s*=\s*"[^"]*"/gi, '')
    .replace(/\s*height\s*=\s*"[^"]*"/gi, '')
    .replace(/\s*preserveAspectRatio\s*=\s*"[^"]*"/gi, '')
    .replace(/\s*style\s*=\s*"[^"]*"/gi, '')
    .replace(/\s*overflow\s*=\s*"[^"]*"/gi, '')
    .replace(/\s*viewBox\s*=\s*"[^"]*"/gi, '')
    .trim();

  const newRootTag = `<svg ${attrs} viewBox="${newViewBox}" width="${targetWidth}" height="${targetHeight}">`;
  return Buffer.from(text.replace(originalTag, newRootTag), 'utf-8');
}

/**
 * Fetch an image URL from the Figma REST API for a given file + node.
 * The API returns a short-lived S3 URL which the caller then downloads.
 *
 * Requires `FIGMA_API_TOKEN` in the environment. Exports the node at its
 * layout bounds — so a 24×24 icon frame exports as 24×24, a composed-graphic
 * frame exports at its full dimensions (the fix for pipeline gap 1 / T4.2).
 */
export async function fetchFromFigmaApi(params: {
  fileKey: string;
  nodeId: string;
  format?: 'svg' | 'png' | 'jpg';
  scale?: number;
}): Promise<string> {
  const token = process.env.FIGMA_API_TOKEN;
  if (!token) {
    throw new Error(
      'FIGMA_API_TOKEN is not set. Add it to .env to fetch images via the Figma REST API.',
    );
  }

  const format = params.format ?? 'svg';
  const query = new URLSearchParams({ ids: params.nodeId, format });
  if (format !== 'svg' && params.scale) {
    query.set('scale', String(params.scale));
  }

  const url = `https://api.figma.com/v1/images/${params.fileKey}?${query.toString()}`;
  const response = await fetch(url, { headers: { 'X-Figma-Token': token } });
  if (!response.ok) {
    throw new Error(
      `Figma API error ${response.status} ${response.statusText} fetching ${params.nodeId} in ${params.fileKey}`,
    );
  }

  const body = (await response.json()) as { err?: string | null; images?: Record<string, string | null> };
  if (body.err) {
    throw new Error(`Figma API returned error: ${body.err}`);
  }

  const imageUrl = body.images?.[params.nodeId];
  if (!imageUrl) {
    throw new Error(
      `Figma API returned no image URL for node ${params.nodeId} in file ${params.fileKey}`,
    );
  }

  return imageUrl;
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

/** URL-based image spec — direct download. */
interface ImageSpecUrl {
  url: string;
  alt: string;
  caption?: string;
}

/** Figma-node-based image spec — resolved via the Figma REST API. */
interface ImageSpecFigma {
  figmaNodeId: string;
  /** Optional per-image override; falls back to the seed envelope's figmaFileKey. */
  figmaFileKey?: string;
  /** Default 'svg'. */
  figmaFormat?: 'svg' | 'png' | 'jpg';
  /** Raster scale (png/jpg only). */
  figmaScale?: number;
  alt: string;
  caption?: string;
}

type ImageSpec = ImageSpecUrl | ImageSpecFigma;

function isImageSpecUrl(value: unknown): value is ImageSpecUrl {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return typeof v.url === 'string';
}

function isImageSpecFigma(value: unknown): value is ImageSpecFigma {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return typeof v.figmaNodeId === 'string';
}

function isImageSpec(value: unknown): value is ImageSpec {
  return isImageSpecUrl(value) || isImageSpecFigma(value);
}

export interface ResolveImageOptions {
  /** Seed-envelope-level Figma fileKey, used when an ImageSpecFigma omits its own. */
  figmaFileKey?: string;
}

async function resolveSpecToUrl(spec: ImageSpec, opts: ResolveImageOptions): Promise<string> {
  if (isImageSpecUrl(spec)) return spec.url;

  const fileKey = spec.figmaFileKey ?? opts.figmaFileKey;
  if (!fileKey) {
    throw new Error(
      `ImageSpecFigma for node ${spec.figmaNodeId} needs a figmaFileKey — set it on the spec or on the seed envelope.`,
    );
  }

  return fetchFromFigmaApi({
    fileKey,
    nodeId: spec.figmaNodeId,
    format: spec.figmaFormat,
    scale: spec.figmaScale,
  });
}

/**
 * Process top-level image fields on a fields object.
 * Every declared field must carry a source (`url` or `figmaNodeId`) and `alt` — missing alt throws.
 */
export async function resolveImageFields(
  client: SanityClient,
  fields: Record<string, unknown>,
  imageFields: string[],
  options: ResolveImageOptions = {},
): Promise<Record<string, unknown>> {
  for (const fieldName of imageFields) {
    const value = fields[fieldName];
    if (!isImageSpec(value)) continue;

    if (typeof value.alt !== 'string' || !value.alt.trim()) {
      throw new Error(`Image field "${fieldName}" is missing required alt text.`);
    }

    const url = await resolveSpecToUrl(value, options);
    fields[fieldName] = await uploadImage(client, {
      url,
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
  options: ResolveImageOptions = {},
): Promise<Record<string, unknown>[]> {
  for (let i = 0; i < items.length; i++) {
    for (const fieldName of imageFields) {
      const value = items[i][fieldName];
      if (!isImageSpec(value)) continue;

      if (typeof value.alt !== 'string' || !value.alt.trim()) {
        throw new Error(`Image field "${fieldName}" in item ${i} is missing required alt text.`);
      }

      const url = await resolveSpecToUrl(value, options);
      items[i][fieldName] = await uploadImage(client, {
        url,
        alt: value.alt,
        caption: value.caption,
        filename: `${fieldName}-${i}`,
      });
    }
  }

  return items;
}
