/**
 * @desc 公共配置文件
 * @author SongGuorong
 */

export const setting = {
    // 是否显示顶部进度条
    progressBar: true,
    // 菜单栏默认打开路由
    defaultOpeneds: ['/comp', '/errorPage', '/chart'],
    // vertical布局时是否只保持一个子菜单的展开
    uniqueOpened: false,
    // token名称
    tokenName: 'accessToken',
    // 是否开启登录拦截
    loginInterception: true,
    // token在localStorage、sessionStorage存储的key的名称
    tokenTableName: 'vue3-admin-template',
    // lang storage
    langKey: 'i18nLang',
    // theme storage
    themeKey: 'theme',
    // default language
    lang: 'zh-cn',
    // token存储位置localStorage sessionStorage
    storage: 'localStorage',
    // 标题
    title: 'vue3-admin-template',
    // 版权信息
    copyright: '© SongGuorong-2022 vue3-admin-element-template',
    // 是否显示页面底部自定义版权信息
    footerCopyright: true,
    // 缓存路由的最大数量
    keepAliveMaxNum: 99,
    // intelligence 前端控制路由 all 后端控制
    authentication: 'intelligence',
    // token失效回退到登录页时是否记录本次的路由
    recordRoute: true,
    // 路由白名单不经过token校验的路由
    routesWhiteList: ['/login', '/register', '/404', '/401'],
    // 需要加loading层的请求，防止重复提交
    debounce: [],
};