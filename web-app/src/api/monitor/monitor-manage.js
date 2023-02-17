import request from '@/utils/request'

//新增一个监控应用
export function addMonitor(data) {
    return request({
      url: '/api/monitor',
      method: 'post',
      data
    })
  }
  
  //测试连接可用性
  export function detect(data) {
    return request({
      url: '/api/monitor/detect',
      method: 'post',
      data
    })
  }