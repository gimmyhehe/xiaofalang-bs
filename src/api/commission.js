import { exportData } from '@/utils/request'
// 后台管理保存佣金方案
export function secCommission (params) {
  return request.post({
    url: '/backend/commissionPlan/set',
    params: params
  })
}

// 后台管理修改佣金方案
export function editCommission (params) {
  return request.post({
    url: '/backend/commissionPlan/edit',
    params: params
  })
}

// 后台佣金方案列表
export function getListCommission (params) {
  return request.get({
    url: '/backend/commissionPlan/getList',
    params: params
  })
}

// 后台管理获取佣金方案
export function getOneCommission (id) {
  return request.get({
    url: '/backend/commissionPlan/getOne',
    params: { id }
  })
}

// 后台佣金方案启用/停用
export function enabledOrNotCommission (params) {
  return request.post({
    url: '/backend/commissionPlan/enabledOrNot',
    params: params
  })
}

// 保存佣金期数
export function setCommissionPeriod (params) {
  return request.post({
    url: '/backend/commissionPeriod/set',
    params: params
  })
}

// 佣金期数列表
export function getListCommissionPeriod (params) {
  return request.get({
    url: '/backend/commissionPeriod/getList',
    params: params
  })
}

// 佣金期数
export function getOneCommissionPeriod (id) {
  return request.get({
    url: '/backend/commissionPeriod/getOne',
    params: { id }
  })
}

// 删除佣金期数
export function deleteCommissionPeriod (id) {
  return request.post({
    url: '/backend/commissionPeriod/delete',
    params: { id }
  })
}

// 后台管理修改佣金期数
export function editCommissionPeriod (params) {
  return request.post({
    url: '/backend/commissionPeriod/edit',
    params: params
  })
}

// 佣金明细列表
export function getlistCommissionDetails (params) {
  return request.get({
    url: '/backend/commissionDetails/getlist',
    params: params
  })
}
export function exportCommissionDetails (params) {
  return exportData({
    url: '/backend/commissionDetails/export',
    params: params
  })
}

// 派发/取消佣金
export function grantOrNotCommissionDetails (params) {
  return request.post({
    url: '/backend/commissionDetails/grantOrNot',
    params: params
  })
}

// 结算佣金
export function setDetailsCommissionDetails (id) {
  return request.post({
    url: '/backend/commissionDetails/setDetails',
    params: { id }
  })
}

// 获取高级总代
export function getSeniors () {
  return request.get({
    url: '/backend/member/getSeniors'
  })
}
