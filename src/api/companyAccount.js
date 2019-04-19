// list all company account
export function getCompanyAccountList (params) {
  return request.get({
    url: '/backend/companyaccount',
    params: params
  })
}

// create one company account
export function createCompanyAccountList (params) {
  return request.put({
    url: '/backend/companyaccount',
    params: params
  })
}

// // update one company account
export function updateCompanyAccountList (params) {
  return request.post({
    url: `/backend/companyaccount/${params.id}`,
    params: params
  })
}

// get one company account
export function getCompanyAccountDetail (id) {
  return request.get({
    url: `/backend/companyaccount/${id}`
  })
}

// delete one company account
export function deleteCompanyAccount (id) {
  return request.delete({
    url: `/backend/companyaccount/${id}`
  })
}

// 获取公司支付方法列表
export function getPaymethodList () {
  return request.get({
    url: '/backend/companyaccount/custompaymethodlist'
  })
}
