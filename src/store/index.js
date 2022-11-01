import {createStore} from "vuex";
import getters from '@/store/getters';

const modulesFiles = import.meta.globEager('./modules/*.js');  // ./modules/routes.js

let modules = {};
for (const path in modulesFiles) {
    const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2');  // routes
    modules[moduleName] = modulesFiles[path].default;
}

// 模块增加命名空间
Object.keys(modules).forEach((key) => {
    modules[key]['namespaced'] = true;
});

const store = createStore({
    modules,
    getters,
});

export default store;
