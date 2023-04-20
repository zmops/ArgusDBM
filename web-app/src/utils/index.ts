import { isNumber, isStringNumber } from '@estjs/tools';

type TargetContext = '_self' | '_parent' | '_blank' | '_top';

export const openWindow = (
  url: string,
  opts?: { target?: TargetContext; [key: string]: any }
) => {
  const { target = '_blank', ...others } = opts || {};
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue;
        return [...preValue, `${key}=${value}`];
      }, [])
      .join(',')
  );
};

export const regexUrl = new RegExp(
  '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:\\d\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  'i'
);

/**
 * 对象转url参数
 * @param data
 * @return string
 */
export function parseParams(data: Record<string, any>) {
  try {
    const tempArr = [];
    for (const i in data) {
      const key = encodeURIComponent(i);
      let val = data[i];
      // 内容中含有？ 会截断后续参数解析
      if (`${val}`.includes('?')) {
        val = encodeURIComponent(val);
      }
      tempArr.push(key + '=' + val);
    }
    return tempArr.join('&');
  } catch {
    return '';
  }
}
// 转换字符串，undefined,null等转化为""
export function parseStrEmpty(str: string | undefined | null) {
  if (!str || str === 'undefined' || str === 'null') {
    return '';
  }
  return str;
}
// 唯一标识符
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replaceAll(/[xy]/g, (c) => {
    const r = Math.trunc(Math.random() * 16);
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function filterParams(data: Record<string, any>, filterKey: string[] = [], trim = true, filterValue: any = undefined) {
  const str = JSON.stringify(data);
  let res: any = {};
  res = JSON.parse(str, (key, val) => {
    if (val !== undefined && key.indexOf('_') !== 0 && (filterKey.includes(key) ? val !== filterValue : true)) {
      if (typeof val === 'string') {
        return trim ? val.trim() : val;
      }
      return val;
    }
  });
  return res;
}

export function formatter2Number(val) {
  const isSN = isStringNumber(val);

  let v = val;

  if (isSN) {
    v = +v;
  }
  if (isNumber(v)) {

    if (Number.isInteger(v)) {
      return v;
    } else {
      return +v.toFixed(2);
    }
  }

  return v;
}
