import { Fragment, type ReactNode } from 'react';
import type { AnyBlock, BlockComponentMap } from './types';
import { AccordionBlock } from './AccordionBlock/AccordionBlock';
import { AutoSwitchingCardsBlock } from './AutoSwitchingCardsBlock/AutoSwitchingCardsBlock';
import { CalloutBlock } from './CalloutBlock/CalloutBlock';
import { CodeSampleBlock } from './CodeSampleBlock/CodeSampleBlock';
import { ComparisonBlock } from './ComparisonBlock/ComparisonBlock';
import { HeroSplitBlock } from './HeroSplitBlock/HeroSplitBlock';
import { HeroCenterBlock } from './HeroCenterBlock/HeroCenterBlock';
import { FeatureGridBlock } from './FeatureGridBlock/FeatureGridBlock';
import { StatGridBlock } from './StatGridBlock/StatGridBlock';
import { LogoMarqueeBlock } from './LogoMarqueeBlock/LogoMarqueeBlock';
import { RichTextBlock } from './RichTextBlock/RichTextBlock';
import { TabbedFeaturesBlock } from './TabbedFeaturesBlock/TabbedFeaturesBlock';
import { TestimonialsBlock } from './TestimonialsBlock/TestimonialsBlock';
import { UseCaseListBlock } from './UseCaseListBlock/UseCaseListBlock';
import { VideoContentBlock } from './VideoContentBlock/VideoContentBlock';

export const REGISTRY: BlockComponentMap = {
  'block.accordion': AccordionBlock,
  'block.autoSwitchingCards': AutoSwitchingCardsBlock,
  'block.callout': CalloutBlock,
  'block.codeSample': CodeSampleBlock,
  'block.comparison': ComparisonBlock,
  'block.heroSplit': HeroSplitBlock,
  'block.heroCenter': HeroCenterBlock,
  'block.featureGrid': FeatureGridBlock,
  'block.statGrid': StatGridBlock,
  'block.logoMarquee': LogoMarqueeBlock,
  'block.richText': RichTextBlock,
  'block.tabbedFeatures': TabbedFeaturesBlock,
  'block.testimonials': TestimonialsBlock,
  'block.useCaseList': UseCaseListBlock,
  'block.videoContent': VideoContentBlock,
};

export interface BlockRendererProps {
  blocks?: AnyBlock[] | null;
  registry?: Partial<BlockComponentMap>;
  fallback?: (block: AnyBlock) => ReactNode;
}

export function BlockRenderer({ blocks, registry, fallback }: BlockRendererProps) {
  if (!blocks?.length) {
    return null;
  }

  const mergedRegistry = { ...REGISTRY, ...registry };

  return (
    <>
      {blocks.map((block) => {
        const Component = mergedRegistry[block._type as keyof BlockComponentMap];
        if (!Component) {
          return fallback ? <Fragment key={block._key}>{fallback(block)}</Fragment> : null;
        }
        return <Component key={block._key} {...(block as never)} />;
      })}
    </>
  );
}
