import type { CtaValue, LinkValue } from '@site-foundry-template/sanity-types';
import { Button } from '../primitives/Button';
import { ButtonColor, ButtonShape, ButtonSize, ButtonVariant } from '../primitives/Button';

export interface CtaButtonProps {
  value: CtaValue;
  size?: ButtonSize;
  /* Block-level overrides for inverse-tone surfaces (Tier 2 P5).
   * When a block knows its render context is inverse (e.g., HeroCenterBlock
   * background mode, CalloutBlock tone='accent'), it can force the variant
   * here without expanding the schema. */
  variant?: ButtonVariant;
  shape?: ButtonShape;
}

function resolveHref(link?: LinkValue | null): string {
  if (!link) {
    return 'http://localhost:3000/';
  }

  if (link.kind === 'page') {
    const slug = link.page?.slug;
    return slug === 'home' ? '/' : `/${slug ?? ''}`;
  }

  if (link.kind === 'email') {
    return link.email ? `mailto:${link.email}` : 'http://localhost:3000/';
  }

  if (link.kind === 'file') {
    return link.file?.url || 'http://localhost:3000/';
  }

  return link.href || 'http://localhost:3000/';
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

export function CtaButton({
  value,
  size = ButtonSize.MD,
  variant: variantOverride,
  shape,
}: CtaButtonProps) {
  if (!value.enabled || !value.text) {
    return null;
  }

  const href = resolveHref(value.link);
  const variant = variantOverride ?? VARIANT_MAP[value.variant ?? 'solid'];
  const color = COLOR_MAP[value.color ?? 'primary'];

  return (
    <Button
      href={href}
      variant={variant}
      color={color}
      size={size}
      shape={shape}
      target={value.link?.openInNewTab ? '_blank' : undefined}
      rel={value.link?.openInNewTab ? 'noreferrer' : undefined}
    >
      {value.text}
    </Button>
  );
}
