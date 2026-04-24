import { ThLargeIcon } from '@sanity/icons';
import { defineArrayMember, defineField } from 'sanity';
import { defineBlockSchema } from '../shared/defineBlockSchema';
import { featureGridColumnOptions } from '../shared/options';

export const featureGrid = defineBlockSchema({
  name: 'block.featureGrid',
  title: 'Feature Grid',
  description: 'Grid of concise proof points or capabilities.',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      validation: (rule) => rule.min(1).max(6),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'eyebrow', type: 'string' }),
            defineField({
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'icon',
              type: 'imageWithAlt',
              description: 'Small icon/mark (48×48 slot) rendered above the title.',
            }),
            defineField({
              name: 'media',
              type: 'imageWithAlt',
              description: 'Larger per-item image/diagram (e.g. flowchart, screenshot) rendered below the description.',
            }),
            defineField({
              name: 'cta',
              type: 'cta',
            }),
            defineField({
              name: 'backgroundTone',
              type: 'string',
              description:
                'Per-item background tone. "inverse" uses a dark surface with light text (for dark tiles in an audience-split pattern). Defaults to "none" (same surface as the block).',
              options: {
                list: [
                  { title: 'None (default surface)', value: 'none' },
                  { title: 'Subtle (subtle raised)', value: 'subtle' },
                  { title: 'Inverse (dark tile with white text)', value: 'inverse' },
                ],
                layout: 'radio',
              },
              initialValue: 'none',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'eyebrow',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'columns',
      type: 'number',
      group: 'presentation',
      options: {
        list: featureGridColumnOptions,
        layout: 'radio',
      },
      initialValue: 3,
    }),
  ],
});
