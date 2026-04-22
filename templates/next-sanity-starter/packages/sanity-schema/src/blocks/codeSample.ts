import { CodeBlockIcon } from '@sanity/icons';
import { defineField } from 'sanity';
import { defineBlockSchema } from '../shared/defineBlockSchema';

export const codeSample = defineBlockSchema({
  name: 'block.codeSample',
  title: 'Code Sample',
  description:
    'Code window — window chrome (traffic-light dots + filename) + monospace code body. Use for hero media alongside a heroCenter or inside a tabbedFeatures tab pane.',
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: 'filename',
      type: 'string',
      description: 'Shown in the window chrome (e.g. "advanced-ivr.js").',
    }),
    defineField({
      name: 'language',
      type: 'string',
      description: 'Language hint for syntax highlighting. Defaults to the filename extension if omitted.',
    }),
    defineField({
      name: 'code',
      type: 'text',
      rows: 12,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      type: 'string',
      description: 'Optional caption rendered below the code window.',
    }),
  ],
});
