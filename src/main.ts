// main.ts - Vue 3 入口文件

import { createApp } from 'vue';         // 导入 Vue 3 的应用创建方法
import { createPinia } from 'pinia';     // 导入 Pinia（状态管理库）

import App from '@/App.vue';             // 导入根组件
import router from '@/router';           // 导入 Vue Router 路由实例
import '@/assets/base.css';              // 导入全局 CSS 样式

import ArcoVue from '@arco-design/web-vue';          // 导入 Arco Design 组件库
import '@arco-design/web-vue/dist/arco.css';        // 导入 Arco Design 样式
import ArcoVueIcon from '@arco-design/web-vue/es/icon';  // 导入 Arco Design 图标库
import '@/assets/iconfont.css'// 引入iconfont
// 创建 Vue 应用实例
const app = createApp(App);

// 使用 Pinia 进行状态管理
app.use(createPinia());

// 使用 Vue Router 进行页面路由管理
app.use(router);

// 使用 Arco Design 组件库
app.use(ArcoVue);

// 使用 Arco Design 图标库
app.use(ArcoVueIcon);

// 挂载 Vue 应用到 `#app` 容器
app.mount('#app');
