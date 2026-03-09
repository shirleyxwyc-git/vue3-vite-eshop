<script setup lang="ts">
import toHK from '@/utils/wordConverter'
import { useBanner } from '@/views/Category/composables/useBanner'
import { useCategory } from './composables/useCategory'

const { bannerList } = useBanner()
const { categoryData } = useCategory()
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">>">
          <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
          <!-- reactive 狀態下直接寫 categoryData.name，唔需要 .value -->
          <el-breadcrumb-item>{{ toHK(categoryData.name || '') }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 輪播圖 -->
      <div class="home-banner">
        <el-carousel height="500px">
          <el-carousel-item v-for="banner in bannerList" :key="banner.id">
            <img :src="banner.imgUrl" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="sub-list">
        <h3>{{ toHK(categoryData.name || '') }}館所有分類</h3>
        <ul>
          <li v-for="category in categoryData.children" :key="category.id">
            <RouterLink :to="`/category/sub/${category.id}`">
              <!-- 如果 category.picture 係 null 或 undefined，就用空字串 ''，即 <img src="">，瀏覽器會當冇圖顯示，唔會報錯。 -->
              <img :src="category.picture || ''" />
              <p>{{ toHK(category.name || '') }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="ref-goods" v-for="category in categoryData.children" :key="category.id">
        <div class="head">
          <h3>- {{ toHK(category.name) || '' }}-</h3>
        </div>
        <ul class="body">
          <li class="li" v-for="good in category.goods" :key="good.id">
            <RouterLink class="good-item" to="/">
              <img v-img-lazy="good.picture" alt="" />
              <p class="name ellipsis">{{ toHK(good.name || '') }}</p>
              <p class="desc ellipsis">{{ toHK(good.desc || '') }}</p>
              <p><i>HK$</i>{{ good.price || '' }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex; // 令 .body 內 li 橫向排列（彈性盒子）
      justify-content: space-around; // 子元素（li）左右平均分佈，首尾有空隙
      padding: 0 10px 30px; // 上 0、左右 10px空隙、下 30px 的內邊距
    }
    flex-wrap: wrap; // 當 li 太多排唔落一行時，自動換行

    li {
      width: 240px;
      height: 300px;
      margin-right: 10px;
      margin-bottom: 10px;

      // 最後一行底部冇 margin。
      &:nth-last-child(-n + 4) {
        margin-bottom: 0;
      }

      // 每行最後一格右邊冇 margin。
      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
}

.bread-container {
  padding: 25px 0;
}

.home-banner {
  width: 1240px;
  height: 500px;
  margin: 0 auto; /* 👈 關鍵！左右自動居中！ */
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
