import detailLayout from '../../public/csvData/detailLayout'
import targetGroup from '../../public/csvData/targetGroup'
import target from '../../public/csvData/target'
import { guid } from '@/utils/index'
import { toArrays } from 'jquery-csv'

/**
 * 解析数据
 * 返回页面详情页可用的数据
 * @param {String} type
 * @returns {Array}
 */
export function arr(type) {
  const data = detailLayout.split('\n')
  const arr = []
  const tabs = []
  const tabList = []
  data.forEach((i) => {
    const item = i.split(',')
    if (item[0] === type) {
      if (tabs.indexOf(item[1]) === -1) {
        tabs.push(item[1])
      }
      arr.push(item)
    }
  })
  tabs.forEach((i) => {
    const list = []
    arr.forEach((ii) => {
      if (ii.indexOf(i) > -1) {
        list.push({
          x: Number(ii[7]), // 格栅位置
          y: Number(ii[6]), // 格栅位置
          w: Number(ii[8]), // 格栅宽度
          h: Number(ii[9]), // 格栅高度
          i: guid(), // 格栅id
          t: ii[2], // 指标类型
          k: ii[3], // 指标名称
          v: ii[4], // 格栅视图类型
          s: ii[5] // 趋势图是否堆叠
        })
      }
    })
    tabList.push({ title: i, list })
  })
  return tabList
}

/**
 * 根据指标名获取指标的'中文名','中文说明','单位'
 * 要区分指标类型:单指标/指标组合
 * 指标组合的中文说明='指标组合中文说明+单个指标中文说明'
 * @param {String} type
 * @param {String} name
 * @returns {Object}
 */
export function getTargetData(type, name) {
  const data = toArrays(target)
  let obj = {}
  if (type === '单指标') {
    data.forEach((i) => {
      if (i[4] === name) {
        const explain = i[10].replace('\\n', '\n')
        obj = {
          title: i[6],
          explain,
          unit: i[8]
        }
      }
    })
  } else if (type === '指标组合') {
    let explain = ''
    const data2 = toArrays(targetGroup)
    data2.forEach((i) => {
      if (i[2] === name) {
        obj.title = i[4]
        explain += i[6]
        const list2 = i[5].split('\n')
        if (list2.length) {
          list2.forEach((ii) => {
            data.forEach((iii) => {
              if (iii[4] === ii && iii[10]) {
                const e = iii[10].replace('\\n', '\n')
                explain = explain + '\n' + e
              }
            })
          })
        }
        obj.explain = explain
      }
    })
  }

  return obj
  /*
  const data = target.split('\n')
  let obj = {}
  if (type === '单指标') {
    data.forEach((i) => {
      const list = i.split(',')
      if (list[4] === name) {
        obj = {
          title: list[6],
          explain: list[10],
          unit: list[8]
        }
      }
    })
  } else if (type === '指标组合') {
    let explain = ''
    const data2 = targetGroup.split('\n')
    console.dir(data2);
    data2.forEach((i) => {
      const list = i.split(',')
      if (list[2] === name) {
        obj.title = list[4]
        explain += list[6]
        const list2 = list[5].split('\n')
        if (list2.length) {
          list2.forEach((ii) => {
            data.forEach((iii) => {
              const list3 = iii.split(',')
              if (list3[4] === ii) {
                explain = explain + '\n' + list3[10]
              }
            })
          })
        }
        obj.explain = explain
      }
    })
  }
  return obj
  */
}
