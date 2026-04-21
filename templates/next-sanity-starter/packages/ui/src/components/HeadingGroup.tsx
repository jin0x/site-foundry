import { PortableText } from '@portabletext/react';
import type { PortableTextLike, SectionHeadingValue } from '@site-foundry-template/sanity-types';
import { SectionHeading } from './SectionHeading';

export interface HeadingGroupProps {
  value?: SectionHeadingValue | null;
  className?: string;
}

export function HeadingGroup({ value, className }: HeadingGroupProps) {
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
    />
  );
}
