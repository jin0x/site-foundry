import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import {
  STACK_ALIGN_CLASSES,
  STACK_DIRECTION_CLASSES,
  STACK_GAP_CLASSES,
  type StackAlign,
  type StackDirection,
  type StackGap,
} from './stack-types';

export interface StackProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  direction?: StackDirection;
  gap?: StackGap;
  align?: StackAlign;
  children?: ReactNode;
}

export function Stack({
  as: Component = 'div',
  direction = 'column',
  gap = 'md',
  align,
  className,
  children,
  ...rest
}: StackProps) {
  return (
    <Component
      className={cx(
        STACK_DIRECTION_CLASSES[direction],
        STACK_GAP_CLASSES[gap],
        align && STACK_ALIGN_CLASSES[align],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
