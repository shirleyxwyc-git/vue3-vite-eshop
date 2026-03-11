//封裝所有用戶相關的接口函數

import type { User } from '@/types/typeInterface'
import request from '@/utils/request'

export const loginAPI = (user: User): Promise<any> => {
  return request({
    url: '/login',
    method: 'POST',
    data: user,
  })
}
