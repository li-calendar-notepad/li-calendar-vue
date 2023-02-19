// 各种常用表单输入验证
const vaildate= {}


vaildate.isPasswd = function (password){
    var patrn = /^[a-zA-Z0-9_.]{4,16}$/;
    if (!patrn.exec(password)) return false
    return true
}

vaildate.isEmail = function (email) {
    var patrn = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/;
    if (!patrn.exec(email)) return false
    return true
}


vaildate.isURL = function (url) {
    if (!url) return true // 不验证是否为空
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
        + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
        + "|" // 允许IP和DOMAIN（域名）
        + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
        + "[a-z]{2,6})" // first level domain- .com or .museum
        + "(:[0-9]{1,4})?" // 端口- :80
        + "((/?)|" // a slash isn't required if there is no file name
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re = new RegExp(strRegex);
    //re.test()
    if (re.test(url)) {
        return (true);
    } else {
        return (false);
    }
}

export default vaildate;