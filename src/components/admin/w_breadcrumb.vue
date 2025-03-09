<template>
    <!-- 面包屑导航 -->
    <a-breadcrumb>
        <!-- 遍历路由匹配的路径 -->
        <template v-for="r in route.matched">
            <!-- 过滤掉名称为 'home' 的路由，并显示其他路由的标题 -->
            <a-breadcrumb-item v-if="r.name !== 'welcome'">{{ r.meta?.title }}</a-breadcrumb-item>
        </template>
    </a-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute, type RouteMeta } from 'vue-router';

// 定义 MetaType 接口，继承自 RouteMeta，并包含一个 title 属性
const route = useRoute()

</script>

<style scoped></style>
