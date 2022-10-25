import {setting} from "@/config/setting";
import {netConfig} from '@/config/netConfig';
import {ElMessageBox} from "element-plus";

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


    }
}