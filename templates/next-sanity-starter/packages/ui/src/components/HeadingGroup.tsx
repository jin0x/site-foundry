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

  /* P4: when headingMuted is set, compose a two-tone heading — line 1 in
   * default color, line 2 wrapped in a muted span. Used by Hp 12 + Pl 10
   * accordion sections ("Questions? \n We've got answers.") where the
   * design splits a single semantic heading into a primary + softer line. */
  const headingNode = value.headingMuted ? (
    <>
      {value.heading}
      <br />
      <span className="text-[var(--color-secondary)]">{value.headingMuted}</span>
    </>
  ) : (
    value.heading
  );

  return (
    <SectionHeading
      eyebrow={value.eyebrow}
      heading={headingNode}
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
