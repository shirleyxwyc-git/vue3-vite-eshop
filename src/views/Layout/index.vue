<script setup>
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutNav from './components/LayoutNav.vue'
import LayoutStickyHeader from './components/LayoutStickyHeader.vue'
</script>

<template>
  <div>
    <layout-sticky-header />
    <layout-nav />
    <layout-header />
    <!-- 二級路由出口 會根據路由切換-->
    <router-view />
    <layout-footer />
  </div>
</template>

<style scoped></style>
