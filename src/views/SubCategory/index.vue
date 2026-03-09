<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import toHK from '@/utils/wordConverter'
import type { SubCategoryData } from '@/types/category'
import GoodItems from '../Home/components/GoodItems.vue'
import type { ScrollbarDirection } from 'element-plus'

//獲取麵包屑導航數據
const route = useRoute()

const categoryFilter = ref<any>({})
const getCategoryFilter = async (id: string) => {
  const res = await getCategoryFilterAPI(Number(id))
  categoryFilter.value = res.result
  console.log('getCategoryFilterAPI: res.result =', res.result)
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

//獲取subCategory 商品列表渲染
const subCategoryGoodList = ref<any[]>([])

// const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

const requiredData = ref<SubCategoryData>({
  categoryId: 0,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime',
})

// 函數內的（參數名: SubCategoryData）唔好同外層變數名const requiredData一樣,
// 函數內用 requiredData: SubCategoryData，會優先用參數（即最近作用域），唔會用外層個 requiredData => SubCategoryData冇 .value 屬性
const getSubCategoryGoodList = async (data: SubCategoryData) => {
  const res = await getSubCategoryAPI(data)
  console.log('getSubCategoryAPI:res =', res)
  subCategoryGoodList.value = res.result.items
}

onMounted(() => {
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  requiredData.value = {
    categoryId: id ? Number(id) : 0,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime',
  }
  getSubCategoryGoodList(requiredData.value)
})

//subcategory <el-tab> 切換：
const tabChange = () => {
  console.log('tab 切換了：', requiredData.value.sortField)
  getSubCategoryGoodList(requiredData.value)
}

//加載subcategory 列表數據（infinite scroll）
const onScroll = () => {
  console.log('加載數據。。。')
  requiredData.value.pageSize++
}
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
      <el-tabs
        v-if="requiredData"
        v-model="requiredData.sortField"
        @tab-change="tabChange"
        class="subCat-tabs"
      >
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人氣" name="orderNum"></el-tab-pane>
        <el-tab-pane label="評論最多" name="commentNum"></el-tab-pane>
      </el-tabs>
      <!-- 商品列表 -->
      <div class="body">
        <!-- 子組件 GoodItems defineProps({ goods: ... })，goods =單個商品資料對象  -->
        <!-- :goods="item"，將每個商品資料傳俾子組件。 -->
        <GoodItems v-for="item in subCategoryGoodList" :key="item.id" :goods="item"></GoodItems>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }
}
</style>
