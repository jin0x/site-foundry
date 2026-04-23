import { CommentIcon } from '@sanity/icons';
import { defineArrayMember, defineField } from 'sanity';
import { defineBlockSchema } from '../shared/defineBlockSchema';
import { featureGridColumnOptions } from '../shared/options';

const variantOptions = [
  { title: 'Default', value: 'default' },
  { title: 'Featured (fuchsia border + blue glow, larger quote)', value: 'featured' },
] as const;

export const testimonials = defineBlockSchema({
  name: 'block.testimonials',
  title: 'Testimonials',
  description:
    'Row of testimonial cards — each carries a quote, author name, role, and optional avatar. Supports default + featured variants for "hero testimonial" emphasis.',
  icon: CommentIcon,
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
              name: 'quote',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'role',
              type: 'string',
              description: 'Optional — e.g. "CEO of Company Co."',
            }),
            defineField({
              name: 'avatar',
              type: 'imageWithAlt',
              description: 'Optional author portrait. Renders as a 52×52 circle.',
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
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'avatar',
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
