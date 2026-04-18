import type { StructureBuilder, StructureResolver } from 'sanity/structure';
import { CogIcon, DocumentIcon } from '@sanity/icons';

const hiddenDocTypes = ['settings', 'page'];

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(S.document().schemaType('settings').documentId('settings').title('Settings')),
      S.divider(),
      S.documentTypeListItem('page').title('Pages').icon(DocumentIcon),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId() ?? '';
        return !hiddenDocTypes.includes(id);
      }),
    ]);
