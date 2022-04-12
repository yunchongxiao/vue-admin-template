import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建一个 axios 实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API + '/vue-admin-template', // url = base url + request url
  // baseURL: 'https://www.fastmock.site/mock/f3a0e69c0c13784dd6f8d6bbc62673a3/fastmock', // url = base url + request url
  // 设定 baseURL 为后端接口
  baseURL: 'http://localhost:8080', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // 设置响应时间
  timeout: 3600
})

// 设置请求拦截器
service.interceptors.request.use(
  // 发送请求前的设置
  request => {
    // 如果 当前浏览器存在 token，则添加到头部信息中
    if (store.getters.token) {
      // 向 header 添加 token
      // ['X-Token'] 是一个自定义的头信息键
      request.headers['X-Token'] = getToken()
    }
    return request
  },
  error => {
    // 发送请求失败时，在浏览器输出失败原因
    console.log('前端发送请求失败')
    console.log(error)
    return Promise.reject(error)
  }
)

// 设置响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // 获取响应中携带的 data 数据
    const res = response.data

    // 识别响应码是否为 200 （与后端数据一致）
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 401) {
        // to re-login
        MessageBox.confirm('您已退出登录，您可以留在此页面，或重新登录', '确认退出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 选择确定则清空浏览器token
          store.dispatch('user/resetToken').then(() => {
            // 刷新页面
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },

  // 后端数据响应失败时
  error => {
    console.log('后端数据响应失败' + error) // for debug
    Message({
      message: '后端数据响应失败' + error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
