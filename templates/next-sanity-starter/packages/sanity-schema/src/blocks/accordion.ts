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
    defineField({
      name: 'sidebar',
      type: 'object',
      description:
        'Optional left-side support card rendered alongside the accordion. When present, the block renders in a 2-col layout with the sidebar on the left and the accordion on the right. Use for FAQ-style "Questions? Chat with support." layouts.',
      fields: [
        defineField({ name: 'heading', type: 'string' }),
        defineField({ name: 'description', type: 'text', rows: 2 }),
        defineField({
          name: 'avatar',
          type: 'imageWithAlt',
          description: 'Optional support-rep photo (48×48 circle).',
        }),
        defineField({ name: 'cta', type: 'cta' }),
      ],
    }),
  ],
});
