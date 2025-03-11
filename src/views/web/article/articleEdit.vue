<script setup lang="ts">
import { onMounted, ref } from 'vue'
import articleForm from "@/components/common/articleForm.vue";
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const id = ref()
const getArticleId = ()=>{
    id.value = Number(route.query.id)
}
getArticleId()
</script>

<template>
    <div class="articleEdit">
        <div class="articleEditTitle">
            文章更新
        </div>
        <div class="articleEditContent">
            <articleForm :article-id="id"></articleForm>
        </div>
    </div>
</template>

<style lang="less">
.articleEdit {
    width: 80%;
    margin: 0 auto;
    margin-top: 80px;


    .articleEditTitle {
        width: 100%;
        height: 250px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: url("http://image.fengfengzhidao.com/gvb_1009/20231123092743__1123-e.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        padding: 20px;
        font-size: 32px;
        color: #fff;
        font-weight: 600;
    }

    .articleEditContent {
        margin-top: 20px;
        width: 100%;
        background-color: @color-bg-white;
        padding: 20px;
        border-radius: 10px;
    }
}
</style>