
import elementEnLocale from 'element-plus/lib/locale/lang/en';
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn';

// user defined lang
import enLocale from './lang/en';
import zhLocale from './lang/zh-cn';

const message = {
    'en': {
        ...enLocale,
        ...elementEnLocale,
    },
    'zh-cn': {
        zhLocale,
        ...elementZhLocale,
    },
};

export const getLocale = () => {

}


