// 轮播图列表
export function bannerList (params) {
  return request.get({
    url: 'backend/banner',
    params: params
  })
}

// 删除轮播图
export function deleteBanner (params) {
  return request.post({
    url: 'backend/banner/delete',
    params: params
  })
}

// 轮播图详情
export function BannerInfo (params) {
  return request.get({
    url: 'backend/banner/one',
    params: params
  })
}

// 轮播图添加
export function AddBanner (params) {
  return request.post({
    url: 'backend/banner',
    params: params
  })
}

// 轮播图修改
export function updataBanner (params) {
  return request.put({
    url: 'backend/banner',
    params: params
  })
}
