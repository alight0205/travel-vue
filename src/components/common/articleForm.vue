<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import cover_cutter from '@/components/web/cover-cutter.vue'
import type { articleRes } from '@/types/artrcle'
import { adminGetArticleDetailApi, createArticleApi } from '@/api/article'
import { reactive } from "vue";

import { Message } from "@arco-design/web-vue";
import router from "@/router";
import { initArticleFormMock, articleMockList } from "@/mock/articleMock";
import { provinceData } from '@/mock/commonMock'
import type { optionsType } from '@/types/index'
import { onUploadImg } from '@/api/common'
// import { provinceDataList } from '@/mock/commonMock'

// const store = userStorei()
// 定义初始表单结构
const form = reactive<articleRes>(initArticleFormMock)
interface Props {
    articleId?: number
    privonceOpen?: boolean
}
// 接收父组件传递的参数
const props = defineProps<Props>()
if (props.articleId) {
    getData()
}
// 下拉菜单选项
const tagOptions = ref<optionsType[]>([])
const tags = ref<string[]>([])
async function getData() {
    const res = await adminGetArticleDetailApi(props.articleId as number)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    const resData = res.data
    form.id = resData.id
    form.title = resData.title
    form.desc = resData.desc
    form.cover = resData.cover
    form.content = resData.content
    form.read_num = resData.read_num
    form.is_banner = resData.is_banner
    form.province_code = resData.province_code
    form.city_code = resData.city_code
    form.created_at = resData.created_at
    form.updated_at = resData.updated_at
    form.user_id = resData.user_id
    form.tags = resData.tags
    form.examine_status = resData.examine_status
    initData()
    // for (let i in resData.tags) {
    //     tagOptions.value.push({
    //         label: resData.tags[i].name,
    //         value: resData.tags[i].id
    //     })
    // }
    resData.tags?.forEach((item) => {
        tagOptions.value.push({
            label: item.name,
            value: item.id
        })
        tags.value.push(item.id)
    })

}
const createTag = () => {
    console.log(tags.value)
}





const emits = defineEmits(["ok"])


// getOptions(categoryOptions, articleCategoryOptionsApi)
// getOptions(tagOptions, articleTagOptionsApi)


const formRef = ref()

// 创建和更新逻辑
async function create() {
    // const val = await formRef.value.validate()
    // if (val) return
    // emits("ok", form)
    const res = await createArticleApi(form)
    console.log(res)
}

function coverBack(data: string) {
    form.cover = data
}


async function paste(e: ClipboardEvent) {
    // const text = e.clipboardData?.getData('text');
    // 获取图片
    // 读取到图片对象
    const file = e.clipboardData?.files[0];
    if (file) {
        // 粘贴的是图片
        return
    }
}
function coverRemove() {
    form.cover = ""
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
    console.log(form)
    if (form.province_code) {
        selectedProvinceValue.value = form.province_code;

        if (form.city_code) {
            selectedCityValue.value = form.city_code;
        }
    }
};

// 处理省份变化
const handleProvinceChange = () => {
    selectedCityValue.value = undefined;
};



</script>

<template>
    <a-form class="f_article_form_com" ref="formRef" :model="form" :label-col-props="{ span: 0 }"
        :wrapper-col-props="{ span: 24 }">
        <a-form-item field="title" validate-trigger="blur" :rules="[{ required: true, message: '请输入文章标题' }]">
            <a-input v-model="form.title" placeholder="请输入标题（建议20字以内）"></a-input>
        </a-form-item>
        <a-form-item>
            <a-textarea v-model="form.desc" :auto-size="{ minRows: 3, maxRows: 4 }" placeholder="文章简介"></a-textarea>
        </a-form-item>
        <a-form-item field="content" validate-trigger="blur" :rules="[{ required: true, message: '请输入文章内容' }]">
            <MdEditor @onUploadImg="onUploadImg" @paste="paste" v-model="form.content" placeholder="请输入文章内容"></MdEditor>
        </a-form-item>
        <a-collapse :default-active-key="[1]" :bordered="false">
            <a-collapse-item header="更多设置" :key="1">
                <a-form :label-col-props="{ span: 4 }" :wrapper-col-props="{ span: 8 }" class="form2" label-align="left"
                    :model="form">
                    <a-form-item label="请选择发布分区">
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
                        <div class="show" v-if="form.cover">
                            <a-image :src="form.cover" :height="100">
                                <template #extra>
                                    <IconDelete @click="coverRemove"></IconDelete>
                                </template>
                            </a-image>
                        </div>
                        <template #help>
                            <!-- <div v-if="store.siteInfo.qiNiu.enable">
                                将上传图片到七牛云上
                            </div> -->
                        </template>
                    </a-form-item>
                    <a-form-item label="文章标签">
                        <a-select allow-create allow-clear multiple :max-tag-count="4" :options="tagOptions"
                            v-model="tags" :limit="5" placeholder="请输入标签" @change="createTag"></a-select>
                    </a-form-item>
                </a-form>
            </a-collapse-item>
        </a-collapse>

        <div class="actions">
            <a-button type="primary" @click="create()">{{ props.articleId ? '更新' : '发布文章' }}</a-button>
        </div>
    </a-form>
</template>

<style lang="less">
.f_article_form_com {

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