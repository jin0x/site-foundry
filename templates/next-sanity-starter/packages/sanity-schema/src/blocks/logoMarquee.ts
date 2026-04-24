import { AsteriskIcon } from '@sanity/icons';
import { defineArrayMember, defineField } from 'sanity';
import { defineBlockSchema } from '../shared/defineBlockSchema';

export const logoMarquee = defineBlockSchema({
  name: 'block.logoMarquee',
  title: 'Logo Marquee',
  description:
    'Horizontally scrolling row of customer / partner logos. Used as a trust marker (e.g. "Trusted by…"). Each logo is an image; optional href makes the logo clickable.',
  icon: AsteriskIcon,
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      validation: (rule) => rule.min(1).max(24),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'logo',
              type: 'imageWithAlt',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'name',
              type: 'string',
              description: 'Optional company / product name. Used as a fallback for the logo alt and for Studio preview.',
            }),
            defineField({
              name: 'href',
              type: 'url',
              description: 'Optional — wraps the logo in a link to the customer site.',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'logo',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'speed',
      type: 'string',
      group: 'presentation',
      options: {
        list: [
          { title: 'Slow', value: 'slow' },
          { title: 'Medium', value: 'medium' },
          { title: 'Fast', value: 'fast' },
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'pauseOnHover',
      type: 'boolean',
      group: 'presentation',
      initialValue: true,
    }),
    defineField({
      name: 'fade',
      type: 'boolean',
      group: 'presentation',
      description: 'Fade edges of the marquee into the background.',
      initialValue: true,
    }),
  ],
});
