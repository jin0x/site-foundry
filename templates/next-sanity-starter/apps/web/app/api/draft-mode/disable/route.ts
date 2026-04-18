import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pathname = url.searchParams.get('pathname') || '/';

  (await draftMode()).disable();
  redirect(pathname);
}
