import type { StatGridBlock as StatGridBlockProps } from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';
import { Card } from '../../primitives/Card';
import { Grid } from '../../primitives/Grid';
import { GridGap } from '../../primitives/Grid/grid-types';
import { Heading } from '../../primitives/Heading';
import { HeadingSize, HeadingColor } from '../../primitives/Heading/heading-types';
import { Stack } from '../../primitives/Stack';
import { StackGap, StackDirection, StackAlign } from '../../primitives/Stack/stack-types';
import { Text } from '../../primitives/Text';
import { TextColor, TextSize } from '../../primitives/Text/text-types';

export function StatGridBlock(props: StatGridBlockProps) {
  return (
    <BaseBlock block={props}>
      <Grid cols={props.columns ?? 3} gap={GridGap.NONE}>
        {props.items?.map((item, index) => (
          <Card
            as="article"
            key={`${props._key || props._type}-${index}`}
            className="border-l border-[var(--color-surface-raised)] first:border-l-0 p-12"
          >
            <Stack gap={StackGap.LG}>
              <Stack direction={StackDirection.ROW} gap={StackGap.SM} align={StackAlign.CENTER}>
                <Heading
                  as="p"
                  size={HeadingSize.H1}
                  color={HeadingColor.ROSE}
                  className="font-light whitespace-nowrap"
                >
                  {item.number}
                </Heading>
                {item.numberSuffix ? (
                  <Text size={TextSize.MD} color={TextColor.MUTED}>
                    {item.numberSuffix}
                  </Text>
                ) : null}
              </Stack>
              {item.description ? (
                <Text size={TextSize.SM} color={TextColor.MUTED} className="max-w-md">
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
