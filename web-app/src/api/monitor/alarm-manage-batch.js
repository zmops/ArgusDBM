import request from '@/utils/request'

// 根据查询过滤项获取告警信息列表
export function getAlerts(query) {
  return request({
    url: '/api/alerts',
    method: 'get',
    params:query
  })
}

// 批量修改告警状态,设置已读未读
export function putStatus(status,ids) {
    return request({
      url: '/api/alerts/status/'+status,
      method: 'put',
      params:{ids:ids.toString()}
    })
  }

  // 根据告警ID列表批量删除告警
export function delAlerts(ids) {
  return request({
    url: '/api/alerts',
    method: 'delete',
    params:{ids:ids.toString()}
  })
}

  // 清空所有告警信息
  export function clearAlerts() {
    return request({
      url: '/api/alerts/clear',
      method: 'delete'
    })
  }
  
  // 获取告警统计信息
  export function getSummary() {
    return request({
      url: '/api/alerts/summary',
      method: 'get'
    })
  }
