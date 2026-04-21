export const ImageAspectRatio = {
  AUTO: 'auto',
  SQUARE: 'square',
  VIDEO: 'video',
  R4_3: '4/3',
  R3_2: '3/2',
  R21_9: '21/9',
} as const;
export type ImageAspectRatio = (typeof ImageAspectRatio)[keyof typeof ImageAspectRatio];

export const ImageFit = {
  COVER: 'cover',
  CONTAIN: 'contain',
  FILL: 'fill',
  NONE: 'none',
  SCALE_DOWN: 'scale-down',
} as const;
export type ImageFit = (typeof ImageFit)[keyof typeof ImageFit];

export const ImageRadius = {
  NONE: 'none',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  FULL: 'full',
} as const;
export type ImageRadius = (typeof ImageRadius)[keyof typeof ImageRadius];

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
