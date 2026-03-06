<script setup>
import HomeBanner from './components/HomeBanner.vue'
import HomeCategory from './components/HomeCategory.vue'
import HomeHot from './components/HomeHot.vue'
import HomeNew from './components/HomeNew.vue'
import HomeProduct from './components/HomeProduct.vue'
</script>

<template>
  <div class="container">
    <div class="home-main">
      <HomeCategory />
      <HomeBanner />
    </div>
    <HomeNew />
    <HomeHot />
    <HomeProduct />
  </div>
</template>

<style scoped>
.home-main {
  display: flex; /**flex 容器 、橫向（水平）排列*/
  align-items: flex-start; /**子元素頂齊上方 */
  min-height: 500px;
}
.home-category {
  width: 250px;
  height: 500px;
}
.home-banner {
  flex: 1; /**「自動填滿父層係 （.home-main）flex容器剩餘空間」*/
  min-width: 0;
}
</style>
