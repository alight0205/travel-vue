<script setup lang="ts">
import { dataTemFormat, type dataTimeType } from "@/utils/date"
import router from '@/router'
import type { articleRes } from '@/types/artrcle'
interface Props {
    articleRes: articleRes
    authorDisplay?: boolean
}
const props = defineProps<Props>()
const emits = defineEmits<{
    'close': [modalstatus:boolean]
}>()
const goDetail = (id: number) => {
    router.push({ name: 'articleDetail', query: { id } })
    emits("close",true)
}
const goUser = (id: number) => {
    router.push({ name: 'userDetail', query: { id } })
    emits("close",true)
}
</script>

<template>
    <div class="item">
        <div class="cover">
            <img :src="props.articleRes.cover" alt="">
        </div>
        <div class="info">
            <div class="title" @click="goDetail(props.articleRes.id)">{{ props.articleRes.title }}</div>
            <div class="desc">{{ props.articleRes.desc }}</div>
            <div class="data">
                <div class="tags">
                    <a-tag class="tag" v-for="tag in props.articleRes.tags">{{ tag.name }}</a-tag>
                </div>
                <div class="date">发布于{{ dataTemFormat(props.articleRes.created_at, "current") }}</div>
                <div class="author" v-if="props.authorDisplay" @click="goUser(props.articleRes.user.id)">
                    <div class="avatar">
                        <a-avatar :image-url="props.articleRes.user.avatar"></a-avatar>
                    </div>
                    <div class="nick">{{ props.articleRes.user.nickname }}</div>
                </div>

            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.item {
    display: flex;
    position: relative;
    padding: 10px 20px;
    width: 100%;

    &:hover {
        background: var(--color-fill-1);
    }

    .cover {

        img {
            width: 160px;
            border-radius: 5px;
            margin-right: 10px;
        }
    }

    .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {

            font-size: 15px;
            font-weight: 600;
            color: var(--color-text-1);
            cursor: pointer;
        }

        .desc {
            margin: 5px 0;
        }

        .data {
            display: flex;
            align-items: center;
            color: var(--color-text-2);
            width: 100%;

            .tags {
                .tag {
                    margin-right: 5px;
                }
            }

            .date {
                color: var(--color-text-2);
            }

            .author {
                margin-left: 10px;
                display: flex;
                align-items: center;
                justify-content: flex-end;

                .avatar {
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>