export const ButtonVariant = {
  SOLID: 'solid',
  OUTLINE: 'outline',
  GHOST: 'ghost',
  INVERSE_PRIMARY: 'inverse-primary',
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

export const ButtonShape = {
  PILL: 'pill',
  RECTANGULAR: 'rectangular',
} as const;
export type ButtonShape = (typeof ButtonShape)[keyof typeof ButtonShape];

export const BUTTON_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'min-h-9 text-small px-4',
  md: 'min-h-12 text-body px-6',
  lg: 'min-h-14 text-prose-body px-8',
};

export const BUTTON_SHAPE_CLASSES: Record<ButtonShape, string> = {
  pill: 'rounded-full',
  rectangular: 'px-5 py-3.5',
};

/* Decisions design uses rectangular CTAs for inverse-primary (Navy fill).
 * Other variants keep the legacy pill default — preserves all existing
 * call sites byte-for-byte. Consumers can override via the `shape` prop. */
export const DEFAULT_SHAPE_BY_VARIANT: Record<ButtonVariant, ButtonShape> = {
  solid: 'pill',
  outline: 'pill',
  ghost: 'pill',
  'inverse-primary': 'rectangular',
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

/* inverse-primary collapses the color axis: all three colors resolve to the
 * same Navy treatment. The variant's intent is "Navy fill on any surface";
 * downstream callers passing color=primary/secondary/light render identically. */
const inversePrimaryClasses =
  'bg-[var(--color-navy-100)] text-[var(--color-inverse)] hover:opacity-90';

const inversePrimaryColors: Record<ButtonColor, string> = {
  primary: inversePrimaryClasses,
  secondary: inversePrimaryClasses,
  light: inversePrimaryClasses,
};

export const BUTTON_VARIANT_COLOR_CLASSES: Record<
  ButtonVariant,
  Record<ButtonColor, string>
> = {
  solid: solidColors,
  outline: outlineColors,
  ghost: ghostColors,
  'inverse-primary': inversePrimaryColors,
};
