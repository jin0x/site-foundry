import { SwitchHorizontalIcon } from '@sanity/icons';
import { defineArrayMember, defineField } from 'sanity';
import { defineBlockSchema } from '../shared/defineBlockSchema';

export const autoSwitchingCards = defineBlockSchema({
  name: 'block.autoSwitchingCards',
  title: 'Auto-Switching Cards',
  description:
    'Pillar section — selectable cards on the left (icon + title + description) with a media panel on the right that swaps to match the active card. Auto-advances on a timer; click to swap; hover pauses. Use for "how it works" / "core pillars" marketing sections that anchor the page with visual interest.',
  icon: SwitchHorizontalIcon,
  withCtas: true,
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      validation: (rule) => rule.min(2).max(6),
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
              name: 'description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'icon',
              type: 'imageWithAlt',
              description: 'Small icon (48×48 slot) shown on the left of the card.',
            }),
            defineField({
              name: 'media',
              type: 'imageWithAlt',
              description: 'Media shown in the right-hand panel when this card is active.',
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        }),
      ],
    }),
    defineField({
      name: 'autoAdvanceMs',
      type: 'number',
      group: 'presentation',
      description: 'Auto-advance interval in ms. Default 10000.',
      initialValue: 10000,
    }),
  ],
});
