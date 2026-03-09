import request from '@/utils/request'

export const getGoodDetailsAPI = (id: number): Promise<any> => {
  return request({
    url: '/goods',
    method: 'GET',
    params: { id },
  })
}
