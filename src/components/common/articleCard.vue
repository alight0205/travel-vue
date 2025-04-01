<script setup lang="ts">
import router from '@/router';
import type { articleRes } from '@/types/artrcle'
import { Message } from '@arco-design/web-vue';
import { dataTemFormat, type dataTimeType } from "@/utils/date"
interface Props {
    noAvatar?: boolean
    noBan?: boolean
    noAction?: boolean
    articleRes: articleRes
}
const props = defineProps<Props>()
interface DorpDownOptionsType {
    value: number;
    label: string;
}
const dropDownOptions: DorpDownOptionsType[] = [
    { value: 1, label: '编辑文章' },
    { value: 2, label: '删除文章' },
]


const handleSelect = (value: number) => {
    if (value === 1) {
        router.push({ path: '/article/edit', query: { id: props.articleRes?.id } })
    } else {
        Message.success('文章删除成功')
    }
}
</script>

<template>
    <a-card class="card">
        <template #actions>
            <!-- <span class="icon-hover">
                <IconShareInternal />
            </span> -->
            <span class="icon-hover" v-if="!noAction">
                <a-dropdown @select="handleSelect" position="tr">
                    <IconMore />
                    <template #content>
                        <a-doption v-for="option in dropDownOptions" :value="option.value">{{ option.label
                        }}</a-doption>
                    </template>
                </a-dropdown>

            </span>
        </template>
        <template #cover>
            <div class="cover">
                <img :src="props.articleRes?.cover" alt="banner">
            </div>
        </template>
        <a-card-meta>
            <template #title>
                <div class="title" @click="router.push({name: 'articleDetail',query: { id: props.articleRes?.id }})">{{ props.articleRes?.title }}</div>
            </template>
            <template #description>
                <div class="description">{{ props.articleRes?.desc }}</div>
                <div class="created_at">{{ dataTemFormat(props.articleRes.created_at, 'date') }}</div>
            </template>
            <template #avatar>
                <div v-if="!noAvatar" class="avatar">
                    <a-avatar :image-url="props.articleRes?.user.avatar" :size="24" :style="{ marginRight: '8px' }">
                    </a-avatar>
                    <a-typography-text>{{ props.articleRes?.user.username }}</a-typography-text>
                </div>
                <div v-if="!noBan" class="ban">
                    <a-tag color="red" v-if="props.articleRes?.examine_status === 0">封禁中</a-tag>
                    <a-tag color="green" v-else>正常</a-tag>
                </div>
            </template>
        </a-card-meta>
    </a-card>
</template>

<style lang="less" scoped>
.card {
    margin-top: 20px;
    width: 230px;
    border-radius: 5px;
    transition: all .5s;
    border-radius: 5px 5px 0 0;
    height: 290px;
    margin-right: 50px;

    &:hover {
        transform: translateY(-5px) scale(1.005);
        box-shadow: 0 5px 5px 5px #0000000d;
        // transition: all .3s;
    }

    .cover {
        width: 100%;
        border-radius: 5px;
        overflow: hidden;
        height: 130px;

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

    .title {
        cursor: pointer;
    }

    .description {
        height: 40px;
        display: -webkit-box;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .created_at {
        margin-top: 5px;
        display: flex;
        justify-content: end;
        font-size: 12px;
        color: var(--color-text-3);
    }

    .icon-hover {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        transition: all 0.1s;
    }

    .icon-hover:hover {
        background-color: rgb(var(--gray-2));
    }
}
</style>