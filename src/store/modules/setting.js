/**
 * 主题全局配置状态
 */
import {themeConfig} from '@/config/theme';
import {setting} from '@/config/setting';
import {getLanguage, setLanguage, setSettings, getSettings} from '@/utils/cookies';

const {mode, theme, isLogo, tag, isBreadcrumb, fixedHead, fullScreen, refresh, notice, collapse,} = themeConfig;
const {lang} = setting;

// state
const state = {
    routerView: true,           // 是否显示路由
    isDrawerSetting: false,    // 是否打开主题设置
    isMobile: false,           // 是否是移动端
    isDrawer: false,           // 是否展开移动端菜单
    isFullScreen: false,       // 是否显示全屏
    mode: getSettings() ? getSettings().mode : mode,  // 使用JSON.parse()转换成json对象，获取mode值
    collapse,
    fullScreen,
    refresh,
    notice,
    theme,
    fixedHead,
    isBreadcrumb,
    isLogo,
    tag,
    lang: getLanguage() || lang,
};

// getters
const getters = {
    routerView: (state) => state.routerView,
    isMobile: (state) => state.isMobile,
    isDrawer: (state) => state.isDrawer,
    isFullScreen: (state) => state.isFullScreen,
    theme: (state) => state.theme,
    isDrawerSetting: (state) => state.isDrawerSetting,
    fullScreen: (state) => state.fullScreen,
    refresh: (state) => state.refresh,
    fixedHead: (state) => state.fixedHead,
    notice: (state) => state.notice,
    isBreadcrumb: (state) => state.isBreadcrumb,
    isLogo: (state) => state.isLogo,
    tag: (state) => state.tag,
    mode: (state) => state.mode,
    lang: (state) => state.lang,
    settings: (state) => state,
};

// mutations(同步执行)
const mutations = {
    CHANGE_COLLAPSE: (state) => {
        state.collapse = !state.collapse;
    },
    CHANGE_FULL_SCREEN: (state, flag) => {
        state.isFullScreen = flag;   // flag表示额外参数，载荷
    },
    SET_ROUTER_VIEW: (state) => {
        state.routerView = !state.routerView;
    },
    CHANGE_IS_MOBILE: (state, flag) => {
        state.isMobile = flag;
    },
    CHANGE_IS_DRAWER: (state, flag) => {
        state.isDrawer = flag;
    },
    SET_THEME: (state, theme) => {
        state.theme = theme;
    },
    CHANGE_SETTING_DRAWER: (state, flag) => {
        state.isDrawerSetting = flag;
    },
    CHANGE_BREADCRUMB: (state, flag) => {
        state.isBreadcrumb = flag;
    },
    CHANGE_TAG: (state, flag) => {
        state.tag = flag;
    },
    CHANE_MODE: (state, mode) => {
        state.mode = mode;
    },
    SET_SETTING_OPTIONS: (state, options) => {
        setSettings(options.value);   // 设置到cookie中缓存
        Object.assign(state, { ...options.value });   // 拷贝options的值覆盖对应state属性的值
    },
    CHANGE_LANGUAGE: (state, lang) => {
        setLanguage(lang);
        state.lang = lang;
    },
};

// actions(Action 提交的是 mutation，而不是直接变更状态。可以包含任意异步操作)
const actions = {
    // 切换展开收起
    changeCollapse: ({commit}) => {
        commit('CHANGE_COLLAPSE');
    },
    // 切换是否全屏 {boolean} flag true|false
    changeFullScreen: ({commit}, flag) => {
        commit('CHANGE_FULL_SCREEN', flag);
    },
    // 是否刷新路由
    setRouterView: ({commit}, flag) => {
        commit('SET_ROUTER_VIEW', flag);
    },
    // 是否为移动端
    changeMobile: ({commit}, flag) => {
        commit('CHANGE_IS_MOBILE', flag);
    },
    // 是否展开移动端菜单
    changeDrawer: ({commit}, flag) => {
        commit('CHANGE_IS_DRAWER', flag);
    },
    // 设置主题
    setTheme: ({commit}, theme) => {
        commit('SET_THEME', theme);
    },
    // 是否打开主题设置
    setSettingDrawer: ({commit}, flag) => {
        commit('CHANGE_SETTING_DRAWER', flag);
    },
    // 是否显示面包导航
    setBreadcrumb: ({commit}, flag) => {
        commit('CHANGE_BREADCRUMB', flag);
    },
    // 是否显示标签
    setTag: ({commit}, flag) => {
        commit('CHANGE_TAG', flag);
    },
    // 切换布局  可选值：vertical|horizontal
    setMode: ({commit}, mode) => {
        commit('CHANE_MODE', mode);
    },
    // 切换语言 可选值： zh-cn|en
    changeLanguage: ({commit}, lang) => {
        commit('CHANGE_LANGUAGE', lang);
    },
    // 设置主题配置信息  {object} options 配置项
    setSettingOptions: ({commit}, options) => {
        commit('SET_SETTING_OPTIONS', options);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};



