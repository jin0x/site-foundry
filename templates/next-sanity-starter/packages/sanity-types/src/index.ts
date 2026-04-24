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

export type HeroCenterMediaPlacement = 'below' | 'background';

export interface HeroCenterBlock extends BlockBase {
  _type: 'block.heroCenter';
  sectionHeading?: SectionHeadingValue | null;
  description?: string | null;
  media?: ImageWithAltValue | null;
  mediaPlacement?: HeroCenterMediaPlacement | null;
  ctas?: CtaValue[] | null;
}

export interface FeatureGridItem {
  eyebrow?: string | null;
  title: string;
  description?: string | null;
  icon?: ImageWithAltValue | null;
  media?: ImageWithAltValue | null;
  cta?: CtaValue | null;
}

export interface FeatureGridBlock extends BlockBase {
  _type: 'block.featureGrid';
  sectionHeading?: SectionHeadingValue | null;
  items?: FeatureGridItem[] | null;
  columns?: 2 | 3 | null;
}

export interface StatGridItem {
  number: string;
  numberSuffix?: string | null;
  description?: string | null;
}

export interface StatGridBlock extends BlockBase {
  _type: 'block.statGrid';
  sectionHeading?: SectionHeadingValue | null;
  items?: StatGridItem[] | null;
  columns?: 2 | 3 | null;
}

export interface RichTextBlock extends BlockBase {
  _type: 'block.richText';
  sectionHeading?: SectionHeadingValue | null;
  content?: PortableTextLike | null;
  ctas?: CtaValue[] | null;
}

export interface AccordionItemValue {
  title: string;
  body?: string | null;
  defaultOpen?: boolean | null;
}

export interface AccordionBlock extends BlockBase {
  _type: 'block.accordion';
  sectionHeading?: SectionHeadingValue | null;
  items?: AccordionItemValue[] | null;
}

export interface CodeSampleBlock extends BlockBase {
  _type: 'block.codeSample';
  sectionHeading?: SectionHeadingValue | null;
  filename?: string | null;
  language?: string | null;
  code?: string | null;
  caption?: string | null;
}

export type TabbedFeaturesContent = AccordionBlock | CodeSampleBlock | UseCaseListBlock;

export interface UseCaseListItem {
  label: string;
  href?: string | null;
  active?: boolean | null;
}

export interface UseCaseListBlock extends BlockBase {
  _type: 'block.useCaseList';
  items?: UseCaseListItem[] | null;
  featuredMedia?: ImageWithAltValue | null;
  featuredTitle?: string | null;
  featuredBody?: string | null;
}

export interface TabbedFeaturesGroup {
  label: string;
  content?: TabbedFeaturesContent[] | null;
}

export interface TabbedFeaturesBlock extends BlockBase {
  _type: 'block.tabbedFeatures';
  sectionHeading?: SectionHeadingValue | null;
  groups?: TabbedFeaturesGroup[] | null;
}

export type MarqueeSpeedValue = 'slow' | 'medium' | 'fast';

export interface LogoMarqueeItem {
  logo: ImageWithAltValue;
  name?: string | null;
  href?: string | null;
}

export interface LogoMarqueeBlock extends BlockBase {
  _type: 'block.logoMarquee';
  sectionHeading?: SectionHeadingValue | null;
  items?: LogoMarqueeItem[] | null;
  speed?: MarqueeSpeedValue | null;
  pauseOnHover?: boolean | null;
  fade?: boolean | null;
}

export type CalloutTone = 'default' | 'frosted' | 'accent';

export interface CalloutBlock extends BlockBase {
  _type: 'block.callout';
  sectionHeading?: SectionHeadingValue | null;
  description?: string | null;
  icon?: ImageWithAltValue | null;
  tone?: CalloutTone | null;
  ctas?: CtaValue[] | null;
}

export type TestimonialVariant = 'default' | 'featured' | 'video';
export type TestimonialsLayout = 'grid' | 'carousel';

export interface TestimonialItem {
  quote: string;
  name: string;
  role?: string | null;
  avatar?: ImageWithAltValue | null;
  variant?: TestimonialVariant | null;
  videoUrl?: string | null;
  thumbnail?: ImageWithAltValue | null;
}

export interface TestimonialsBlock extends BlockBase {
  _type: 'block.testimonials';
  sectionHeading?: SectionHeadingValue | null;
  items?: TestimonialItem[] | null;
  columns?: 2 | 3 | null;
  layout?: TestimonialsLayout | null;
  autoScrollMs?: number | null;
}

export type ComparisonBulletState = 'positive' | 'negative' | 'neutral';

export interface ComparisonBullet {
  label: string;
  state?: ComparisonBulletState | null;
}

export type ComparisonVariant = 'default' | 'featured';

export interface ComparisonItem {
  title: string;
  logo?: ImageWithAltValue | null;
  bullets?: ComparisonBullet[] | null;
  variant?: ComparisonVariant | null;
}

export interface ComparisonBlock extends BlockBase {
  _type: 'block.comparison';
  sectionHeading?: SectionHeadingValue | null;
  items?: ComparisonItem[] | null;
}

export interface VideoContentBlock extends BlockBase {
  _type: 'block.videoContent';
  sectionHeading?: SectionHeadingValue | null;
  videoUrl?: string | null;
  poster?: ImageWithAltValue | null;
  caption?: string | null;
}

export type PageBuilderBlock =
  | HeroSplitBlock
  | HeroCenterBlock
  | FeatureGridBlock
  | StatGridBlock
  | RichTextBlock
  | AccordionBlock
  | CodeSampleBlock
  | TabbedFeaturesBlock
  | LogoMarqueeBlock
  | CalloutBlock
  | TestimonialsBlock
  | ComparisonBlock
  | VideoContentBlock
  | UseCaseListBlock;

export interface PageDocument {
  _id: string;
  _type: 'page';
  title: string;
  slug?: string | null;
  pageBuilder?: PageBuilderBlock[] | null;
}
