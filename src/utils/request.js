import {setting} from "@/config/setting";
import {netConfig} from '@/config/netConfig';
import {ElMessage, ElMessageBox} from "element-plus";
import router from "@/router/index";
import axios from "axios";
import store from "@/store/index";
import qs from "qs";

const {tokenName} = setting;
const {baseURL, contentType, invalidCode, noPermissionCode, requestTimeout, successCode} = netConfig;

let tokenLose = true;  // 已登录

/**
 * 处理code异常
 */
const handleCode = (code, msg) => {
   switch (code) {
      case invalidCode:
         tokenLose = false;
         ElMessageBox.confirm('您已掉线，或者访问权限出错，请重新登录！', '重新登录', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
         }).then(async () => {
            // 处理重新登录逻辑(点击确定)
         }).catch(() => {
            tokenLose = true;
         });
         break;
      case noPermissionCode:
         router.push({path: '/401'}).catch(() => {
         });
         break;
      default:
         ElMessage.error(msg || `后端接口${code}异常`);
   }
};

const instance = axios.create({
   baseURL,
   timeout: requestTimeout,
   headers: {
      'Content-Type': contentType,
   },
});

// 拦截器
instance.interceptors.request.use(
   (config) => {
      if (store.getters['user/accessToken']) {
         config.headers[tokenName] = store.getters['user/accessToken'];
      }
      if (config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
         config.data = qs.stringify(config.data);  // qs.stringify,将对象数据转为字符串，并用&进行拼接。看到&，就知道了qs.stringify的作用，用于前后端参数传递的时候。前端通过这个方法，将要传递的对象转换成字符串，拼接成带参数的请求地址。
      }
      return config;   // config就是axios中请求传递的参数
   }, (error) => {
      return Promise.reject(error);
   }
);

instance.interceptors.response.use(
   (response) => {
      const res = response.data;
      const {data} = response;
      const {code, msg} = data;
      // 操作成功
      if (successCode.indexOf(code) !== -1) {
         return res;
      } else {
         console.log("----=====", response);
         handleCode(code, msg);
         return Promise.reject();
      }
   }, (error) => {
      const {response, message} = error;
      console.log(error);
      if (error.response && error.response.data) {
         const {status, data} = response;
         console.log('---===1222=', response);
         handleCode(status, data.msg || message);
         return Promise.reject(error);
      } else {
         let {message} = error;
         if (message === 'Network Error') {
            message = '后端接口连接异常';
         }
         if (message.includes('timeout')) {
            message = '后端接口请求超时';
         }
         if (message.includes('Request failed with status code')) {
            const code = message.substr(message.length - 3);
            console.log('---===2244=', response);
            message = '后端接口' + code + '异常';
         }
         console.log('---===224ee4=', response);
         ElMessage.error(message || `后端接口未知异常`);  // `表示模板字符串,可以解析${}获得插值
         return Promise.reject(error);
      }
   }
);

export default instance;