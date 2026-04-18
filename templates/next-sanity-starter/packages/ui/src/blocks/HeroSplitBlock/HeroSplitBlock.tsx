import type { HeroSplitBlock as HeroSplitBlockProps } from '@site-foundry-template/sanity-types';
import { CtaButton } from '../../components/CtaButton';
import { HeadingGroup } from '../../components/HeadingGroup';
import { Section } from '../../components/Section';
import { Stack } from '../../primitives/Stack';

export function HeroSplitBlock(props: HeroSplitBlockProps) {
  const mediaFirst = props.mediaPlacement === 'left';

  return (
    <Section backgroundTone={props.backgroundTone} spacing={props.spacing}>
      <div className={['sf-hero-split', mediaFirst ? 'sf-hero-split--media-left' : 'sf-hero-split--media-right'].join(' ')}>
        <Stack className="sf-hero-split__content" gap="lg">
          <HeadingGroup value={props.sectionHeading} />
          {props.description ? <p className="sf-copy">{props.description}</p> : null}
          {props.ctas?.length ? (
            <div className="sf-cta-row">
              {props.ctas.map((cta, index) => (
                <CtaButton key={`${props._key || props._type}-${index}`} value={cta} />
              ))}
            </div>
          ) : null}
        </Stack>
        <div className="sf-hero-split__media">
          {props.media?.asset?.url ? (
            <img src={props.media.asset.url} alt={props.media.alt || ''} className="sf-media-frame" />
          ) : (
            <div className="sf-media-frame sf-media-frame--placeholder">
              <span>{props.media?.alt || 'Media placeholder'}</span>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
