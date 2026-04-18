import { BlockRenderer, Container } from '@site-foundry-template/ui';
import type { PageDocument } from '@site-foundry-template/sanity-types';

export function renderPage(page: PageDocument | null) {
  if (!page) {
    return (
      <Container as="main" className="sf-page-shell">
        <h1>Missing page</h1>
        <p>Create a page document in Sanity to populate this route.</p>
      </Container>
    );
  }

  return (
    <main>
      <BlockRenderer blocks={page.pageBuilder} />
    </main>
  );
}
