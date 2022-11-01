<template>
  <div id="app">
    <el-config-provider :locale="localLanguage">
      <el-scrollbar height="100vh" ref="scroll">
        <router-view></router-view>
      </el-scrollbar>
    </el-config-provider>
  </div>
</template>

<script setup>
import {useStore} from "vuex";   // 在setup钩子函数中访问store
import {computed, onMounted, ref, watch} from "vue";
import i18n from "@/locales";
import {useRouter} from "vue-router";

const store = useStore();

const locale = i18n.global.locale;
const localLanguage = computed(() => {
  const isDev = process.env.NODE_ENV === "development";
  if (isDev) {
    return i18n.global.messages.value[locale.value];
  } else {
    return i18n.global.messages[locale];  // 支持语言列表
  }
});   // localLanguage使用computed计算属性编程响应式变量

const scroll = ref(null);

const router = useRouter();
onMounted(() => {
  changeBodyWidth();
  window.addEventListener('resize', changeResize);
});

// 监听，路由变化，滚动到最上面
watch(
    () => router.currentRoute.value,
    () => {
      scroll.value.setScrollTop(0);
    }
);

const changeBodyWidth = () => {
  const flag = document.body.getBoundingClientRect().width - 1 < 992;
  store.dispatch('setting/changeMobile', flag);   // 判断是否是mobile
};

const changeResize = () => {
  changeBodyWidth();
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: $base-font-size-default;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
