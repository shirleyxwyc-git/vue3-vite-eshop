<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'

// 圖片列表
// const imageList = [
//   'https://yanxuan-item.nosdn.127.net/d917c92e663c5ed0bb577c7ded73e4ec.png',
//   'https://yanxuan-item.nosdn.127.net/e801b9572f0b0c02a52952b01adab967.jpg',
//   'https://yanxuan-item.nosdn.127.net/b52c447ad472d51adbdde1a83f550ac2.jpg',
//   'https://yanxuan-item.nosdn.127.net/f93243224dc37674dfca5874fe089c60.jpg',
//   'https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg',
// ]

const prop = defineProps({
  imageList: {
    type: Array as () => string[],
    default: () => [],
  },
})

//1. 小圖切換大圖
//為小圖綁定事件，記錄當前激活的 array[activeIndex]。
const activeIndex = ref(0)

// i:number ： 由@mouseenter="enterhandler(i) 傳入
const enterhandler = (i: number) => {
  activeIndex.value = i
  console.log(i)
}
//2. 放大圖片： 用vueuse 的 useMouseInElement
//2.1 獲取鼠標相對位置
const target = ref(null)

//elementX 同 elementY 係 ref
const { elementX, elementY, isOutside } = useMouseInElement(target) as any

//滑塊.layer座標
const left = ref(0)
const top = ref(0)

//放大圖.large座標
const positionX = ref(0)
const positionY = ref(0)
//2.2 控制滑塊跟隨鼠標移動（監聽elementX, elementY變化，一旦變化，重新設置left / top）
watch([elementX, elementY], () => {
  console.log('x,y 變化了')
  if (isOutside.value) {
    return
  } else {
    console.log('executing....')
    //有效移動範圍內控制滑塊距離
    //橫向
    if (elementX.value > 100 && elementX.value < 300) {
      left.value = elementX.value - 100
    }
    //縱向
    if (elementY.value > 100 && elementY.value < 300) {
      top.value = elementY.value - 100
    }

    //邊際處理
    //橫向
    if (elementX.value > 300) {
      left.value = 200
    }
    if (elementX.value < 100) {
      left.value = 0
    }

    //縱向
    if (elementY.value > 300) {
      top.value = 200
    }
    if (elementY.value < 100) {
      top.value = 0
    }

    //控制大圖顯示（監聽滑塊位置變化，更新放大圖背景位置）
    positionX.value = -left.value * 2
    positionY.value = -top.value * 2
  }
})
</script>

<template>
  {{ elementX }} , {{ elementY }}, {{ isOutside }}
  <div class="goods-image">
    <!--左側大圖 -->
    <div class="middle" ref="target">
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 蒙層小滑塊 -->
      <div class="layer" v-show="!isOutside" :style="{ left: `${left}px`, top: `${top}px` }"></div>
    </div>
    <!--小圖列表 -->
    <ul class="small">
      <li
        v-for="(img, i) in imageList"
        :key="i"
        @mouseenter="enterhandler(i)"
        :class="{ active: i === activeIndex }"
      >
        <img :src="img" alt="'" />
      </li>
    </ul>
    <!-- 放大鏡大圖 -->
    <div
      class="large"
      :style="[
        {
          backgroundImage: `url(${imageList[activeIndex]})`,
          backgroundPositionX: `${positionX}px`,
          backgroundPositionY: `${positionY}px`,
        },
      ]"
      v-show="!isOutside"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 600px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>
