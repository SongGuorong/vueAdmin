<template>
  <!-- 视图(view) -->
  <el-row style="margin: 25px 0 0 25px;">
    <el-button type="primary" @click="increment">{{ count }}</el-button>
  </el-row>
</template>

<!--单文件组件script setup-->
<script setup>
import {ref, onMounted} from "vue";

// 状态(state)
const count = ref(0);
// 动作(actions)
const increment = () => count.value++;
// 生命周期钩子函数
onMounted(() => console.log("hello vue3"));

</script>

<style scoped></style>
