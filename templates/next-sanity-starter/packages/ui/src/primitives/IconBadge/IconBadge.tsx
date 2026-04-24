import type { HTMLAttributes, ReactNode } from 'react';
import type { ImageWithAltValue } from '@site-foundry-template/sanity-types';
import { cx } from '../../lib/cx';
import {
  ICON_BADGE_CONTAINER_CLASSES,
  ICON_BADGE_ICON_CLASSES,
  type IconBadgeSize,
} from './iconbadge-types';

export interface IconBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  source?: ImageWithAltValue | null;
  src?: string;
  alt?: string;
  size?: IconBadgeSize;
  /** Custom children override the image — useful for inline SVGs or glyphs. */
  children?: ReactNode;
}

export function IconBadge({
  source,
  src: srcProp,
  alt: altProp,
  size = 'md',
  className,
  children,
  ...rest
}: IconBadgeProps) {
  const src = srcProp ?? source?.asset?.url ?? undefined;
  const alt = altProp ?? source?.alt ?? '';

  return (
    <span
      className={cx(
        'inline-flex items-center justify-center rounded-xl bg-[var(--color-surface-raised)] shrink-0',
        ICON_BADGE_CONTAINER_CLASSES[size],
        className,
      )}
      aria-hidden={!children && !src && !alt}
      {...rest}
    >
      {children ? (
        <span className={cx('inline-flex items-center justify-center', ICON_BADGE_ICON_CLASSES[size])}>
          {children}
        </span>
      ) : src ? (
        <img
          src={src}
          alt={alt}
          className={cx('object-contain', ICON_BADGE_ICON_CLASSES[size])}
        />
      ) : null}
    </span>
  );
}
