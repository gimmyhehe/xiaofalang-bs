// 获取会员等级列表
export function getLevelList (params) {
  return request.get({
    url: '/backend/member_level/list',
    params: params
  })
}

// 获取该等级下的会员列表
export function getLevelMembers ({ params, id }) {
  return request.get({
    url: `/backend/member_level/${id}/members`,
    params: params
  })
}

// 获取符合该等级的会员列表
export function getPrepareMembers ({ params, id }) {
  return request.get({
    url: `/backend/member_level/${id}/prepare-members`,
    params: params
  })
}

// 获取等级信息
export function getLevelInfo ({ id }) {
  return request.get({
    url: `/backend/member_level/${id}`
  })
}

// 获取会员等级简要信息列表, 获取用来评级的时候选择
export function getBriefList () {
  return request.get({
    url: `/backend/member_level/brief-list`
  })
}

// 添加会员等级
export function setLevel (params) {
  return request.post({
    url: '/backend/member_level',
    params: params
  })
}

// 更新会员等级
export function updateLevel (params) {
  return request.post({
    url: '/backend/member_level/modify',
    params: params
  })
}

// 设置会员的等级
export function setMember (params) {
  return request.post({
    url: '/backend/member_level/set-member',
    params: params
  })
}

// 把该等级设为默认
export function setDefaultLevel (id) {
  return request.get({
    url: `/backend/member_level/set-default/${id}`
  })
}

// 根据帐号搜索会员的等级信息
export function getLevelsByUsername (username) {
  return request.get({
    url: `/backend/member_level/search/${username}`
  })
}

// 获取代理等级列表
export function getAgentLevelsByUsername () {
  return request.get({
    url: `/backend/agent_level/list`
  })
}

// 获取代理等级简要信息列表
export function getAgentBriefList () {
  return request.get({
    url: `/backend/agent_level/brief-list`
  })
}

// 获取该等级下的代理列表  bug 返回的全部数据
export function getAgentsList ({ params, id }) {
  return request.get({
    url: `/backend/agent_level/${id}/agents`,
    params: params
  })
}

// 获取符合该等级的代理列表
export function getPrepareAgentsList ({ params, id }) {
  return request.get({
    url: `/backend/agent_level/${id}/prepare-agents`,
    params: params
  })
}

// 设置代理的等级
export function setAgentLevel (params) {
  return request.post({
    url: '/backend/agent_level/set-agent',
    params: params
  })
}

// 获取等级信息
export function getAgentLevelInfo (id) {
  return request.get({
    url: `/backend/agent_level/${id}`
  })
}

// 添加代理等级
export function addAgentLevel (params) {
  return request.post({
    url: `/backend/agent_level/add`,
    params: params
  })
}

// 修改代理等级
export function updateAgentLevel (params) {
  return request.post({
    url: '/backend/agent_level/modify',
    params: params
  })
}

// 把该等级设为默认
export function setDefaultAgentLevel (id) {
  return request.get({
    url: `/backend/agent_level/set-default/${id}`
  })
}

// 根据帐号搜索代理的等级信息
export function searchUsername (username) {
  return request.get({
    url: `/backend/agent_level/search/${username}`
  })
}
