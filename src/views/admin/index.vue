<template>
  <!-- 整个管理界面区域 -->
  <div class="w_admin">
      <!-- 左侧边栏区域 -->
      <div class="w_aside" :class="{ collapsed: collapsed }">
          <!-- 上logo区域 -->
          <w_logo></w_logo>
          <!-- 下菜单区域 -->
          <w_menu></w_menu>
      </div>
      <!-- 右侧主内容区域 -->
      <div class="w_main">
          <!-- 上部信息栏区域 -->
          <div class="w_head">
              <!-- 面包屑 -->
              <w_breadcrumb></w_breadcrumb>
              <!-- 功能区 -->
              <div class="w_action">
                  <!-- 首页图标 -->
                  <span title="去首页" @click="goHome()"><icon-home /></span>
                  <!-- 主题图标 -->
                  <!-- <w_theme></w_theme> -->
                  <!-- 全屏图标 -->
                  <!-- <w_screen></w_screen> -->
                  <!-- 用户头像区 -->
                  <w_user_dropdown></w_user_dropdown>
              </div>
          </div>
          <!-- 导航区 -->
          <w_tabs></w_tabs>
          <!-- 子页面内容切换区 -->
          <div class="w_container scrollbar">
              <!-- 要切换内容的路由视图 -->
              <router-view class="w_base_view" v-slot="{ Component }">
                  <transition name="fade" mode="out-in">
                      <component :is="Component" />
                  </transition>
              </router-view>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import w_theme from '@/components/common/w_theme.vue'
import w_screen from '@/components/common/w_screen.vue';
import w_menu from '@/components/admin/w_menu.vue';
import { collapsed } from '@/components/admin/w_menu'
import w_breadcrumb from '@/components/admin/w_breadcrumb.vue';
import w_user_dropdown from '@/components/common/w_user_dropdown.vue'
import router from '@/router';
import w_tabs from '@/components/admin/w_tabs.vue'
import w_logo from '@/components/admin/w_logo.vue'

// 返回首页
function goHome() {
  router.push({ name: "home" })
}
</script>

<style lang="less">
// 或者封装一个常用的

.w_admin {
  // 启用左右结构
  display: flex;
  // 背景颜色
  background-color: var(--color-bg-1);
  // 字体颜色包括图标
  color: @color-text-1;

  .w_aside {
      // 侧边栏宽度占240px
      width: 240px;
      // 高度必须为100%
      height: 100vh;
      // 菜单过多会出现滚动条
      // overflow: hidden;
      // 设置侧边栏线条颜色
      border-right: @w_border;
      transition: width .3s;

      .w_logo {
          // logo区域
          width: 100%;
          height: 90px;
          // 下边框
          border-bottom: @w_border;
      }

      /* 定义 .w_aside 元素在折叠状态下的样式 */
      &.collapsed {
          /* 将折叠状态下的宽度设置为 48px */
          width: 48px;

          /* 选择相邻的 .w_main 元素并调整其宽度 */
          &~.w_main {
              /* 将 .w_main 元素的宽度设置为总宽度减去折叠状态下的 .w_aside 宽度 */
              width: calc(100% - 48px);
          }
      }

  }

  .w_main {
      // 相应的主区域宽度就是100%-240px
      width: calc(100% - 240px);
      transition: width .3s;

      .w_head {
          width: 100%;
          // 头部区域
          height: 60px;
          // 下边框
          border-bottom: @w_border;
          // 左右结构
          display: flex;
          justify-content: space-between;
          // 上下居中
          align-items: center;
          // 垂直方向为0左右方向为20px
          padding: 0 20px;

          .w_action {
              display: flex;
              align-items: center;

              svg {
                  font-size: 18px;
                  cursor: pointer; // 移入变点击小手
                  margin-right: 10px;

              }

          }
      }

      .w_tabs {
          width: 100%;
          // 导航区
          height: 30px;
          border-bottom: @w_border;
      }

      .w_container {
          width: 100%;
          // 内容展示区
          // 高度等于100%-头部与导航区高度
          height: calc(100vh - 90px);
          overflow-y: auto;
          overflow-x: hidden;
          background-color: @color-fill-2;
          padding: 20px;

          .w_base_view{
            //   background-color: var(--color-bg-1);
              border-radius: 5px;
            //   height: 1000px;
              
          }
      }
  }
}

//组件刚开始离开
// .fade-leave-active {}

//组件离开结束
.fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

//组件刚开始进入
.fade-enter-active {
  transform: translateX(-30px);
  opacity: 0;
}

//组件进入完成
.fade-enter-to {
  transform: translateX(30px);
  opacity: 1;
}

//正在进入和离开
.fade-leave-active,
.fade-enter-active {
  transition: all .3s ease-out;
}
</style>