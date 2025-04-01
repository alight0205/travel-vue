<script setup lang="ts">
import articleCard from '@/components/common/articleCard.vue'
import { ref, reactive } from 'vue'
import type { listResponse, paramsType, baseResponse, optionsType, optionsFunc } from "@/types/index"
import { userSelfGetArticleListApi } from '@/api/article'
import type { articleRes } from '@/types/artrcle'
import { userGetUserDetailApi } from '@/api/user'
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
    const res = await userSelfGetArticleListApi(params)
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
// 分页切换函数
function pageChange() {
    getList()
}
const searchArticle = () => {
    getList({ title: searhValue.value })
}
const goDetail = (id:number)=>{
    router.push(`/article/detail`)
}
getList()



</script>


<template>
    <div class="articleInfo">
        <div class="title">
            <div class="left-section">我的文章</div>
        </div>
        <div class="body">
            <articleCard no-avatar v-for="article in data.list" :article-res="article" @delete="getList"></articleCard>
        </div>
        <a-empty v-if="data.total === 0" />
        <div class="page" v-else>
            <a-pagination show-total :total="data.total" v-model:current="params.page_num" :page-size="params.page_size"
                @change="pageChange" />
        </div>
    </div>
</template>


<style lang="less" scoped>
.articleInfo {
    width: 100%;
    padding: 20px;
    font-size: 18px;

    .title {
        padding: 0;
        display: flex;
        align-items: center;
        height: 43px;
        justify-content: space-between;
        padding: 0 0 10px 0;
        border-bottom: @w_border;
    }

    .body {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        // justify-content: center;
    }

    .page {
        border-top: @w_border;
        margin-top: 20px;
        width: 100%;
        padding: 20px 20px 0 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

}
</style>