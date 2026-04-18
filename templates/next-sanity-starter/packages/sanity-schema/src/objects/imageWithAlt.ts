import { defineField, defineType } from 'sanity';

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      type: 'string',
    }),
  ],
});
