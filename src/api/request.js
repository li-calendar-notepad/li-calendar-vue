import axios from 'axios'
// import elementUi from 'element-ui'
import { ElMessage } from 'element-plus'
// import cmn from '../common';
import Storage from '../utils/storage'
var request={};

var serve = axios.create({
    // baseURL: cmn.config.server_domain, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000, // request timeout
    headers: { 
        // 'token': Storage.getValue("userInfo","token") ,
    }
})

// 请求接口前回调
serve.interceptors.request.use(res => {
    // console.log("执行前", Storage.getValue("userInfo", 'token') );
    res.headers.common['token'] = Storage.getValue("userInfo",'token') || ''
    return res;
});


request.getToken =()=>{
   return Storage.getValue("userInfo", 'token')
} 

// get请求
request.get = function (url, callback) {
    serve.get(url).then(function (response) {
        if (callback) {
            callback(true, response)
        }
    }).catch(function (error) {
        if (callback) {
            callback(false, error)
        }
    });
}


// post请求
request.post = function (url, data, callback) {
    // 进行post 请求            
    serve.post(url, data).then(function (response) {
        // console.log("POST",response)
        if (callback) {
            callback(true, response)
        }
    }).catch(function (error) {
        error;
        // console.log("POST fail", error)
        // if (callback) {
        //     callback(false, error)
        // }
    });
}

// post请求 判断token等信息，结果等
// 成功 success_callback(data,msg)
// 失败 error_callback(code,msg,data) // 如果错误回调为空，将自动弹窗
request.postAuth = function (url, data,  success_callback, error_callback) {
    request.post(url, data, function(ok,res){
        if (ok && res.data){
            if (res.data.code === 0) {
                if (success_callback){
                    // 只有结果err_code为0的时候回调
                    // 返回：data;错误信息
                    success_callback(res.data.data, res.data.msg)
                }else{
                    ElMessage({
                        duration: 5000,
                        showClose: true,
                        message: "操作成功",
                        type: 'success'
                    });
                }
            } else if (res.data.code == 1000) {
                // 未登录
                ElMessage({
                    duration: 5000,
                    showClose: true,
                    dangerouslyUseHTMLString: true,
                    message: "请先登录再进行操作 <a href='/#/login' class='el-button el-button--small' style='text-decoration:none'>去登录</a>",
                    grouping:true,
                    type: 'warning'
                });
            } else if (res.data.code == 1001) {
                // 登录过期
                ElMessage({
                    duration: 5000,
                    showClose: true,
                    dangerouslyUseHTMLString: true,
                    message: "登录状态过期，请退出后 <a href='/#/login' class='el-button el-button--small' style='text-decoration:none'>重新登录</a>",
                    grouping:true,
                    type: 'warning'
                });
            } else if (res.data.code !==0  && (!error_callback || error_callback(res.data.code, res.data.msg, res.data.data) !==false)){
                // 不等于-1 并且 错误回调函数不存在，或者存在执行结果返回了非FALSE则正常执行以下
                ElMessage({
                    message: res.data.msg,
                    type: 'warning'
                });
            } 
            // // 成功后回调
            // // 返回：成功请求数据结果;成功请求对象
            // if (!success_callback || success_callback(res.data, res) !== false) {
            //     if (res.data.code && res.data.code == 1001 && (!error_callback || error_callback(res.data.code, res.data.msg) !== false)){
            //         ElMessage({
            //             duration:5000,
            //             showClose: true,
            //             dangerouslyUseHTMLString:true,
            //             message: "登录状态过期，请退出后 <a href='/#/login' class='e-color-primary'>重新登录</a>",
            //             type: 'warning'
            //         });
            //     }
            // }

            
        }else{

            // 接口请求错误
            // 如果错误函数不存在或者存在没有返回false，则进行弹窗提醒
            // if (!error_callback || error_callback(res.data.err_code, res.data.err_msg, res)!==false) {
                ElMessage({
                    duration:5000,
                    showClose: true,
                    message: '接口异常:' + url,
                    type: 'error'
                });
            // }
        }
    });
}

// 导出
request.configExport = (url,data)=>{
    serve.post(url, data, {
        params: {},
        headers: {
            token: request.getToken(),
        },
        responseType: 'blob', // 切记类型 blob
    }).then((res) => {
        // console.log(res);
        const fileName = res.headers["content-disposition"].match(/filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?;?/)[1]
        let blob = new Blob([res.data]);
        let url = window.URL.createObjectURL(blob); // 创建 url 并指向 blob
        let a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url); // 释放该 url
    }).catch((err) => {
        console.log(err);
    });
}

request.download=function(url){
    window.open(url);
}



export default request