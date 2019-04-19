// 新增银行
export function postBankForm (params) {
  return request.post({
    url: '/backend/bankcard/add',
    params: params
  })
}
// 获取银行列表
export function getBankList (params) {
  return request.get({
    url: '/backend/bankcard/list',
    params: params
  })
}
// 获取银行卡信息
export function getBankDetail (id) {
  return request.get({
    url: '/backend/bankcard/one',
    params: { id: id }
  })
}
// 修改银行卡信息
export function editBank (params) {
  return request.post({
    url: '/backend/bankcard/update',
    params: params
  })
}
// 启用银行卡
export function enableBankCard (id) {
  return request.post({
    url: '/backend/bankcard/enable',
    params: { id: id }
  })
}
// 停用银行卡
export function disabledBankCard (id) {
  return request.post({
    url: '/backend/bankcard/disabled',
    params: { id: id }
  })
}

// 获取银行卡黑名单列表
export function blacklist (params) {
  return request.get({
    url: '/backend/bankcard/blacklist',
    params: params
  })
}

// 将银行卡置为黑名单
export function addblacklist (number) {
  return request.post({
    url: '/backend/bankcard/blacklist',
    params: { number: [number] }
  })
}

// 将银行卡置移出黑名单
export function removeblacklist (number) {
  return request.post({
    url: '/backend/bankcard/restore_blacklist',
    params: { number: [number] }
  })
}
