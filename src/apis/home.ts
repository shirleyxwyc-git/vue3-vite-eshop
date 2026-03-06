import request from '@/utils/request'

export const getBannerAPI = (): Promise<any> => {
  return request({
    url: '/home/banner',
    method: 'GET',
  })
}
