import type {
  ComparisonBlock as ComparisonBlockProps,
  ComparisonBulletState,
  ComparisonItem,
  ComparisonVariant,
} from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';
import { cx } from '../../lib/cx';
import { Card } from '../../primitives/Card';
import { CardPadding, CardRadius, CardVariant } from '../../primitives/Card/card-types';
import { Grid } from '../../primitives/Grid';
import { GridGap, type GridCols } from '../../primitives/Grid/grid-types';
import { Heading } from '../../primitives/Heading';
import { HeadingSize } from '../../primitives/Heading/heading-types';
import { Image } from '../../primitives/Image';
import { ImageFit } from '../../primitives/Image/image-types';
import { Stack } from '../../primitives/Stack';
import { StackGap } from '../../primitives/Stack/stack-types';
import { Text } from '../../primitives/Text';
import { TextColor, TextSize } from '../../primitives/Text/text-types';

const VARIANT_CLASSES: Record<ComparisonVariant, string> = {
  default: 'border border-[var(--color-code-border)] bg-[var(--color-surface-elevated)]',
  featured:
    'border border-[var(--color-brand-fuchsia)]/60 bg-[var(--color-surface-elevated)] shadow-[0_0_120px_0_color-mix(in_srgb,var(--color-brand-blue)_40%,transparent)]',
};

const BULLET_CLASSES: Record<ComparisonBulletState, string> = {
  positive:
    'bg-[color-mix(in_srgb,var(--color-brand-turquoise)_20%,transparent)] text-[var(--color-brand-turquoise)]',
  negative:
    'bg-[color-mix(in_srgb,var(--color-brand-fuchsia)_20%,transparent)] text-[var(--color-brand-fuchsia)]',
  neutral: 'bg-[var(--color-surface-raised)] text-[var(--color-tertiary)]',
};

function BulletIcon({ state }: { state: ComparisonBulletState }) {
  if (state === 'positive') {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-3 w-3">
        <path
          d="m5 10 3 3 7-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (state === 'negative') {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-3 w-3">
        <path
          d="m6 6 8 8m0-8-8 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />;
}

function BulletRow({ state, label }: { state: ComparisonBulletState; label: string }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={cx(
          'mt-0.5 shrink-0 inline-flex h-5 w-5 items-center justify-center rounded-full',
          BULLET_CLASSES[state],
        )}
      >
        <BulletIcon state={state} />
      </span>
      <Text size={TextSize.BASE} color={TextColor.MUTED} className="flex-1">
        {label}
      </Text>
    </div>
  );
}

function ComparisonCard({ item, cardKey }: { item: ComparisonItem; cardKey: string }) {
  const variant: ComparisonVariant = item.variant ?? 'default';
  const bullets = item.bullets ?? [];

  return (
    <Card
      as="article"
      variant={CardVariant.DEFAULT}
      padding={CardPadding.LG}
      radius={CardRadius.LG}
      className={cx('h-full', VARIANT_CLASSES[variant])}
    >
      <Stack gap={StackGap.LG} className="h-full">
        {item.logo?.asset?.url ? (
          <Image
            source={item.logo}
            fit={ImageFit.CONTAIN}
            className="h-8 w-auto max-w-[160px]"
          />
        ) : null}
        <Heading as="h3" size={HeadingSize.H3}>
          {item.title}
        </Heading>
        {bullets.length > 0 ? (
          <Stack gap={StackGap.SM}>
            {bullets.map((bullet, i) => (
              <BulletRow
                key={`${cardKey}-bullet-${i}`}
                state={bullet.state ?? 'neutral'}
                label={bullet.label}
              />
            ))}
          </Stack>
        ) : null}
      </Stack>
    </Card>
  );
}

export function ComparisonBlock(props: ComparisonBlockProps) {
  const items = props.items ?? [];
  if (!items.length) return null;
  const rootKey = props._key ?? props._type;
  const cols: GridCols = items.length === 2 ? 2 : items.length >= 3 ? 3 : 1;

  return (
    <BaseBlock block={props}>
      <Grid cols={cols} gap={GridGap.LG} className="items-stretch">
        {items.map((item, i) => (
          <ComparisonCard key={`${rootKey}-${i}`} cardKey={`${rootKey}-${i}`} item={item} />
        ))}
      </Grid>
    </BaseBlock>
  );
}
