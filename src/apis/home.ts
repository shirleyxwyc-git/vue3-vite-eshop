import request from '@/utils/request'

/**
 * 獲取Banner
 * @returns
 */
export const getBannerAPI = (params: { distributionSite?: string } = {}): Promise<any> => {
  //distributionSite =輪播圖展示位置（投放位置，1為首頁，2為商品分類頁） default=1 ，/home/banner?distributionSite=1
  //distributionSite type = string from API doc
  const { distributionSite = '1' } = params
  return request({
    url: '/home/banner',
    method: 'GET',
    params: { distributionSite },
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
