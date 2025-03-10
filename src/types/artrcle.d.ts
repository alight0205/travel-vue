// src/types/article.d.ts
import { paramsType } from '@/types/index'
import type { userRes } from '@/types/user'
import type { commentsCommentRes } from '@/types/comments'
import type { siteRes } from '@/types/site'
import type { tagRes } from '@/types/tag'

// 创建文章请求参数接口
export interface articleCreateReq {
  // 文章标题，必填
  title: string;
  // 文章描述，选填，文章的简短描述
  desc?: string;
  // 封面图片，选填，文章的封面图URL
  cover?: string;
  // 文章内容，必填
  content: string;
  // 相关联用户id
  user_id?: number;
  // 省份代码
  province_code?: int;
  // 城市代码
  city_code?: int;
  tags?: []
  // 创建时间，必填，文章的创建时间（ISO 8601格式）
  // created_at: string;
  // 更新时间，必填，文章的更新时间（ISO 8601格式）
  // updated_at:string;
}


// 更新文章请求参数接口，继承自 articleCreateReq，额外添加文章ID和发布时间
export interface articleUpdateReq extends articleCreateReq {
  // 文章ID，必填，指定要更新的文章
  id: number;
}

// 查询文章列表请求参数接口
export interface articleQueryListReq extends paramsType {
  // 分类ID，选填，用于查询某一分类下的文章
  category?: number;
  // 文章ID，选填，用于查询特定文章
  id?: number;
  // 是否为首页横幅，选填，true表示是首页横幅，false表示不是
  is_banner?: boolean;
  // 审核状态（0-未通过，1-已通过，默认为1）
  examine?: int;
  // 标签ID，选填，用于按标签查询文章
  tag?: number;
  // 文章标题，选填，用于按标题查询文章
  title?: string;
}

// 文章响应数据接口
export interface articleRes {
  // 文章id
  id: number;
  // 文章标题，必填
  title: string;
  // 文章描述，选填，文章的简短描述
  desc?: string;
  // 封面图片，选填，文章的封面图URL
  cover?: string;
  // 文章内容，必填
  content: string;
  // 阅读数，必填，文章的初始阅读数
  read_num: number;
  // 是否为首页横幅，选填，1表示是首页横幅，0表示不是
  is_banner: number;
  // 相关联用户id
  creator: number;
  // 省份代码
  province_code?: number;
  // 城市代码
  city_code?: number;
  // 创建时间，必填，文章的创建时间（ISO 8601格式）
  created_at: string;
  // 更新时间，必填，文章的更新时间（ISO 8601格式）
  updated_at?: string;
  // 审核状态（0-未通过，1-已通过，默认为1）
  examine_status?: number;
  userRes?: userRes;
  // 标签信息
  tags: tagRes[]

}

// 审核文章请求参数接口
export interface articleExamineParams {
  id: number;
  examine_status: number;
}
// 精选文章请求参数接口
export interface articleIsBannerParams {
  id: number;
  is_banner: number;
}

// 文章标签响应数据接口
export interface articleTagCreateReq {
  article_id: number; // 文章ID
  tag_id: number; // 标签ID

}

// 普通用户文章响应接口
export interface userArticleRes {
  // 文章id
  id: number;
  // 文章标题，必填
  title: string;
  // 文章描述，选填，文章的简短描述
  desc?: string;
  // 封面图片，选填，文章的封面图URL
  cover?: string;
  // 文章内容，必填
  content: string;
  // 阅读数，必填，文章的初始阅读数
  read_num: number;
  // 是否为首页横幅，选填，1表示是首页横幅，0表示不是
  is_banner: number;
  // 相关联用户id
  creator: number;
  // 省份代码
  province_code?: number;
  // 城市代码
  city_code?: number;
  // 创建时间，必填，文章的创建时间（ISO 8601格式）
  created_at?: string;
  // 更新时间，必填，文章的更新时间（ISO 8601格式）
  updated_at?: string;
  // 审核状态（0-未通过，1-已通过，默认为1）
  examine_status?: number;
  userRes: userRes;
  // 标签信息
  tags?: tagRes[]

}