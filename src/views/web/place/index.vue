<script setup lang="ts">
import Main from '@/components/common/Main.vue'
import { provinceData } from '@/mock/commonMock'
import { ref, computed, watch, onMounted, reactive } from 'vue'
import type { City } from '@/mock/commonMock'
import { Message } from '@arco-design/web-vue'
import siteCard from '@/components/common/siteCard.vue'
import { userGetSiteListApi } from '@/api/site'
import type { siteRes } from '@/types/site'
import type { listResponse, paramsType, baseResponse, optionsType, optionsFunc } from "@/types/index"
// 新增类型定义
interface CityWithAll extends City {
    isAll?: boolean
}
// 使用reactive定义请求参数
const params = reactive<paramsType>({
    // 请求参数，可以根据实际需求扩展
    page_size: 10,
    page_num: 1
})

// 响应式数据
const selectedProvince = ref<number>(110000)
const selectedCity = ref<number>(0)
const siteList = ref<siteRes[]>()
const siteLoding = ref<boolean>(false)

// 带"全部"选项的城市列表
const currentCities = computed<CityWithAll[]>(() => {
    const cities = provinceData.find(p => p.value === selectedProvince.value)?.city || []
    return [{ name: '全部', value: 0, isAll: true }, ...cities]
})

// 处理省份选择（自动选中全部）
const selectProvince = (provinceValue: number) => {
    selectedProvince.value = provinceValue
    selectedCity.value = 0 // 默认选中"全部"
}

const getSiteData = async (newParams?: paramsType) => {
    // 请求前变成加载状态
    siteLoding.value = true
    if (newParams) {
        Object.assign(params, newParams)
    }
    if (selectedProvince.value === undefined) {
        Message.error('请选择省份')
        return
    }
    if (selectedCity.value != 0) {
        Object.assign(params, { province_code: selectedProvince.value, city_code: selectedCity.value })
        const res = await userGetSiteListApi(params)
        if (res.code) {
            Message.error(res.msg)
            return
        }
        siteList.value = res.data
    }else{
        Object.assign(params, { province_code: selectedProvince.value })
        delete params.city_code
        const res = await userGetSiteListApi(params)
        if (res.code) {
            Message.error(res.msg)
            return
        }
        siteList.value = res.data
    }

}

// 监听选择变化
watch([selectedProvince, selectedCity], ([prov, city]) => {
    const params = {
        province: prov || undefined,
        city: city && city !== 0 ? city : undefined
    }
    Message.success(`您选择了：${provinceData.find(p => p.value === prov)?.name} - ${currentCities.value.find(c => c.value === city)?.name}`)
    getSiteData()
    //   fetchArticles(params)
}, { immediate: true })
</script>

<template>
    <Main>
        <div class="addressSelector">
            <div class="addressTitle">
                国内攻略
            </div>
            <a-divider></a-divider>
            <!-- 省份行 -->
            <div class="provinceRow">
                <a-button v-for="province in provinceData" :key="province.value" @click="selectProvince(province.value)"
                    :class="{ active: selectedProvince === province.value }">{{ province.name }}</a-button>
            </div>

            <!-- 带"全部"的城市选择 -->
            <div v-if="selectedProvince" class="cityContainer">
                <div class="cityRow">
                    <a-button v-for="city in currentCities" :key="city.value" @click="selectedCity = city.value" :class="{
                        active: selectedCity === city.value,
                        'allOption': city.isAll
                    }">
                        {{ city.name }}
                    </a-button>
                </div>
            </div>
        </div>
        <div class="siteList">
            <siteCard v-for="site in siteList" :currentSite="site"></siteCard>
        </div>

    </Main>
</template>

<style lang="less" scoped>
.addressSelector {
    // max-width: 1000px;
    // margin: 20px auto;
    margin-top: 20px;
    background-color: var(--color-bg-1);
    padding: 20px;
    border-radius: 5px;

    .addressTitle {
        font-size: 30px;
        font-weight: 500;
        color: #333;
    }

    button {
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        white-space: nowrap;
    }

    .active {
        background: @primary-6;
        color: white;
        border-color: transparent;
    }


    .provinceRow {
        display: flex;
        gap: 10px;
        overflow-x: auto;
        padding: 10px 0;
    }

    .cityContainer {
        padding: 20px 0;

        .cityRow {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;

            .allOption {
                font-weight: 600;
                border-color: #409eff;

                :active {
                    background: #409eff;
                    color: white;
                }
            }
        }
    }
}

.siteList{
    display: flex;
}
</style>