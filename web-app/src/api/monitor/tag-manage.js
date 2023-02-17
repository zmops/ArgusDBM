import request from '@/utils/request'

// 根据条件获取标签信息
export function getTags(query) {
  return request({
    url: '/api/tag',
    method: 'get',
    params: query
  })
}

// 修改一个已存在标签
export function modifyTags(data) {
  return request({
    url: '/api/tag',
    method: 'put',
    data
  })
}

// 新增标签
export function addTags(data) {
    return request({
      url: '/api/tag',
      method: 'post',
      data
    })
  }

  // 根据TAG ID删除TAG
export function delTags(ids) {
    return request({
      url: '/api/tag',
      method: 'delete',
      data:ids
    })
  }