import { defineConfig } from 'vite';   // 帮手函数，这样不用 jsdoc 注解也可以获取类型提示
import path from 'path';              // 设置alias路径别名
import vue from '@vitejs/plugin-vue';
const resolve = (dir: string) => path.join(__dirname, dir);

import legacy from '@vitejs/plugin-legacy';
import { viteMockServe } from 'vite-plugin-mock';
import { setting } from './src/config/setting';
import {svgBuilder} from './src/plugin/svgBuilder';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('src'),
      // '@comps': resolve('./src/components'),
      // '@apis': resolve('./src/api'),
      // '@views': resolve('./src/views'),
      // '@utils': resolve('./src/utils'),
      // '@router': resolve('./src/router'),
      // '@styles': resolve('./src/styles'),
    }
  }
});
