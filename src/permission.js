import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权
import { getKey } from '@/api/app'

const loginPage = '/page/login'
const whiteList = ['/page/login', '/origin']
router.beforeEach(async (to, from, next) => {
  NProgress.start()

  // if (!store.state.app.isInitAPI) { // 初始化选择api线路
  //   await store.dispatch('changeAPI').then(() => {
  //     // store.dispatch('getNavGameList')
  //     store.state.app.isInitAPI = true
  //   })
  // }

  // if (!store.state.app.jsencrypt.isInit) { // 获取公钥
  //   await getKey().then(({ err, res }) => {
  //     if (!err) {
  //       store.state.app.jsencrypt.isInit = true
  //       store.state.app.jsencrypt.encryptor.setPublicKey(res.key)
  //     } else {}
  //     // store.dispatch('getNavGameList')
  //   })
  // }

  if (getToken()) {
    if (to.path === loginPage) {
      next({ path: '/' })
    } else {
      if (!store.getters.isInit) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GenerateRoutes', { pm: store.getters.pm }).then(() => {
          // 添加动态路由
          router.addRoutes(store.getters.addRouters)
          next({ ...to })
        })
      } else {
        next()
      }
      // if (store.getters.gamesAndGroups.isInit !== 1) {
      // // if (store.getters.roles.length === 0) {
      //   // store.commit('SET_ROLES', 'admin')
      //   // store.dispatch('GenerateRoutes', {}).then(() => {
      //   //   // to-do重复添加路由,过滤路由
      //   //   router.addRoutes(store.getters.addRouters)
      //   //   // alert('dasdasd')
      //   //   next({ ...to })
      //   // })
      //   store.dispatch('GetInfo').then(res => {
      //     const roles = store.getters.roles
      //     store.dispatch('GenerateRoutes', { roles }).then(() => {
      //       // 添加动态路由
      //       router.addRoutes(store.getters.addRouters)
      //       next({ ...to })
      //     })
      //   })
      // } else {
      //   next()
      // }
    }
  } else {
    // 如果没有store的token还没清除,则重置
    if (store.getters.token) {
      store.dispatch('clearUserInfo')
    }
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(loginPage)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
