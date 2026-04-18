import { ImageIcon } from '@sanity/icons';
import { defineField } from 'sanity';
import { defineBlockSchema } from '../shared/defineBlockSchema';
import { mediaPlacementOptions } from '../shared/options';

export const heroSplit = defineBlockSchema({
  name: 'block.heroSplit',
  title: 'Hero Split',
  description: 'Split hero with content on one side and media on the other.',
  icon: ImageIcon,
  withCtas: true,
  fields: [
    defineField({
      name: 'description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'media',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'mediaPlacement',
      type: 'string',
      group: 'presentation',
      options: {
        list: mediaPlacementOptions,
        layout: 'radio',
      },
      initialValue: 'right',
    }),
  ],
});
