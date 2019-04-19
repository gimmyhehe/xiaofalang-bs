import { asyncRouterMap, constantRouterMap } from '@/router/index'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param pm
 * @param route
 */
function hasPermission (pm, route) {
  if (route.meta && route.meta.permission) {
    return _.intersection(pm, route.meta.permission).length !== 0
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routerMap
 * @param pm
 */
function filterAsyncRouter (routerMap, pm) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(pm, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, pm)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }

  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { pm } = data
        let accessedRouters
        if (!pm) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, pm)
        }
        commit('SET_ROUTERS', accessedRouters)
        commit('SET_INIT', true)
        resolve()
      })
    }
  }
}

export default permission
