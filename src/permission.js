import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从 cookie 获取 token
import getPageTitle from '@/utils/get-page-title' // 获取本页标题

NProgress.configure({ showSpinner: false }) // 设置进度条

const whiteList = ['/login', '/signup', '/auth-redirect'] // 不跳转白名单

/**
 * 在每次跳转前
 *
 */
router.beforeEach(async(to, from, next) => {
  // 开启进度条
  NProgress.start()

  // 设置标题
  document.title = getPageTitle(to.meta.title)

  // 从 cookie 获取 token
  const hasToken = getToken()
  // 如果存在 token，即用户已登录
  if (hasToken) {
    // 如果用户想访问登录或注册页面
    if (to.path === '/login' || to.path === '/signup') {
      // 跳转到主页
      next({ path: '/' })
      // 完成进度条
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // 如果在登录状态下访问非注册、登录页面
      // 判断当前角色是否拥有访问该路由的权限
      // 从 store 中获取 权限
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // 如果有权限,则放行
      if (hasRoles) {
        next()
      } else {
        // 如果没权限,则需要尝试获取权限
        try {
          // 角色必须是对象数组！如：['admin'] 或 ,['developer','editor']
          // 通过getInfo获取用户权限
          const { roles } = await store.dispatch('user/getInfo')

          // 根据角色查询可获得的路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 动态生成路由
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // 如果发生错误,则清除用户token,跳转主页,重新开始
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
