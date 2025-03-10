// src/api/tag.ts

import { useAxios } from '@/api/index';  // 导入封装的 Axios 请求实例
import type { baseResponse, listResponse } from '@/types/index';  // 导入通用的 API 响应数据类型
import type {
  tagCreateReq,      // 创建标签请求参数类型
  tagUpdateReq,      // 更新标签请求参数类型
  tagQueryListReq,   // 获取标签列表请求参数类型
  tagRes             // 标签数据响应类型
} from '@/types/tag';

/**
 * 创建标签 API
 * @param data 包含标签名称等信息的请求数据
 * @returns 包含操作结果的 Promise
 */
export const createTagApi = (data: tagCreateReq): Promise<baseResponse<string>> =>
  useAxios.post('/api/tag/create', data);

/**
 * 删除标签 API
 * @param id 需要删除的标签 ID
 * @returns 包含操作结果的 Promise
 */
export const deleteTagApi = (id: number): Promise<baseResponse<string>> =>
  useAxios.post('/api/tag/delete', { id });

/**
 * 获取标签详情 API
 * @param id 需要查询的标签 ID
 * @returns 该标签的详细信息
 */
export const getTagDetailApi = (id: number): Promise<baseResponse<tagRes>> =>
  useAxios.get('/api/tag/query_detail', { params: { id } });

/**
 * 获取标签列表 API（支持分页、筛选）
 * @param params 请求参数（包含分页、筛选条件）
 * @returns 标签列表数据的 Promise
 */
export const getTagListApi = (params: tagQueryListReq): Promise<baseResponse<listResponse<tagRes[]>>> =>
  useAxios.get('/api/tag/query_list', { params });
// 普通热呢获取标签列表API
export const userGetTagListApi = (params: tagQueryListReq): Promise<baseResponse<listResponse<tagRes>>> =>
  useAxios.get('/api/user/tag/query_list', { params });
/**
 * 更新标签 API
 * @param data 需要更新的标签数据（包含标签 ID 和更新内容）
 * @returns 包含操作结果的 Promise
 */
export const updateTagApi = (data: tagUpdateReq): Promise<baseResponse<string>> =>
  useAxios.post('/api/tag/update', data);
