// API 接口 - 管理员用户
import request from '../request.js'
const domain = "/api/v1"

const about ={}
about.get =  (successCallback)=>{
    request.get(domain +"/admin/about/get",(res,data)=>{
        if(res){
            successCallback(data.data.data)
        }
    })
}

export default about