/**
 * Site Foundry design tokens — TypeScript source of truth.
 *
 * The runtime consumer is `theme.css` (Tailwind v4 @theme block). This TS
 * export exists for codegen, type-safe references in JS-driven styling, and
 * parity with the structure documented in docs/canonical/tokens.md.
 *
 * Values are neutral placeholders. Swap per project.
 */

export const brandColors = {
  blue: '#4A7DFF',
  fuchsia: '#E879B8',
  purple: '#A79CFF',
  turquoise: '#76E4C3',
  gold: '#F4C95A',
  lightBg: '#FAFBFC',
} as const;

export const fillColors = {
  blue: '#4A7DFF',
  fuchsia: '#E879B8',
  purple: '#A79CFF',
  turquoise: '#76E4C3',
  gold: '#F4C95A',
} as const;

export const textColors = {
  primary: '#F4F7FF',
  secondary: '#B7C2E0',
  tertiary: '#8891B0',
  disabled: 'rgba(244, 247, 255, 0.3)',
  inverse: '#09101F',
} as const;

export const surfaceColors = {
  page: '#0B1020',
  raised: '#111933',
  elevated: '#17223F',
  inverse: '#FAFBFC',
} as const;

export const syntaxColors = {
  string: '#76E4C3',
  keyword: '#6E9EFF',
  property: '#F4F7FF',
  operator: '#F4C95A',
  comment: '#8891B0',
  number: '#E879B8',
  function: '#76E4C3',
  value: '#B7C2E0',
  decorator: '#6E9EFF',
  type: '#E879B8',
} as const;

export const codeBlockColors = {
  bg: '#0D1426',
  fg: '#D4D8E4',
  border: 'rgba(255, 255, 255, 0.14)',
  label: '#8891B0',
  tabDefault: '#8891B0',
  tabHover: '#E8E8EC',
  tabActive: '#76E4C3',
} as const;

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  18: 72,
  20: 80,
} as const;

export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 10,
  xl: 12,
  full: 100,
} as const;

export const typography = {
  family: {
    heading: "'Instrument Sans', system-ui, sans-serif",
    body: "'Lexend', system-ui, sans-serif",
    code: "'JetBrains Mono', ui-monospace, monospace",
  },
  size: {
    h1: 52,
    h2: 32,
    h3: 22,
    h4: 20,
    h5: 18,
    h6: 16,
    body: 16,
    small: 14,
    caption: 13,
    proseBody: 20,
    proseSmall: 18,
    proseCode: 17,
    code: 14,
  },
  weight: {
    body: 400,
    medium: 500,
    semibold: 600,
    heading: 700,
  },
  lineHeight: {
    heading: 1.2,
    body: 1.7,
    prose: 1.8,
    code: 1.75,
  },
} as const;

export const container = {
  maxWidth: 1080,
  paddingDesktop: 32,
  paddingMobile: 20,
} as const;

export const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1440,
} as const;

export const zIndex = {
  base: 1,
  navbar: 100,
  overlay: 200,
  modal: 300,
  popover: 400,
} as const;

export const tokens = {
  brand: brandColors,
  fill: fillColors,
  text: textColors,
  surface: surfaceColors,
  syntax: syntaxColors,
  codeBlock: codeBlockColors,
  spacing,
  radius,
  typography,
  container,
  breakpoints,
  zIndex,
} as const;

export type Tokens = typeof tokens;
