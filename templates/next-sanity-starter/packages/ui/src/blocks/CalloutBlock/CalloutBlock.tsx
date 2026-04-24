import type {
  CalloutBlock as CalloutBlockProps,
  CalloutLayout,
  CalloutTone,
} from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';
import { CtaButton } from '../../components/CtaButton';
import { HeadingGroup } from '../../components/HeadingGroup';
import { SectionCta } from '../../components/SectionCta';
import { Card } from '../../primitives/Card';
import { CardPadding, CardRadius, CardVariant } from '../../primitives/Card/card-types';
import { IconBadge } from '../../primitives/IconBadge';
import { IconBadgeSize } from '../../primitives/IconBadge/iconbadge-types';
import { Stack } from '../../primitives/Stack';
import { StackAlign, StackDirection, StackGap } from '../../primitives/Stack/stack-types';
import { Text } from '../../primitives/Text';
import { TextColor, TextSize } from '../../primitives/Text/text-types';

const TONE_CLASSES: Record<CalloutTone, string> = {
  default:
    'border border-[var(--color-code-border)] bg-[var(--color-surface-raised)]',
  frosted:
    'border border-white/10 bg-[color-mix(in_srgb,var(--color-surface-page)_60%,transparent)] backdrop-blur-xl',
  accent:
    'border border-[var(--color-brand-turquoise)]/30 bg-gradient-to-br from-[color-mix(in_srgb,var(--color-brand-turquoise)_10%,transparent)] to-[color-mix(in_srgb,var(--color-brand-fuchsia)_5%,transparent)]',
};

export function CalloutBlock(props: CalloutBlockProps) {
  const tone: CalloutTone = props.tone ?? 'default';
  const layout: CalloutLayout = props.layout ?? 'stacked';

  if (layout === 'horizontal') {
    return (
      <BaseBlock block={props} showHeading={false}>
        <Card
          variant={CardVariant.DEFAULT}
          padding={CardPadding.LG}
          radius={CardRadius.XL}
          className={TONE_CLASSES[tone]}
        >
          <Stack
            direction={StackDirection.ROW}
            align={StackAlign.CENTER}
            gap={StackGap.LG}
            className="justify-between flex-wrap"
          >
            <Stack gap={StackGap.SM} className="flex-1 min-w-0">
              {props.sectionHeading ? (
                <HeadingGroup value={{ ...props.sectionHeading, align: 'left' }} />
              ) : null}
              {props.description ? (
                <Text size={TextSize.BASE} color={TextColor.MUTED} className="max-w-2xl">
                  {props.description}
                </Text>
              ) : null}
            </Stack>
            {props.ctas?.length ? (
              <SectionCta>
                {props.ctas.map((cta, index) => (
                  <CtaButton key={`${props._key ?? props._type}-${index}`} value={cta} />
                ))}
              </SectionCta>
            ) : null}
          </Stack>
        </Card>
      </BaseBlock>
    );
  }

  return (
    <BaseBlock block={props} showHeading={false}>
      <Card
        variant={CardVariant.DEFAULT}
        padding={CardPadding.LG}
        radius={CardRadius.XL}
        className={TONE_CLASSES[tone]}
      >
        <Stack gap={StackGap.LG} align={StackAlign.CENTER} className="text-center">
          {props.icon?.asset?.url ? (
            <IconBadge source={props.icon} size={IconBadgeSize.MD} />
          ) : null}
          {props.sectionHeading ? (
            <HeadingGroup value={{ ...props.sectionHeading, align: 'center' }} />
          ) : null}
          {props.description ? (
            <Text size={TextSize.BASE} color={TextColor.MUTED} className="max-w-2xl">
              {props.description}
            </Text>
          ) : null}
          {props.ctas?.length ? (
            <SectionCta>
              {props.ctas.map((cta, index) => (
                <CtaButton key={`${props._key ?? props._type}-${index}`} value={cta} />
              ))}
            </SectionCta>
          ) : null}
        </Stack>
      </Card>
    </BaseBlock>
  );
}
