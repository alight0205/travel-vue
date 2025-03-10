<script setup lang="ts">
import { ref, reactive } from 'vue'
// 引入用户列表的 API 函数和类型定义
// import { articleCategoryOptionApi } from '@/api/article_api';
import { adminGetArticleListApi } from '@/api/article';
import type { articleRes } from '@/types/artrcle'
// 引入列表组件
import w_list from '@/components/admin/w_list.vue';
import type { columnType, filterGroupType } from "@/components/admin/w_list.vue"
import w_modal_form from '@/components/admin/w_modal_form.vue';
import { Message } from '@arco-design/web-vue';
import imageUpload from '@/components/common/imageUpload.vue'
import articleForm from '@/components/common/articleForm.vue'
import { initArticleFormMock, articleMockList } from "@/mock/articleMock";
import { provinceData } from '@/mock/commonMock'
import { deleteArticleApi, adminChangeExamine,adminChangeBanner } from '@/api/article'
import type { articleExamineParams,articleIsBannerParams } from '@/types/artrcle'


// 定义表格列的配置
const columns: columnType[] = [
    { title: "ID", dataIndex: 'id' }, // 普通列，显示文章ID
    { title: "文章名", dataIndex: 'title' }, // 普通列，显示文章名
    { title: "封面", slotName: 'cover' }, // 插槽列，使用名为 "cover" 的插槽
    { title: "省市区", slotName: 'province_code' },
    { title: "阅读数", dataIndex: 'read_num' }, // 普通列，显示阅读数
    { title: "创建时间", slotName: 'created_at', dataFormat: "date" }, // 普通列，显示创建时间，可自定义字段判断使用哪个函数
    { title: "文章标签", slotName: 'tags' }, // 文章标签
    { title: "文章状态", slotName: 'examine_status' }, // 文章状态
    { title: "操作", slotName: 'action' }, // 插槽列，使用名为 "action" 的插槽
]

function remove(keyList: number[]) {
    console.log(keyList)
}
//   定义操作组
const actionGroup = [
    {
        label: "批量删除",
        callback: async function (keyList: number[]) {
            if (!keyList?.length) return
            if (keyList.length >= 2) {
                // 批量并行删除
                await Promise.all(
                    keyList.map(async (id) => {
                        const res = await deleteArticleApi(Number(id))
                        if (!res.code) {
                            Message.success(res.msg)
                            fListRef.value.getList()
                            return
                        } // 根据实际业务显示成功/失败提示
                    })
                )
            } else {
                // 单个删除
                const res = await deleteArticleApi(Number(keyList[0]))
                if (res.code) {
                    Message.error(res.msg)
                    return
                }
                Message.success("删除成功")
                fListRef.value.getList()
            }
        }
    },
    {
        label: "批量封禁",
        callback: async function (keyList: number[]) {
            if (!keyList?.length) return
            if (keyList.length >= 2) {
                // 批量并行
                await Promise.all(
                    keyList.map(async (id) => {
                        const params = <articleExamineParams>{
                            id: Number(id),
                            examine_status: 0
                        }
                        const res = await adminChangeExamine(params)
                        if (!res.code) {
                            Message.success("封禁成功")
                            fListRef.value.getList()
                            return
                        } // 根据实际业务显示成功/失败提示
                    })
                )
            } else {
                const params = <articleExamineParams>{
                    id: Number(keyList[0]),
                    examine_status: 0
                }
                // 单个封禁
                const res = await adminChangeExamine(params)
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
                // 批量并行删除
                await Promise.all(
                    keyList.map(async (id) => {
                        const params = <articleExamineParams>{
                            id: Number(id),
                            examine_status: 1
                        }
                        const res = await adminChangeExamine(params)
                        if (!res.code) {
                            Message.success("解封成功")
                            fListRef.value.getList()
                            return
                        } // 根据实际业务显示成功/失败提示
                    })
                )
            } else {
                const params = <articleExamineParams>{
                    id: Number(keyList[0]),
                    examine_status: 1
                }
                // 单个封禁
                const res = await adminChangeExamine(params)
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
        // callback: (value: number|string) => {
        //     console.log("父",value)
        // }
    },
    {
        label: "IP过滤",
        source: [
            { label: "外网", value: 1 },
            { label: "内网", value: 2 },
        ],
        column: "ip",
        width: 140,
        // callback: (value: number|string) => {
        //     console.log("父",value)
        // }
    },
    // {
    //     label: "文章分类",
    //     source: articleCategoryOptionApi,
    //     column: "category",
    //     width: 140,
    //     callback: (value: number | string) => {
    //         console.log(fListRef.value?.data)
    //         fListRef.value.getList({ role: value })
    //     }
    // }
]
const articleId = ref<number>(0)
const examineStatus = ref<number>(0)
// 点击行
function rowClick(record: articleRes) {
    articleId.value = record.id
    examineStatus.value = record.examine_status || 0
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
const form = ref<articleRes>({ ...initArticleFormMock });

// 封禁文章函数
async function banArticle(record: articleRes) {
    const params = <articleExamineParams>{
        id: record.id,
        examine_status: 0
    }
    if (record.examine_status) {
        params.examine_status = 0
        const res = await adminChangeExamine(params)
        if (res.code) {
            Message.error(res.msg)
            return
        }
        Message.success("封禁成功")
        fListRef.value.getList()
    } else {
        params.examine_status = 1
        const res = await adminChangeExamine(params)
        if (res.code) {
            Message.error(res.msg)
            return
        }
        Message.success("解封成功")
        fListRef.value.getList()
    }


}
// 编辑文章函数
function editArticle(record: articleRes) {
    articleId.value = record.id
    editVisible.value = true
}
// 打开创建窗口
function addArticle() {
    addVisible.value = true
}

const deleteArticle = async (keyList: number[] | string[]) => {
    if (!keyList?.length) return
    if (keyList.length >= 2) {
        // 批量并行删除
        await Promise.all(
            keyList.map(async (id) => {
                const res = await deleteArticleApi(Number(id))
                if (!res.code) {
                    Message.success(res.msg)
                    fListRef.value.getList()
                    return
                } // 根据实际业务显示成功/失败提示
            })
        )


    } else {
        // 单个删除
        const res = await deleteArticleApi(Number(keyList[0]))
        if (res.code) {
            Message.error(res.msg)
            return
        }
        Message.success("删除成功")
        fListRef.value.getList()
    }

}

const provinceList = ref(provinceData)

// 根据省编码和市编码查找城市名称（支持三级行政区）
const findCityName = (provinceCode: number | undefined, cityCode: number | undefined) => {
    const province = provinceList.value.find(p => p.value === provinceCode);
    if (!province) return '未知省市';

    // 优先查找市级
    const city = province.city?.find(c => c.value === cityCode);
    if (city) return province.name + city.name;

    return province.name + '未知城市';
};

const featured = async (record: articleRes) => {
    const params = <articleIsBannerParams>{
        id: record.id,
        is_banner: 0
    }
    if (record.is_banner) {
        params.is_banner = 0
        const res = await adminChangeBanner(params)
        if (res.code) {
            Message.error(res.msg)
            return
        }
        Message.success("精选成功")
        fListRef.value.getList()
    } else {
        params.is_banner = 1
        const res = await adminChangeBanner(params)
        if (res.code) {
            Message.error(res.msg)
            return
        }
        Message.success("取消精选成功")
        fListRef.value.getList()
    }
}
</script>

<template>
    <div class="div">
        <a-modal width="70%" v-model:visible="addVisible" title="添加文章">
            <articleForm :privonceOpen="false" :articleId="articleId"></articleForm>
        </a-modal>
        <a-modal width="70%" v-if="editVisible" v-model:visible="editVisible" title="编辑文章">
            <articleForm :articleId="articleId" class="edit-modal"></articleForm>
        </a-modal>
        <!-- 使用 w_list 组件，并传入必要的 props 和插槽 -->
        <!-- <w_list @add="visible=true" ref="fListRef" @row-click="rowClick" :actionGroup="actionGroup" :filterGroup="filters" :url="getUserListApi" :columns="columns"> -->
        <w_list ref="fListRef" ban-lable="文章" :actionGroup="actionGroup" no-edit no-batch-delete no-default-delete
            @delete="deleteArticle" @add="addArticle" @edit="editArticle" @row-click="rowClick" @ban="banArticle"
            :url="adminGetArticleListApi" :columns="columns">
            <!-- 自定义插槽列的内容，用于渲染文章封面 -->
            <template #cover="{ record }: { record: articleRes }" class="cover">
                <a-image width="196" height="110" class="cover" :src="record.cover"></a-image>
            </template>
            <!-- 自定义插槽列的内容，用于显示文章省份 -->
            <template #province_code="{ record }: { record: articleRes }">
                <a-tag color="orange">{{ findCityName(record.province_code, record.city_code) }}</a-tag>
            </template>
            <!-- 自定义插槽列的内容，用于显示文章标签 -->
            <template #tags="{ record }: { record: articleRes }">
                <a-tag v-for="tag in record.tags" :key="tag.id" color="blue" style="margin-left: 5px;">{{ tag.name
                    }}</a-tag>
            </template>
            <!-- 自定义插槽列的内容，用于显示文章状态 -->
            <template #examine_status="{ record }: { record: articleRes }">
                <a-tag v-if="record.examine_status === 0" color="red">封禁中</a-tag>
                <a-tag v-else color="green">正常</a-tag>
            </template>
            <template #action_left="{ record }: { record: articleRes }">
                <a-popconfirm v-if="record.is_banner" @ok="featured(record)" content="确定要取消精选该文章吗"
                    type="warning">
                    <a-button status="danger">取消精选</a-button>
                </a-popconfirm>
                <a-popconfirm v-else @ok="featured(record)" content="确定要精选该文章吗" type="warning">
                    <a-button status="success">精选</a-button>
                </a-popconfirm>
            </template>
        </w_list>
    </div>
</template>


<style lang="less">
.cover {
    height: 110px;
    width: 110px;
}
</style>