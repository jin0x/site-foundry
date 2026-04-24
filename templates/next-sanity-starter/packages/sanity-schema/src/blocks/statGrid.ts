import { BarChartIcon } from '@sanity/icons';
import { defineArrayMember, defineField } from 'sanity';
import { defineBlockSchema } from '../shared/defineBlockSchema';
import { featureGridColumnOptions } from '../shared/options';

export const statGrid = defineBlockSchema({
  name: 'block.statGrid',
  title: 'Stat Grid',
  description: 'Grid of headline stats — big accent number + short description per card.',
  icon: BarChartIcon,
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      validation: (rule) => rule.min(1).max(6),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              type: 'string',
              description: 'The big accent number — e.g. "50%", "5x", "XX".',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'numberSuffix',
              type: 'string',
              description: 'Inline text next to the number — e.g. "More trusted" beside "5x".',
            }),
            defineField({
              name: 'description',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: 'number',
              subtitle: 'description',
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
