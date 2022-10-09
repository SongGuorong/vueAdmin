<template>
  <div class="">

  </div>

</template>

<script setup>
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";
import {ref, computed} from "vue";

const store = useStore();
const { t } = useI18n();
const activeName = ref('first');
const isMobile = computed(() => {
  return store.getters['setting/isMobile'];
});

const handleClick = (val) => {
  console.log(val);
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  position: relative;
  .header {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    color: #fff;
    background: transparent;
    .logo {
      justify-content: start;
      :deep(.logo-title) {
        color: #fff !important;
      }
    }
    .lang:hover {
      background: transparent;
    }
  }
  .login-container {
    display: flex;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: $dark-bg-color;
    .login-left {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 50vw;
      height: 100%;
      background-image: url('@/assets/login-bg-dark.svg');
      background-repeat: no-repeat;
      background-position: 100%;
      background-size: auto 100%;
      &-wrap {
        height: 80vh;
        margin: auto;
        .img {
          width: 280px;
          margin-top: 10vh;
        }
        .title, .desc {
          max-width: 500px;
          font-weight: bold;
          color: #fff;
          letter-spacing: 1.2px;  /*字符间距*/
        }
        .desc {
          font-size: 28px;
        }
        .tip {
          color: #fff;
        }
      }
    }
    .login-form {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50vw;
      height: 100vh;
      .form-wrap {
        width: 400px;
        padding: 1rem 3rem 0 3rem;
        margin: auto;
        background-color: #fff;
        border-radius: 8px;
      }
      &.is-mobile {
        width: 100%;
        .form-wrap {
          width: 100%;
          margin: 0 15px;
        }
      }
    }
  }
}
</style>