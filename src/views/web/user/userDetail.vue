<script setup lang="ts">
import userCard from '@/components/web/user/userCard.vue'
import userDetail from '@/components/web/user/userArticle.vue'
import { ref, reactive } from 'vue';
import type { listResponse, paramsType, baseResponse, optionsType, optionsFunc } from "@/types/index"
import { getArticleListApi } from '@/api/article'
import type { articleRes } from '@/types/artrcle'
import { userGetUserDetailApi } from '@/api/user'
import { dataTemFormat, type dataTimeType } from "@/utils/date"
import { Message } from '@arco-design/web-vue';
import type { userRes } from '@/types/user'
import router from '@/router'
import { useRoute } from 'vue-router'
const route = useRoute()
// 使用reactive定义响应式数据，存储列表数据和总数
const data = reactive<listResponse<articleRes>>({
    list: [], // 列表数据
    total: 0   // 数据总数
})
const userInfo = ref<userRes>({
    id: 0,        // 用户 ID（必填）
    username: '',  // 用户名（可选）
    password: '',  // 密码（可选）
    nickname: '', // 昵称（可选）
    avatar: '',   // 头像 URL（可选）
    desc: '',     // 个人描述（可选）
    email: '',    // 邮箱地址（可选）
    role: 0, // 用户角色（1: 管理员, 2: 普通用户）默认为2
    status: 0, // 审核状态（1-已通过，2-未通过，默认为1）
    created_at: '', // 账号创建时间（可选）
    updated_at: '', // 更新时间（可选）
})

// 使用reactive定义请求参数
const params = reactive<paramsType>({
    // 请求参数，可以根据实际需求扩展
    page_size: 10,
    page_num: 1
})
const searchValue = ref('')
// 数据加载中状态
const loading = ref(false)
// 获取列表数据的异步函数
async function getList(newParams?: paramsType) {
    // 1. 加强类型校验
    const idParam = route.query.id

    // 处理数组类型参数（如?id=1&id=2）
    const paramValue = Array.isArray(idParam) ? idParam[0] : idParam

    if (!paramValue) {
        Message.error('用户ID不能为空')
        return
    }

    // 2. 更安全的数值转换
    const id = Number(paramValue)
    if (isNaN(id) || !Number.isInteger(id)) {
        Message.error('无效的用户ID格式')
        return
    }
    // 请求前变成加载状态
    loading.value = true
    const paramsId = {
        creator: id
    }
    Object.assign(params, paramsId)
    if (newParams) {
        Object.assign(params, newParams)
    }
    // 调用传入的URL函数获取数据
    const res = await getArticleListApi(params)
    // 请求后取消加载状态
    loading.value = false
    // 如果返回的code不为0，表示请求失败，显示错误信息
    if (res.code) {
        Message.error(res.msg)
        return
    }
    // 请求成功，更新列表数据和总数
    data.list = res.data.list
    data.total = res.data.total
}
const getUserDetail = async () => {
    // 1. 加强类型校验
    const idParam = route.query.id

    // 处理数组类型参数（如?id=1&id=2）
    const paramValue = Array.isArray(idParam) ? idParam[0] : idParam

    if (!paramValue) {
        Message.error('用户ID不能为空')
        return
    }

    // 2. 更安全的数值转换
    const id = Number(paramValue)
    if (isNaN(id) || !Number.isInteger(id)) {
        Message.error('无效的用户ID格式')
        return
    }
    const res = await userGetUserDetailApi(id)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    userInfo.value = res.data
}
// 分页切换函数
function pageChange() {
    getList()
}
const searchArticle = () => {
    getList({ title: searchValue.value })
}

getList()
getUserDetail()

</script>

<template>
    <div class="uContainer">
        <userCard :userInfo="userInfo" :articleCount="data.total"></userCard>
        <div class="userSubView">
            <a-tabs type="line" size="large">
                <template #extra>
                    <a-input-search class="searchInput" v-model="searchValue" placeholder="搜索文章标题"
                        @search="searchArticle()" />
                </template>
                <a-tab-pane key="1" title="他的文章">
                    <div class="info" v-if="true">
                        <userDetail v-for="article in data.list" :articleRes="article"></userDetail>
                        <div class="page">
                            <a-pagination show-total :total="data.total" v-model:current="params.page_num"
                                :page-size="params.page_size" @change="pageChange" />
                        </div>
                    </div>
                    <div class="empty" v-else>
                        <a-empty />
                    </div>
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<style lang="less" scoped>
.userSubView {
    margin-top: 20px;
    border-radius: 5px;
    background: var(--color-bg-1);

    .searchInput {
        margin-right: 10px;
    }

    .info {
        .page {
            margin-top: 20px;
            display: flex;
            justify-content: center;
            background-color: var(--color-bg-1);
            padding: 20px 10px;
            border-radius: 5px;
        }
    }
}
</style>