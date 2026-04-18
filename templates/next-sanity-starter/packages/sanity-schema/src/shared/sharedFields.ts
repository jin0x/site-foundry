import { defineField, type FieldDefinition } from 'sanity';

export function slugField(
  options: { name?: string; source?: string; group?: string; maxLength?: number } = {},
): FieldDefinition {
  const { name = 'slug', source = 'title', group, maxLength = 96 } = options;

  return defineField({
    name,
    type: 'slug',
    group,
    options: {
      source,
      maxLength,
    },
    validation: (rule) => rule.required(),
  });
}

export function seoField(group?: string): FieldDefinition {
  return defineField({
    name: 'seo',
    type: 'seo',
    group,
  });
}
