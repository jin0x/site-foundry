export type MarqueeSpeed = 'slow' | 'medium' | 'fast';
export type MarqueeGap = 'sm' | 'md' | 'lg' | 'xl';

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
