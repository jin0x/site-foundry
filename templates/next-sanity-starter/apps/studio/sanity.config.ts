import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';
import { assist } from '@sanity/assist';
import { schemaTypes } from '@site-foundry-template/sanity-schema';
import { structure } from './src/structure';
import { resolve } from './src/presentation/resolve';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '';
const dataset = process.env.SANITY_STUDIO_DATASET || 'development';
const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000';

if (!projectId) {
  throw new Error('SANITY_STUDIO_PROJECT_ID is required');
}

export default defineConfig({
  name: 'site-foundry-starter',
  title: 'Site Foundry Starter',
  projectId,
  dataset,
  basePath: '/',
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin: previewUrl,
        previewMode: { enable: '/api/draft-mode/enable' },
      },
      resolve,
    }),
    visionTool({ defaultApiVersion: '2026-04-01' }),
    codeInput(),
    assist(),
  ],
});
