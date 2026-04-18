#!/usr/bin/env node

import { createProjectProfile, createRunRecord, type SourceType } from '@site-foundry/registry-contracts';
import { buildGenerationPlan } from '@site-foundry/generator-core';
import { buildNextSanityArtifacts } from '@site-foundry/generator-next-sanity';

function printHelp(): void {
  console.log(`Site Foundry CLI

Usage:
  sf registry list
  sf registry inspect <id>
  sf project create <slug>
  sf project link <slug>
  sf generate figma <source>
  sf generate screenshot <source>
  sf generate url <source>
  sf review run <id>
  sf apply run <id>
`);
}

function readPositional(args: string[], index: number, label: string): string {
  const value = args[index];
  if (!value) {
    throw new Error(`Missing required argument: ${label}`);
  }
  return value;
}

function handleGenerate(sourceType: SourceType, sourceRef: string): void {
  const profile = createProjectProfile({
    id: 'project.local-demo',
    name: 'Local Demo',
    slug: 'local-demo',
  });

  const run = createRunRecord({
    id: `run_${Date.now()}`,
    projectProfileId: profile.id,
    sourceType,
    sourceRef,
    triggeredBy: 'operator',
  });

  const plan = buildGenerationPlan({
    project: profile,
    sourceType,
    sourceRef,
  });
  const artifacts = buildNextSanityArtifacts(plan);

  console.log(JSON.stringify({ run, plan, artifacts }, null, 2));
}

function main(): void {
  const args = process.argv.slice(2);
  const group = args[0];
  const command = args[1];

  if (!group) {
    printHelp();
    return;
  }

  if (group === 'registry' && command === 'list') {
    console.log('No registry items have been installed yet.');
    return;
  }

  if (group === 'registry' && command === 'inspect') {
    const id = readPositional(args, 2, 'id');
    console.log(`Registry inspection is not wired yet for "${id}".`);
    return;
  }

  if (group === 'project' && command === 'create') {
    const slug = readPositional(args, 2, 'slug');
    const profile = createProjectProfile({
      id: `project.${slug}`,
      name: slug,
      slug,
    });
    console.log(JSON.stringify(profile, null, 2));
    return;
  }

  if (group === 'project' && command === 'link') {
    const slug = readPositional(args, 2, 'slug');
    console.log(`Project link placeholder for "${slug}".`);
    return;
  }

  if (group === 'generate' && command === 'figma') {
    handleGenerate('figma', readPositional(args, 2, 'source'));
    return;
  }

  if (group === 'generate' && command === 'screenshot') {
    handleGenerate('screenshot', readPositional(args, 2, 'source'));
    return;
  }

  if (group === 'generate' && command === 'url') {
    handleGenerate('url', readPositional(args, 2, 'source'));
    return;
  }

  if (group === 'review' && command === 'run') {
    const id = readPositional(args, 2, 'id');
    console.log(`Review placeholder for run "${id}".`);
    return;
  }

  if (group === 'apply' && command === 'run') {
    const id = readPositional(args, 2, 'id');
    console.log(`Apply placeholder for run "${id}".`);
    return;
  }

  printHelp();
}

main();
