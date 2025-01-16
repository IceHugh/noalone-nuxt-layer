import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const currentDir = dirname(fileURLToPath(import.meta.url));

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

const modules = [
  '@hebilicious/vue-query-nuxt',
  '@nuxtjs/tailwindcss',
  'shadcn-nuxt',
  '@nuxt/icon',
  '@nuxtjs/color-mode',
  '@nuxtjs/i18n',
  '@vueuse/nuxt',
  '@nuxtjs/seo',
  '@pinia/nuxt',
];

console.log(process.env.USE_CLERK);

if (process.env.USE_CLERK) {
  modules.push('@clerk/nuxt');
}
export const buildConfig = {
  modules,
  icon: {
    serverBundle: {
      collections: ['solar'],
      remote: 'jsdelivr', // 'unpkg' or 'github-raw', or a custom function
    },
  },
  clerk: {
    skipServerMiddleware: false,
  },
  alias: {
    '~layer': join(currentDir, '..'),
  },
  shadcn: {
    prefix: '',
    componentDir: join(currentDir, '../components/ui'),
  },
  vueQuery: {
    stateKey: 'vue-query-nuxt',
    // default: ["useQuery", "useQueries", "useInfiniteQuery", "useMutation", "useIsFetching", "useIsMutating", "useQueryClient"]
    // autoImports: ["useQuery"],
    queryClientOptions: {
      defaultOptions: { queries: { staleTime: 5000 } }, // default
    },
    vueQueryPluginOptions: {},
  },
  components: [
    {
      path: '~layer/components',
      pathPrefix: false,
    },
  ],
  build: {
    transpile: ['ecpair'],
  },

  vite: {
    esbuild: {
      target: 'esnext',
      drop:
        process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    },
    plugins: [],
    logLevel: 'info' as const,
    optimizeDeps: {
      include: ['@vueuse/core'],
      esbuildOptions: {
        supported: { 'top-level-await': true },
        define: { global: 'globalThis' },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            process: true, // fix nuxt3 process
            buffer: true,
          }) as any,
          NodeModulesPolyfillPlugin(),
        ],
      },
    },
  },
};
