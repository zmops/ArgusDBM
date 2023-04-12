import { createI18n } from 'vue-i18n';
import locales from './lang';
import type { LocaleKey } from './lang';

const i18n = createI18n({
  locale: 'zh',
  fallbackLocale: 'en',
  messages: locales
});

export function t(key: string) {
  return i18n.global.t(key);
}
export function te(key: string) {
  return i18n.global.te(key);
}

export function setLocale(locale: LocaleKey) {
  i18n.global.locale = locale;
}

export function getLocale() {
  return ref(i18n.global.locale);
}

export const localesList = Object.keys(locales).map((key) => {
  return {
    label: locales[key as LocaleKey].lang,
    value: key
  };
});
export default i18n;
