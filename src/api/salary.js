// 保存日工资方案
export function postFormData (params) {
  return request.post({
    url: '/backend/dailyWagePlan/setBackPlan',
    params: params
  })
}
// 修改日工资方案
export function editSalaryPlan (params) {
  return request.post({
    url: '/backend/dailyWagePlan/editBackPlan',
    params: params
  })
}
// 获取所有日工资方案，不分页
export function getAllSalary () {
  return request.get({
    url: '/backend/dailyWagePlan/getAllBackPlans'
  })
}
// 获取日工资方案列表
export function getSalaryList (params) {
  return request.get({
    url: '/backend/dailyWagePlan/getBackPlans',
    params: params
  })
}
// 获取日工资方案详情
export function getSalaryDetail (id) {
  return request.get({
    url: '/backend/dailyWagePlan/getBackOnePlan',
    params: { id: id }
  })
}
// 停用/启用日工资方案
export function toggleEnabled (params) {
  return request.post({
    url: '/backend/dailyWagePlan/enabledOrNot',
    params: params
  })
}
