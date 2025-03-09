<script setup lang="ts">
import type { FieldRule } from '@arco-design/web-vue';

export interface formListType {
    label: string
    field: string
    type:"input" | "textarea" | "select" | "switch" | "radio"
    validateTrigger: "focus" | "input" | "change" | "blur" | ("focus" | "input" | "change" | "blur")[];
    rules?:FieldRule<any> | FieldRule<any>[]
}
// props
interface Props {
    visible: boolean
    formList: formListType[]
}
const props = defineProps<Props>()
// emit
const emits = defineEmits<{
    (e: "update:visible", visible: boolean): void
}>()
function cancel() {
    emits("update:visible", false)
}
</script>

<template>
    <a-modal :visible="props.visible" @cancel="cancel">
        <a-form :model="form">
                <a-form-item v-for="item in formList" :label="item.label" :field="item.field" :rules="{ required: true }"
                    validate-trigger="blur">
                    <template v-if="item.type === 'input'">
                        <a-input v-model="form[item.field]" :placeholder="item.label"></a-input>
                    </template>
                </a-form-item>
            </a-form>
    </a-modal>
</template>


<style lang="less">

</style>