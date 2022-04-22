import request from '@/utils/request'

const BASE_URL = '/pre-loan/blacklist'
/**
 * 从后端获取黑名单列表
 * @param
 * @returns {*}
 */
export function fetchBlacklist(query) {
  return request({
    url: BASE_URL + '/getlist',
    method: 'get',
    params: query
  })
}

export function deleteBlacklist(data) {
  return request({
    url: BASE_URL + '/delete',
    method: 'post',
    data
  })
}
export function addBlacklist(data) {
  return request({
    url: BASE_URL + '/add',
    method: 'post',
    data
  })
}

