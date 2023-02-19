// API 接口 - 项目类
import request from './request.js'
const domain = "/api/v1"
let visitToken=""

const o={}
o.getUploadImageUrl=function(){
    return domain + "/file/uploadImg"
}

o.getUploadFilesUrl = function () {
    return domain + "/file/uploadFiles"
}




const file=o

export default file