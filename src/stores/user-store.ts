import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getUserApiDetail, logoutUserApi } from '@/api/user'
import type { userRes } from '@/types/user'
import { Message } from '@arco-design/web-vue'
import { parseToken } from '@/utils/parse-token'
import router from '@/router'

// 定义用户基本信息接口，继承 userRes，并额外添加 token 字段
interface userInfoType extends userRes {
  token: string
}

// 定义用户存储的数据结构
interface userStoreType {
  userInfo: userInfoType
}

// 定义 Pinia 用户存储
export const userStore = defineStore('userStore', {
  // 定义 state 存储用户信息
  state: (): userStoreType => {
    return {
      userInfo: {
        id: 0, // 用户 ID
        username: "", // 用户名
        password: "",
        nickname: "", // 昵称
        avatar: "", // 头像 URL
        desc: "", // 个人简介
        email: "", // 邮箱
        role: 0, // 用户角色（1: 管理员, 2: 普通用户）
        token: "", // 用户 token
        created_at: "", // 账号创建时间（可选）
        updated_at: "", // 更新时间（可选）

      }
    }
  },
  actions: {
    /**
     * 保存用户信息到状态管理
     * @param token 用户登录时返回的 JWT 令牌
     */
    saveUserInfo(token: string) {
      // 1. 存储 token
      this.userInfo.token = token

      // 2. 解析 token 获取用户 ID 和角色信息
      const tokenParse = parseToken(token)
      this.userInfo.id = tokenParse.UserId
      this.userInfo.role = tokenParse.role

      // 3. 通过 whoamiApi 获取用户详细信息
      getUserApiDetail(this.userInfo.id).then(res => {
        if (res.code) {
          Message.error(res.msg) // 请求失败提示错误信息
          return
        }

        // 4. 解析返回的用户数据
        const userData = res.data.user
        this.userInfo = {
          id: userData.id,
          username: userData.username,
          password: userData.password,
          nickname: userData.nickname,
          avatar: userData.avatar,
          desc: userData.desc,
          email: userData.email,
          role: userData.role,
          token: token, // 重新存储 token
          created_at: userData.created_at,
          updated_at: userData.updated_at
        }

        // 5. 持久化存储到 localStorage，防止页面刷新后丢失用户数据
        localStorage.setItem("userInfo", JSON.stringify(this.userInfo))
      })
    },

    /**
     * 加载本地存储的用户信息
     * 用于页面刷新时自动恢复登录状态
     */
    loadUserInfo() {
      const val = localStorage.getItem("userInfo")
      if (!val) {
        return
      }

      try {
        // 1. 解析 localStorage 里的用户数据
        this.userInfo = JSON.parse(val)
      } catch (e) {
        console.log("用户信息解析失败:", e)
        return
      }

      // 2. 检查 token 是否过期
      const tokenParse = parseToken(this.userInfo.token)
      const nowTime = new Date().getTime() // 获取当前时间（毫秒）

      // token 过期处理，exp 是秒级时间戳，需要转换为毫秒
      if (tokenParse.exp * 1000 - nowTime <= 0) {
        Message.warning("token已过期，请重新登录")
        localStorage.removeItem("userInfo") // 清除本地存储
        router.push({ name: "account" }) // 跳转到登录页
        return
      }
    },

    /**
     * 用户注销
     * 清除本地存储的用户数据，并通知服务器注销
     */
    async userLogout() {
      // 1. 请求后端注销接口
      const res = await logoutUserApi()

      // 2. 清除本地存储的用户数据
      localStorage.removeItem("userInfo")

      // 3. 还原默认用户信息
      this.userInfo = {
        id: 0, // 用户 ID
        username: "", // 用户名
        password: "",
        nickname: "", // 昵称
        avatar: "", // 头像 URL
        desc: "", // 个人简介
        email: "", // 邮箱
        role: 0, // 用户角色（1: 管理员, 2: 普通用户）
        token: "", // 用户 token
        created_at: "", // 账号创建时间（可选）
        updated_at: "", // 更新时间（可选）

      }
      // 4. 提示用户退出成功
      Message.success("用户已退出登录")

      // 5. 退出后跳转到首页
      router.push({ name: "home" })
    }
  },
  getters: {
    /**
     * 判断用户是否已登录
     * @returns {boolean} true 表示已登录
     */
    isLogin(): boolean {
      return this.userInfo.id !== 0
    },

    /**
     * 判断用户是否是管理员
     * @returns {boolean} true 表示用户是管理员
     */
    isAdmin(): boolean {
      return this.userInfo.role === 1
    }
  }
})
