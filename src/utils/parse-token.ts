// 定义 JWT 负载（Payload）的接口，确保解析后的数据符合该结构
export interface JwtPayload {
    UserId: number; // 用户 ID
    iss: string;    // 签发者（Issuer）
    exp: number;    // 过期时间（Unix 时间戳）
    role: number;   // 用户角色（如 0-普通用户，1-管理员等）
}

/**
 * 解析 JWT 令牌并返回负载信息
 * @param token - JWT 字符串
 * @returns 解析后的 JWT 负载（Payload）对象
 */
export function parseToken(token: string): JwtPayload {
    // 1. JWT 由三部分构成（Header.Payload.Signature），我们取中间的 Payload 部分
    const base64Url = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');

    // 2. 解析 Base64 编码的数据
    // - window.atob(base64) 用于解码 Base64 编码的字符串
    // - escape() + decodeURIComponent() 用于解决可能存在的中文乱码问题
    return JSON.parse(decodeURIComponent(escape(window.atob(base64Url))));
}