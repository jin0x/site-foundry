import { CogIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteTitle',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Settings',
    }),
  },
});
