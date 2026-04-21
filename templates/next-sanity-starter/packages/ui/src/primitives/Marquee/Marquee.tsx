import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import {
  MARQUEE_DURATION,
  MARQUEE_GAP_CLASSES,
  type MarqueeGap,
  type MarqueeSpeed,
} from './marquee-types';

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  speed?: MarqueeSpeed;
  gap?: MarqueeGap;
  pauseOnHover?: boolean;
  reverse?: boolean;
  fade?: boolean;
  fadeWidth?: string;
  children?: ReactNode;
}

export function Marquee({
  speed = 'medium',
  gap = 'lg',
  pauseOnHover = true,
  reverse = false,
  fade = true,
  fadeWidth = '15%',
  className,
  children,
  ...rest
}: MarqueeProps) {
  const animationStyle: CSSProperties = {
    animation: `marquee-scroll ${MARQUEE_DURATION[speed]} linear infinite ${
      reverse ? 'reverse' : 'normal'
    }`,
  };

  const contentClasses = cx(
    'marquee-content flex min-w-full shrink-0 items-center justify-around',
    MARQUEE_GAP_CLASSES[gap],
    pauseOnHover && 'group-hover:[animation-play-state:paused]',
  );

  return (
    <div className={cx('group relative overflow-hidden', className)} {...rest}>
      {fade ? (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 -left-px z-10 h-full bg-gradient-to-r from-[var(--color-surface-page)] from-20% to-transparent"
            style={{ width: fadeWidth }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 -right-px z-10 h-full bg-gradient-to-l from-[var(--color-surface-page)] from-20% to-transparent"
            style={{ width: fadeWidth }}
          />
        </>
      ) : null}

      <div className={cx('flex', MARQUEE_GAP_CLASSES[gap])}>
        <div className={contentClasses} style={animationStyle}>
          {children}
        </div>
        <div aria-hidden="true" className={contentClasses} style={animationStyle}>
          {children}
        </div>
      </div>
    </div>
  );
}
