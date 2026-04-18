import { DocumentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { pageBuilderBlocks } from '../blocks';
import { seoField, slugField } from '../shared/sharedFields';

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'metadata', title: 'Metadata' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    slugField({ group: 'content' }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      group: 'content',
      of: pageBuilderBlocks,
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName) =>
                `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
            },
          ],
        },
      },
    }),
    seoField('metadata'),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare: ({ title, slug }) => ({
      title: title || 'Untitled',
      subtitle: slug ? `/${slug}` : undefined,
    }),
  },
});
