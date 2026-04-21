export const HeadingTag = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
  P: 'p',
} as const;
export type HeadingTag = (typeof HeadingTag)[keyof typeof HeadingTag];

export const HeadingSize = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
} as const;
export type HeadingSize = (typeof HeadingSize)[keyof typeof HeadingSize];

export const HeadingColor = {
  DEFAULT: 'default',
  FOREGROUND: 'foreground',
  WHITE: 'white',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  GRADIENT: 'gradient',
  BLACK: 'black',
  ROSE: 'rose',
  GRAY: 'gray',
} as const;
export type HeadingColor = (typeof HeadingColor)[keyof typeof HeadingColor];

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
