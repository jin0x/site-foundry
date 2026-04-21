import { PortableText } from '@portabletext/react';
import type { RichTextBlock as RichTextBlockProps } from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';

export function RichTextBlock(props: RichTextBlockProps) {
  return (
    <BaseBlock block={props}>
      <div className="max-w-[44rem] space-y-4 text-[var(--color-secondary)] leading-[1.7]">
        <PortableText value={props.content as Record<string, unknown>[]} />
      </div>
    </BaseBlock>
  );
}
