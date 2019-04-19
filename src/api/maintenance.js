
// 管理后台系统维护状态列表
export function getList () {
  return request.get({
    url: '/backend/maintenance/getlist'
  })
}

// 编辑系统维护状态
export function update (params) {
  return request.post({
    url: '/backend/maintenance/update',
    params: params
  })
}

// 管理后台获取系统维护状态
export function getMaintenanceOnAdmin () {
  return request.get({
    url: '/maintenance/getMaintenanceOnAdmin'
  })
}

// 编辑经营者新增高级总代审核设置
export function updateSenior (status) {
  return request.post({
    url: '/backend/maintenance/senior',
    params: { status }
  })
}

// 编辑手机邮箱唯一性检查设置
export function setUnique (params) {
  return request.post({
    url: '/backend/maintenance/unique',
    params: params
  })
}
