import { useAxios } from '@/api/index';  // 导入封装的 Axios 请求实例
import type { baseResponse, listResponse } from '@/types/index';  // 导入通用的响应数据类型

// 导入分类管理相关的请求和响应类型
import type {
  siteCreateReq,  // 创建分类请求类型
  siteDeleteReq,  // 删除分类请求类型
  siteUpdateReq,  // 更新分类请求类型
  siteListReq,    // 获取分类列表请求类型
  siteRes,        // 分类返回数据类型
} from '@/types/site';

/**
 * 创建景点 API
 * @param data 包含分类名称等信息的请求数据
 * @returns 包含操作结果的 Promise
 */
export const adminCreateSiteApi = (data: siteCreateReq): Promise<baseResponse<string>> => {
  return useAxios.post('/api/admin/site/create', data);
};

/**
 * 删除景点 API
 * @param data 包含分类 ID 的请求数据
 * @returns 包含操作结果的 Promise
 */
export const adminDeleteSiteApi = (id: number): Promise<baseResponse<string>> => {
  return useAxios.post('/api/admin/site/remove', { id });
};

/**
 * 获取景点详情 API
 * @param id 需要查询的分类 ID
 * @returns 包含分类详情数据的 Promise
 */
export const getSiteDetailApi = (id: number): Promise<baseResponse<siteRes>> => {
  return useAxios.get('/api/category/query_detail', { params: { id } });
};

/**
 * 获取景点列表 API
 * @param params 包含分页信息和查询条件的请求参数
 * @returns 分类列表数据的 Promise
 */
export const adminGetSiteListApi = (params?: siteListReq): Promise<baseResponse<listResponse<siteRes>>> => {
  return useAxios.get('/api/admin/site/query_list', { params });
};

/**
 * 更新景点 API
 * @param params 包含分类 ID 和更新内容的请求数据
 * @returns 包含操作结果的 Promise
 */
export const adminUpdateSiteApi = (params: siteUpdateReq): Promise<baseResponse<string>> => {
  return useAxios.post('/api/admin/site/update', params);
};
