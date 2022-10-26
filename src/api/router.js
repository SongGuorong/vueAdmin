import request from '@/utils/request';

// 获取路由列表
export const getRouterList = (data) => {
   return request({
      url: '/menu/navigate',
      method: 'post',
      data,
   });
};