import request from '@/utils/request'
import type { SubCategoryData } from '@/types/category'

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

/**
 * 麵包屑導航
 * @description: 獲取二級分類數據列表
 * @param id 二級分類 id
 * @returns {*}
 */
export const getCategoryFilterAPI = (id: number): Promise<any> => {
  return request({
    url: '/category/sub/filter',
    method: 'GET',
    params: { id }, //二級分類 id
  })
}
/**
 * @description: 获取导航数据
 * @data {
 * categoryld: 1005000 ,
 * page: 1,
 * pageSize: 20,
 * sortField: "publishTime" | 'orderNum" | 'evaluateNum'
 * }
 * data type defined as SubCategoryData in category.ts
 * @returns {*}
 */
export const getSubCategoryAPI = (data: SubCategoryData): Promise<any> => {
  return request({
    url: '/category/goods/temporary',
    method: 'POST',
    data,
  })
}
