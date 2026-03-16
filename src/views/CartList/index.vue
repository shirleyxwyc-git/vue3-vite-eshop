<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import { ElMessage } from 'element-plus'
import toHK from '@/utils/wordConverter'

const cartStore = useCartStore()

const cartList = cartStore.cartList

const countChange = () => {
  ElMessage.success('数量已更新')
}

//selectedList：目前表格「有打勾」的所有商品，是 el-table 自動傳來的參數
const handleSelectionChange = (selectedList: any[]) => {
  //1. 先把所有商品變成未選中
  cartList.forEach((item) => {
    item.selected = false
  })

  //2. 把表格有勾選的商品 → 設為 selected = true
  selectedList.forEach((selectedItem) => {
    const target = cartList.find((item) => item.skuId === selectedItem.skuId)
    if (target) {
      target.selected = true
    }
  })
  //3. 改 Pinia 入面嘅 isAll
  cartStore.isAll = selectedList.length === cartStore.cartList.length
}
</script>

<template>
  <div class="xtx-cart-page">
    <div class="container m-top-20">
      <el-table :data="cartList" width="100%" @selection-change="handleSelectionChange">
        <!-- 單選框 -->
        <el-table-column type="selection" width="40" />

        <!-- 商品信息 -->
        <el-table-column label="商品信息" width="400" align="center">
          <template #default="scope">
            <div class="good-item">
              <img class="good-img" :src="scope.row.picture" alt="" />
              <div class="good-info">
                <span class="name">{{ toHK(scope.row.name) }}</span>
                <p class="attrsText">{{ toHK(scope.row.attrsText) }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- 單價 -->
        <el-table-column prop="price" label="單價" width="200" align="center"></el-table-column>
        <!-- 數量 -->
        <el-table-column prop="count" label="數量" width="200" align="center">
          <template #default="scope">
            <el-input-number v-model="scope.row.count" @change="countChange" />
          </template>
        </el-table-column>

        <!-- 小計 -->
        <el-table-column label="小計" width="200" align="center">
          <template #default="scope">
            HK$ {{ (scope.row.count * scope.row.price).toFixed(2) }}
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" width="100" align="center">
          <template #default="scope">
            <el-popconfirm
              title="請確認是否刪除選購此商品?"
              @confirm="cartStore.deleteCart(scope.row.skuId)"
            >
              <template #reference>
                <el-button>刪除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 底部結算欄 -->
      <div class="cart-footer" v-if="cartStore.cartList.length">
        <div class="left">
          <span>
            共 {{ cartStore.totalCount }} 件商品， 已選擇 {{ cartStore.selectedCount }} 件商品，
            已選擇商品總價:
            <span class="red">HK$ {{ cartStore.selectedPrice.toFixed(2) }}</span>
          </span>
        </div>

        <div class="right">
          <el-button size="large" type="primary" @click="$router.push('/checkout')"
            >下單結算
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.good-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
.good-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border: 1px solid #eee;
  border-radius: 4px;
}

.cart-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #fff;
  border: 1px solid #eee;
  margin-top: 15px;
  border-radius: 4px;
  position: sticky;
  bottom: 0;
  z-index: 10;

  .red {
    color: $priceColor;
  }

  .left {
    width: 600px;
  }
  .right {
    margin-left: auto;
  }
}
</style>
