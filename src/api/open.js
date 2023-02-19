// 开放的接口
import request from './request.js'
const domain = "/api/v1"

const open ={}
open.getOpenConfig =  (successCallback)=>{
    request.postAuth(domain +"/open/getOpenConfig",{},successCallback)
}



export default open