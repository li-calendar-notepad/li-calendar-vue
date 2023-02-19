// API 接口 - 事件类
import request from './request.js'

const domain = "/api/v1"
const o={}
let visitToken = ""


// 获取特殊的日期列表
o.getList = function ( callback) {
    request.postAuth(domain + "/specialDay/getList", {}, callback)
}


const specialDay = o

export default specialDay