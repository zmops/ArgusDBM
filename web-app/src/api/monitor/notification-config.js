import request from '@/utils/request'

// 根据查询过滤项获取消息通知策略列表
export function getRules(query) {
  return request({
    url: '/api/notice/rules',
    method: 'get',
    params:query
  })
}

// 查询已存在的通知策略信息
export function getRule(id) {
  return request({
    url: '/api/notice/rule/'+id,
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

// 修改已存在的通知策略信息
export function modifyRule(data) {
  return request({
    url: '/api/notice/rule',
    method: 'put',
    data
  })
}

// 根据app查询指定监控类型的需要输入参数的结构
export function getReceivers() {
  return request({
    url: '/api/notice/receivers',
    method: 'get'
  })
}

// 查询已存在的接收人信息
export function getReceiver(id) {
  return request({
    url: '/api/notice/receiver/'+id,
    method: 'get'
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

// 修改已存在的接收人信息
export function modifyReceiver(data) {
  return request({
    url: '/api/notice/receiver',
    method: 'put',
    data
  })
}