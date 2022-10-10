<template>
  <div>
    <svg-icon></svg-icon>
  </div>

</template>

<script setup>


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