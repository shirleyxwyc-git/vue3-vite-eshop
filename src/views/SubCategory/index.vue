<script setup lang="ts">
import { useCategory } from '../Category/composables/useCategory'
//import toHK from '@/utils/wordConverter'

const { categoryData } = useCategory()
</script>

<template>
  <div class="container">
    <!-- 麵包屑導航 breadcrumb -->
    <div class="bread-container">
      <el-breadcrumb seperator=">>">
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">家居</el-breadcrumb-item>
        <el-breadcrumb-item>收納</el-breadcrumb-item>
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
