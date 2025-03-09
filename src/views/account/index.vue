<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { createUserApi } from '@/api/user' // 登录 & 注册 API
import { loginApi } from '@/api/login'
import type { loginReq } from '@/types/login'
import type { userCreateReq } from '@/types/user'
import { Message } from '@arco-design/web-vue' // Arco Design 消息提示
import { userStore } from '@/stores/user-store' // 用户信息管理（Pinia）

// 路由
const router = useRouter()
const route = useRoute()

// Pinia 管理用户信息
const puserStore = userStore()

// 是否是注册模式（默认 false，即登录）
const isRegister = ref(false)

// 绑定到表单的数据（支持登录和注册）
const form = reactive<loginReq & userCreateReq>({
  username: "",
  password: ""
})

// 表单引用（用于校验）
const formRef = ref()

/**
 * 处理用户提交（登录或注册）
 */
async function handleSubmit() {
  // 校验表单
  const val = await formRef.value.validate()
  if (val) return // 如果校验失败，直接返回

  let res
  if (isRegister.value) {
    // 如果是注册模式，调用注册 API
    res = await createUserApi(form)
  } else {
    // 如果是登录模式，调用登录 API
    res = await loginApi(form)
  }

  // 处理 API 响应
  if (res.code) {
    Message.error(res.msg) // 显示错误消息
    return
  }

  Message.success(isRegister.value ? "注册成功" : "登录成功") // 成功提示

  // 存储用户信息（如 Token）
  puserStore.saveUserInfo(res.data.token)

  // 登录成功后跳转到首页
  router.push({ name: "home" })
}

watch(
  () => route.query.isRegister,
  (newVal) => {
    isRegister.value = newVal === 'true';
  },
  { immediate: true } // 立即执行一次，确保初始状态正确
);

</script>

<template>
  <div class="account_view">
    <div class="account_mask">
      <a-form :model="form" ref="formRef" :label-col-props="{ span: 0 }" :wrapper-col-props="{ span: 24 }">

        <!-- 标题（根据 isRegister 变化） -->
        <div class="title">{{ isRegister ? '用户注册' : '用户登录' }}</div>

        <!-- 用户名输入框 -->
        <a-form-item field="username" label="用户名" :rules="[{ required: true, message: '请输入用户名' }]"
          :validate-trigger="['change', 'input']">
          <a-input placeholder="用户名" v-model="form.username">
            <template #prefix>
              <icon-user />
            </template>
          </a-input>
        </a-form-item>

        <!-- 密码输入框 -->
        <a-form-item field="password" label="密码" :rules="[{ required: true, message: '请输入密码' }]"
          :validate-trigger="['change', 'input']">
          <a-input placeholder="密码" v-model="form.password" type="password">
            <template #prefix>
              <icon-lock />
            </template>
          </a-input>
        </a-form-item>

        <!-- 提交按钮（根据 isRegister 变化） -->
        <a-form-item>
          <a-button type="primary" @click="handleSubmit" long>{{ isRegister ? '注册' : '登录' }}</a-button>
        </a-form-item>

        <!-- 切换 登录/注册 -->
        <div class="tips_info" @click="isRegister = !isRegister">
          {{ isRegister ? '已有账号？立即登录' : '没有账号？立即注册' }}
        </div>

      </a-form>
    </div>
  </div>
</template>

<style lang="less">
.account_view {
  background: url(https://www.fengfengzhidao.com/image/bg.png) 50% / cover no-repeat;
  position: relative;
  height: 100vh;

  .account_mask {
    width: 400px;
    height: 100vh;
    background-color: rgba(white, 0.8);
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .arco-form {
      padding: 40px;
    }

    .title {
      font-size: 26px;
      font-weight: 600;
      text-align: center;
      color: @primary-6;
      margin-bottom: 10px;
    }

    .tips_info {
      font-size: 14px;
      cursor: pointer;

      &:hover {
        color: @primary-6;
      }
    }
  }
}
</style>
