<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getCategoryFilterAPI } from '@/apis/category'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import toHK from '@/utils/wordConverter'

//獲取麵包屑導航數據
const route = useRoute()

const categoryFilter = ref<any>({})
const getCategoryFilter = async (id: string) => {
  const res = await getCategoryFilterAPI(Number(id))
  categoryFilter.value = res.result
  console.log('res.result =', res.result)
}

onMounted(() => {
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id || ''
  getCategoryFilter(id || '')
})

//進階用法 onBeforeRouteUpdate：
// 切換路由參數（/1 → /2）時 👉 自動執行
onBeforeRouteUpdate((to) => {
  // to = 新頁面的路由資訊
  // 用Array.isArray 判斷，確保 id 一定係 string
  const id = Array.isArray(to.params.id) ? to.params.id[0] : to.params.id || ''
  getCategoryFilter(id || '')
})
</script>

<template>
  <div class="container">
    <!-- 麵包屑導航 breadcrumb -->
    <div class="bread-container">
      <!-- 「條件渲染」(Conditional Rendering)： 加 v-if="categoryFilter && categoryFilter.id" :
       確保 categoryFilter && categoryFilter.id一定存在，先渲染後面所有東西！
       防止categoryFilter.id或其他屬性=undefined而報錯-->
      <el-breadcrumb seperator=">>" v-if="categoryFilter && categoryFilter.id">
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item :to="`/category/${categoryFilter.parentId}`">{{
          toHK(categoryFilter.parentName) || ''
        }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="`/category/sub/${categoryFilter.id}`">{{
          toHK(categoryFilter.name) || ''
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs>
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人氣" name="orderNum"></el-tab-pane>
        <el-tab-pane label="評論最多" name="commentNum"></el-tab-pane>
      </el-tabs>
      <!-- 商品列表 -->
      <div class="body"></div>
    </div>
  </div>
</template>

<style lang="scss">
.sub-container {
  // padding: 32px;
  // color: #6b778c;
  // font-size: 32px;
  // font-weight: 600;

  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }
}
</style>
