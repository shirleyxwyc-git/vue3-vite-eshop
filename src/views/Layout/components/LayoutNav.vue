<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goLogin = (): void => {
  router.push('/login')
}
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="true">
          <li>
            <a><i class="iconfont icon-user"></i>周杰倫</a>
          </li>

          <li>
            <el-popconfirm
              title="確認退出嗎？"
              confirm-button-text="確認"
              cancel-button-text="取消"
              @confirm="goLogin"
            >
              <template #reference>
                <a>退出登錄頁</a>
              </template>
            </el-popconfirm>
          </li>

          <li><a>我的訂單</a></li>
          <li><a>會員中心</a></li>
        </template>

        <template v-else>
          <li>
            <button @click="goLogin" class="link-btn" type="button">請先登錄</button>
          </li>
          <li><a href="javascript:;">幫助中心</a></li>
          <li><a href="javascript:;">關於我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.app-topnav {
  background: #333;
  position: relative;
  z-index: 1000; // ✅ 高於 LayoutStickyHeader 嘅 z-index: 999， 否則 - 元素被覆蓋時點擊事件會失效
  ul {
    display: flex; //ul li + display:flex = 橫向選單
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}

// button 樣式（讓佢睇起來同 <a> 一樣）
.link-btn {
  appearance: none; // ✅ 移除瀏覽器預設按鈕樣式
  background: none;
  border: none;
  padding: 0 15px;
  color: #cdcdcd;
  cursor: pointer; // ✅ 改成手指
  font-size: inherit;
  line-height: 1;
  pointer-events: auto;

  &:hover {
    color: $xtxColor;
  }

  ~ a {
    border-left: 2px solid #666;
  }
}
</style>
