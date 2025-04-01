// src/api/article.ts
import { useAxios } from '@/api/index';  // 导入请求模块
import type { baseResponse, listResponse } from '@/types/index';
import type {
  articleCreateReq,  // 文章创建请求参数类型
  articleUpdateReq,  // 文章更新请求参数类型
  articleQueryListReq,  // 查询文章列表请求参数类型
  articleRes,  // 文章响应数据类型
  articleExamineParams, // 审核文章参数类型
  articleIsBannerParams
} from '@/types/artrcle';

// 创建文章接口，接受文章创建请求数据，发送POST请求
export const createArticleApi = (data: articleCreateReq): Promise<baseResponse<string>> =>
  useAxios.post('/api/user/article/create', data);

// 删除文章接口，接受文章ID，发送POST请求进行删除操作
export const deleteArticleApi = (id: number): Promise<baseResponse<string>> =>
  useAxios.post('/api/admin/article/remove', { id });
// 普通用户删除自己的文章
export const userDeleteArticleApi = (id: number): Promise<baseResponse<string>> =>
  useAxios.post('/api/user/article/remove', { id });

// 管理员获取文章详情接口，接受文章ID，发送GET请求获取文章详细信息
export const adminGetArticleDetailApi = (id: number): Promise<baseResponse<articleRes>> =>
  useAxios.get('/api/admin/article/detail', { params: { id } });
// 普通人获取文章详情接口，接受文章ID，发送GET请求获取文章详细信息
export const userGetArticleDetailApi = (id: number): Promise<baseResponse<articleRes>> =>
  useAxios.get('/api/user/article/detail', { params: { id } });
// 管理员获取文章列表接口，接受文章查询列表请求参数，发送GET请求获取文章列表
export const adminGetArticleListApi = (params?: articleQueryListReq): Promise<baseResponse<listResponse<articleRes>>> =>
  useAxios.get('/api/admin/article/query_list', { params });
// 普通用户获取文章自己文章列表接口
export const userSelfGetArticleListApi = (params?: articleQueryListReq): Promise<baseResponse<listResponse<articleRes>>> =>
  useAxios.get('/api/user/article/query_my_list', { params });

// 审核文章接口，接受文章审核参数，发送POST请求进行审核操作
export const adminChangeExamine = (params:articleExamineParams):Promise<baseResponse<string>> =>
  useAxios.post('/api/admin/article/examine', params);
// 管理员精选文章
export const adminChangeBanner = (params:articleIsBannerParams):Promise<baseResponse<string>> =>
  useAxios.post('/api/admin/article/set_banner', params);

// 普通人获取文章列表接口，接受文章查询列表请求参数，发送GET请求获取文章列表
export const getArticleListApi = (params?: articleQueryListReq): Promise<baseResponse<listResponse<articleRes>>> =>
  useAxios.get('/api/user/article/query_list', { params });

// 更新文章接口，接受文章更新请求数据，发送POST请求更新文章信息
export const updateArticleApi = (params: articleUpdateReq): Promise<baseResponse<string>> =>
  useAxios.post('/api/user/article/update',  params );
