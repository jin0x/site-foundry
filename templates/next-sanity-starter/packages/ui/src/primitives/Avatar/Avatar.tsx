import type { HTMLAttributes } from 'react';
import type { ImageWithAltValue } from '@site-foundry-template/sanity-types';
import { cx } from '../../lib/cx';
import { AVATAR_SIZE_CLASSES, type AvatarSize } from './avatar-types';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  source?: ImageWithAltValue | null;
  src?: string;
  alt?: string;
  /** Falls back to alt when src/source is missing; used for initials. */
  name?: string;
  size?: AvatarSize;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}

export function Avatar({
  source,
  src: srcProp,
  alt: altProp,
  name,
  size = 'md',
  className,
  ...rest
}: AvatarProps) {
  const src = srcProp ?? source?.asset?.url ?? undefined;
  const alt = altProp ?? source?.alt ?? name ?? '';
  const initials = !src && name ? getInitials(name) : '';

  return (
    <span
      className={cx(
        'inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 bg-[var(--color-surface-raised)] text-[var(--color-secondary)] font-medium',
        AVATAR_SIZE_CLASSES[size],
        className,
      )}
      aria-hidden={!src && !name}
      {...rest}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : initials ? (
        <span>{initials}</span>
      ) : null}
    </span>
  );
}
