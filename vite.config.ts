// vite.config.ts - Vite 配置文件

import { fileURLToPath, URL } from 'node:url';  // 用于处理文件路径
import { defineConfig, loadEnv } from 'vite';  // 导入 Vite 相关方法
import vue from '@vitejs/plugin-vue';          // Vue 3 插件支持
import vueDevTools from 'vite-plugin-vue-devtools'; // Vue DevTools 插件（开发时使用）
import type { EnvMeta } from './env';          // 引入环境变量类型定义

// ENV 文件所在的目录
const envDir = "./";

// https://vitejs.dev/config/
export default defineConfig((config) => {
  // 读取环境变量，根据当前模式（开发/生产）加载 `.env` 配置
  const env = loadEnv(config.mode, envDir) as EnvMeta;
  console.log(env.VITE_SERVER_URL);  // 打印服务器 URL 以便调试

  return {
    // 插件配置
    plugins: [vue()],  // 使用 Vue 插件和 Vue DevTools（仅开发模式生效）

    // CSS 预处理器配置
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // 'primary-6': 'red', // 可以自定义 Arco Design 主题色
          },
          additionalData: '@import "@/assets/var.less";',  // 自动引入全局 LESS 变量
          javascriptEnabled: true,  // 允许在 LESS 中使用 JavaScript 表达式
        },
      },
    },

    // 解析路径别名
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)), // `@` 代表 `src` 目录
      },
    },

    // 开发服务器配置
    server: {
      host: "0.0.0.0", // 允许通过 IP 访问
      port: 80,        // 本地开发服务器端口号

      // 代理配置（用于解决跨域问题）
      proxy: {
        "/api": {
          target: env.VITE_SERVER_URL, // 代理后端地址
          changeOrigin: true,          // 允许跨域
          // rewrite: (path) => path.replace("/api", ""), // 可选：去掉 `/api` 前缀
        },
      },
    },

    // 指定环境变量文件目录
    envDir: envDir,
  };
});
