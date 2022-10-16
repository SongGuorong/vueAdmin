import {setting} from '@/config/setting';
const {langKey, themeKey} = setting;

import Cookies from 'js-cookie';

export const getLanguage = () => Cookies.get(langKey);

export const setLanguage = (lang) => Cookies.set(langKey, lang);

export const getSettings = () => {
    const settings = Cookies.get(themeKey);
    return settings ? JSON.parse(settings) : null;
}

export const setSettings = (theme) => Cookies.set(themeKey, JSON.stringify(theme));
