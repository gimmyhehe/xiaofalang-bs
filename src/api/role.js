// 获取默认的菜单权限
export function getDefaultRoleList () {
  return request.get({
    url: '/backend/role/default_list'
  })
}

// 新增角色，增加权限
export function addRole (params) {
  return request.post({
    url: '/backend/role',
    params
  })
}

// 更改对应角色的菜单权限
export function editRole (params) {
  return request.put({
    url: '/backend/role',
    params
  })
}

// 获取角色已开通的菜单权限列表
export function getRoleDetail (params) {
  return request.get({
    url: '/backend/role',
    params
  })
}

// 获取角色列表
export function getRoleList (params) {
  return request.get({
    url: '/backend/role/role_list',
    params
  })
}
