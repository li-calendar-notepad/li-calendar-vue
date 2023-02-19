// API 接口 - 事件类
import request from '../request.js'

const domain = "/api/v1/admin"
const o={}
let visitToken = ""


o.getList = function (callback) {
    const postdata = {}
    postdata.visitToken = visitToken
    request.postAuth(domain + "/specialDay/getList", postdata, callback)
}

o.getInfoDays = function (specialId,callback) {
    const postdata = {}
    postdata.visitToken = visitToken
    postdata.specialId = specialId
    request.postAuth(domain + "/specialDay/getInfoDays", postdata, callback)
}

o.deleteOne = function (specialId, callback) {
    const postdata = {}
    postdata.visitToken = visitToken
    postdata.specialId = specialId
    request.postAuth(domain + "/specialDay/deleteOne", postdata, callback)
}



// 获取详情
// o.getInfo = function (itemId, eventId, callback) {
//     const postdata = {}
//     postdata.itemId = Number(itemId)
//     postdata.eventId = Number(eventId)
//     postdata.visitToken = visitToken
//     request.postAuth(domain + "/item/event/getInfo", postdata, callback)
// }


o.setVisitToken = (token) => {
    visitToken = token
}


const specialDay = o

export default specialDay