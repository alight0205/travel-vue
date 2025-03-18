<script setup lang="ts">
import { ref } from 'vue'
import type { siteRes } from '@/types/site'
import { provinceData } from '@/mock/commonMock'
interface Props {
    currentSite?: siteRes
}
const props = defineProps<Props>()
const provinceList = ref(provinceData)
// 根据省编码和市编码查找城市名称（支持三级行政区）
const findCityName = (provinceCode: number | undefined, cityCode: number | undefined) => {
    const province = provinceList.value.find(p => p.value === provinceCode);
    if (!province) return '未知省市';

    // 优先查找市级
    const city = province.city?.find(c => c.value === cityCode);
    if (city) return province.name + city.name;

    return province.name + '未知城市';
};
</script>

<template>
    <a-card :style="{ width: '360px' }">
        <template #actions>
            <a-tag color="blue">{{ findCityName(props.currentSite?.province_code,props.currentSite?.city_code) }}</a-tag>
        </template>
        <template #cover>
            <div :style="{
                height: '204px',
                overflow: 'hidden',
            }">
                <img :style="{ width: '100%', transform: 'translateY(-20px)' }" alt="dessert"
                    :src="props.currentSite?.images" />
            </div>
        </template>
        <a-card-meta :title="props.currentSite?.name">
            <template #description>{{ props.currentSite?.desc }}<br /></template>
            <template #avatar>
                <div :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">
                    <a-typography-text>{{ props.currentSite?.address_detail }}</a-typography-text>
                </div>
            </template>
        </a-card-meta>
    </a-card>
</template>

<style lang="less">
.icon-hover {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    transition: all 0.1s;
}

.icon-hover:hover {
    background-color: rgb(var(--gray-2));
}
</style>