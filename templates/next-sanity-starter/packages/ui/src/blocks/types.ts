import type { JSX } from 'react';
import type {
  AccordionBlock,
  AutoSwitchingCardsBlock,
  CalloutBlock,
  CodeSampleBlock,
  ComparisonBlock,
  FeatureGridBlock,
  HeroCenterBlock,
  HeroSplitBlock,
  LogoMarqueeBlock,
  PageBuilderBlock,
  RichTextBlock,
  StatGridBlock,
  TabbedFeaturesBlock,
  TestimonialsBlock,
  UseCaseListBlock,
  VideoContentBlock,
} from '@site-foundry-template/sanity-types';

export type BlockMap = {
  'block.accordion': AccordionBlock;
  'block.autoSwitchingCards': AutoSwitchingCardsBlock;
  'block.callout': CalloutBlock;
  'block.codeSample': CodeSampleBlock;
  'block.comparison': ComparisonBlock;
  'block.featureGrid': FeatureGridBlock;
  'block.heroCenter': HeroCenterBlock;
  'block.heroSplit': HeroSplitBlock;
  'block.logoMarquee': LogoMarqueeBlock;
  'block.richText': RichTextBlock;
  'block.statGrid': StatGridBlock;
  'block.tabbedFeatures': TabbedFeaturesBlock;
  'block.testimonials': TestimonialsBlock;
  'block.useCaseList': UseCaseListBlock;
  'block.videoContent': VideoContentBlock;
};

export type BlockComponentMap = {
  [K in keyof BlockMap]: (props: BlockMap[K]) => JSX.Element | null;
};

export type AnyBlock = PageBuilderBlock;
