<script setup>
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutNav from './components/LayoutNav.vue'
</script>

<template>
  <div>
    首頁
    <layout-nav />
    <layout-header />
    <!-- 二級路由出口 -->
    <router-view />
    <layout-footer />
  </div>
</template>

<style scoped></style>
