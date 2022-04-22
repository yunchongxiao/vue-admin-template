import request from '@/utils/request'

const BASE_URL = '/pre-loan/creditline'
export function fetchCreditLineList(query) {
  return request({
    url: BASE_URL + '/getlist',
    method: 'get',
    params: query
  })
}
