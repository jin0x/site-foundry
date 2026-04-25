import type { HeroCenterBlock as HeroCenterBlockProps } from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';
import { CtaButton } from '../../components/CtaButton';
import { HeadingGroup } from '../../components/HeadingGroup';
import { SectionCta } from '../../components/SectionCta';
import { ButtonVariant } from '../../primitives/Button';
import { Image } from '../../primitives/Image';
import { ImageFit, ImageRadius } from '../../primitives/Image/image-types';
import { Stack } from '../../primitives/Stack';
import { StackAlign, StackGap } from '../../primitives/Stack/stack-types';
import { Text } from '../../primitives/Text';
import { TextColor, TextSize } from '../../primitives/Text/text-types';

export function HeroCenterBlock(props: HeroCenterBlockProps) {
  const placement = props.mediaPlacement ?? 'below';
  const isBackground = placement === 'background' && !!props.media?.asset?.url;

  if (isBackground) {
    const mediaUrl = props.media?.asset?.url ?? '';
    return (
      <section className="relative overflow-hidden isolate min-h-[600px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: `url(${mediaUrl})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/40 -z-10" aria-hidden="true" />
        <div className="relative w-full max-w-5xl mx-auto px-6 py-24 text-center text-white">
          <Stack gap={StackGap.LG} align={StackAlign.CENTER}>
            {props.sectionHeading ? (
              <HeadingGroup value={{ ...props.sectionHeading, align: 'center' }} />
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
                    variant={ButtonVariant.INVERSE_PRIMARY}
                  />
                ))}
              </SectionCta>
            ) : null}
          </Stack>
        </div>
      </section>
    );
  }

  return (
    <BaseBlock block={props} showHeading={false}>
      <Stack gap={StackGap.LG} align={StackAlign.CENTER} className="text-center">
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
