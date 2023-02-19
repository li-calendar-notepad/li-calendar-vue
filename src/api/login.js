// API 接口 - 登录、注册类
import request from './request.js'
const domain = "/api/v1"
const login = {}

// 提交注册信息
login.registerSubmit = function (username, password, email, emailCode, callback, errCallback) {
    var postdata = {};
    postdata['email'] = email;
    postdata['userName'] = username;
    postdata['passwd'] = password;
    postdata['emailCode'] = emailCode
    postdata['isCommitEmailCode'] = true
    postdata['isTest'] = true
    request.post(domain + "/login/register/commit", postdata, callback, errCallback)
}

// 获取邮件验证码
login.vcodeRegister = function (username, password, email, callback, errCallback) {
    var postdata = {};
    postdata['email'] = email;
    postdata['userName'] = username;
    postdata['passwd'] = password;
    postdata['isCommitEmailCode'] = false;
    postdata['isTest'] = true
    request.post(domain + "/login/register", postdata, callback, errCallback)
}

login.sendResetPasswordVCode = function (username, callback, errCallback) {
    var postdata = {};
    postdata['email'] = username;
    request.postAuth(domain + "/login/sendResetPasswordVCode", postdata, callback, errCallback)
}

login.resetPasswordByVCode = function (username, password, vCode, callback, errCallback) {
    var postdata = {};
    postdata['email'] = username;
    postdata['password'] = password;
    postdata['vCode'] = vCode;
    request.postAuth(domain + "/login/resetPasswordByVCode", postdata, callback, errCallback)
}



login.login = (username, password, vCode, successCallback, errorCallback)=>{
    request.postAuth(domain + "/login", { username, password, vCode }, successCallback,errorCallback)
}

login.logout = function (callback, errCallback) {
    request.postAuth(domain + "/logout", null, callback, errCallback)
}


export default login