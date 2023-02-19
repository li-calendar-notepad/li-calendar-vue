// API 接口 - 管理员用户
import request from '../request.js'
const domain = "/api/v1"

const users ={}
users.getList =  (successCallback)=>{
    request.postAuth(domain +"/admin/users/getList",{},successCallback)
}

users.create = (arg,successCallback) => {
    request.postAuth(domain + "/admin/users/create", arg, successCallback)
}

users.update = (arg, successCallback) => {
    request.postAuth(domain + "/admin/users/update", arg, successCallback)
}

users.deletes = (userIds, successCallback) => {
    request.postAuth(domain + "/admin/users/deletes", { userIds }, successCallback)
}

// style.edit =  (styleId,data,successCallback)=>{
    
//     if (styleId){
//         data.styleId = styleId
//     }
//     request.postAuth(domain + "/style/edit", data, successCallback)
// }


// style.deletes = (styleIds, successCallback) => {
//     const postData={
//         styleIds: styleIds
//     }
//     request.postAuth(domain + "/style/deletes", postData, successCallback)
// }

// // 或取样式文件用于注入
// style.getStyleText = (itemId, successCallback) => {
//     request.get(domain + "/style/getStyleCssCode.css", (success,res)=>{
//         successCallback(res.request.response)
//     })
// }


export default users