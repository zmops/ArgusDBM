import { t, te } from '../locales';
import defaultSetting from '@/settings';

const title = defaultSetting.title || 'Argus DBM';

export default function getTitle(key: string): string {
  const haskey = te(`route.${key}`);
  if (haskey) {
    const translatedTitle = t(`route.${key}`);
    return `${translatedTitle} - ${title}`;
  }
  return title;
}
