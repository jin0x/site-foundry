'use client';

import { useEffect, useRef, useState } from 'react';
import type {
  TestimonialItem,
  TestimonialsBlock as TestimonialsBlockProps,
  TestimonialVariant,
} from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';
import { cx } from '../../lib/cx';
import { Avatar } from '../../primitives/Avatar';
import { AvatarSize } from '../../primitives/Avatar/avatar-types';
import { Card } from '../../primitives/Card';
import { CardPadding, CardRadius, CardVariant } from '../../primitives/Card/card-types';
import { Grid } from '../../primitives/Grid';
import { GridGap } from '../../primitives/Grid/grid-types';
import { Image } from '../../primitives/Image';
import { ImageFit, ImageRadius } from '../../primitives/Image/image-types';
import { Stack } from '../../primitives/Stack';
import { StackAlign, StackDirection, StackGap } from '../../primitives/Stack/stack-types';
import { Text } from '../../primitives/Text';
import { TextColor, TextSize } from '../../primitives/Text/text-types';

const VARIANT_CLASSES: Record<TestimonialVariant, string> = {
  default: 'border border-[var(--color-code-border)] bg-[var(--color-surface-elevated)]',
  featured:
    'border border-[var(--color-brand-fuchsia)]/60 bg-[var(--color-surface-elevated)] shadow-[0_0_120px_0_color-mix(in_srgb,var(--color-brand-blue)_40%,transparent)]',
  video: 'border border-[var(--color-code-border)] bg-[var(--color-surface-elevated)] overflow-hidden p-0',
};

function VideoCard({ item }: { item: TestimonialItem }) {
  const [playing, setPlaying] = useState(false);
  const thumbnail = item.thumbnail?.asset?.url;
  const videoUrl = item.videoUrl ?? undefined;

  return (
    <Card
      as="article"
      variant={CardVariant.DEFAULT}
      padding={CardPadding.NONE}
      radius={CardRadius.LG}
      className={cx('h-full', VARIANT_CLASSES.video)}
    >
      <div className="relative aspect-video bg-black">
        {playing && videoUrl ? (
          <video className="w-full h-full block" src={videoUrl} controls autoPlay playsInline />
        ) : (
          <>
            {thumbnail ? (
              <Image
                source={item.thumbnail}
                fit={ImageFit.COVER}
                rounded={ImageRadius.NONE}
                className="w-full h-full block"
              />
            ) : (
              <div className="w-full h-full bg-[var(--color-surface-raised)]" />
            )}
            <button
              type="button"
              onClick={() => videoUrl && setPlaying(true)}
              disabled={!videoUrl}
              className="absolute inset-0 flex items-center justify-center group"
              aria-label={videoUrl ? `Play video testimonial from ${item.name}` : 'Video unavailable'}
            >
              <span className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-black ml-0.5">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          </>
        )}
      </div>
      {(item.name || item.role) ? (
        <div className="p-6">
          <Text size={TextSize.BASE} color={TextColor.FOREGROUND}>
            {item.name}
          </Text>
          {item.role ? (
            <Text size={TextSize.SM} color={TextColor.MUTED}>
              {item.role}
            </Text>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
}

function TextCard({ item }: { item: TestimonialItem }) {
  const variant: TestimonialVariant = item.variant ?? 'default';
  const isFeatured = variant === 'featured';

  return (
    <Card
      as="article"
      variant={CardVariant.DEFAULT}
      padding={CardPadding.LG}
      radius={CardRadius.LG}
      className={cx('h-full', VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.default)}
    >
      <Stack gap={StackGap.LG} className="h-full">
        <Text
          size={isFeatured ? TextSize.LG : TextSize.BASE}
          color={isFeatured ? TextColor.FOREGROUND : TextColor.MUTED}
          className="flex-1"
        >
          {`"${item.quote}"`}
        </Text>
        <Stack direction={StackDirection.ROW} align={StackAlign.CENTER} gap={StackGap.SM}>
          <Avatar source={item.avatar} name={item.name} size={AvatarSize.MD} />
          <Stack gap={StackGap.NONE}>
            <Text size={TextSize.BASE} color={TextColor.FOREGROUND}>
              {item.name}
            </Text>
            {item.role ? (
              <Text size={TextSize.SM} color={TextColor.MUTED}>
                {item.role}
              </Text>
            ) : null}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}

function renderCard(item: TestimonialItem, key: string) {
  const variant = item.variant ?? 'default';
  return variant === 'video' ? <VideoCard key={key} item={item} /> : <TextCard key={key} item={item} />;
}

function Carousel({
  items,
  rootKey,
  autoScrollMs,
}: {
  items: TestimonialItem[];
  rootKey: string;
  autoScrollMs: number;
}) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (hovered || items.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, autoScrollMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hovered, items.length, autoScrollMs]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {items.map((item, i) => (
            <div
              key={`${rootKey}-slide-${i}`}
              className="w-full flex-shrink-0 px-2"
              aria-hidden={i !== active}
            >
              {renderCard(item, `${rootKey}-card-${i}`)}
            </div>
          ))}
        </div>
      </div>
      {items.length > 1 ? (
        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, i) => (
            <button
              key={`${rootKey}-dot-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === active}
              className={cx(
                'w-2 h-2 rounded-full transition-colors',
                i === active
                  ? 'bg-[var(--color-primary)]'
                  : 'bg-[var(--color-secondary)] opacity-40 hover:opacity-70',
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function TestimonialsBlock(props: TestimonialsBlockProps) {
  const items = props.items ?? [];
  if (!items.length) return null;
  const rootKey = props._key ?? props._type;
  const layout = props.layout ?? 'grid';
  const autoScrollMs = props.autoScrollMs ?? 6000;

  return (
    <BaseBlock block={props}>
      {layout === 'carousel' ? (
        <Carousel items={items} rootKey={rootKey} autoScrollMs={autoScrollMs} />
      ) : (
        <Grid cols={props.columns ?? 3} gap={GridGap.LG} className="items-stretch">
          {items.map((item, i) => renderCard(item, `${rootKey}-${i}`))}
        </Grid>
      )}
    </BaseBlock>
  );
}
