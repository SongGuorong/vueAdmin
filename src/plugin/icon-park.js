/**
 * 字节跳动图标库：https://iconpark.oceanengine.com/official
 * and vue3 https://github.com/bytedance/IconPark/tree/master/packages/vue-next
 * element-plus icon: https://element-plus.gitee.io/zh-CN/component/icon.html
 * @description 图标库按需注册
 * @author SongGuorong
 * @example <icon-user theme="outline" size="16" fill="#999" />
 * @example <el-icon :size="20"> <edit /> </el-icon>
 */
import { install } from '@icon-park/vue-next/es/all';
// import the icon style
import '@icon-park/vue-next/styles/index.css';
// svg-icon
import SvgIcon from '@/components/SvgIcon/index.vue';

// 注册
export default (app) => {
  app.component('svg-icon', SvgIcon);  // svg-icon全局组件名
  install(app);  // use default prefix 'icon', eg: icon is People, name is icon-people.
};
