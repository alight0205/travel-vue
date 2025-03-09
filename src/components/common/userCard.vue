<script setup lang="ts">
// 引入API相关的类型定义
import type { paramsType, baseResponse } from "@/types/index"
import type { userRes } from '@/types/user'
import { dataTemFormat, type dataTimeType } from "@/utils/date"
interface Props {
    // 请求数据的URL函数，接受参数并返回Promise
    url?: (params?: paramsType) => Promise<baseResponse<any>>
    user?: userRes
}
// 使用defineProps定义组件的Props
const props = defineProps<Props>()
// 获取列表数据的异步函数
async function getData(newParams?: paramsType) {
    // const res = await props.url(params)
    // // 如果返回的code不为0，表示请求失败，显示错误信息
    // if (res.code) {
    //     Message.error(res.msg)
    //     return
    // }
    console.log(props.user)
}
getData()
</script>

<template>
    <div class="userCard">
        <div class="userAvatar">
            <a-badge v-if="props.user?.role == 1" text="管理员">
                <a-avatar :size="80" :image-url="props.user?.avatar"></a-avatar>
            </a-badge>
            <a-badge v-else text="普通用户">
                <a-avatar :size="80" :image-url="props.user?.avatar"></a-avatar>
            </a-badge>
        </div>
        <div class="nickname">{{ props.user?.nickname }}({{ props.user?.username }})</div>
        <div class="userDes">{{ props.user?.desc }}</div>
        <div class="userEmail">{{ props.user?.email }}</div>
        <a-divider></a-divider>
        <div class="otherInfo">
            <div class="fllow flexContent">
                <div class="lable">关注</div>
                <div class="count">123</div>
            </div>
            <div class="articleCount flexContent">
                <div class="lable">发布文章</div>
                <div class="count">123</div>
            </div>
            <div class="createdAt flexContent">
                <div class="lable"> 注册时间</div>
                <div class="count">{{ dataTemFormat(props.user?.created_at || '2006-06-06', 'date') }}</div>
            </div>
            <div class="status flexContent">
                <div class="lable">账号状态</div>
                <div class="count">
                    <a-tag v-if=" props.user?.status === 0" color="red">封禁中</a-tag>
                    <a-tag v-else color="green">正常</a-tag>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
.arco-modal {
    width: 30%;
}

.userCard {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .arco-badge-text {
        background-color: @primary-6;
    }

    .userAvatar {
        margin-top: 15px;
    }

    .nickname {
        font-size: 22px;
    }

    .userDes {
        font-size: 16px;
        color: @color-text-2;
    }

    .userEmail {
        font-size: 16px;
        color: @color-text-2;
    }

    .otherInfo {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .flexContent {
            width: 150px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
    }
}
</style>