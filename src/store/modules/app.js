import Cookies from 'js-cookie'
import axios from 'axios'
import EventProxy from 'eventproxy'
import { JSEncrypt } from 'jsencrypt'
var ep = new EventProxy()

const app = {
  state: {
    ENV_CONFIG: process.env.ENV_CONFIG, // 打包的环境变量
    cacheRoute: {// 管理后台的全部有列表的，需要编辑修改的都添加返回按钮，方便直接返回上一层
      parentPath: '',
      cacheList: []
    },
    jsencrypt: {
      isInit: false,
      encryptor: new JSEncrypt()
    }, // 新建JSEncrypt对象
    isInitAPI: false, // api是否已经初始化设置完成
    isTestApi: false, // 是否正在切换线路
    app_base_api: '',
    app_api_origin: '', // api的origin部分
    app_base_api_list: (() => { // 初始化后端的线路列表
      let config
      if (localStorage.origin) {
        config = [localStorage.origin]
      } else {
        try {
          config = G_BASE_API instanceof Array ? G_BASE_API : String(G_BASE_API).split(',')
        } catch (e) { config = [] }
      }
      return config.map((item) => { // 构造格式以及过滤
        let [api, storage] = String(item).split('<=>')// api跟storage用<=>隔开
        if (api) {
          return { api, storage: storage || `${api.replace(new RegExp('^((https?)?:?//[^/]*).+', 'i'), '$1')}/storage` }
        } else { return false }
      }).filter((item) => !!item)
    })(),
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    adminMaintain: {
      type: null,
      start: null,
      end: null
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_APP_BASE_API: (state, api_config) => {
      state.app_base_api = axios.defaults.baseURL = api_config.api
      state.app_api_origin = api_config.storage
    },
    SET_API_STATUS: (state, status) => {
      state.isTestApi = status
    },
    SET_CACHE_ROUTE: (state, route) => {
      if (route.matched.length < 2) return false
      let _matched = route.matched.slice(-2)
      let [_parentComponent, _currentComponent] = _matched
      if (_currentComponent.meta && _currentComponent.meta.cache) { // 如果页面需要缓存
        if (_parentComponent.path !== state.cacheRoute.parentPath) { // 父路由相同则添加到缓存列表，不相同则新建缓存列表
          state.cacheRoute.parentPath = _parentComponent.path
          state.cacheRoute.cacheList = [_currentComponent]
        } else if (!state.cacheRoute.cacheList.find((item) => item.path === _currentComponent.path)) { // 判断当前组件是否存在
          state.cacheRoute.cacheList.push(_currentComponent)
        }
      } else if (// 如果父路由的路径或者当前路由不需要返回，则情况缓存的路由
        _parentComponent.path !== state.cacheRoute.parentPath ||
        (!_currentComponent.meta || !_currentComponent.meta.history)
      ) {
        state.cacheRoute.parentPath = ''
        state.cacheRoute.cacheList = []
      }
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar ({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice ({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    // 获取系统维护状态
    GetMaintain ({ commit, state }) {
      return getMaintenanceOnAdmin().then(({ res, err }) => {
        if (!err) {
          state.adminMaintain = res
        }
        return state.adminMaintain
      })
    },
  }
}

export default app
