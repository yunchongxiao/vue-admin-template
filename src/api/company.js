import request from '@/utils/request'

export function queryCompany(data) {
  return request({
    url: '/company/query',
    method: 'get',
    params: data
  })
}
export function getCompanyDetails(cid) {
  return request({
    url: `/company/${cid}`,
    method: 'get'
  })
}

getCompanyDetails
