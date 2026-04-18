import { LinkIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { linkKindOptions } from '../shared/options';

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'kind',
      title: 'Link Type',
      type: 'string',
      options: {
        list: linkKindOptions,
        layout: 'radio',
      },
      initialValue: 'page',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'page',
      type: 'reference',
      to: [{ type: 'page' }],
      hidden: ({ parent }) => parent?.kind !== 'page',
      validation: (rule) =>
        rule.custom((value, context) => {
          if ((context.parent as { kind?: string } | undefined)?.kind === 'page' && !value) {
            return 'Page is required when link type is Page';
          }
          return true;
        }),
    }),
    defineField({
      name: 'href',
      type: 'url',
      hidden: ({ parent }) => parent?.kind !== 'href',
      validation: (rule) =>
        rule.custom((value, context) => {
          if ((context.parent as { kind?: string } | undefined)?.kind === 'href' && !value) {
            return 'URL is required when link type is URL';
          }
          return true;
        }),
    }),
    defineField({
      name: 'email',
      type: 'email',
      hidden: ({ parent }) => parent?.kind !== 'email',
      validation: (rule) =>
        rule.custom((value, context) => {
          if ((context.parent as { kind?: string } | undefined)?.kind === 'email' && !value) {
            return 'Email is required when link type is Email';
          }
          return true;
        }),
    }),
    defineField({
      name: 'file',
      type: 'file',
      hidden: ({ parent }) => parent?.kind !== 'file',
    }),
    defineField({
      name: 'openInNewTab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
