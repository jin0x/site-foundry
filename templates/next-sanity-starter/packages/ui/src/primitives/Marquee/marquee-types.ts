export const MarqueeSpeed = {
  SLOW: 'slow',
  MEDIUM: 'medium',
  FAST: 'fast',
} as const;
export type MarqueeSpeed = (typeof MarqueeSpeed)[keyof typeof MarqueeSpeed];

export const MarqueeGap = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;
export type MarqueeGap = (typeof MarqueeGap)[keyof typeof MarqueeGap];

export const MARQUEE_DURATION: Record<MarqueeSpeed, string> = {
  slow: '100s',
  medium: '70s',
  fast: '40s',
};

export const MARQUEE_GAP_CLASSES: Record<MarqueeGap, string> = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
};
