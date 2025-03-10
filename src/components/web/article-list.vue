<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { listResponse, paramsType, baseResponse, optionsType, optionsFunc } from "@/types/index"
import { getArticleListApi } from '@/api/article'
import type { articleRes } from '@/types/artrcle'
import { userGetUserDetailApi } from '@/api/user'
import { dataTemFormat, type dataTimeType } from "@/utils/date"
import { Message } from '@arco-design/web-vue';
import router from '@/router'
// 使用reactive定义响应式数据，存储列表数据和总数
const data = reactive<listResponse<articleRes>>({
    list: [], // 列表数据
    total: 0   // 数据总数
})

// 使用reactive定义请求参数
const params = reactive<paramsType>({
    // 请求参数，可以根据实际需求扩展
    page_size: 10,
    page_num: 1
})
const searhValue = ref('')
// 数据加载中状态
const loading = ref(false)
// 获取列表数据的异步函数
async function getList(newParams?: paramsType) {
    // 请求前变成加载状态
    loading.value = true
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
    data.list = res.data.list || []
    data.total = res.data.total
    for (let i = 0; i < data.list.length; i++) {
        const userRes = await userGetUserDetailApi(data.list[i].creator)
        if (userRes.code) {
            Message.error(userRes.msg)
        }
        data.list[i].userRes = userRes.data
    }
}
// 分页切换函数
function pageChange() {
    getList()
}
const searchArticle = () => {
    getList({ title: searhValue.value })
}
const goDetail = (id:number)=>{
    router.push({name: 'articleDetail',query: { id }})
}
getList()
</script>

<template>
    <div class="articleCard">
        <div class="head">
            <div class="title">文章列表</div>
            <div class="right">
                <a-input-search v-model="searhValue" placeholder="搜索文章标题" @search="searchArticle()" />
            </div>
        </div>
        <a-spin dot v-if="data.total" :loading="loading">
            <div class="body">
                <div class="card" v-for="article in data.list">
                    <div class="articleInfo">
                        <div class="cover">
                            <img :src="article.cover" alt="banner">
                        </div>
                        <div class="info">
                            <div class="recommend" v-if="article.is_banner"><span>推荐</span></div>
                            <div class="title" @click="goDetail(article.id)">{{ article.title }}</div>
                            <div class="desc">
                                <a-tooltip :content="article.desc || '暂无描述'">
                                    <div class="text">
                                        {{ article.desc || '暂无描述' }}
                                    </div>
                                </a-tooltip>
                            </div>
                            <div class="data" v-if="article.tags.length <= 2">
                                <span class="tags" v-if="article.tags.length > 0">
                                    <a-tag color="red" v-for="tag in article.tags">{{ tag.name }}</a-tag>
                                </span>

                                <span class="date">
                                    <icon-clock-circle />
                                    {{ dataTemFormat(article.created_at || '2006-06-06', 'date') }}
                                </span>
                                <span class="userInfo">
                                    <a-avatar :image-url="article.userRes?.avatar" class="avatar" :size="30"></a-avatar>
                                    <span class="username">{{ article.userRes?.nickname }}</span>
                                </span>
                            </div>
                            <div class="data" v-if="article.tags.length  > 2">
                                <span class="tags">
                                    <a-tag color="red">{{ article.tags[0].name }}</a-tag>
                                    <a-tag color="red">{{ article.tags[1].name }}</a-tag>
                                    <a-tag color="red">...</a-tag>
                                </span>
                                <span class="date">
                                    <icon-clock-circle />
                                    {{ dataTemFormat(article.created_at || '2006-06-06', 'date') }}
                                </span>
                                <span class="userInfo">
                                    <a-avatar :image-url="article.userRes?.avatar" class="avatar" :size="30"></a-avatar>
                                    <span class="username">{{ article.userRes?.nickname }}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="page">
                    <a-pagination show-total :total="data.total" v-model:current="params.page_num"
                        :page-size="params.page_size" @change="pageChange" />
                </div>
            </div>
        </a-spin>
        <div class="empty" v-else>
            <a-empty />
        </div>
    </div>

</template>

<style lang="less" scoped>
.arco-spin{
    width: 100%;
}
.articleCard {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    

    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        background-color: var(--color-bg-1);
        border-radius: 5px 5px 0 0;
        border: @w_border;

        .title {
            font-size: 18px;
            font-weight: 600;
        }

        .right {
            width: 30%;
        }
    }

    // 内容区域
    .body {
        .card {
            border-radius: 0 0 5px 5px;
            transform: inherit;
            box-shadow: inherit;
            background-color: var(--color-bg-1);
            margin-top: 20px;
            transition: all .5s;
            border-radius: 5px 5px 0 0;

            &:hover {
                transform: translateY(-5px) scale(1.005);
                box-shadow: 0 5px 5px 5px #0000000d;
                // transition: all .3s;
            }

            .articleInfo {
                width: 100%;
                height: 150px;
                padding: 20px;
                display: flex;
                // background-color: var(--color-fill-2);
                border-radius: 5px;

                .cover {
                    width: 25%;
                    border-radius: 5px;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        transition: transform 1s;
                    }

                    :hover {
                        transform: scale(1.2);
                    }
                }

                .info {
                    width: 75%;
                    padding-left: 20px;
                    color: var(--color-text-2);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    position: relative;

                    .recommend {
                        position: absolute;
                        right: -20px;
                        top: -20px;
                        overflow: hidden;
                        width: 80px;
                        height: 80px;

                        span {
                            position: absolute;
                            width: 200px;
                            right: -71px;
                            top: 11px;
                            height: 30px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: rgb(var(--red-6));
                            background-color: rgb(var(--red-1));
                            transform: rotate(45deg);
                        }
                    }

                    .title {
                        font-size: 20px;
                        font-weight: 600;
                        color: var(--color-text-1);
                        cursor: pointer;
                    }

                    .desc {
                        margin-top: 10px;
                        font-size: 14px;

                        .text {
                            display: -webkit-box;
                            line-height: 20px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                        }
                    }

                    .data {
                        margin-top: 5px;
                        display: flex;
                        align-items: center;
                        justify-content: start;
                        position: relative;
                        width: 100%;

                        .tags {
                            display: flex;
                            margin-right: 10px;

                            span {
                                margin-right: 5px;

                                :last-child {
                                    margin-right: 0;
                                }
                            }
                        }

                        .date {
                            margin-right: 10px;
                            font-size: 14px;
                            width: 25%;
                        }

                        .userInfo {
                            display: flex;
                            cursor: pointer;
                            align-items: center;
                            .username {
                                margin-left: 5px;
                                font-size: 14px;
                            }
                        }
                    }

                }
            }
        }
    }

    .page {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        background-color: var(--color-bg-1);
        padding: 20px 10px;
        border-radius: 5px;
    }
}

.empty {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    width: 100%;
    height: 150px;
    background-color: var(--color-bg-1);
    border-radius: 5px 5px 0 0;
}
</style>