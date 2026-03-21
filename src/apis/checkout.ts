import request from '@/utils/request'
import type { CheckoutResponse, CreateOrder, APIResponse } from '@/types/typeInterface'

//獲取訂單詳情(結算頁）接口
export const getCheckOutInfoAPI = (): Promise<CheckoutResponse> => {
  return request({
    url: '/member/order/pre',
    method: 'GET',
  })
}

//提交訂單
export const createOrderAPI = (createOrder: CreateOrder): Promise<APIResponse<String>> => {
  return request({
    url: '/member/order',
    method: 'POST',
    data: createOrder,
  })
}
