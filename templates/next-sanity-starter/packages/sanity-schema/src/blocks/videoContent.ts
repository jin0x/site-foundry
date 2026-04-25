import { PlayIcon } from '@sanity/icons';
import { defineField } from 'sanity';
import { defineBlockSchema } from '../shared/defineBlockSchema';

export const videoContent = defineBlockSchema({
  name: 'block.videoContent',
  title: 'Video Content',
  description:
    'Inline video player with a poster image + optional caption. Use for a centered video-testimonial or product-tour anchor section.',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'videoUrl',
      type: 'url',
      description: 'Direct MP4/WebM URL (browser plays inline with controls). YouTube/Vimeo embed support is a follow-on.',
    }),
    defineField({
      name: 'poster',
      type: 'imageWithAlt',
      description: 'Thumbnail shown before play.',
    }),
    defineField({
      name: 'caption',
      type: 'string',
      description: 'Optional caption rendered below the video.',
    }),
  ],
});
