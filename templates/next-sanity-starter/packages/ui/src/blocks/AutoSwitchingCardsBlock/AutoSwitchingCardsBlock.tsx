'use client';

import { useEffect, useRef, useState } from 'react';
import type { AutoSwitchingCardsBlock as AutoSwitchingCardsBlockProps } from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';
import { cx } from '../../lib/cx';
import { Grid } from '../../primitives/Grid';
import { GridGap } from '../../primitives/Grid/grid-types';
import { Heading } from '../../primitives/Heading';
import { HeadingSize } from '../../primitives/Heading/heading-types';
import { Image } from '../../primitives/Image';
import { ImageFit, ImageRadius } from '../../primitives/Image/image-types';
import { Stack } from '../../primitives/Stack';
import { StackDirection, StackGap } from '../../primitives/Stack/stack-types';
import { Text } from '../../primitives/Text';
import { TextColor, TextSize } from '../../primitives/Text/text-types';

export function AutoSwitchingCardsBlock(props: AutoSwitchingCardsBlockProps) {
  const items = props.items ?? [];
  const autoAdvanceMs = props.autoAdvanceMs ?? 10000;
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (hovered || items.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, autoAdvanceMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hovered, items.length, autoAdvanceMs, active]);

  if (!items.length) return null;
  const activeItem = items[active];
  const rootKey = props._key ?? props._type;

  return (
    <BaseBlock block={props} framed>
      <Grid
        cols={{ mobile: 1, tablet: 1, desktop: 2 }}
        gap={GridGap.XL}
        className="items-start"
      >
        <Stack
          gap={StackGap.NONE}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {items.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={`${rootKey}-card-${i}`}
                type="button"
                onClick={() => setActive(i)}
                aria-current={isActive}
                className={cx(
                  'relative w-full text-left px-6 py-6 border-b border-[var(--color-code-border)] transition-colors',
                  isActive
                    ? 'bg-[var(--color-surface-elevated)]'
                    : 'bg-transparent hover:bg-[var(--color-surface-raised)]',
                )}
              >
                <Stack
                  direction={StackDirection.ROW}
                  gap={StackGap.MD}
                  className="items-start"
                >
                  {item.icon?.asset?.url ? (
                    <div className="w-10 h-10 flex-shrink-0">
                      <Image source={item.icon} fit={ImageFit.CONTAIN} rounded={ImageRadius.SM} />
                    </div>
                  ) : null}
                  <Stack gap={StackGap.XS} className="flex-1">
                    <Heading as="h3" size={HeadingSize.H4}>
                      {item.title}
                    </Heading>
                    {item.description ? (
                      <Text size={TextSize.SM} color={TextColor.MUTED}>
                        {item.description}
                      </Text>
                    ) : null}
                  </Stack>
                </Stack>
                {isActive ? (
                  <span
                    key={`progress-${active}-${hovered ? 'paused' : 'running'}`}
                    className={cx(
                      'absolute left-0 bottom-0 h-[2px] bg-[var(--color-brand-fuchsia)]',
                      hovered ? '' : 'animate-[progressBar_var(--advance-ms)_linear_forwards]',
                    )}
                    style={
                      {
                        width: hovered ? '100%' : undefined,
                        ['--advance-ms']: `${autoAdvanceMs}ms`,
                      } as React.CSSProperties
                    }
                  />
                ) : null}
              </button>
            );
          })}
        </Stack>
        <div className="relative rounded-xl overflow-hidden min-h-[400px] bg-[var(--color-surface-raised)]">
          {activeItem?.media?.asset?.url ? (
            <Image
              source={activeItem.media}
              fit={ImageFit.COVER}
              rounded={ImageRadius.NONE}
              className="w-full h-full block"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Text size={TextSize.SM} color={TextColor.MUTED}>
                {activeItem?.title ?? ''}
              </Text>
            </div>
          )}
        </div>
      </Grid>
    </BaseBlock>
  );
}
