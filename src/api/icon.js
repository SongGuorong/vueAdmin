import request from "@/utils/request";

// 获取图标
export const getIcons = () => {
   return request({
      url: '/icon',
      method: 'get',
   });
};