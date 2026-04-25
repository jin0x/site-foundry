import type { CSSProperties, ElementType, ReactNode } from 'react';
import type { BackgroundTone, SpacingSize } from '@site-foundry-template/sanity-types';
import { cx } from '../lib/cx';
import { Container } from '../primitives/Container';

/* B2: 'default' bumped from py-4 (16px) to py-12 (48px) — Decisions design
 * targets pt-48 pb-64 px-64 ≈ 48–80px on most sections; py-4 was visibly
 * collapsed across ~18 sections per the baseline gap heatmap. Symmetric 48px
 * is the floor; per-section asymmetric (pt vs pb) handled at block level. */
const SPACING_CLASSES: Record<SpacingSize, string> = {
  compact: 'py-16',
  default: 'py-12',
  roomy: 'py-32',
};

const TONE_STYLES: Record<BackgroundTone, CSSProperties> = {
  none: {},
  subtle: {
    background: 'color-mix(in srgb, var(--color-surface-raised) 80%, transparent)',
  },
  accent: {
    background: 'var(--color-surface-accent)',
  },
  inverse: {
    color: 'var(--color-inverse)',
    background:
      'linear-gradient(180deg, color-mix(in srgb, var(--color-surface-inverse) 94%, var(--color-brand-blue) 6%), color-mix(in srgb, var(--color-surface-inverse) 82%, var(--color-brand-blue) 18%))',
  },
};

export interface SectionProps {
  as?: ElementType;
  backgroundTone?: BackgroundTone | null;
  spacing?: SpacingSize | null;
  className?: string;
  children?: ReactNode;
}

export function Section({
  as: Tag = 'section',
  backgroundTone = 'none',
  spacing = 'default',
  className,
  children,
}: SectionProps) {
  const tone = backgroundTone ?? 'none';
  return (
    <Tag
      className={cx('relative', `tone-${tone}`, SPACING_CLASSES[spacing ?? 'default'], className)}
      style={TONE_STYLES[tone]}
    >
      <Container>{children}</Container>
    </Tag>
  );
}
