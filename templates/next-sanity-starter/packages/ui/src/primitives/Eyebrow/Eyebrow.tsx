import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface EyebrowProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children?: ReactNode;
}

export function Eyebrow({
  as: Component = 'span',
  className,
  children,
  ...rest
}: EyebrowProps) {
  return (
    <Component
      className={cx(
        'inline-block font-heading font-semibold text-small uppercase tracking-widest text-[var(--color-brand-turquoise)]',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
