<script setup lang="ts">
import { IconHome, IconSettings, IconCodeSandbox, IconNav } from '@arco-design/web-vue/es/icon';
import type { Component } from 'vue';

import { collapsed } from "@/components/admin/w_menu"
import router from '@/router';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue'
//引入用户存储
import { userStore } from '@/stores/user-store'
import w_menu_item from '@/components/admin/w_menu_item.vue'
const store = userStore()

interface MenuType {
    title: string // 菜单名
    name: string // 要跳转哪个路由
    icon?: string | Component // 图标
    children?: MenuType[] // 子菜单
    role?: number // 角色
}
// 菜单栏数据
const menuList: MenuType[] = [
    {
        title: "首页",
        name: "welcome",
        icon: IconHome
    },
    {
        title: "用户管理",
        name: "userManage",
        icon: "iconfont icon-yonghuguanli",
        children: [
            { title: "用户列表", name: "userList", icon: "iconfont icon-yonghuguanli_huaban" }
        ],
        // role: 1
    },
    {
        title: "文章管理",
        name: "articleManage",
        icon: IconCodeSandbox,
        children: [
            { title: "文章列表", name: "articleList", icon: IconNav }
        ]
    },
    {
        title: "评论管理",
        name: "commentsManage",
        icon: "iconfont icon-pinglun",
        children: [
            { title: "评论列表", name: "commentsList", icon: "iconfont icon-pinglunliebiao" }
        ],
        // role: 1
    },
    {
        title: "景点管理",
        name: "siteManage",
        icon: "iconfont icon-biaoqian",
        children: [
            { title: "景点列表", name: "siteList", icon: "iconfont icon-biaoqianliebiao" }
        ],
        // role: 1
    },
]
// 可以使用route.name拿到当前路由
const route = useRoute()
// 选择对应菜单切换相应路由
function menuItemClick(key: string) {
    router.push({
        name: key
    })

}

// 使用 ref 定义两个字符串数组 openkeys 和 selectedKeys，分别用于存储打开的键名和选中的键名
const openkeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])

// 定义 initRoute 函数，用于初始化路由相关逻辑
function initRoute() {
    // 如果匹配到的路由长度为3，表示当前路由有三级深度
    if (route.matched.length === 3) {
        // 将第二级路由的名称赋值给 openkeys 数组
        openkeys.value = [route.matched[1].name as string]
    }
    // 将当前路由的名称赋值给 selectedKeys 数组
    selectedKeys.value = [route.name as string]
}

// 调用 initRoute 函数进行初始化
initRoute()

// 使用 watch 监听路由名称的变化
watch(() => route.name, () => {
    // 路由名称变化时，重新调用 initRoute 函数
    initRoute()
}, { immediate: true })

</script>

<template>
    <div class="w_menu" :class="{ collapsed: collapsed }">
        <div class="w_menu_inner scrollbar">
            <!-- default-open-keys默认打开key，default-selected-keys默认选择的key -->
            <a-menu @menu-item-click="menuItemClick" :default-selected-keys="[route.name]" v-model:collapsed="collapsed"
                v-model:open-keys="openkeys" v-model:selected-keys="selectedKeys" show-collapse-button>
                <w_menu_item :list="menuList"></w_menu_item>
            </a-menu>
        </div>
    </div>
</template>

<style lang="less">
.w_menu {
    height: calc(100vh - 90px);
    /* 菜单栏高度设置为视口高度减去90px */
    position: relative;

    &.collapsed {
        .arco-menu-collapse-button {
            left: 48px !important;
        }
    }

    /* 相对定位 */
    &:hover {
        .arco-menu-collapse-button {
            opacity: 1 !important;
            /* 鼠标悬停时显示折叠按钮 */
        }
    }

    .w_menu_inner {
        height: 100%;
        /* 内层容器高度设置为100% */
        overflow-y: auto;
        /* 垂直方向自动出现滚动条 */
        overflow-x: hidden;


        /* 水平方向隐藏滚动条 */
        .arco-menu {
            position: inherit;
            /* 继承父元素的定位 */
            // height: 100%;

            /* 菜单高度设置为100% */
            .arco-menu-collapse-button {
                top: 50%;
                /* 折叠按钮位置设置在垂直方向50% */
                transform: translate(-50%, -50%);
                /* 水平和垂直方向平移 */
                left: 240px;
                /* 左侧偏移240px */
                transition: all .3s;
                /* 所有属性的过渡效果0.3秒 */
                opacity: 0;
                /* 默认透明 */
            }
        }
    }
}
</style>