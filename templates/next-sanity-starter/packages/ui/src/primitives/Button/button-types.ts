export const ButtonVariant = {
  SOLID: 'solid',
  OUTLINE: 'outline',
  GHOST: 'ghost',
} as const;
export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];

export const ButtonSize = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;
export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];

export const ButtonColor = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  LIGHT: 'light',
} as const;
export type ButtonColor = (typeof ButtonColor)[keyof typeof ButtonColor];

export const BUTTON_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'min-h-9 text-small px-4',
  md: 'min-h-12 text-body px-6',
  lg: 'min-h-14 text-prose-body px-8',
};

const solidColors: Record<ButtonColor, string> = {
  primary: 'bg-[var(--color-brand-turquoise)] text-[var(--color-inverse)] hover:opacity-90',
  secondary: 'bg-[var(--color-brand-fuchsia)] text-white hover:opacity-90',
  light: 'bg-[var(--color-brand-light-bg)] text-[var(--color-inverse)] hover:opacity-90',
};

const outlineColors: Record<ButtonColor, string> = {
  primary:
    'border border-[var(--color-brand-turquoise)] text-[var(--color-brand-turquoise)] hover:bg-[var(--color-brand-turquoise)] hover:text-[var(--color-inverse)]',
  secondary:
    'border border-[var(--color-brand-fuchsia)] text-[var(--color-brand-fuchsia)] hover:bg-[var(--color-brand-fuchsia)] hover:text-white',
  light:
    'border border-[var(--color-brand-light-bg)] text-[var(--color-brand-light-bg)] hover:bg-[var(--color-brand-light-bg)] hover:text-[var(--color-inverse)]',
};

const ghostColors: Record<ButtonColor, string> = {
  primary: 'text-[var(--color-brand-turquoise)] hover:bg-white/5',
  secondary: 'text-[var(--color-brand-fuchsia)] hover:bg-white/5',
  light: 'text-[var(--color-primary)] hover:bg-white/5',
};

export const BUTTON_VARIANT_COLOR_CLASSES: Record<
  ButtonVariant,
  Record<ButtonColor, string>
> = {
  solid: solidColors,
  outline: outlineColors,
  ghost: ghostColors,
};
