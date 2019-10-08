import { get,post } from '@/utils/request.js'
//商家订单表
export function findorderbycompany_id(params={}) {
  const result = get('/findorderbycompany_id',params)
  return result
}

export function ordersuccess(params={}) {
  const result = post('/ordersuccess ',params)
  return result
}