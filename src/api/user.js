import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function signup(data) {
  return request({
    url: '/user/signup',
    method: 'post',
    data
  })
}

export function queryUser(data) {
  return request({
    url: '/user/query',
    method: 'get',
    params: data
  })
}
