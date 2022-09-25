<template>
  <button type="button" @click="count++"> {{count}} </button>
</template>

<script>
import {ref} from "vue";

export default {
  name: "Count",
  setup() {
    const count = ref(0);
    return {
      count,
    };
  },
  mounted() {
    console.log(this.count);
  },
};
</script>

<style scoped></style>
