// src/types/common.ts

/**
 * OSS 配置类型定义
 * 用于存储 OSS（对象存储服务）的配置信息
 */
export interface OssConfig {
  accessKeyId: string;      // OSS 访问密钥 ID
  accessKeySecret: string;  // OSS 访问密钥 Secret
  bucketName: string;       // OSS 存储桶名称
  region: string;           // OSS 所在区域
  expiration: number;       // 配置过期时间（时间戳）
  // 其他可能的字段（根据实际接口补充）
}

/**
 * 文件上传响应类型
 * 用于存储文件上传后的信息
 */
export interface UploadResponse {
  url: string;      // 文件的访问 URL
  fileName: string; // 文件名称
  size: number;     // 文件大小（单位：字节）
  // 其他可能的字段（根据实际接口补充）
}

