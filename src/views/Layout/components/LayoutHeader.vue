<script setup lang="ts">
// import { getCategoryAPI } from '@/apis/layout'
// import { onMounted, ref } from 'vue'
//使用pinia 數據
import { useCategoryStore } from '@/stores/categoryStore'
import HeaderCart from './HeaderCart.vue'

//simplify to traditional Chinese
import toHK from '@/utils/wordConverter'

// const categoryList = ref<any[]>([])

// const getCategory = async () => {
//   const res = await getCategoryAPI()
//   console.log('res =', res)
//   console.log('res.result =', res.result)
//   categoryList.value = res.result
//   console.log('categoryList=', categoryList.value)
// }

// onMounted(() => {
//   getCategory()
// })

const categoryStore = useCategoryStore()
</script>

<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">閃送FlashDelivery</RouterLink>
      </h1>
      <ul class="app-header-nav">
        <li class="home" v-for="category in categoryStore.categoryList" :key="category.id">
          <RouterLink active-class="active" :to="`/category/${category.id}`">{{
            toHK(category.name)
          }}</RouterLink>
        </li>
      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜" />
      </div>
      <!-- 頭部購物車 -->
      <HeaderCart />
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: #fff;

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 150px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
    }
  }

  .app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;

    li {
      margin-right: 40px;
      width: 38px;
      text-align: center;

      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;

        &:hover {
          color: #27ba9b;
          border-bottom: 1px solid #27ba9b;
        }
      }
      .active {
        color: #27ba9b;
        border-bottom: 1px solid #27ba9b;
      }
    }
  }

  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;

    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }

    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }

  .cart {
    width: 50px;

    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;

      .icon-cart {
        font-size: 22px;
      }

      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: #e26237;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }
}
</style>
