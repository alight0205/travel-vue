import { paramsType } from '@/types/index'

// 请求创建景点接口类型
export interface siteCreateReq {
  // 分类名称
  name?: string;
  // 省份代码
  province_code?: number;
  // 城市代码
  city_code?: number;
  // 地址详情
  address_detail?: string;
  // 景点图片
  images?: string;
  // 景点描述
  desc?: string;
  // 创建者
  creator?:number
  // 创建时间
  // created_at?:string;
  // 更新时间
  // updated_at?:string;
}

// 请求删除景点接口类型
export interface siteDeleteReq {
  // 景点ID
  id: number;
}

// 请求更新景点接口类型
export interface siteUpdateReq extends siteCreateReq {
  // 景点ID
  id: number;
}

// 请求查询景点接口类型，可根据不同条件查询
export interface siteListReq extends paramsType {
  // 景点ID，选填，用于精确查询某一景点
  id?: number;
  // 景点名称，选填，用于模糊查询景点名称
  name?: string;
}

// 景点响应结果接口类型
export interface siteRes extends siteCreateReq {
  // 景点ID
  id: number;
  // 创建时间
  created_at?:string;
  // 更新时间
  updated_at?:string;
}