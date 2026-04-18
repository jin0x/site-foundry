import { createClient } from 'next-sanity';
import { sanityEnv } from '../env';

export const client = createClient({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  apiVersion: sanityEnv.apiVersion,
  useCdn: true,
  stega: {
    studioUrl: sanityEnv.studioUrl,
    filter: (props) => props.filterDefault(props),
  },
});
