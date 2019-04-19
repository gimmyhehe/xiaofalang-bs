// 管理后台操作日志列表
export function getSysLogList (params) {
  return request.get({
    url: '/backend/records',
    params: params
  })
}

// 获取代理域名列表
export function getDomainList (params) {
  return request.get({
    url: '/backend/domain',
    params: params
  })
}

// 设置代理域名的状态
export function setDomainStatus (params) {
  return request.post({
    url: '/backend/domain/status',
    params: params
  })
}
