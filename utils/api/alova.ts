import { createAlova, type Alova, type AlovaGenerics } from 'alova';
import adapterFetch from 'alova/fetch';

interface Options {
  baseUrl: string;
  cache?: any;
}

export const createServerAlova = ({
  baseUrl,
  cache = {
    max: 100,
    ttl: 1000 * 60 * 10,
  },
}: Options): Alova<AlovaGenerics> => {
  return createAlova({
    baseURL: baseUrl,
    // l1Cache: lRUCache(cache),
    requestAdapter: adapterFetch(),
  });
};
