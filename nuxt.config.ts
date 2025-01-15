// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { buildConfig, i18nConfig } from './config';

const currentDir = dirname(fileURLToPath(import.meta.url));

console.log('currentDir', currentDir);

export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',

  icon: {
    serverBundle: {
      collections: [],
    },
  },

  colorMode: {
    preference: 'dark',
    classSuffix: '',
  },

  css: [
    'btc-connect-vue/dist/style.css',
    '~layer/assets/css/layout.css',
    '~layer/assets/css/tailwind.css',
  ],

  ...i18nConfig,
  ...(buildConfig as any),
});
