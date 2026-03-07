<script setup lang="ts">
import { getGoodsAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'
import HomePanel from './HomePanel.vue'
import toHK from '@/utils/wordConverter'

const goodList = ref<any[]>([])

const getGoods = async () => {
  const res = await getGoodsAPI()
  goodList.value = res.result
}

onMounted(() => {
  getGoods()
})
</script>

<template>
  <div class="home-product">
    <HomePanel :title="toHK(category.name)" v-for="category in goodList" :key="category.id">
      <div class="box">
        <RouterLink class="cover" to="/">
          <img v-img-lazy="category.picture" />
          <strong class="label">
            <span>{{ toHK(category.name) }}</span>
            <span>{{ toHK(category.saleInfo) }}</span>
          </strong>
        </RouterLink>

        <ul class="goods-list">
          <li class="li" v-for="good in category.goods" :key="good.id">
            <RouterLink class="good-item" to="/">
              <img v-img-lazy="good.picture" alt="" />
              <p class="name ellipsis">{{ toHK(good.name) }}</p>
              <p class="desc ellipsis">{{ toHK(good.desc) }}</p>
              <p><i>HK$</i>{{ good.price }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<style scoped lang="scss">
.home-product {
  background: #fff;
  margin-top: 20px;

  .box {
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fdfcfc;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 50px;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    .goods-list {
      width: 990px; //整個商品列表區域寬度 990px
      display: flex; // 令 li 橫向排列（彈性盒子）
      flex-wrap: wrap; // 當 li 太多排唔落一行時，自動換行

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
