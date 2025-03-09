import { useAxios } from '@/api/index';  // 导入封装的 Axios 请求实例
import type { baseResponse } from '@/types/index';  // 导入通用的 API 响应数据类型
import type { OssConfig, UploadResponse } from '@/types/common';  // 导入 OSS 配置和文件上传响应类型

/**
 * 获取 OSS 配置 API
 * @returns 包含 OSS 配置信息的 Promise
 */
export const getOssConfigApi = (): Promise<baseResponse<OssConfig>> => {
  return useAxios.get('/api/common/query_oss_config');
};

/**
 * 上传文件 API
 * @param file 包含上传文件的 FormData 数据
 * @returns 文件上传结果的 Promise
 */
export const uploadFileApi = (file: FormData): Promise<baseResponse<UploadResponse>> => {
  return useAxios.post('/api/common/upload_file', file, {
    headers: { 'Content-Type': 'multipart/form-data' }  // 设置请求头，指定内容类型为 multipart/form-data
  });
};

export function imageUploadApi(file: File): Promise<baseResponse<string>> {

  const form = new FormData()
  form.append("file", file)
  return useAxios.post("/api/common/upload_file", form, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export async function onUploadImg(files: File[], callback: (urls: string[]) => void) {
  const resList = await Promise.all(files.map(file => imageUploadApi(file)))
  const urlList: string[] = resList.map((item) => fixUrlFormat(item.data))
  callback(urlList)
}
// 获取本机当前IP地址
export const getIpLocation = (): Promise<any> => {
  return useAxios.get('https://uapis.cn/api/myip.php');
};
// 获取当天天气情况
export const getWeather = (name: string): Promise<any> => {
  return useAxios.get('https://uapis.cn/api/weather',{params:{name:name}});
};

/**
 * 修复包含错误斜杠和前缀的URL格式
 * @param input 原始错误格式的URL字符串
 * @returns 修正后的标准URL
 */
export function fixUrlFormat(input: string): string {
  return input
    .replace(/^\.\\/g, '')    // 1. 去除开头的 .\ 前缀
    .replace(/\\/g, '/')      // 2. 替换所有反斜杠为正斜杠
    .replace(':/', '://');    // 3. 修正协议部分的斜杠
}