import Vue from 'vue'
import Router from 'vue-router'

/* layout */
// import Layout from '../views/layout/Layout'
// import parentView from '@/components/parent-view'

const _import = file => () => import('@/views/' + file + '.vue')
const Layout = () => import('@/views/layout/Layout')
const parentView = () => import('@/components/parent-view')
// console.log(process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)
/**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * activeSideBar: 选中该路由时激活菜单的 index
  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar, 并且它的url指向redirect的路径或者是第一个子路由的路径
  * meta : {
  *   activeSideBar: 选中该路由时激活(高亮)的elementui菜单的 index
  *   permission: 权限列表
  *   cache: (false) 设为true后，需要设置页面组件name属性和路由配置的name一致，页面在同一级的路由切换的时候，会缓存, 但如果切换到不同菜单，之前缓存的页面就会重置
  *   history: (null) 该路由的默认上一级页面，用于返回上一级按钮的使用
  * }  will control the page role
  **/
export const constantRouterMap = [
  { path: '/page/login', component: _import('common/login'), hidden: true },
  { path: '/page/register', component: _import('common/register'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  { path: '/page/', redirect: '/', hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/page/dashboard',
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

export const asyncRouterMap = [
  {
    path: '/page',
    component: Layout,
    redirect: 'noredirect',
    name: 'UserManagement',
    icon: 'group',
    meta: { permission: ['AddUser', 'UserList', 'MoveLog', 'IpBlacklist'] },
    children: [
      { path: 'user/add', meta: { permission: ['AddUser'] }, component: _import('user/add/add'), name: 'AddUser' },
      // 用户列表
      { path: 'user',
        component: parentView,
        redirect: '/page/user/list',
        meta: { // activeSideBar: 'add',
          permission: ['UserList'],
          activeSideBar: 'userList'
        },
        noDropdown: true,
        children: [
          { path: 'list', meta: { activeSideBar: 'userList', cache: true }, component: _import('user/list'), name: 'UserList' },
          { path: 'add/downLine', meta: { activeSideBar: 'userList', history: 'UserList' }, hidden: true, component: _import('user/add/add'), name: 'addDownLine' },
          { path: 'edit', meta: { activeSideBar: 'userList', history: 'UserList' }, component: _import('user/add/add'), name: 'editUser' },
          { path: 'add/member', meta: { activeSideBar: 'userList', history: 'UserList' }, hidden: true, component: _import('user/add/addMember'), name: 'addMember' },
          { path: 'edit/member', meta: { activeSideBar: 'userList', history: 'UserList' }, component: _import('user/add/addMember'), name: 'editMember' },
          { path: 'bank/add', meta: { activeSideBar: 'userList', history: 'UserList' }, component: _import('user/bank/add'), name: 'addBank' }
        ]
      },
      { path: 'user/seek', meta: { permission: ['BankQuery'] }, component: _import('user/seek'), name: 'BankQuery' },
      { path: 'IpBlacklist', meta: { permission: ['IpBlacklist'] }, component: _import('user/ipBlack/index'), name: 'IpBlacklist' },
      { path: 'user/moveLog', meta: { permission: ['MoveLog'] }, component: _import('user/log/moveLog'), name: 'MoveLog' },
      { path: 'user/operateLog', meta: { permission: ['MemberOperateLog'] }, component: _import('user/log/memberOperateLog'), name: 'MemberOperateLog' }

      // { path: 'user/recovery', component: _import('user/accountRecovery/index'), name: 'accountRecovery' }
    ]
  },
  {
    path: '/page/activity',
    component: Layout,
    redirect: 'noredirect',
    name: 'ActivityManagement',
    icon: 'activity',
    meta: { permission: ['AddActivity', 'ActivityList', 'ActivityAuditList', 'ActivityReport'] },
    children: [
      { path: 'add', meta: { permission: ['AddActivity'] }, component: _import('activity/edit'), name: 'AddActivity' },
      // { path: 'integral', component: _import('activity/integral'), name: 'integral' },  积分管理
      { path: '',
        meta: {
          permission: ['ActivityList'],
          activeSideBar: 'ActivityList'
        },
        noDropdown: true,
        component: parentView,
        children: [
          { path: 'list', meta: { permission: ['ActivityList'], activeSideBar: 'ActivityList', cache: true }, component: _import('activity/list'), name: 'ActivityList' },
          { path: 'edit/:id', meta: { activeSideBar: 'ActivityList', history: 'ActivityList' }, component: _import('activity/edit'), name: 'editActivity', hidden: true }
        ]
      },
      { path: 'auditlist', meta: { permission: ['ActivityAuditList'] }, component: _import('activity/auditlist'), name: 'ActivityAuditList' },
      { path: 'joinList', meta: { permission: ['JoinMemberList'] }, component: _import('activity/joinMemberList'), name: 'JoinMemberList' },
      { path: 'report', meta: { permission: ['ActivityReport'] }, component: _import('activity/activityReport'), name: 'ActivityReport' }
    ]
  },
  {
    path:'/page/barber',
    component: Layout,
    redirect: 'noredirect',
    name: 'Barber',
    icon: 'createtask',
    meta: { permission: ['addBarber', 'barberList'] },
    children: [
      { path: 'add', meta: { permission: ['addBarber'] }, component: _import('barber/edit'), name: 'addBarber' },
      { path: 'edit/:id', meta: { permission: ['addBarber'] }, component: _import('barber/edit'), name: 'editBarber',hidden: true },
      { path: 'list', meta: { permission: ['barberList'] }, component: _import('barber/barberList'), name: 'barberList' }
    ]
  },
  {
    path:'/page/product',
    component: Layout,
    redirect: 'noredirect',
    name: 'Product',
    icon: 'createtask',
    meta: { permission: ['addProduct', 'productList'] },
    children: [
      { path: 'add', meta: { permission: ['addProduct'] }, component: _import('product/edit'), name: 'addProduct' },
      { path: 'edit/:id', meta: { permission: ['addProduct'] }, component: _import('product/edit'), name: 'editProduct',hidden: true },
      { path: 'list', meta: { permission: ['productList'] }, component: _import('product/productList'), name: 'productList' }
    ]
  },
  {
    path:'/page/order',
    component: Layout,
    redirect: 'noredirect',
    name: 'Order',
    icon: 'createtask',
    meta: { permission: ['ordertList'] },
    children: [
      { path: 'list', meta: { permission: ['ordertList'] }, component: _import('order/orderList'), name: 'ordertList' }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
