<script setup lang="ts">
import { reactive, computed, ref, watch } from 'vue'
import { adminCreateSiteApi,adminUpdateSiteApi } from '@/api/site'
import type { siteRes } from '@/types/site'
import { initSite } from '@/mock/siteMock'
import { provinceData } from '@/mock/commonMock'
import type { optionsType } from '@/types/index'
import cover_cutter from '@/components/web/cover-cutter.vue'
import { Message } from '@arco-design/web-vue'
// 定义初始表单结构
const siteform = reactive<siteRes>(initSite)
interface Props {
    siteId?: number
    privonceOpen?: boolean
    currentSite?: siteRes
    siteAdd?: number
}

const initSitemForm = () => {
    siteform.id = props.currentSite?.id || 0
    siteform.name = props.currentSite?.name || ""
    siteform.desc = props.currentSite?.desc || ""
    siteform.address_detail = props.currentSite?.address_detail || ""
    siteform.images = props.currentSite?.images || ""
    siteform.province_code = props.currentSite?.province_code || 0
    siteform.city_code = props.currentSite?.city_code || 0
}
const resetForm = () => {
    siteform.id = 0
    siteform.name = ""
    siteform.desc = ""
    siteform.address_detail = ""
    siteform.images = ""
    siteform.province_code = 0
    siteform.city_code = 0
}

// 接收父组件传递的参数
const props = defineProps<Props>()
if (props.siteId) {
    getData()
}

async function getData() {
    await initSitemForm()
    initData()
}


const emits = defineEmits<{
    'create':[createStatus:number]
    'edit':[editStatus:number]
}>()


const formRef = ref()
const createStatus = ref(0)
// 创建和更新逻辑
async function create() {
    siteform.province_code = selectedProvinceValue.value
    siteform.city_code = selectedCityValue.value
    const res = await adminCreateSiteApi(siteform)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    emits("create", 1)
    Message.success(res.msg)
}
async function update(){
    siteform.province_code = selectedProvinceValue.value
    siteform.city_code = selectedCityValue.value
    const res = await adminUpdateSiteApi(siteform)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
    emits("edit", 1)
}

function coverBack(data: string) {
    siteform.images = data
}



function coverRemove() {
    siteform.images = ""
}

// 省份选项
// 响应式数据
const provinceList = ref(provinceData);
const selectedProvinceValue = ref<number>();
const selectedCityValue = ref<number>();
const loading = ref(props.privonceOpen);

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
// 初始化数据
const initData = async () => {
    initSelection();
    loading.value = false;
};

// 初始化选中状态
const initSelection = () => {
    console.log(siteform)
    if (siteform.province_code) {
        selectedProvinceValue.value = siteform.province_code;

        if (siteform.city_code) {
            selectedCityValue.value = siteform.city_code;
        }
    }
};

// 处理省份变化
const handleProvinceChange = () => {
    selectedCityValue.value = undefined;
};

// 添加watch监听
watch(
    () => props.siteAdd,
    (newVal) => {
        if (newVal) {
            initSitemForm()
        }
    }
)

// 添加弹窗关闭处理
watch(
    () => props.siteId,
    () => {

        Object.assign(siteform, initSite)
    }
)

</script>

<template>
    <a-form class="siteForm" ref="formRef" :model="siteform" :label-col-props="{ span: 0 }"
        :wrapper-col-props="{ span: 24 }">
        <a-form-item field="title" validate-trigger="blur" :rules="[{ required: true, message: '请输入景点名字' }]">
            <a-input v-model="siteform.name" placeholder="请输入景点名字（建议20字以内）"></a-input>
        </a-form-item>
        <a-form-item>
            <a-textarea v-model="siteform.desc" :auto-size="{ minRows: 3, maxRows: 4 }" placeholder="景点简介"></a-textarea>
        </a-form-item>
        <a-form-item>
            <a-textarea v-model="siteform.address_detail" :auto-size="{ minRows: 3, maxRows: 4 }"
                placeholder="详细地址"></a-textarea>
        </a-form-item>
        <a-collapse :default-active-key="[1]" :bordered="false">
            <a-collapse-item header="更多设置" :key="1">
                <a-form :label-col-props="{ span: 4 }" :wrapper-col-props="{ span: 8 }" class="form2" label-align="left"
                    :model="siteform">
                    <a-form-item label="请选择省市">
                        <!-- 省份选择 -->
                        <a-select v-model="selectedProvinceValue" :options="provinceOptions" placeholder="请选择省份"
                            @change="handleProvinceChange" :disabled="loading" class="selector-item" />

                        <!-- 城市选择 -->
                        <a-select v-model="selectedCityValue" :options="cityOptions" placeholder="请选择城市"
                            :disabled="!selectedProvinceValue" class="selector-item" />
                    </a-form-item>
                    <a-form-item content-class="article_cover_col" label="设置文章封面">
                        <div class="up">
                            <cover_cutter rate="16:9" style="width: 100%" @ok="coverBack">
                                <div class="cover_mask">
                                    <IconImage></IconImage>
                                    <span>点击上传封面图（选填）</span>
                                </div>
                            </cover_cutter>
                        </div>
                        <div class="show" v-if="siteform.images">
                            <a-image :src="siteform.images" :height="100">
                                <template #extra>
                                    <IconDelete @click="coverRemove"></IconDelete>
                                </template>
                            </a-image>
                        </div>
                    </a-form-item>
                </a-form>
            </a-collapse-item>
        </a-collapse>

        <div class="actions">
            <a-button type="primary" v-if="props.siteId" @click="update()">更新</a-button>
            <a-button type="primary" v-else @click="create()">发布景点</a-button>
        </div>
    </a-form>
</template>

<style lang="less">
.siteForm {

    .arco-collapse {
        margin-bottom: 10px;
    }

    .arco-collapse-item {
        .arco-collapse-item-header {
            padding: 0;
            border: none;

            .arco-collapse-item-icon-hover {
                left: 62px;
            }
        }

        .arco-collapse-item-content {
            padding-right: 0;
            background: transparent;
            padding-left: 0;
        }
    }

    .form2 {
        .arco-row {
            display: flex;
            flex-direction: column;
        }

        .cover_mask {
            width: 100%;
            height: 120px;
            cursor: pointer;
            border: @w_border;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: var(--color-text-2);

            span {
                font-size: 12px;
            }

            svg {
                font-size: 30px;
            }
        }

        .article_cover_col {
            flex-direction: column;

            >div {
                width: 100%;
            }

            .show {
                margin-top: 10px;

                .arco-image-footer {
                    display: flex;
                    justify-content: center;

                    .arco-image-footer-extra {
                        padding-left: 0;

                        svg {
                            font-size: 20px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }

    .actions {
        .arco-btn {
            margin-right: 10px;
        }
    }
}
</style>