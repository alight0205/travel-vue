// src/types/comment.ts

import { paramsType } from '@/types/index';  // 导入通用的分页参数类型
import type {userRes} from '@/types/user'
/**
 * 创建评论请求参数
 */
export interface commentsCreateReq {
    content: string;      // 评论内容（必填）
    province_code?: int;  // 省份代码（可选）
    city_code?: int; // 城市代码（可选）
    article_id: number;  // 关联的文章 ID（可选）
    comment_id: number;  // 关联的父级评论 ID（可选，用于回复）
    user_id: number; // 用户ID
}

/**
 * 更新评论请求参数
 * 继承 `commentsCreateReq`，并扩展了一些管理相关的字段
 */
export interface commentsUpdateReq extends commentsCreateReq {
    id: number;         // 评论 ID（必填）
}

/**
 * 获取评论列表请求参数
 * 继承 `paramsType` 以支持分页查询
 */
export interface commentsListReq extends paramsType {
    id?: number;        // 评论 ID（可选）
    creator?: string;   // 账号（可选）
    province_code?: int;  // 省份代码（可选）
    city_code?: int; // 城市代码（可选）
    examine?: int; // 审核状态（0-未通过，1-已通过，默认为1）
    article_id?: number;  // 关联的文章 ID（可选）
}
// 审核评论请求参数
export interface commentsExamineReq {
    id: number;
    examine_status: number;
}

/**
 * 评论响应数据
 */
export interface commentsRes {
    id: number;          // 评论 ID
    ip:string;           // 评论 IP
    content:string; // 评论内容
    article_id: number; // 关联的文章 ID
    comment_id: number; // 关联的父级评论 ID
    creator: number; // 用户ID
    province: string; // 省份代码
    city:string; // 城市代码
    examine_status:number; // 审核状态（0-未通过，1-已通过，默认为1）
    created_at: string; // 创建时间（可选）
    updated_at: string; // 更新时间（可选）
    nickname:string;
    avatar:string;
    title:string;
}


// 评论树格式
// 类型定义
export interface CommentTreeType {
    id: number;          // 评论 ID
    ip:string;           // 评论 IP
    content:string; // 评论内容
    article_id: number; // 关联的文章 ID
    comment_id: number; // 关联的父级评论 ID
    creator: number; // 用户ID
    province: string; // 省份代码
    city:string; // 城市代码
    examine_status:number; // 审核状态（0-未通过，1-已通过，默认为1）
    created_at: string; // 创建时间（可选）
    updated_at: string; // 更新时间（可选）
    nickname:string;
    avatar:string;
    title:string;
    isApply?: boolean
    applyContent?: string
    subComments?: CommentTree[]
  }
  