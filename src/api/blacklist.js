import request from '@/utils/request'

/**
 * 从后端获取黑名单列表
 * @param
 * @returns {*}
 */
export function fetchList() {
  return request({
    url: '/pre-loan/blacklist',
    method: 'get'
  })
}

export function deleteList(data) {
  return request({
    url: '/pre-loan/deletelist',
    method: 'post',
    data
  })
}
