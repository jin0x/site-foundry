import type { ReactNode } from 'react';
import type {
  BackgroundTone,
  SectionHeadingValue,
  SpacingSize,
} from '@site-foundry-template/sanity-types';
import { Section } from './Section';
import { HeadingGroup } from './HeadingGroup';
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
  children?: ReactNode;
}

export function BaseBlock({
  block,
  showHeading = true,
  stackGap = StackGap.XL,
  stackClassName,
  className,
  children,
}: BaseBlockProps) {
  return (
    <Section
      backgroundTone={block.backgroundTone}
      spacing={block.spacing}
      className={className}
    >
      <Stack gap={stackGap} className={stackClassName}>
        {showHeading ? <HeadingGroup value={block.sectionHeading} /> : null}
        {children}
      </Stack>
    </Section>
  );
}
