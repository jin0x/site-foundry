import { SplitVerticalIcon } from '@sanity/icons';
import { defineArrayMember, defineField } from 'sanity';
import { defineBlockSchema } from '../shared/defineBlockSchema';

export const tabbedFeatures = defineBlockSchema({
  name: 'block.tabbedFeatures',
  title: 'Tabbed Features',
  description:
    'Tabbed container — a pill-style tab filter switches between panes, each containing one or more nested blocks (accordion / code sample). Use for "each tab shows a different feature slice" layouts.',
  icon: SplitVerticalIcon,
  fields: [
    defineField({
      name: 'groups',
      type: 'array',
      validation: (rule) => rule.min(1).max(6),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              validation: (rule) => rule.required(),
              description: 'Tab label shown in the pill filter.',
            }),
            defineField({
              name: 'content',
              type: 'array',
              validation: (rule) => rule.min(1).max(4),
              of: [
                defineArrayMember({ type: 'block.accordion' }),
                defineArrayMember({ type: 'block.codeSample' }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'label',
            },
          },
        }),
      ],
    }),
  ],
});
