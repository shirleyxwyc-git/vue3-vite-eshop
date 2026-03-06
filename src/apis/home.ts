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

/**
 * 最新商品
 * @returns
 */
export const getNewAPI = (): Promise<any> => {
  return request({
    url: '/home/new',
    method: 'GET',
  })
}

/**
 * 人氣推薦
 * @returns
 */
export const getHotAPI = (): Promise<any> => {
  return request({
    url: '/home/hot',
    method: 'GET',
  })
}

/**
 * 產品列表
 * @returns
 */
export const getGoodsAPI = (): Promise<any> => {
  return request({
    url: '/home/goods',
    method: 'GET',
  })
}
