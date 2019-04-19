const getters = {
  app_base_api: state => {
    return `${state.app.app_base_api}${state.app.app_base_api.endsWith('/') ? '' : '/'}`
  },
  app_api_origin: state => {
    return `${state.app.app_api_origin}${state.app.app_api_origin.endsWith('/') ? '' : '/'}`
  },
  sidebar: state => state.app.sidebar,
  adminMaintain: state => state.app.adminMaintain,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  user_info: state => state.user.info,
  pm: state => state.user.pm,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}
export default getters
