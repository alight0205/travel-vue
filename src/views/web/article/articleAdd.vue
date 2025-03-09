<script setup lang="ts">
import articleForm from "@/components/common/articleForm.vue";
</script>

<template>
    <div class="articleAdd">
        <div class="articleAddTitle">
            文章发布
        </div>
        <div class="articleAddContent">
            <articleForm></articleForm>
        </div>
    </div>
</template>

<style lang="less">
.articleAdd{
    width: 80%;
    margin: 0 auto;
    margin-top: 80px;
    
    
    .articleAddTitle{
        width: 100%;
        height: 250px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: url("http://image.fengfengzhidao.com/gvb_1009/20231123092743__1123-e.png");
        background-position: center;
        background-repeat:no-repeat;
        background-size: cover; 
        padding: 20px;
        font-size: 32px;
        color: #fff;
        font-weight: 600;
    }

    .articleAddContent{
        margin-top: 20px;
        width: 100%;
        background-color: @color-bg-white;
        padding: 20px;
        border-radius: 10px;
    }
}
</style>