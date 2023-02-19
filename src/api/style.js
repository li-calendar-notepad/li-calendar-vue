// API 接口 - 风格
import request from './request.js'
const domain = "/api/v1"
let visitToken=""

const style ={}
style.getStyleList =  (successCallback)=>{
    request.postAuth(domain +"/style/getStyleList",{},successCallback)
}


// 或取样式文件用于注入
style.getStyleText = (itemId, successCallback) => {
    request.get(domain + "/style/getStyleCssCode.css", (success, res) => {
        successCallback(res.request.response)
    })
}

export default style