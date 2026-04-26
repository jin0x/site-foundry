import type { AccordionBlock as AccordionBlockProps } from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';
import { CtaButton } from '../../components/CtaButton';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionType,
} from '../../primitives/Accordion';
import { Avatar } from '../../primitives/Avatar';
import { AvatarSize } from '../../primitives/Avatar/avatar-types';
import { ButtonVariant } from '../../primitives/Button';
import { Card } from '../../primitives/Card';
import { CardPadding, CardRadius, CardVariant } from '../../primitives/Card/card-types';
import { Grid } from '../../primitives/Grid';
import { GridGap } from '../../primitives/Grid/grid-types';
import { Heading } from '../../primitives/Heading';
import { HeadingSize } from '../../primitives/Heading/heading-types';
import { Stack } from '../../primitives/Stack';
import { StackGap } from '../../primitives/Stack/stack-types';
import { Text } from '../../primitives/Text';
import { TextColor, TextSize } from '../../primitives/Text/text-types';

/**
 * Inner render — omits the BaseBlock section shell so this can be composed
 * inside other blocks (e.g. a tabbedFeatures tab pane) without double-wrapping
 * padding / sectionHeading.
 */
export function AccordionBlockContent(props: AccordionBlockProps) {
  const items = props.items ?? [];
  if (!items.length) return null;

  const defaultValue = items.findIndex((item) => item.defaultOpen);
  const defaultOpenKey = defaultValue >= 0 ? `item-${defaultValue}` : undefined;

  return (
    <Accordion type={AccordionType.SINGLE} defaultValue={defaultOpenKey}>
      {items.map((item, index) => (
        <AccordionItem key={`${props._key ?? props._type}-${index}`} value={`item-${index}`}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          {item.body ? <AccordionContent>{item.body}</AccordionContent> : null}
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function AccordionSidebarCard({ sidebar }: { sidebar: NonNullable<AccordionBlockProps['sidebar']> }) {
  return (
    <Stack gap={StackGap.LG}>
      {sidebar.heading ? (
        <Heading as="h3" size={HeadingSize.H2}>
          {sidebar.heading}
        </Heading>
      ) : null}
      {(sidebar.avatar || sidebar.description || sidebar.cta) ? (
        <Card
          as="aside"
          variant={CardVariant.SUBTLE}
          padding={CardPadding.LG}
          radius={CardRadius.LG}
          className="self-start w-full max-w-sm"
        >
          <Stack gap={StackGap.MD}>
            {sidebar.avatar?.asset?.url ? (
              <div className="relative inline-flex">
                <Avatar source={sidebar.avatar} size={AvatarSize.MD} />
                {/* Online status dot — Decisions design has a 10px green
                 * indicator at top-right of the support avatar (~29px,0
                 * offset from avatar center per Hp 12 evidence). */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 right-0 size-[10px] rounded-full bg-[var(--color-success-100)] ring-2 ring-[var(--color-surface-page)]"
                />
              </div>
            ) : null}
            {sidebar.description ? (
              <Stack gap={StackGap.XS}>
                <Text size={TextSize.BASE} color={TextColor.FOREGROUND}>
                  Need help?
                </Text>
                <Text size={TextSize.SM} color={TextColor.MUTED}>
                  {sidebar.description}
                </Text>
              </Stack>
            ) : null}
            {/* Design pattern: accordion sidebar's "support" CTA always
             * renders as a Navy rect primary across both pages. */}
            {sidebar.cta ? (
              <CtaButton value={sidebar.cta} variant={ButtonVariant.INVERSE_PRIMARY} />
            ) : null}
          </Stack>
        </Card>
      ) : null}
    </Stack>
  );
}

export function AccordionBlock(props: AccordionBlockProps) {
  const hasSidebar =
    !!props.sidebar &&
    (props.sidebar.heading ||
      props.sidebar.description ||
      props.sidebar.avatar ||
      props.sidebar.cta);

  if (hasSidebar && props.sidebar) {
    return (
      <BaseBlock block={{ ...props, sectionHeading: undefined }} showHeading={false}>
        <Grid cols={{ mobile: 1, tablet: 1, desktop: 2 }} gap={GridGap.XL} className="items-start">
          <AccordionSidebarCard sidebar={props.sidebar} />
          <AccordionBlockContent {...props} />
        </Grid>
      </BaseBlock>
    );
  }

  return (
    <BaseBlock block={props}>
      <AccordionBlockContent {...props} />
    </BaseBlock>
  );
}
