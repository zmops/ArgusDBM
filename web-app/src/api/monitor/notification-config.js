import request from '@/utils/request'

// 根据查询过滤项获取消息通知策略列表
export function getRules() {
  return request({
    url: '/api/notice/rules',
    method: 'get'
  })
}

// 根据app查询指定监控类型的需要输入参数的结构
export function getReceivers() {
  return request({
    url: '/api/notice/receivers',
    method: 'get'
  })
}

// 新增一个通知策略
export function addRule(data) {
  return request({
    url: '/api/notice/rule',
    method: 'post',
    data
  })
}

// 新增一个接收人
export function addReceiver(data) {
  return request({
    url: '/api/notice/receiver',
    method: 'post',
    data
  })
}