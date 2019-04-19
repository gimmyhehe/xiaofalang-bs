import { get,post } from '@/utils/request.js'
export function login(params={}) {
  const result = post('/login',params)
  return result
}
// 退出登陆
export function logout (params={}) {
  const result = get('/logout',params)
  return result
}

