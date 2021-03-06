import Cookies from 'js-cookie'

const TokenKey = 'ADMIN-Token'
const TokenRefreshAt = 'ADMIN-Token-Refresh-At'
const userInfoKey =  'admin_user_info'
const userInfo =  'user_info'
export function getToken () {
  return Cookies.get(TokenKey)
}
export function getUserInfo(){
  return Cookies.get(userInfoKey)
}
export function setUserInfo(userInfo){
  return Cookies.set(userInfoKey, userInfo)
}

export function setToken ({ time = Math.floor(Date.now() / 1000), token }) {
  let _cacheRefreshTime = Number(getTokenRefreshTime())
  if (
    !time || isNaN(_cacheRefreshTime) ||
    (time > _cacheRefreshTime)
  ) {
    // 用户关闭浏览器时会删除Cookie。
    setTokenRefreshTime(time)
    Cookies.set(userInfo, '1')
    Cookies.remove(userInfo)
    return Cookies.set(TokenKey, token)
  }
  // else {
  //   removeToken()
  //   removeTokenRefreshTime()
  // }
}

export function removeToken () {
  Cookies.remove(TokenRefreshAt)
  Cookies.remove(userInfoKey)
  return Cookies.remove(TokenKey)
}

// 获取token的刷新时间
export function getTokenRefreshTime () {
  return Cookies.get(TokenRefreshAt)
}
// 设置token的刷新时间
export function setTokenRefreshTime (time) {
  // 用户关闭浏览器时会删除Cookie。
  return Cookies.set(TokenRefreshAt, time)
}
// 删除token的刷新时间
export function removeTokenRefreshTime () {
  // 用户关闭浏览器时会删除Cookie。
  return Cookies.remove(TokenRefreshAt)
}
