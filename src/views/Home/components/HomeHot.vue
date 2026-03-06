<script setup lang="ts">
import { getHotAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'
import HomePanel from './HomePanel.vue'
import toHK from '@/utils/wordConverter'

const hotList = ref<any[]>([])

const getHot = async () => {
  const res = await getHotAPI()
  hotList.value = res.result
}

onMounted(() => {
  getHot()
})
</script>

<template>
  <HomePanel title="人氣推薦" subTitle="必選爆款 快閃優惠">
    <ul class="home-hot">
      <li class="li" v-for="hotitem in hotList" :key="hotitem.id">
        <!-- 图片懒加载 -->
        <img v-img-lazy="hotitem.picture" alt="" />
        <RouterLink to="/">
          <p class="hot-title">{{ toHK(hotitem.title) }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>

<style scope lang="scss">
.home-hot {
  display: flex;
  justify-content: space-between;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all 0.5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>
