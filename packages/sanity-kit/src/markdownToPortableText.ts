/**
 * Markdown → Sanity Portable Text converter.
 *
 * Handles the subset of markdown that maps to Sanity's blockContent schema:
 *   Block-level: headings (h1–h4), paragraphs, bullet lists, numbered lists,
 *                blockquotes — including nested list levels.
 *   Inline:      **bold**, *italic*, `code`, ~~strikethrough~~, [links](url)
 *
 * Limitations:
 *   - Nested inline marks (e.g. **bold with *italic* inside**) are not supported.
 *     Each mark must be on its own segment.
 *   - No support for images, code blocks, tables, or other custom PT types.
 */

export interface PTSpan {
  _type: 'span';
  _key: string;
  text: string;
  marks: string[];
}

export interface PTMarkDef {
  _type: string;
  _key: string;
  href?: string;
  blank?: boolean;
}

export interface PTBlock {
  _type: 'block';
  _key: string;
  style: string;
  markDefs: PTMarkDef[];
  children: PTSpan[];
  listItem?: string;
  level?: number;
}

function parseInline(
  text: string,
  blockIndex: number,
): { children: PTSpan[]; markDefs: PTMarkDef[] } {
  const children: PTSpan[] = [];
  const markDefs: PTMarkDef[] = [];
  let spanIndex = 0;
  let linkIndex = 0;

  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|~~(.+?)~~/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const plain = text.slice(lastIndex, match.index);
      if (plain) {
        children.push({
          _type: 'span',
          _key: `b${blockIndex}s${spanIndex++}`,
          text: plain,
          marks: [],
        });
      }
    }

    if (match[1] !== undefined && match[2] !== undefined) {
      const linkKey = `b${blockIndex}l${linkIndex++}`;
      const href = match[2];
      markDefs.push({
        _type: 'link',
        _key: linkKey,
        href,
        blank: !href.startsWith('mailto:') && !href.startsWith('tel:'),
      });
      children.push({
        _type: 'span',
        _key: `b${blockIndex}s${spanIndex++}`,
        text: match[1],
        marks: [linkKey],
      });
    } else if (match[3] !== undefined) {
      children.push({
        _type: 'span',
        _key: `b${blockIndex}s${spanIndex++}`,
        text: match[3],
        marks: ['strong'],
      });
    } else if (match[4] !== undefined) {
      children.push({
        _type: 'span',
        _key: `b${blockIndex}s${spanIndex++}`,
        text: match[4],
        marks: ['em'],
      });
    } else if (match[5] !== undefined) {
      children.push({
        _type: 'span',
        _key: `b${blockIndex}s${spanIndex++}`,
        text: match[5],
        marks: ['code'],
      });
    } else if (match[6] !== undefined) {
      children.push({
        _type: 'span',
        _key: `b${blockIndex}s${spanIndex++}`,
        text: match[6],
        marks: ['strike-through'],
      });
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    children.push({
      _type: 'span',
      _key: `b${blockIndex}s${spanIndex++}`,
      text: text.slice(lastIndex),
      marks: [],
    });
  }

  if (children.length === 0) {
    children.push({
      _type: 'span',
      _key: `b${blockIndex}s0`,
      text: '',
      marks: [],
    });
  }

  return { children, markDefs };
}

export function markdownToPortableText(markdown: string): PTBlock[] {
  const lines = markdown.split('\n');
  const blocks: PTBlock[] = [];
  let blockIndex = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trimEnd();

    if (trimmed.trim() === '') {
      i++;
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,4})\s+(.*)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const { children, markDefs } = parseInline(headingMatch[2], blockIndex);
      blocks.push({
        _type: 'block',
        _key: `b${blockIndex}`,
        style: `h${level}`,
        markDefs,
        children,
      });
      blockIndex++;
      i++;
      continue;
    }

    const quoteMatch = trimmed.match(/^>\s?(.*)/);
    if (quoteMatch) {
      const { children, markDefs } = parseInline(quoteMatch[1], blockIndex);
      blocks.push({
        _type: 'block',
        _key: `b${blockIndex}`,
        style: 'blockquote',
        markDefs,
        children,
      });
      blockIndex++;
      i++;
      continue;
    }

    const bulletMatch = line.match(/^(\s*)[-*]\s+(.*)/);
    if (bulletMatch) {
      const indent = bulletMatch[1].length;
      const level = Math.floor(indent / 2) + 1;
      const { children, markDefs } = parseInline(bulletMatch[2], blockIndex);
      blocks.push({
        _type: 'block',
        _key: `b${blockIndex}`,
        style: 'normal',
        listItem: 'bullet',
        level,
        markDefs,
        children,
      });
      blockIndex++;
      i++;
      continue;
    }

    const numberMatch = line.match(/^(\s*)\d+\.\s+(.*)/);
    if (numberMatch) {
      const indent = numberMatch[1].length;
      const level = Math.floor(indent / 2) + 1;
      const { children, markDefs } = parseInline(numberMatch[2], blockIndex);
      blocks.push({
        _type: 'block',
        _key: `b${blockIndex}`,
        style: 'normal',
        listItem: 'number',
        level,
        markDefs,
        children,
      });
      blockIndex++;
      i++;
      continue;
    }

    const { children, markDefs } = parseInline(trimmed, blockIndex);
    blocks.push({
      _type: 'block',
      _key: `b${blockIndex}`,
      style: 'normal',
      markDefs,
      children,
    });
    blockIndex++;
    i++;
  }

  return blocks;
}

export function wrapPlainStringAsPortableText(text: string, keyPrefix = 'p'): PTBlock[] {
  if (!text || !text.trim()) return [];
  return [
    {
      _type: 'block',
      _key: `${keyPrefix}0`,
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: `${keyPrefix}0s0`,
          text,
          marks: [],
        },
      ],
    },
  ];
}
