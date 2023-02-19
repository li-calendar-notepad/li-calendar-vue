import moment from 'moment'
import { ElMessageBox } from 'element-plus';
import storage from './storage';

const cmn={
    // goToPath(path){
    //     const $router = useRouter();
    //     $router.push({ 'path': path })
    // },
    // t:t
}

cmn.sHeight=0

cmn.expoprtSuffix = ".lcn.json"
cmn.uploadAcceptType = cmn.expoprtSuffix+",.calendar.json,.json"

// 最短格式化开始和结束时间
cmn.startAndEndTimeFormatShort=(startStr,endStr)=>{
    // console.log("时间格式化", startStr, endStr)

    const start = moment(startStr).format('YYYY-MM-DD HH:mm')
    const end = moment(endStr).format('YYYY-MM-DD HH:mm')

    // 2022-12-12 00:00
    if (!endStr){
        return start
    }
    
    // 2022-12-12 00:00 ~ 02:00
    if (start.slice(0, 10) == end.slice(0, 10)){
        return start + " ~ " + end.slice(11)
    }

    // 2022-12-12 00:00 ~ 12-13 02:00
    if (start.slice(0, 4) == end.slice(0, 4)) {
        return start + " ~ " + end.slice(5)
    }

    // 2022-12-12 00:00 ~ 2023-12-13 02:00
    return start + " ~ " + end
}


// 尺寸改变
// 与elementui plus 布局尺寸一致
// https://element-plus.gitee.io/zh-CN/component/layout.html#col-%E5%B1%9E%E6%80%A7
cmn.sizeChange=(viewWidth,sizeName,callback)=>{
    if (viewWidth < 768 && sizeName =="xs"){
        if (callback) callback()
    } else if (viewWidth >= 1920 && sizeName == "xl"){
        if (callback) callback()
    } else if (viewWidth >= 1200 && sizeName == "lg") {
        if (callback) callback()
    } else if (viewWidth >= 992 && sizeName == "md") {
        if (callback) callback()
    } else if (viewWidth >= 768 && sizeName == "sm") {
        if (callback) callback()
    } 
}

// 与elementui plus 布局尺寸一致
// https://element-plus.gitee.io/zh-CN/component/layout.html#col-%E5%B1%9E%E6%80%A7
cmn.getScreenSizeName = ()=>{
    const viewWidth=window.screen.width
    if (viewWidth < 768) {
        return "xs"
    } else if (viewWidth >= 1920) {
        return "xl"
    } else if (viewWidth >= 1200) {
        return "lg"
    } else if (viewWidth >= 992) {
        return "md"
    } else if (viewWidth >= 768) {
        return "sm"
    }
}

// 尺寸改变
cmn.sizeChangeWithObj = (viewWidth, obj) => {
    if (viewWidth < 768 && obj['xs']) {
        obj['xs']()
    } else if (viewWidth >= 1920 && obj['xl']) {
        obj['xl']()
    } else if (viewWidth >= 1200 && obj['lg']) {
        obj['lg']()
    } else if (viewWidth >= 992 && obj['md']) {
        obj['md']()
    } else if (viewWidth >= 768 && obj['sm']) {
        obj['sm']()
    }
}

// 确认框
cmn.confirm = (title, message, callback, options)=>{
    var options = options || {
        type: 'warning',
    }
    ElMessageBox.confirm(
        message,
        title,
        options
    ).then(() => {
        callback(true)
    })
    .catch(() => {
        callback(false)
    })
}

// 是否为深色模式（暗黑模式），有限获取elementUi-plus的配置
cmn.isDark = ()=>{
    const v = storage.local("vueuse-color-scheme")
    if (v == "auto"){
        if (!!window.matchMedia('(prefers-color-scheme: light)').matches) {
            return false
        } else if (!!window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return true
        }
    } else if (v == "light"){
        return false
    } else if (v == "dark") {
        return true
    }
    
}

// 获取随机码
cmn.randomCode = (size, seed )=> {
    var seed = seed || new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'p', 'Q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '2', '3', '4', '5', '6', '7', '8', '9'
    );//数组
    const seedlength = seed.length;//数组长度
    var createPassword = '';
    for (let i = 0; i < size; i++) {
        const j = Math.floor(Math.random() * seedlength);
        createPassword += seed[j];
    }
    return createPassword;
}

// elementui-plus 正则表单验证函数
// 调用方式：cmn.formExpValidateFunc(/^[0-9a-zA-Z]{4,10}$/, $i18n.t('calendar.password_box.inputErrorMessage'))
cmn.formExpValidateFunc=(exp,message)=>{
    return (rule, value, callback) => {
        if (exp.test(value)) {
            callback()
        } else {
            callback(message)
        }
    }
}

// elementui-plus 正则表单验证函数,允许为空
cmn.formExpValidateFuncAllowEmpty = (exp, message) => {
    return (rule, value, callback) => {
        if (value.length==0 || exp.test(value)) {
            callback()
        } else {
            callback(message)
        }
    }
}

cmn.setTitle=(title)=>{
    document.title = title;
}

export default cmn