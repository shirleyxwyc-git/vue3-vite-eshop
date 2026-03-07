import request from '@/utils/request'

/**
 * 根據一級分類 id 獲取該分類及其二級分類資料
 * 用於 category page 的 breadcrumb 導航
 * @param id 一級分類 id
 * @returns 分類詳情（包含二級分類）
 */
export const getCategoryDataAPI = (id: number): Promise<any> => {
  return request({
    url: '/category',
    method: 'GET',
    params: { id }, // 一級分類 id
  })
}
