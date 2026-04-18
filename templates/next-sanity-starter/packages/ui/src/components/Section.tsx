import type { ReactNode } from 'react';
import { Container } from '../primitives/Container';

export interface SectionProps {
  children?: ReactNode;
  backgroundTone?: 'none' | 'subtle' | 'accent' | 'inverse' | null;
  spacing?: 'compact' | 'default' | 'roomy' | null;
}

export function Section({
  children,
  backgroundTone = 'none',
  spacing = 'default',
}: SectionProps) {
  return (
    <section className={['sf-section', `sf-section--tone-${backgroundTone}`, `sf-section--spacing-${spacing}`].join(' ')}>
      <Container>{children}</Container>
    </section>
  );
}
