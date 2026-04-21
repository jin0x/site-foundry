import type { ReactNode } from 'react';
import type { Alignment } from '@site-foundry-template/sanity-types';
import { cx } from '../lib/cx';
import { Eyebrow } from '../primitives/Eyebrow';
import { Heading } from '../primitives/Heading';
import type { HeadingColor, HeadingSize, HeadingTag } from '../primitives/Heading/heading-types';
import { Stack } from '../primitives/Stack';
import { Text } from '../primitives/Text';

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
  headingAs = 'h2',
  headingSize = 'h2',
  headingColor = 'default',
  className,
}: SectionHeadingProps) {
  if (!eyebrow && !heading && !subheading) {
    return null;
  }

  const isCenter = align === 'center';

  return (
    <Stack
      gap="sm"
      align={isCenter ? 'center' : undefined}
      className={cx(isCenter && 'text-center', className)}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      {heading ? (
        <Heading as={headingAs} size={headingSize} color={headingColor}>
          {heading}
        </Heading>
      ) : null}
      {subheading ? (
        <Text as="div" size="md" color="muted">
          {subheading}
        </Text>
      ) : null}
    </Stack>
  );
}
