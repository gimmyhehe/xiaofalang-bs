// 管理员列表
export function getAdminList (params) {
  return request.get({
    url: '/backend/adminList/all',
    params: params
  })
}

// 获取角色
export function getRoles (params) {
  return request.get({
    url: '/backend/adminList/getRoles',
    params: params
  })
}

// 获取管理员信息
export function getOne (params) {
  return request.get({
    url: '/backend/adminList/getOne',
    params: params
  })
}

// 新增管理员
export function setAdmin (params) {
  return request.post({
    url: '/backend/adminList/setAdmin',
    params: params,
    encryptParams: ['password', 'password_confirmation']
  })
}

// 修改管理员信息
export function updateAdmin (params) {
  return request.post({
    url: '/backend/adminList/updateAdmin',
    params: params,
    encryptParams: ['password', 'password_confirmation']
  })
}

// 启用/停用
export function enabledOrNot (params) {
  return request.post({
    url: '/backend/adminList/enabledOrNot',
    params: params
  })
}

// 管理员修改密码
export function modifyPwd (params) {
  return request.post({
    url: '/backend/modifyPwd',
    params: params,
    encryptParams: ['oldPwd', 'password', 'password_confirmation']
  })
}
