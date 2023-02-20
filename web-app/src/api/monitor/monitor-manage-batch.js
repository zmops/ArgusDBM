import request from '@/utils/request'

// 根据查询过滤项获取监控信息列表
export function getMonitors(query) {
  return request({
    url: '/api/monitors',
    method: 'get',
    params: query
  })
}
//
export function delMonitors(ids) {
  return request({
    url: '/api/monitors',
    method: 'delete',
    data: { ids }
  })
}
