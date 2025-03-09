<script setup lang="ts">
import {Message} from "@arco-design/web-vue";
import {userStore} from "@/stores/user-store";
import ImgCutter from 'vue-img-cutter'
import {imageUploadApi,fixUrlFormat} from "@/api/common";
// import {qiniuUploadConfigApi, type qiniuUploadConfigType} from "@/api/site_api";
// import {loadScript} from "@/utils/load_js";
const store = userStore()
const emits = defineEmits(["ok"])

interface Props {
  rate: string
}

const props = defineProps<Props>()

async function cutDown(e: any) {
    const res = await imageUploadApi(e.file)
    if (res.code) {
      Message.error(res.msg)
      return
    }
    Message.success("上传成功")
    console.log(fixUrlFormat(res.data))
    emits("ok", fixUrlFormat(res.data))
}

</script>

<template>
  <ImgCutter :quality="0" originalGraph :toolBoxOverflow="false" @cutDown="cutDown" :rate="props.rate">
    <template #open>
      <slot></slot>
    </template>
  </ImgCutter>
</template>

<style lang="less">

</style>