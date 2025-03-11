<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import cover_cutter from '@/components/web/cover-cutter.vue'
import type { articleRes, articleCreateReq } from '@/types/artrcle'
import { userGetArticleDetailApi, createArticleApi } from '@/api/article'
import { userGetTagListApi } from '@/api/tag'
import type { tagQueryListReq, tagRes } from '@/types/tag'
import { reactive } from "vue";
import { Message } from "@arco-design/web-vue";
import { initArticleFormMock, articleMockList } from "@/mock/articleMock";
import { provinceData } from '@/mock/commonMock'
import { onUploadImg } from '@/api/common'
import { userStore } from '@/stores/user-store';  // 导入用户状态管理store
// 引入API相关的类型定义
import type { optionsType } from "@/types/index"
// import { provinceDataList } from '@/mock/commonMock'

const puserStore = userStore();  // 获取用户store实例
puserStore.loadUserInfo();  // 加载用户信息
const userInfo = ref();  // 声明userInfo，保存用户信息
if (puserStore.isLogin) {  // 如果用户已经登录
    userInfo.value = puserStore.userInfo  // 设置userInfo为已登录的用户信息
}

// 定义初始表单结构
const form = reactive<articleRes>(initArticleFormMock)
const articleCreate = reactive<articleCreateReq>({
    // 文章标题，必填
    title: '',
    // 文章描述，选填，文章的简短描述
    desc: '',
    // 封面图片，选填，文章的封面图URL
    cover: '',
    // 文章内容，必填
    content: '',
    // 相关联用户id
    user_id: 0,
    // 省份代码
    province_code: 0,
    // 城市代码
    city_code: 0,
    tags: []
})
interface Props {
    articleId?: number
    privonceOpen?: boolean
    articleAdd?: number
}
// 接收父组件传递的参数
const props = defineProps<Props>()
if (props.articleId) {
    getData()
}
// 下拉菜单选项
const tagOptions = ref<string[]>([])
const tags = ref<string[]>([])
async function getData() {
    const res = await userGetArticleDetailApi(props.articleId as number)
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
    form.creator = resData.creator
    form.tags = resData.tags
    form.examine_status = resData.examine_status
    initData()
    resData.tags?.forEach((item) => {
        tagOptions.value.push(item.name)
        tags.value.push(item.name)
    })

}
const tagSearchLoading = ref(false)
const createTag = (value: string) => {
    if (value) {
        const params = <tagQueryListReq>{
            name: value
        }
        tagSearchLoading.value = true;
        let tagTemp = []
        window.setTimeout(async () => {
            const res = await userGetTagListApi(params)
            if (res.code) {
                Message.error(res.msg)
            }
            if (res.data.length === 0) {
                tagOptions.value = []
            } else {
                for (let index = 0; index < res.data.length; index++) {
                    tagTemp.push(res.data[index].name)
                }
                tagOptions.value = tagTemp
            }
            tagSearchLoading.value = false;
        }, 2000)
    } else {
        tagOptions.value = []
    }
}





const emits = defineEmits(["ok"])


// getOptions(categoryOptions, articleCategoryOptionsApi)
// getOptions(tagOptions, articleTagOptionsApi)


const formRef = ref()

// 创建和更新逻辑
async function create() {
    articleCreate.title = form.title
    articleCreate.desc = form.desc
    articleCreate.cover = form.cover
    articleCreate.content = form.content
    articleCreate.user_id = userInfo.value.id
    articleCreate.province_code = selectedProvinceValue.value
    articleCreate.city_code = selectedCityValue.value
    tags.value.forEach(tag => {
        articleCreate.tags?.push(tag)
    })
    const res = await createArticleApi(articleCreate)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success("发布成功")
    form.title = ''
    form.desc = ''
    form.cover = ''
    form.content = ''
    form.province_code = 0
    form.city_code = 0
    form.creator = 0
    form.tags = []
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
    if (form.province_code) {
        selectedProvinceValue.value = form.province_code;

        if (form.city_code) {
            selectedCityValue.value = form.city_code;
        }
    }
};

// 重置表单数据
const resetForm = () => {
    form.title = ''
    form.desc = ''
    form.cover = ''
    form.content = ''
    form.province_code = 0
    form.city_code = 0
    form.creator = 0
    form.tags = []

    // 重置省份、城市选择
    selectedProvinceValue.value = undefined;
    selectedCityValue.value = undefined;

    // 重置标签选择
    tags.value = [];
};

// 处理省份变化
const handleProvinceChange = () => {
    selectedCityValue.value = undefined;
};

onMounted(() => {
    // 如果初始状态是添加模式，主动重置一次
    if (!props.articleId) {
        resetForm();
    }
});

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
                        <a-select allow-create allow-clear multiple :loading="tagSearchLoading" :max-tag-count="4"
                            :options="tagOptions" v-model="tags" :limit="5" placeholder="请输入标签"
                            @search="createTag"></a-select>
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