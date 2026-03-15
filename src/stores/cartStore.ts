//封裝購物車模塊

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { SelectedGood } from '@/types/typeInterface'

export const useCartStore = defineStore(
  'cart',
  () => {
    //Define State:
    const cartList = ref<SelectedGood[]>([])

    //Action 1:添加購物車
    const addcart = (selectedGood: SelectedGood) => {
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
    const deleteCart = (skuId: string) => {
      const index = cartList.value.findIndex((item) => item.skuId === skuId)
      //找不到時，index 是 -1
      if (index >= 0) {
        cartList.value.splice(index, 1) //從陣列的第 index 個位置開始，刪除 1 個元素。
      }
    }

    //computed 總件數
    const totalCount = computed(() => {
      return cartList.value.reduce((sum, item) => sum + item.count, 0)
    })

    //computed 總價 price * count
    const totalPrice = computed(() => {
      return cartList.value.reduce((sum, item) => {
        return sum + item.count * item.price
      }, 0)
    })

    return { cartList, addcart, deleteCart, totalCount, totalPrice }
  },
  {
    persist: true,
  },
)
