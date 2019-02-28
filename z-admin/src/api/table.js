import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function getteacherdetail(params) {
  return request({
    url: '/getteacherdetail',
    method: 'get',
    params
  })
}
