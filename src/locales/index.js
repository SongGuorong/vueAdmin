import elementEnLocale from 'element-plus/lib/locale/lang/en';
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn';
// user defined lang
import enLocale from './lang/en';
import zhLocale from './lang/zh-cn';

import { getLanguage } from "@/utils/cookies";
import { createI18n } from "vue-i18n";

const messages = {
    'en': {
        ...enLocale,
        ...elementEnLocale,
    },
    'zh-cn': {
        ...zhLocale,
        ...elementZhLocale,
    },
};

export const getLocale = () => {
    const cookieLanguage = getLanguage();
    if (cookieLanguage) {
        return cookieLanguage;
    }
    const language = navigator.language.toLowerCase();
    const locales = Object.keys(messages);
    for (const locale of locales) {
        if (language.indexOf(locale) > -1) {
            return locale;
        }
    }
    return 'zh-cn';
}

const i18n = createI18n({
    locale: getLocale(),
    messages: messages,
});

export default i18n;
