import type { ReactNode } from 'react';

export interface StackProps {
  children?: ReactNode;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Stack({ children, gap = 'md', className }: StackProps) {
  return <div className={['sf-stack', `sf-stack--${gap}`, className].filter(Boolean).join(' ')}>{children}</div>;
}
