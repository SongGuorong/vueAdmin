<template>
  <el-config-provider :locale="localLanguage">
    <el-scrollbar height="100vh" ref="scroll">
      <router-view/>
    </el-scrollbar>
  </el-config-provider>
</template>

<script setup>
import {useStore} from "vuex";
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
});

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
  store.dispatch('setting/changeMobile', flag);
};

const changeResize = () => {
  changeBodyWidth();
};
</script>

<style scoped>

</style>
