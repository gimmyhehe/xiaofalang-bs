import { exportData } from '@/utils/request'
// 派发或者取消分红金额
export function toggleGrantBonus (params) {
  return request.post({
    url: '/backend/dividendDetails/grantOrNot',
    params: params
  })
}

// 查询全部分红报表
export function getAllBonusList (params) {
  return request.get({
    url: '/backend/dividendDetails/getAllBack',
    params: params
  })
}
// 后台根据帐号/账期导出代理分红报表
export function exportBonusList (params) {
  return exportData({
    url: '/backend/dividendDetails/export',
    params: params
  })
}

// 获取顶级代理分红报表
export function getTopBonusList (params) {
  return request.get({
    url: '/backend/dividendDetails/getAllBackTop',
    params: params
  })
}

// 获取下线分红报表
export function getNextBonusList (params) {
  return request.get({
    url: '/backend/dividendDetails/getBackNext',
    params: params
  })
}

// 派发或者取消日工资金额
export function toggleGrantSalary (params) {
  return request.post({
    url: '/backend/dailyWageDetails/grantOrNot',
    params: params
  })
}

// 查询全部日工资报表
export function getAllSalaryList (params) {
  return request.get({
    url: '/backend/dailyWageDetails/getAllBack',
    params: params
  })
}

// 获取顶级代理日工资报表
export function getTopSalaryList (params) {
  return request.get({
    url: '/backend/dailyWageDetails/getAllBackTop',
    params: params
  })
}
// 后台导出顶级代理日工资报表
export function exportTopSalaryList (params) {
  return exportData({
    url: '/backend/dailyWageDetails/export',
    params: params
  })
}

// 获取下线日工资报表
export function getNextSalaryList (params) {
  return request.get({
    url: '/backend/dailyWageDetails/getBackNext',
    params: params
  })
}

// 获取存取款汇总
export function getAccessAllList (params) {
  return request.get({
    url: '/backend/access/getAll',
    params: params
  })
}
// 后台导出存取款汇总
export function exportAccessAllList (params) {
  return exportData({
    url: '/backend/access/export',
    params: params
  })
}

// 获取代理存取款
export function getAccessAllNext (params) {
  return request.get({
    url: '/backend/access/getAllNext',
    params: params
  })
}

// 后台获取公司直属会员的存取款记录汇总
export function getComponyAccess (params) {
  return request.get({
    url: '/backend/access/getComponyAccess',
    params: params
  })
}

// 获取代理存取款明细
export function getDetailList (params) {
  return request.get({
    url: '/backend/access/getDetails',
    params: params
  })
}

// 获取存取款提款、人工取款列表
export function getWithdrawDetail (params) {
  return request.get({
    url: '/backend/pay/withdraw/detailsList',
    params: params
  })
}

// 获取存取款充值、人工存入列表
export function getTransferDetail (params) {
  return request.get({
    url: '/backend/access/transfer/detailsList',
    params: params
  })
}

// 获取取款报表
export function getMoneyLogWithdraw (params) {
  return request.get({
    url: '/backend/money_log/withdraw',
    params: params
  })
}
// 导出取款报表
export function exportWithdrawLog (params) {
  return exportData({
    url: '/backend/money_log/exportWithdrawLog',
    params: params
  })
}

// 获取存款报表
export function getMoneyLogCharge (params) {
  return request.get({
    url: '/backend/money_log/charge',
    params: params
  })
}
// 导出存款报表
export function exportChargeLog (params) {
  return exportData({
    url: '/backend/money_log/exportChargeLog',
    params: params
  })
}

// 获取游戏盈亏列表
export function getGameProLoseList (params) {
  return request.get({
    url: '/backend/profitLoss/getByGame',
    params: params
  })
}
// 后台管理导出游戏盈亏报表
export function exportProLoseList (params) {
  return exportData({
    url: '/backend/profitLoss/exportOnGameType',
    params: params
  })
}

// 后台获取顶级代理及下线盈亏报表的大类详情
export function getAgentProLoseList (params) {
  return request.get({
    url: '/backend/profitLoss/getAllNext',
    params: params
  })
}
// 后台导出顶级代理及下线盈亏报表
export function exportAgentProLoseList (params) {
  return exportData({
    url: '/backend/profitLoss/export',
    params: params
  })
}

// 后台获取顶级代理及下线盈亏报表
export function getAgentProLoseListV2 (params) {
  return request.get({
    url: '/backend/profitLoss/getAllNextV2',
    params: params
  })
}

// 后台按游戏大类获取顶级代理及下线盈亏报表
export function getAllNextOnGameType (params) {
  return request.get({
    url: '/backend/profitLoss/getAllNextOnGameType',
    params: params
  })
}

// 后台获取公司直属会员盈亏报表
export function getComponyProfitLoss (params) {
  return request.get({
    url: '/backend/profitLoss/getComponyProfitLoss',
    params: params
  })
}

// 获取玩家盈亏列表
export function getPlayerProLoseList (params) {
  return request.get({
    url: '/backend/profitLoss/getByMember',
    params: params
  })
}

// 公司后台获取投注记录
export function gameLogs (params) {
  return request.get({
    url: '/backend/game_logs',
    params: params
  })
}
// 公司后台导出投注记录
export function exportGameLogs (params) {
  return exportData({
    url: '/backend/game_logs/export',
    params: params
  })
}

// 公司后台获取会员游戏记录统计
export function gameLogStatistics (params) {
  return request.get({
    url: '/backend/game_log_statistics/list',
    params: params
  })
}
// 公司后台导出会员游戏记录统计
export function exportGameLogStatistics (params) {
  return exportData({
    url: '/backend/game_log_statistics/export',
    params: params
  })
}

// 公司后台获取账户明细
export function getMoneyLogList (params) {
  return request.get({
    url: '/backend/money_log/list',
    params: params
  })
}
// 公司后台导出账户明细
export function exportMoneyLogList (params) {
  return exportData({
    url: '/backend/money_log/export',
    params: params
  })
}

// 公司后台获取账户汇总
export function getDiurnalStatistics (params) {
  return request.get({
    url: '/backend/diurnal_statistics/get_diurnal_statistics',
    params: params
  })
}
// 公司后台导出账户汇总
export function exportDiurnalStatistics (params) {
  return exportData({
    url: '/backend/diurnal_statistics/export',
    params: params
  })
}

// 总后台获取提款记录稽查点详情
export function getWithdrawLog (params) {
  return request.get({
    url: '/backend/withdraw_log/list',
    params: params
  })
}
// 导出提款记录稽查点详情
export function exportAuditPointLog (params) {
  return exportData({
    url: '/backend/withdraw_log/export',
    params: params
  })
}

// 总后台获取提款记录稽查点详情
export function getWithdrawLogId (id) {
  return request.get({
    url: `/backend/withdraw_log/item/${id}`
  })
}

// 累计分红金额
export function cleanBonus (params) {
  return request.post({
    url: '/backend/dividendDetails/cumulative',
    params: params
  })
}
