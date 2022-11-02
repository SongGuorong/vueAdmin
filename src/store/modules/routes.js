import {asyncRoutes, constantRoutes} from '@/router';
import {filterAsyncRoutes, convertRouter} from '@/utils/handleRoutes';
import {getRouterList} from "@/api/router";

// state
const state = () => ({
   routes: [],
   partialRoutes: [],
});

// getters
const getters = {
   routes: (state) => state.routes,
   partialRoutes: (state) => state.partialRoutes,
};

// mutations
const mutations = {
   setRoutes(state, routes) {
      state.routes = constantRoutes.concat(routes);
   }, setAllRoutes(state, routes) {
      state.routes = constantRoutes.concat(routes);
   }, setPartialRoutes(state, routes) {
      state.partialRoutes = constantRoutes.concat(routes);
   },
};

// actions
const actions = {
   async setRoutes({commit}, permissions) {
       // 开源版只过滤动态路由permissions，admin不再默认拥有全部权限
       const finallyAsyncRoutes = filterAsyncRoutes([...asyncRoutes], permissions);
       commit('setRoutes', finallyAsyncRoutes);
       return finallyAsyncRoutes;
   },
   async setAllRoutes({commit}) {
      let {data} = await getRouterList();
      // data.push({ path: '*', redirect: '/404', hidden: true });
      let accessRoutes = convertRouter(data);
      commit('setAllRoutes', accessRoutes);
      return accessRoutes;
   },
   setPartialRoutes({commit}, accessRoutes) {
      commit('setPartialRoutes', accessRoutes);
      return accessRoutes;
   },
};

export default {state, getters, mutations, actions};
