<script setup lang="ts">
import { useCategoryStore } from '@/stores/categoryStore'
import toHK from '@/utils/wordConverter'

const categoryStore = useCategoryStore()
</script>

<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="category in categoryStore.categoryList" :key="category.id">
        <RouterLink to="/">{{ toHK(category.name) }}</RouterLink>
        <RouterLink v-for="child in category.children.slice(0, 2)" :key="child.id" to="/">
          {{ toHK(child.name) }}
        </RouterLink>

        <!-- 彈层layer位置 -->
        <div class="layer">
          <h4>分類推薦<small> 根據您的購買或瀏覽記錄推薦</small></h4>
          <ul>
            <!-- 每個商品卡片 li -->
            <li v-for="good in category.goods" :key="good.id">
              <RouterLink to="/">
                <!--每一個<RouterLink> 係渲染出嚟嘅 <a>-->
                <img :src="good.picture" alt="" />
                <div class="info">
                  <p class="name ellipis-2">{{ toHK(good.name) }}</p>
                  <p class="desc ellipis-2">{{ toHK(good.desc) }}</p>
                  <p class="price"><i>$</i>{{ good.price }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;

  .menu {
    li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;

      &:hover {
        background: $xtxColor;
      }

      a {
        margin-right: 4px;
        color: #fff;

        //只對「每一個 li 裡面的「第一個 a 標籤」生效！
        &:first-child {
          font-size: 16px;
        }
      }

      .layer {
        width: 990px;
        height: 500px;
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        left: 250px;
        top: 0;
        display: none; //預設 .layer 係 display: none;（唔顯示）
        padding: 0 15px;

        h4 {
          font-size: 20px;
          font-weight: normal;
          line-height: 80px;

          small {
            font-size: 16px;
            color: #666;
          }
        }

        ul {
          display: flex;
          flex-wrap: wrap; //當子元素（如 li）排唔落一行時，會自動換行到下一行。

          li {
            width: 310px;
            height: 120px;
            margin-right: 15px;
            margin-bottom: 15px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;

            &:nth-child(3n) {
              //每行第 3 個 li 右邊唔會有空隙，令格仔排列齊整。
              margin-right: 0;
            }

            // 每一個<RouterLink> 係渲染出嚟嘅 <a>
            a {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              padding: 10px;

              &:hover {
                background: #e3f9f4;
              }

              img {
                width: 95px;
                height: 95px;
              }

              .info {
                padding-left: 10px;
                line-height: 24px;
                overflow: hidden;

                .name {
                  font-size: 12px;
                  color: #666;
                }

                .desc {
                  font-size: 11px;
                  color: #999;
                }

                .price {
                  font-size: 16px;
                  color: $priceColor;

                  i {
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
      }
      // 关键样式  當滑鼠 hover 喺 <li> 上面時，.layer 變成 display: block;（顯示）
      &:hover {
        .layer {
          display: block;
        }
      }
    }
  }
}
</style>
