<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';  // 引入Vue的核心函数
import { useRouter, useRoute } from 'vue-router';  // 用于路由跳转
import { Modal, Message } from '@arco-design/web-vue';  // 引入ArcoDesign组件库中的Modal和Message组件
import { userStore } from '@/stores/user-store';  // 导入用户状态管理store
import { idText } from 'typescript';  // 引入typescript的idText（不确定是否用到）

const router = useRouter();  // 获取router实例，用于路由跳转
const puserStore = userStore();  // 获取用户store实例
puserStore.loadUserInfo();  // 加载用户信息
const userInfo = ref();  // 声明userInfo，保存用户信息
if (puserStore.isLogin) {  // 如果用户已经登录
    userInfo.value = puserStore.userInfo  // 设置userInfo为已登录的用户信息
}

// 导航菜单列表
const menuList = [
    { title: '首页', value: 1, name: 'home' },  // 首页菜单项
    { title: '景点/攻略', value: 2, name: '' },  // 热门文章菜单项
    { title: '个人中心', value: 3, name: 'userInfo' },  // 热门板块菜单项
    // { title: '热门版块', value: 4, name: '' },  // 热门板块菜单项
]

// 响应式状态定义
const searchKey = ref('');  // 搜索框绑定值
const dropdownVisible = ref(false);  // 控制下拉菜单的可见性

// 搜索功能处理函数
const handleSearch = (value: string) => {
    router.push({ name: 'search', query: { q: value } });  // 跳转到搜索页面，并传递查询参数
};

// 跳转到注册或登录页面的处理函数
const navigateTo = (isRegister: boolean) => {
    if (isRegister) {  // 如果是注册
        router.push({ name: 'account', query: { isRegister: 'true' } });
        return
    }
    router.push({ name: 'account', query: { isRegister: 'false' } });  // 否则跳转到登录页面
};

// 发布按钮点击事件
const handlePublish = () => {
    if (!puserStore.isLogin) {  // 如果未登录
        Message.warning('请先登录');  // 显示提示消息
        return;
    }
    router.push({ name: 'articleAdd' });  // 跳转到发布页面
};

// 退出登录处理函数
const handleLogout = async () => {
    await puserStore.userLogout();  // 调用store中的退出登录方法
    dropdownVisible.value = false;  // 关闭下拉菜单
};

// 控制下拉菜单可见性的处理函数
const handleDropdownVisible = (visible: boolean) => {
    dropdownVisible.value = visible;  // 更新下拉菜单的可见性
};

// 用户中心跳转处理函数
const handleUserCenter = () => {
    router.push({ name: 'userInfo'});  // 跳转到用户中心（此处被注释掉）
    console.log("前往用户中心");  // 打印日志
};



// 获取当前路由
const route = useRoute()

// 新的激活状态判断逻辑
const isActive = (routeName: string) => {
    return route.name === routeName
}
</script>

<template>
    <div class="nav-container">
        <div class="nav-content">
            <!-- 左侧logo -->
            <router-link to="/" class="left-section">
                <img src="@/assets/logo.png" alt="logo" class="logo" />
            </router-link>

            <!-- 中间菜单 -->
            <div class="center-section">
                <div class="menu" v-for="menu in menuList" :class="{ 'active-menu': isActive(menu.name) }" :key="menu.value" @click.stop="router.push({ name: menu.name })">
                    {{ menu.title }} <!-- 遍历菜单列表并显示标题 -->
                </div>
            </div>
            <!-- 右侧功能区 -->
            <div class="right-section">
                <!-- 搜索框 -->
                <a-input-search v-model="searchKey" placeholder="请输入搜索内容" class="search-input" @search="handleSearch" />

                <template v-if="!puserStore.isLogin"> <!-- 如果用户未登录 -->
                    <a-button type="text" @click="navigateTo(false)">登录</a-button>
                    <a-button type="primary" @click="navigateTo(true)">注册</a-button>
                </template>

                <template v-else> <!-- 如果用户已登录 -->
                    <!-- 发布按钮 -->
                    <a-button type="primary" class="publish-btn" @click="handlePublish">
                        <template #icon><icon-edit /></template>
                        发布
                    </a-button>

                    <!-- 用户头像下拉菜单 -->
                    <a-dropdown position="br" trigger="click" :popup-visible="dropdownVisible"
                        @popup-visible-change="handleDropdownVisible">
                        <a-avatar :size="36" :image-url="userInfo.avatar"></a-avatar> <!-- 显示用户头像 -->
                        <template #content>
                            <div class="user-dropdown">
                                <!-- 用户信息 -->
                                <div class="user-info">
                                    <a-avatar :size="48" :image-url="userInfo.avatar">
                                    </a-avatar>
                                    <div class="info-text">
                                        <h4>{{ userInfo.nickname }}</h4> <!-- 显示用户名 -->
                                        <p class="email">{{ userInfo.desc }}</p> <!-- 显示用户描述 -->
                                    </div>
                                </div>

                                <a-divider class="my-2" />

                                <!-- 下拉菜单选项 -->
                                <div class="dropdown-actions">
                                    <a-button type="text" class="w-full justify-start" @click="handleUserCenter">
                                        <template #icon><icon-user /></template>
                                        个人中心
                                    </a-button>
                                    <a-button type="text" class="w-full justify-start" @click="handleLogout">
                                        <template #icon><icon-poweroff /></template>
                                        退出登录
                                    </a-button>
                                </div>
                            </div>
                        </template>
                    </a-dropdown>
                </template>
            </div>
        </div>
    </div>
</template>

<style lang="less">
.nav-container {
    width: 100%;
    height: 65px;
    background-color: @color-bg-white;
    box-shadow: @w_shadow;
    position: fixed;
    top: 0;
    z-index: 999;

    .nav-content {
        width: 80%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left-section {
            display: flex;
            align-items: center;

            .logo {
                height: 65px;
                cursor: pointer;
            }
        }

        .center-section {
            .flex-center();
            border-bottom: none;

            .menu {
                .flex-center();
                width: 80px;
                font-size: 15px;
                cursor: pointer;

                &:hover {
                    color: @primary-5;
                }
            }
            .active-menu {
                    color: @primary-6 !important;
                    font-weight: 500;
                    position: relative;

                    &::after {
                        content: '';
                        position: absolute;
                        bottom: -8px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 60%;
                        height: 2px;
                        background: @primary-6;
                        border-radius: 1px;
                    }
                }
        }

        .right-section {
            .flex-center();
            gap: 10px;
        }

    }
}

.user-dropdown {
    padding: 12px;
    width: 240px;

    .user-info {
        .flex-center();
        justify-content: left;
        gap: 12px;

        .info-text h4 {
            margin: 0;
            font-size: 16px;
        }

        .info-text p {
            margin: 4px 0 0;
            font-size: 12px;
            color: #666;
        }
    }

    .dropdown-actions {
        .flex-center();
        padding: 8px 0;
    }
}
</style>
