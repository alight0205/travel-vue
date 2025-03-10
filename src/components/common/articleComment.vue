<script setup lang="ts">
// import Comment_tree from "@/components/web/comment/comment_tree.vue";
import { reactive, ref, watch } from "vue";
// import type { listResponse, paramsType } from "@/api";
// import {
//     commentCreateApi,
//     type commentCreateRequest,
//     commentTreeApi,
//     type commentTreeRequest,
//     type commentTreeType
// } from "@/api/comment_api";
// import { Message } from "@arco-design/web-vue";

// interface Props {
//     articleId: number
// }


// const props = defineProps<Props>()

const params = reactive({
    limit: 10,
    page: 1,
    id: 0,
})

const data = reactive<listResponse<commentTreeType>>({
    list: [],
    count: 0
})

async function getData() {
    // params.id = props.articleId
    // const res = await commentTreeApi(params)
    // if (res.code) {
    //     Message.error(res.msg)
    //     return
    // }
    data.list = [{}]
    data.count = 1
}


const form = reactive({
    content: "",
    articleID: 1,
    parentID: undefined,
})

async function create() {
    // form.articleID = props.articleId
    // if (form.content.trim() === "") {
    //     Message.warning("请输入评论内容")
    //     return
    // }
    // const res = await commentCreateApi(form)
    // if (res.code) {
    //     Message.error(res.msg)
    //     return
    // }
    // Message.success(res.msg)
    // getData()
    // form.content = ""
    console.log("创建评论成功")
}

// watch(() => props.articleId, () => {
//     getData()
// }, { immediate: true })

// const textareaRef = ref()

// function focus() {
//     textareaRef.value.focus()
// }

// defineExpose({ focus })
</script>

<template>
    <div class="articleComment">
        <div class="addComment">
            <a-textarea v-model="form.content" ref="textareaRef" @keydown.enter="create"
                :auto-size="{ minRows: 5, maxRows: 6 }" placeholder="请输入评论内容"></a-textarea>
            <a-button type="primary" @click="create" size="mini">发布评论</a-button>
        </div>
        <div class="commentList">
            <comment_tree :line="1" @ok="getData" :list="data.list"></comment_tree>
            <div class="page" v-if="data.list.length">
                <a-pagination @change="getData" :page-size="params.limit" :total="data.count" show-total
                    v-model:current="params.page"></a-pagination>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.articleComment {
    margin-top: 20px;
    border-radius: 5px;
    background: var(--color-bg-1);

    .addComment {
        padding: 20px;
        position: relative;

        .arco-btn {
            position: absolute;
            right: 30px;
            bottom: 30px;
            z-index: 2;
        }
    }

    .comment_list {
        padding: 0 20px 20px 20px;

        .arco-comment-inner-comment {
            margin-top: 10px;
        }

        .arco-comment-actions {
            display: flex;
            align-items: center;
            margin-top: 5px;
        }

        .action {
            display: inline-flex;
            align-items: center;

            i {
                margin-right: 5px;
            }

            .icon-pinglun1 {
                font-size: 16px;
                padding-top: 2px;
            }
        }
    }

    .page {
        display: flex;
        justify-content: center;
    }
}
</style>