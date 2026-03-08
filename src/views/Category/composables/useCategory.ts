//封裝分類數據業務相關代碼
import { useRoute } from 'vue-router'
import { reactive, onMounted, watch } from 'vue'
import { getCategoryDataAPI } from '@/apis/category'
import { onBeforeRouteUpdate } from 'vue-router'

export const useCategory = () => {
  // getCategoryDataAPI returns res.result is object type,
  // define result: CategoryData using interface => TypeScript practice
  interface CategoryAPIResponse {
    code: string
    msg: string
    result: CategoryData //对象类型数据 -> reactive not ref
  }
  // CategoryData 对象类型数据 ,並非只是簡單類型 / list[]-> reactive not ref
  interface CategoryData {
    id: string
    name: string
    picture: null
    children: SubCategoryList[]
  }
  interface SubCategoryList {
    id: string
    name: string
    picture: string
    parentId: null
    parentName: null
    goods: SubCategoryGoods[]
    categories: null
    brands: null
    saleProperties: null
  }

  interface SubCategoryGoods {
    id: string
    name: string
    desc: string
    price: string
    picture: string
    discount: null
    orderNum: number
  }

  //reactive ；接受对象类型数据的参数传入并return一个响应式的对象
  const categoryData = reactive<CategoryData>({} as CategoryData)

  //獲取id => route.params.id
  const route = useRoute()

  const getCategoryData = async (id: string = route.params.id as string) => {
    // if (!id) return // id 無值就唔調用 API
    const res = await getCategoryDataAPI(Number(id))
    //categoryData.value = res.result  用ref 先.value
    // 用reactive 要 用Object.assign
    Object.assign(categoryData, res.result)
  }
  onMounted(() => {
    getCategoryData()
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
    getCategoryData(to.params.id as string)
  })

  return { categoryData, getCategoryData }
}
