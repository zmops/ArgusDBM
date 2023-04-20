import { isStringNumber, isNumber } from '@estjs/tools';

const checkTime = function(i, suffix) {
  if (i === 0) {
    return '';
  }
  return (i + '').padStart(2, '0') + suffix;
};
export function secondsTransform(time) {
  if (!time) {
    return time;
  }
  if (isStringNumber(time + '')) {
    time = +time;
  }

  if (!isNumber(time)) {
    return time;
  }

  const days = Number.parseInt(time / 1000 / 60 / 60 / 24 + '', 10);// 计算剩余天数
  const hours = Number.parseInt(time / 1000 / 60 / 60 % 24 + '', 10);// 计算剩余小时数
  const minutes = Number.parseInt(time / 1000 / 60 % 60 + '', 10);// 计算剩分钟数
  const seconds = Number.parseInt(time / 1000 % 60 + '', 10);// 计算剩余秒数

  return checkTime(days, '天') + checkTime(hours, '时') + checkTime(minutes, '分') + checkTime(seconds, '秒') ;
}

