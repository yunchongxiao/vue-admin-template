import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },

  {
    path: '/signup',
    component: () => import('@/views/signup'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/pre-loan',
    component: Layout,
    redirect: '/pre-loan/blacklist',
    name: 'preLoan',
    meta: { title: '贷前准入', icon: 'preloan' },
    children: [
      {
        path: 'blacklist',
        name: 'blacklist',
        component: () => import('@/views/preLoan/blacklist'),
        meta: { title: '黑白名单', icon: 'blacklist' }
      },
      {
        path: 'credit-risk',
        name: 'creditRisk',
        component: () => import('@/views/preLoan/creditRisk'),
        meta: { title: '信用风险', icon: 'creditrisk' }
      },
      {
        path: 'creditline',
        name: 'creditline',
        component: () => import('@/views/preLoan/creditline'),
        meta: { title: '授信额度', icon: 'yuan' }
      }
    ]
  },
  {
    path: '/in-loan',
    component: Layout,
    redirect: '/in-loan/data-analysis',
    name: 'inLoan',
    meta: { title: '贷中预警', icon: 'inloan' },
    children: [
      {
        path: 'data-analysis',
        name: 'dataAnalysis',
        component: () => import('@/views/inLoan/dataAnalysis'),
        meta: { title: '数据分析', icon: 'linechart' }
      },
      {
        path: 'behavior-track',
        name: 'behaviortrack',
        component: () => import('@/views/inLoan/behaviortrack'),
        meta: { title: '行为追踪', icon: 'track' }
      },
      {
        path: 'creditline-adjust',
        name: 'creditlineadjust',
        component: () => import('@/views/inLoan/creditlineadjust'),
        meta: { title: '调整授信', icon: 'transaction' }
      }
    ]
  },
  {
    path: '/post-loan',
    component: Layout,
    redirect: '/post-loan/overdue-collection',
    name: 'postLoan',
    meta: { title: '贷后管理', icon: 'postloan' },
    children: [
      {
        path: 'overdue-collection',
        name: 'overdueCollection',
        component: () => import('@/views/postLoan/overdueCollection'),
        meta: { title: '逾期催收', icon: 'time' }
      },
      {
        path: 'case-management',
        name: 'caseManagement',
        component: () => import('@/views/postLoan/caseManagement'),
        meta: { title: '案例管理', icon: 'case-archive' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  {
    path: '/profile',
    component: Layout,
    // hidden: true,
    redirect: 'noRedirect',
    children: [{
      path: 'index',
      name: 'Profile',
      component: () => import('@/views/profile/index'),
      meta: { title: '个人中心', icon: 'dashboard' }
    }]
  },

  {
    path: '/certification',
    component: Layout,
    // hidden: true,
    redirect: '/noRedirect',
    children: [{
      path: 'index',
      name: 'Certification',
      component: () => import('@/views/certification/index'),
      meta: { title: '企业认证', icon: 'dashboard' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
