import request from '@/utils/request'

const BASE_URL = '/pre-loan/creditrisk'
export function fetchCreditriskList(query) {
  return request({
    url: BASE_URL + '/getlist',
    method: 'get',
    params: query
  })
}

export function deleteCreditrisk(data) {
  return request({
    url: BASE_URL + '/delete',
    method: 'post',
    data
  })
}
