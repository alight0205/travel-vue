import dayjs from "dayjs"
// 引入相对时间插件
import relativeTime from "dayjs/plugin/relativeTime"
// 引入中文语言包
import cn from "dayjs/locale/zh-cn"
// 使用语言包
dayjs.locale(cn)
// 使用相对时间插件
dayjs.extend(relativeTime)

// 传入时间解析模式
export type dataTimeType = "datetime" | "date" | "time" | "current" | undefined

// 年月日时分秒格式的
export function dateTimeFormat(date: string):string{
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss")
}
// 年月日格式的
export function dateFormat(date: string):string{
    return dayjs(date).format("YYYY-MM-DD")
}

// 只有时间格式的
export function TimeFormat(date: string):string{
    return dayjs(date).format("HH:mm:ss")
}

// 相对时间：xx年前
export function dateCurrentFormat(date: string):string{
    return dayjs().to(dayjs(date)) // xx年前
}

// 获取不同格式的时间
export function dataTemFormat(date:string,name?:dataTimeType){
    if (name === "date"){
        return dateFormat(date)
    }
    if (name === "time"){
        return TimeFormat(date)
    }
    if (name === "current"){
        return dateCurrentFormat(date)
    }

    return dateTimeFormat(date)
}