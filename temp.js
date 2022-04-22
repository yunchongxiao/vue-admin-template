import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 获取 token
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 进度条设置

const whiteList = ['/login', '/signup', '/auth-redirect'] // 跳转白名单

router.beforeEach(async(to, from, next) => {
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
      next({ path: '/' })
      // 进度条设置为完成
      NProgress.done()
    } else { // 如果用户访问的不是注册、登录页面
      // 查询用户是否存在访问权限
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        // 放行
        next()
      } else {
        // 尝试获取用户信息
        try {
          // 注意：角色必须是对象数组！如：['admin'] 或 ,['developer','editor']
          // 从用户信息中提取角色
          // const { roles } = await store.dispatch('user/getInfo')
          // 生成角色对应的路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 将路由添加到可访问路由中
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
