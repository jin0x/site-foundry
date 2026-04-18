import type { ProjectProfile, SourceType } from '@site-foundry/registry-contracts';

export type GenerationPlan = {
  target: 'next-sanity';
  sourceType: SourceType;
  sourceRef: string;
  project: ProjectProfile;
  actions: Array<{
    kind: 'reuse-block' | 'generate-schema' | 'generate-query' | 'generate-seed';
    description: string;
  }>;
};

export function buildGenerationPlan(input: {
  project: ProjectProfile;
  sourceType: SourceType;
  sourceRef: string;
}): GenerationPlan {
  return {
    target: 'next-sanity',
    sourceType: input.sourceType,
    sourceRef: input.sourceRef,
    project: input.project,
    actions: [
      {
        kind: 'reuse-block',
        description: 'Attempt to match the source input against approved registry blocks.',
      },
      {
        kind: 'generate-schema',
        description: 'Materialize the schema contract for the selected page-builder blocks.',
      },
      {
        kind: 'generate-query',
        description: 'Emit query fragments for the generated or selected blocks.',
      },
      {
        kind: 'generate-seed',
        description: 'Create seed artifacts for Sanity content population.',
      },
    ],
  };
}
