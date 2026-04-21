import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import {
  HEADING_COLOR_CLASSES,
  HEADING_SIZE_CLASSES,
  type HeadingColor,
  type HeadingSize,
  type HeadingTag,
} from './heading-types';

export interface HeadingProps extends HTMLAttributes<HTMLElement> {
  as?: HeadingTag | ElementType;
  size?: HeadingSize;
  color?: HeadingColor;
  children?: ReactNode;
}

export function Heading({
  as: Component = 'h2',
  size = 'h3',
  color = 'default',
  className,
  children,
  ...rest
}: HeadingProps) {
  return (
    <Component
      className={cx(
        'font-heading m-0',
        HEADING_SIZE_CLASSES[size],
        HEADING_COLOR_CLASSES[color],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
