/**
 * Quick verification: fetch a page's pageBuilder and print the block list.
 */

import { createSanityWriteClient } from '@site-foundry/sanity-kit';

export interface VerifiedPage {
  id: string;
  blocks: Array<{ key: string; type: string }>;
}

export async function verifyPageState(pageId: string): Promise<VerifiedPage | null> {
  const client = createSanityWriteClient();
  const page = await client.fetch<{
    _id: string;
    pageBuilder?: Array<{ _key: string; _type: string }>;
  } | null>(
    `*[_id == $id || _id == "drafts." + $id][0]{ _id, pageBuilder[]{_key,_type} }`,
    { id: pageId },
  );
  if (!page) return null;

  return {
    id: page._id,
    blocks: (page.pageBuilder || []).map((b) => ({ key: b._key, type: b._type })),
  };
}
