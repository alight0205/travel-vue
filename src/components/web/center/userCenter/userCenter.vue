<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';  // 引入Vue的核心函数
import { userStore } from '@/stores/user-store';  // 导入用户状态管理store
import { Message } from '@arco-design/web-vue';
import type { userUpdateReq } from '@/types/user'
import { dateTimeFormat } from '@/utils/date'
import {getUserApiDetail} from '@/api/user'
import type {userRes} from '@/types/user'
const puserStore = userStore();  // 获取用户store实例
const userInfo = ref<userRes>()
const initUserInfo = async ()=>{
    puserStore.loadUserInfo();
    const res = await getUserApiDetail(puserStore.userInfo.id)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    userInfo.value = res.data.user
    
}

initUserInfo()
// const userInfo = puserStore.userInfo
const visible = ref(false);

// 使用defineEmits注册一个自定义事件
const emit = defineEmits(["getVisible"])

// 点击事件触发emit，去调用我们注册的自定义事件getValue,并传递value参数至父组件
const transValue = () => {
    emit("getVisible", visible.value = true)
}

// 定义暴露方法，用于外部调用
defineExpose({
    initUserInfo,
})

</script>

<template>
    <div class="userInfo">
        <div class="title">
            <div class="left-section">个人资料</div>
            <div class="right-section">
                <a-button @click="transValue">编辑</a-button>
            </div>
        </div>
        <div class="info">
            <div class="avatar">
                <span class="lablename">头像：</span>
                <a-avatar :size="50" :image-url="userInfo?.avatar"></a-avatar>
            </div>
            <div class="nickname paddingDiv">
                <span class="lablename">昵称：</span>
                <span class="infoname">{{ userInfo?.nickname }}</span>
            </div>
            <div class="username paddingDiv">
                <span class="lablename">用户名：</span>
                <span class="infoname">{{ userInfo?.username }}</span>
            </div>
            <div class="email paddingDiv">
                <span class="lablename">邮件：</span>
                <span class="infoname">{{ userInfo?.email }}</span>
            </div>
            <div class="desc paddingDiv">
                <span class="lablename">简介：</span>
                <span class="infoname">{{ userInfo?.desc }}</span>
            </div>
            <!-- <div class="about paddingDiv">
                <span class="lablename">用户组：</span>
                <a-tag v-if="userInfo?.role===1" color="green">管理员</a-tag>
                <a-tag v-else color="blue">普通用户</a-tag>
            </div> -->
            <div class="created_at paddingDiv">
                <span class="lablename">注册时间：</span>
                <span class="infoname">{{ dateTimeFormat(userInfo?.created_at || '2006-06-06') }}</span>
            </div>
        </div>
    </div>

</template>



<style lang="less" scoped>
.userInfo {
    width: 100%;
    padding: 20px;
    font-size: 18px;

    .title {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0 10px 0;
        border-bottom: @w_border;
    }

    .info {
        .paddingDiv {
            padding: 20px 0;


        }
        .avatar{
            margin: 20px 0;
        }

        .lablename {
            color: @color-text-2;
        }

        .infoname {
            color: @color-text-1;
            font-size: 16px;
        }
    }
}
</style>