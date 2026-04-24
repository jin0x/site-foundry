import type { SchemaTypeDefinition } from 'sanity';
import { blockContent } from './blockContent';
import { heroSplit, heroCenter, featureGrid, statGrid, richText, accordion, codeSample, tabbedFeatures, logoMarquee, callout, testimonials, comparison } from './blocks';
import { page } from './documents/page';
import { cta } from './objects/cta';
import { imageWithAlt } from './objects/imageWithAlt';
import { link } from './objects/link';
import { sectionHeading } from './objects/sectionHeading';
import { seo } from './objects/seo';
import { settings } from './singletons/settings';

export const schemaTypes: SchemaTypeDefinition[] = [
  blockContent,
  cta,
  imageWithAlt,
  link,
  sectionHeading,
  seo,
  heroSplit,
  heroCenter,
  featureGrid,
  statGrid,
  richText,
  accordion,
  codeSample,
  tabbedFeatures,
  logoMarquee,
  callout,
  testimonials,
  comparison,
  page,
  settings,
];

export { defineBlockSchema } from './shared/defineBlockSchema';
