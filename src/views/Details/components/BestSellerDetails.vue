<script setup lang="ts">
import { onMounted, ref } from 'vue'
import toHK from '@/utils/wordConverter'
import { getBestSellerDetailsAPI } from '@/apis/details'
import { useRoute } from 'vue-router'

// type:不同類型best seller數據
const prop = defineProps({
  bestSellerType: {
    type: Number, // 1代表24小時熱賣榜 2代表周熱賣榜 3代表總熱賣榜 可以使用type去适配title和数据列表
    default: 1,
  },
})
// 先定義只能是 1 | 2 | 3
type RankType = 1 | 2 | 3
const TypeMap: Record<RankType, string> = {
  1: '24小時熱賣榜',
  2: '周熱賣榜',
  3: '總熱賣榜',
}

const title: string = TypeMap[prop.bestSellerType as RankType]

const bestSellerGoods = ref<any>([])

const route = useRoute()
const getBestSellerDetails = async (): Promise<any> => {
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id || ''
  const type = prop.bestSellerType
  const res = await getBestSellerDetailsAPI(Number(id), type)
  bestSellerGoods.value = res.result
}

onMounted(() => {
  getBestSellerDetails()
})
</script>

<template>
  <div class="bestseller-goods">
    <h3>{{ title }}</h3>
    <RouterLink
      class="bestseller-item"
      to="`${{item.picture}}`"
      v-for="item in bestSellerGoods"
      :key="item.id"
    >
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ toHK(item.name) }}</p>
      <p class="desc ellipsis">{{ toHK(item.desc) }}</p>
      <p class="price">HK${{ item.price }}</p>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.bestseller-goods {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .bestseller-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>
