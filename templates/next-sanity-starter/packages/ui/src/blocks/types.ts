import type { JSX } from 'react';
import type {
  AccordionBlock,
  CalloutBlock,
  CodeSampleBlock,
  FeatureGridBlock,
  HeroCenterBlock,
  HeroSplitBlock,
  LogoMarqueeBlock,
  PageBuilderBlock,
  RichTextBlock,
  TabbedFeaturesBlock,
} from '@site-foundry-template/sanity-types';

export type BlockMap = {
  'block.accordion': AccordionBlock;
  'block.callout': CalloutBlock;
  'block.codeSample': CodeSampleBlock;
  'block.featureGrid': FeatureGridBlock;
  'block.heroCenter': HeroCenterBlock;
  'block.heroSplit': HeroSplitBlock;
  'block.logoMarquee': LogoMarqueeBlock;
  'block.richText': RichTextBlock;
  'block.tabbedFeatures': TabbedFeaturesBlock;
};

export type BlockComponentMap = {
  [K in keyof BlockMap]: (props: BlockMap[K]) => JSX.Element | null;
};

export type AnyBlock = PageBuilderBlock;
