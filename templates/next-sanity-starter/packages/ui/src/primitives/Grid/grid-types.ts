export const GridGap = {
  NONE: 'none',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  XL2: '2xl',
} as const;
export type GridGap = (typeof GridGap)[keyof typeof GridGap];

export type GridColsNum = 1 | 2 | 3 | 4 | 5 | 6;

export interface GridColsResponsive {
  mobile?: 1 | 2 | 3 | 4;
  tablet?: 1 | 2 | 3 | 4 | 5 | 6;
  desktop?: 1 | 2 | 3 | 4 | 5 | 6;
}

export type GridCols = GridColsNum | GridColsResponsive;

export const GRID_GAP_CLASSES: Record<GridGap, string> = {
  none: 'gap-0',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
  '2xl': 'gap-16',
};

export const GRID_MOBILE_COL_CLASSES: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};

export const GRID_TABLET_COL_CLASSES: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
};

export const GRID_DESKTOP_COL_CLASSES: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
};

export function resolveGridColClasses(cols: GridCols): string {
  if (typeof cols === 'number') {
    return GRID_MOBILE_COL_CLASSES[cols] ?? `grid-cols-${cols}`;
  }
  const parts: string[] = [];
  if (cols.mobile) parts.push(GRID_MOBILE_COL_CLASSES[cols.mobile]);
  if (cols.tablet) parts.push(GRID_TABLET_COL_CLASSES[cols.tablet]);
  if (cols.desktop) parts.push(GRID_DESKTOP_COL_CLASSES[cols.desktop]);
  return parts.join(' ');
}
