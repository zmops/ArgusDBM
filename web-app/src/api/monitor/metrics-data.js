import request from '@/utils/request'

// 查询仓储下存储服务的可用性状态
export function getStorageStatus() {
  return request({
    url: '/api/warehouse/storage/status',
    method: 'get'
  })
}

// 查询监控指标组的指标数据
export function getMetrics(monitorId, metrics) {
  return request({
    url: '/api/monitor/' + monitorId + '/metrics/' + metrics,
    method: 'get'
  })
}

// 查询监控指标组下的指定指标的历史数据
export function getMetricFull(query) {
  const {
    monitorId,
    metricFull
  } = query
  return request({
    url: '/api/monitor/' + monitorId + '/metric/' + metricFull,
    method: 'get',
    params: query
  })
}
