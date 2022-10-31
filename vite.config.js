import {defineConfig} from 'vite';
import Vue from '@vitejs/plugin-vue';  // 提供 Vue 3 单文件组件支持
// 按需导入ElementPlus
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
// 按需导入ElementPlus Icons
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
// 路径别名
import path from 'path';

const resolve = (dir) => path.resolve(__dirname, dir);
// const pathSrc = path.resolve(__dirname, 'src');
// 自定义
import {svgBuilder} from './src/plugin/svgBuilder';
// others
import legacy from '@vitejs/plugin-legacy';  // 为打包后的文件提供传统浏览器兼容性支持
import vueI18n from '@intlify/vite-plugin-vue-i18n';  // 国际化
import {viteMockServe} from 'vite-plugin-mock';

const isDev = process.env.NODE_ENV === 'development';

// https://vitejs.dev/config/
export default defineConfig({
   root: process.cwd(),
   // 存储缓存文件的目录
   cacheDir: 'node_modules/.vite',
   // 项目部署的基础路径
   base: './',
   // 静态资源服务的文件夹 类型 string | false
   publicDir: 'public',
   // 调整控制台输出的级别 'info' | 'warn' | 'error' | 'silent'
   logLevel: 'info',
   // 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息
   clearScreen: false,
   server: {
      // 指定服务器应该监听哪个 IP 地址,配置为0.0.0.0表示监听所有ip
      host: '0.0.0.0',
      // 指定开发服务器端口
      port: '8089',
      // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
      strictPort: false,
      // 服务器启动时自动在浏览器中打开应用程序 此值为字符串时，会被用作 URL 的路径名
      open: true,
   },
   build: {
      target: 'es2015',
      // 输出路径
      outDir: 'dist',
      // 生成静态资源的存放路径
      assetsDir: 'static/',
      // 构建后是否生成 source map 文件
      sourcemap: false,
      // 启用/禁用 CSS 代码拆分
      // 如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。
      cssCodeSplit: true,
      // chunk 大小警告的限制 kbs
      chunkSizeWarningLimit: 2000,
      // terserOptions: {
      //    compress: {
      //       keep_infinity: true,
      //       // 生产环境的console.*函数不输出
      //       drop_console: true,
      //       // 删除生产环境的debugger
      //       drop_debugger: true,
      //    }
      // }
   },
   // 设置路径别名
   resolve: {
      alias: {
         '@': resolve('src'),
      },
      // 导入时想要省略的扩展名列表
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
   },
   css: {
      preprocessorOptions: {
         // 引入全局公共样式
         scss: {
            additionalData: `@use "@/styles/index.scss" as *;`,
         },
      },
   },
   plugins: [
      Vue(),
      vueI18n({include: resolve('./src/locales/**')}),
      legacy({
         polyfills: ['es.promise.finally', 'es/map', 'es/set'],
         modernPolyfills: ['es.promise.finally']
      }),
      // 按需导入ElementPlus库
      AutoImport({
         // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
         imports: ['vue'],
         // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
         resolves: [
            ElementPlusResolver(),
            // 自动导入图标组件
            IconsResolver({
               prefix: 'Icon',
            }),
         ],
      }),
      // 按需自动注册ElementPlus组件
      Components({
         resolves: [
            // 自动注册图标组件
            IconsResolver({
               enabledCollections: ['ep'],
            }),
            // 自动导入 Element Plus 组件
            ElementPlusResolver({
               importStyle: "sass",
            }),
         ],
      }),
      // Icons
      Icons({
         autoInstall: true,
      }),
      svgBuilder('./src/icons/svg/'),
      // viteMockServe({
      //     mockPath: './mock',
      //     supportTs: false,
      //     localEnabled: isDev,
      //     prodEnabled: false,
      //     //  这样可以控制关闭mock的时候不让mock打包到最终代码内
      // }),
   ],
   optimizeDeps: {
      // 检测需要预构建的依赖项
      // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
      include: [],
   },
});