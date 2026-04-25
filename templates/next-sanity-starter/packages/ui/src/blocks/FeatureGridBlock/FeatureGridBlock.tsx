import type {
  FeatureGridBlock as FeatureGridBlockProps,
  FeatureGridItemTone,
} from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';
import { CtaButton } from '../../components/CtaButton';
import { Card } from '../../primitives/Card';
import { CardPadding } from '../../primitives/Card/card-types';
import { Eyebrow } from '../../primitives/Eyebrow';
import { Grid } from '../../primitives/Grid';
import { GridGap } from '../../primitives/Grid/grid-types';
import { Heading } from '../../primitives/Heading';
import { HeadingColor, HeadingSize } from '../../primitives/Heading/heading-types';
import { Image } from '../../primitives/Image';
import { ImageFit, ImageRadius } from '../../primitives/Image/image-types';
import { Stack } from '../../primitives/Stack';
import { StackGap } from '../../primitives/Stack/stack-types';
import { Text } from '../../primitives/Text';
import { TextColor, TextSize } from '../../primitives/Text/text-types';
import { cx } from '../../lib/cx';

const TONE_CARD_CLASSES: Record<FeatureGridItemTone, string> = {
  none: '',
  subtle: 'bg-[var(--color-surface-raised)]',
  inverse: 'bg-[var(--color-surface-inverse)] text-[var(--color-inverse)]',
};

export function FeatureGridBlock(props: FeatureGridBlockProps) {
  return (
    <BaseBlock block={props}>
      <Grid cols={props.columns ?? 3} gap={GridGap.SM}>
        {props.items?.map((item, index) => {
          const tone: FeatureGridItemTone = item.backgroundTone ?? 'none';
          const isInverse = tone === 'inverse';
          const headingColor = isInverse ? HeadingColor.WHITE : undefined;
          const bodyColor = isInverse ? TextColor.WHITE : TextColor.MUTED;

          return (
            <Card
              as="article"
              key={`${props._key || props._type}-${index}`}
              padding={CardPadding.LG}
              className={cx('h-full flex flex-col', TONE_CARD_CLASSES[tone])}
            >
              <Stack gap={StackGap.SM} className="flex-1">
                {item.icon?.asset?.url ? (
                  <div className="w-12 h-12">
                    <Image source={item.icon} fit={ImageFit.CONTAIN} />
                  </div>
                ) : null}
                {item.eyebrow ? <Eyebrow>{item.eyebrow}</Eyebrow> : null}
                <Heading as="h3" size={HeadingSize.H3} color={headingColor}>
                  {item.title}
                </Heading>
                {item.description ? (
                  <Text size={TextSize.BASE} color={bodyColor}>
                    {item.description}
                  </Text>
                ) : null}
                {item.media?.asset?.url ? (
                  <Image
                    source={item.media}
                    fit={ImageFit.CONTAIN}
                    rounded={ImageRadius.MD}
                    className="mt-2 w-full"
                  />
                ) : null}
              </Stack>
              {item.cta ? (
                <div className="mt-6">
                  <CtaButton value={item.cta} />
                </div>
              ) : null}
            </Card>
          );
        })}
      </Grid>
    </BaseBlock>
  );
}
