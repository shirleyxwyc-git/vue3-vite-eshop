<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
//import { loginAPI } from '@/apis/user'
import type { User } from '@/types/typeInterface'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

//表單驗證（用戶名+密碼）
//1. 準備表單數據對象並綁定<el-form> （:model="form")
const form = ref({
  account: 'xiaotuxian001',
  password: '123456',
  //用於自定義規則才加
  agree: true,
})

//2. 準備規則對象並綁定<el-form>  (:rules="rules")
const rules = {
  //默認配置
  account: [{ required: true, message: '用戶名不能為空', trigger: 'blur' }],
  password: [
    { required: true, min: 6, max: 14, message: '密碼長度需為6-14個字符', trigger: 'blur' },
  ],
  //默認配置沒有，用validator自定義：for checkbox : agree on privacy , terms & condition
  agree: [
    {
      validator: (rule: any, value: any, callback: any) => {
        console.log(value)
        //自定義邏輯：
        //勾選 checkbox 通過， 不勾選 checkbox 不通過
        //
        if (value) {
          callback()
        } else {
          callback(new Error('請選擇同意隱私條款及服務條款'))
        }
      },
    },
  ],
}

//3. 指定表單域<ef-form-item> 的校驗字段名prop="username"/prop="password"

//4. 表單對象進行雙向綁定 :v-model:="form.username"/:v-model:="form.password"

//5. 表單用意校驗
//5.1 獲取表單組件實例 formRef, 操作表單/調用方法。指定 Element Plus 的表單型別（FormInstance),否則 TypeScripe 不知道有 validate 方法
const formRef = ref<FormInstance>()
const router = useRouter()

const doLogin = () => {
  //調用實例formRef方法
  formRef.value?.validate(async (valid: boolean) => {
    //valid: 所有表單都通過校驗 => true
    console.log('統一校驗： ', valid)
    if (valid) {
      const user: User = {
        account: form.value.account,
        password: form.value.password,
      }
      // const res = await loginAPI(user)
      // console.log(res)
      await userStore.getUserInfo(user)
      // Login succeed：
      // 1. 提示用戶 &
      ElMessage({ type: 'success', message: '登錄成功!' })
      // 2.跳轉至首頁
      //router.push('/'): 用戶點瀏覽器「返回」會回到登錄頁
      //會替換當前歷史紀錄，用戶點「返回」不會回到登錄頁（更符合用戶體驗）。
      router.replace('/')
    }
  })
}
</script>

<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">閃送FlashDelivery</RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          進入網站首頁
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <!-- 表單區域 -->
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">用戶登錄</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form
              ref="formRef"
              :model="form"
              :rules="rules"
              label-position="right"
              label-width="60px"
              status-icon
            >
              <el-form-item prop="account" label="用戶">
                <el-input v-model="form.account" placeholder="請輸入用戶名稱" />
              </el-form-item>
              <el-form-item prop="password" label="密碼">
                <el-input v-model="form.password" placeholder="請輸入密碼" />
              </el-form-item>
              <el-form-item prop="agree" label-width="22px">
                <el-checkbox v-model="form.agree" size="large">
                  我已同意隱私條款及服務條款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="doLogin">點擊登錄</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">關於我們</a>
          <a href="javascript:;">幫助中心</a>
          <a href="javascript:;">售後服務</a>
          <a href="javascript:;">配送與驗收</a>
          <a href="javascript:;">商務合作</a>
          <a href="javascript:;">搜索推薦</a>
          <a href="javascript:;">友情鏈接</a>
        </p>
        <p>CopyRight &copy; 閃送FlashDelivery</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~ a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}
</style>
