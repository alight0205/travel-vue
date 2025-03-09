<script setup lang="ts">
// 引入Vue的reactive函数
import { ref, reactive } from "vue"
// 引入API相关的类型定义
import type { listResponse, paramsType, baseResponse, optionsType, optionsFunc } from "@/types/index"
// 引入Arco Design Vue的Message组件和表格列类型
import { Message, type TableColumnData, type TableData, type TableRowSelection } from "@arco-design/web-vue";
import { dataTemFormat, type dataTimeType } from "@/utils/date"
// import { deleteUserApi } from '@/api/user'

export interface columnType extends TableColumnData {
    dataFormat?: dataTimeType
}

// 定义操作组类型
export interface actionGroupType {
    label: string,
    value?: number
    callback: (keyList: number[]) => void
}
// 定义过滤组类型
export interface filterGroupType {
    label: string,
    source: optionsType[] | optionsFunc
    options?: optionsType[]
    column?: string
    params?: paramsType
    callback?: (value: number | string) => void
    width?: number
}

// 定义组件的Props接口
interface Props {
    // 请求数据的URL函数，接受参数并返回Promise
    url: (params?: paramsType) => Promise<baseResponse<listResponse<any>>>
    // 表格列配置，支持动态列和插槽列
    columns: columnType[]
    rowKey?: string
    noDefaultDelete?: boolean // 不启用默认删除
    noAdd?: boolean // 不启用添加
    noEdit?: boolean // 不启用编辑
    noDelete?: boolean // 不启用删除
    noBan?: boolean // 不启用禁用
    noSearch?: boolean // 不启用搜索
    noBatchDelete?: boolean // 不启用批量删除
    searchPlaceholder?: string // 搜索框提示
    addLable?: string // 添加按钮的文字
    editLable?: string // 编辑按钮的文字
    deleteLable?: string // 删除按钮的文字
    banLable?: string // 禁用按钮的文字
    noActionGroup?: boolean // 不启用操作组
    noCheck?: boolean // 不启用选择
    actionGroup?: actionGroupType[] // 操作组配置
    filterGroup?: filterGroupType[] // 过滤组配置
    noPages?: boolean // 不启用分页
    page_size?: number
}

// 使用defineProps定义组件的Props
const props = defineProps<Props>()
// 解构rowKey没有就默认为id
const {
    rowKey = "id",
    noDefaultDelete = false,
    searchPlaceholder = "搜索",
    addLable = "添加",
    editLable = "编辑",
    deleteLable = "删除",
    banLable = "用户",
    page_size = 10
} = props

// 使用reactive定义响应式数据，存储列表数据和总数
const data = reactive<listResponse<any>>({
    list: [], // 列表数据
    total: 0  // 数据总数
})

// 使用reactive定义请求参数
const params = reactive<paramsType>({
    // 请求参数，可以根据实际需求扩展
    page_size: props.noPages ? -1 : page_size,
    page_num: 1
})

// 数据加载中状态
const loading = ref(false)

// 获取列表数据的异步函数
async function getList(newParams?: paramsType) {
    // 请求前变成加载状态
    loading.value = true
    if (newParams) {
        Object.assign(params, newParams)
    }
    // 调用传入的URL函数获取数据
    const res = await props.url(params)
    // 请求后取消加载状态
    loading.value = false
    // 如果返回的code不为0，表示请求失败，显示错误信息
    if (res.code) {
        Message.error(res.msg)
        return
    }
    // 请求成功，更新列表数据和总数
    data.list = res.data.list || []
    data.total = res.data.total
}

// 组件加载时调用getList函数获取数据
getList()

const emits = defineEmits<{
    'delete': [keyList: number[] | string[]]
    'add': []
    'edit': [record: any]
    'ban': [record: any]
    'rowClick': [record: any]
}>()
// 删除用户函数
async function deleteBtn(record: any) {
    const key = record[rowKey]
    baseDelete([key])

}
// 删除用户函数
async function baseDelete(keyList: number[]) {
    if (noDefaultDelete) {
        // 不启用默认删除
        emits("delete", keyList)
        return
    }
    const array = /\"(.*?)\"/.exec(props.url.toString())
    // console.log(array)
    if (array?.length != 2) {
        return
    }
    // const url = array[1]
    // const res = await deleteUserApi(url, keyList)
    // if (res.code) {
    //     Message.error(res.msg)
    //     return
    // }
    // getList()
    // Message.success(res.msg)
}
// 添加用户函数
function add() {
    emits("add")
}

// 更新用户函数
function update(record: any) {
    emits("edit", record)
}
// 
function rowClick(record: TableData, ev: Event) {
    emits("rowClick", record)
}

function ban(record: any) {
    emits("ban", record)
}

// 搜索函数
function search() {
    getList()
}

// 刷新函数
function refresh() {
    getList()
    Message.success("刷新成功")
}
// 分页切换函数
function pageChange() {
    getList()
}
// 选中项
const selectedKeys = ref([]);
// 选中项配置
const rowSelection = reactive<TableRowSelection>({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false,
});
// 操作组配置
const actionGroupOptions = ref<actionGroupType[]>([])
// 初始化操作组
function initActionGroup() {
    let index = 0
    if (!props.noBatchDelete) {
        actionGroupOptions.value.push({
            label: "批量删除",
            value: 1,
            callback: (keyList: number[]) => {
                // 批量删除
                baseDelete(keyList)
                // 清空选中项
                selectedKeys.value = []
            }
        })
        index = 1
    }

    const actionGroup = props.actionGroup || []
    for (const action of actionGroup) {
        index++
        actionGroupOptions.value.push({
            label: action.label,
            value: index,
            callback: action.callback
        })
    }
}
// 初始化操作组
initActionGroup()
// 操作组值
const actionValue = ref<number>()
// 操作组执行函数
function actionGroupAction() {
    const action = actionGroupOptions.value.find((value) => value.value == actionValue.value)
    if (action) {
        action.callback(selectedKeys.value)
    }
}

// 过滤组配置
const filterGroups = ref<filterGroupType[]>([])
// 初始化过滤组
async function initFilterGroup() {
    filterGroups.value = []
    for (const filter of props.filterGroup || []) {
        if (typeof filter.source == "function") {
            const res = await filter.source(filter.params)
            if (res.code) {
                Message.error(res.msg)
                continue
            }
            filter.options = res.data
        } else {
            filter.options = filter.source
        }
        if (!filter.callback) {
            // 如果没有callback，那就走默认行为
            filter.callback = (value) => {
                if (filter.column) {
                    const p: { [key: string]: any } = {}
                    p[filter.column] = value
                    getList(p)
                }
            }
        }
        filterGroups.value.push(filter)
    }

}
// 初始化过滤组
initFilterGroup()

// 定义暴露方法，用于外部调用
defineExpose({
    getList,
    data
})
</script>

<template>
    <!-- 列表组件容器 -->
    <div class="w_list_com">
        <!-- 列表头部，包含操作按钮、搜索框等 -->
        <div class="w_list_head">
            <!-- 创建按钮插槽，用于扩展其他创建功能 -->
            <slot name="action_add" class="action_create action_margin">
                <!-- 创建按钮 -->
                <div class="action_create action_margin" v-if="!noAdd">
                    <a-button @click="add">{{ addLable }}</a-button>
                </div>
            </slot>
            <!-- 下拉选择框 -->
            <div class="action_group action_margin" v-if="!noActionGroup">
                <!-- 操作组选择框 -->
                <a-select style="width: 140px;" v-model="actionValue" :options="actionGroupOptions"
                    placeholder="选择"></a-select>
                <!-- 执行按钮 -->
                <a-button v-if="actionValue" type="primary" status="danger" @click="actionGroupAction">执行</a-button>
            </div>
            <!-- 搜索输入框 -->
            <div class="action_search action_margin" v-if="!noSearch">
                <a-input-search :placeholder="searchPlaceholder" @search="search"
                    v-model="params.title"></a-input-search>
            </div>
            <!-- 筛选框 -->
            <div class="action_filter action_margin">
                <a-select v-for="filter in filterGroups" allow-clear :style="{ width: filter.width + 'px' }"
                    @change="filter.callback" :placeholder="filter.label"
                    :options="filter.options as optionsType[]"></a-select>
            </div>
            <!-- 搜索插槽，用于扩展其他搜索功能 -->
            <div class="action_search_slot action_margin">
                <slot name="search_other"></slot>
            </div>
            <!-- 刷新按钮 -->
            <div class="action_flush" @click="refresh">
                <icon-refresh></icon-refresh>
            </div>
        </div>
        <!-- 列表主体，包含表格和分页 -->
        <div class="w_list_body">
            <!-- 加载中的旋转图标 -->
            <a-spin :loading="loading" tip="加载中...">
                <!-- 表格 -->
                <div class="w_list_table">
                    <!-- 使用 a-table 组件渲染表格 -->
                    <a-table @row-click="rowClick" :data="data.list" :pagination="false" :row-key="rowKey"
                        v-model:selectedKeys="selectedKeys" :row-selection="props.noCheck ? undefined : rowSelection">
                        <!-- 动态渲染表格列 -->
                        <template #columns>
                            <!-- 遍历传入的列配置 -->
                            <template v-for="col in props.columns">
                                <!-- 如果列配置中有 dataIndex，则渲染普通列 -->
                                <a-table-column v-if="col.dataIndex" v-bind="col"></a-table-column>
                                <!-- 如果列配置中有 slotName，则渲染插槽列 -->
                                <a-table-column v-else-if="col.slotName" v-bind="col">
                                    <!-- 插槽列的内容，通过作用域插槽传递当前行的数据 -->
                                    <template #cell="data">
                                        <div class="col_actions" v-if="col.slotName === 'action'">
                                            <slot v-bind="data" name="action_left"></slot>
                                            <span class="banSection" v-if="!noBan">
                                                <a-popconfirm v-if="data.record.examine_status" @ok="ban(data.record)"
                                                    :content="'确定要封禁该' + banLable + '吗？'" type="warning">
                                                    <a-button status="danger">封禁</a-button>
                                                </a-popconfirm>
                                                <a-popconfirm v-else @ok="ban(data.record)"
                                                    :content="'确定要解封该' + banLable + '吗？'" type="warning">
                                                    <a-button status="success">解封</a-button>
                                                </a-popconfirm>
                                            </span>
                                            <a-button v-if="!noEdit" @click="update(data.record)" type="primary">{{
                                                editLable }}</a-button>
                                            <!-- 确认弹出层 -->
                                            <a-popconfirm v-if="!noDelete" @ok="deleteBtn(data.record)"
                                                content="确定要删除吗？" type="warning">
                                                <a-button type="primary" status="danger">{{ deleteLable }}</a-button>
                                            </a-popconfirm>
                                            <slot v-bind="data" name="action_right"></slot>
                                        </div>
                                        <div v-if="col.slotName === 'created_at'">
                                            {{ dataTemFormat(data.record[col.slotName], col.dataFormat) }}
                                        </div>
                                        <div v-if="col.slotName === 'updated_at'">
                                            {{ dataTemFormat(data.record[col.slotName], col.dataFormat) }}
                                        </div>
                                        <!-- 使用具名插槽，允许父组件自定义列内容 -->
                                        <slot v-else :name="col.slotName" v-bind="data"></slot>
                                    </template>
                                </a-table-column>
                            </template>
                        </template>
                    </a-table>
                </div>
                <!-- 分页 -->
                <div class="w_list_page" v-if="!props.noPages">
                    <a-pagination show-total @change="pageChange" :total="data.total" v-model:current="params.page_num"
                        :page-size="params.page_size"></a-pagination>
                </div>
            </a-spin>
        </div>
    </div>
</template>

<style lang="less">
// 列表组件样式
.w_list_com {
    background-color: var(--color-bg-1);

    // 列表头部样式
    .w_list_head {
        padding: 20px 20px 10px 20px;
        border-bottom: @w_border;
        display: flex;
        align-items: center;
        position: relative;

        .action_search_slot {
            display: flex;

            .arco-input-search {
                margin-right: 10px;

                &:last-child {
                    margin: 0;
                }
            }
        }

        // 操作按钮的右边距
        .action_margin {
            margin-right: 10px;
        }

        .action_group {
            display: flex;
            align-items: center;

            button {
                margin-left: 10px;
            }
        }

        .action_filter {
            .arco-select {
                margin-right: 10px;

                &:last-child {
                    margin-right: 0;
                }
            }
        }

        // 刷新按钮样式
        .action_flush {
            position: absolute;
            right: 20px;
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--color-fill-2);
            cursor: pointer;
            border-radius: 5px;
        }
    }

    // 列表主体样式
    .w_list_body {
        padding: 10px 20px 20px 20px;

        // 加载中旋转图标的样式
        >.arco-spin {
            width: 100%;

            // 分页样式
            .w_list_page {
                display: flex;
                justify-content: center;
                margin-top: 10px;
            }

            .col_actions {
                button {
                    margin-right: 10px;

                    // 取消最后一个按钮的margin
                    &:last-child {
                        margin-right: 0;
                    }
                }

                .banSection {
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>