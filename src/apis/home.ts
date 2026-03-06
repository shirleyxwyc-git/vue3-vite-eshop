import request from '@/utils/request'

/**
 * 獲取Banner
 * @returns
 */
export const getBannerAPI = (): Promise<any> => {
  return request({
    url: '/home/banner',
    method: 'GET',
  })
}

export const getNewAPI = (): Promise<any> => {
  return request({
    url: '/home/new',
    method: 'GET',
  })
}

export const getHotAPI = (): Promise<any> => {
  return request({
    url: '/home/hot',
    method: 'GET',
  })
}
