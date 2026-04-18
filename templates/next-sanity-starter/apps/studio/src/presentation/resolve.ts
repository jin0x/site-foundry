import {
  defineDocuments,
  defineLocations,
  type PresentationPluginOptions,
} from 'sanity/presentation';

const pageLocations = defineLocations({
  select: {
    title: 'title',
    slug: 'slug.current',
  },
  resolve: (doc) => ({
    locations: [
      {
        title: doc?.title || 'Untitled',
        href: doc?.slug === 'home' ? '/' : `/${doc?.slug ?? ''}`,
      },
    ],
  }),
});

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    page: pageLocations,
    settings: defineLocations({
      message: 'Settings affect every route that consumes shared site data.',
      tone: 'caution',
      locations: [{ title: 'Home', href: '/' }],
    }),
  },
  mainDocuments: defineDocuments([
    { route: '/', filter: `_type == "page" && slug.current == "home"` },
    { route: '/:slug', filter: `_type == "page" && slug.current == $slug` },
  ]),
};
