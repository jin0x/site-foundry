import type { CodeSampleBlock as CodeSampleBlockProps } from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';
import { Text } from '../../primitives/Text';
import { TextColor, TextSize } from '../../primitives/Text/text-types';

/**
 * Inner render — omits the BaseBlock section shell so this can be composed
 * inside other blocks (e.g. a tabbedFeatures tab pane) without double-wrapping.
 * Structured render only (window chrome + `<pre><code>`) — syntax highlighting
 * deferred to a later ship (T5.x polish).
 */
export function CodeSampleBlockContent(props: CodeSampleBlockProps) {
  if (!props.code) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl border border-[var(--color-code-border)] overflow-hidden bg-[var(--color-surface-elevated)]">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-code-border)] bg-[var(--color-surface-raised)]">
          <span className="size-3 rounded-full bg-[#ff5f57]" aria-hidden />
          <span className="size-3 rounded-full bg-[#febc2e]" aria-hidden />
          <span className="size-3 rounded-full bg-[#28c840]" aria-hidden />
          {props.filename ? (
            <span className="ml-3 font-mono text-xs text-[var(--color-tertiary)] truncate">
              {props.filename}
            </span>
          ) : null}
        </div>
        <pre className="p-5 overflow-x-auto text-sm font-mono text-[var(--color-primary)] leading-relaxed">
          <code>{props.code}</code>
        </pre>
      </div>
      {props.caption ? (
        <Text size={TextSize.SM} color={TextColor.MUTED} className="text-center">
          {props.caption}
        </Text>
      ) : null}
    </div>
  );
}

export function CodeSampleBlock(props: CodeSampleBlockProps) {
  return (
    <BaseBlock block={props}>
      <CodeSampleBlockContent {...props} />
    </BaseBlock>
  );
}
