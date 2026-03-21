<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { getCheckOutInfoAPI, createOrderAPI } from '@/apis/checkout'
import type { CheckoutResult, UserAddress } from '@/types/typeInterface'
import toHK from '@/utils/wordConverter'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

const router = useRouter()

const checkOutInfo = ref<CheckoutResult | null>(null)
//目前默認地址 （ie, isDefault ===0)
const curAddress = ref<UserAddress | null>(null)

//是否顯示彈窗
const dialogVisible = ref(false)
//彈窗中當前已點擊選取的地址
const activeAddress = ref<UserAddress | null>(null)

//開啟切換地址彈窗
const openSwitchDialog = () => {
  // 預設選中「目前默認地址」，避免未選就確定
  activeAddress.value = curAddress.value
  dialogVisible.value = true
}

//切換地址
const switchAddress = (address: UserAddress) => {
  activeAddress.value = address
}

//覆盖地址
const confirm = () => {
  curAddress.value = activeAddress.value
  dialogVisible.value = false
}

const getCheckOutInfo = async () => {
  const res = await getCheckOutInfoAPI()
  checkOutInfo.value = res.result
  console.log('下單結算-購物車內容: ', res.result)
  //適配默認地址isDefault=0
  curAddress.value = checkOutInfo.value?.userAddresses.find((item) => item.isDefault === 0) ?? null
}

onMounted(async () => {
  nextTick(() => {
    console.log('nextTick - 進入結算頁前-購物車內容:', cartStore.cartList)
  })
  setTimeout(() => {
    console.log('setTimeout - 進入結算頁前-購物車內容:', cartStore.cartList)
  }, 100)
  await cartStore.findNewCartListAPIAction()
  getCheckOutInfo()
})

const createOrder = async () => {
  console.log('提交訂單-購物車內容: ', checkOutInfo.value?.goods)
  const res = await createOrderAPI({
    deliveryTimeType: 1,
    payType: 1,
    payChannel: 1,
    buyerMessage: '',
    goods:
      checkOutInfo.value?.goods.map((item) => {
        return {
          skuId: item.skuId,
          count: item.count,
        }
      }) ?? [],
    addressId: curAddress.value?.id || '',
  })
  const orderId = res.result.id
  //跳轉頁面
  router.push({
    path: '/pay',
    query: {
      id: orderId,
    },
  })
  cartStore.updateNewList()
}
</script>

<template>
  <div class="flashdelivery-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收貨地址 -->
        <br />
        <h3 class="box-title">收貨資料</h3>
        <br />
        <div class="box-body">
          <div class="address-row">
            <div class="address-text">
              <div class="null-check" v-if="!curAddress">請先添加收貨地址才可提交訂單。</div>
              <ul v-else>
                <li>
                  <span>收<i />貨<i />人：</span>{{ curAddress.receiver }}
                </li>
                <li><span>聯絡電話：</span>{{ curAddress.contact }}</li>
                <li><span>收貨地址：</span>{{ toHK(curAddress.fullLocation) }}</li>
              </ul>
            </div>
            <div class="address-btn">
              <el-button type="primary" @click="openSwitchDialog">切換地址</el-button>
              <el-button type="primary">添加地址</el-button>
            </div>
          </div>
          <!-- 商品信息 -->
          <h3 class="box-title">商品信息</h3>
          <div class="box-body">
            <table class="goods">
              <thead>
                <tr>
                  <th width="500px">商品信息</th>
                  <th width="200px">單價</th>
                  <th width="200px">數量</th>
                  <th width="200px">小計</th>
                  <th width="200px">實付</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="good in checkOutInfo?.goods" :key="good.id">
                  <td>
                    <a href="javascript:void(0)" class="info">
                      <img :src="good.picture" alt="" />
                      <div class="right">
                        <p>{{ toHK(good.name) }}</p>
                        <p>{{ toHK(good.attrsText) }}</p>
                      </div>
                    </a>
                  </td>
                  <td>{{ good.price }}</td>
                  <td>{{ good.count }}</td>
                  <td>HK$ {{ good.totalPrice }}</td>
                  <td>HK$ {{ good.totalPayPrice }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 配送時間 -->
        <h3 class="box-title">配送時間</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:void(0)">不限送貨時間：周一至周日</a>
          <a class="my-btn" href="javascript:void(0)">工作日送貨：周一至周五</a>
          <a class="my-btn" href="javascript:void(0)">雙休日、假日送貨：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">網上支付</a>
          <a class="my-btn" href="javascript:;">貨到付款</a>
          <span style="color: #999">貨到付款需付 HK$5.00 手續費</span>
        </div>
        <!-- 金額明細 -->
        <h3 class="box-title">金額明細</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件數：</dt>
              <dd>{{ checkOutInfo?.summary.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品總價：</dt>
              <dd>HK${{ checkOutInfo?.summary.totalPrice?.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>運<i></i>費：</dt>
              <dd>HK${{ checkOutInfo?.summary.postFee?.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>應付總額：</dt>
              <dd class="price">HK${{ checkOutInfo?.summary.totalPayPrice?.toFixed(2) }}</dd>
            </dl>
          </div>
        </div>

        <!-- 提交訂單 -->
        <div class="submit">
          <el-button type="primary" size="large" @click="createOrder">提交訂單</el-button>
        </div>
      </div>
    </div>
  </div>

  <!-- 切換地址 -->
  <el-dialog v-model="dialogVisible" title="切換收貨地址" width="800">
    <div class="addressWrapper">
      <div
        class="text item"
        :class="{ active: activeAddress?.id === address.id }"
        v-for="address in checkOutInfo?.userAddresses"
        :key="address.id"
        @click="switchAddress(address)"
      >
        <ul>
          <li>
            <span>收<i />貨<i />人：</span>{{ address.receiver }}
          </li>
          <li><span>聯絡電話：</span>{{ address.contact }}</li>
          <li><span>收貨地址：</span>{{ toHK(address.fullLocation) }}</li>
        </ul>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm"> 確認 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.flashdelivery-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }
    .box-body {
      padding: 20px 0;
    }
  }
}

.address-row {
  display: flex;
  .address-text {
    display: 500px;
  }
  .address-btn {
    display: 1;
    margin-left: auto;
  }
}

.ul {
  flex: 1;
  padding: 20px;

  li {
    line-height: 30px;

    span {
      color: #999;
      margin-right: 5px;

      > i {
        width: 0.5em;
        display: inline-block;
      }
    }
  }
}

tr {
  th {
    background: #f5f5f5;
    font-weight: normal;
    text-align: left;
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }

    > ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>
