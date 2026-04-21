import type { ImgHTMLAttributes } from 'react';
import type { ImageWithAltValue } from '@site-foundry-template/sanity-types';
import { cx } from '../../lib/cx';
import {
  IMAGE_ASPECT_RATIO_CLASSES,
  IMAGE_FIT_CLASSES,
  IMAGE_RADIUS_CLASSES,
  type ImageAspectRatio,
  type ImageFit,
  type ImageRadius,
} from './image-types';

type NativeImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;

export interface ImageProps extends NativeImgProps {
  src?: string;
  alt?: string;
  source?: ImageWithAltValue | null;
  aspectRatio?: ImageAspectRatio;
  fit?: ImageFit;
  rounded?: ImageRadius;
}

export function Image({
  src: srcProp,
  alt: altProp,
  source,
  aspectRatio = 'auto',
  fit = 'cover',
  rounded = 'none',
  className,
  ...rest
}: ImageProps) {
  const src = srcProp ?? source?.asset?.url ?? undefined;
  const alt = altProp ?? source?.alt ?? '';

  if (!src) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cx(
        'block w-full',
        IMAGE_ASPECT_RATIO_CLASSES[aspectRatio],
        IMAGE_FIT_CLASSES[fit],
        IMAGE_RADIUS_CLASSES[rounded],
        className,
      )}
      {...rest}
    />
  );
}
