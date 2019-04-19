import { exportData } from '@/utils/request'
// 获取存款申请列表
export function getTransferList (params) {
  return request.get({
    url: '/backend/pay/transfer/list',
    params: params
  })
}
// 导出存款申请列表
export function exportTransferList (params) {
  return exportData({
    url: '/backend/pay/transfer/Export',
    params: params
  })
}

// 管理员审核存款
export function setTransferStatus (params) {
  return request.post({
    url: '/backend/pay/transfer',
    params: params
  })
}

// 获取取款申请列表
export function getWithdrawList (params) {
  return request.get({
    url: '/backend/pay/withdraw/list',
    params: params
  })
}
// 导出取款申请列表
export function exportWithdrawList (params) {
  return exportData({
    url: '/backend/pay/withdraw/Export',
    params: params
  })
}

// 支付管理(财务)获取取款申请列表
export function getAuditWithdrawList (params) {
  return request.get({
    url: '/backend/pay/withdraw/mlist',
    params: params
  })
}

// 管理员审核提款
export function setWithdrawStatus (params) {
  return request.post({
    url: '/backend/pay/withdraw',
    params: params
  })
}

// 刷新提款的稽核点
export function refreshWithdraw (id) {
  return request.get({
    url: `/backend/pay/withdraw/refresh/${id}`
  })
}

// 获取会员账号的信息
export function getMoneyInfo (id) {
  return request.get({
    url: `/backend/pay/member_info/${id}`
  })
}

// 人工存入
export function setManualTransfer ({ username, money, join_rp, ap_factor, remark }) {
  return request.post({
    url: '/backend/pay/manual_transfer',
    params: {
      username, money, join_rp, ap_factor, remark
    }
  })
}

// 人工提款
export function setManualWithdraw ({ username, money, clear_maps, remark }) {
  return request.post({
    url: '/backend/pay/manual_withdraw',
    params: {
      username, money, clear_maps, remark
    }
  })
}

// 会计人员审核提款
export function confirmWithdraw (params) {
  return request.post({
    url: '/backend/pay/confirm_withdraw',
    params: params
  })
}

// // 获取有效的支付渠道列表
// export function getAvailableChannels() {
//   return request.get({
//     url: '/backend/pay/available_channels'
//   })
// }

// 获取所有的支付途径的名称列表
export function getPayMethodBriefList () {
  return request.get({
    url: '/backend/pay/pay_method/brief-list'
  })
}

// 获取有效的银行账号列表,入账的账号
export function getAvailableAccounts () {
  return request.get({
    url: '/backend/pay/available_accounts'
  })
}

// 财务锁住某条提款申请
export function payLockRecord ({ id }) {
  return request.get({
    url: `/backend/pay/lock/${id}`
  })
}

/**
 * 支付渠道管理相关接口
 */
// 获取所有的支付途径
export function getPayMethodList (params) {
  return request.get({
    url: '/backend/pay/pay_method/list',
    params: params
  })
}

// 添加支付途径
export function addPayMethod (params) {
  return request.post({
    url: '/backend/pay/pay_method',
    params: params
  })
}

// 修改支付途径
export function editPayMethod (params) {
  return request.put({
    url: '/backend/pay/pay_method',
    params: params
  })
}

// 获取所有的支付渠道的名称
export function getPayChannelBriefList (params) {
  return request.get({
    url: '/backend/pay/pay_channel/brief-list',
    params: params
  })
}

/**
* 补单功能的api
**/
// 查询支付订单的简要信息
export function orderBrief (id) {
  return request.get({
    url: `/backend/pay/order_brief/${id}`
  })
}

// 补单
export function fix (params) {
  return request.post({
    url: '/backend/pay/order/fix',
    params: params
  })
}

// 后台获取第三方支付列表
export function getPayOrderList (params) {
  return request.get({
    url: '/backend/pay/order/list',
    params: params
  })
}

// 取消order
export function cancelPayOrder (id) {
  return request.get({
    url: `/backend/pay/order/cancel/${id}`
  })
}

// 请求第三方更新订单状态
export function updatePayOrder (params) {
  return request.get({
    url: '/backend/pay/order/update',
    params
  })
}

// 人工存取那里获取所有开启中的活动列表
export function briefList (params) {
  return request.get({
    url: `/backend/reward-program/brief-list`,
    params: params
  })
}

// 人工存入挂钩优惠活动
export function manuaAdd (params) {
  return request.post({
    url: '/backend/reward-program/manual-add',
    params: params
  })
}

// 人工取出挂钩优惠活动
export function manualDeduct (params) {
  return request.post({
    url: `/backend/reward-program/manual-deduct`,
    params: params
  })
}
