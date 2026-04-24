export const StackGap = {
  NONE: 'none',
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  XL2: '2xl',
  XL3: '3xl',
} as const;
export type StackGap = (typeof StackGap)[keyof typeof StackGap];

export const StackAlign = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
  STRETCH: 'stretch',
} as const;
export type StackAlign = (typeof StackAlign)[keyof typeof StackAlign];

export const StackDirection = {
  COLUMN: 'column',
  ROW: 'row',
} as const;
export type StackDirection = (typeof StackDirection)[keyof typeof StackDirection];

export const STACK_DIRECTION_CLASSES: Record<StackDirection, string> = {
  column: 'flex flex-col',
  row: 'flex flex-row',
};

export const STACK_GAP_CLASSES: Record<StackGap, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
  '3xl': 'gap-16',
};

export const STACK_ALIGN_CLASSES: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};
