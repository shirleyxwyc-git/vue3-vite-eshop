//
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

// 建立帶有默認配置的 axios 實例 request
const request = axios.create({
  //參數：配置對象config object，用於設定新 axios 實例嘅默認配置
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
})

// Request Interceptor: request.interceptors.request.use( 參數1, 參數2 )
request.interceptors.request.use(
  //參數1：請求「成功」時執行的函數，一定要 return config
  (config) => {
    // ======================================
    // 發送請求 之前 執行， 你想做的所有事情，全部寫在這裡！
    // ======================================

    // 1. 加 token（登錄驗證）
    // 1.1 從pinia 獲取token數據：
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    //1.2 按照後端要求拼接token數據：
    // 如果有 token → 自動塞進 headers
    if (token) {
      //如果後端在 application.yml沒有設置了 admin-token-name，
      // 默認token名='Authorization' 及默認 token前綴='Bearer'
      // `Bear ${token}`:Bear 與 ${token}之間一定要有space
      config.headers.Authorization = `Bear ${token}`
      //如果後端在 application.yml 設置了 admin-token-name: token，
      // 這代表後端期望你在 header 裡傳遞的 token 名稱是 token，而不是 Authorization。
      //config.headers.token = token
    }

    // 2. 加自定義 header

    return config
  },
  //參數 2：請求「失敗 / 報錯」時執行的函數：一定要 return Promise.reject(error)
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// Response Interceptor: 拿到數據後:脫殼（取 data）、統一錯誤提示、401 跳登錄
request.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    return response.data //（response.data 包含 code、msg、result）
  },
  // 請求出錯時的處理函數，會把錯誤包裝成 rejected promise
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // 統一錯誤提示
    console.log('axios error:', error.response)
    ElMessage({
      type: 'warning',
      message: error.response.data.message,
    })
    return Promise.reject(error)
  },
)

export default request
