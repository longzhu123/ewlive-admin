import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../page/layout/Layout'
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/login', component: () => import('@/page/login/index') },
    { path: '/register', component: () => import('@/page/register/index')},
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      name: 'Dashboard',
      children: [{
        path: 'dashboard',
        component: () => import('@/page/dashboard/index')
      }]
    },
    {
      path: '/system',
      component: Layout,
      children: [
        {
          path: 'sysUser',
          component: () => import('@/page/view/system/sysUser/index'),
          name: 'sysUser'
        },
        {
          path: 'sysMenu',
          component: () => import('@/page/view/system/sysMenu/index'),
          name: 'sysMenu'
        },
        {
          path: 'sysRole',
          component: () => import('@/page/view/system/sysRole/index'),
          name: 'sysRole'
        },
        {
          path: 'sysDic',
          component: () => import('@/page/view/system/sysDic/index'),
          name: 'sysDic'
        },
        {
          path: 'crud',
          component: () => import('@/page/view/system/crud/index'),
          name: 'crud'
        },
      ]

    },
    {
      path: '/monitor',
      component: Layout,
      children: [
        {
          path: 'logOperate',
          component: () => import('@/page/view/monitor/logOperate/index'),
          name: 'logOperate'
        },
        {
          path: 'logError',
          component: () => import('@/page/view/monitor/logError/index'),
          name: 'logError'
        },
        {
          path: 'logLogin',
          component: () => import('@/page/view/monitor/logLogin/index'),
          name: 'logLogin'
        },

      ]

    },
    { path: '/404', component: () => import('@/page/404/index') },
    { path: '*',redirect: '/404'}
  ]
})
