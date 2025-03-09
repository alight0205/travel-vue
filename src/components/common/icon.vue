<template>
    <!-- 如果 props.is 是一个对象，使用 <component> 动态渲染该组件作为图标。 -->
    <component v-if="typeof props.is === 'object'" :is="props.is"></component>
    <!-- 如果 props.is 是一个字符串，使用 <i> 元素添加该类名来显示图标 -->
    <i :class="props.is" v-else></i>
</template>

<script setup lang="ts">
import type { Component } from "vue"

interface Props {
    is?: Component | string
}

// defineProps 帮助我们从父组件接收传递给子组件的属性
const props = defineProps<Props>()
</script>


