import { PortableText } from '@portabletext/react';
import type { PortableTextLike, SectionHeadingValue } from '@site-foundry-template/sanity-types';
import { SectionHeading } from './SectionHeading';
import type { HeadingSize, HeadingTag } from '../primitives/Heading/heading-types';

export interface HeadingGroupProps {
  value?: SectionHeadingValue | null;
  className?: string;
  headingSize?: HeadingSize;
  headingAs?: HeadingTag;
}

export function HeadingGroup({ value, className, headingSize, headingAs }: HeadingGroupProps) {
  if (!value?.enabled) {
    return null;
  }

  return (
    <SectionHeading
      eyebrow={value.eyebrow}
      heading={value.heading}
      subheading={
        value.subheading?.length ? (
          <PortableText value={value.subheading as PortableTextLike} />
        ) : null
      }
      align={value.align}
      className={className}
      headingSize={headingSize}
      headingAs={headingAs}
    />
  );
}
