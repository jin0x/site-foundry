import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import {
  CARD_PADDING_CLASSES,
  CARD_RADIUS_CLASSES,
  CARD_VARIANT_CLASSES,
  type CardPadding,
  type CardRadius,
  type CardVariant,
} from './card-types';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: CardVariant;
  padding?: CardPadding;
  radius?: CardRadius;
  children?: ReactNode;
}

export function Card({
  as: Component = 'div',
  variant = 'default',
  padding = 'md',
  radius = 'xl',
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Component
      className={cx(
        CARD_VARIANT_CLASSES[variant],
        CARD_PADDING_CLASSES[padding],
        CARD_RADIUS_CLASSES[radius],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
