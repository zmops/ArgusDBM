import zh from './zh';
import en from './en';

const locales = {
  zh,
  en
};

export type LocaleKey = keyof typeof locales;

export default locales;
