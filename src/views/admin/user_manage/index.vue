<script setup lang="ts">
import { ref, reactive } from 'vue'
// 引入用户列表的 API 函数和类型定义
// import { articleCategoryOptionApi } from '@/api/article_api';
import { getUserListApi, createUserApi, adminUpdateUserApi } from '@/api/user';
import type { userRes, userUpdateReq, userCreateReq, adminUpdateUserReq } from '@/types/user'
// 引入列表组件
import w_list from '@/components/admin/w_list.vue';
import type { columnType, filterGroupType } from "@/components/admin/w_list.vue"
import w_modal_form from '@/components/admin/w_modal_form.vue';
import { Message } from '@arco-design/web-vue';
import imageUpload from '@/components/common/imageUpload.vue'
import userCard from '@/components/common/userCard.vue'

// 定义表格列的配置
const columns: columnType[] = [
    { title: "ID", dataIndex: 'id' }, // 普通列，显示用户ID
    { title: "用户昵称", dataIndex: 'nickname' }, // 普通列，显示用户昵称
    { title: "用户名", dataIndex: 'username' }, // 普通列，显示用户名
    { title: "用户头像", slotName: 'avatar' }, // 插槽列，使用名为 "avatar" 的插槽
    { title: "用户邮箱", dataIndex: 'email' }, // 普通列，显示用户邮箱
    { title: "权限组", slotName: 'role' }, // 账户权限
    { title: "账户状态", slotName: 'status' }, // 账户状态
    { title: "创建时间", slotName: 'created_at', dataFormat: "datetime" }, // 普通列，显示创建时间，可自定义字段判断使用哪个函数
    { title: "操作", slotName: 'action' }, // 插槽列，使用名为 "action" 的插槽
]

function remove(keyList: number[]) {
    console.log(keyList)
}
//   定义操作组
const actionGroup = [
    {
        label: "批量升级",
        callback: async function (keyList: number[]) {
            if (!keyList?.length) return
            if (keyList.length >= 2) {
                await Promise.all(
                    keyList.map(async (id) => {
                        const params = <adminUpdateUserReq>{
                            id: Number(id),
                            role: 1
                        }
                        const res = await adminUpdateUserApi(params)
                        if (!res.code) {
                            Message.success("用户权限组升级成功")
                            fListRef.value.getList()
                            return
                        } // 根据实际业务显示成功/失败提示
                    })
                )
            } else {
                const params = <adminUpdateUserReq>{
                    id: Number(keyList[0]),
                    role: 1
                }
                // 单个封禁
                const res = await adminUpdateUserApi(params)
                if (res.code) {
                    Message.error(res.msg)
                    return
                }
                Message.success("用户权限组升级成功")
                fListRef.value.getList()
            }
        }
    },
    {
        label: "批量降级",
        callback: async function (keyList: number[]) {
            if (!keyList?.length) return
            if (keyList.length >= 2) {
                await Promise.all(
                    keyList.map(async (id) => {
                        const params = <adminUpdateUserReq>{
                            id: Number(id),
                            role: 2
                        }
                        const res = await adminUpdateUserApi(params)
                        if (!res.code) {
                            Message.success("用户权限组降级成功")
                            fListRef.value.getList()
                            return
                        } // 根据实际业务显示成功/失败提示
                    })
                )
            } else {
                const params = <adminUpdateUserReq>{
                    id: Number(keyList[0]),
                    role: 2
                }
                // 单个封禁
                const res = await adminUpdateUserApi(params)
                if (res.code) {
                    Message.error(res.msg)
                    return
                }
                Message.success("用户权限组降级成功")
                fListRef.value.getList()
            }
        }
    },
    {
        label: "批量封禁",
        callback: async function (keyList: number[]) {
            if (!keyList?.length) return
            if (keyList.length >= 2) {
                await Promise.all(
                    keyList.map(async (id) => {
                        const params = <adminUpdateUserReq>{
                            id: Number(id),
                            status: 0
                        }
                        const res = await adminUpdateUserApi(params)
                        if (!res.code) {
                            Message.success("封禁成功")
                            fListRef.value.getList()
                            return
                        }
                    })
                )
            } else {
                const params = <adminUpdateUserReq>{
                    id: Number(keyList[0]),
                    status: 0
                }
                // 单个封禁
                const res = await adminUpdateUserApi(params)
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
                await Promise.all(
                    keyList.map(async (id) => {
                        const params = <adminUpdateUserReq>{
                            id: Number(id),
                            status: 1
                        }
                        const res = await adminUpdateUserApi(params)
                        if (!res.code) {
                            Message.success("解封成功")
                            fListRef.value.getList()
                            return
                        } 
                    })
                )
            } else {
                const params = <adminUpdateUserReq>{
                    id: Number(keyList[0]),
                    status: 1
                }
                const res = await adminUpdateUserApi(params)
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
        label: "角色过滤",
        source: [
            { label: "管理员", value: 1 },
            { label: "普通用户", value: 2 },
        ],
        column: "role",
        width: 140,
        callback: (value: number | string) => {
            fListRef.value.getList({ role: value })
        }
    }
]
const currentRowInfo = ref<userRes>()
// 点击行
function rowClick(record: userRes) {
    currentRowInfo.value = record
    form.value = {
        id: currentRowInfo.value?.id || 1,
        username: currentRowInfo.value?.username || '',
        nickname: currentRowInfo.value?.nickname || '',
        desc: currentRowInfo.value?.desc || '',
        avatar: currentRowInfo.value?.avatar || '',
        role: currentRowInfo.value?.role || 0,
        email: currentRowInfo.value?.email || '',
        // password: ''
    }
}

const formList = [
    {
        label: "昵称",
        field: "nick_name",
        type: "input"
    }
]
const addVisible = ref()
const editVisible = ref()
const lookVisible = ref()
const form = ref<userUpdateReq>({
    id: 0,
    username: '',
    nickname: '',
    desc: '',
    avatar: '',
    role: 0,
    email: '',
    password: ''
});

// 打开编辑窗口
function openEdit() {
    editVisible.value = true
}
// 打开创建窗口
function addOpen() {
    form.value = {
        id: 0,
        username: '',
        nickname: '',
        desc: '',
        avatar: '',
        role: 0,
        email: '',
        password: ''
    }
    addVisible.value = true
}
const openLook = async () => {
    lookVisible.value = true
}
// 添加用户函数
async function handlerAdd() {
    const params = <userCreateReq>{
        username: form.value.username,
        password: form.value.password
    }
    const res = await createUserApi(params)
    if (!res.code) {
        Message.success(res.msg)
        return
    }
    Message.error(res.msg)
}

// 封禁用户函数
async function banUser(record: userRes) {
    const params = <adminUpdateUserReq>{
        id: record.id,
        examine_status: 0
    }
    if (record.status) {
        params.status = 0
        const res = await adminUpdateUserApi(params)
        if (res.code) {
            Message.error(res.msg)
            return
        }
        Message.success("封禁成功")
        fListRef.value.getList()
    } else {
        params.status = 1
        const res = await adminUpdateUserApi(params)
        if (res.code) {
            Message.error(res.msg)
            return
        }
        Message.success("解封成功")
        fListRef.value.getList()
    }


}
// 封禁用户函数
async function changeRole(record: userRes) {
    const params = <adminUpdateUserReq>{
        id: record.id,
        role: 0
    }
    if (record.role===1) {
        params.role = 2
        const res = await adminUpdateUserApi(params)
        if (res.code) {
            Message.error(res.msg)
            return
        }
        Message.success("降低用户组权限成功")
        fListRef.value.getList()
    } else {
        params.role = 1
        const res = await adminUpdateUserApi(params)
        if (res.code) {
            Message.error(res.msg)
            return
        }
        Message.success("提升用户组权限成功")
        fListRef.value.getList()
    }


}
const nickname = ref('')
const search = (status: number) => {
    if (status === 1) {
        fListRef.value.getList({ nickname: nickname.value })
    } else {
        // fListRef.value.getList({ address_detail: addressSearch.value })
    }
}

</script>

<template>
    <div class="div">
        <!-- <a-modal v-model:visible="addVisible" title="添加用户信息" :on-before-ok="handlerAdd">
            <a-form :model="form">
                <a-form-item label="用户名">
                    <a-input placeholder="用户名" v-model="form.username"></a-input>
                </a-form-item>
                <a-form-item label="密码">
                    <a-input placeholder="密码" v-model="form.password"></a-input>
                </a-form-item>
            </a-form>
        </a-modal> -->
        <!-- <a-modal v-model:visible="editVisible" title="编辑用户信息" :on-before-ok="handlerUpdate">
            <a-form :model="form">
                <a-form-item label="头像">
                    <imageUpload v-model="form.avatar"></imageUpload>
                </a-form-item>
                <a-form-item label="昵称">
                    <a-input placeholder="昵称" v-model="form.nickname"></a-input>
                </a-form-item>
                <a-form-item label="用户名">
                    <a-input placeholder="用户名" v-model="form.username"></a-input>
                </a-form-item>
                <a-form-item label="邮箱">
                    <a-input placeholder="邮箱" v-model="form.email"></a-input>
                </a-form-item>
                <a-form-item label="简介">
                    <a-textarea placeholder="简介" v-model="form.desc"></a-textarea>
                </a-form-item>
                <a-form-item label="关于">
                    <a-textarea placeholder="关于" v-model="form.about"></a-textarea>
                </a-form-item>
            </a-form>
        </a-modal> -->
        <a-modal v-model:visible="lookVisible" :hide-cancel="true" :simple="true" okText="关闭">
            <userCard :user="currentRowInfo"></userCard>
        </a-modal>
        <!-- 使用 w_list 组件，并传入必要的 props 和插槽 -->
        <w_list ref="fListRef" @row-click="rowClick" no-search no-edit no-delete no-add no-batch-delete no-ban :url="getUserListApi"
            :columns="columns" :actionGroup="actionGroup" :filterGroup="filters">
            <!-- 自定义插槽列的内容，用于渲染用户头像 -->
            <template #avatar="{ record }: { record: userRes }">
                <!-- 使用 a-avatar 组件显示用户头像 -->
                <a-avatar :image-url="record.avatar"></a-avatar>
            </template>
            <!-- 自定义插槽列的内容，用于显示权限组 -->
            <template #role="{ record }: { record: userRes }">
                <a-tag v-if="record.role === 1" color="green">管理员</a-tag>
                <a-tag v-else color="blue">普通用户</a-tag>
            </template>
            <!-- 自定义插槽列的内容，用于显示账户状态 -->
            <template #status="{ record }: { record: userRes }">
                <a-tag v-if="record.status === 0" color="red">封禁中</a-tag>
                <a-tag v-else color="green">正常</a-tag>
            </template>
            <!-- <template #action_add>
                <div style="margin-right: 10px;">
                    <a-button @click="addOpen">添加</a-button>
                </div>
            </template> -->
            <template #search_other class="search_other">
                <a-input-search placeholder="请输入用户昵称" @search="search(1)" v-model="nickname"></a-input-search>
            </template>
            <template #action_left="{ record }: { record: userRes }">
                <!-- <a-button type="primary" @click="openEdit()">编辑</a-button> -->
                <a-button type="primary" @click="openLook()">预览</a-button>
                <a-popconfirm v-if="record.status==1" @ok="banUser(record)" content="确定要封禁该用户吗" type="warning">
                    <a-button status="danger">封禁</a-button>
                </a-popconfirm>
                <a-popconfirm v-else @ok="banUser(record)" content="确定要解封该用户吗" type="warning">
                    <a-button status="success">解封</a-button>
                </a-popconfirm>
                <a-popconfirm v-if="record.role==1" @ok="changeRole(record)" content="确定要降低该用户权限吗" type="warning">
                    <a-button status="danger">降级</a-button>
                </a-popconfirm>
                <a-popconfirm v-else @ok="changeRole(record)" content="确定要提高该用户权限吗" type="warning">
                    <a-button status="success">升级</a-button>
                </a-popconfirm>

            </template>
        </w_list>
    </div>
</template>


<style scoped>
/* 父组件的样式 */
</style>