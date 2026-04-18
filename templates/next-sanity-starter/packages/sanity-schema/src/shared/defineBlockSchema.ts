import { defineField, defineType, type FieldDefinition } from 'sanity';
import { backgroundToneOptions, spacingOptions } from './options';

type DefineBlockSchemaOptions = {
  name: string;
  title: string;
  description?: string;
  icon?: unknown;
  fields: FieldDefinition[];
  withSectionHeading?: boolean;
  withCtas?: boolean;
  withBackgroundTone?: boolean;
  withSpacing?: boolean;
};

const groups = [
  { name: 'content', title: 'Content', default: true },
  { name: 'presentation', title: 'Presentation' },
];

export function defineBlockSchema(options: DefineBlockSchemaOptions) {
  const {
    name,
    title,
    description,
    icon,
    fields,
    withSectionHeading = true,
    withCtas = false,
    withBackgroundTone = true,
    withSpacing = true,
  } = options;

  const sharedFields: FieldDefinition[] = [];

  if (withSectionHeading) {
    sharedFields.push(
      defineField({
        name: 'sectionHeading',
        type: 'sectionHeading',
        group: 'content',
      }),
    );
  }

  if (withCtas) {
    sharedFields.push(
      defineField({
        name: 'ctas',
        type: 'array',
        group: 'content',
        of: [{ type: 'cta' }],
        validation: (rule) => rule.max(2),
      }),
    );
  }

  if (withBackgroundTone) {
    sharedFields.push(
      defineField({
        name: 'backgroundTone',
        type: 'string',
        group: 'presentation',
        options: {
          list: backgroundToneOptions,
          layout: 'radio',
        },
        initialValue: 'none',
      }),
    );
  }

  if (withSpacing) {
    sharedFields.push(
      defineField({
        name: 'spacing',
        type: 'string',
        group: 'presentation',
        options: {
          list: spacingOptions,
          layout: 'radio',
        },
        initialValue: 'default',
      }),
    );
  }

  return defineType({
    name,
    title,
    description,
    icon,
    type: 'object',
    groups,
    fields: [...sharedFields, ...fields.map((field) => ({ ...field, group: field.group ?? 'content' }))],
    preview: {
      select: {
        title: 'sectionHeading.heading',
        eyebrow: 'sectionHeading.eyebrow',
      },
      prepare: ({ title: blockTitle, eyebrow }) => ({
        title: blockTitle || title,
        subtitle: eyebrow || title,
      }),
    },
  });
}
