import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import type { User } from '@/types/typeInterface'

export const useUserStore = defineStore(
  'user',
  () => {
    //1. define state:
    const userInfo = ref<any>({})
    //2. define actions:
    const getUserInfo = async (user: User) => {
      const res = await loginAPI(user)
      userInfo.value = res.result
    }
    //3. log out時清空用戶信息
    const clearUserInfo = () => {
      userInfo.value = {}
    }
    //4. 以對象形式將 state & actions return
    return { userInfo, getUserInfo, clearUserInfo }
  },
  // 5. 用pinia-plugin-persistedstate pinia 持久化
  {
    persist: true,
  },
)
