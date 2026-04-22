import type { LogoMarqueeBlock as LogoMarqueeBlockProps } from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';
import { Image } from '../../primitives/Image';
import { ImageFit } from '../../primitives/Image/image-types';
import { Marquee } from '../../primitives/Marquee';
import { MarqueeGap, MarqueeSpeed } from '../../primitives/Marquee/marquee-types';

const SPEED_MAP = {
  slow: MarqueeSpeed.SLOW,
  medium: MarqueeSpeed.MEDIUM,
  fast: MarqueeSpeed.FAST,
} as const;

export function LogoMarqueeBlock(props: LogoMarqueeBlockProps) {
  const items = props.items ?? [];
  if (!items.length) return null;
  const speed = SPEED_MAP[props.speed ?? 'medium'];

  return (
    <BaseBlock block={props}>
      <Marquee
        speed={speed}
        gap={MarqueeGap.XL}
        pauseOnHover={props.pauseOnHover ?? true}
        fade={props.fade ?? true}
      >
        {items.map((item, i) => {
          if (!item.logo?.asset?.url) return null;
          const key = `${props._key ?? props._type}-${i}`;
          const alt = item.logo.alt || item.name || '';
          const logoImage = (
            <Image
              source={{ ...item.logo, alt }}
              fit={ImageFit.CONTAIN}
              className="h-12 w-auto max-w-none"
            />
          );
          if (item.href) {
            return (
              <a
                key={key}
                href={item.href}
                className="shrink-0 flex items-center"
                target="_blank"
                rel="noreferrer"
              >
                {logoImage}
              </a>
            );
          }
          return (
            <span key={key} className="shrink-0 flex items-center">
              {logoImage}
            </span>
          );
        })}
      </Marquee>
    </BaseBlock>
  );
}
