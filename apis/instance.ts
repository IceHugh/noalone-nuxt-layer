import { createAlova } from 'alova';
import VueHook from 'alova/vue';
import adapterFetch from 'alova/fetch';

export const alova = createAlova({
  baseURL: '/api',
  statesHook: VueHook,
  timeout: 30000,
  requestAdapter: adapterFetch(),
  responded: {
    onSuccess: async (response, method) => {
      if (response.status >= 400) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      return json;
    },
  },
});
