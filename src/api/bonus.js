// 保存分红方案
export function postFormData (params) {
  return request.post({
    url: '/backend/dividendPlan/setBackPlan',
    params: params
  })
}
// 修改分红方案
export function editBonusPlan (params) {
  return request.post({
    url: '/backend/dividendPlan/editBackPlan',
    params: params
  })
}
// 获取所有分红方案，不分页
export function getAllBonus () {
  return request.get({
    url: '/backend/dividendPlan/getAllBackPlans'
  })
}
// 获取分红方案列表
export function getBonusList (params) {
  return request.get({
    url: '/backend/dividendPlan/getBackPlans',
    params: params
  })
}
// 获取分红方案详情
export function getBonusDetail (id) {
  return request.get({
    url: '/backend/dividendPlan/getBackOnePlan',
    params: { id: id }
  })
}
// 获取经营者列表
export function getShareholders () {
  return request.get({
    url: '/backend/member/getShareholders'
  })
}
// 停用/启用分红方案
export function toggleEnabled (params) {
  return request.post({
    url: '/backend/dividendPlan/enabledOrNot',
    params: params
  })
}

// 结算分红金额
export function setDetails (params) {
  return request.post({
    url: '/backend/dividendDetails/setDetails',
    params: params
  })
}
