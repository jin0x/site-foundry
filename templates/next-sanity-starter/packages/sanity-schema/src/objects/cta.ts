import { LinkIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { ctaColorOptions, ctaVariantOptions } from '../shared/options';

export const cta = defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Show CTA',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'text',
      title: 'Button Text',
      type: 'string',
      hidden: ({ parent }) => !parent?.enabled,
      validation: (rule) =>
        rule.custom((value, context) => {
          if ((context.parent as { enabled?: boolean } | undefined)?.enabled && !value) {
            return 'Button text is required when CTA is enabled';
          }
          return true;
        }),
    }),
    defineField({
      name: 'link',
      type: 'link',
      hidden: ({ parent }) => !parent?.enabled,
      validation: (rule) =>
        rule.custom((value, context) => {
          if ((context.parent as { enabled?: boolean } | undefined)?.enabled && !value) {
            return 'Link is required when CTA is enabled';
          }
          return true;
        }),
    }),
    defineField({
      name: 'color',
      type: 'string',
      hidden: ({ parent }) => !parent?.enabled,
      options: {
        list: ctaColorOptions,
        layout: 'radio',
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'variant',
      type: 'string',
      hidden: ({ parent }) => !parent?.enabled,
      options: {
        list: ctaVariantOptions,
        layout: 'radio',
      },
      initialValue: 'solid',
    }),
  ],
  preview: {
    select: {
      enabled: 'enabled',
      title: 'text',
      color: 'color',
      variant: 'variant',
    },
    prepare: ({ enabled, title, color, variant }) => ({
      title: enabled ? title || 'CTA' : 'CTA (Disabled)',
      subtitle: enabled ? [color, variant].filter(Boolean).join(' • ') : 'Not rendered',
    }),
  },
});
