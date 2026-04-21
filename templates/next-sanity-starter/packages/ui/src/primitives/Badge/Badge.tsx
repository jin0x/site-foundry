import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import {
  BADGE_VARIANT_COLOR_CLASSES,
  type BadgeColor,
  type BadgeVariant,
} from './badge-types';

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  variant?: BadgeVariant;
  color?: BadgeColor;
  children?: ReactNode;
}

const BASE_CLASSES =
  'inline-block px-4 py-1 text-caption tracking-widest uppercase rounded-full font-heading font-medium';

export function Badge({
  variant = 'outline',
  color = 'dark',
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cx(BASE_CLASSES, BADGE_VARIANT_COLOR_CLASSES[variant][color], className)}
      {...rest}
    >
      {children}
    </span>
  );
}
