import type { APIResponse } from '@/types/typeInterface'
import request from '@/utils/request'

export const getPayInfoAPI = (id: string): Promise<APIResponse<any>> => {
  return request({
    url: `/member/order/${id}`,
    method: 'GET',
  })
}
