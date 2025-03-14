<script setup lang="ts">
import { dataTemFormat, type dataTimeType } from "@/utils/date"
import router from '@/router'
interface Props {
    articleRes: any
}
const props = defineProps<Props>()
const goDetail = (id: number) => {
    router.push({ name: 'articleDetail', query: { id } })
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
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.item {
    display: flex;
    position: relative;
    padding: 10px 20px;

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

            .tags {
                .tag {
                    margin-right: 5px;
                }
            }

            .date {
                color: var(--color-text-2);
            }
        }
    }
}
</style>