import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import {
  GRID_GAP_CLASSES,
  resolveGridColClasses,
  type GridCols,
  type GridGap,
} from './grid-types';

export interface GridProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  cols?: GridCols;
  gap?: GridGap;
  children?: ReactNode;
}

const DEFAULT_COLS: GridCols = { mobile: 1, tablet: 2, desktop: 3 };

export function Grid({
  as: Component = 'div',
  cols = DEFAULT_COLS,
  gap = 'lg',
  className,
  children,
  ...rest
}: GridProps) {
  return (
    <Component
      className={cx('grid', resolveGridColClasses(cols), GRID_GAP_CLASSES[gap], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
