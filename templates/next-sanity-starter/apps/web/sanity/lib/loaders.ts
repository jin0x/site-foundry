import type { PageDocument } from '@site-foundry-template/sanity-types';
import { draftMode } from 'next/headers';
import { pageBySlugQuery } from './queries';
import { sanityFetch } from './live';

export async function loadPageBySlug(slug: string): Promise<PageDocument | null> {
  const isDraftMode = (await draftMode()).isEnabled;
  const result = await sanityFetch<PageDocument | null>({
    query: pageBySlugQuery,
    params: { slug },
    perspective: isDraftMode ? 'drafts' : 'published',
    tags: [`sanity:page:${slug}`, 'sanity:pages'],
  });

  return result.data;
}
