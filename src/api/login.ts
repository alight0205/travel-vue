// src/api/login.ts

import { useAxios } from '@/api/index';  // 导入封装的 Axios 请求实例
import type { baseResponse } from '@/types/index';  // 导入通用的 API 响应数据类型
import type { loginReq,loginRes } from '@/types/login';  // 导入登录请求参数类型

/**
 * 用户登录 API
 * @param data 登录请求参数（包含账号、密码等信息）
 * @returns 登录结果的 Promise，通常返回一个 Token 或提示信息
 */
export const loginApi = (data: loginReq): Promise<baseResponse<loginRes>> =>
  useAxios.post('/api/auth/login_by_account', data);
