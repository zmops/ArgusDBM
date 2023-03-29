import request from '@/utils/request'

// 根据app查询指定监控类型的需要输入参数的结构
export function getParams(app) {
  return request({
    url: '/api/apps/' + app + '/params',
    method: 'get'
  })
}

// 根据app查询指定监控类型的定义结构
export function getDefine(app) {
  return request({
    url: '/api/apps/' + app + '/define',
    method: 'get'
  })
}

// 查询所有监控的类型-指标组-指标层级,以层级结构输出
export function getHierarchy() {
  return request({
    url: '/api/apps/hierarchy',
    method: 'get'
  })
}

