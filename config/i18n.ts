import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const currentDir = dirname(fileURLToPath(import.meta.url));

export const i18nConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'zh', name: '中文', file: 'zh.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root' as const,
      alwaysRedirect: true,
    },
  },
};
