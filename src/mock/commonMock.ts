// 中国省级行政区类型
type Province = {
    name: string
    value: number
    city: City[]
}

// 地级市类型
type City = {
    name: string
    value: number
    site?: Site[]
}
// 景点类型
type Site = {
    name: string,
    value: number
}

// 省市区数据
export const provinceData: readonly Province[] = [
    {
        name: '北京市',
        value: 110000,
        city: [
            { name: '北京市辖区', value: 110100 },
            { name: '东城区', value: 110101 },
            { name: '西城区', value: 110102 },
            // ...其他市辖区
        ]
    },
    {
        name: '山东省',
        value: 370000,
        city: [
            {
                name: '济南市',
                value: 370100,
                site: [
                    { name: '趵突泉', value: 1 },
                    { name: '千佛山', value: 4 },
                    { name: '黑虎泉', value: 5 },
                    { name: '山东博物馆', value: 6 }
                ]
            },
            {
                name: '青岛市',
                value: 370200,
                site: [
                    {name: '栈桥',value: 2},
                ]
            },
            {
                name: '淄博市',
                value: 370300,
                site: [
                    {name: '海岱楼',value: 3}
                ]
            },
            { name: '枣庄市', value: 370400 },
            { name: '东营市', value: 370500 },
            { name: '烟台市', value: 370600 },
            { name: '潍坊市', value: 370700 },
            { name: '济宁市', value: 370800 },
            { name: '泰安市', value: 370900 },
            { name: '威海市', value: 371000 },
            { name: '日照市', value: 371100 },
            { name: '临沂市', value: 371300 },
            { name: '德州市', value: 371400 },
            { name: '聊城市', value: 371500 },
            { name: '滨州市', value: 371600 },
            { name: '菏泽市', value: 371700 }
        ]
    },
    {
        name: '广东省',
        value: 440000,
        city: [
            { name: '广州市', value: 440100 },
            { name: '深圳市', value: 440300 },
            // ...其他地级市
        ]
    }
]