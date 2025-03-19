.........<script setup lang="ts">
import type { userRes } from '@/types/user'
import { dataTemFormat, type dataTimeType } from "@/utils/date"
interface Props {
    userInfo: userRes
    articleCount:number
}
const props = defineProps<Props>()
</script>

<template>
    <div class="userInfo">
        <div class="avatar">
            <a-avatar
                :image-url="props.userInfo.avatar"
                :size="65"></a-avatar>
        </div>
        <div class="info">
            <div class="nickname">
                <span>{{ props.userInfo.nickname }}</span>
            </div>
            <div class="desc">
                <a-tooltip :content="props.userInfo.desc || '暂无描述'">
                    <div class="text">
                        {{props.userInfo.desc || '暂无描述'}}
                    </div>
                </a-tooltip>

            </div>
            <div class="data">
                <span>
                    <span>{{ props.articleCount }} </span>
                    <span>文章</span>
                </span>
                <span>
                    <span>0</span>
                    <span>粉丝</span>
                </span>
                <span>
                    <span>0</span>
                    <span>关注</span>
                </span>
            </div>
            <div class="date">
                <div class="time">注册时间：{{ dataTemFormat(props.userInfo.created_at,'date')}}</div>
                <div class="email">邮箱：{{ props.userInfo.email }}</div>
            </div>
        </div>
        <!-- <div class="action">
            <span v-if="true">封禁中</span>
            <span v-else>正常</span>
        </div> -->
    </div>
</template>

<style lang="less" scoped>
.userInfo {
    background: var(--color-bg-1);
    border-radius: 5px;
    padding: 10px;
    position: relative;
    display: flex;
    margin-top: 20px;

    .avatar {
        width: 100px;

        .arco-avatar {
            position: absolute;
            left: 20px;
            top: -10px;


        }
    }

    .info {
        color: var(--color-text-1);

        .nickname {
            span:nth-child(1) {
                color: var(--color-text-2);
                margin-right: 10px;
            }
        }

        .desc {
            width: 400px;

            .text {
                font-size: 12px;
                color: var(--color-text-2);
                display: -webkit-box;
                line-height: 30px;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }

        }

        .data {
            >span {
                margin-right: 20px;

                :nth-child(1) {
                    font-size: 18px;
                    color: var(--color-text-1);
                    font-weight: 600;
                    margin-right: 5px;
                }

                :nth-child(2) {
                    color: var(--color-text-2);
                }
            }
        }

        .date {
            color: var(--color-text-2);
            margin-top: 10px;
            font-size: 12px;
            display: flex;
            .time{
                margin-right: 10px;
            }
        }
    }

    .action {
        border-bottom-left-radius: 50px;
        width: 60px;
        height: 60px;
        position: absolute;
        top: 0;
        right: 0;
        text-align: center;
        line-height: 50px;

        >span {
            font-size: 16px;
            color: var(--color-text-1);
            font-weight: 600;
        }

    }

    .ban {
        background-color: rgba(255, 0, 0, 0.4);
    }

    .normal {
        background-color: rgba(0, 255, 0, 0.4)
    }
}
</style>