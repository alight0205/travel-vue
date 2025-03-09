<script setup lang="ts">
import { userStore } from '@/stores/user-store';  // 导入用户状态管理store
const puserStore = userStore();  // 获取用户store实例
puserStore.loadUserInfo();
</script>

<template>
  <router-view />
</template>

<style scoped>


</style>
