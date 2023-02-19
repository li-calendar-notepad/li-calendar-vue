// API 接口 - 项目类
import request from './request.js'
const domain = "/api/v1"
let visitToken=""

const o={}
o.getMyItemList=function(page,limit,callbackList){
    request.postAuth(domain + "/item/getMyItemList" , {page,limit}, callbackList)
}

/**
 * 获取公开的项目信息
 * @param {*} itemId 
 * @param {*} callbackList 
 */
o.getInfoByItemId = function (itemId,callback){
    request.postAuth(domain + "/item/getPublicInfoByItemId", { itemId }, callback)
}

// 密码验证
o.checkVisitPassword = function (itemId, password, callback,errCallback) {
    request.postAuth(domain + "/item/checkVisitPassword", { itemId, password }, callback, errCallback)
}

// ================
// 需要token的,提前使用setVisitToken设置
// ================
o.getPrivateInfo = function (itemId, callback) {
    request.postAuth(domain + "/item/getPrivateInfo", { itemId, visitToken }, callback)
}

o.getConfig = function (itemId, callback) {
    request.postAuth(domain + "/item/getConfig", { itemId, visitToken }, callback)
}

// 保存配置
o.saveConfig = function (itemId,data, callback) {
    data.itemId = itemId
    data.visitToken = visitToken
    request.postAuth(domain + "/item/saveConfig", data, callback)
}

o.setVisitToken=(token)=>{
    visitToken = token
    return o
}


o.getSummaryData = function (itemId, callback) {
    request.postAuth(domain + "/item/getSummaryData", { itemId, visitToken }, callback)
}

/**
 * 创建项目接口
 * @param {*} title 
 * @param {*} description 
 * @param {*} callback 
 */
o.create = (title, description, callback)=>{
    request.postAuth(domain + "/item/create", { title, description }, callback)
}

// 删除项目
o.deleteOne = function (itemId, callback, errCallback) {
    var postData = {}
    postData['itemId'] = itemId;
    postData['visitToken'] = visitToken;
    request.postAuth(domain + "/item/deleteOne", postData, callback, errCallback)
}


// 找回密码
o.forgotVisitPassword = function (itemId, callback, errCallback) {
    request.postAuth(domain + "/item/forgotVisitPassword", { itemId: Number(itemId) }, callback, errCallback)
}







const item=o

export default item