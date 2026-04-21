import type { ReactNode } from 'react';
import type { Alignment } from '@site-foundry-template/sanity-types';
import { cx } from '../lib/cx';
import { Eyebrow } from '../primitives/Eyebrow';
import { Heading } from '../primitives/Heading';
import { HeadingColor, HeadingSize, HeadingTag } from '../primitives/Heading/heading-types';
import { Stack } from '../primitives/Stack';
import { StackAlign, StackGap } from '../primitives/Stack/stack-types';
import { Text } from '../primitives/Text';
import { TextColor, TextSize } from '../primitives/Text/text-types';

export interface SectionHeadingProps {
  eyebrow?: string | null;
  heading?: ReactNode;
  subheading?: ReactNode;
  align?: Alignment | null;
  headingAs?: HeadingTag;
  headingSize?: HeadingSize;
  headingColor?: HeadingColor;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  heading,
  subheading,
  align = 'left',
  headingAs = HeadingTag.H2,
  headingSize = HeadingSize.H2,
  headingColor = HeadingColor.DEFAULT,
  className,
}: SectionHeadingProps) {
  if (!eyebrow && !heading && !subheading) {
    return null;
  }

  const isCenter = align === 'center';

  return (
    <Stack
      gap={StackGap.SM}
      align={isCenter ? StackAlign.CENTER : undefined}
      className={cx(isCenter && 'text-center', className)}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      {heading ? (
        <Heading as={headingAs} size={headingSize} color={headingColor}>
          {heading}
        </Heading>
      ) : null}
      {subheading ? (
        <Text as="div" size={TextSize.MD} color={TextColor.MUTED}>
          {subheading}
        </Text>
      ) : null}
    </Stack>
  );
}
