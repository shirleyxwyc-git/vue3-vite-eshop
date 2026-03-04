import { createRouter, createWebHistory } from 'vue-router'
//用 .ts（TypeScript）寫 router，建議用 RouteRecordRaw，咁 TypeScript 會幫你檢查路由配置有冇寫錯。
// import type { RouteRecordRaw } from 'vue-router'
// import Layout from '@/views/Layout/index.vue'
// import Login from '@/views/Login/index.vue'

const router = createRouter({
  //import.meta.env.BASE_URL係 Vite 自動注入嘅環境變數，代表你專案嘅 base 路徑（預設就係 /）
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 一級路由 Top-level route
    {
      path: '/',
      name: 'Layout Page',
      component: () => import('@/views/Layout/index.vue'),
      //二級路由 Nested route
      children: [
        {
          path: '',
          name: 'Home Page',
          component: () => import('@/views/Home/index.vue'),
        },
        {
          path: 'category',
          name: 'Category Page',
          component: () => import('@/views/Category/index.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'Login Page',
      component: () => import('@/views/Login/index.vue'),
    },
  ],
})

export default router
