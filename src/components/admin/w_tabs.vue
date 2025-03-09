<template>
    <div class="w_tabs">
        <!-- tab多了可滑动，9个时候开始滑动 -->
        <swiper :slides-per-view="slidesCount" class="w_tabs_swiper">
            <swiper-slide v-for="tab in tabs" :class="{ active: route.name === tab.name }">
                <!-- 如果当前路由等于此tab项的name则加入active类实现变色，实现了点击删除单个，以及中键删除mousedown -->
                <div class="item" :class="{ active: route.name === tab.name }" @click="changeRouter(tab)"
                    @mousedown.middle.stop="removeTab(tab)">
                    {{ tab.title }}
                    <!-- 点击从tab数据中删除当前tab信息，要取消删除时的冒泡 -->
                    <span class="close" title="删除" v-if="tab.name !== 'home'" @click.stop="removeTab(tab)">
                        <IconClose></IconClose>
                    </span>
                </div>
            </swiper-slide>
        </swiper>
        <div class="item" @click="removeAllTab">删除全部</div>
    </div>

</template>

<script setup lang="ts">
import router from '@/router';
import { Table } from '@arco-design/web-vue';
import { idText } from 'typescript';
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue'


const route = useRoute()
// tab数据类型
interface TabType {
    title: string
    name: string
}
// tab数据
const tabs = ref<TabType[]>([
    { title: "首页", name: "welcome" },
])
// 点击tab切换路由
function changeRouter(tab: TabType) {
    router.push({
        name: tab.name
    })
    saveTabs()
}
// 将tabs存入localStorage
function saveTabs() {
    localStorage.setItem("w_tabs", JSON.stringify(tabs.value))
}


// 删除单个tab
function removeTab(tab: TabType) {
    if (tab.name === "home") {
        return
    }
    const index = tabs.value.findIndex((value) => tab.name === value.name)
    if (index !== -1) {
        // 判断我删除的这个元素，是不是就是我当前所在的
        if (tab.name === route.name) {
            // 因为首页那个tab百分百存在，所以放心往前走
            router.push({
                name: tabs.value[index - 1].name
            })
        }
        tabs.value.splice(index, 1)
        saveTabs()
    }
}

// 删除全部tab
function removeAllTab(tab: TabType) {
    tabs.value = [
        { title: "首页", name: "welcome" },
    ]
    router.push({ name: "welcome" })
    saveTabs()
}

// 初始化
function loadTabs() {
    // 从localStorage取出存储的tabs
    const w_tabs = localStorage.getItem("w_tabs",)
    if (w_tabs) {
        try {
            tabs.value = JSON.parse(w_tabs)
        } catch (e) {
            console.log(e)
        }
    }
}
// loadTabs()


watch(() => route.name, () => {
    // 判断当前路由的名称，在不在tabs里，不在就加入，否则保持原状
    const index = tabs.value.findIndex((value) => route.name === value.name)
    if (index === -1) {
        tabs.value.push({
            name: route.name as string,
            title: route.meta.title
        })
    }
}, { immediate: true })

const slidesCount = ref(100)

onMounted(() => {
    // 拿到swiper
    const swiperDom = document.querySelector(".w_tabs_swiper") as HTMLDivElement
    // 显示的总宽度
    const swiperWidth = swiperDom.clientWidth
    // 实际的总宽度
    const wrapperDom = document.querySelector(".w_tabs_swiper .swiper-wrapper") as HTMLDivElement
    const wrapperWidth = wrapperDom.scrollWidth
    // 如果显示的总宽度大于了实际总宽度，就不显示滑动
    if (swiperWidth >= wrapperWidth) {
        return
    }
    // 实际的总宽度大于显示的总宽度，就显示滑动
    // 遍历swiper-slide，然后从前往后加
    const slideList = document.querySelectorAll(".w_tabs_swiper .swiper-slide")
    let allWidth = 0
    let index = 0
    for (const slideListElement of slideList) {
        // 加上tab的20的margin
        allWidth += (slideListElement.clientWidth + 20)
        index++
        if (allWidth >= swiperWidth) {
            break
        }
    }
    slidesCount.value = index

    // 选中高亮的元素
    const activeSlide = document.querySelector(".w_tabs_swiper .swiper-slide.active") as HTMLDivElement
    // 大于显示总宽度时才往下计算
    if(activeSlide.offsetLeft > swiperWidth){
        const offsetLeft = swiperWidth - activeSlide.offsetLeft
        setTimeout(()=>{
            wrapperDom.style.transform= `translate3d(${offsetLeft}px,0px,0px)`
        },500)
    }
})
</script>


<style lang="less">
.w_tabs {
    display: flex;
    align-items: center;
    padding: 0 10px;
    justify-content: space-between;

    .swiper {
        width: calc(100% - 100px);
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

    .item {
        padding: 3px 8px;
        background-color: var(--color-bg-1);
        border: @w_border;
        margin-left: 10px;
        cursor: pointer;
        border-radius: 5px;
        flex-shrink: 0;

        &:hover {
            background-color: var(--color-fill-1);
        }

        &.active {
            background-color: @primary-6;
            color: white;
        }
    }


}
</style>