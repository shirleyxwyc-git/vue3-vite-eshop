//
import axios from 'axios'
import { ElMessage } from 'element-plus'

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
    return response.data
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
