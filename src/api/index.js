import request from "@/utils/request";

// 获取资源列表
export const getResourceList = () => {
   return request({
      url: '/getResourceList',
      method: 'get',
   });
};