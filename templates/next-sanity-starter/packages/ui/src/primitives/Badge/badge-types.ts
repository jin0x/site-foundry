export type BadgeVariant = 'outline' | 'solid';

export type BadgeColor = 'dark' | 'primary' | 'secondary' | 'light';

const outlineColors: Record<BadgeColor, string> = {
  dark: 'border border-[var(--color-code-border)] text-white bg-[var(--color-surface-raised)]',
  primary:
    'border border-[var(--color-brand-turquoise)] text-[var(--color-brand-turquoise)] bg-transparent',
  secondary:
    'border border-[var(--color-brand-fuchsia)] text-[var(--color-brand-fuchsia)] bg-transparent',
  light:
    'border border-[var(--color-code-border)] text-[var(--color-inverse)] bg-[var(--color-surface-inverse)]',
};

const solidColors: Record<BadgeColor, string> = {
  dark: 'text-white bg-[var(--color-surface-raised)]',
  primary: 'text-[var(--color-inverse)] bg-[var(--color-brand-turquoise)]',
  secondary: 'text-white bg-[var(--color-brand-fuchsia)]',
  light: 'text-[var(--color-inverse)] bg-[var(--color-brand-light-bg)]',
};

export const BADGE_VARIANT_COLOR_CLASSES: Record<
  BadgeVariant,
  Record<BadgeColor, string>
> = {
  outline: outlineColors,
  solid: solidColors,
};
