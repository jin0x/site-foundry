import type { FeatureGridBlock as FeatureGridBlockProps } from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';
import { CtaButton } from '../../components/CtaButton';
import { Card } from '../../primitives/Card';
import { Eyebrow } from '../../primitives/Eyebrow';
import { Grid } from '../../primitives/Grid';
import { GridGap } from '../../primitives/Grid/grid-types';
import { Heading } from '../../primitives/Heading';
import { HeadingSize } from '../../primitives/Heading/heading-types';
import { Image } from '../../primitives/Image';
import { ImageFit, ImageRadius } from '../../primitives/Image/image-types';
import { Stack } from '../../primitives/Stack';
import { StackGap } from '../../primitives/Stack/stack-types';
import { Text } from '../../primitives/Text';
import { TextColor, TextSize } from '../../primitives/Text/text-types';

export function FeatureGridBlock(props: FeatureGridBlockProps) {
  return (
    <BaseBlock block={props}>
      <Grid cols={props.columns ?? 3} gap={GridGap.SM}>
        {props.items?.map((item, index) => (
          <Card as="article" key={`${props._key || props._type}-${index}`}>
            <Stack gap={StackGap.SM}>
              {item.icon?.asset?.url ? (
                <div className="w-12 h-12">
                  <Image source={item.icon} fit={ImageFit.CONTAIN} />
                </div>
              ) : null}
              {item.eyebrow ? <Eyebrow>{item.eyebrow}</Eyebrow> : null}
              <Heading as="h3" size={HeadingSize.H3}>
                {item.title}
              </Heading>
              {item.description ? (
                <Text size={TextSize.BASE} color={TextColor.MUTED}>
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
              {item.cta ? <CtaButton value={item.cta} /> : null}
            </Stack>
          </Card>
        ))}
      </Grid>
    </BaseBlock>
  );
}
