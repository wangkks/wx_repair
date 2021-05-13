// pages/index/index.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        newList: [
            {
                title: '时政微周刊总 | 总书记的一周',
                btnType: 1,
                newhead: '央视新闻'
            },
            {
                title: '总书记推动的改革身边事 | 人间重晚晴',
                btnType: 1,
                newhead: '央视新闻'
            },
            {
                title: '时政微周刊总 | 总书记的一周',
                newhead: '央视新闻'
            },
            {
                title: '时政微周刊总时政微周刊总时政微周刊总时政微周刊总 | 总书记的一周',
                newhead: '央视新闻',
                img: '../../images/index/default_news.png'
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(22, app.globalData.navHeight)
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