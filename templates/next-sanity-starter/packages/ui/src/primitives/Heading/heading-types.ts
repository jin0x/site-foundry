export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

export type HeadingSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingColor =
  | 'default'
  | 'foreground'
  | 'white'
  | 'primary'
  | 'secondary'
  | 'gradient'
  | 'black'
  | 'rose'
  | 'gray';

export const HEADING_SIZE_CLASSES: Record<HeadingSize, string> = {
  h1: 'text-h1 font-medium',
  h2: 'text-h2 font-normal',
  h3: 'text-h3 font-normal',
  h4: 'text-h4 font-normal',
  h5: 'text-h5 font-normal',
  h6: 'text-h6 font-normal',
};

export const HEADING_COLOR_CLASSES: Record<HeadingColor, string> = {
  default: '',
  foreground: 'text-[var(--color-primary)]',
  white: 'text-white',
  primary: 'text-[var(--color-brand-turquoise)]',
  secondary: 'text-[var(--color-brand-fuchsia)]',
  gradient:
    'bg-gradient-to-r from-[var(--color-brand-turquoise)] to-[var(--color-brand-fuchsia)] bg-clip-text text-transparent',
  black: 'text-black',
  rose: 'text-[var(--color-brand-fuchsia)]',
  gray: 'text-[var(--color-tertiary)]',
};
