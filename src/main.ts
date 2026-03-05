import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from '@/router/router'

//引入初始化樣式文件：
import '@/styles/common.scss'

const app = createApp(App)

app.use(createPinia())
// app.use(router)
app.use(ElementPlus)
app.use(router)

app.mount('#app')
