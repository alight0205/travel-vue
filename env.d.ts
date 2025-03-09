/// <reference types="vite/client" />
// 引入 Vite 的类型支持，确保环境变量可以正确识别

import "vue-router";

// 扩展 Vue Router 的 `RouteMeta` 类型
declare module "vue-router" {
    interface RouteMeta {
        title: string;  // 路由标题
        role?: number[]; // 可选字段，存储用户角色权限（例如 1: 管理员, 2: 普通用户）
    }
}

// 定义环境变量接口，约束 `import.meta.env`
export interface EnvMeta extends Record<string, string> {
    VITE_SERVER_URL: string; // 后端 API 地址（从 `.env` 文件读取）
}
