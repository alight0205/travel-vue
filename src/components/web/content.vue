<script setup lang="ts">
import { ref, reactive } from 'vue';
import articleList from '@/components/web/article-list.vue'
import homeBtn from '@/components/web/homeBtn.vue'
import { getArticleListApi } from '@/api/article'
import type { paramsType } from "@/types/index"
import type { articleRes } from '@/types/artrcle'
import { Message } from '@arco-design/web-vue';
import router from '@/router'
interface ImageItem {
    title: string;
    cover: string;
    id: number;
}

const images = ref<ImageItem[]>([]);

// 使用reactive定义请求参数
const params = reactive<paramsType>({
    // 请求参数，可以根据实际需求扩展
    page_size: 5,
    page_num: 1
})
const loading = ref(false)
// 获取列表数据的异步函数
async function getList(newParams?: paramsType) {
    // 请求前变成加载状态
    loading.value = true
    if (newParams) {
        Object.assign(params, newParams)
    }
    // 调用传入的URL函数获取数据
    const res = await getArticleListApi(params)
    // 请求后取消加载状态
    loading.value = false
    // 如果返回的code不为0，表示请求失败，显示错误信息
    if (res.code) {
        Message.error(res.msg)
        return
    }
    if (res.data.total != 0) {
        // 使用数组映射处理
        const newImages = res.data.list.map(({ title, cover, id }) => ({
            title,
            cover,
            id
        }));

        // 合并到原数组（如需保留原有数据）
        images.value.push(...newImages);

    }
}

const goArticleDetail = (id: number) => {
    router.push({ name: 'articleDetail', query: { id } })
}
getList({is_banner:1})

</script>


<template>
    <div class="content-container">
        <div class="content">
            <div class="left-section">
                <!-- 轮播图 -->
                <a-carousel class="banner" :auto-play="true" indicator-type="dot" show-arrow="hover">
                    <a-carousel-item v-for="image in images" :key="image.id" @click="goArticleDetail(image.id)">
                        <div class="bannerCover">{{ image.title }}</div>
                        <img :src="image.cover" :style="{ width: '100%', }" />
                    </a-carousel-item>
                </a-carousel>
                <!-- 文章列表展示区 -->
                <articleList></articleList>
            </div>
            <div class="right-section">
                <homeBtn></homeBtn>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.content-container {
    margin: 0 auto;
    margin-top: 80px;
    width: 100%;
    height: 1200px;

    .content {
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;

        .left-section {
            width: 70%;

            .banner {
                width: 100%;
                height: 350px;
                border-radius: 5px;
                overflow: hidden;

                // img {
                //     width: 100%;
                //     // height: 350px;
                // }

                .bannerCover {
                    width: 100%;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    padding: 20px;
                    font-size: 30px;
                    font-weight: 700;
                    color: white;
                    background-color: rgba(0, 0, 0, 0.2);
                }
            }

        }

        .right-section {
            width: 25%;

        }
    }


}
</style>