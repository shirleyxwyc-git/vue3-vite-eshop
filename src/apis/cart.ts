import type { APIResponse, SelectedGood } from '@/types/typeInterface'
import request from '@/utils/request'

//加入購物車相關接口
export const insertCartAPI = (skuId: String, count: Number) => {
  return request({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count,
    },
  })
}

//獲取最新的購物車列表
export const findNewCartListAPI = async (): Promise<APIResponse<SelectedGood[]>> => {
  const res = (await request({
    url: '/member/cart',
    method: 'GET',
  })) as APIResponse<SelectedGood[]>
  //讓外部直接拿到後端返回的資料res = response.data in request.ts ={ code, msg, result }）
  console.log('findNewCartListAPI res:', res)
  return res
}

//刪除購物車
export const deleteCartAPI = (ids: String[]) => {
  return request({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids,
    },
  })
}
