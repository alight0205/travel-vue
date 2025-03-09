<script setup lang="ts">
import type { Component } from 'vue';
import { userStore } from '@/stores/user-store';
import w_component from '@/components/common/icon.vue';
import w_menu_item from '@/components/admin/w_menu_item.vue'
interface MenuType {
    title: string // 菜单名
    name: string // 要跳转哪个路由
    icon?: string | Component // 图标
    children?: MenuType[] // 子菜单
    role?: number // 角色
}

interface Props {
    list: MenuType[]
}

const props = defineProps<Props>()
const store = userStore()
</script>

<template>
    <!-- 遍历菜单栏数据 -->
    <template v-for="menu in props.list">
        <template v-if="!menu.children">
            <!-- 如果菜单对象没有子菜单渲染这个 -->
            <a-menu-item :key="menu.name" v-if="menu.role === undefined || menu.role === store.userInfo.role">
                <template #icon>
                    <w_component :is="menu.icon"></w_component>
                </template>
                {{ menu.title }}
            </a-menu-item>
        </template>
        <template v-else>
            <!-- 如果菜单对象有子菜单渲染这个 -->
            <a-sub-menu :key="menu.name" :title="menu.title"
                v-if="menu.role === undefined || menu.role === store.userInfo.role">
                <template #icon>
                    <w_component :is="menu.icon"></w_component>
                </template>
                <w_menu_item :list="menu.children"></w_menu_item>
            </a-sub-menu>
        </template>
    </template>

</template>

<style lang="less"></style>