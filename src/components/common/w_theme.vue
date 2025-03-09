<template>
    <!-- 主题图标，点击一个隐藏另一个，普通模式传递空参数，暗黑模式传递dark字符串 -->
     <span title="切换普通模式" v-if="theme === 'dark'"><icon-sun-fill  @click="setTheme('')" /></span>
     <span title="切换黑暗模式" v-else><icon-moon-fill  @click="setTheme('dark')" /></span>
</template>

<script setup lang="ts">
// 引入主题相关的变量与方法
import {theme,setTheme,loadTheme} from "@/components/common/w_theme"
loadTheme()
</script>

<style scoped></style>
