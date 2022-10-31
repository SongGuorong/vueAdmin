<template>
  <span class="icon-hover full-screen-wrapper" :title="isFullScreen ? t('navbar.noFull') : t('navbar.full')">
    <component
        theme="filled"
        size="16"
        :fill="color"
        :strokeWidth="4"
        :is="(isFullScreen ? 'icon-off' : 'icon-full') + '-screen'"
        @click="handleClick"
    />
  </span>
</template>

<script setup>
import {useI18n} from "vue-i18n";
import {useStore} from "vuex";
import {computed} from "vue";
import screenfull from 'screenfull';
import {ElMessage} from "element-plus";

defineProps( {
  color: {
    type: String,
    default: '#666',
  },
});

const {t} = useI18n();
const store = useStore();
const isFullScreen = computed(() => {
  return store.getters['setting/isFullScreen'];  // 是否全屏
});

const emit = defineEmits(['refresh']);
const handleClick = () => {
  if (!screenfull.isEnabled) {
    ElMessage.warning('进入全屏失败');
    return false;
  }
  store.dispatch('setting/changeFullScreen', !isFullScreen.value);  // 更改状态
  screenfull.toggle();  // 触发全屏
  emit('refresh', screenfull.isFullscreen);  // 传递参数到父组件
};
</script>

<style lang="scss" scoped>
.full-screen-wrapper {
  padding: 20px 10px;
}
</style>