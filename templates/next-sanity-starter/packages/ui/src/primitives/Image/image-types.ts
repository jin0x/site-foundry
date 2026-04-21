export type ImageAspectRatio = 'auto' | 'square' | 'video' | '4/3' | '3/2' | '21/9';

export type ImageFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

export type ImageRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export const IMAGE_ASPECT_RATIO_CLASSES: Record<ImageAspectRatio, string> = {
  auto: '',
  square: 'aspect-square',
  video: 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '21/9': 'aspect-[21/9]',
};

export const IMAGE_FIT_CLASSES: Record<ImageFit, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
  none: 'object-none',
  'scale-down': 'object-scale-down',
};

export const IMAGE_RADIUS_CLASSES: Record<ImageRadius, string> = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};
