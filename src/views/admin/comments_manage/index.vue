<script setup lang="ts">
import { ref, reactive } from 'vue'
// 引入用户列表的 API 函数和类型定义
// import { articleCategoryOptionApi } from '@/api/article_api';
import { adminGetCommentListApi, adminDeleteCommentApi, adminUpdateCommentApi } from '@/api/comments';
import type { commentsRes, commentsExamineReq } from '@/types/comments'
// 引入列表组件
import w_list from '@/components/admin/w_list.vue';
import type { columnType, filterGroupType } from "@/components/admin/w_list.vue";
import { Message } from '@arco-design/web-vue';
import commenetsCard from '@/components/common/commentsCard.vue'



// 定义表格列的配置
const columns: columnType[] = [
    { title: "ID", dataIndex: 'id', width: 50 }, // 普通列，显示文章ID
    { title: "IP地址", dataIndex: 'ip' },
    { title: "评论内容", dataIndex: 'content', ellipsis: true, tooltip: true }, // 普通列，显示文章名
    { title: "省份", dataIndex: 'province', width: 150  },
    { title: "市区", dataIndex: 'city', width: 150  },
    { title: "创建时间", slotName: 'created_at', dataFormat: "date" }, // 普通列，显示创建时间，可自定义字段判断使用哪个函数
    { title: "评论状态", slotName: 'examine_status' }, // 文章状态
    { title: "操作", slotName: 'action' }, // 插槽列，使用名为 "action" 的插槽
]

function remove(keyList: number[]) {
    console.log(keyList)
}
//   定义操作组
const actionGroup = [
    {
        label: "批量删除",
        callback: async function (keyList: number[]) {
            if (!keyList?.length) return
            if (keyList.length >= 2) {
                // 批量并行删除
                await Promise.all(
                    keyList.map(async (id) => {
                        const res = await adminDeleteCommentApi(Number(id))
                        if (!res.code) {
                            Message.success(res.msg)
                            fListRef.value.getList()
                            return
                        } // 根据实际业务显示成功/失败提示
                    })
                )
            } else {
                // 单个删除
                const res = await adminDeleteCommentApi(Number(keyList[0]))
                if (res.code) {
                    Message.error(res.msg)
                    return
                }
                Message.success("删除成功")
                fListRef.value.getList()
            }
        }
    },
    {
        label: "批量封禁",
        callback: async function (keyList: number[]) {
            if (!keyList?.length) return
            if (keyList.length >= 2) {
                // 批量并行
                await Promise.all(
                    keyList.map(async (id) => {
                        const params = <commentsExamineReq>{
                            id: Number(id),
                            examine_status: 0
                        }
                        const res = await adminUpdateCommentApi(params)
                        if (!res.code) {
                            Message.success("封禁成功")
                            fListRef.value.getList()
                            return
                        } // 根据实际业务显示成功/失败提示
                    })
                )
            } else {
                const params = <commentsExamineReq>{
                    id: Number(keyList[0]),
                    examine_status: 0
                }
                // 单个封禁
                const res = await adminUpdateCommentApi(params)
                if (res.code) {
                    Message.error(res.msg)
                    return
                }
                Message.success("封禁成功")
                fListRef.value.getList()
            }
        }
    },
    {
        label: "批量解封",
        callback: async function (keyList: number[]) {
            if (!keyList?.length) return
            if (keyList.length >= 2) {
                // 批量并行删除
                await Promise.all(
                    keyList.map(async (id) => {
                        const params = <commentsExamineReq>{
                            id: Number(id),
                            examine_status: 1
                        }
                        const res = await adminUpdateCommentApi(params)
                        if (!res.code) {
                            Message.success("解封成功")
                            fListRef.value.getList()
                            return
                        } // 根据实际业务显示成功/失败提示
                    })
                )
            } else {
                const params = <commentsExamineReq>{
                    id: Number(keyList[0]),
                    examine_status: 1
                }
                // 单个封禁
                const res = await adminUpdateCommentApi(params)
                if (res.code) {
                    Message.error(res.msg)
                    return
                }
                Message.success("解封成功")
                fListRef.value.getList()
            }
        }
    }
]
const fListRef = ref()
// 定义过滤组
const filters: filterGroupType[] = [
    {
        label: "评论状态过滤",
        source: [
            { label: "正常", value: 1 },
            { label: "封禁", value: 0 },
        ],
        column: "examine",
        width: 140,
        callback: (value: number | string) => {
            fListRef.value.getList({ examine: value })
        }
    }
]
const articleId = ref<number>(0)
const examineStatus = ref<number>(0)
const creator = ref(0)
const currentComment = ref()
// 点击行
function rowClick(record: commentsRes) {
    articleId.value = record.article_id
    creator.value = record.creator
    currentComment.value = record
    examineStatus.value = record.examine_status || 0
}

const lookVisible = ref()

// 封禁文章函数
async function banComments(record: commentsRes) {
    const params = <commentsExamineReq>{
        id: record.id,
        examine_status: 0
    }
    if (record.examine_status) {
        params.examine_status = 0
        const res = await adminUpdateCommentApi(params)
        if (res.code) {
            Message.error(res.msg)
            return
        }
        Message.success("封禁成功")
        fListRef.value.getList()
    } else {
        params.examine_status = 1
        const res = await adminUpdateCommentApi(params)
        if (res.code) {
            Message.error(res.msg)
            return
        }
        Message.success("解封成功")
        fListRef.value.getList()
    }


}

const deleteComments = async (keyList: number[] | string[]) => {
    if (!keyList?.length) return
    if (keyList.length >= 2) {
        // 批量并行删除
        await Promise.all(
            keyList.map(async (id) => {
                const res = await adminDeleteCommentApi(Number(id))
                if (!res.code) {
                    Message.success(res.msg)
                    fListRef.value.getList()
                    return
                } // 根据实际业务显示成功/失败提示
            })
        )
    } else {
        // 单个删除
        const res = await adminDeleteCommentApi(Number(keyList[0]))
        if (res.code) {
            Message.error(res.msg)
            return
        }
        Message.success("删除成功")
        fListRef.value.getList()
    }

}
const ipSearch = ref("")
const contentSearch = ref("")
const provinceSearch = ref("")
const citySearch = ref("")
const search = (value: number) => {
    if(value === 1){
        fListRef.value.getList({ content: contentSearch.value })
    }else if (value === 2) {
        fListRef.value.getList({ ip: ipSearch.value })
    } else if (value === 3) {
        fListRef.value.getList({ province: provinceSearch.value })
    } else if (value === 4) {
        fListRef.value.getList({ city: citySearch.value })
    }else {
        fListRef.value.getList({ content: contentSearch.value })
    }
}


</script>

<template>
    <div class="div">
        <a-modal width="70%" v-model:visible="lookVisible" hide-cancel title="预览评论">
            <commenetsCard :articleId="articleId" :creator="creator" :currentComment="currentComment"></commenetsCard>
        </a-modal>
        <!-- 使用 w_list 组件，并传入必要的 props 和插槽 -->
        <!-- <w_list @add="visible=true" ref="fListRef" @row-click="rowClick" :actionGroup="actionGroup" :filterGroup="filters" :url="getUserListApi" :columns="columns"> -->
        <w_list ref="fListRef" ban-lable="评论" :actionGroup="actionGroup" :filter-group="filters" no-batch-delete no-default-delete no-edit
            no-add no-search @delete="deleteComments" @row-click="rowClick" @ban="banComments"
            :url="adminGetCommentListApi" :columns="columns">
            <!-- 自定义插槽列的内容，用于显示文章状态 -->
            <template #examine_status="{ record }: { record: commentsRes }">
                <a-tag v-if="record.examine_status" color="green">正常</a-tag>
                <a-tag v-else color="red">封禁中</a-tag>
            </template>
            <template #search_other class="search_other">
                <a-input-search placeholder="请输入评论内容" @search="search(1)" v-model="contentSearch"></a-input-search>
                <a-input-search placeholder="请输入IP地址" @search="search(2)" v-model="ipSearch"></a-input-search>
                <a-input-search placeholder="请输入省份" @search="search(3)" v-model="provinceSearch"></a-input-search>
                <a-input-search placeholder="请输入城市" @search="search(4)" v-model="citySearch"></a-input-search>
            </template>
            <template #action_left>
                <a-button type="primary" @click="lookVisible = true">预览</a-button>
            </template>
        </w_list>
    </div>
</template>


<style lang="less" scoped>
.cover {
    height: 110px;
    width: 110px;
}

.search_other {
    display: flex;
}
</style>