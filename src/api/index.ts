import axios from 'axios';
import { userStore } from "@/stores/user-store";
import { Message } from '@arco-design/web-vue';

// 创建一个 axios 实例，并配置基础请求信息
export const useAxios = axios.create({
  // 基础URL：在每个请求的URL前会自动添加该值
  baseURL: '',
  // 请求超时时间（单位：毫秒），超过此时间请求将被中断
  timeout: 10000,
});

// 请求拦截器：在请求发送之前执行
useAxios.interceptors.request.use((config) => {
  const puserStore = userStore()

  config.headers.Authorization = puserStore.userInfo.token
  // 返回修改后的请求配置，继续发送请求
  return config
});

// 响应拦截器
useAxios.interceptors.response.use((res) => {
  // 请求成功时的回调函数
  if (res.status === 200) {
      return res.data
  }
  return res
}, (res) => {
  // 请求错误走这里
  Message.error(res.message)
})

