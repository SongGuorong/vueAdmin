import {createApp} from 'vue';
import App from './App.vue';

// 路由权限/导航进度条
import '@/config/permission';

// clipboard
import {VueClipboard} from '@soerenmartius/vue3-clipboard';
// router
import router from '@/router';
// vuex
import store from '@/store';

// 根组件
const app = createApp(App);

// layout components
import layoutComp from '@/layouts/components/export';
layoutComp(app);
// 注册字节跳动图标
import iconPark from '@/plugin/icon-park';
iconPark(app);
// i18n
import loadI18n from '@/plugin/i18n';
loadI18n(app);

app.use(VueClipboard).use(router).use(store).mount('#app');