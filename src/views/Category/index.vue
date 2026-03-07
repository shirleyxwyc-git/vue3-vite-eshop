<script setup lang="ts">
import { getCategoryDataAPI } from '@/apis/category'
import { onMounted, reactive, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import toHK from '@/utils/wordConverter'
import { getBannerAPI } from '@/apis/home'

//獲取id => route.params.id
const route = useRoute()

// getCategoryDataAPI returns res.result is object type,
// define result: CategoryData using interface => TypeScript practice
interface CategoryAPIResponse {
  code: string
  msg: string
  result: CategoryData //对象类型数据 -> reactive not ref
}
// CategoryData 对象类型数据 ,並非只是簡單類型 / list[]-> reactive not ref
interface CategoryData {
  id: string
  name: string
  picture: null
  children: SubCategoryList[]
}
interface SubCategoryList {
  id: string
  name: string
  picture: string
  parentId: null
  parentName: null
  goods: SubCategoryGoods[]
  categories: null
  brands: null
  saleProperties: null
}

interface SubCategoryGoods {
  id: string
  name: string
  desc: string
  price: string
  picture: string
  discount: null
  orderNum: number
}

//reactive ；接受对象类型数据的参数传入并return一个响应式的对象
const categoryData = reactive<CategoryData>({} as CategoryData)

const categoryDataAPI = async () => {
  const id: string = route.params.id as string
  // if (!id) return // id 無值就唔調用 API
  const res = await getCategoryDataAPI(Number(id))
  //categoryData.value = res.result  用ref 先.value
  // 用reactive 要 用Object.assign
  Object.assign(categoryData, res.result)
}
onMounted(() => {
  categoryDataAPI()
})

const bannerList = ref<any[]>([])

const getBanner = async () => {
  const params = { distributionSite: '2' }
  const res = await getBannerAPI(params)
  bannerList.value = res.result
}

onMounted(() => {
  getBanner()
})
//onMounted 只會執行一次，之後切換分類唔會再調用 API，breadcrumb 唔會更新。
//要監聽 route 變化，當 id 變時自動調用 categoryDataAPI()。
//引入 watch。監聽 route.params.id，每次變就調用 API

watch(
  () => route.params.id,
  () => {
    categoryDataAPI()
  },
)
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
            <RouterLink to="/">
              <img :src="category.picture" />
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
