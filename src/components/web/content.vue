<script setup lang="ts">
import articleList from '@/components/web/article-list.vue'
import homeBtn from '@/components/web/homeBtn.vue'

const images = [
    'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
    'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
    'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
];
</script>


<template>
    <div class="content-container">
        <div class="content">
            <div class="left-section">
                <!-- 轮播图 -->
                <a-carousel class="banner" :auto-play="true" indicator-type="dot" show-arrow="hover">
                    <a-carousel-item v-for="image in images">
                        <a-image :src="image" fit="cover" />
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

<style lang="less">
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
            
            .banner{
                width: 100%;
                height: 350px;
                border-radius: 5px;
                overflow: hidden;

                img{
                    width: 100%;
                    // height: 350px;
                }
            }

        }

        .right-section {
            width: 25%;

        }
    }


}
</style>