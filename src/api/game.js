// 获取游戏列表
export function getGameList (params) {
  return request.get({
    url: '/backend/games/list',
    params: params
  })
}

// 管理员获取可以开给代理、招商的游戏列表
export function getAvailableGameList (params) {
  return request.get({
    url: '/backend/games/available_game_list',
    params: params
  })
}

// 获取所有的游戏渠道商
export function getAvailableGameChannel (params) {
  return request.get({
    url: '/backend/games/available_game_channel',
    params: params
  })
}

// 获取某个用户的游戏渠道商
export function getUserGameChannel (name) {
  return request.get({
    url: `/backend/games/channel-list/${name}`
  })
}

// 修改游戏属性
export function modifyGame (params) {
  return request.post({
    url: '/backend/games',
    params: params
  })
}

// 修改游戏属性
export function getGameInfo (params) {
  return request.get({
    url: `/backend/games/${params.id}`
  })
}

// 获取所有渠道商简要信息列表
export function getBriefList (params) {
  return request.get({
    url: '/backend/games/channels/brief_list'
  })
}

// // 获取可以开给用户的游戏列表
// export function getAvailableList() {
//   return request.get({
//     url: '/backend/games/available_game_list'
//   })
// }

// 获取可以开给用户的游戏列表
export function getAgentGameList (id) {
  return request.get({
    url: `/backend/games/agent_game_list/${id}`
  })
}

// 获取游戏大类列表
export function getGameTypeList () {
  return request.get({
    url: '/backend/games/gameTypeList'
  })
}

// 设置游戏大类占成
export function setdefaultPT (params) {
  return request.post({
    url: '/backend/games/defaultPT',
    params: params
  })
}

// 管理后台获取电子游戏列表
export function slotMachineGameList (params) {
  return request.get({
    url: '/backend/games/spec/game-list',
    params: params
  })
}

// 获取游戏类型
export function getGameType () {
  return request.get({
    url: '/games/game-types'
  })
}

// 设置电子游戏状态
export function setSlotMachineGameStatus (params) {
  return request.post({
    url: '/backend/games/spec/status',
    params: params
  })
}

// 设置电子游戏热门
export function setSlotMachineGameIsHot (params) {
  return request.post({
    url: '/backend/games/spec/hot',
    params: params
  })
}

// 获取某个电子游戏
export function getSlotMachineGameInfo (id) {
  return request.get({
    url: `/backend/games/spec/${id}`
  })
}

// 增加电子游戏
export function addSlotMachineGame (params) {
  return request.post({
    url: '/backend/games/spec/add',
    params: params
  })
}

// 修改电子游戏
export function updateSlotMachineGame (params) {
  return request.post({
    url: '/backend/games/spec/update',
    params: params
  })
}
