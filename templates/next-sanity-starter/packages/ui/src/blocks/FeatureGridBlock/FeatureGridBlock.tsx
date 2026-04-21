import type { FeatureGridBlock as FeatureGridBlockProps } from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';
import { Card } from '../../primitives/Card';
import { Eyebrow } from '../../primitives/Eyebrow';
import { Grid } from '../../primitives/Grid';
import { Heading } from '../../primitives/Heading';
import { Stack } from '../../primitives/Stack';
import { Text } from '../../primitives/Text';

export function FeatureGridBlock(props: FeatureGridBlockProps) {
  return (
    <BaseBlock block={props}>
      <Grid cols={props.columns ?? 3} gap="sm">
        {props.items?.map((item, index) => (
          <Card as="article" key={`${props._key || props._type}-${index}`}>
            <Stack gap="sm">
              {item.eyebrow ? <Eyebrow>{item.eyebrow}</Eyebrow> : null}
              <Heading as="h3" size="h3">
                {item.title}
              </Heading>
              {item.description ? (
                <Text size="base" color="muted">
                  {item.description}
                </Text>
              ) : null}
            </Stack>
          </Card>
        ))}
      </Grid>
    </BaseBlock>
  );
}
