import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import {
  TEXT_COLOR_CLASSES,
  TEXT_SIZE_CLASSES,
  type TextColor,
  type TextSize,
  type TextTag,
} from './text-types';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextTag | ElementType;
  size?: TextSize;
  color?: TextColor;
  children?: ReactNode;
}

export function Text({
  as: Component = 'p',
  size = 'base',
  color = 'default',
  className,
  children,
  ...rest
}: TextProps) {
  return (
    <Component
      className={cx('m-0', TEXT_SIZE_CLASSES[size], TEXT_COLOR_CLASSES[color], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
