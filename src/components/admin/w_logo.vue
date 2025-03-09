<template>
    <div class="w_log" :class="{ collapsed: collapsed }">
        <!-- 右侧图片 -->
        <img src="@/assets/logo.png"
            alt="logo" class="logo">
        <!-- 左侧文字 -->
        <div class="slogan">
            <div>旅游论坛</div>
            <div>后台管理</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { collapsed } from '@/components/admin/w_menu';


</script>

<style lang="less">
.w_log {
    display: flex;
    justify-content: center;
    align-items: center;
    // overflow: hidden;

    &.collapsed{
        .slogan{
            transform: scale(0);
            transform-origin: left;
            opacity: 0;
        }
        .logo{
            transform: translateX(15px);
            width: 40px;
            height: 40px;
        }
    }

    .logo {
        width: 50px;
        height: 50px;
    }

    .slogan {
        margin-left: 10px;
        transition: all .3s;

        div:nth-child(1) {
            font-size: 20px;
            font-weight: 600;
        }

        div:nth-child(2) {
            font-size: 14px;
            margin-top: 1px;
        }
    }
}
</style>