import type { HeroSplitBlock as HeroSplitBlockProps } from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';
import { CtaButton } from '../../components/CtaButton';
import { HeadingGroup } from '../../components/HeadingGroup';
import { SectionCta } from '../../components/SectionCta';
import { Image } from '../../primitives/Image';
import { Stack } from '../../primitives/Stack';
import { Text } from '../../primitives/Text';
import { cx } from '../../lib/cx';

const PLACEHOLDER_STYLE = {
  background:
    'linear-gradient(135deg, color-mix(in srgb, var(--color-brand-turquoise) 16%, transparent), color-mix(in srgb, var(--color-primary) 4%, transparent))',
};

export function HeroSplitBlock(props: HeroSplitBlockProps) {
  const mediaFirst = props.mediaPlacement === 'left';

  return (
    <BaseBlock block={props} showHeading={false}>
      <div className="grid gap-8 items-center lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
        <Stack gap="lg" className="max-w-xl">
          <HeadingGroup value={props.sectionHeading} />
          {props.description ? (
            <Text size="base" color="muted">
              {props.description}
            </Text>
          ) : null}
          {props.ctas?.length ? (
            <SectionCta>
              {props.ctas.map((cta, index) => (
                <CtaButton key={`${props._key || props._type}-${index}`} value={cta} />
              ))}
            </SectionCta>
          ) : null}
        </Stack>
        <div className={cx(mediaFirst && 'order-first')}>
          {props.media?.asset?.url ? (
            <Image
              source={props.media}
              aspectRatio="4/3"
              fit="cover"
              rounded="xl"
              className="border border-[var(--color-code-border)]"
            />
          ) : (
            <div
              className="aspect-[4/3] grid place-items-center rounded-xl border border-[var(--color-code-border)] p-8 text-[var(--color-secondary)]"
              style={PLACEHOLDER_STYLE}
            >
              <span>{props.media?.alt || 'Media placeholder'}</span>
            </div>
          )}
        </div>
      </div>
    </BaseBlock>
  );
}
