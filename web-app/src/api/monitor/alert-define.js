import request from '@/utils/request'

// Modify an existing alarm definition | 修改一个已存在告警定义
export function modifyDefine(data) {
  return request({
    url: '/api/alert/define',
    method: 'put',
    data
  })
}

// Added an alarm definition | 新增一个告警定义
export function addDefine(data) {
  return request({
    url: '/api/alert/define',
    method: 'post',
    data
  })
}

// Applies the association between specified alarm definitions and monitoring ｜ 应用指定告警定义与监控关联关系
export function getAlertDefineMonitors(alertDefineId) {
  return request({
    url: '/api/alert/define/' + alertDefineId + '/monitors',
    method: 'get'
  })
}

// Applies the association between specified alarm definitions and monitoring ｜ 应用指定告警定义与监控关联关系
export function appliesMonitors(alertDefineId) {
  return request({
    url: '/api/alert/define/' + alertDefineId + '/monitors',
    method: 'post'
  })
}

// You can obtain alarm definition information based on the alarm definition ID | 根据告警定义ID获取告警定义信息
export function getDefine(id) {
  return request({
    url: '/api/alert/define/' + id,
    method: 'get'
  })
}

// If the alarm definition does not exist, the alarm is deleted successfully ｜ 根据告警定义ID删除告警定义,告警定义不存在也是删除成功
export function delDefine(id) {
  return request({
    url: '/api/alert/define/' + id,
    method: 'delete'
  })
}

// You can obtain the list of alarm definitions by querying filter items ｜ 根据查询过滤项获取告警定义信息列表
export function getDefines(query) {
  return request({
    url: '/api/alert/defines',
    method: 'get',
    params:query
  })
}
