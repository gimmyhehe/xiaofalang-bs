// 新增公告
export function addForm (params) {
  return request.post({
    url: '/backend/announcement/create',
    params: params
  })
}

// 修改公告
export function updateForm (params) {
  return request.post({
    url: '/backend/announcement/update',
    params: params
  })
}

// 获取公告详情
export function getDetail (id) {
  return request.get({
    url: '/backend/announcement/one',
    params: { id: id }
  })
}

// 获取公告列表
export function getList (params) {
  return request.get({
    url: '/backend/announcement',
    params: params
  })
}

// 获取消息列表
export function getMsgList (params) {
  return request.get({
    url: '/backend/announcement/backend_list',
    params: params
  })
}

// 添加信息
export function addMsg (params) {
  return request.post({
    url: '/backend/announcement/mail_send',
    params: params
  })
}

// 获取信息详情
export function getMsgDetail (id) {
  return request.get({
    url: '/backend/announcement/mail_read',
    params: { msg_id: id }
  })
}

// 删除公告
export function deleteNotice (id) {
  return request.get({
    url: `/backend/announcement/delete/${id}`
  })
}
