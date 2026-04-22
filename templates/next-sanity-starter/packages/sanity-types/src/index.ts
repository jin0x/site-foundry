export type PortableTextLike = Array<Record<string, unknown>>;

export type BackgroundTone = 'none' | 'subtle' | 'accent' | 'inverse';
export type SpacingSize = 'compact' | 'default' | 'roomy';
export type Alignment = 'left' | 'center';
export type LinkKind = 'page' | 'href' | 'email' | 'file';
export type CtaColor = 'primary' | 'accent' | 'light';
export type CtaVariant = 'solid' | 'outline' | 'transparent';
export type MediaPlacement = 'left' | 'right';

export interface SlugReference {
  _type?: string;
  slug?: string | null;
}

export interface FileValue {
  url?: string | null;
}

export interface LinkValue {
  kind: LinkKind;
  page?: SlugReference | null;
  href?: string | null;
  email?: string | null;
  file?: FileValue | null;
  openInNewTab?: boolean | null;
}

export interface CtaValue {
  enabled: boolean;
  text?: string | null;
  link?: LinkValue | null;
  color?: CtaColor | null;
  variant?: CtaVariant | null;
}

export interface SectionHeadingValue {
  enabled: boolean;
  eyebrow?: string | null;
  heading?: string | null;
  subheading?: PortableTextLike | null;
  align?: Alignment | null;
}

export interface ImageWithAltValue {
  alt?: string | null;
  caption?: string | null;
  asset?: {
    url?: string | null;
  } | null;
}

export interface BlockBase {
  _type: string;
  _key?: string;
  backgroundTone?: BackgroundTone | null;
  spacing?: SpacingSize | null;
}

export interface HeroSplitBlock extends BlockBase {
  _type: 'block.heroSplit';
  sectionHeading?: SectionHeadingValue | null;
  description?: string | null;
  media?: ImageWithAltValue | null;
  mediaPlacement?: MediaPlacement | null;
  ctas?: CtaValue[] | null;
}

export interface HeroCenterBlock extends BlockBase {
  _type: 'block.heroCenter';
  sectionHeading?: SectionHeadingValue | null;
  description?: string | null;
  media?: ImageWithAltValue | null;
  ctas?: CtaValue[] | null;
}

export interface FeatureGridItem {
  eyebrow?: string | null;
  title: string;
  description?: string | null;
  icon?: ImageWithAltValue | null;
  cta?: CtaValue | null;
}

export interface FeatureGridBlock extends BlockBase {
  _type: 'block.featureGrid';
  sectionHeading?: SectionHeadingValue | null;
  items?: FeatureGridItem[] | null;
  columns?: 2 | 3 | null;
}

export interface RichTextBlock extends BlockBase {
  _type: 'block.richText';
  sectionHeading?: SectionHeadingValue | null;
  content?: PortableTextLike | null;
  ctas?: CtaValue[] | null;
}

export type PageBuilderBlock = HeroSplitBlock | HeroCenterBlock | FeatureGridBlock | RichTextBlock;

export interface PageDocument {
  _id: string;
  _type: 'page';
  title: string;
  slug?: string | null;
  pageBuilder?: PageBuilderBlock[] | null;
}
