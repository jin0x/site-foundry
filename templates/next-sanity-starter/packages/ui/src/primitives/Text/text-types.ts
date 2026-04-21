export type TextTag = 'div' | 'p' | 'span' | 'li' | 'ol' | 'ul' | 'code' | 'time';

export type TextSize = 'caption' | 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl';

export type TextColor =
  | 'default'
  | 'muted'
  | 'subtle'
  | 'foreground'
  | 'white'
  | 'primary'
  | 'secondary'
  | 'gradient'
  | 'black'
  | 'pale-blue'
  | 'rose'
  | 'gray'
  | 'light-gray';

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
