<script setup lang="ts">
import userCenter from '@/components/web/center/userCenter/userCenter.vue'
import { ref, reactive, computed, onMounted } from 'vue';  // 引入Vue的核心函数
import { userStore } from '@/stores/user-store';  // 导入用户状态管理store
import { Message } from '@arco-design/web-vue';
import type { userUpdateReq, userRes } from '@/types/user'
import { userUpdateUserApi } from '@/api/user'
import imageUpload from '@/components/common/imageUpload.vue'

const puserStore = userStore();  // 获取用户store实例
puserStore.loadUserInfo();
const form = ref<userUpdateReq>({
  id: puserStore.userInfo?.id || 1,
  username: puserStore.userInfo?.username || '',
  nickname: puserStore.userInfo?.nickname || '',
  desc: puserStore.userInfo?.desc || '',
  avatar: puserStore.userInfo?.avatar || '',
  role: puserStore.userInfo?.role || 0,
  email: puserStore.userInfo?.email || '',
});
const visible = ref(false)
const userRef = ref()
// 处理函数
async function updateUser() {
  const res = await userUpdateUserApi(form.value)
  if (res.code) {
    Message.error(res.msg)
    return false
  }
  Message.success(res.msg)
  puserStore.saveUserInfo(puserStore.userInfo.token)
  userRef.value.initUserInfo()
  visible.value = false
  return true
}

function getvisible(val: boolean) {
  visible.value = val
}


</script>


<template>
  <a-modal v-model:visible="visible" title="编辑用户信息">
    <a-form :model="form">
      <a-form-item label="头像">
        <imageUpload v-model="form.avatar"></imageUpload>
      </a-form-item>
      <a-form-item label="昵称">
        <a-input placeholder="昵称" v-model="form.nickname"></a-input>
      </a-form-item>
      <a-form-item label="用户名">
        <a-input placeholder="用户名" v-model="form.username" disabled></a-input>
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input placeholder="邮箱" v-model="form.email"></a-input>
      </a-form-item>
      <a-form-item label="简介">
        <a-textarea placeholder="简介" v-model="form.desc"></a-textarea>
      </a-form-item>
    </a-form>
    <div class="updateUserInfo"><a-button type="primary" @click="updateUser">更新</a-button></div>
  </a-modal>
  <userCenter @getVisible="getvisible" ref="userRef"></userCenter>
</template>


<style lang="less" scoped>
.updateUserInfo {
  display: flex;
  align-items: center;
  justify-content: end;
}
</style>