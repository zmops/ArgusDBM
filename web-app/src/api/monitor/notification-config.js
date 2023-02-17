import request from '@/utils/request'

// 根据app查询指定监控类型的需要输入参数的结构
export function getReceivers() {
  return request({
    url: '/api/notice/receivers',
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