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
import { Swiper, SwiperSlide } from 'swiper/vue'
import articleCard from '@/components/web/user/userArticle.vue'
import type { articleRes } from '@/types/artrcle'
import { getArticleListApi } from '@/api/article'
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
const articleList = ref<listResponse<articleRes>>(
    {
        list: [],
        total: 0
    }
)
const siteVisible = ref<boolean>(false)
const currentSite = ref<siteRes>()
const searhValue = ref('')
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
    } else {
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

const getArticleData = async (newParams?: paramsType) => {
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
        const res = await getArticleListApi(params)
        if (res.code) {
            Message.error(res.msg)
            return
        }
        articleList.value.list = res.data.list
        articleList.value.total = res.data.total
    } else {
        Object.assign(params, { province_code: selectedProvince.value })
        delete params.city_code
        const res = await getArticleListApi(params)
        if (res.code) {
            Message.error(res.msg)
            return
        }
        articleList.value.list = res.data.list
        articleList.value.total = res.data.total
    }

}

const onSiteClick = (site: siteRes) => {
    if (site.id != 0) {
        currentSite.value = site
        siteVisible.value = true
        return
    }
    Message.error("请求景点详情错误")
    return
}
// 分页切换函数
function pageChange() {
    getArticleData()
}

const searchArticle = () => {
    getArticleData({ title: searhValue.value })
}

// 监听选择变化
watch([selectedProvince, selectedCity], ([prov, city]) => {
    const params = {
        province: prov || undefined,
        city: city && city !== 0 ? city : undefined
    }
    Message.success(`您选择了：${provinceData.find(p => p.value === prov)?.name} - ${currentCities.value.find(c => c.value === city)?.name}`)
    getSiteData()
    getArticleData()
    //   fetchArticles(params)
}, { immediate: true })

</script>

<template>
    <a-modal v-model:visible="siteVisible" width="auto">
        <siteCard :current-site="currentSite"></siteCard>
    </a-modal>
    <div class="main">
        <div class="manContainer">
            <div class="addressSelector">
                <div class="addressTitle">国内</div>
                <a-divider></a-divider>
                <!-- 省份行 -->
                <div class="provinceRow">
                    <a-button v-for="province in provinceData" :key="province.value"
                        @click="selectProvince(province.value)"
                        :class="{ active: selectedProvince === province.value }">{{ province.name }}</a-button>
                </div>

                <!-- 带"全部"的城市选择 -->
                <div v-if="selectedProvince" class="cityContainer">
                    <div class="cityRow">
                        <a-button v-for="city in currentCities" :key="city.value" @click="selectedCity = city.value"
                            :class="{
                                active: selectedCity === city.value,
                                'allOption': city.isAll
                            }">
                            {{ city.name }}
                        </a-button>
                    </div>
                </div>
            </div>

            <div class="siteList">
                <div class="siteTitle">景点</div>
                <a-divider></a-divider>
                <!-- tab多了可滑动，9个时候开始滑动 -->
                <swiper :free-mode="true" :resistance-ratio="0" slides-per-view="auto"
                    :momentum-velocity-threshold="0.5" :momentum-ratio="1">
                    <swiper-slide v-for="site in siteList" @click="onSiteClick(site)">
                        <a-image width="200px" :src="site.images" :preview="false" :title="site.name"
                            :description="site.desc" class="siteCard" />
                    </swiper-slide>
                </swiper>
                <div class="empty" v-if="siteList?.length === 0">
                    <a-empty description="暂无推荐景点" />
                </div>
            </div>

            <div class="articleList">
                <div class="head">
                    <div class="articleTitle">游记</div>
                    <div class="right">
                        <a-input-search v-model="searhValue" placeholder="请输入标题" @search="searchArticle()" />
                    </div>
                </div>
                <a-divider></a-divider>
                <div class="info" v-if="articleList.total != 0">
                    <articleCard v-for="article in articleList.list" :articleRes="article" authorDisplay></articleCard>
                    <div class="page">
                        <a-pagination show-total :total="articleList.total" v-model:current="params.page_num"
                            :page-size="params.page_size" @change="pageChange" />
                    </div>
                </div>
                <div class="empty" v-else>
                    <a-empty />
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="less">
.main {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 65px;
    background-color: var(--color-neutral-2);

    >.manContainer {
        width: 1200px;
        min-height: calc(100vh - 122px);
    }
}

.addressSelector {
    // max-width: 1000px;
    // margin: 20px auto;
    margin-top: 20px;
    background-color: var(--color-bg-1);
    padding: 20px 20px 0 20px;
    border-radius: 5px;

    .addressTitle {
        width: 60px;
        background-repeat: no-repeat;
        background-size: cover;
        color: #333;
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0;
        margin-bottom: 10px;
        line-height: 40px;
        background-image: url(https://pages.c-ctrip.com/you//destination/destination_tabs_buy_y.png);
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

.siteList {
    margin-top: 20px;
    border-radius: 5px;
    padding: 20px;
    background-color: var(--color-bg-1);
    width: 100%;

    .siteTitle {
        width: 60px;
        background-repeat: no-repeat;
        background-size: cover;
        color: #333;
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 0;
        background-image: url(https://pages.c-ctrip.com/you//destination/destination_tabs_play_y.png);
        margin-bottom: 10px;
        line-height: 40px;
    }

    .siteCard {
        margin-right: 30px;
        cursor: pointer;

        .arco-image-footer-caption-description {
            display: -webkit-box;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }

    .swiper {
        width: 100%;
        display: flex;
        overflow-y: hidden;
        overflow-x: hidden;

        .swiper-wrapper {
            display: flex;
            align-items: center;

            .swiper-slide {
                width: fit-content !important;
                flex-shrink: 0;
            }
        }
    }

}

.articleList {
    margin-top: 40px;
    border-radius: 5px;
    padding: 20px;
    background-color: var(--color-bg-1);

    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .articleTitle {
            width: 60px;
            background-repeat: no-repeat;
            background-size: cover;
            color: #333;
            font-size: 18px;
            font-weight: 700;
            letter-spacing: 0;
            margin-bottom: 10px;
            line-height: 40px;
            background-image: url(https://pages.c-ctrip.com/you//destination/destination_tabs_eat_y.png);
        }

        .right {
            width: 30%;
        }
    }
}
</style>