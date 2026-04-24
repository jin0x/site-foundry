import { InfoOutlineIcon } from '@sanity/icons';
import { defineField } from 'sanity';
import { defineBlockSchema } from '../shared/defineBlockSchema';

const toneOptions = [
  { title: 'Default (subtle raised card)', value: 'default' },
  { title: 'Frosted (dark card with backdrop blur)', value: 'frosted' },
  { title: 'Accent (brand-tinted gradient card)', value: 'accent' },
] as const;

export const callout = defineBlockSchema({
  name: 'block.callout',
  title: 'Callout',
  description:
    'Contained-card callout — centered heading + body + CTA over a distinct card frame. Use for in-page attention grabs, closer CTA banners, warning/info moments.',
  icon: InfoOutlineIcon,
  withCtas: true,
  fields: [
    defineField({
      name: 'description',
      type: 'text',
      rows: 4,
      description: 'Optional body paragraph below the heading. Renders centered inside the card.',
    }),
    defineField({
      name: 'icon',
      type: 'imageWithAlt',
      description: 'Optional icon / logo mark rendered above the heading.',
    }),
    defineField({
      name: 'tone',
      type: 'string',
      group: 'presentation',
      options: {
        list: toneOptions as unknown as { title: string; value: string }[],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
  ],
});
