import { get,post } from '@/utils/request.js'

// 修改密码
export function modifyPassword(params={}) {
  const result = post('/modifyPassword',params)
  return result
}
// 商家注册
export function bussinessregi(params={}) {
  const result = post('/bussinessregi',params)
  return result
}
// 查看商家基本信息
export function scan_business(params={}) {
  const result = get('/scan_business',params)
  return result
}
// 修改商家基本信息
export function businessmodify(params={}) {
  const result = post('/businessmodify',params)
  return result
}