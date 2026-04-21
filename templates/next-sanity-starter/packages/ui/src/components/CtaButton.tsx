import type { CtaValue, LinkValue } from '@site-foundry-template/sanity-types';
import { Button } from '../primitives/Button';
import { ButtonColor, ButtonSize, ButtonVariant } from '../primitives/Button';

export interface CtaButtonProps {
  value: CtaValue;
  size?: ButtonSize;
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
  solid: ButtonVariant.SOLID,
  outline: ButtonVariant.OUTLINE,
  transparent: ButtonVariant.GHOST,
};

const COLOR_MAP: Record<NonNullable<CtaValue['color']>, ButtonColor> = {
  primary: ButtonColor.PRIMARY,
  accent: ButtonColor.PRIMARY,
  light: ButtonColor.LIGHT,
};

export function CtaButton({ value, size = ButtonSize.MD }: CtaButtonProps) {
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
