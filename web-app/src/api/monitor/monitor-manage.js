import request from '@/utils/request'

// 根据监控ID获取监控信息
export function getMonitor(id) {
  return request({
    url: '/api/monitor/' + id,
    method: 'get'
  })
}

// 新增一个监控应用
export function addMonitor(data) {
  return request({
    url: '/api/monitor',
    method: 'post',
    data
  })
}

// 修改一个已存在监控应用
export function modifyMonitor(data) {
  return request({
    url: '/api/monitor',
    method: 'put',
    data
  })
}

// 测试连接可用性
export function detect(data) {
  return request({
    url: '/api/monitor/detect',
    method: 'post',
    data
  })
}
