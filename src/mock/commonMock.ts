// 中国省级行政区类型
export type Province = {
    name: string
    value: number
    city: City[]
}

// 地级市类型
export type City = {
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
    // 华北地区（5省）
    {
        name: '北京', value: 110000,
        city: [{ name: '北京市', value: 110100 }]
    },
    {
        name: '天津', value: 120000,
        city: [{ name: '天津市', value: 120100 }]
    },
    {
        name: '河北省', value: 130000,
        city: [
            { name: '石家庄市', value: 130100 }, { name: '唐山市', value: 130200 },
            { name: '秦皇岛市', value: 130300 }, { name: '邯郸市', value: 130400 },
            { name: '邢台市', value: 130500 }, { name: '保定市', value: 130600 },
            { name: '张家口市', value: 130700 }, { name: '承德市', value: 130800 },
            { name: '沧州市', value: 130900 }, { name: '廊坊市', value: 131000 },
            { name: '衡水市', value: 131100 }
        ]
    },
    {
        name: '山西省', value: 140000,
        city: [
            { name: '太原市', value: 140100 }, { name: '大同市', value: 140200 },
            { name: '阳泉市', value: 140300 }, { name: '长治市', value: 140400 },
            { name: '晋城市', value: 140500 }, { name: '朔州市', value: 140600 },
            { name: '晋中市', value: 140700 }, { name: '运城市', value: 140800 },
            { name: '忻州市', value: 140900 }, { name: '临汾市', value: 141000 },
            { name: '吕梁市', value: 141100 }
        ]
    },
    {
        name: '内蒙古自治区', value: 150000,
        city: [
            { name: '呼和浩特市', value: 150100 }, { name: '包头市', value: 150200 },
            { name: '乌海市', value: 150300 }, { name: '赤峰市', value: 150400 },
            { name: '通辽市', value: 150500 }, { name: '鄂尔多斯市', value: 150600 },
            { name: '呼伦贝尔市', value: 150700 }, { name: '巴彦淖尔市', value: 150800 },
            { name: '乌兰察布市', value: 150900 }, { name: '兴安盟', value: 152200 },
            { name: '锡林郭勒盟', value: 152500 }, { name: '阿拉善盟', value: 152900 }
        ]
    },

    // 东北地区（3省）
    {
        name: '辽宁省', value: 210000,
        city: [
            { name: '沈阳市', value: 210100 }, { name: '大连市', value: 210200 },
            { name: '鞍山市', value: 210300 }, { name: '抚顺市', value: 210400 },
            { name: '本溪市', value: 210500 }, { name: '丹东市', value: 210600 },
            { name: '锦州市', value: 210700 }, { name: '营口市', value: 210800 },
            { name: '阜新市', value: 210900 }, { name: '辽阳市', value: 211000 },
            { name: '盘锦市', value: 211100 }, { name: '铁岭市', value: 211200 },
            { name: '朝阳市', value: 211300 }, { name: '葫芦岛市', value: 211400 }
        ]
    },
    {
        name: '吉林省', value: 220000,
        city: [
            { name: '长春市', value: 220100 }, { name: '吉林市', value: 220200 },
            { name: '四平市', value: 220300 }, { name: '辽源市', value: 220400 },
            { name: '通化市', value: 220500 }, { name: '白山市', value: 220600 },
            { name: '松原市', value: 220700 }, { name: '白城市', value: 220800 },
            { name: '延边朝鲜族自治州', value: 222400 }
        ]
    },
    {
        name: '黑龙江省', value: 230000,
        city: [
            { name: '哈尔滨市', value: 230100 }, { name: '齐齐哈尔市', value: 230200 },
            { name: '鸡西市', value: 230300 }, { name: '鹤岗市', value: 230400 },
            { name: '双鸭山市', value: 230500 }, { name: '大庆市', value: 230600 },
            { name: '伊春市', value: 230700 }, { name: '佳木斯市', value: 230800 },
            { name: '七台河市', value: 230900 }, { name: '牡丹江市', value: 231000 },
            { name: '黑河市', value: 231100 }, { name: '绥化市', value: 231200 },
            { name: '大兴安岭地区', value: 232700 }
        ]
    },

    // 华东地区（7省）
    {
        name: '上海市', value: 310000,
        city: [{ name: '上海市', value: 310100 }]
    },
    {
        name: '江苏省', value: 320000,
        city: [
            { name: '南京市', value: 320100 }, { name: '无锡市', value: 320200 },
            { name: '徐州市', value: 320300 }, { name: '常州市', value: 320400 },
            { name: '苏州市', value: 320500 }, { name: '南通市', value: 320600 },
            { name: '连云港市', value: 320700 }, { name: '淮安市', value: 320800 },
            { name: '盐城市', value: 320900 }, { name: '扬州市', value: 321000 },
            { name: '镇江市', value: 321100 }, { name: '泰州市', value: 321200 },
            { name: '宿迁市', value: 321300 }
        ]
    },
    {
        name: '浙江省', value: 330000,
        city: [
            { name: '杭州市', value: 330100 }, { name: '宁波市', value: 330200 },
            { name: '温州市', value: 330300 }, { name: '嘉兴市', value: 330400 },
            { name: '湖州市', value: 330500 }, { name: '绍兴市', value: 330600 },
            { name: '金华市', value: 330700 }, { name: '衢州市', value: 330800 },
            { name: '舟山市', value: 330900 }, { name: '台州市', value: 331000 },
            { name: '丽水市', value: 331100 }
        ]
    },
    {
        name: '安徽省', value: 340000,
        city: [
            { name: '合肥市', value: 340100 }, { name: '芜湖市', value: 340200 },
            { name: '蚌埠市', value: 340300 }, { name: '淮南市', value: 340400 },
            { name: '马鞍山市', value: 340500 }, { name: '淮北市', value: 340600 },
            { name: '铜陵市', value: 340700 }, { name: '安庆市', value: 340800 },
            { name: '黄山市', value: 341000 }, { name: '滁州市', value: 341100 },
            { name: '阜阳市', value: 341200 }, { name: '宿州市', value: 341300 },
            { name: '六安市', value: 341500 }, { name: '亳州市', value: 341600 },
            { name: '池州市', value: 341700 }, { name: '宣城市', value: 341800 }
        ]
    },
    {
        name: '福建省', value: 350000,
        city: [
            { name: '福州市', value: 350100 }, { name: '厦门市', value: 350200 },
            { name: '莆田市', value: 350300 }, { name: '三明市', value: 350400 },
            { name: '泉州市', value: 350500 }, { name: '漳州市', value: 350600 },
            { name: '南平市', value: 350700 }, { name: '龙岩市', value: 350800 },
            { name: '宁德市', value: 350900 }
        ]
    },
    {
        name: '江西省', value: 360000,
        city: [
            { name: '南昌市', value: 360100 }, { name: '景德镇市', value: 360200 },
            { name: '萍乡市', value: 360300 }, { name: '九江市', value: 360400 },
            { name: '新余市', value: 360500 }, { name: '鹰潭市', value: 360600 },
            { name: '赣州市', value: 360700 }, { name: '吉安市', value: 360800 },
            { name: '宜春市', value: 360900 }, { name: '抚州市', value: 361000 },
            { name: '上饶市', value: 361100 }
        ]
    },
    {
        name: '山东省', value: 370000,
        city: [
            { name: '济南市', value: 370100 }, { name: '青岛市', value: 370200 },
            { name: '淄博市', value: 370300 }, { name: '枣庄市', value: 370400 },
            { name: '东营市', value: 370500 }, { name: '烟台市', value: 370600 },
            { name: '潍坊市', value: 370700 }, { name: '济宁市', value: 370800 },
            { name: '泰安市', value: 370900 }, { name: '威海市', value: 371000 },
            { name: '日照市', value: 371100 }, { name: '临沂市', value: 371300 },
            { name: '德州市', value: 371400 }, { name: '聊城市', value: 371500 },
            { name: '滨州市', value: 371600 }, { name: '菏泽市', value: 371700 }
        ]
    },

    // 中南地区（6省）
    {
        name: '河南省', value: 410000,
        city: [
            { name: '郑州市', value: 410100 }, { name: '开封市', value: 410200 },
            { name: '洛阳市', value: 410300 }, { name: '平顶山市', value: 410400 },
            { name: '安阳市', value: 410500 }, { name: '鹤壁市', value: 410600 },
            { name: '新乡市', value: 410700 }, { name: '焦作市', value: 410800 },
            { name: '濮阳市', value: 410900 }, { name: '许昌市', value: 411000 },
            { name: '漯河市', value: 411100 }, { name: '三门峡市', value: 411200 },
            { name: '南阳市', value: 411300 }, { name: '商丘市', value: 411400 },
            { name: '信阳市', value: 411500 }, { name: '周口市', value: 411600 },
            { name: '驻马店市', value: 411700 }, { name: '济源市', value: 419001 }
        ]
    },
    {
        name: '湖北省', value: 420000,
        city: [
            { name: '武汉市', value: 420100 }, { name: '黄石市', value: 420200 },
            { name: '十堰市', value: 420300 }, { name: '宜昌市', value: 420500 },
            { name: '襄阳市', value: 420600 }, { name: '鄂州市', value: 420700 },
            { name: '荆门市', value: 420800 }, { name: '孝感市', value: 420900 },
            { name: '荆州市', value: 421000 }, { name: '黄冈市', value: 421100 },
            { name: '咸宁市', value: 421200 }, { name: '随州市', value: 421300 },
            { name: '恩施土家族苗族自治州', value: 422800 },
            { name: '仙桃市', value: 429004 }, { name: '潜江市', value: 429005 },
            { name: '天门市', value: 429006 }, { name: '神农架林区', value: 429021 }
        ]
    },
    {
        name: '湖南省', value: 430000,
        city: [
            { name: '长沙市', value: 430100 }, { name: '株洲市', value: 430200 },
            { name: '湘潭市', value: 430300 }, { name: '衡阳市', value: 430400 },
            { name: '邵阳市', value: 430500 }, { name: '岳阳市', value: 430600 },
            { name: '常德市', value: 430700 }, { name: '张家界市', value: 430800 },
            { name: '益阳市', value: 430900 }, { name: '郴州市', value: 431000 },
            { name: '永州市', value: 431100 }, { name: '怀化市', value: 431200 },
            { name: '娄底市', value: 431300 }, { name: '湘西土家族苗族自治州', value: 433100 }
        ]
    },
    {
        name: '广东省', value: 440000,
        city: [
            { name: '广州市', value: 440100 }, { name: '韶关市', value: 440200 },
            { name: '深圳市', value: 440300 }, { name: '珠海市', value: 440400 },
            { name: '汕头市', value: 440500 }, { name: '佛山市', value: 440600 },
            { name: '江门市', value: 440700 }, { name: '湛江市', value: 440800 },
            { name: '茂名市', value: 440900 }, { name: '肇庆市', value: 441200 },
            { name: '惠州市', value: 441300 }, { name: '梅州市', value: 441400 },
            { name: '汕尾市', value: 441500 }, { name: '河源市', value: 441600 },
            { name: '阳江市', value: 441700 }, { name: '清远市', value: 441800 },
            { name: '东莞市', value: 441900 }, { name: '中山市', value: 442000 },
            { name: '潮州市', value: 445100 }, { name: '揭阳市', value: 445200 },
            { name: '云浮市', value: 445300 }
        ]
    },
    {
        name: '广西壮族自治区', value: 450000,
        city: [
            { name: '南宁市', value: 450100 }, { name: '柳州市', value: 450200 },
            { name: '桂林市', value: 450300 }, { name: '梧州市', value: 450400 },
            { name: '北海市', value: 450500 }, { name: '防城港市', value: 450600 },
            { name: '钦州市', value: 450700 }, { name: '贵港市', value: 450800 },
            { name: '玉林市', value: 450900 }, { name: '百色市', value: 451000 },
            { name: '贺州市', value: 451100 }, { name: '河池市', value: 451200 },
            { name: '来宾市', value: 451300 }, { name: '崇左市', value: 451400 }
        ]
    },
    {
        name: '海南省', value: 460000,
        city: [
            { name: '海口市', value: 460100 }, { name: '三亚市', value: 460200 },
            { name: '三沙市', value: 460300 }, { name: '儋州市', value: 460400 },
            { name: '五指山市', value: 469001 }, { name: '琼海市', value: 469002 },
            { name: '文昌市', value: 469005 }, { name: '万宁市', value: 469006 },
            { name: '东方市', value: 469007 }, { name: '定安县', value: 469021 },
            { name: '屯昌县', value: 469022 }, { name: '澄迈县', value: 469023 },
            { name: '临高县', value: 469024 }, { name: '白沙黎族自治县', value: 469025 },
            { name: '昌江黎族自治县', value: 469026 }, { name: '乐东黎族自治县', value: 469027 },
            { name: '陵水黎族自治县', value: 469028 }, { name: '保亭黎族苗族自治县', value: 469029 },
            { name: '琼中黎族苗族自治县', value: 469030 }
        ]
    },

    // 西南地区（5省）
    {
        name: '重庆市', value: 500000,
        city: [
            { name: '重庆市', value: 500100 },
            { name: '万州区', value: 500101 }, { name: '涪陵区', value: 500102 },
            { name: '渝中区', value: 500103 }, { name: '大渡口区', value: 500104 },
            { name: '江北区', value: 500105 }, { name: '沙坪坝区', value: 500106 },
            { name: '九龙坡区', value: 500107 }, { name: '南岸区', value: 500108 },
            { name: '北碚区', value: 500109 }, { name: '綦江区', value: 500110 },
            { name: '大足区', value: 500111 }, { name: '渝北区', value: 500112 },
            { name: '巴南区', value: 500113 }, { name: '黔江区', value: 500114 },
            { name: '长寿区', value: 500115 }, { name: '江津区', value: 500116 },
            { name: '合川区', value: 500117 }, { name: '永川区', value: 500118 },
            { name: '南川区', value: 500119 }, { name: '璧山区', value: 500120 },
            { name: '铜梁区', value: 500151 }, { name: '潼南区', value: 500152 },
            { name: '荣昌区', value: 500153 }, { name: '开州区', value: 500154 },
            { name: '梁平区', value: 500155 }, { name: '武隆区', value: 500156 }
        ]
    },
    {
        name: '四川省', value: 510000,
        city: [
            { name: '成都市', value: 510100 }, { name: '自贡市', value: 510300 },
            { name: '攀枝花市', value: 510400 }, { name: '泸州市', value: 510500 },
            { name: '德阳市', value: 510600 }, { name: '绵阳市', value: 510700 },
            { name: '广元市', value: 510800 }, { name: '遂宁市', value: 510900 },
            { name: '内江市', value: 511000 }, { name: '乐山市', value: 511100 },
            { name: '南充市', value: 511300 }, { name: '眉山市', value: 511400 },
            { name: '宜宾市', value: 511500 }, { name: '广安市', value: 511600 },
            { name: '达州市', value: 511700 }, { name: '雅安市', value: 511800 },
            { name: '巴中市', value: 511900 }, { name: '资阳市', value: 512000 },
            { name: '阿坝藏族羌族自治州', value: 513200 }, { name: '甘孜藏族自治州', value: 513300 },
            { name: '凉山彝族自治州', value: 513400 }
        ]
    },
    {
        name: '贵州省', value: 520000,
        city: [
            { name: '贵阳市', value: 520100 }, { name: '六盘水市', value: 520200 },
            { name: '遵义市', value: 520300 }, { name: '安顺市', value: 520400 },
            { name: '毕节市', value: 520500 }, { name: '铜仁市', value: 520600 },
            { name: '黔西南布依族苗族自治州', value: 522300 },
            { name: '黔东南苗族侗族自治州', value: 522600 },
            { name: '黔南布依族苗族自治州', value: 522700 }
        ]
    },
    {
        name: '云南省', value: 530000,
        city: [
            { name: '昆明市', value: 530100 }, { name: '曲靖市', value: 530300 },
            { name: '玉溪市', value: 530400 }, { name: '保山市', value: 530500 },
            { name: '昭通市', value: 530600 }, { name: '丽江市', value: 530700 },
            { name: '普洱市', value: 530800 }, { name: '临沧市', value: 530900 },
            { name: '楚雄彝族自治州', value: 532300 }, { name: '红河哈尼族彝族自治州', value: 532500 },
            { name: '文山壮族苗族自治州', value: 532600 }, { name: '西双版纳傣族自治州', value: 532800 },
            { name: '大理白族自治州', value: 532900 }, { name: '德宏傣族景颇族自治州', value: 533100 },
            { name: '怒江傈僳族自治州', value: 533300 }, { name: '迪庆藏族自治州', value: 533400 }
        ]
    },
    {
        name: '西藏自治区', value: 540000,
        city: [
            { name: '拉萨市', value: 540100 }, { name: '日喀则市', value: 540200 },
            { name: '昌都市', value: 540300 }, { name: '林芝市', value: 540400 },
            { name: '山南市', value: 540500 }, { name: '那曲市', value: 540600 },
            { name: '阿里地区', value: 542500 }
        ]
    },

    // 西北地区（5省）
    {
        name: '陕西省', value: 610000,
        city: [
            { name: '西安市', value: 610100 }, { name: '铜川市', value: 610200 },
            { name: '宝鸡市', value: 610300 }, { name: '咸阳市', value: 610400 },
            { name: '渭南市', value: 610500 }, { name: '延安市', value: 610600 },
            { name: '汉中市', value: 610700 }, { name: '榆林市', value: 610800 },
            { name: '安康市', value: 610900 }, { name: '商洛市', value: 611000 }
        ]
    },
    {
        name: '甘肃省', value: 620000,
        city: [
            { name: '兰州市', value: 620100 }, { name: '嘉峪关市', value: 620200 },
            { name: '金昌市', value: 620300 }, { name: '白银市', value: 620400 },
            { name: '天水市', value: 620500 }, { name: '武威市', value: 620600 },
            { name: '张掖市', value: 620700 }, { name: '平凉市', value: 620800 },
            { name: '酒泉市', value: 620900 }, { name: '庆阳市', value: 621000 },
            { name: '定西市', value: 621100 }, { name: '陇南市', value: 621200 },
            { name: '临夏回族自治州', value: 622900 }, { name: '甘南藏族自治州', value: 623000 }
        ]
    },
    {
        name: '青海省', value: 630000,
        city: [
            { name: '西宁市', value: 630100 }, { name: '海东市', value: 630200 },
            { name: '海北藏族自治州', value: 632200 }, { name: '黄南藏族自治州', value: 632300 },
            { name: '海南藏族自治州', value: 632500 }, { name: '果洛藏族自治州', value: 632600 },
            { name: '玉树藏族自治州', value: 632700 }, { name: '海西蒙古族藏族自治州', value: 632800 }
        ]
    },
    {
        name: '宁夏回族自治区', value: 640000,
        city: [
            { name: '银川市', value: 640100 }, { name: '石嘴山市', value: 640200 },
            { name: '吴忠市', value: 640300 }, { name: '固原市', value: 640400 },
            { name: '中卫市', value: 640500 }
        ]
    },
    {
        name: '新疆维吾尔自治区', value: 650000,
        city: [
            { name: '乌鲁木齐市', value: 650100 }, { name: '克拉玛依市', value: 650200 },
            { name: '吐鲁番市', value: 650400 }, { name: '哈密市', value: 650500 },
            { name: '昌吉回族自治州', value: 652300 }, { name: '博尔塔拉蒙古自治州', value: 652700 },
            { name: '巴音郭楞蒙古自治州', value: 652800 }, { name: '阿克苏地区', value: 652900 },
            { name: '克孜勒苏柯尔克孜自治州', value: 653000 }, { name: '喀什地区', value: 653100 },
            { name: '和田地区', value: 653200 }, { name: '伊犁哈萨克自治州', value: 654000 },
            { name: '塔城地区', value: 654200 }, { name: '阿勒泰地区', value: 654300 },
            { name: '石河子市', value: 659001 }, { name: '阿拉尔市', value: 659002 },
            { name: '图木舒克市', value: 659003 }, { name: '五家渠市', value: 659004 },
            { name: '北屯市', value: 659005 }, { name: '铁门关市', value: 659006 },
            { name: '双河市', value: 659007 }, { name: '可克达拉市', value: 659008 },
            { name: '昆玉市', value: 659009 }, { name: '胡杨河市', value: 659010 }
        ]
    },

    // 特别行政区
    {
        name: '台湾省', value: 710000,
        city: [
            { name: '台北市', value: 710100 }, { name: '高雄市', value: 710200 },
            { name: '基隆市', value: 710700 }, { name: '新竹市', value: 710800 },
            { name: '台中市', value: 710400 }, { name: '嘉义市', value: 710900 },
            { name: '台南市', value: 710300 }, { name: '新北市', value: 711100 }
        ]
    },
    {
        name: '香港', value: 810000,
        city: [
            { name: '香港岛', value: 810100 }, { name: '九龙', value: 810200 },
            { name: '新界', value: 810300 }
        ]
    },
    {
        name: '澳门', value: 820000,
        city: [
            { name: '澳门半岛', value: 820100 }, { name: '离岛', value: 820200 }
        ]
    }
]