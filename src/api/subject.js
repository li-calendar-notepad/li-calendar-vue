// API 接口 - 事件类
import request from './request.js'

const domain = "/api/v1"
const o={}
let visitToken = ""


// 创建一个事件
o.create = function (itemId, data, callback) {
    const postdata = data
    postdata.itemId = itemId
    postdata.visitToken = visitToken
    request.postAuth(domain + "/item/subject/create", postdata, callback)
}


o.update = function (itemId,subjectId, data, callback) {
    const postdata = data
    postdata.itemId = itemId
    postdata.subjectId = subjectId
    postdata.visitToken = visitToken
    request.postAuth(domain + "/item/subject/update", postdata, callback)
}

o.deletes = (itemId, subjectIds, successCallback) => {
    const postData = {
        subjectIds
        , visitToken
        , itemId
    }
    request.postAuth(domain + "/item/subject/deletes", postData, successCallback)
}

o.getList = function (itemId, callback) {
    const postdata = {}
    postdata.itemId = itemId
    postdata.visitToken = visitToken
    request.postAuth(domain + "/item/subject/getList", postdata, callback)
}

// // 获取详情
// o.getInfo = function (itemId, eventId, callback) {
//     const postdata = {}
//     postdata.itemId = Number(itemId)
//     postdata.eventId = Number(eventId)
//     postdata.visitToken = visitToken
//     request.postAuth(domain + "/item/event/getInfo", postdata, callback)
// }

o.setVisitToken = (token) => {
    visitToken = token
    return o
}

const subject = o

export default subject