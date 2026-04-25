import { OlistIcon } from '@sanity/icons';
import { defineArrayMember, defineField } from 'sanity';
import { defineBlockSchema } from '../shared/defineBlockSchema';

export const useCaseList = defineBlockSchema({
  name: 'block.useCaseList',
  title: 'Use-Case List',
  description:
    'Two-column layout: left = a vertical list of use-case / industry items (each with arrow indicator), right = a featured media + title + short body. Designed to nest inside a tabbedFeatures group so each tab can switch the list and featured panel together, but also usable as a standalone block.',
  icon: OlistIcon,
  withSectionHeading: false,
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      validation: (rule) => rule.min(1).max(12),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              type: 'string',
              description: 'Optional destination — if absent, item renders as a non-link row.',
            }),
            defineField({
              name: 'active',
              type: 'boolean',
              description: 'Highlight this row as the featured/active item matching the media pane.',
              initialValue: false,
            }),
          ],
          preview: { select: { title: 'label' } },
        }),
      ],
    }),
    defineField({
      name: 'featuredMedia',
      type: 'imageWithAlt',
      description: 'The image shown in the right-hand pane (e.g. a scene photo).',
    }),
    defineField({
      name: 'featuredTitle',
      type: 'string',
      description: 'Caption heading overlaid/beneath the featured media.',
    }),
    defineField({
      name: 'featuredBody',
      type: 'text',
      rows: 3,
      description: 'Caption body under the featured title.',
    }),
  ],
});
