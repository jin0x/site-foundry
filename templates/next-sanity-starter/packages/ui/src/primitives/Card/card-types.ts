export type CardVariant = 'default' | 'subtle' | 'ghost';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export const CARD_VARIANT_CLASSES: Record<CardVariant, string> = {
  default:
    'border border-[var(--color-code-border)] bg-[color-mix(in_srgb,var(--color-surface-elevated)_88%,transparent)]',
  subtle: 'border border-white/10 bg-white/[0.03]',
  ghost: '',
};

export const CARD_PADDING_CLASSES: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const CARD_RADIUS_CLASSES: Record<CardRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
};
