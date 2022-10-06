import {createApp} from 'vue';
import { createStore } from 'vuex'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'




// 根组件
const app = createApp(App)

app.use(ElementPlus)

app.mount('#app')