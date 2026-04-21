import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import {
  STACK_ALIGN_CLASSES,
  STACK_GAP_CLASSES,
  type StackAlign,
  type StackGap,
} from './stack-types';

export interface StackProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  gap?: StackGap;
  align?: StackAlign;
  children?: ReactNode;
}

export function Stack({
  as: Component = 'div',
  gap = 'md',
  align,
  className,
  children,
  ...rest
}: StackProps) {
  return (
    <Component
      className={cx(
        'flex flex-col',
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
