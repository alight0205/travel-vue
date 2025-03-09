// 引入ref
import { ref } from 'vue';


// 存储当前主题色
export const theme = ref('')
// 设置日间与夜间主题切换函数，暗黑模式就追加属性，日间模式就移除属性
export function setTheme(val: string) {
    if (val === "dark") {
        document.body.setAttribute('arco-theme', 'dark')
    } else {
        document.body.removeAttribute('arco-theme')
    }
    theme.value = val
    // 将主题值存入localstorage中
    localStorage.setItem("theme",val)
}

// 从localStorage中取出主题值
export function loadTheme(){
    // 从localStorage取出存储的值
    const val = localStorage.getItem("theme")
    if (val==="dark"){
        theme.value = val
        document.body.setAttribute('arco-theme', 'dark')
    }
}