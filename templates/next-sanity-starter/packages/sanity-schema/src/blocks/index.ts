import type { ArrayOfType } from 'sanity';

export { accordion } from './accordion';
export { codeSample } from './codeSample';
export { featureGrid } from './featureGrid';
export { heroCenter } from './heroCenter';
export { heroSplit } from './heroSplit';
export { richText } from './richText';
export { tabbedFeatures } from './tabbedFeatures';

export const pageBuilderBlocks: ArrayOfType[] = [
  { type: 'block.heroSplit' },
  { type: 'block.heroCenter' },
  { type: 'block.featureGrid' },
  { type: 'block.richText' },
  { type: 'block.tabbedFeatures' },
  { type: 'block.accordion' },
  { type: 'block.codeSample' },
];
