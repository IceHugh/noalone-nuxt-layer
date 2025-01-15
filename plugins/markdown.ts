// import VueMarkdownEditor from '@kangc/v-md-editor';
// import VMdPreview from '@kangc/v-md-editor/lib/preview';
// import '@kangc/v-md-editor/lib/style/preview.css';
// import '@kangc/v-md-editor/lib/style/base-editor.css';
// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
// import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// import enUS from '@kangc/v-md-editor/lib/lang/en-US';

// import Prism from 'prismjs';

// // VueMarkdownEditor.lang.use('en-US', enUS);
// VueMarkdownEditor.use(vuepressTheme, {
//   Prism,
// });
// VMdPreview.use(vuepressTheme, {
//   Prism,
// });

export default defineNuxtPlugin({
  name: 'ui-markdown',
  enforce: 'pre',
  async setup(nuxtApp) {
    // nuxtApp.vueApp.use(VueMarkdownEditor);
    // nuxtApp.vueApp.use(VMdPreview);
  },
  env: {
    islands: false,
  },
});
