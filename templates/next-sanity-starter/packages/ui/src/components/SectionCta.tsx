import type { ReactNode } from 'react';
import type { Alignment } from '@site-foundry-template/sanity-types';
import { cx } from '../lib/cx';

export interface SectionCtaProps {
  align?: Alignment | null;
  className?: string;
  children?: ReactNode;
}

export function SectionCta({ align = 'left', className, children }: SectionCtaProps) {
  if (!children) {
    return null;
  }

  return (
    <div
      className={cx(
        'flex flex-col md:flex-row flex-wrap gap-3',
        align === 'center' && 'md:justify-center',
        className,
      )}
    >
      {children}
    </div>
  );
}
