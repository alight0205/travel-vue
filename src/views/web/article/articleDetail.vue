<script setup lang="ts">
import { ref, onMounted, reactive, watch, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { userGetArticleDetailApi } from '@/api/article'
import { Message } from '@arco-design/web-vue'
import { articleMockList } from '@/mock/articleMock'
import { MdPreview, MdCatalog } from 'md-editor-v3';
import { dateTimeFormat } from '@/utils/date'
import 'md-editor-v3/lib/preview.css';
import Main from '@/components/common/Main.vue'
import { userStore } from "@/stores/user-store";
import { IconEdit } from "@arco-design/web-vue/es/icon";
import articleComment from '@/components/common/articleComment.vue'
const route = useRoute()
const getArticleDetail = async () => {
    // 1. 加强类型校验
    const idParam = route.query.id

    // 处理数组类型参数（如?id=1&id=2）
    const paramValue = Array.isArray(idParam) ? idParam[0] : idParam
    console.log(paramValue)

    if (!paramValue) {
        Message.error('文章ID不能为空')
        return
    }

    // 2. 更安全的数值转换
    const id = Number(paramValue)
    if (isNaN(id) || !Number.isInteger(id)) {
        Message.error('无效的文章ID格式')
        return
    }

    // 3. 添加错误处理
    const res = await userGetArticleDetailApi(id)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Object.assign(data, res.data)
}
const title = ref('')

const scrollElement = document.documentElement;


const store = userStore()
const data = reactive({
    // 文章id
    id: 0,
    // 文章标题，必填
    title: '',
    // 文章描述，选填，文章的简短描述
    desc: '',
    // 封面图片，选填，文章的封面图URL
    cover: '',
    // 文章内容，必填
    content: '',
    // 阅读数，必填，文章的初始阅读数
    read_num: 0,
    // 是否为首页横幅，选填，1表示是首页横幅，0表示不是
    is_banner: 0,
    // 相关联用户id
    creator: 0,
    // 省份代码
    province_code: 0,
    // 城市代码
    city_code: 0,
    // 创建时间，必填，文章的创建时间（ISO 8601格式）
    created_at: '',
    // 更新时间，必填，文章的更新时间（ISO 8601格式）
    updated_at: '',
    // 审核状态（0-未通过，1-已通过，默认为1）
    examine_status: 0,
    userRes: 0,
    // 标签信息
    tags: []
})


watch(() => route.params.id, () => {
    getArticleDetail()
}, { immediate: true })

onMounted(() => {
    const id = route.query.id
    setTimeout(() => {
        if (id) {
            const div = document.getElementById(id as string) as HTMLDivElement
            if (div) {
                document.documentElement.scrollTo({ top: div.offsetTop, behavior: "smooth" })
            }

        }
    }, 500)
})

const isFixed = ref(false)

function scroll() {
    const top = document.documentElement.scrollTop
    if (top >= 210) {
        isFixed.value = true
    } else {
        isFixed.value = false
    }
}

window.addEventListener("scroll", scroll)

onUnmounted(() => {
    window.removeEventListener("scroll", scroll)
})

function goTop() {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" })
}

const articleCommentRef = ref()

function goComment() {
    const div = document.querySelector(".addComment") as HTMLDivElement
    const top = div.offsetTop
    document.documentElement.scrollTo({ top: top, behavior: "smooth" })

    setTimeout(() => {
        articleCommentRef.value.focus()
    }, 800)
}

const goArticleEdit = (id:number)=>{
    Message.success("前往文章编辑"+id)
}
const goUser=(id:number)=>{
    Message.success("前往用户"+id)
}

</script>

<template>
    <Main>
        <div class="articleContainer">
            <div class="article_content">
                <div class="head">
                    <div class="title">
                        <span>{{ data.title }}</span>
                        <IconEdit style="margin-left: 10px; cursor: pointer" title="去编辑" @click="goArticleEdit(data.id)"
                            v-if="data.creator === store.userInfo.id"></IconEdit>
                    </div>
                    <div class="date">{{ dateTimeFormat(data.created_at) }}</div>
                    <div class="tags">
                        <a-tag v-for="tag in data.tags">{{ tag.name }}</a-tag>
                    </div>
                </div>
                <div class="body">
                    <MdPreview :id="`md_${data.id}`" :model-value="data.content"></MdPreview>
                </div>
            </div>
            <articleComment></articleComment>
            <!-- <article_comment ref="articleCommentRef" :article-id="Number(route.params.id)">
            </article_comment> -->
        </div>
        <div class="article_info">
            <div class="user_info">
                <div class="user">
                    <a-avatar @click="goUser(data.creator)" :size="60" image-url="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"></a-avatar>
                </div>
                <div class="nick" @click="goUser(data.creator)">用户昵称</div>
                <div class="data">
                   <div class="desc">这是个人简介</div>
                </div>
            </div>
            <div class="catalog_action" :class="{ isFixed: isFixed }">
                <div class="catalog">
                    <div class="head">文章目录</div>
                    <div class="body scrollbar">
                        <MdCatalog :offsetTop="61" :scrollElementOffsetTop="60" :editorId="`md_${data.id}`"
                            :scrollElement="scrollElement"></MdCatalog>
                    </div>
                </div>
                <div class="article_action">
                    <i title="回到顶部" @click="goTop" class="iconfont icon-icon_zhiding"></i>
                    <i title="去评论" @click="goComment" class="iconfont icon-pinglun1"></i>
                </div>
            </div>

        </div>
    </Main>
</template>


<style lang="less">
.container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 20px;
    min-height: calc(100vh - 100px);
}

.articleContainer {
    width: calc(100% - 280px);

    .article_content {
        background: var(--color-bg-1);
        border-radius: 5px;

        .head {
            padding: 20px 20px 10px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-bottom: @w_border;

            .title {
                font-size: 20px;
                font-weight: 600;
                color: var(--color-text-1);
            }

            .date {
                color: var(--color-text-2);
                font-size: 12px;
                margin: 10px 0;
            }

            .tags {
                span {
                    margin-right: 10px;

                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }

        .body {
            padding: 10px 20px 20px 20px;

            .md-editor-preview-wrapper {
                padding: 0;
            }
        }
    }


    .no_comment {
        margin-top: 20px;
        padding: 20px;
        text-align: center;
        background-color: var(--color-bg-1);
        border-radius: 5px;
        color: var(--color-text-2);
    }
}

.article_info {
    width: 260px;


    .user_info {
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--color-bg-1);
        border-radius: 5px;

        .nick {
            margin: 10px 0 20px 0;
            color: var(--color-text-1);
        }

        .data {
            display: flex;
            align-items: center;
            justify-content: center;

            .desc{
                font-size: 12px;
                color: var(--color-text-2);
            }
        }
    }

    .catalog_action {
        .md-editor-catalog {
            position: relative;
        }

        &.isFixed {
            position: fixed;
            top: 60px;
            width: 260px;
        }
    }

    .catalog {
        background: var(--color-bg-1);
        border-radius: 5px;
        margin-top: 20px;

        .head {
            padding: 20px 20px 10px 20px;
            border-bottom: @w_border;
            font-weight: 600;
            color: var(--color-text-1);
        }

        .body {
            padding: 10px 20px 20px 20px;
            max-height: calc(100vh - 240px);
            overflow-y: auto;

            .md-editor-catalog-active>span {
                color: rgb(var(--arcoblue-6));
            }

            .md-editor-catalog-link span:hover {
                color: rgb(var(--arcoblue-5));
            }

            .md-editor-catalog-indicator {
                background-color: rgb(var(--arcoblue-6));
            }
        }
    }


    .article_action {
        background: var(--color-bg-1);
        border-radius: 5px;
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 10px 0;

        i {
            padding: 10px;
            cursor: pointer;
            border-radius: 5px;
            color: var(--color-text-2);

            &:hover {
                background: var(--color-fill-1);
            }

            &.active {
                color: rgb(var(--arcoblue-6));
            }
        }
    }
}
</style>