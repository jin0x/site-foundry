import type { ReactNode } from 'react';
import type {
  BackgroundTone,
  SectionHeadingValue,
  SpacingSize,
} from '@site-foundry-template/sanity-types';
import { Section } from './Section';
import { HeadingGroup } from './HeadingGroup';
import type { HeadingSize, HeadingTag } from '../primitives/Heading/heading-types';
import { Stack } from '../primitives/Stack';
import { StackGap } from '../primitives/Stack/stack-types';

export interface BaseBlockProps {
  block: {
    spacing?: SpacingSize | null;
    backgroundTone?: BackgroundTone | null;
    sectionHeading?: SectionHeadingValue | null;
  };
  showHeading?: boolean;
  stackGap?: StackGap;
  stackClassName?: string;
  className?: string;
  /* B1: opt-in outer chrome (border #e8e8e8 + bg-white + designed
   * pt-48 pb-64 px-64 padding). Block authors set framed={true} when their
   * block is always-framed at section level (e.g., StatGrid, AutoSwitching,
   * TabbedFeatures, Testimonials). When framed, Section's own SPACING_CLASSES
   * is suppressed so the chrome controls vertical padding directly. */
  framed?: boolean;
  /* Optional heading size/tag override forwarded to HeadingGroup. Default
   * (undefined) lets SectionHeading apply its H2 fallback. Block authors
   * pass these when their section needs a non-default heading (e.g.,
   * VideoContentBlock with H1 64px design). */
  headingSize?: HeadingSize;
  headingAs?: HeadingTag;
  children?: ReactNode;
}

const FRAMED_CHROME_CLASS =
  'border border-[var(--color-border-default)] bg-[var(--color-surface-page)] pt-12 pb-16 px-16';

export function BaseBlock({
  block,
  showHeading = true,
  stackGap = StackGap.XL,
  stackClassName,
  className,
  framed = false,
  headingSize,
  headingAs,
  children,
}: BaseBlockProps) {
  const inner = (
    <Stack gap={stackGap} className={stackClassName}>
      {showHeading ? (
        <HeadingGroup
          value={block.sectionHeading}
          headingSize={headingSize}
          headingAs={headingAs}
        />
      ) : null}
      {children}
    </Stack>
  );
  return (
    <Section
      backgroundTone={block.backgroundTone}
      spacing={block.spacing}
      noPadding={framed}
      className={className}
    >
      {framed ? <div className={FRAMED_CHROME_CLASS}>{inner}</div> : inner}
    </Section>
  );
}
