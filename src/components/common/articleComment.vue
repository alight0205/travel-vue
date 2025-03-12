<script setup lang="ts">
// import Comment_tree from "@/components/web/comment/comment_tree.vue";
import { reactive, ref, watch } from "vue";
import type { commentsRes, CommentTreeType,commentsCreateReq } from '@/types/comments'
import type { baseResponse, listResponse, paramsType } from "@/types/index";
import { userGetCommentListByArticleApi,createCommentApi } from '@/api/comments'
import { Message } from "@arco-design/web-vue";
import commentsTree from '@/components/web/article/articleCommentsTree.vue'
import {userStore} from '@/stores/user-store'
const user = userStore()
user.loadUserInfo()

interface Props {
    articleId: number
}


const props = defineProps<Props>()

const params = reactive({
    // limit: 10,
    // page: 1,
    article_id: 0,
})

const data = ref<commentsRes[]>([])
const comments = ref<CommentTreeType[]>([])
// 转换函数
const buildCommentTree = (comments: commentsRes[]): CommentTreeType[] => {
  const map = new Map<number, CommentTreeType>()
  const roots: CommentTreeType[] = []

  // 创建哈希映射
  comments.forEach(comment => {
    map.set(comment.id, { ...comment, subComments: [] })
  })

  // 构建树结构
  map.forEach(comment => {
    if (comment.comment_id === 0) {
      roots.push(comment)
    } else {
      const parent = map.get(comment.comment_id)
      parent?.subComments?.push(comment)
    }
  })

  return roots
}
async function getData() {
    params.article_id = props.articleId
    const res = await userGetCommentListByArticleApi(params)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    data.value = buildCommentTree(res.data)
    comments.value = buildCommentTree(res.data)
    console.log(comments.value)

}


const form = reactive<commentsCreateReq>({
    content: "",
    user_id: 0,
    article_id: 1,
    comment_id: 0,
})

async function create() {
    form.comment_id = 0
    form.article_id = props.articleId
    form.user_id = user.userInfo.id
    if (form.content.trim() === "") {
        Message.warning("请输入评论内容")
        return
    }
    const res = await createCommentApi(form)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
    getData()
    form.content = ""
    form.user_id = 0
    console.log("创建评论成功")
}

watch(() => props.articleId, () => {
    getData()
}, { immediate: true })

const textareaRef = ref()

function focus() {
    textareaRef.value.focus()
}

defineExpose({ focus })
</script>

<template>
    <div class="articleComment">
        <div class="addComment">
            <a-textarea v-model="form.content" ref="textareaRef" @keydown.enter="create"
                :auto-size="{ minRows: 5, maxRows: 6 }" placeholder="请输入评论内容"></a-textarea>
            <a-button type="primary" @click="create" size="mini">发布评论</a-button>
        </div>
        <div class="commentList">
            <commentsTree :line="1" @ok="getData" :list="comments"></commentsTree>
            <!-- <div class="page" v-if="data.list.length">
                <a-pagination @change="getData" :page-size="params.limit" :total="data.count" show-total
                    v-model:current="params.page"></a-pagination>
            </div> -->
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

    .commentList {
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