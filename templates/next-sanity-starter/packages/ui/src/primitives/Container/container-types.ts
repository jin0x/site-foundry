export const ContainerSize = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  WIDE: 'wide',
  FULL: 'full',
} as const;
export type ContainerSize = (typeof ContainerSize)[keyof typeof ContainerSize];

/**
 * XL uses `--container-max` (tokens.md default, 1080px).
 * WIDE uses `--breakpoint-xl` (1440px) as an escape hatch above default.
 * XS–LG fall back to Tailwind's max-w utilities.
 */
export const CONTAINER_SIZE_CLASSES: Record<ContainerSize, string> = {
  xs: 'max-w-2xl',
  sm: 'max-w-4xl',
  md: 'max-w-6xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[var(--container-max)]',
  wide: 'max-w-[var(--breakpoint-xl)]',
  full: 'max-w-full',
};
