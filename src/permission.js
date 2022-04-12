import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import {getToken} from '@/utils/auth' // 获取 token
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({showSpinner: false}) // 进度条设置

const whiteList = ['/login', '/signup'] // 跳转白名单

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  // 如果存在 token 信息，说明用户已登录
  if (hasToken) {
    // 如果用户想访问登录、注册路由，则直接跳转主页
    if (to.path === '/login' || to.path === '/signup') {
      // if is logged in, redirect to the home page
      // 跳转主页
      next({path: '/'})
      // 进度条设置为完成
      NProgress.done()
    } else { // 如果用户访问的不是注册、登录页面
      // 通过查询用户姓名的方式，查询是否已经获取了用户信息
      const hasGetUserInfo = store.getters.name
      // 如果已经获取了用户信息，则继续
      if (hasGetUserInfo) {
        next()
      } else {
        // 尝试获取用户信息
        try {
          // 获取用户信息
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // 删除浏览器 token 并且要求用户重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } // 如果没有登录
  else {
    /* has no token*/
    // 查询是否在路由白名单中
    if (whiteList.indexOf(to.path) !== -1) {
      // 放行
      next()
    } else {
      // 访问其他没有权限的页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
