/**
 * @description 常用公共函数
 */
import {setting} from "@/config/setting";

const {title} = setting;

export const getPageTitle = (pageTitle) => {
   if (pageTitle) {
      return `${pageTitle}-${title}`;
   }
   return `${title}`;
};

// 获取本地图片
export const getImageUrl = (name) => {
   return new URL(`../assets/${name}`, import.meta.url).href;
}