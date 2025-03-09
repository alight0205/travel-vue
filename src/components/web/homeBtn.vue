<script setup lang="ts">
import { ref, type Component } from "vue"
import icon from "@/components/common/icon.vue"
import router from "@/router"
// 标签内容类型
interface buttonListType {
    title: string
    icon?: string | Component // 图标
    url: string
}
// 标签内容
const buttonList = ref<buttonListType[]>([
    { title: "我要发贴", icon: "iconfont icon-yifatiezi", url: "" },
    { title: "热门版块", icon: "iconfont icon-huoreremen", url: "" },
    { title: "站点公告", icon: "iconfont icon-gonggao", url: "" },
    { title: "充值入口", icon: "iconfont icon-chongzhi", url: "" },
    { title: "开通vip", icon: "iconfont icon-VIP", url: "" }
])

// 点击跳转函数
function goUrl(url: string) {
    if (url === "") {
        router.push({ name: "web" })
    }
    router.push({ name: url })
}

</script>

<template>
    <div class="btn_list">
        <!-- 目标块 -->
        <div class="btn" v-for="btn in buttonList" @click="goUrl(btn.url)">
            <div class="btn_left">
                <!-- 左图标 -->
                <div class="icon">
                    <icon :is="btn.icon"></icon>
                </div>
                <!-- 功能名 -->
                <div class="title">{{ btn.title }}</div>
            </div>
            <div class="btn_right">
                <!-- 右图标 -->
                <div class="icon"><icon-right /></div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
.btn_list {
    width: 20%;
    // background-color: var(--color-bg-1);
    // display: flex;
    flex-direction: column;
    // justify-content: center;
    height: 21.88rem;
    position: fixed;

    .btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color-bg-1);
        padding: 1rem;
        margin-bottom: 0.8rem;
        border-radius: 5px;
        cursor: pointer;

        .btn_left {
            width: 80%;
            display: flex;
            align-items: center;
            font-size: 1rem;

            .iconfont {
                font-size: 16px;
                margin-right: 1rem;
                background-color: var(--color-neutral-2);
                padding: 5px;
                border-radius: 5px;
            }

            .title:hover {
                color: @primary-5;
            }
        }

        .target_right {
            width: 20%;
            display: flex;
            align-items: center;
            justify-content: end;
            font-size: 1.5rem;
        }
    }
}
</style>
