<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';  // 用于路由跳转
import { userStore } from '@/stores/user-store';  // 导入用户状态管理store
const router = useRouter();
const puserStore = userStore();  // 获取用户store实例
const userInfo = ref();  // 声明userInfo，保存用户信息
if (puserStore.isLogin) {  // 如果用户已经登录
    puserStore.loadUserInfo();  // 加载用户信息
    userInfo.value = puserStore.userInfo  // 设置userInfo为已登录的用户信息
    console.log(userInfo.value)
}else{
    router.push({ name: "account" })
}

const menuList = [
    { title: '个人资料', icon: 'icon-user', name: 'userInfo' },
    { title: '我的文章', icon: 'icon-book', name: 'myArticle' },
    // { title: '我的收藏', icon: 'icon-star', name: 'myCollect' },
    { title: '我的评论', icon: 'icon-message', name: 'myComment' },
    // { title: '我的点赞', icon: 'icon-thumb-up', name: 'myLike' },
]
// 获取当前路由
const route = useRoute()

// 新的激活状态判断逻辑
const isActive = (routeName: string) => {
    return route.name === routeName
}

</script>


<template>
    <div class="user-center">
        <div class="user-func">
            <div class="user-menu">
                <div class="menu-item" v-for="menu in menuList" :class="{ 'active-menu': isActive(menu.name) }" @click="router.push({ name: menu.name })">
                    <component :is="menu.icon"></component>
                    <div class="menu">{{ menu.title }}</div>
                </div>
            </div>
            <div class="user-menu-info">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>


<style lang="less" scoped>
.user-center {
    width: 80%;
    display: flex;
    margin: 0 auto;
    margin-top: 90px;
    flex-direction: column;
    position: relative;

    .user-func {
        display: flex;
        justify-content: space-between;

        .user-menu {
            width: 20%;
            margin-top: 20px;
            border-radius: 10px;
            .active-menu {
                    color: @primary-6 !important;
                    font-weight: 500;
                    position: relative;

                    &::after {
                        content: '';
                        position: absolute;
                        bottom: 5px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 60%;
                        height: 2px;
                        background: @primary-6;
                        border-radius: 1px;
                    }
                }

            .menu-item {
                // width: 100px;
                padding: 20px;
                .flex-center();
                font-size: 16px;
                border: @w_border;
                cursor: pointer;
                background-color: @color-bg-white;

                &:hover {
                    color: @primary-5;
                }

                :last-child {
                    margin-left: 10px;
                }
            }
        }

        .user-menu-info {
            width: 78%;
            margin-top: 20px;
            border-radius: 10px;
            background-color: @color-bg-white;
        }

    }

}
</style>