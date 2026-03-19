import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import type { User } from '@/types/typeInterface'
import { useCartStore } from './cartStore'
import { mergeCartAPI, findNewCartListAPI } from '@/apis/cart'

export const useUserStore = defineStore(
  'user',
  () => {
    // 在這裡呼叫 useCartStore()
    const cartStore = useCartStore()
    //1. define state:
    const userInfo = ref<any>({})
    //2. define actions:
    //2.1 登錄actions
    const getUserInfo = async (user: User) => {
      const res = await loginAPI(user)
      userInfo.value = res.result
      //2.2 合併購物車：把本地購物車資料（map 成後端需要的格式）發送給後端，等後端合併完成。
      await mergeCartAPI(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count,
          }
        }),
      )
      //「合併後」的後端購物車列表：
      const cartRes = await findNewCartListAPI()
      cartStore.cartList = Array.isArray(cartRes.result) ? cartRes.result : []
    }
    //3. log out時清空用戶信息
    const clearUserInfo = () => {
      userInfo.value = {}
      //退出登錄清除購物車的action
      cartStore.clearCart()
    }
    //4. 以對象形式將 state & actions return
    return { userInfo, getUserInfo, clearUserInfo }
  },
  // 5. 用pinia-plugin-persistedstate pinia 持久化
  {
    persist: true,
  },
)
