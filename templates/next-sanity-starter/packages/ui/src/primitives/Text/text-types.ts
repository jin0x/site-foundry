export const TextTag = {
  DIV: 'div',
  P: 'p',
  SPAN: 'span',
  LI: 'li',
  OL: 'ol',
  UL: 'ul',
  CODE: 'code',
  TIME: 'time',
} as const;
export type TextTag = (typeof TextTag)[keyof typeof TextTag];

export const TextSize = {
  CAPTION: 'caption',
  XS: 'xs',
  SM: 'sm',
  BASE: 'base',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;
export type TextSize = (typeof TextSize)[keyof typeof TextSize];

export const TextColor = {
  DEFAULT: 'default',
  MUTED: 'muted',
  SUBTLE: 'subtle',
  FOREGROUND: 'foreground',
  WHITE: 'white',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  GRADIENT: 'gradient',
  BLACK: 'black',
  PALE_BLUE: 'pale-blue',
  ROSE: 'rose',
  GRAY: 'gray',
  LIGHT_GRAY: 'light-gray',
} as const;
export type TextColor = (typeof TextColor)[keyof typeof TextColor];

export const TEXT_SIZE_CLASSES: Record<TextSize, string> = {
  caption: 'text-caption',
  xs: 'text-caption',
  sm: 'text-small',
  base: 'text-body',
  md: 'text-prose-body',
  lg: 'text-h3',
  xl: 'text-h2',
};

export const TEXT_COLOR_CLASSES: Record<TextColor, string> = {
  default: '',
  muted: 'text-[var(--color-secondary)]',
  subtle: 'text-[var(--color-tertiary)]',
  foreground: 'text-[var(--color-primary)]',
  white: 'text-white',
  primary: 'text-[var(--color-brand-turquoise)]',
  secondary: 'text-[var(--color-brand-fuchsia)]',
  gradient:
    'bg-gradient-to-r from-[var(--color-brand-turquoise)] to-[var(--color-brand-fuchsia)] bg-clip-text text-transparent',
  black: 'text-black',
  'pale-blue': 'text-[var(--color-brand-blue)]',
  rose: 'text-[var(--color-brand-fuchsia)]',
  gray: 'text-[var(--color-tertiary)]',
  'light-gray': 'text-[var(--color-secondary)]',
};
