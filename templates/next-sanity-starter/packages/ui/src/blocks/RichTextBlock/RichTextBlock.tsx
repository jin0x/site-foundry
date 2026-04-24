import { PortableText } from '@portabletext/react';
import type { RichTextBlock as RichTextBlockProps } from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';

/**
 * Long-form editorial content (privacy policy, docs, articles). Body is
 * always left-aligned within the max-width column — `sectionHeading.align`
 * controls the heading only, not the prose body. If a design needs
 * per-paragraph alignment inside the rich text, extend the `blockContent`
 * schema with a block-level `textAlign` property and pass custom
 * PortableText components. For callout-intent (centered heading + body +
 * CTA), use `block.callout` instead.
 */
export function RichTextBlock(props: RichTextBlockProps) {
  return (
    <BaseBlock block={props}>
      <div className="max-w-[44rem] space-y-4 text-[var(--color-secondary)] leading-[1.7]">
        <PortableText value={props.content as Record<string, unknown>[]} />
      </div>
    </BaseBlock>
  );
}
