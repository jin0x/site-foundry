import { CommentIcon } from '@sanity/icons';
import { defineArrayMember, defineField } from 'sanity';
import { defineBlockSchema } from '../shared/defineBlockSchema';
import { featureGridColumnOptions } from '../shared/options';

const variantOptions = [
  { title: 'Default', value: 'default' },
  { title: 'Featured (fuchsia border + blue glow, larger quote)', value: 'featured' },
  { title: 'Video (thumbnail + play overlay)', value: 'video' },
] as const;

const layoutOptions = [
  { title: 'Grid (static)', value: 'grid' },
  { title: 'Carousel (auto-scroll + dot indicators)', value: 'carousel' },
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
            defineField({
              name: 'videoUrl',
              type: 'url',
              description: 'Video source URL when variant=video. Direct MP4/WebM for now; YouTube/Vimeo embed support is a follow-on.',
            }),
            defineField({
              name: 'thumbnail',
              type: 'imageWithAlt',
              description: 'Poster image shown before play on variant=video items.',
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
    defineField({
      name: 'layout',
      type: 'string',
      group: 'presentation',
      options: {
        list: layoutOptions as unknown as { title: string; value: string }[],
        layout: 'radio',
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'autoScrollMs',
      type: 'number',
      group: 'presentation',
      description: 'Carousel auto-advance interval in ms. Only applies when layout=carousel. Default 6000.',
      initialValue: 6000,
    }),
  ],
});
