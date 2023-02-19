// API 接口 - 事件类
import request from './request.js'

const domain = "/api/v1"
const o={}
let visitToken = ""


// 创建一个事件
o.createOne = function (itemId, data, callback) {
    // const startTiime = data.startTime
    // const endTime = data.endTime
    const postdata = data
    postdata.itemId = itemId
    postdata.visitToken = visitToken
    // postdata.startTime = startTiime.slice(0, 10) + " " + startTiime.slice(11, 19)
    // postdata.endTime = endTime.slice(0, 10) + " " + endTime.slice(11, 19)
    request.postAuth(domain + "/item/event/createOne", postdata, callback)
}


// 更新一个事件
o.updateByEventId = function (itemId, data, callback) {
    const postdata = data
    postdata.itemId = itemId
    postdata.visitToken = visitToken
    request.postAuth(domain + "/item/event/updateByEventId", postdata, callback)
}

// 删除一个事件
o.deleteByIdAndItemId = function (itemId, eventId, callback) {
    const postdata = {}
    postdata.itemId = Number(itemId)
    postdata.eventId = Number(eventId)
    postdata.visitToken = visitToken
    request.postAuth(domain + "/item/event/deleteByIdAndItemId", postdata, callback)
}

// 按时间范围获取事件列表
o.getListByTimeScope = function (itemId, startTime, endTime, callback) {
    const postdata = {}
    postdata.itemId = itemId
    postdata.startTime = startTime.slice(0, 10) + " " + startTime.slice(11,19)
    postdata.endTime = endTime.slice(0,10)+" "+endTime.slice(11,19)
    postdata.visitToken = visitToken
    request.postAuth(domain + "/item/event/getListByTimeScope", postdata, callback)
}

// 按时间范围获取事件列表和特殊的日期
o.getListAndSpecialDayByTimeScope = function (itemId, startTime, endTime, callback) {
    const postdata = {}
    postdata.itemId = itemId
    postdata.startTime = startTime.slice(0, 10) + " " + startTime.slice(11, 19)
    postdata.endTime = endTime.slice(0, 10) + " " + endTime.slice(11, 19)
    postdata.visitToken = visitToken
    request.postAuth(domain + "/item/event/getListAndSpecialDayByTimeScope", postdata, callback)
}

// 获取详情
o.getInfo = function (itemId, eventId, callback) {
    const postdata = {}
    postdata.itemId = Number(itemId)
    postdata.eventId = Number(eventId)
    postdata.visitToken = visitToken
    request.postAuth(domain + "/item/event/getInfo", postdata, callback)
}

// 查找事件 按关键字
o.searchWord = (itemId, word,callback)=>{
    const postdata = {}
    postdata.itemId = Number(itemId)
    postdata.word = word
    postdata.visitToken = visitToken
    request.postAuth(domain + "/item/event/searchWord", postdata, callback)
}



o.setVisitToken = (token) => {
    visitToken = token
    return o
}



// o.delete = function (objId, eventId, callback, errCallback) {
//     postdata = {}
//     postdata["event_id"] = eventId;
//     // postdata['pwd'] = o.visit_password;
//     request.postAuth(domain + "delete?obj_id=" + objId, postdata, callback, errCallback)
// }


// o.getList = function (objId, start_time,end_time, callback,pwdCallback) {
//     postdata = {}
//     postdata.start_time = start_time;
//     postdata.end_time = end_time;
//     postdata['pwd'] = o.visit_password;
//     request.postAuth(domain + "getList?obj_id=" + objId, postdata, callback, pwdCallback)
// }

// o.searchByWord = function (objId, word,callback, pwdCallback) {
//     postdata = {}
//     postdata.word = word;
//     request.postAuth(domain + "searchWord?obj_id=" + objId, postdata, callback, pwdCallback)
// }




const event = o

export default event