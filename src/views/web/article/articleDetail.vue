<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getArticleDetailApi } from '@/api/article'
import { Message } from '@arco-design/web-vue'
import { articleMockList } from '@/mock/articleMock'
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
const route = useRoute()
const getArticleDetail = async () => {
    // // 1. 加强类型校验
    // const idParam = route.query.id

    // // 处理数组类型参数（如?id=1&id=2）
    // const paramValue = Array.isArray(idParam) ? idParam[0] : idParam
    // console.log(paramValue)

    // if (!paramValue) {
    //     Message.error('文章ID不能为空')
    //     return
    // }

    // // 2. 更安全的数值转换
    // const id = Number(paramValue)
    // if (isNaN(id) || !Number.isInteger(id)) {
    //     Message.error('无效的文章ID格式')
    //     return
    // }

    // // 3. 添加错误处理
    // // const res = await getArticleDetailApi(id)
    // const res = {
    //     code: 0,
    //     msg: "请求文章列表成功",
    //     data: articleMockList[0]
    // }
    // if (res.code) {
    //     Message.error(res.msg)
    // }
    // text.value = res.data.content
    // title.value = res.data.title

}
const title = ref('')
const id = 'preview-only';
const text = ref('# Hello Editor');
const scrollElement = document.documentElement;

onMounted(() => {
    getArticleDetail()
})

</script>

<template>
    <div class="article_card">
        <div class="left_section">
            <div class="article_author">
                <div class="avatar">
                    <a-avatar image-url="https://api.dicebear.com/7.x/micah/svg?seed=Felix"></a-avatar>
                </div>
                <div class="author_info">
                    <div class="username">名字</div>
                    <div class="created_at">
                        <div class="time">2020-01-01</div>
                        <div class="read_num">阅读{{ 1 }}</div>
                    </div>
                </div>
            </div>
            <div class="article_title">{{ title }}</div>
            <MdPreview :id="id" :modelValue="text" />
            <div class="likeBtn">
                <a-divider />
                <a-button>点赞</a-button>
                <a-divider />
            </div>
            <div class="comments-section">
                <h2>评论{{ 23 }}</h2>
                <div class="comments-form">
                    
                </div>
                <a-comment author="Socrates"
                    avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                    content="Comment body content." datetime="1 hour">
                    <template #actions>
                        <span class="action">
                            <IconMessage /> Reply
                        </span>
                    </template>
                    <a-comment author="Balzac"
                        avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp"
                        content="Comment body content." datetime="1 hour">
                        <template #actions>
                            <span class="action">
                                <IconMessage /> Reply
                            </span>
                        </template>
                        <a-comment author="Austen"
                            avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp"
                            content="Reply content" datetime="1 hour">
                            <template #actions>
                                <span class="action">
                                    <IconMessage /> Reply
                                </span>
                            </template>
                        </a-comment>
                        <a-comment author="Plato"
                            avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                            content="Reply content" datetime="1 hour">
                            <template #actions>
                                <span class="action">
                                    <IconMessage /> Reply
                                </span>
                            </template>
                        </a-comment>
                    </a-comment>
                </a-comment>
            </div>
        </div>
        <div class="right_section">
            <MdCatalog :editorId="id" :scrollElement="scrollElement" />
        </div>
    </div>

</template>


<style lang="less" scoped>
body{
    background-color: var(--color-neutral-1);
}

.article_card {
    margin: 0 auto;
    width: 80%;
    margin-top: 8rem;
    // padding: 10px;
    display: flex;
    // background-color: @color-bg-1;
    height: 1200px;
    border-radius: 10px;

    .left_section {
        width: 60%;

        .article_title {
            font-size: 2.5rem;
            // line-height:1.3rem;
            padding: 20px 0 0 0;
            font-weight: 600;
            // margin-bottom:1.5rem;
        }
        .likeBtn{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .article_author {
            width: 240px;
            height: 48px;
            display: flex;
            align-items: center;
            gap: 1rem;

            .avatar {
                margin-right: 10px;
            }

            .author_info {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                gap: 0.3rem;

                .username {
                    font-weight: 600;
                }

                .created_at {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    font-size: 12px;
                    color: @color-text-3;
                }
            }

        }
    }

    .right_section {
        width: 20%;
        // 直接作用于右侧容器
        position: fixed;
        right: 20%; // 与主容器80%宽度匹配
        top: 120px; // 与主容器margin-top匹配
        overflow: auto;

        .md-editor-preview-wrapper {
            padding: 0;
        }

    }

}

</style>