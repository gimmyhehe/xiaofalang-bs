import { get,post } from '@/utils/request.js'
export function addproduct(params={}) {
  const result = post('/addproduct',params)
  return result
}
export function modify_product(params={}) {
  const result = post('/modify_product',params)
  return result
}
export function scan_products(params={}) {
  const result = get('/scan_products',params)
  return result
}
// 退出登陆
export function oneproduct (params={}) {
  const result = get('/oneproduct',params)
  return result
}