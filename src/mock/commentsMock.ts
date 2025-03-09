import { userListMock } from '@/mock/userMock'

export const commentsListMock = [
    {
        id: 1,         // 评论 ID
        content: "评论1",      // 评论内容（必填）
        province_code: 370000,  // 省份代码（可选）
        city_code: 370001, // 城市代码（可选）
        examine: 1, // 审核状态（0-未通过，1-已通过，默认为1）
        article_id: 0,  // 关联的文章 ID（可选）
        comment_id: 0,  // 关联的父级评论 ID（可选，用于回复）
        user: userListMock[0],
        created_at: "1546926630", // 创建时间（可选）
        updated_at: "1546926630", // 更新时间（可选）
    },
    {
        id: 2,         // 评论 ID
        content: "评论2",      // 评论内容（必填）
        province_code: 370000,  // 省份代码（可选）
        city_code: 370001, // 城市代码（可选）
        examine: 1, // 审核状态（0-未通过，1-已通过，默认为1）
        article_id: 0,  // 关联的文章 ID（可选）
        comment_id: 0,  // 关联的父级评论 ID（可选，用于回复）
        user: userListMock[2],
        created_at: "1546926630", // 创建时间（可选）
        updated_at: "1546926630", // 更新时间（可选）
    },
    {
        id: 3,         // 评论 ID
        content: "评论3",      // 评论内容（必填）
        province_code: 370000,  // 省份代码（可选）
        city_code: 370001, // 城市代码（可选）
        examine: 1, // 审核状态（0-未通过，1-已通过，默认为1）
        article_id: 0,  // 关联的文章 ID（可选）
        comment_id: 0,  // 关联的父级评论 ID（可选，用于回复）
        user: userListMock[3],
        created_at: "1546926630", // 创建时间（可选）
        updated_at: "1546926630", // 更新时间（可选）
    },
    {
        id: 4,         // 评论 ID
        content: "评论4",      // 评论内容（必填）
        province_code: 370000,  // 省份代码（可选）
        city_code: 370001, // 城市代码（可选）
        examine: 0, // 审核状态（0-未通过，1-已通过，默认为1）
        article_id: 0,  // 关联的文章 ID（可选）
        comment_id: 0,  // 关联的父级评论 ID（可选，用于回复）
        user: userListMock[3],
        created_at: "1546926630", // 创建时间（可选）
        updated_at: "1546926630", // 更新时间（可选）
    },
    {
        id: 5,         // 评论 ID
        content: "评论5",      // 评论内容（必填）
        province_code: 370000,  // 省份代码（可选）
        city_code: 370001, // 城市代码（可选）
        examine: 0, // 审核状态（0-未通过，1-已通过，默认为1）
        article_id: 0,  // 关联的文章 ID（可选）
        comment_id: 0,  // 关联的父级评论 ID（可选，用于回复）
        user: userListMock[3],
        created_at: "1546926630", // 创建时间（可选）
        updated_at: "1546926630", // 更新时间（可选）
    },
    {
        id: 6,         // 评论 ID
        content: "评论6",      // 评论内容（必填）
        province_code: 370000,  // 省份代码（可选）
        city_code: 370001, // 城市代码（可选）
        examine: 0, // 审核状态（0-未通过，1-已通过，默认为1）
        article_id: 0,  // 关联的文章 ID（可选）
        comment_id: 0,  // 关联的父级评论 ID（可选，用于回复）
        user: userListMock[3],
        created_at: "1546926630", // 创建时间（可选）
        updated_at: "1546926630", // 更新时间（可选）
    },    {
        id: 7,         // 评论 ID
        content: "评论7",      // 评论内容（必填）
        province_code: 370000,  // 省份代码（可选）
        city_code: 370001, // 城市代码（可选）
        examine: 0, // 审核状态（0-未通过，1-已通过，默认为1）
        article_id: 0,  // 关联的文章 ID（可选）
        comment_id: 0,  // 关联的父级评论 ID（可选，用于回复）
        user: userListMock[3],
        created_at: "1546926630", // 创建时间（可选）
        updated_at: "1546926630", // 更新时间（可选）
    },    {
        id: 8,         // 评论 ID
        content: "评论8",      // 评论内容（必填）
        province_code: 370000,  // 省份代码（可选）
        city_code: 370001, // 城市代码（可选）
        examine: 0, // 审核状态（0-未通过，1-已通过，默认为1）
        article_id: 0,  // 关联的文章 ID（可选）
        comment_id: 0,  // 关联的父级评论 ID（可选，用于回复）
        user: userListMock[3],
        created_at: "1546926630", // 创建时间（可选）
        updated_at: "1546926630", // 更新时间（可选）
    },    {
        id: 9,         // 评论 ID
        content: "评论9",      // 评论内容（必填）
        province_code: 370000,  // 省份代码（可选）
        city_code: 370001, // 城市代码（可选）
        examine: 0, // 审核状态（0-未通过，1-已通过，默认为1）
        article_id: 0,  // 关联的文章 ID（可选）
        comment_id: 0,  // 关联的父级评论 ID（可选，用于回复）
        user: userListMock[3],
        created_at: "1546926630", // 创建时间（可选）
        updated_at: "1546926630", // 更新时间（可选）
    },    {
        id: 10,         // 评论 ID
        content: "评论10",      // 评论内容（必填）
        province_code: 370000,  // 省份代码（可选）
        city_code: 370001, // 城市代码（可选）
        examine: 0, // 审核状态（0-未通过，1-已通过，默认为1）
        article_id: 0,  // 关联的文章 ID（可选）
        comment_id: 0,  // 关联的父级评论 ID（可选，用于回复）
        user: userListMock[3],
        created_at: "1546926630", // 创建时间（可选）
        updated_at: "1546926630", // 更新时间（可选）
    },    {
        id: 11,         // 评论 ID
        content: "评论11",      // 评论内容（必填）
        province_code: 370000,  // 省份代码（可选）
        city_code: 370001, // 城市代码（可选）
        examine: 0, // 审核状态（0-未通过，1-已通过，默认为1）
        article_id: 0,  // 关联的文章 ID（可选）
        comment_id: 0,  // 关联的父级评论 ID（可选，用于回复）
        user: userListMock[3],
        created_at: "1546926630", // 创建时间（可选）
        updated_at: "1546926630", // 更新时间（可选）
    }

]

// 文章中评论假数据
export const articleCommentsMockList = [
    {
        id: 1,         // 评论 ID
        content: "评论1",      // 评论内容（必填）
        province_code: 370000,  // 省份代码（可选）
        city_code: 370001, // 城市代码（可选）
        examine: 1, // 审核状态（0-未通过，1-已通过，默认为1）
        article_id: 0,  // 关联的文章 ID（可选）
        comment_id: 0,  // 关联的父级评论 ID（可选，用于回复）
        user: userListMock[0],
        created_at: "1546926630", // 创建时间（可选）
        updated_at: "1546926630", // 更新时间（可选）
    },
    {
        id: 2,         // 评论 ID
        content: "回复评论1",      // 评论内容（必填）
        province_code: 370000,  // 省份代码（可选）
        city_code: 370001, // 城市代码（可选）
        examine: 1, // 审核状态（0-未通过，1-已通过，默认为1）
        article_id: 1,  // 关联的文章 ID（可选）
        comment_id: 0,  // 关联的父级评论 ID（可选，用于回复）
        user: userListMock[1],
        created_at: "1546926630", // 创建时间（可选）
        updated_at: "1546926630", // 更新时间（可选）
    },
    {
        id: 3,         // 评论 ID
        content: "回复评论1",      // 评论内容（必填）
        province_code: 370000,  // 省份代码（可选）
        city_code: 370001, // 城市代码（可选）
        examine: 1, // 审核状态（0-未通过，1-已通过，默认为1）
        article_id: 1,  // 关联的文章 ID（可选）
        comment_id: 0,  // 关联的父级评论 ID（可选，用于回复）
        user: userListMock[3],
        created_at: "1546926630", // 创建时间（可选）
        updated_at: "1546926630", // 更新时间（可选）
    },
    {
        id: 4,         // 评论 ID
        content: "回复评论1",      // 评论内容（必填）
        province_code: 370000,  // 省份代码（可选）
        city_code: 370001, // 城市代码（可选）
        examine: 1, // 审核状态（0-未通过，1-已通过，默认为1）
        article_id: 1,  // 关联的文章 ID（可选）
        comment_id: 0,  // 关联的父级评论 ID（可选，用于回复）
        user: userListMock[2],
        created_at: "1546926630", // 创建时间（可选）
        updated_at: "1546926630", // 更新时间（可选）
    },
    {
        id: 5,         // 评论 ID
        content: "回复评论1子集评论1",      // 评论内容（必填）
        province_code: 370000,  // 省份代码（可选）
        city_code: 370001, // 城市代码（可选）
        examine: 1, // 审核状态（0-未通过，1-已通过，默认为1）
        article_id: 0,  // 关联的文章 ID（可选）
        comment_id: 2,  // 关联的父级评论 ID（可选，用于回复）
        user: userListMock[3],
        created_at: "1546926630", // 创建时间（可选）
        updated_at: "1546926630", // 更新时间（可选）
    },
    {
        id: 6,         // 评论 ID
        content: "回复评论1子集评论1",      // 评论内容（必填）
        province_code: 370000,  // 省份代码（可选）
        city_code: 370001, // 城市代码（可选）
        examine: 1, // 审核状态（0-未通过，1-已通过，默认为1）
        article_id: 0,  // 关联的文章 ID（可选）
        comment_id: 2,  // 关联的父级评论 ID（可选，用于回复）
        user: userListMock[3],
        created_at: "1546926630", // 创建时间（可选）
        updated_at: "1546926630", // 更新时间（可选）
    },
    {
        id: 7,         // 评论 ID
        content: "回复评论1子集评论1下子集评论1",      // 评论内容（必填）
        province_code: 370000,  // 省份代码（可选）
        city_code: 370001, // 城市代码（可选）
        examine: 1, // 审核状态（0-未通过，1-已通过，默认为1）
        article_id: 0,  // 关联的文章 ID（可选）
        comment_id: 5,  // 关联的父级评论 ID（可选，用于回复）
        user: userListMock[3],
        created_at: "1546926630", // 创建时间（可选）
        updated_at: "1546926630", // 更新时间（可选）
    }
]