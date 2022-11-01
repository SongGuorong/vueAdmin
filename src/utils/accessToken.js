import {setting} from "@/config/setting";
import Cookies from 'js-cookie';

const {tokenTableName} = setting;

export function getAccessToken() {
   return Cookies.get(tokenTableName);
}

export function setAccessToken(accessToken) {
   return Cookies.set(tokenTableName, accessToken);
}

export function removeAccessToken() {
   return Cookies.remove(tokenTableName);
}