import type { GenerationPlan } from '@site-foundry/generator-core';

export type PlannedArtifact = {
  path: string;
  kind: 'frontend' | 'schema' | 'query' | 'seed';
  description: string;
};

export function buildNextSanityArtifacts(plan: GenerationPlan): PlannedArtifact[] {
  return [
    {
      path: 'apps/web/app/(content)/[slug]/page.tsx',
      kind: 'frontend',
      description: `Runtime route shell for source ${plan.sourceRef}`,
    },
    {
      path: 'packages/sanity-schema/src/blocks/generated-block.ts',
      kind: 'schema',
      description: 'Generated or selected block schema placeholder.',
    },
    {
      path: 'apps/web/sanity/lib/queries.ts',
      kind: 'query',
      description: 'Query fragment insertion placeholder.',
    },
    {
      path: 'seeds/generated-page.json',
      kind: 'seed',
      description: 'Seed artifact placeholder.',
    },
  ];
}
