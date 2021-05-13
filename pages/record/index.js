// pages/record/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navHeight: app.globalData.navHeight,
        tabs: [
            {
                label: '报修',
                value: 1
            },
            {
                label: '打卡',
                value: 2
            }
        ],
        recordList: [],
        page: 1,
        tabValue: 2,
        statusIndex: 0,
    },
    getlistlock: true,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            page: 1,
        }, () => {
            this.getlistlock = true;
            this.getRecordList();
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

    navchange(e) {
        this.setData({
            page: 1,
            recordList: [],
            tabValue: e.detail.value
        });
        this.getRecordList();
    },

    getRecordList() {
        // if (!this.getlistlock) {
        //     return;
        // }
        // this.getlistlock = false;
        // api.getExplosiveList({
        //     pageSize: 10,
        //     page: this.data.page,
        //     status: this.data.tabValue
        // }, res => {
        //     var list = res.data.data ? res.data.data.list : [], recordList;
        //     if (this.data.page == 1) {
        //         recordList = list;
        //     } else {
        //         recordList = this.data.recordList.concat(list);
        //     }
        //     this.setData({
        //         recordList,
        //         page: this.data.page + 1
        //     }, () => {
        //         if ((res.data.data && res.data.data.pages) >= this.data.page) {
        //             this.getlistlock = true;
        //         } else {
        //             this.getlistlock = false;
        //         }
        //     })
        // })
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
    onPullDownRefresh: function() {
        this.setData({
            page: 1
        }, () => {
            this.getlistlock = true;
            this.getRecordList();
        });
        wx.stopPullDownRefresh();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function(e) {
        this.getRecordList();
    },
})