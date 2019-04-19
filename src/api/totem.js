// 总后台获取定时任务列表
export function getlist (params) {
  return request.get({
    url: 'backend/task/getlist',
    params: params
  })
}

// 总后台获取所有定时任务执行命令
export function getCommands (params) {
  return request.get({
    url: 'backend/task/getCommands',
    params: params
  })
}

// 总后台获取单个定时任务(列表)
export function getInfo (id, params) {
  return request.get({
    url: `backend/task/edit/${id}`,
    params: params
  })
}

// // 总后台获取定时任务详情
// export function EditCreate(id) {
//   return request.get({
//     url: `backend/task/edit/${id}`
//   })
// }

// 总后台添加定时任务
export function addCreate (params) {
  return request.post({
    url: 'backend/task/create',
    params: params
  })
}

// 总后台更新定时任务详情
export function updateCreate (id, params) {
  return request.post({
    url: `backend/task/update/${id}`,
    params: params
  })
}

// 总后台运行定时任务
export function executeCreate (id) {
  return request.get({
    url: `backend/task/execute/${id}`
  })
}

// 总后台删除定时任务
export function deleteCreate (id) {
  return request.get({
    url: `backend/task/delete/${id}`
  })
}

// 编辑启用状态
export function editDispatch (params) {
  return request.post({
    url: `/backend/task/editDispatch`,
    params: params
  })
}
