import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import {
  DEFAULT_WEIGHT_BY_SIZE,
  HEADING_COLOR_CLASSES,
  HEADING_SIZE_CLASSES,
  HEADING_WEIGHT_CLASSES,
  type HeadingColor,
  type HeadingSize,
  type HeadingTag,
  type HeadingWeight,
} from './heading-types';

export interface HeadingProps extends HTMLAttributes<HTMLElement> {
  as?: HeadingTag | ElementType;
  size?: HeadingSize;
  weight?: HeadingWeight;
  color?: HeadingColor;
  children?: ReactNode;
}

export function Heading({
  as: Component = 'h2',
  size = 'h3',
  weight,
  color = 'default',
  className,
  children,
  ...rest
}: HeadingProps) {
  const effectiveWeight = weight ?? DEFAULT_WEIGHT_BY_SIZE[size];
  return (
    <Component
      className={cx(
        'font-heading m-0',
        HEADING_SIZE_CLASSES[size],
        HEADING_WEIGHT_CLASSES[effectiveWeight],
        HEADING_COLOR_CLASSES[color],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
