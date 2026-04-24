import { ImageIcon } from '@sanity/icons';
import { defineField } from 'sanity';
import { defineBlockSchema } from '../shared/defineBlockSchema';

export const heroCenter = defineBlockSchema({
  name: 'block.heroCenter',
  title: 'Hero Center',
  description:
    'Centered hero — heading + optional description + CTAs stack vertically over optional media. For heroes that anchor a centered headline over a composed graphic, code editor, diagram, or screenshot. Media can render below the content (default) or behind it as a full-width dimmed background.',
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
        list: [
          { title: 'Below content (default)', value: 'below' },
          { title: 'Background (full-width, dimmed)', value: 'background' },
        ],
        layout: 'radio',
      },
      initialValue: 'below',
    }),
  ],
});
