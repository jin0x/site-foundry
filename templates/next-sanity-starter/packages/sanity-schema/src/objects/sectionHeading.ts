import { TextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { alignmentOptions } from '../shared/options';

export const sectionHeading = defineType({
  name: 'sectionHeading',
  title: 'Section Heading',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'enabled',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'eyebrow',
      type: 'string',
      hidden: ({ parent }) => !parent?.enabled,
    }),
    defineField({
      name: 'heading',
      type: 'string',
      hidden: ({ parent }) => !parent?.enabled,
      validation: (rule) =>
        rule.custom((value, context) => {
          if ((context.parent as { enabled?: boolean } | undefined)?.enabled && !value) {
            return 'Heading is required when section heading is enabled';
          }
          return true;
        }),
    }),
    defineField({
      name: 'subheading',
      type: 'blockContent',
      hidden: ({ parent }) => !parent?.enabled,
    }),
    defineField({
      name: 'align',
      type: 'string',
      hidden: ({ parent }) => !parent?.enabled,
      options: {
        list: alignmentOptions,
      },
      initialValue: 'left',
    }),
  ],
});
