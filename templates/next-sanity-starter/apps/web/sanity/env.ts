export const sanityEnv = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'development',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-01',
  studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333',
  readToken: process.env.SANITY_API_READ_TOKEN,
};
