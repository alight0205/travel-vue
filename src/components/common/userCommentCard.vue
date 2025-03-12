<script setup lang="ts">
import type { commentsRes } from "@/types/comments";
import { dataTemFormat } from "@/utils/date";
import { Message } from "@arco-design/web-vue";
import { userDeleteCommentApi } from '@/api/comments'
import { useRouter } from 'vue-router'
const router = useRouter()
interface props {
    commentRes: commentsRes;
}
const props = defineProps<props>()
const emits = defineEmits<{
    'delete': [id: number]
}>()


interface DorpDownOptionsType {
    value: number;
    label: string;
}
const dropDownOptions: DorpDownOptionsType[] = [
    { value: 1, label: '删除评论' },
]


const handleSelect = async (id: number) => {
    const res = await userDeleteCommentApi(id)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    emits('delete', id)
    Message.success('评论删除成功')
}

const goArticleDetail = (id: number) => {
    router.push({ name: 'articleDetail', query: { id } })
}
</script>


<template>
    <div class="commentCard">
        <div class="commentContent" @click="goArticleDetail(props.commentRes.article_id)">{{ props.commentRes.content }}</div>
        <div class="commentBottom">
            <div class="articleInfo">
                <div class="date">{{ dataTemFormat(props.commentRes.created_at, "datetime") }}</div>
                <div class="split">·</div>
                <div class="articleTitle" @click="goArticleDetail(props.commentRes.article_id)">{{
                    props.commentRes.title}}</div>
                <div class="status">
                    <a-tag color="red" v-if="props.commentRes.examine_status === 0">封禁中</a-tag>
                    <a-tag color="green" v-else>正常</a-tag>
                </div>
            </div>
            <div class="articleAction">
                <span class="icon-hover">
                    <a-dropdown @select="handleSelect(props.commentRes.id)" position="tr">
                        <IconMore />
                        <template #content>
                            <a-doption v-for="option in dropDownOptions" :value="option.value">{{ option.label
                                }}</a-doption>
                        </template>
                    </a-dropdown>

                </span>
            </div>
        </div>
    </div>
</template>


<style lang="less" scoped>
.commentCard {
    padding: 10px 0;
    border-bottom: @w_border;

    .commentContent {
        font-size: 16px;
        padding: 20px 0;
        cursor: pointer;

        &:hover {
            color: @primary-6;
        }
    }

    .commentBottom {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .articleInfo {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: var(--color-text-2);

            .split {
                margin: 0 10px;
            }

            .articleTitle {
                cursor: pointer;
                
                &:hover{
                    color: var(--color-text-3);
                }
            }

            .status {
                margin-left: 10px;
            }

        }
    }
}
</style>