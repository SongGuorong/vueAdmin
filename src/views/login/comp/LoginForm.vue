<template>
  <el-form :model="ruleForm" :rules="rules" ref="validateForm" class="login-ruleForm">
    <el-form-item prop="username">
      <el-input :placeholder="t('login.username')" v-model="ruleForm.username">
        <template>
          <icon-user theme="outline" size="16" fill="#999"/>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input :placeholder="t('login.password')" type="password" v-model="ruleForm.password" @keyup.enter="handleLogin">
        <template>
          <icon-lock theme="outline" size="16" fill="#999"/>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item>
      <div class="login-check">
        <el-checkbox v-model="checkedPwd">{{t('login.rememberPwd')}}</el-checkbox>
        <el-button text type="primary">{{t('login.forgotPwd')}}</el-button>
      </div>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="loading" class="login-btn" round @click="handleLogin">
        {{t('login.loginBtn')}}
      </el-button>
    </el-form-item>

    <el-divider>{{t('login.thirdparty')}}</el-divider>

    <el-form-item>
      <div class="login-methods">
        <icon-wechat theme="outline" size="24" fill="#333" />
        <icon-alipay theme="outline" size="24" fill="#333" />
        <icon-github theme="outline" size="24" fill="#333" />
        <icon-twitter theme="outline" size="24" fill="#333" />
        <icon-google theme="outline" size="24" fill="#333" />
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import {useI18n} from "vue-i18n";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {reactive, ref, toRefs, unref, watch} from "vue";

export default {
  name: "LoginForm",
  setup() {
    const {t} = useI18n();
    const store = useStore();
    const router = useRouter();
    const validateForm = ref(null);
    const state = reactive({
      ruleForm: {
        username: 'admin',
        password: 'admin'
      },
      loading: false,
      checkedPwd: false,
      redirect: undefined,
      rules: {  /*校验规则, trigger: 'blur'失焦时触发*/
        username: [{required: true, message: t('login.rules.username'), trigger: 'blur'}],
        password: [{required: true, message: t('login.rules.password'), trigger: 'blur'}],
      }
    });

    // 监听
    watch(
        () => router.currentRoute,
        ({_value}) => {   /*_value等价于router.currentRoute*/
          const route = _value;
          state.redirect = (route.query && route.query.redirect) || '/';
        },
        {
          immediate: true
        }
    );

    // 登录
    const handleLogin = async () => {
      const form = unref(validateForm); // unref()：是 val = isRef(val) ? val.value : val 的语法糖。
      if (!form) return;
      await form.validate((valid) => {
        if (valid) {
          state.loading = true;
          store.dispatch('user/login', state.ruleForm)
              .then(() => {
                const routerPath = (state.redirect === '/404' || state.redirect === '/401')? '/' : state.redirect;
                router.push(routerPath).catch(() => {});
                state.loading = false;
              })
              .catch(() => {
                state.loading = false;
              });
        }
      });
    };
    return {
      ...toRefs(state), // ...解构出来不丢失响应性
      validateForm,
      handleLogin,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
  .login-ruleForm {
    margin-top: 1rem;
    :deep(.el-input__prefix) {
      top: 2px;
      padding: 0 4px;
    }
    .login-methods {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around; /*space-around 每个item 左右方向的margin相等。两个item中间的间距会比较大*/
    }
    .login-btn {
      width: 100%;
    }
    .login-check {
      width: 100%;
      display: flex;
      align-content: center;
      justify-content: space-between; /*space-between 最左、最右item贴合左侧或右侧边框，item与item之间间距相等。*/
    }
  }
</style>