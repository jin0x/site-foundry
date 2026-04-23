import { TransferIcon } from '@sanity/icons';
import { defineArrayMember, defineField } from 'sanity';
import { defineBlockSchema } from '../shared/defineBlockSchema';

const bulletStateOptions = [
  { title: 'Positive (check)', value: 'positive' },
  { title: 'Negative (x)', value: 'negative' },
  { title: 'Neutral (dot)', value: 'neutral' },
] as const;

const variantOptions = [
  { title: 'Default', value: 'default' },
  { title: 'Featured (fuchsia border + blue glow)', value: 'featured' },
] as const;

export const comparison = defineBlockSchema({
  name: 'block.comparison',
  title: 'Comparison',
  description:
    'Side-by-side comparison of two or more options — each card carries a title, optional logo, and a list of bullets with per-bullet state (positive / negative / neutral). Use `featured` variant to emphasize the preferred option.',
  icon: TransferIcon,
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      validation: (rule) => rule.min(2).max(4),
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
              name: 'logo',
              type: 'imageWithAlt',
              description: 'Optional platform / product logo shown above the title.',
            }),
            defineField({
              name: 'bullets',
              type: 'array',
              validation: (rule) => rule.min(1).max(10),
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
                      name: 'state',
                      type: 'string',
                      options: {
                        list: bulletStateOptions as unknown as { title: string; value: string }[],
                        layout: 'radio',
                      },
                      initialValue: 'neutral',
                    }),
                  ],
                  preview: { select: { title: 'label', subtitle: 'state' } },
                }),
              ],
            }),
            defineField({
              name: 'variant',
              type: 'string',
              options: {
                list: variantOptions as unknown as { title: string; value: string }[],
                layout: 'radio',
              },
              initialValue: 'default',
            }),
          ],
          preview: {
            select: { title: 'title', media: 'logo' },
          },
        }),
      ],
    }),
  ],
});
