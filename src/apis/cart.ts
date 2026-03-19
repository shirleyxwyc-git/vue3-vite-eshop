import type { APIResponse, SelectedGood, MergeCartItem } from '@/types/typeInterface'
import request from '@/utils/request'

//加入購物車相關接口
export const insertCartAPI = (skuId: string, count: number) => {
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
export const deleteCartAPI = (ids: string[]) => {
  return request({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids,
    },
  })
}

//登錄時合併未登錄時的本地購物車與服務端的購物車
export const mergeCartAPI = (mergedCart: MergeCartItem[]) => {
  return request({
    url: 'member/cart/merge',
    method: 'POST',
    data: mergedCart,
  })
}
