// pages/position/index.js
import { formatTime } from '../../plugins/util';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        positionOver: true,
        successShow: false,
        catchShow: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;

        setTimeout(function () {
            that.setData({ positionOver: false })
        }, 2000)
        setTimeout(function () {
            wx.showToast({
                title: '打卡成功！',
                icon: 'success'
            })
            that.setData({ successShow: true});
            that.setData({ catchShow: false});
        }, 3000)


        let date = formatTime(new Date());
        let nowDate = date.substring(0, 10);
        let nowTime = date.substring(11, 16);
        this.setData({
            nowDate: nowDate,//当前日期
            nowTime: nowTime,//当前时间
        })

        wx.getLocation({
            type: 'wgs84',
            success(res) {
                console.log('经纬度：',res)
                const latitude = res.latitude
                const longitude = res.longitude
                const speed = res.speed
                const accuracy = res.accuracy

            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})