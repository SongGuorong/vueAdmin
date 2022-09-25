import {createApp} from 'vue'
import { createStore } from 'vuex'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

// import './assets/main.css'

// 创建一个新的store实例
const store = createStore({
    state: {
        count: 0
    },
    // 当前状态即刻变化，属于同步事务
    mutations: {
        increment (state) {
            state.count++
        }
    },
    actions: {
        // context上下文对象
        increment (context) {
            context.commit('increment')
        },
        incrementAsync (context) {
            setTimeout(() => {
                context.commit('increment')
            }, 1000)
        }
    }
});

const store2 = createStore({
    state: {
        todos: [
            {id:1, text:'已完成', done: true},
            {id:2, text:'未完成', done: false}
        ]
    },
    getters: {
        doneTodos (state) {
            return state.todos.filter(todo => todo.done)
        }
    }
})

// 根组件
const app = createApp(App)

app.use(ElementPlus)

app.use(store)
app.use(store2)

console.log(store.state.count)

// store.commit('increment')

store.dispatch('incrementAsync').then(() => console.log("接下来: "+ store.state.count))

// store.dispatch('increment').then(() => console.log("接下来: "+ store.state.count))

console.log(store.state.count)
app.mount('#app')