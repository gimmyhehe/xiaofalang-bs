import Vue from 'vue'
import Router from 'vue-router'

const _import = file => () => import('@/views/' + file + '.vue')
const Layout = () => import('@/views/layout/Layout')
Vue.use(Router)



export const constantRouterMap = [
  { path: '/page/login', component: _import('common/login'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  // { path: '/maintenance', component: _import('errorPage/maintain'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  { path: '/page/', redirect: '/', hidden: true },
  {
    path: '/',
    component: Layout,
    // redirect: '/page/dashboard',
    name: 'Home',
    hidden: true,
    children: [
      { path: 'page/dashboard', component: _import('common/dashboard'), name: 'Home' },
      { path: 'page/modifyPassword', component: _import('common/modifyPassword'), name: 'modifyPassword' },
      { path: 'page/onLineUsers', component: _import('common/onLineUsers'), name: 'onLineUsers' }
    ]
  },
  { path: '/origin', hidden: true, component: _import('proxySetup/originSetup') } // 修改请求的地址

]

export default new Router({
  /**
   * 后端支持可开
   * location / {
      try_files $uri $uri/ /index.html;
    }
   */
  mode: 'history',
  base: __dirname,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})