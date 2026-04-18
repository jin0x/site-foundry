import type { ElementType, ReactNode } from 'react';

export interface ContainerProps {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}

export function Container({
  as: Component = 'div',
  className,
  children,
}: ContainerProps) {
  return <Component className={['sf-container', className].filter(Boolean).join(' ')}>{children}</Component>;
}
