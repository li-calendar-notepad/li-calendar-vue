import request from './request.js'
const domain = "/api/v1"
const register = {}

// 提交注册信息
register.registerSubmit = function (username, password, email, emailCode, callback, errCallback) {
    var postdata = {};
    postdata['email'] = email;
    postdata['userName'] = username;
    postdata['passwd'] = password;
    postdata['emailCode'] = emailCode
    postdata['isCommitEmailCode'] = true
    postdata['isTest'] = true
    request.postAuth(domain + "/login/register/commit", postdata, callback, errCallback)
}

// 获取邮件验证码
register.vcodeRegister = function (username, password, email, callback, errCallback) {
    var postdata = {};
    postdata['email'] = email;
    postdata['userName'] = username;
    postdata['passwd'] = password;
    postdata['isCommitEmailCode'] = false;
    postdata['isTest'] = true
    request.postAuth(domain + "/login/register", postdata, callback, errCallback)
}
export default register