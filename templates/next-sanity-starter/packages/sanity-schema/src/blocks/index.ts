import type { ArrayOfType } from 'sanity';

export { featureGrid } from './featureGrid';
export { heroCenter } from './heroCenter';
export { heroSplit } from './heroSplit';
export { richText } from './richText';

export const pageBuilderBlocks: ArrayOfType[] = [
  { type: 'block.heroSplit' },
  { type: 'block.heroCenter' },
  { type: 'block.featureGrid' },
  { type: 'block.richText' },
];
