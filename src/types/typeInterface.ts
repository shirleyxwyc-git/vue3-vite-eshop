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
  saleProperties: any[] | null
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
  categoryId: number
  page: number
  pageSize: number
  sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
}

export interface User {
  account: string
  password: string
}

export interface SelectedGood {
  id: number
  name: string
  picture: string
  price: number
  count: number
  skuId: string
  attrsText: string
  selected: boolean
}

export interface APIResponse<T> {
  code: string
  msg: string
  result: T
}

// 定義型別
export interface MergeCartItem {
  skuId: string
  selected: boolean
  count: number
}

//checkout page =>  getCheckOutInfoAPI
// 地址型別
export interface UserAddress {
  id: string
  receiver: string
  contact: string
  provinceCode: string
  cityCode: string
  countyCode: string
  address: string
  isDefault: number
  fullLocation: string
  postalCode: string | null
  addressTags: string | null
}

// 商品型別
export interface CheckoutGoods {
  id: string
  name: string
  picture: string
  count: number
  skuId: string
  attrsText: string
  price: string
  payPrice: string
  totalPrice: string
  totalPayPrice: string
}

// 訂單摘要
export interface CheckoutSummary {
  goodsCount: number
  totalPrice: number
  totalPayPrice: number
  postFee: number
  discountPrice: number
}

// 最終返回的 result
export interface CheckoutResult {
  userAddresses: UserAddress[]
  goods: CheckoutGoods[]
  summary: CheckoutSummary
}

// 整個 API 返回格式
export interface CheckoutResponse {
  code: string
  msg: string
  result: CheckoutResult
}

// 提交訂單
export interface CreateOrderGood {
  skuId: string
  count: number
}

export interface CreateOrder {
  deliveryTimeType: number
  payType: number
  payChannel: number
  buyerMessage: string
  goods: CreateOrderGood[]
  addressId: string
}
