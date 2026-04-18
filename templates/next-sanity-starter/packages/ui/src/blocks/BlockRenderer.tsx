import { Fragment, type ReactNode } from 'react';
import type { AnyBlock, BlockComponentMap } from './types';
import { HeroSplitBlock } from './HeroSplitBlock/HeroSplitBlock';
import { FeatureGridBlock } from './FeatureGridBlock/FeatureGridBlock';
import { RichTextBlock } from './RichTextBlock/RichTextBlock';

export const REGISTRY: BlockComponentMap = {
  'block.heroSplit': HeroSplitBlock,
  'block.featureGrid': FeatureGridBlock,
  'block.richText': RichTextBlock,
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
