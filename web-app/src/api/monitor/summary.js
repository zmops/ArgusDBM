import request from '@/utils/request'

// 根据监控ID获取监控信息
export function getSummaryStatic() {
  return request({
    url: '/api/summary/static',
    method: 'get'
  })
}
