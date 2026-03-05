<script setup lang="ts"></script>

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
            >
              <template #reference>
                <a>退出登錄</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a>我的訂單</a></li>
          <li><a>會員中心</a></li>
        </template>
        <template v-else>
          <li><a @click="$router.push('/login')">請先登錄</a></li>
          <li><a>幫助中心</a></li>
          <li><a>關於我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped></style>
