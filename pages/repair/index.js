// pages/repair/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        questionList: [{
            title: '问题1：',
            titleContent: '',
            detail: '问题详情：',
            detailContent: '',
            imgList: [],
            vodio: '',
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    addHandler(){
        let list = this.data.questionList.slice();
        let num = list.length + 1;
        list.push(
            {
                title: '问题' + num +'：',
                titleContent: '',
                detailContent: '',
                imgList: [],
                vodio: '',
            }
        )
        this.setData({ questionList: list});
    },
    delateHandler() {
        let list = this.data.questionList.slice();
        list = list.slice(0,list.length-1);
        this.setData({ questionList: list});
    },

    titleHandler(e){
        let questionList = this.data.questionList.slice();
        let index = e.currentTarget.dataset.index;
        let value = e.detail.value;
        questionList[index].titleContent = value;
        this.setData({ questionList });
    },
    detailHandler(){
        let questionList = this.data.questionList.slice();
        let index = e.currentTarget.dataset.index;
        let value = e.detail.value;
        questionList[index].detailContent = value;
        this.setData({ questionList });
    },
    updatePickerImages: function (e) {
        const imagePath = e.detail.images
        console.log(e.detail)
        this.setData({
            imagePath: imagePath ? imagePath : ''
        })
    },
    updateVideo: function (e) {
        wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 60,
            camera: 'back',
            success(res) {
                console.log(res.tempFilePath)
                this.setData({ url: res.tempFilePath})
            }
        })
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