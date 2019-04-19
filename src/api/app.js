// 获取加密的公钥
export function getKey () {
  return request.get({
    url: '/key'
  })
}
