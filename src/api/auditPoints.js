// 设置稽核点
export function settingAuditPoints (params) {
  return request.post({
    url: '/backend/ap/setting',
    params: params
  })
}

// 获取稽核点设置
export function getAuditPointsSetting () {
  return request.get({
    url: `/backend/ap/setting`
  })
}

// 人工存取获取稽核点
export function getAuditPointData () {
  return request.get({
    url: '/backend/pay/ap_setting'
  })
}

// 管理员获取某个用户的稽核点情况
export function getAuditPoints ({ username }) {
  return request.get({
    url: `/backend/ap/list/${username}`
  })
}

// 管理员获取稽核点关联的流水单的详情
export function getDetail (point_id) {
  return request.get({
    url: `/backend/ap/order_brief/${point_id}`
  })
}

// 管理员清除稽核点
export function clear (point_id) {
  return request.get({
    url: `/backend/ap/clear/${point_id}`
  })
}
