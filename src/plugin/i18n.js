import i18n from '@/locales';  // 默认加载 index.js
export default function loadComponent(app) {
    app.use(i18n);
}
