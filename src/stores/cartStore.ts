//封裝購物車模塊

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { APIResponse, SelectedGood } from '@/types/typeInterface'
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartListAPI, deleteCartAPI } from '@/apis/cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    const userStore = useUserStore()
    //isLogin 是 computed 對象，不是 token 字串。isLogin.value 才是 token 的值
    const isLogin = computed(() => userStore.userInfo.token)
    //Define State:
    const cartList = ref<SelectedGood[]>([])
    const isAll = ref(false)

    //Action 1:添加購物車
    const addcart = async (selectedGood: SelectedGood) => {
      if (isLogin.value) {
        //登錄後的加入購物車邏輯
        //1. 調用加入購物車接口
        await insertCartAPI(selectedGood.skuId, selectedGood.count)
        //2.調用最新購物車接口
        // 外部直接拿到後端返回的資料res = response.data in request.ts ={ code, msg, result }）
        const res: APIResponse<SelectedGood[]> = await findNewCartListAPI()
        if (res && Array.isArray(res.result)) {
          //3.用接口購物車覆蓋本地購物車
          cartList.value = res.result.map((item: any) => ({
            ...item,
            price: Number(item.price),
          }))
        } else {
          cartList.value = []
          console.error('購物車接口返回 undefined 或格式異常', res)
        }
        // 已登入時，這裡 return，避免執行本地 push
        return
      }
      //非登錄狀態
      //添加購物車操作
      //已添加過 count+1
      //沒有添加過 直接push
      const item = cartList.value.find((item) => selectedGood.skuId === item.skuId)
      if (item) {
        item.count++
      } else {
        cartList.value.push(selectedGood)
      }
    }
    //Action 2:刪除購物車
    const deleteCart = async (skuId: string) => {
      if (isLogin.value) {
        try {
          //1.調用刪除購物車API
          await deleteCartAPI([skuId])
          //2.調用獲取購物車列表API
          const res = await findNewCartListAPI()
          console.log('findNewCartListAPI 返回：', res)
          if (res && Array.isArray(res.result)) {
            //3. 用API購物車列表覆蓋本地購物車列表
            cartList.value = res.result
          } else {
            cartList.value = []
            console.error('購物車接口返回格式異常', res)
          }
        } catch (err) {
          cartList.value = []
          console.error('刪除購物車失敗', err)
        }
      } else {
        //找到要刪除數組元素的index
        const index = cartList.value.findIndex((item) => item.skuId === skuId)
        if (index >= 0) {
          cartList.value.splice(index, 1)
        }
      }
    }

    //Actions 3:
    const setAllselected = (status: boolean) => {
      cartList.value.forEach((item) => {
        item.selected = status
      })
    }
    //Action 4: 退出登錄是-清空購物車
    const clearCart = () => {
      cartList.value = []
    }

    //1.computed 總件數
    const totalCount = computed(() => {
      return cartList.value.reduce((sum, item) => sum + item.count, 0)
    })

    //2.computed 總價 price * count
    const totalPrice = computed(() => {
      return cartList.value.reduce((sum, item) => {
        return sum + item.count * item.price
      }, 0)
    })

    //3.已選擇數量
    const selectedCount = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((sum, item) => sum + item.count, 0),
    )

    //4.已選擇商品價錢合計
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((sum, item) => sum + item.count * item.price, 0),
    )

    return {
      cartList,
      isAll,
      addcart,
      deleteCart,
      setAllselected,
      totalCount,
      totalPrice,
      selectedCount,
      selectedPrice,
      clearCart,
    }
  },
  {
    persist: true,
  },
)
