import type { CtaValue, LinkValue } from '@site-foundry-template/sanity-types';
import { Button } from '../primitives/Button';
import type { ButtonColor, ButtonVariant } from '../primitives/Button';

export interface CtaButtonProps {
  value: CtaValue;
  size?: 'sm' | 'md' | 'lg';
}

function resolveHref(link?: LinkValue | null): string {
  if (!link) {
    return '#';
  }

  if (link.kind === 'page') {
    const slug = link.page?.slug;
    return slug === 'home' ? '/' : `/${slug ?? ''}`;
  }

  if (link.kind === 'email') {
    return link.email ? `mailto:${link.email}` : '#';
  }

  if (link.kind === 'file') {
    return link.file?.url || '#';
  }

  return link.href || '#';
}

const VARIANT_MAP: Record<NonNullable<CtaValue['variant']>, ButtonVariant> = {
  solid: 'solid',
  outline: 'outline',
  transparent: 'ghost',
};

const COLOR_MAP: Record<NonNullable<CtaValue['color']>, ButtonColor> = {
  primary: 'primary',
  accent: 'primary',
  light: 'light',
};

export function CtaButton({ value, size = 'md' }: CtaButtonProps) {
  if (!value.enabled || !value.text) {
    return null;
  }

  const href = resolveHref(value.link);
  const variant = VARIANT_MAP[value.variant ?? 'solid'];
  const color = COLOR_MAP[value.color ?? 'primary'];

  return (
    <Button
      href={href}
      variant={variant}
      color={color}
      size={size}
      target={value.link?.openInNewTab ? '_blank' : undefined}
      rel={value.link?.openInNewTab ? 'noreferrer' : undefined}
    >
      {value.text}
    </Button>
  );
}
