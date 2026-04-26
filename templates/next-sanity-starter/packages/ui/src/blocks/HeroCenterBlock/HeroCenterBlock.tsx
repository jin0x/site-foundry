import type { HeroCenterBlock as HeroCenterBlockProps } from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';
import { CtaButton } from '../../components/CtaButton';
import { HeadingGroup } from '../../components/HeadingGroup';
import { SectionCta } from '../../components/SectionCta';
import { ButtonVariant } from '../../primitives/Button';
import { Container } from '../../primitives/Container';
import { HeadingSize, HeadingTag } from '../../primitives/Heading/heading-types';
import { Image } from '../../primitives/Image';
import { ImageFit, ImageRadius } from '../../primitives/Image/image-types';
import { Stack } from '../../primitives/Stack';
import { StackAlign, StackGap } from '../../primitives/Stack/stack-types';
import { Text } from '../../primitives/Text';
import { TextColor, TextSize } from '../../primitives/Text/text-types';

export function HeroCenterBlock(props: HeroCenterBlockProps) {
  const placement = props.mediaPlacement ?? 'below';
  const isBackground = placement === 'background' && !!props.media?.asset?.url;
  const heroHeadingSize = props.displayHeading ? HeadingSize.DISPLAY : HeadingSize.H1;

  if (isBackground) {
    const mediaUrl = props.media?.asset?.url ?? '';
    /* B12: hero is constrained to design's 1440px content width via Container
     * (set as `--container-max` in theme.css). Previously the outer <section>
     * had no max-width, causing the bg image to span the full viewport — Figma
     * design has the photo bound by the section's content frame, not edge-to-
     * edge. The bg-image div + tint overlay live inside the relative wrapper
     * so they fill the Container's content box. */
    return (
      <Container as="section" className="relative overflow-hidden isolate min-h-[600px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: `url(${mediaUrl})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/40 -z-10" aria-hidden="true" />
        <div className="relative w-full max-w-5xl mx-auto px-6 py-24 text-center text-white">
          <Stack gap={StackGap.LG} align={StackAlign.CENTER}>
            {props.sectionHeading ? (
              <HeadingGroup
                value={{ ...props.sectionHeading, align: 'center' }}
                headingAs={HeadingTag.H1}
                headingSize={heroHeadingSize}
              />
            ) : null}
            {props.description ? (
              <Text size={TextSize.LG} className="max-w-2xl text-white/90">
                {props.description}
              </Text>
            ) : null}
            {props.ctas?.length ? (
              <SectionCta>
                {props.ctas.map((cta, index) => (
                  <CtaButton
                    key={`${props._key || props._type}-${index}`}
                    value={cta}
                    /* Per-CTA variant via cta.color signal:
                     *  - color='light' (Hp 1 secondary, Pl 1 single CTA) → white-with-border
                     *  - else (color='primary'/'accent') → Navy primary */
                    variant={
                      cta.color === 'light'
                        ? ButtonVariant.INVERSE_SECONDARY
                        : ButtonVariant.INVERSE_PRIMARY
                    }
                  />
                ))}
              </SectionCta>
            ) : null}
          </Stack>
        </div>
      </Container>
    );
  }

  return (
    <BaseBlock block={props} showHeading={false} framed={!!props.framed}>
      <Stack gap={StackGap.LG} align={StackAlign.CENTER} className="text-center">
        {props.sectionHeading ? (
          <HeadingGroup
            value={{ ...props.sectionHeading, align: 'center' }}
            headingAs={HeadingTag.H1}
            headingSize={heroHeadingSize}
          />
        ) : null}
        {props.description ? (
          <Text size={TextSize.BASE} color={TextColor.MUTED} className="max-w-2xl">
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
        {props.media?.asset?.url ? (
          <Image
            source={props.media}
            fit={ImageFit.CONTAIN}
            rounded={ImageRadius.XL}
            className="mt-4 max-w-full"
          />
        ) : null}
      </Stack>
    </BaseBlock>
  );
}
