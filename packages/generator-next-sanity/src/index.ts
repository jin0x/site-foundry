import type { GenerationPlan } from '@site-foundry/generator-core';

export type PlannedArtifact = {
  path: string;
  kind: 'frontend' | 'studio' | 'schema' | 'query' | 'types' | 'seed';
  description: string;
};

export function buildNextSanityArtifacts(plan: GenerationPlan): PlannedArtifact[] {
  return [
    {
      path: 'templates/next-sanity-starter/apps/web/app/(content)/[slug]/page.tsx',
      kind: 'frontend',
      description: `Runtime route shell for source ${plan.sourceRef}`,
    },
    {
      path: 'templates/next-sanity-starter/apps/studio/sanity.config.ts',
      kind: 'studio',
      description: 'Studio control-plane entrypoint and presentation wiring placeholder.',
    },
    {
      path: 'templates/next-sanity-starter/packages/ui/src/blocks/generated-block.tsx',
      kind: 'frontend',
      description: 'Generated or selected React block placeholder.',
    },
    {
      path: 'templates/next-sanity-starter/packages/sanity-schema/src/blocks/generated-block.ts',
      kind: 'schema',
      description: 'Generated or selected block schema placeholder.',
    },
    {
      path: 'templates/next-sanity-starter/apps/web/sanity/lib/queries.ts',
      kind: 'query',
      description: 'Query fragment insertion placeholder.',
    },
    {
      path: 'templates/next-sanity-starter/packages/sanity-types/src/index.ts',
      kind: 'types',
      description: 'Type surface update placeholder until typegen is wired.',
    },
    {
      path: 'seeds/generated-page.json',
      kind: 'seed',
      description: 'Seed artifact placeholder.',
    },
  ];
}
