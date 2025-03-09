// src/api/user.ts

import { useAxios } from '@/api/index';  // 导入封装的 Axios 请求实例
import type { baseResponse, listResponse, paramsType } from '@/types/index';  // 导入通用的 API 响应数据类型
import type {
  userCreateReq,    // 用户创建请求参数类型
  userUpdateReq,    // 用户更新请求参数类型
  userQueryListReq, // 获取用户列表请求参数类型
  adminUpdateUserReq,
  userRes,          // 用户信息响应类型
  whoamiResponse    // 当前登录用户信息响应类型
} from '@/types/user';
import type { loginRes } from '@/types/login';

/**
 * 创建用户 API
 * @param data 用户创建请求数据
 * @returns 操作结果（通常返回成功或失败信息）
 */
export const createUserApi = (data: userCreateReq): Promise<baseResponse<loginRes>> =>
  useAxios.post('/api/user/create', data);

/**
 * 注销用户 API
 * @param id 
 * @returns 操作结果（成功或失败信息）
 */
export const logoutUserApi = (): Promise<baseResponse<string>> =>
  useAxios.post('/api/user/delete');

/**
 * 获取当前用户详情 API
 * @param userId 需要查询的用户 ID
 * @returns 该用户的详细信息
 */
export const getUserApiDetail = (id: number): Promise<baseResponse<whoamiResponse>> =>
  useAxios.get('/api/auth/get_login_info', { params: { userId: id } });

/**
 * 管理员获取用户列表 API（支持分页、筛选）
 * @param params 请求参数（包含分页、筛选条件）
 * @returns 用户列表数据
 */
export const getUserListApi = (params?: paramsType): Promise<baseResponse<listResponse<userRes>>> =>
  useAxios.get('/api/admin/user/query_list', { params });
// 管理员更新用户信息 API
export const adminUpdateUserApi = (params: adminUpdateUserReq,): Promise<baseResponse<string>> =>
  useAxios.post('/api/admin/user/update', params);

/**
 * 普通用户更新用户信息 API
 * @param data 需要更新的用户数据
 * @returns 操作结果（成功或失败信息）
 */
export const userUpdateUserApi = (data: userUpdateReq): Promise<baseResponse<string>> =>
  useAxios.post('/api/user/user/update', data);


// 普通用户获取其他用户详情
export const userGetUserDetailApi = (id: number): Promise<baseResponse<userRes>> =>
  useAxios.post('/api/user/user/detail', { id });