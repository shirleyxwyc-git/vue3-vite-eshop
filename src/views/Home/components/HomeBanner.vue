<script setup lang="ts">
import { getBannerAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'

const bannerList = ref<any[]>([])

const getBanner = async () => {
  const res = await getBannerAPI()
  bannerList.value = res.result
}

onMounted(() => {
  getBanner()
})
</script>

<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="banner in bannerList" :key="banner.id">
        <img :src="banner.imgUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute; //完全貼住「父容器左上角」
  left: 0; // 左上角 0 點位置
  top: 0;
  z-index: 98; // 層數（上下順序）數字越大 → 越面 與position:一齊用

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
