<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
// 引入列表组件
import w_list from '@/components/admin/w_list.vue';
import type { columnType, filterGroupType } from "@/components/admin/w_list.vue"
import siteForm from '@/components/common/siteForm.vue';
import articleForm from '@/components/common/articleForm.vue'
import { provinceData } from '@/mock/commonMock'
import { adminGetSiteListApi, adminDeleteSiteApi } from '@/api/site'
import type { siteRes } from '@/types/site'
import { Message } from '@arco-design/web-vue';
import siteCard from '@/components/common/siteCard.vue';


// 定义表格列的配置
const columns: columnType[] = [
    { title: "ID", dataIndex: 'id', width: 50 }, // 普通列，显示文章ID
    { title: "景点名", dataIndex: 'name', width: 100, ellipsis: true, tooltip: true }, // 普通列，显示文章名
    { title: "封面", slotName: 'images', width: 250 }, // 插槽列，使用名为 "cover" 的插槽
    { title: "省市区", slotName: 'province_code' },
    { title: "地址详情", dataIndex: 'address_detail', ellipsis: true, tooltip: true }, // 普通列，显示阅读数
    { title: "景点介绍", dataIndex: 'desc', ellipsis: true, tooltip: true }, // 文章标签
    { title: "创建时间", slotName: 'created_at', dataFormat: "date" }, // 普通列，显示创建时间，可自定义字段判断使用哪个函数
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
                        const res = await adminDeleteSiteApi(Number(id))
                        if (!res.code) {
                            Message.success(res.msg)
                            fListRef.value.getList()
                            return
                        } // 根据实际业务显示成功/失败提示
                    })
                )
            } else {
                // 单个删除
                const res = await adminDeleteSiteApi(Number(keyList[0]))
                if (res.code) {
                    Message.error(res.msg)
                    return
                }
                Message.success("删除成功")
                fListRef.value.getList()
            }
        }
    },
]
const fListRef = ref()
// // 定义过滤组
// const filters: filterGroupType[] = [
//     {
//         label: "角色过滤",
//         source: [
//             { label: "管理员", value: 1 },
//             { label: "普通用户", value: 2 },
//         ],
//         column: "role",
//         width: 140,
//         // callback: (value: number|string) => {
//         //     console.log("父",value)
//         // }
//     },
//     {
//         label: "IP过滤",
//         source: [
//             { label: "外网", value: 1 },
//             { label: "内网", value: 2 },
//         ],
//         column: "ip",
//         width: 140,
//         // callback: (value: number|string) => {
//         //     console.log("父",value)
//         // }
//     },
//     // {
//     //     label: "文章分类",
//     //     source: articleCategoryOptionApi,
//     //     column: "category",
//     //     width: 140,
//     //     callback: (value: number | string) => {
//     //         console.log(fListRef.value?.data)
//     //         fListRef.value.getList({ role: value })
//     //     }
//     // }
// ]
const siteId = ref<number>(0)
const currentSite = ref<siteRes>()
const siteAdd = ref<number>(0)
const examineStatus = ref<number>(0)
// 点击行
function rowClick(record: siteRes) {
    siteId.value = record.id
    currentSite.value = record
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

// 编辑文章函数
function editArticle(record: siteRes) {
    siteId.value = record.id
    currentSite.value = record
    editVisible.value = true
}
// 打开创建窗口
function addArticle() {
    siteAdd.value = 3
    addVisible.value = true
}

const deleteSite = async (keyList: number[] | string[]) => {
    if (!keyList?.length) return
    if (keyList.length >= 2) {
        // 批量并行删除
        await Promise.all(
            keyList.map(async (id) => {
                const res = await adminDeleteSiteApi(Number(id))
                if (!res.code) {
                    Message.success(res.msg)
                    fListRef.value.getList()
                    return
                } // 根据实际业务显示成功/失败提示
            })
        )


    } else {
        // 单个删除
        const res = await adminDeleteSiteApi(Number(keyList[0]))
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
const handleCancel = () => {
    siteAdd.value = 0
}
const halderCreate = (createStatus: number) => {
    addVisible.value = false
    fListRef.value.getList()
}
const halderEdit = (editStatus: number) => {
    editVisible.value = false
    fListRef.value.getList()
}

const siteSearch = ref('')
const addressSearch = ref('')
const search = (status: number) => {
    if (status === 1) {
        fListRef.value.getList({ name: siteSearch.value })
    } else {
        fListRef.value.getList({ address_detail: addressSearch.value })
    }
}

// 省份选项
const selectedProvinceValue = ref<number>();
const selectedCityValue = ref<number>();

// 计算属性：省份选项
const provinceOptions = computed(() =>
    provinceList.value.map(p => ({
        label: p.name,
        value: p.value
    }))
);

// 计算属性：城市选项
const cityOptions = computed(() => {
    const province = provinceList.value.find(p => p.value === selectedProvinceValue.value);
    return province?.city?.map(c => ({
        label: c.name,
        value: c.value
    })) || [];
});
const clearProvince = () => {
    selectedCityValue.value = undefined;
}
const searchAddress = () => {
    fListRef.value.getList({
        province_code: selectedProvinceValue.value,
        city_code: selectedCityValue.value
    });
};
</script>

<template>
    <div class="div">
        <a-modal width="70%" v-model:visible="addVisible" title="添加景点" @close="handleCancel">
            <siteForm @create="halderCreate" :siteAdd="siteAdd"></siteForm>
        </a-modal>
        <a-modal v-if="editVisible" width="70%" v-model:visible="editVisible" title="编辑景点">
            <siteForm @edit="halderEdit" :siteId="siteId" :currentSite="currentSite"></siteForm>
        </a-modal>
        <a-modal v-model:visible="lookVisible" title="景点预览" class="preview">
            <siteCard :currentSite="currentSite"></siteCard>
        </a-modal>
        <!-- 使用 w_list 组件，并传入必要的 props 和插槽 -->
        <!-- <w_list @add="visible=true" ref="fListRef" @row-click="rowClick" :actionGroup="actionGroup" :filterGroup="filters" :url="getUserListApi" :columns="columns"> -->
        <w_list ref="fListRef" ban-lable="文章" no-search no-ban no-batch-delete no-default-delete @delete="deleteSite"
            @add="addArticle" @edit="editArticle" @row-click="rowClick" :url="adminGetSiteListApi" :columns="columns"
            :action-group="actionGroup">
            <!-- 自定义插槽列的内容，用于渲染文章封面 -->
            <template #images="{ record }: { record: siteRes }" class="cover">
                <a-image width="196" height="110" class="image" :src="record.images"></a-image>
            </template>
            <!-- 自定义插槽列的内容，用于显示文章省份 -->
            <template #province_code="{ record }: { record: siteRes }">
                <a-tag color="orange">{{ findCityName(record.province_code, record.city_code) }}</a-tag>
            </template>
            <template #search_other class="search_other">
                <a-input-search placeholder="请输入景点名" @search="search(1)" v-model="siteSearch"></a-input-search>
                <a-input-search placeholder="请输入详细地址" @search="search(2)" v-model="addressSearch"></a-input-search>
                <a-select v-model="selectedProvinceValue" :options="provinceOptions" placeholder="请选择省份" allow-clear
                    class="selector-item" @clear="clearProvince" @change="searchAddress" />
                <a-select v-model="selectedCityValue" :disabled="!selectedProvinceValue" :options="cityOptions"
                    placeholder="请选择城市" @clear="clearProvince" @change="searchAddress" allow-clear
                    class="selector-item" />
            </template>
            <template #action_left>
                <a-button type="primary" @click="lookVisible = true">预览</a-button>
            </template>
        </w_list>
    </div>
</template>


<style lang="less">
.image {
    height: 110px;
    width: 110px;
}

.arco-modal-footer {
    display: none;
}

.selector-item {
    // width: 300px;
    margin-right: 10px;
}
.arco-modal-body{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>