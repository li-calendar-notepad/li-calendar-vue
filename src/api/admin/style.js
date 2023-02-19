// API 接口 - 风格
import request from '../request.js'
const domain = "/api/v1/admin"
let visitToken=""

const style ={}
style.getStyleList =  (successCallback)=>{
    request.postAuth(domain +"/style/getStyleList",{},successCallback)
}


// {
//     // "styleId":1,
//     "title":"克莱因12",
//     "sort":99,            
//     "className":"kelaiyin12",       
//     "textColor":"#000",       
//     "backgroundColor" :"#000",
//     "borderColor" :"#000"    
// }
style.edit =  (styleId,data,successCallback)=>{
    
    if (styleId){
        data.styleId = styleId
    }
    request.postAuth(domain + "/style/edit", data, successCallback)
}


style.deletes = (styleIds, successCallback) => {
    const postData={
        styleIds: styleIds
    }
    request.postAuth(domain + "/style/deletes", postData, successCallback)
}



// http://127.0.0.1:9099/api/v1/jsonConfig/v1/eventStyleExport
style.eventStyleExport=(filename,styleIds)=>{
    request.configExport(domain + "/style/eventStyleExport", { styleIds, fileName: filename })
}


export default style