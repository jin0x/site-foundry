import { defineLive } from 'next-sanity/live';
import { client } from './client';
import { sanityEnv } from '../env';

const token = sanityEnv.readToken;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
