<script setup lang="ts">
import { ref } from 'vue'
import type { Component } from 'vue';
import { getIpLocation, getWeather } from '@/api/common'
import { Message } from '@arco-design/web-vue';
import { adminGetArticleListApi } from '@/api/article';
import { adminGetCommentListApi } from '@/api/comments';
import { getUserListApi } from '@/api/user';
import { adminGetSiteListApi } from '@/api/site'
import { IconUserGroup, IconBook, IconMessage, IconCommand } from '@arco-design/web-vue/es/icon';
import w_component from '@/components/common/icon.vue';
import { useRoute } from 'vue-router';
import router from '@/router';
interface MenuType {
    id: number
    title: string // 菜单名
    name: string // 要跳转哪个路由
    icon?: string | Component // 图标
}
const location = ref('')
const weather = ref({
    weather: '',
    temperature: '',
    wind_direction: '',
    wind_power: '',
    humidity: '',
    tips: ''
})

const count = ref({
    articleCount: 0,
    commentCount: 0,
    userCount: 0,
    siteCount: 0
})
const welcome = ref({
    hello: '',
    nickname: ''
})

const shotcutList = ref<MenuType[]>([
    {
        id: 1,
        title: "用户管理",
        name: "userList",
        icon: IconUserGroup
    },
    {
        id: 2,
        title: "文章管理",
        name: "articleList",
        icon: IconBook
    },
    {
        id: 3,
        title: "评论管理",
        name: "commentsList",
        icon: "iconfont icon-pinglunliebiao"
    },
    {
        id: 4,
        title: "景点管理",
        name: "siteList",
        icon: IconCommand
    }
])
/**
 * 将行政区划名称格式化为「省·市」格式
 * @example
 * formatAddress('山东省日照市') // 返回 '山东省·日照市'
 * formatAddress('内蒙古自治区呼和浩特市') // 返回 '内蒙古自治区·呼和浩特市'
 */
const formatAddress = (str: string): string => {
    return str.replace(/^(.*?(省|自治区|市|特别行政区))(.*)$/, '$1 · $3');
};
const initData = async () => {
    const now = new Date();
    const hours = parseInt(('0' + now.getHours()).slice(-2));
    if (hours > 6 && hours < 12) {
        welcome.value.hello = '早上好'
    } else if (hours >= 12 && hours < 18) {
        welcome.value.hello = '下午好'
    } else {
        welcome.value.hello = '晚上好'
    }
    const article = await adminGetArticleListApi()
    const user = await getUserListApi()
    const comment = await adminGetCommentListApi()
    const site = await adminGetSiteListApi()
    count.value.articleCount = article.data.total
    count.value.userCount = user.data.total
    count.value.commentCount = comment.data.total
    count.value.siteCount = site.data.total
    // const res = await getIpLocation()
    // if (res.code === 200) {
    //     location.value = formatAddress(res.region)
    //     let city = res.region.replace(/^(.*?(省|自治区|市|特别行政区))(.*)$/, '$3');
    //     const weatherRes = await getWeather(city)
    //     if (weatherRes.code == 200) {
    //         weather.value = weatherRes
    //         if (weatherRes.temperature < 18) {
    //             weather.value.tips = '温度不错，注意防寒哦！'
    //         } else if (weatherRes.temperature < 26 && weatherRes.temperature >= 18) {
    //             weather.value.tips = '温度不错，温度适宜哦！'
    //         } else if (weatherRes.temperature >= 26) {
    //             weather.value.tips = '温度炎热，注意防暑哦！'
    //         } else if (weatherRes.temperature < 0) {
    //             weather.value.tips = '温度严寒，注意防寒哦！'
    //         }
    //         return
    //     }
    //     Message.error("获取天气失败")
    //     return
    // }
    // Message.error("获取地理位置失败")
}
initData()

</script>

<template>
    <div class="homeView">
        <div class="homeWelcome">
            <div class="title"> {{ welcome.hello }}管理员，请开始一天的工作吧 </div>
            <!-- <div class="gvb_weather weather">{{ location }} 今日 {{ weather.weather }}天，{{ weather.temperature }}℃，{{
                weather.tips }}</div> -->
            <div class="statistics">
                <span><icon-user-group /> <span>用户总数：{{ count.userCount }}</span></span>
                <span><icon-book /> <span>文章总数：{{ count.articleCount }}</span></span>
                <span><icon-message /> <span>评论总数：{{ count.commentCount }}</span></span>
                <span><icon-command /> <span>景点总数：{{ count.siteCount }}</span></span>
            </div>
            <!-- <div class="link">
                <div>友情链接：<a-link href="www.baidu.com">www.baidu.com</a-link></div>
                <div>友情链接：<a-link href="www.baidu.com">www.baidu.com</a-link></div>
            </div> -->
        </div>

        <div class="bottomContent">
            <div class="left">
                <div class="shotcut">
                    <div class="title">快捷入口</div>
                    <a-divider></a-divider>
                    <div class="shotLink">
                        <div class="link" v-for="shotcut in shotcutList" :key="shotcut.id"
                            @click="router.push({ name: shotcut.name })">
                            <div class="icon">
                                <w_component :is="shotcut.icon"></w_component>
                            </div>
                            <div class="text">{{ shotcut.title }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="title">更新日志</div>
                <a-divider></a-divider>
                <div class="updateLog">
                    <div class="text">1.使用技术</div>
                    <ul>
                        <li>后端：Golang + Gin</li>
                        <li>前端：Vite + Vue3 + TypeScript + ArcoDesign</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
.homeView {
    background-color: var(--color-neutral-2);

    .homeWelcome {
        width: 100%;
        background-image: url(https://video.fengfengzhidao.com/image/%E7%94%B5%E8%84%91%E5%9C%BA%E6%99%AF.png);
        background-repeat: no-repeat;
        background-position: right;
        background-size: 500px;
        background-color: var(--color-bg-1);
        padding: 20px;
        border-radius: 5px;
        color: var(--color-text-2);

        .title {
            font-size: 22px;
            margin-top: 10px;
            font-weight: 400;
            color: var(--color-text-1);
        }

        .weather {
            margin: 20px 0 10px;
        }

        .statistics {
            margin: 20px 0 10px;
            font-size: 16px;

            >span {
                margin-right: 20px;
            }
        }

        .link {
            margin: 30px 0 20px;

            div {
                margin-bottom: 20px;
            }
        }
    }

    .bottomContent {
        margin-top: 30px;
        width: 100%;
        color: var(--color-text-2);
        display: flex;
        // align-items: center;
        justify-content: space-between;

        .left {
            background-color: var(--color-bg-1);
            width: 65%;
            padding: 30px;
            border-radius: 5px;

            .shotLink {
                display: flex;
                justify-content: space-between;

                .link {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    .icon {
                        width: 100%;
                        display: flex;
                        width: 50px;
                        height: 50px;
                        align-items: center;
                        justify-content: center;
                        border-radius: 10px;
                        background-color: var(--color-fill-2);
                        transition: all 0.3s;
                        cursor: pointer;

                        &:hover {
                            transform: scale(1.3);
                            transition: all 0.3s;
                        }
                    }

                    .text {
                        margin-top: 10px;
                    }




                }
            }
        }

        .right {
            width: 33%;
            padding: 30px;
            border-radius: 5px;
            background-color: var(--color-bg-1);

            .updateLog{
                 li{
                    padding: 10px 0;
                 }
            }
        }
    }
}

.title {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text-1);
}
</style>
