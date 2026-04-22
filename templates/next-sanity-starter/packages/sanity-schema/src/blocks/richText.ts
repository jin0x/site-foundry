import { DocumentTextIcon } from '@sanity/icons';
import { defineField } from 'sanity';
import { defineBlockSchema } from '../shared/defineBlockSchema';

export const richText = defineBlockSchema({
  name: 'block.richText',
  title: 'Rich Text',
  description: 'Long-form editorial content block.',
  icon: DocumentTextIcon,
  withCtas: true,
  fields: [
    defineField({
      name: 'content',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
});
