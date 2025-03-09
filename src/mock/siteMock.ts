import type { siteRes } from '@/types/site'
export const initSite = <siteRes>{
    id: 0,
    // 分类名称
    name: "",
    // 省份代码
    province_code: 0,
    // 城市代码
    city_code: 0,
    // 地址详情
    address_detail: "",
    // 景点图片
    images: "",
    // 景点描述
    desc: "",
    // 创建者
    creator: 0,
    
}

export const siteListMock = [
    {
        // 景点ID
        id: 1,
        // 分类名称
        name: "趵突泉",
        // 省份代码
        province_code: 370000,
        // 城市代码
        city_code: 370100,
        // 地址详情
        address_detail: "山东省济南市历下区泺源大街91号趵突泉",
        // 景点图片
        images: "https://bkimg.cdn.bcebos.com/pic/9825bc315c6034a85edf2a54174b5e540923dc54d897?x-bce-process=image/format,f_auto/watermark,image_d2F0ZXIvYmFpa2UyNzI,g_7,xp_5,yp_5,P_20/resize,m_lfit,limit_1,h_1080",
        // 景点描述
        desc: "济南市趵突泉是一个非常著名的景点",
    },
    {
        // 景点ID
        id: 2,
        // 分类名称
        name: "栈桥",
        // 省份代码
        province_code: 370000,
        // 城市代码
        city_code: 370200,
        // 地址详情
        address_detail: "山东省青岛市市南区太平路41号",
        // 景点图片
        images: "https://bkimg.cdn.bcebos.com/pic/8644ebf81a4c510fd9f949d2f616322dd42a29340fe1?x-bce-process=image/format,f_auto/watermark,image_d2F0ZXIvYmFpa2UyNzI,g_7,xp_5,yp_5,P_20/resize,m_lfit,limit_1,h_1080",
        // 景点描述
        desc: "栈桥及回澜阁，即青岛栈桥，俗称前海栈桥、南海栈桥、大码头，青岛海滨风景区的著名景点之一。",
    },
    {
        // 景点ID
        id: 3,
        // 分类名称
        name: "海岱楼",
        // 省份代码
        province_code: 370000,
        // 城市代码
        city_code: 370300,
        /// 地址详情
        address_detail: "山东省淄博市张店区齐盛湖公园内",
        // 景点图片
        images: "https://bkimg.cdn.bcebos.com/pic/279759ee3d6d55fbb2fb62b39674584a20a446237755?x-bce-process=image/format,f_auto/watermark,image_d2F0ZXIvYmFpa2UyNzI,g_7,xp_5,yp_5,P_20/resize,m_lfit,limit_1,h_1080",
        // 景点描述
        desc: "海岱楼位于淄博齐盛湖公园制高点，采用汉代建筑风格，共十层，地上九层、地下一层。总建筑面积11642平方米，总高度67米 ，为齐盛湖公园的东西中心点和淄博新区城市核心轴线的北侧端点。",
    },
    {
        // 景点ID
        id: 4,
        // 分类名称
        name: "千佛山",
        // 省份代码
        province_code: 370000,
        // 城市代码
        city_code: 370100,
        /// 地址详情
        address_detail: "中国山东省济南市历下区经十一路18号",
        // 景点图片
        images: "https://bkimg.cdn.bcebos.com/pic/8c1001e93901213fb80e6b4e00ae21d12f2eb9383f42",
        // 景点描述
        desc: "千佛山（Qianfo Mountain [31]）又称“靡笄山”“靡山”“历山”“舜山”“舜耕山”，位于山东省济南市历下区经十一路，地理坐标东经117°00'~117°03'，北纬36°36'~36°38'，济南三大名胜之一，国家级风景名胜区。千佛山景区占地面积164.88公顷。",
    },
    {
        // 景点ID
        id: 5,
        // 分类名称
        name: "黑虎泉",
        // 省份代码
        province_code: 370000,
        // 城市代码
        city_code: 370100,
        /// 地址详情
        address_detail: "山东省济南市历下区解放阁南护城河南岸陡壁",
        // 景点图片
        images: "https://bkimg.cdn.bcebos.com/pic/b64543a98226cffc6787f357b7014a90f703eaa2?x-bce-process=image/format,f_auto/watermark,image_d2F0ZXIvYmFpa2UyNzI,g_7,xp_5,yp_5,P_20/resize,m_lfit,limit_1,h_1080",
        // 景点描述
        desc: "黑虎泉，属小清河支流东泺河水系、黑虎泉泉群。位于山东省济南市历下区解放阁南护城河南岸陡崖下，在济南市黑虎泉西路。 [1]因泉水涌出，湍击巨石，发出粗犷的鸣响，酷似虎啸，故名。明代嘉靖年间，黑虎泉洞穴的上方曾建有黑虎庙，庙内供奉着“赵公明”。",
    },
    {
        // 景点ID
        id: 6,
        // 分类名称
        name: "山东博物馆",
        // 省份代码
        province_code: 370000,
        // 城市代码
        city_code: 370100,
        /// 地址详情
        address_detail: "山东省济南市历下区经十路11899号",
        // 景点图片
        images: "https://bkimg.cdn.bcebos.com/pic/a044ad345982b2b7d0a23ee915f4dcef76094b362ddf?x-bce-process=image/format,f_auto/watermark,image_d2F0ZXIvYmFpa2UyNzI,g_7,xp_5,yp_5,P_20/resize,m_lfit,limit_1,h_1080",
        // 景点描述
        desc: "山东博物馆是山东省文化和旅游厅所属正处级公益一类事业单位，挂山东省文物鉴定中心、山东省石刻艺术博物馆牌子 [36]，位于山东省济南市历下区经十路11899号，占地面积210亩，主体建筑面积82900平方米，展陈面积25000平方米，是一所综合性博物馆。",
    },
    {
        // 景点ID
        id: 7,
        // 分类名称
        name: "测试7",
        // 省份代码
        province_code: 370000,
        // 城市代码
        city_code: 370300,
        /// 地址详情
        address_detail: "测试地址7",
        // 景点图片
        images: "https://w.wallhaven.cc/full/ex/wallhaven-exkg7w.jpg",
        // 景点描述
        desc: "测试7简介",
    },
    {
        // 景点ID
        id: 8,
        // 分类名称
        name: "测试8",
        // 省份代码
        province_code: 370000,
        // 城市代码
        city_code: 370400,
        /// 地址详情
        address_detail: "测试地址8",
        // 景点图片
        images: "https://w.wallhaven.cc/full/ex/wallhaven-exkg7w.jpg",
        // 景点描述
        desc: "测试8简介",
    },
    {
        // 景点ID
        id: 9,
        // 分类名称
        name: "测试9",
        // 省份代码
        province_code: 370000,
        // 城市代码
        city_code: 370400,
        /// 地址详情
        address_detail: "测试地址9",
        // 景点图片
        images: "https://w.wallhaven.cc/full/ex/wallhaven-exkg7w.jpg",
        // 景点描述
        desc: "测试9简介",
    },
    {
        // 景点ID
        id: 10,
        // 分类名称
        name: "测试10",
        // 省份代码
        province_code: 370000,
        // 城市代码
        city_code: 370400,
        /// 地址详情
        address_detail: "测试地址10",
        // 景点图片
        images: "https://w.wallhaven.cc/full/ex/wallhaven-exkg7w.jpg",
        // 景点描述
        desc: "测试10简介",
    },
    {
        // 景点ID
        id: 11,
        // 分类名称
        name: "测试11",
        // 省份代码
        province_code: 370000,
        // 城市代码
        city_code: 370400,
        /// 地址详情
        address_detail: "测试地址11",
        // 景点图片
        images: "https://w.wallhaven.cc/full/ex/wallhaven-exkg7w.jpg",
        // 景点描述
        desc: "测试11简介",
    }
]