import { PortableText } from '@portabletext/react';
import type { RichTextBlock as RichTextBlockProps } from '@site-foundry-template/sanity-types';
import { HeadingGroup } from '../../components/HeadingGroup';
import { Section } from '../../components/Section';

export function RichTextBlock(props: RichTextBlockProps) {
  return (
    <Section backgroundTone={props.backgroundTone} spacing={props.spacing}>
      <div className="sf-rich-text">
        <HeadingGroup value={props.sectionHeading} />
        <PortableText value={props.content as Record<string, unknown>[]} />
      </div>
    </Section>
  );
}
