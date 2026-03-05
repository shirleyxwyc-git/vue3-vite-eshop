<script setup lang="ts">
//testAPI
import { getCategoryAPI } from '@/apis/testAPI'
getCategoryAPI().then((res) => {
  console.log(res)
})
</script>

<template>
  <!-- 一級路由出口組件 -->
  <router-view />
  <div class="test">test scss</div>
</template>

<style scoped lang="scss">
.test {
  color: #1dc779;
}
</style>
