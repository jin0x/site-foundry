import { ImageIcon } from '@sanity/icons';
import { defineField } from 'sanity';
import { defineBlockSchema } from '../shared/defineBlockSchema';

export const heroCenter = defineBlockSchema({
  name: 'block.heroCenter',
  title: 'Hero Center',
  description:
    'Centered hero — heading + optional description + CTAs stack vertically over optional media below. For heroes that anchor a centered headline over a composed graphic, code editor, diagram, or screenshot.',
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
  ],
});
