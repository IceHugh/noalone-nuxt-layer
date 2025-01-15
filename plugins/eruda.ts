export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    if (import.meta.env.VITE_MOBILE_DEBUG) {
      // 如果你只想在手机端加载，就放开下面的注释
      // if (window.innerWidth > 768) return

      fetch('https://cdn.jsdelivr.net/npm/eruda')
        .then((response) => response.text())
        .then((source) => {
          eval(source);
          (window as any).eruda.init();
        })
        .catch((err) => {
          console.log('加载失败');
          console.log(err);
        });
    }
  }
});
