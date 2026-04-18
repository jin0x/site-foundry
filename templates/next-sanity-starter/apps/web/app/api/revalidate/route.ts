import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  const body = (await request.json()) as { tag?: string };
  const tag = body.tag || 'sanity:pages';

  revalidateTag(tag);

  return Response.json({ ok: true, tag });
}
