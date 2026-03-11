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

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(lazyPlugin)

app.mount('#app')
