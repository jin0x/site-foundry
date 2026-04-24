import { DragHandleIcon } from '@sanity/icons';
import { defineArrayMember, defineField } from 'sanity';
import { defineBlockSchema } from '../shared/defineBlockSchema';

export const accordion = defineBlockSchema({
  name: 'block.accordion',
  title: 'Accordion',
  description:
    'Collapsible list — FAQ, step-by-step, or a feature-list where each item expands to show a body paragraph. Default closed; mark the lead item with defaultOpen to anchor the list.',
  icon: DragHandleIcon,
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
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'body',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'defaultOpen',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'body',
            },
          },
        }),
      ],
    }),
  ],
});
