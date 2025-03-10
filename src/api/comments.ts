// src/api/comment.ts

import { useAxios } from '@/api/index';  // 导入封装的 Axios 请求实例
import type { baseResponse, listResponse } from '@/types/index';  // 导入通用的响应数据类型
import type {
  commentsCreateReq,       // 创建评论请求参数类型
  commentsUpdateReq,       // 更新评论请求参数类型
  commentsListReq,      // 获取评论列表请求参数类型
  commentsRes,  // 评论数据响应类型
  commentsExamineReq,   // 审核评论请求参数类型
} from '@/types/comments';

/**
 * 创建评论 API
 * @param data 包含评论内容、用户 ID、文章 ID 等信息的请求数据
 * @returns 包含操作结果的 Promise
 */
export const createCommentApi = (data: commentsCreateReq): Promise<baseResponse<string>> =>
  useAxios.post('/api/user/comment/create', data);

/**
 * 删除评论 API
 * @param id 需要删除的评论 ID
 * @returns 包含操作结果的 Promise
 */
export const adminDeleteCommentApi = (id: number): Promise<baseResponse<string>> =>
  useAxios.post('/api/admin/comment/delete', { id });
// 用户删除评论接口
export const userDeleteCommentApi = (id: number): Promise<baseResponse<string>> =>
  useAxios.post('/api/admin/comment/delete', { id });

/**
 * 根据文章 ID 获取评论列表 API
 * @param articleId 文章 ID
 * @returns 该文章的评论列表数据的 Promise
 */
export const getCommentsByArticleApi = (articleId: number): Promise<baseResponse<listResponse<commentsRes>>> =>
  useAxios.get('/api/comment/query_by_article', {
    params: { article_id: articleId }
  });

/**
 * 获取评论列表 API（可能包含分页、筛选条件）
 * @param params 请求参数（如分页信息、筛选条件）
 * @returns 评论列表数据的 Promise
 */
export const adminGetCommentListApi = (params?: commentsListReq): Promise<baseResponse<listResponse<commentsRes>>> =>
  useAxios.get('/api/admin/comment/query_list', { params });
// 普通用户获取评论列表 API
export const userGetCommentListApi = (params?: commentsListReq): Promise<baseResponse<listResponse<commentsRes>>> =>
  useAxios.get('/api/user/comment/query_list', { params });
/**
 * 更新评论 API
 * @param data 需要更新的评论数据（包含评论 ID 和更新内容）
 * @returns 包含操作结果的 Promise
 */
export const adminUpdateCommentApi = (data: commentsExamineReq): Promise<baseResponse<string>> =>
  useAxios.post('/api/admin/comment/examine', data);
