//封裝購物車模塊

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SelectedGood } from '@/types/typeInterface'

export const useCartStore = defineStore(
  'cart',
  () => {
    //Define State:
    const cartList = ref<SelectedGood[]>([])

    //Actions:
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
    return { cartList, addcart }
  },
  {
    persist: true,
  },
)
