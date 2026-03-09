// getCategoryDataAPI returns res.result is object type,
// define result: CategoryData using interface => TypeScript practice
export interface CategoryAPIResponse {
  code: string
  msg: string
  result: CategoryData //对象类型数据 -> reactive not ref
}
// CategoryData 对象类型数据 ,並非只是簡單類型 / list[]-> reactive not ref
export interface CategoryData {
  id: string
  name: string
  picture: string | null
  children: SubCategoryList[]
}
export interface SubCategoryList {
  id: string
  name: string
  picture: string | null
  parentId: string
  parentName: string
  goods: SubCategoryGoods[]
  categories: string | null
  brands: string | null
  saleProperties: string | null
}

export interface SubCategoryGoods {
  id: string
  name: string
  desc: string
  price: string
  picture: string | null
  discount: string | null
  orderNum: number
}

export interface SubCategoryData {
  categoryld: number
  page: number
  pageSize: number
  sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
}
