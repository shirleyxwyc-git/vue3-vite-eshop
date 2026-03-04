import request from '@/utils/request'

export const getCategoryAPI = (): Promise<any> => {
  return request({ url: '/home/category/head', method: 'GET' })
}
