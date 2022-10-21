<template>
  <div @click="handleClick" class="logo-wrapper" :class="{unfold: collapse, horizontal: mode === 'horizontal'}">
    <svg-icon name="vue" size="35px" />
    <span class="logo-title" :style="{color: textColor}" v-if="!collapse"> vue3-admin </span>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {themeConfig} from '@/config/theme';
import {computed} from "vue";

const {themeOptions} = themeConfig;   // 主题配置选项
const store = useStore();
const router = useRouter();

const collapse = computed(() => {
  return store.getters.collapse;
});  // 动态响应式计算属性

</script>

<style lang="scss" scoped>
  .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: $base-logo-width;
    cursor: pointer;

    &.unfold {
      width: $base-unfold-width;
      padding: $base-padding-10 0;
    }

    &.horizontal {
      justify-content: flex-start;
    }

    .logo-title {
      display: inline-block;
      max-width: calc(246px - 60px);
      padding-left: $base-padding-10;
      overflow: hidden;
      font-size: $base-font-size-max;
      line-height: $base-logo-height;
      color: #333;
      text-overflow: ellipsis;  /*文本溢出，展示省略号*/
      white-space: nowrap;
      vertical-align: middle;
    }
  }
</style>