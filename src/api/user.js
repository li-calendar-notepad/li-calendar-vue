// API 接口 - 用户类
import request from './request.js'

const domain = "/api/v1"
const user = {}

// 获取资料
user.getInfo = (callback, errCallback) => {
    request.postAuth(domain + "/user/getInfo", {}, callback, errCallback)
}


/**
 * 修改密码
 * @param {*} param newPassword,oldPassword
 * @param {*} callback 
 * @param {*} errCallback 
 */
user.updatePasssword = (param, callback, errCallback)=>{
    
    request.postAuth(domain + "/user/updatePasssword", param, callback, errCallback)
}

/**
 * 修改用户资料
 * @param {*} param name,headImage
 * @param {*} callback 
 * @param {*} errCallback 
 */
user.updateInfo = (param, callback, errCallback) => {
    request.postAuth(domain + "/user/updateInfo", param, callback, errCallback)
}

export default user