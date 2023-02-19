// API 接口 - 系统设置
import request from '../request.js'
const domain = "/api/v1"

const systemSetting = {}
systemSetting.setEmail = (arg, successCallback, errorCallback) => {
    request.postAuth(domain + "/admin/systemSetting/setEmail", arg, successCallback,errorCallback)
}

systemSetting.getEmail = (successCallback) => {
    request.postAuth(domain + "/admin/systemSetting/getEmail", {}, successCallback)
}

systemSetting.getApplicationSetting = (successCallback) => {
    request.postAuth(domain + "/admin/systemSetting/getApplicationSetting", {}, successCallback)
}

systemSetting.setApplicationSetting = (arg,successCallback) => {
    request.postAuth(domain + "/admin/systemSetting/setApplicationSetting", arg, successCallback)
}


export default systemSetting