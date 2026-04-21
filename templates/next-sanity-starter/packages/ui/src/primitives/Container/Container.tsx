import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { CONTAINER_SIZE_CLASSES, type ContainerSize } from './container-types';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: ContainerSize;
  children?: ReactNode;
}

export function Container({
  as: Component = 'div',
  size = 'xl',
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Component
      className={cx(
        'w-full mx-auto relative px-[var(--container-padding-mobile)] lg:px-[var(--container-padding-desktop)]',
        CONTAINER_SIZE_CLASSES[size],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
