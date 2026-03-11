import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from '@/router/router'
//引入初始化樣式文件：
import '@/styles/common.scss'
// 引入圖片懶加載指令插件並切註冊
import { lazyPlugin } from '@/directives/index'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

const pinia = createPinia()
//註冊pinia持久化插件
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(lazyPlugin)

app.mount('#app')
