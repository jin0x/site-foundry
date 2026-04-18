import { loadPageBySlug } from '../../../sanity/lib/loaders';
import { renderPage } from '../../renderPage';

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await loadPageBySlug(slug);
  return renderPage(page);
}
