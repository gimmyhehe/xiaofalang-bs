import { get,post } from '@/utils/request.js'
//添加发型师
export function addhairstyle(params={}) {
  const result = post('/addhairstyle',params)
  return result
}
//修改发型师信息
export function modifyhairstyle(params={}) {
  const result = post('/modifyhairstyle',params)
  return result
}
//删除发型师信息
export function delhairstyle(params={}) {
  const result = get('/delhairstyle',params)
  return result
}
//获取发型师列表
export function scanhairstyle (params={}) {
  const result = get('/scanhairstyle',params)
  return result
}
//查看单个发型师信息
export function onehairstyle (params={}) {
  const result = get('/onehairstyle',params)
  return result
}