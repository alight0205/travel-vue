/**
 * 登录请求参数类型
 * 用于定义用户登录时提交的数据结构
 */
export interface loginReq {
    username: string;  // 用户名或账号
    password: string;  // 用户密码
}

/**
 * 登录响应参数类型
 * 用于定义用户登录时返回的数据结构
 */
export interface loginRes {
    token:string
}
