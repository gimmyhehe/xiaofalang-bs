import { exportData } from '@/utils/request'
// 修改用户功能包括 修改密码、重置资金密码、重置安全问题、日工资方案、分红方案
export function updateUserMsg (form = {}) {
  return request.post({
    url: '/backend/userlist/update',
    params: form,
    encryptParams: ['password', 'varify_password', 'confirm_password']
  })
}
// 重置银行卡
export function resetBank (params) {
  return request.post({
    url: '/backend/userlist/bankcard/reset',
    params: params
  })
}
// 新增经营者
export function postUserForm (form = {}) {
  return request.post({
    url: '/backend/userlist/add',
    params: form,
    encryptParams: ['password', 'password_confirmation']
  })
}
// 停用银行卡
export function disabledBank (id) {
  return request.post({
    url: '/backend/userlist/bankcard/disabled',
    params: { id: id }
  })
}
// 启用银行卡
export function enabledBank (id) {
  return request.post({
    url: '/backend/userlist/bankcard/enabled',
    params: { id: id }
  })
}
// 新增银行卡
export function postBankForm (form = {}) {
  return request.post({
    url: '/backend/userlist/bankcard/add',
    params: form
  })
}
// 获取日工资方案
export function getSalaryPlan (id) {
  return request.get({
    url: '/backend/userlist/add',
    params: { id: id }
  })
}
// 获取分红方案
export function getBonusPlan (id) {
  return request.get({
    url: '/backend/userlist/add',
    params: { id: id }
  })
}
// 获取用户列表
export function getUserList (params = {}) {
  return request.get({
    url: '/backend/userlist',
    params: params
  })
}
// 导出用户列表
export function exportUserList (params = {}) {
  return exportData({
    url: '/backend/userlist/export',
    params: params
  })
}

// 返回上线关系面包屑
export function getRelation (username) {
  return request.get({
    url: `/backend/userlist/relation/${username}`
  })
}

// 获取用户详情
export function getUserDetail (id) {
  return request.get({
    url: '/backend/userlist/member',
    params: { id: id }
  })
}
// 获取银行列表
export function getBankList (params = {}) {
  return request.get({
    url: '/backend/userlist/bankcard',
    params: params
  })
}

// 将银行卡置为黑名单
export function addblacklist (number) {
  return request.post({
    url: '/backend/userlist/bankcard/blacklist',
    params: { number: [number] }
  })
}

// 将银行卡置移出黑名单
export function removeblacklist (number) {
  return request.post({
    url: '/backend/userlist/bankcard/restore_blacklist',
    params: { number: [number] }
  })
}

// 删除子帐
export function trashedAccountAPI (params) {
  return request.post({
    url: '/backend/userlist/trashed',
    params: params
  })
}
// 激活个人
export function activeUserAPI (params) {
  return request.post({
    url: '/backend/userlist/activate',
    params: params
  })
}
// 冻结团队
export function freezeUserAPI (username) {
  return request.post({
    url: '/backend/userlist/freeze',
    params: {
      username: username
    }
  })
}
// 解冻团队
export function recoverTeamAPI (username) {
  return request.post({
    url: '/backend/userlist/recover',
    params: {
      username: username
    }
  })
}
// 解冻个人
export function recoverUserAPI (username) {
  return request.post({
    url: '/backend/userlist/recoverone',
    params: {
      username: username
    }
  })
}
// 停用账号
export function disabledUserAPI (username) {
  return request.post({
    url: '/backend/userlist/disabled',
    params: {
      username: username
    }
  })
}
// 启用账号
export function enableUserAPI (username) {
  return request.post({
    url: '/backend/userlist/enable',
    params: {
      username: username
    }
  })
}
// 获取用户已开通的游戏
export function getUserGames (id) {
  return request.get({
    url: '/backend/userlist/games',
    params: {
      member_id: id
    }
  })
}
// 修改游戏
export function updateGames (params) {
  return request.post({
    url: '/backend/userlist/games',
    params: params
  })
}

// 获取投注记录
export function getBetRecord (id) {
  return request.get({
    url: '/backend/userlist/betRecord',
    params: { member_id: id }
  })
}
// 获取交易记录
export function getTradeRecord (params) {
  return request.get({
    url: '/backend/userlist/trade',
    params: params
  })
}

// 快速查询银行资料
export function getFastTips (param) {
  return request.get({
    url: '/backend/userlist/bank_info',
    params: param
  })
}

// 获取对应用户占成信息
export function memberSelPT (id) {
  return request.get({
    url: '/backend/userlist/memberSelfPT',
    params: id
  })
}

// 更新占成用户自身想占占成
export function updataMemberSelfPT (params) {
  return request.put({
    url: '/backend/userlist/memberSelfPT',
    params: params
  })
}

// 获取对应用户占成信息
export function getMemberSelfPT (id) {
  return request.get({
    url: '/backend/userlist/memberSelfPT',
    params: { id: id }
  })
}

// 获取某个会员在某个游戏渠道商或者本平台的余额
export function channelBalance (params, callback) {
  return request.get({
    url: '/backend/userlist/channel-balance',
    params: params,
    handleCancelToken: callback
  })
}

// 余额转到游戏或从游戏转出，该接口只用于多钱包游戏
export function gameTransfer (params) {
  return request.post({
    url: '/backend/userlist/transfer',
    params: params
  })
}

// 账号转移日志
export function getMoveLogList (params) {
  return request.get({
    url: '/backend/moveMember/log',
    params: params
  })
}

// 检查用户名是否存在
export function checkUsername (name) {
  return request.get({
    url: `/members/check/${name}`
  })
}

// 检查代理域名是否合法
export function checkDomain (params) {
  return request.post({
    url: '/backend/userlist/check-domain',
    params: params
  })
}

export function moveMember (params) {
  return request.post({
    url: '/backend/userlist/move',
    params: params
  })
}

// 检查转移的用户名信息
export function checkMoveUsername (username) {
  return request.get({
    url: `/backend/userlist/check/${username}`
  })
}

// 添加ip的黑名单地址
export function addIpBlack (params) {
  return request.post({
    url: `/backend/ipBlacklist`,
    params: params
  })
}

// 获取ip黑名单列表
export function ipBlacklist (params) {
  return request.get({
    url: `/backend/ipBlacklist`,
    params: params
  })
}

// 删除IP黑名单记录
export function delectIpBlack (id) {
  return request.get({
    url: `/backend/ipBlacklist/${id}`
  })
}

// 屏蔽会员功能
export function blockUser (params) {
  return request.post({
    url: `/backend/userlist/block`,
    params: params
  })
}

// 用户操作日志
export function sameIp (params) {
  return request.get({
    url: `/backend/userlist/same_ip`,
    params: params
  })
}

// 查看用户在游戏里面的用户名
export function getUserChannelName (username) {
  return request.get({
    url: `/backend/userlist/channel-username/${username}`
  })
}
