<template>
  <div class="admin-container">
    <Mobile v-if="isMobile"/>
    <template v-else>
      <el-container v-if="mode === 'vertical'">
        <Menu :isCollapse="isCollapse" class="hidden-xs-only"/>
        <el-container class="container" :style="{ left: isCollapse ? '65px' : '205px' }">  <!--收起与展开菜单栏宽度-->
          <el-header
              class="header"
              :class="{ fixed: fixedHead, notag: !tag }"
              :style="{ left: isCollapse ? '65px' : '205px' }"
          >
            <NavBar @handleCollapse="handleCollapse"/>
            <template v-if="tag">
              <TabBar/>
            </template>
          </el-header>
          <el-main class="main" :class="{ fixed: fixedHead, notag: !tag }">
            <AppMain/>
          </el-main>
        </el-container>
      </el-container>
      <Horizontal v-if="mode === 'horizontal'"/>   <!--是否横向布局-->
      <el-backtop/>
    </template>
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useStore} from 'vuex';

const store = useStore();

const isMobile = computed(() => {
  return store.getters['setting/isMobile'];
});

const fixedHead = computed(() => {
  return store.getters['setting/fixedHead'];
});

const tag = computed(() => {
  return store.getters['setting/tag'];
});

const isCollapse = computed(() => {
  return store.getters.collapse;
});

const mode = computed(() => {
  return store.getters['setting/mode'];
});

const handleCollapse = () => {
  store.dispatch('setting/changeCollapse');
};
</script>

<style lang="scss" scoped>
.admin-container {
  position: relative;
  background-color: $base-content-bg-color;

  .container {
    position: absolute;
    right: 0;
    transition: all $base-transition-time-4;
  }

  .header {
    padding: 0;
    transition: all $base-transition-time-4;

    &.fixed {
      position: fixed;
      top: 0;
      right: 0;
      z-index: $base-z-index-999;
    }
  }

  // 修改内容区padding
  :deep(.el-main) {
    --el-main-padding: 20px 10px 10px 10px;
  }

  .main {
    position: relative;
    top: $base-main-vertical-top;
    overflow-y: auto;

    // 固定头部，有标签
    &.fixed {
      top: $base-main-fixed-top;
    }
    // 固定头部无标签
    &[class='el-main main fixed notag'] {
      top: $base-main-vertical-fixed-notag-top;
    }
    // 无固定无标签
    &[class='el-main main notag'] {
      top: $base-main-notag-top;
    }

    background-color: $base-content-bg-color;
  }
}
</style>
