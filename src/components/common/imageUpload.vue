<script setup lang="ts">
import {userStore} from "@/stores/user-store";
import {type FileItem, Message} from "@arco-design/web-vue";
import type {baseResponse} from "@/types/index";
import {imageUploadApi,fixUrlFormat} from "@/api/common";
import {ref} from 'vue'

const store = userStore()
interface Props {
  modelValue: string
  placeholder?: string
  shape?:string
  width?: number
  height?:number
}


const props = defineProps<Props>()

const {shape="circle", width = 60, height = 60} = props
// const file = ref()
const emits = defineEmits(["update:modelValue"])

function inputHandler(val: string) {
  emits("update:modelValue", val)
}

const uploadAvatar = async(_: any, currentFile: FileItem)=>{
  const res = await imageUploadApi(currentFile.file)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  emits("update:modelValue", fixUrlFormat(res.data))
}

</script>

<template>
  <div class="f_image_upload">
    <a-input :model-value="props.modelValue" :placeholder="props.placeholder" @input="inputHandler" class="avatarInput"></a-input>
    <a-upload 
      :multiple="false"
      :show-file-list="false" 
      :list-type="'picture-card'"
      action="#" 
      :auto-upload="false"
      name="file" 
      @change="uploadAvatar">
      <template #upload-button>
        <a-image :src="props.modelValue" :preview="false" :class="shape"  :width="width" :height="height"></a-image>
      </template>
    </a-upload>
  </div>
</template>

<style lang="less" scoped>
.f_image_upload {
  width: 100%;
  .arco-input-wrapper{
    display: flex;
    margin-bottom: 10px;
  }
  .avatarInput{
    display: none;
  }
  .arco-image{
    &.circle{
      border-radius: 50%;
    }
  }
}
</style>