import type { CSSProperties, ElementType, ReactNode } from 'react';
import type { BackgroundTone, SpacingSize } from '@site-foundry-template/sanity-types';
import { cx } from '../lib/cx';
import { Container } from '../primitives/Container';

const SPACING_CLASSES: Record<SpacingSize, string> = {
  compact: 'py-16',
  default: 'py-24',
  roomy: 'py-32',
};

const TONE_STYLES: Record<BackgroundTone, CSSProperties> = {
  none: {},
  subtle: {
    background: 'color-mix(in srgb, var(--color-surface-raised) 80%, transparent)',
  },
  accent: {
    background:
      'linear-gradient(135deg, color-mix(in srgb, var(--color-brand-turquoise) 22%, var(--color-surface-page) 78%), var(--color-surface-raised))',
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
      className={cx('relative', SPACING_CLASSES[spacing ?? 'default'], className)}
      style={TONE_STYLES[tone]}
    >
      <Container>{children}</Container>
    </Tag>
  );
}
