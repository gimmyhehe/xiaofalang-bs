// 公司后台获取优惠活动列表
export function activityList (params) {
  return request.get({
    url: '/backend/reward-program/list',
    params: params
  })
}

// 公司后台获取优惠活动详情
export function activityInfo (id) {
  return request.get({
    url: `/backend/reward-program/info/${id}`
  })
}

// 添加活动
export function activityAdd (params) {
  return request.post({
    url: '/backend/reward-program/add',
    params: params
  })
}

// 修改活动
export function activityEdit (params) {
  return request.post({
    url: '/backend/reward-program/edit',
    params: params
  })
}

// 获取优惠活动的报表
export function activityRewardList (params) {
  return request.get({
    url: '/backend/reward-program/reward-list',
    params: params
  })
}

// 审核用户，可以单个或者批量审核
export function activityAudit (params) {
  return request.post({
    url: '/backend/reward-program/audit',
    params: params
  })
}

// 客服派发奖励，可以单个或者批量派发
export function activitySendReward (params) {
  return request.post({
    url: '/backend/reward-program/send-reward',
    params: params
  })
}

// 获取活动派发报表
export function getRewardList (params) {
  return request.get({
    url: '/backend/reward-program/getlist',
    params: params
  })
}

// 用户参加列表
export function joinMemberList (params) {
  return request.get({
    url: '/backend/reward-program/join-list',
    params: params
  })
}
