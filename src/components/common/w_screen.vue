<template>
    <!-- 全屏图标 -->
    <span title="全屏" v-if="!isFullScreen"><icon-fullscreen  @click="fullScreen" /></span>
    <span title="退出全屏" v-else><icon-fullscreen-exit @click="exiFulltScreen" /></span>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 此变量控制全屏图标或退出全屏图标的唯一显示
const isFullScreen = ref(false)

// 全屏
function fullScreen() {
    document.documentElement?.requestFullscreen()
    isFullScreen.value = true

}

// 退出全屏
function exiFulltScreen() {
    document?.exitFullscreen()
    isFullScreen.value = false
}

</script>

<style scoped></style>
