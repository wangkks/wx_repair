import { config } from "./utils/config"
var app = getApp();
var extend = {
    isLogin() {
        return wx.getStorageSync('isLoginSucc');
    },
    getUserInfo() {
        var member = wx.getStorageSync('member').member;
        return {
            id: member && member.id,
            nickname: member && member.name,
        }

    },
    loginpage: "/pages/login/index",//登录页路径
    toLogin(from) {
        let url = !from ? this.loginpage : `${this.loginpage}?from=${from}`                                //跳转登录页
        wx.navigateTo({
            url
        })
    },
    getAppId() {
        return config.appid;
    },
}
export default Object.assign({}, config, extend);