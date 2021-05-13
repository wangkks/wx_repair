//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        projectTitle: app.globalData.projectTitle,
        mobileFlag: true,
        interCode: '86', // 手机区号
        getChange: true,
        btn_code: '获取验证码',
        lastTime: '',
        phone: '',
        time: '',
        timemap: 0,
    },
    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
            })
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                    })
                }
            })
        }
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
        })
    },

    showDialog() {
        this.setData({
            mobileFlag: false
        })
    },

    getCode() {
        var phone = this.data.phone;
        if (!(/^1[3|4|5|8|7|6|9|2][0-9]\d{4,8}$/.test(phone)) && this.data.interCode == '86') {
            wx.showModal({
                title: '提示',
                content: '手机号码有误，请仔细核对',
                showCancel: false
            })
        } else {
            clearInterval(this.data.time);
            this.handleSendMessage()

        }
    },

    handleSendMessage() {
        let keyAdmin = wx.getStorageSync('keyAdmin');
        // 中国区号不用加，其他需要
        let interCode = !this.data.interCode ? '86' : this.data.interCode;

        handleRequest(giftsEndUrl.sendMessage, {
            mobile: this.data.phone,
            zone: interCode,
            portalId: app.globalData.tenantId
        }, 'post', (res) => {
            if (res.data.code == 200) {
                wx.showModal({
                    title: '提示',
                    content: '发送验证码成功',
                    showCancel: false
                })
                let timemap = new Date().getTime()
                this.setData({
                    timemap: timemap + 60000
                })
                this.getInterval()
                this.setData({
                    getChange: false
                })
            } else {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none'
                })
            }
        }, function (res) {
            wx.showToast({
                title: '网络异常，请检查网络',
                icon: 'none',
                duration: 2000
            })
        })
    },
    getInterval() {
        const timemap = new Date().getTime()
        var n = Math.floor((this.data.timemap - timemap) / 1000);
        if (this.data.getChange) {
            this.setData({
                getChange: false
            })
            this.data.lastTime = setInterval(() => {
                var str = '剩余' + n + '秒'
                this.setData({
                    btn_code: str
                })
                if (n <= 0) {
                    clearInterval(this.data.lastTime);
                    this.setData({
                        getChange: true,
                        btn_code: '重新获取'
                    })
                }
                n--;
            }, 1000);
        }
    },
})