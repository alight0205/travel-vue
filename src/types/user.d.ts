// src/types/user.d.ts

import { paramsType } from '@/types/index';  // 导入通用的分页参数类型

/**
 * 用户创建请求参数
 * 用于用户注册或管理员添加新用户
 */
export interface userCreateReq {
  username: string;  // 用户名（必填）
  password: string;  // 密码（必填）
}

/**
 * 用户更新请求参数
 * 继承 `userCreateReq`，并额外包含可选更新字段
 */
export interface userUpdateReq {
  id: number;        // 用户 ID（必填）
  username?: string;  // 用户名（可选）
  password?: string;  // 密码（可选）
  nickname?: string; // 昵称（可选）
  avatar?: string;   // 头像 URL（可选）
  desc?: string;     // 个人描述（可选）
  email?: string;    // 邮箱地址（可选）
  role: number; // 用户角色（1: 管理员, 2: 普通用户）默认为2
  // created_at?: string; // 账号创建时间（可选）
  // updated_at?: string; // 更新时间（可选）
}

export interface adminUpdateUserReq {
  id:number;
  status?:number;
  role?:number;
}

/**
 * 获取用户列表请求参数
 * 继承 `paramsType`，用于分页查询
 */
export interface userQueryListReq extends paramsType {
  username?: string; // 按用户名筛选（可选）
  examine?: int;// 审核状态（0-未通过，1-已通过，默认为1）
}

/**
 * 用户基础信息响应类型
 */
export interface userRes {
  id: number;        // 用户 ID（必填）
  username?: string;  // 用户名（可选）
  password?: string;  // 密码（可选）
  nickname?: string; // 昵称（可选）
  avatar?: string;   // 头像 URL（可选）
  desc?: string;     // 个人描述（可选）
  email?: string;    // 邮箱地址（可选）
  role: number; // 用户角色（1: 管理员, 2: 普通用户）默认为2
  status?: number; // 审核状态（1-已通过，2-未通过，默认为1）
  created_at: string; // 账号创建时间（可选）
  updated_at?: string; // 更新时间（可选）
}

/**
 * 用户基础信息响应类型
 */
export interface whoamiResponse {
  user: userRes;
}

