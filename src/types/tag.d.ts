// src/types/tag.d.ts

import { paramsType } from '@/types/index';  // 导入通用的分页参数类型

/**
 * 创建标签请求参数
 */
export interface tagCreateReq {
  name: string;  // 标签名称（必填）
  //created_at?: string; // 创建时间（可选）
  //updated_at?: string; // 更新时间（可选）
}

/**
 * 更新标签请求参数
 * 继承 `tagCreateReq`，并额外包含标签 ID
 */
export interface tagUpdateReq extends tagCreateReq {
  id: number;  // 需要更新的标签 ID（必填）
  name?: string // 标签名称（可选）
}

/**
 * 获取标签列表请求参数
 * 继承 `paramsType` 以支持分页查询
 */
export interface tagQueryListReq extends paramsType {
  id?: number;   // 标签 ID（可选，支持精准查询）
  name?: string; // 标签名称（可选，支持模糊查询）
}

/**
 * 标签数据响应类型
 */
export interface tagRes {
  id: number;           // 标签 ID
  name: string;         // 标签名称
  created_at?: string; // 创建时间（可选）
  updated_at?: string; // 更新时间（可选）
}
