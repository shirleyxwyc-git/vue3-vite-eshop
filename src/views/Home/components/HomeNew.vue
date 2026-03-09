<script setup lang="ts">
import { getNewAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'
import toHK from '@/utils/wordConverter'
import HomePanel from './HomePanel.vue'

const newList = ref<any[]>([])

const getNew = async () => {
  const res = await getNewAPI()
  newList.value = res.result
}

onMounted(() => {
  getNew()
})
</script>

<template>
  <HomePanel title="最新商品" subTitle="全球搜羅 熱賣新品">
    <!-- 呢度嘅內容就係 slot 內容，會顯示喺 HomePanel 內部 <slot /> 位置 -->
    <ul class="home-new">
      <li class="li" v-for="newItem in newList" :key="newItem.id">
        <RouterLink :to="`/detail/${newItem.id}`">
          <img :src="newItem.picture" alt="" />
          <p class="new-name">{{ toHK(newItem.name) }}</p>
          <p class="new-price"><i>HK$</i>{{ newItem.price }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>

<style scoped lang="scss">
.home-new {
  display: flex;
  justify-content: space-between; /**左右貼邊，中間平均分隔 */
  padding: 0;
  margin: 0;
  list-style: none;

  .li {
    flex: 1 0 0;
    max-width: 25%;
    box-sizing: border-box;
    text-align: center;
    background: #f0f9f4;
    margin: 0 8px;
    transition: all 0.5s;
    width: 25%;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    .img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      display: block;
    }
  }
}
</style>
