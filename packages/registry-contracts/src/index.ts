export type SourceType = 'figma' | 'screenshot' | 'url';

export type ProjectProfile = {
  id: string;
  name: string;
  slug: string;
  owner: string;
  status: 'draft' | 'active' | 'archived';
  stack: {
    frontend: 'nextjs';
    cms: 'sanity';
    styling: 'tailwind';
    deployment: 'vercel';
  };
};

export type GenerationRun = {
  id: string;
  projectProfileId: string;
  sourceType: SourceType;
  sourceRef: string;
  triggeredBy: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  stage: 'ingest' | 'plan' | 'materialize' | 'review' | 'apply';
  startedAt: string;
};

export type RegistryItem = {
  id: string;
  kind: 'token-pack' | 'primitive' | 'component' | 'block' | 'schema-pattern';
  name: string;
  status: 'experimental' | 'candidate' | 'approved' | 'deprecated';
  installStrategy: 'package' | 'source' | 'generated' | 'hybrid';
  supportedTargets: string[];
  summary: string;
};

export function createProjectProfile(input: Pick<ProjectProfile, 'id' | 'name' | 'slug'>): ProjectProfile {
  return {
    ...input,
    owner: 'RSH Studio',
    status: 'draft',
    stack: {
      frontend: 'nextjs',
      cms: 'sanity',
      styling: 'tailwind',
      deployment: 'vercel',
    },
  };
}

export function createRunRecord(
  input: Pick<GenerationRun, 'id' | 'projectProfileId' | 'sourceType' | 'sourceRef' | 'triggeredBy'>,
): GenerationRun {
  return {
    ...input,
    status: 'queued',
    stage: 'ingest',
    startedAt: new Date().toISOString(),
  };
}

export type SeedLinkKind = 'page' | 'href' | 'email' | 'file';

export type SeedLink = {
  kind: SeedLinkKind;
  page?: string | { _type: 'reference'; _ref: string };
  href?: string;
  email?: string;
  file?: unknown;
  openInNewTab?: boolean;
};

export type SeedCtaColor = 'primary' | 'accent' | 'light';
export type SeedCtaVariant = 'solid' | 'outline' | 'transparent';

export type SeedCta = {
  _type?: 'cta';
  enabled?: boolean;
  text: string;
  link: SeedLink;
  color?: SeedCtaColor;
  variant?: SeedCtaVariant;
};

export type SeedImageSpec = {
  topLevel?: string[];
  nested?: Array<{ arrayField: string; imageFields: string[] }>;
};

export type SeedArtifact = {
  figmaNodeId: string;
  /**
   * Figma file key for this seed. Required when any `images` entry uses the
   * Figma REST API path (`{ figmaNodeId, alt }` spec instead of `{ url, alt }`).
   * Extracted from the Figma URL: `figma.com/design/<fileKey>/...`.
   */
  figmaFileKey?: string;
  targetPage: string;
  blockType: string;
  fields: Record<string, unknown>;
  images?: SeedImageSpec;
  richText?: string[];
};

export const demoRegistry: RegistryItem[] = [
  {
    id: 'block.hero-split.media-right',
    kind: 'block',
    name: 'Hero Split Media Right',
    status: 'candidate',
    installStrategy: 'hybrid',
    supportedTargets: ['next-sanity'],
    summary: 'Two-column hero with content left and media right.',
  },
];
