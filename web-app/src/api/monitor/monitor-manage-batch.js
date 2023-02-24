import request from '@/utils/request'

// 根据查询过滤项获取监控信息列表
export function getMonitors(query) {
  return request({
    url: '/api/monitors',
    method: 'get',
    params: query
  })
}

// 根据ids删除监控资源
export function delMonitors(ids) {
  return request({
    url: '/api/monitors',
    method: 'delete',
    params: { ids: ids.toString() }
  })
}

// 启用监控
export function enableMonitors(ids) {
  return request({
    url: '/api/monitors/manage',
    method: 'get',
    params: { ids: ids.toString() }
  })
}

// 禁用监控
export function disableMonitors(ids) {
  return request({
    url: '/api/monitors/manage',
    method: 'delete',
    params: { ids: ids.toString() }
  })
}

// 监控详情-查询最新数据
export function getLatestValue(monitorId, metrics) {
  return request({
    url: `/api/monitor/${monitorId}/metrics/${metrics}`,
    method: 'get'
  })
}

// 监控详情-查询历史数据
export function getHistoryValue(monitorId, metricFull) {
  return request({
    url: `/api/monitor/${monitorId}/metric/${metricFull}`,
    method: 'get'
  })
}
