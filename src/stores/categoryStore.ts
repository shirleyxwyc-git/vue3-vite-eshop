import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCategoryAPI } from '@/apis/layout'

//defineStore('唯一標識', () => {
// 響應式 state
// actions 函數
//return { 要匯出嘅變數同方法 }})

export const useCategoryStore = defineStore('category', () => {
  // 響應式 state : header 數據 list
  const categoryList = ref<any[]>([])

  // action： 獲取headers 數據的方法
  const getCategory = async () => {
    const res = await getCategoryAPI()
    categoryList.value = res.result
  }
  // 必须以對象{}的方式返回需要暴露的状态/方法供組件使用（不返回的话,外部无法访问）
  return { categoryList, getCategory }
})
