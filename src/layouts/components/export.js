/**
 * 批量全局注册
 */
const modulesFiles = import.meta.globEager('./*/*.vue');

export default (app) => {
    for (const path in modulesFiles) {
        const componentName = modulesFiles[path].default.name;
        app.component(componentName, modulesFiles[path].default);
    }
};