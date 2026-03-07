<script setup>
import { onMounted } from 'vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutNav from './components/LayoutNav.vue'
import LayoutStickyHeader from './components/LayoutStickyHeader.vue'
//觸發獲取header列表 （categoryList action）
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.getCategory()
})
</script>

<template>
  <layout-sticky-header />
  <layout-nav />
  <layout-header />
  <!-- 二級路由出口 會根據路由切換-->
  <!-- <router-view /> 會渲染「當前二級路由」對應嘅組件 -->
  <!-- Layout/index.vue 裡面 <router-view /> 會渲染 Home/index.vue -->
  <!-- 當路由跳去 /category/:id（例如 /category/1001）時，
Layout/index.vue 裡面嘅 <router-view /> 就會渲染 Category/index.vue -->
  <!-- 當路由跳去/xxx → 渲染 children 裡 path: 'xxx' 嘅組件 -->
  <router-view />
  <layout-footer />
</template>

<style scoped></style>
