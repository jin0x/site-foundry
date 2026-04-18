import type { JSX } from 'react';
import type {
  FeatureGridBlock,
  HeroSplitBlock,
  PageBuilderBlock,
  RichTextBlock,
} from '@site-foundry-template/sanity-types';

export type BlockMap = {
  'block.featureGrid': FeatureGridBlock;
  'block.heroSplit': HeroSplitBlock;
  'block.richText': RichTextBlock;
};

export type BlockComponentMap = {
  [K in keyof BlockMap]: (props: BlockMap[K]) => JSX.Element | null;
};

export type AnyBlock = PageBuilderBlock;
