/**
 * @description 路由控制
 */
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import router from "@/router";
import {setting} from '@/config/setting';
import store from "@/store";
import {getPageTitle} from "@/utils";

const {authentication, progressBar, loginInterception, routesWhiteList, recordRoute} = setting;

NProgress.configure({
   easing: 'ease',
   speed: 500,
   trickleSpeed: 200,
   showSpinner: false,  // 右上角不显示圆圈
});

// 导航守卫
router.beforeEach(async (to, from, next) => {
   if (progressBar) NProgress.start();

   let hasToken = store.getters['user/accessToken'];
   if (!loginInterception) hasToken = true;   // 如果没有开启登录拦截，则token设置存在

   if (hasToken) {
      if (to.path === "/login") {
         next({path: "/"});    // 跳转到首页
         if (progressBar) NProgress.done();
      } else {
         const hasPermissions = store.getters['user/permissions'] && store.getters['user/permissions'].length > 0;
         if (hasPermissions) {
            next();
         } else {
            try {
               let permissions;
               if (!loginInterception) {
                  // settings.js loginInterception为false时，创建虚拟权限
                  permissions = ['admin'];
                  await store.dispatch('user/setPermissions', permissions);  // 默认为admin权限
               } else {
                  permissions = await store.dispatch('user/getUserInfo');
               }

               let accessRoutes = [];
               // 控制路由方式：前端：intelligence，后端：all
               if (authentication === "intelligence") {
                  accessRoutes = await store.dispatch('routes/setRoutes', permissions);
               } else if (authentication === "all") {
                  accessRoutes = await store.dispatch('routes/setAllRoutes');
               }
               accessRoutes.forEach((item) => {
                  router.addRoute(item);
               });
               next({...to, replace: true,});
            } catch {
               await store.dispatch('user/resetAccessToken');   // 移除token,包括cookie\
               if (progressBar) NProgress.done();
            }
         }
      }
   } else {
      // 如果没有token,找免登录路由
      if (routesWhiteList.indexOf(to.path) !== -1) {
         next();  // 继续访问to.path路由
      } else {
         if (recordRoute) {
            next(`/login?redirect=${to.path}`);  // 先跳到登录页，登陆成功转到之前的导航页
         } else {
            next('/login');
         }
         if (progressBar) NProgress.done();
      }
   }
   document.title = getPageTitle(to.meta.title);
});

router.afterEach(() => {
   if (progressBar) NProgress.done();   // 导航结束，进度条关闭
});
