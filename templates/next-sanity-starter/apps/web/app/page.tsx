import { loadPageBySlug } from '../sanity/lib/loaders';
import { renderPage } from './renderPage';

export default async function HomePage() {
  const page = await loadPageBySlug('home');
  return renderPage(page);
}
