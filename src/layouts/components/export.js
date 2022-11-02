/**
 * 批量全局注册
 */
const modulesFiles = import.meta.globEager('./*/*.vue');

export default (app) => {
    for (const path in modulesFiles) {
        const componentName = modulesFiles[path].default.name;  // 获取组件默认名称
        app.component(componentName, modulesFiles[path].default);
    }
};