//app.js
import { enums } from "./plugins/enums"
App({
    onLaunch: function () {
        this.getScale();
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    getScale() {
        //这些数据在页面加载时取得，注意他们的实时性不高。
        var res = wx.getSystemInfoSync();
        this.globalData.model = res.model;
        this.globalData.scale = 750 / res.windowWidth;
        this.globalData.windowWidth = res.windowWidth;
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.screenHeight = res.screenHeight;
        var isheightnav = false;
        for (var i = 0; i < enums.heightnavmode.length; i++) {
            var item = enums.heightnavmode[i];
            if (new RegExp("^" + item).test(res.model)) {
                isheightnav = true;
                break;
            }
        }
        this.globalData.navHeight = (isheightnav ? 176 : 128);
        this.globalData.footerHeight = (isheightnav ? 40 : 0);
        this.globalData.contentHeight = res.screenHeight - (this.globalData.navHeight / this.globalData.scale);
        this.globalData.contentHeightRpx = res.screenHeight * this.globalData.scale - this.globalData.navHeight;
    },
    globalData: {
        userInfo: null,
        projectTitle: '珂珂'
    }
})