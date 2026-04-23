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
import { Stack } from '../../primitives/Stack';
import { StackGap } from '../../primitives/Stack/stack-types';
import { Text } from '../../primitives/Text';
import { TextColor, TextSize } from '../../primitives/Text/text-types';

const VARIANT_CLASSES: Record<TestimonialVariant, string> = {
  default: 'border border-[var(--color-code-border)] bg-[var(--color-surface-elevated)]',
  featured:
    'border border-[var(--color-brand-fuchsia)]/60 bg-[var(--color-surface-elevated)] shadow-[0_0_120px_0_color-mix(in_srgb,var(--color-brand-blue)_40%,transparent)]',
};

function TestimonialCard({ item, cardKey }: { item: TestimonialItem; cardKey: string }) {
  const variant: TestimonialVariant = item.variant ?? 'default';
  const isFeatured = variant === 'featured';

  return (
    <Card
      as="article"
      variant={CardVariant.DEFAULT}
      padding={CardPadding.LG}
      radius={CardRadius.LG}
      className={cx('h-full', VARIANT_CLASSES[variant])}
      key={cardKey}
    >
      <Stack gap={StackGap.LG} className="h-full">
        <Text
          size={isFeatured ? TextSize.LG : TextSize.BASE}
          color={isFeatured ? TextColor.FOREGROUND : TextColor.MUTED}
          className="flex-1"
        >
          {`"${item.quote}"`}
        </Text>
        <div className="flex items-center gap-3">
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
        </div>
      </Stack>
    </Card>
  );
}

export function TestimonialsBlock(props: TestimonialsBlockProps) {
  const items = props.items ?? [];
  if (!items.length) return null;
  const rootKey = props._key ?? props._type;

  return (
    <BaseBlock block={props}>
      <Grid cols={props.columns ?? 3} gap={GridGap.LG} className="items-stretch">
        {items.map((item, i) => (
          <TestimonialCard
            key={`${rootKey}-${i}`}
            cardKey={`${rootKey}-${i}`}
            item={item}
          />
        ))}
      </Grid>
    </BaseBlock>
  );
}
