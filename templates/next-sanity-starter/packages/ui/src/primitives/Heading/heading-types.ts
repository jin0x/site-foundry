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
  /* Display tier above H1 — Decisions "Heading/Small" 80px hero token.
   * Use for splash heroes that need to break out of the H1 ceiling. */
  DISPLAY: 'display',
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

export const HeadingWeight = {
  LIGHT: 'light',
  REGULAR: 'regular',
  MEDIUM: 'medium',
  SEMIBOLD: 'semibold',
  BOLD: 'bold',
} as const;
export type HeadingWeight = (typeof HeadingWeight)[keyof typeof HeadingWeight];

export const HEADING_SIZE_CLASSES: Record<HeadingSize, string> = {
  display: 'text-display-1',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
  h5: 'text-h5',
  h6: 'text-h6',
};

export const HEADING_WEIGHT_CLASSES: Record<HeadingWeight, string> = {
  light: 'font-light',
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

/* Decisions design uses Light 300 on display-tier headings (h1-h3) and
 * Regular 400 on text-tier (h4-h6). Consumers can override via the `weight`
 * prop; default-by-size keeps Tier 1 scope to the primitive only. */
export const DEFAULT_WEIGHT_BY_SIZE: Record<HeadingSize, HeadingWeight> = {
  display: 'light',
  h1: 'light',
  h2: 'light',
  h3: 'light',
  h4: 'regular',
  h5: 'regular',
  h6: 'regular',
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
