import request from '@/utils/request'

//獲取商品信息
export const getGoodDetailsAPI = (id: number): Promise<any> => {
  return request({
    url: '/goods',
    method: 'GET',
    params: { id },
  })
}

//獲取best seller熱賣榜商品信息

export const getBestSellerDetailsAPI = (id: number, type: number): Promise<any> => {
  return request({
    url: '/goods/hot',
    method: 'GET',
    params: {
      id,
      type,
      limit: 3,
    },
  })
}
