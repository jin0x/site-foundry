export const IconBadgeSize = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;
export type IconBadgeSize = (typeof IconBadgeSize)[keyof typeof IconBadgeSize];

/**
 * Badge container + icon sizing. Icon is ~50% of the badge dimension so the
 * tonal background reads as a meaningful surround rather than a tight frame.
 */
export const ICON_BADGE_CONTAINER_CLASSES: Record<IconBadgeSize, string> = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
};

export const ICON_BADGE_ICON_CLASSES: Record<IconBadgeSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};
