//封裝分類數據業務相關代碼
import { useRoute } from 'vue-router'
import { reactive, onMounted, watch } from 'vue'
import { getCategoryDataAPI } from '@/apis/category'
import { onBeforeRouteUpdate } from 'vue-router'
import type { CategoryData } from '@/types/category'

export const useCategory = () => {
  //reactive ；接受对象类型数据的参数传入并return一个响应式的对象
  const categoryData = reactive<CategoryData>({} as CategoryData)

  //需要從網址獲取id  → 用 route.params.id
  const route = useRoute()

  const getCategoryData = async (id: string) => {
    // if (!id) return // id 無值就唔調用 API
    const res = await getCategoryDataAPI(Number(id))
    //categoryData.value = res.result  用ref 先.value
    // 用reactive 要 用Object.assign
    Object.assign(categoryData, res.result)
  }
  onMounted(() => {
    // // 用Array.isArray 判斷，確保 id 一定係 string
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id || ''
    getCategoryData(id || '')
  })

  //存在問題：使用最新路由參數請求最新的分類數據
  //onMounted 只會執行一次，之後切換分類唔會再調用 API，breadcrumb 及 分類數據唔會更新。
  //要監聽 route 變化，當 id 變時自動調用 categoryDataAPI()。
  //引入 watch。監聽 route.params.id，每次變就調用 API
  // watch(
  //   () => route.params.id,
  //   () => {
  //     getCategoryData()
  //   },
  // )

  //進階用法 onBeforeRouteUpdate：
  // 切換路由參數（/1 → /2）時 👉 自動執行
  onBeforeRouteUpdate((to) => {
    // to = 新頁面的路由資訊
    // 用Array.isArray 判斷，確保 id 一定係 string
    const id = Array.isArray(to.params.id) ? to.params.id[0] : to.params.id || ''
    getCategoryData(id || '')
  })

  return { categoryData, getCategoryData }
}
