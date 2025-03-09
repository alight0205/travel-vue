<template>
    <a-dropdown @select="handleSelect" :popup-max-height="false">
        <div class="w_user_dropdown_com">
            <a-avatar :size="35" :image-url="store.userInfo.avatar"></a-avatar>
            <span class="user_name">{{store.userInfo.nickname}}</span>
            <icon-down />
        </div>
        <template #content>
            <a-doption v-for="item in options" :value="item.name">{{ item.title }}</a-doption>
        </template>
    </a-dropdown>
</template>

<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
//引入用户存储
import  {userStore}  from '@/stores/user-store'
const store = userStore()

// 定义下拉菜单列表数据类型
interface OptionType{
    name:string,
    title:string
}

// 定义下拉菜单列表
const options = ref<OptionType[]>([
    { title: "用户列表", name: "userList" },
    { title: "文章列表", name: "articleList" },
    { title: "评论管理", name: "commentsList" },
    { title: "景点管理", name: "siteList" },
    { title: "注销登录", name: "logout" },
])

// 下拉菜单选中时的处理函数
function handleSelect(val: string) {
    if (val === "logout") {
        store.userLogout()
        return
    }
    router.push({ name: val })
}
</script>

<style lang="less">
.w_user_dropdown_com {
    cursor: pointer;

    .user_name {
        margin: 0 5px;
    }

    svg {
        margin-right: 0 !important;
    }
}
</style>
